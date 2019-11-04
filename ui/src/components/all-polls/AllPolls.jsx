import React from "react";
import PollList from "../poll-list/PollList";
import { useQuery } from "react-apollo-hooks";
import { getAllPollsQuery } from "../../schema/queries";
import { withRouter } from "react-router-dom";
import Loading from "../shared/loading";
import AddButton from "../shared/add-button";

import "./AllPolls.css";

const AllPolls = props => {
  const { data, loading, error } = useQuery(getAllPollsQuery);
  if (loading) return <Loading />;
  if (error) return <>Error</>;

  const { allPolls: polls } = data;

  const addPoll = () => {
    props.history.push("/createpoll");
  };

  return (
    <>
      {polls && <PollList polls={polls} />}
      <AddButton onClick={addPoll}/>
    </>
  );
};

export default withRouter(AllPolls);
