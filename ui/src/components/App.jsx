import React from "react";
import AllPolls from "./all-polls";
import Header from "./header";
import Login from "./login";
import { Switch, Route } from "react-router";
import CreatePoll from "./create-poll";
import PollView from "./poll-view";
import UserPolls from "./user-polls";
import UserProfile from "./user-profile";

const App = () => {
  return (
    <div>
      <Header />
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
    </div>
  );
};

export default App;
