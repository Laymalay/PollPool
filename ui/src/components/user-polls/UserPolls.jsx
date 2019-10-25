import React from "react";
import PollList from "../poll-list/PollList";
import { useQuery } from "react-apollo-hooks";
import { getAllPollsQuery } from "../../schema/queries";
import { USER_ID } from "../../constants";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Loading from "../shared/loading";

import "./UserPolls.css";

const UserPolls = props => {
  const userId = localStorage.getItem(USER_ID);
  
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
      <Button className="add-poll-btn" variant="info" onClick={addPoll}>
        +
      </Button>
    </>
  );
};

export default withRouter(UserPolls);
