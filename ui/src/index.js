import 'bootstrap/dist/css/bootstrap.css';
import './styles/custom.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";

const httpLink = createHttpLink({
    // TODO: move to environment
    uri: "http://localhost:8000"
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});


ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
                <App />
            </ApolloHooksProvider>
        </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root')
)

serviceWorker.unregister();
