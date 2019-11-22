import React, { useState, useEffect } from "react";
import AllPolls from "./all-polls";
import Header from "./header";
import Login from "./login";
import { useQuery } from "react-apollo-hooks";

import { isUserLoggedInQuery } from "../schema/queries";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreatePoll from "./create-poll";
import PollView from "./poll-view";
import UserPolls from "./user-polls";
import UserProfile from "./user-profile";

const App = () => {
  const { data } = useQuery(isUserLoggedInQuery);

  return (
    <Router>
      {data.isLoggedIn && <Header />}
      <Switch>
        <Route exact path="/" component={AllPolls} />
        <Route path="/polls" component={AllPolls} />
        <Route path="/pollview/:id" component={PollView} />
        <Route path="/userpolls" component={UserPolls} />
        <Route path="/userprofile" component={UserProfile} />
        <Route path="/createpoll" component={CreatePoll} />
        <Route path="/login" component={Login} />
        <Route render={() => <h2>Page not found</h2>} />
      </Switch>
    </Router>
  );
};

export default App;
