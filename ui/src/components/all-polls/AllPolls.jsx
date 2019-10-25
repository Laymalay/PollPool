import React from "react";
import PollList from "../poll-list/PollList";
import { useQuery } from "react-apollo-hooks";
import { getAllPollsQuery } from "../../schema/queries";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import "./AllPolls.css";

const AllPolls = (props) => {
  const { data, loading, error } = useQuery(getAllPollsQuery);
  if (loading) return <>Loading</>;
  if (error) return <>Error</>;

  const { allPolls: polls } = data;

  const addPoll = () => {
    props.history.push("/createpoll");
  };

  return (
    <>
      {polls && <PollList polls={polls} />}
      <Button className="add-poll-btn" variant="info" onClick={addPoll}>
        +
      </Button>
    </>
  );
};

export default withRouter(AllPolls);
