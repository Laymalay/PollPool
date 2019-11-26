import React, { useState } from "react";
import { pollPassedByUserQuery } from "../../schema/queries";
import { useQuery } from "react-apollo";
import Loading from "../shared/loading";
import { withRouter } from "react-router";
import PassedPoll from "../passed-poll";
import PollPassing from "../poll-passing";
import BackButton from "../shared/back-button";

const PollView = ({ match, history }) => {
  const [passAgain, setPassAgain] = useState(false);

  const { data: { pollPassedByUser = {} } = {}, loading, error } = useQuery(
    pollPassedByUserQuery,
    {
      variables: {
        poll: match.params.id
      }
    }
  );

  const passPoll = pollPassedByUser && !passAgain;
  const viewPoll = !pollPassedByUser || passAgain;

  if (loading) return <Loading />;
  if (error) return <>Error</>;

  return (
    <>
      <BackButton onClick={() => history.push("/polls")} />
      {passPoll && (
        <PassedPoll
          passedPollId={pollPassedByUser.id}
          passRequest={setPassAgain}
        />
      )}
      {viewPoll && (
        <PollPassing pollId={match.params.id} passRequest={setPassAgain} />
      )}
    </>
  );
};

export default withRouter(PollView);
