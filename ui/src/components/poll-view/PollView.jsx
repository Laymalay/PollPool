import React, {useState} from "react";
import { pollPassedByUserQuery } from "../../schema/queries";
import { useQuery } from "react-apollo";
import Loading from "../shared/loading";
import { withRouter } from "react-router";
import PassedPoll from "../passed-poll";
import PollPassing from "../poll-passing";

const PollView = ({ match }) => {
  const [passAgain, setPassAgain] = useState(false);

  const { data: { pollPassedByUser = {} } = {}, loading, error } = useQuery(
    pollPassedByUserQuery,
    {
      variables: {
        poll: match.params.id
      }
    }
  );

  
  if (loading) return <Loading />;
  if (error) return <>Error</>;

  if (pollPassedByUser && !passAgain) {
    return <PassedPoll passedPollId={pollPassedByUser.id} passRequest={setPassAgain}/>;
  }

  return <PollPassing pollId={match.params.id} />;
};

export default withRouter(PollView);
