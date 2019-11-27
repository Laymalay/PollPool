import React, { useState } from "react";
import { useQuery } from "react-apollo";
import { withRouter } from "react-router";

import { pollPassedByUserQuery, getPollQuery } from "../../schema/queries";
import Loading from "../shared/loading";
import PassedPoll from "../passed-poll";
import PollPassing from "../poll-passing";
import BackButton from "../shared/back-button";
import { getCurrentUserQuery } from "../../schema/queries";

const PollStat = ({ history, poll }) => {
  return (
    <>
      <BackButton onClick={() => history.push("/polls")} />
      {poll.creator.username}
    </>
  );
};

export default withRouter(PollStat);
