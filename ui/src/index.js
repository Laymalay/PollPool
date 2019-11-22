import 'bootstrap/dist/css/bootstrap.css';
import './styles/custom.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import * as serviceWorker from './serviceWorker';
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { setContext } from 'apollo-link-context';
import Cookies from 'js-cookie';
import { from } from 'apollo-link';
import { AUTH_TOKEN } from './constants'
import { useQuery } from "react-apollo-hooks";

import { CookiesProvider } from 'react-cookie';
import { resolvers, typeDefs } from './resolvers';

import gql from "graphql-tag";


const httpLink = createHttpLink({
    // TODO: movappe to environment
    uri: 'http://localhost:8000/graphql',
    credentials: 'include',
});

let csrftoken;

async function getCsrfToken() {
    if (csrftoken) return csrftoken;
    csrftoken = await fetch('http://localhost:8000/csrf/')
        .then(response => response.json())
        .then(data => data.csrfToken)
    return await csrftoken
}

const authMiddleware = setContext(async (req, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    const csrftoken = await getCsrfToken();

    Cookies.set('csrftoken', csrftoken);
    return {
        headers: {
            ...headers,
            'X-CSRFToken': csrftoken,
            Authorization: token ? `JWT ${token}` : ''
        },
    };
});

const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    cache: new InMemoryCache(),
    credentials: 'include',
    link: from([authMiddleware, httpLink]),
    typeDefs,
    resolvers,
});

client.cache.writeData({
    data: {
        isLoggedIn: !!localStorage.getItem(AUTH_TOKEN),
    },
});

ReactDOM.render(
    <CookiesProvider>
        <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
                <App />
            </ApolloHooksProvider>
        </ApolloProvider>
    </CookiesProvider>,
    document.getElementById('root')
)

serviceWorker.unregister();
