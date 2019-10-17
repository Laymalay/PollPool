import React from "react";
import PollList from "./PollList";
import Header from "./Header";
import CreatePoll from "./CreatePoll";
import Login from "./Login";
import {
  BrowserRouter as Router,
  Switch,
  browserHistory,
  Route
} from "react-router";

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={PollList} />
        <Route path="/polls" component={PollList} />
        <Route path="/create" component={CreatePoll} />
        <Route path="/login" component={Login} />
        <Route render={() => <h2>Page not found</h2>} />
      </Switch>
    </div>
  );
};

export default App;
