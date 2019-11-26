import React from "react";
import AllPolls from "./all-polls";
import Header from "./header";
import Login from "./login";
import { useQuery } from "react-apollo-hooks";
import Loading from "./shared/loading";

import { meQuery, isUserLoggedInQuery } from "../schema/queries";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreatePoll from "./create-poll";
import PollView from "./poll-view";
import UserPolls from "./user-polls";
import UserProfile from "./user-profile";
import { useApolloClient } from "@apollo/react-hooks";
import PrivateRoute from "./PrivateRoute";
import PageNotFound from "./page-not-found";

const App = () => {
  const client = useApolloClient();
  const { data: { me } = {}, loading } = useQuery(meQuery, {
    fetchPolicy: "network-only"
  });

  const { data: { isLoggedIn } = false } = useQuery(isUserLoggedInQuery);

  if (loading) return <Loading />;

  if (me) {
    client.writeData({ data: { currentUser: me } });
  }

  return (
    <Router>
      {isLoggedIn && <Header />}
      {!isLoggedIn && <Route path="/login" component={Login} />}
      <Switch>
        <PrivateRoute exact path="/" component={AllPolls} />
        <PrivateRoute path="/polls" component={AllPolls} />
        <PrivateRoute path="/pollview/:id" component={PollView} />
        <PrivateRoute path="/userpolls" component={UserPolls} />
        <PrivateRoute path="/userprofile" component={UserProfile} />
        <PrivateRoute path="/createpoll" component={CreatePoll} />
        <PrivateRoute component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default App;
