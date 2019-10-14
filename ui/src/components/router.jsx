import React from "react";
import PollList from "./PollList";
import CreatePoll from "./CreatePoll";
import { Login } from "./Login";


const Routes = {
  "/polls": () => <PollList />,
  "/create": () => <CreatePoll />,
  "/login": () => <Login />
};
export default Routes;