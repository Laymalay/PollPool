import React from "react";
import PollList from "../poll-list/PollList";
import { useQuery } from "react-apollo-hooks";
import { getAllPollsQuery, meQuery } from "../../schema/queries";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "./UserPolls.css";

const UserPolls = props => {
  const {
    data: { allPolls: polls = {} } = {},
    loading: loadingPolls,
    error: errorPolls
  } = useQuery(getAllPollsQuery);

  const addPoll = () => {
    props.history.push("/createpoll");
  };

  if (loadingPolls) return <>Loading</>;
  if (errorPolls) return <>Error</>;

  return (
    <>
      {polls.length && <PollList polls={polls} />}
      <Button className="add-poll-btn" variant="info" onClick={addPoll}>
        +
      </Button>
    </>
  );
};

export default withRouter(UserPolls);
