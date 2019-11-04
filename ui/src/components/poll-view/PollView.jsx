import React from "react";
import { pollPassedByUserQuery } from "../../schema/queries";
import { useQuery } from "react-apollo";
import Loading from "../shared/loading";
import { withRouter } from "react-router";
import PassedPoll from "../passed-poll";
import PollPassing from "../poll-passing";

const PollView = props => {
  const { data: { pollPassedByUser = {} } = {}, loading, error } = useQuery(
    pollPassedByUserQuery,
    {
      variables: {
        poll: props.match.params.id
      }
    }
  );

  console.log(pollPassedByUser);

  if (loading) return <Loading />;
  if (error) return <>Error</>;
  
  if (pollPassedByUser) {
    return <PassedPoll passedPollId={pollPassedByUser.id} />;
  }

  return <PollPassing pollId={props.match.params.id} />;
};

export default withRouter(PollView);
