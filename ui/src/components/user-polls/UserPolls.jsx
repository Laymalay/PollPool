import React from "react";
import PollList from "../poll-list/PollList";
import { useQuery } from "react-apollo-hooks";
import { getAllPollsQuery, meQuery } from "../../schema/queries";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "./UserPolls.css";

const AllPolls = props => {
  const { data, loading: loadingPolls, error: errorPolls } = useQuery(getAllPollsQuery);
  const { data: me, loading: loadingUser, error: errorUser } = useQuery(
    meQuery
  );

  if (loadingPolls && loadingUser) return <>Loading</>;
  if (errorPolls || errorUser) return <>Error</>;

  const { allPolls: polls } = data;

  const addPoll = () => {
    props.history.push("/create");
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
