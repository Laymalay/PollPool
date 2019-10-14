import React from "react";
import Poll from "./Poll";
import { useQuery } from "react-apollo-hooks";
import { getAllPollsQuery } from "../schema/queries";

const PollList = () => {
  const { data: polls, loading: loading, error: error } = useQuery(
    getAllPollsQuery
  );
  if (loading) return <>Loading</>;
  if (error) return <>Error</>;

  return (
    polls && (
      <div>
        {polls.map(poll => (
          <Poll key={poll.id} poll={poll} />
        ))}
      </div>
    )
  );
};

export default PollList;
