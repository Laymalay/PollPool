import React from "react";
import PollList from "./PollList";
import { useRoutes } from "hookrouter";
import Header from "./Header";
import { Switch, Route } from "react-router-dom";
import CreatePoll from "./CreatePoll";
import Login from "./Login";
import Routes from "./router";

const App = () => {
  const routeResult = useRoutes(Routes);

  return (
    <div>
      <Header />
        {routeResult}
    </div>
  );
};

export default App;
