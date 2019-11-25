import React from "react";
import PollList from "../poll-list/PollList";
import { useQuery } from "react-apollo-hooks";
import { getAllPollsQuery, getCurrentUserQuery } from "../../schema/queries";
import { withRouter } from "react-router-dom";
import Loading from "../shared/loading";
import AddButton from "../shared/add-button";
import { useApolloClient } from "@apollo/react-hooks";

import "./UserPolls.css";

const UserPolls = props => {
  const client = useApolloClient();

  const {
    data: {
      currentUser: { id }
    }
  } = useQuery(getCurrentUserQuery);

  const userId = id;

  const {
    data: { allPolls: polls = {} } = {},
    loading: loadingPolls,
    error: errorPolls
  } = useQuery(getAllPollsQuery, { variables: { creator: userId } });

  const addPoll = () => {
    props.history.push("/createpoll");
  };

  if (loadingPolls) return <Loading />;
  if (errorPolls) return <>Error</>;

  return (
    <>
      {polls.length && <PollList polls={polls} />}
      <AddButton onClick={addPoll} />
    </>
  );
};

export default withRouter(UserPolls);
