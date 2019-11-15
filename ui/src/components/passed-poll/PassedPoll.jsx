import React from "react";
import { getPassedPollQuery } from "../../schema/queries";
import { useQuery, useMutation } from "react-apollo";
import Loading from "../shared/loading";
import PollHeader from "../shared/poll-header";
import { Button, Row, Form, Col } from "react-bootstrap";
import { withRouter } from "react-router";

import "./PassedPoll.scss";

const PassedPoll = ({ passedPollId, history, passRequest }) => {
  const { data: { passedPoll = {} } = {}, loading, error } = useQuery(
    getPassedPollQuery,
    {
      variables: {
        id: passedPollId
      }
    }
  );

  if (loading) return <Loading />;
  if (error) return <>Error</>;

  const { answers, score } = passedPoll;
  const { title, description, imagePath, creator } = passedPoll.poll;

  const headerImage = {
    backgroundImage: `url(${imagePath})`,
    borderRadius: 5,
    height: 250,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center"
  };

  return (
    passedPoll && (
      <>
        <div className="main-content">
          <PollHeader
            headerImage={headerImage}
            title={title}
            username={creator.username}
            description={description}
          />
          {answers.map(answer => {
            const style = answer.correct ? "correct" : "wrong";
            return (
              <div
                key={answer.question.title}
                className={`answer ${style}`}
                as={Row}
              >
                <Form.Label as="legend" column sm={5}>
                  {answer.question.title}
                </Form.Label>
                <Col sm={3}>
                  {answer.question.choices.map(choice => (
                    <Form.Check
                      readOnly
                      custom
                      disabled={answer.choice.id !== choice.id}
                      type="radio"
                      key={`${answer.question.title}${choice.id}`}
                      name={answer.question.title}
                      id={choice.id}
                      label={choice.title}
                      checked={answer.choice.id === choice.id}
                    />
                  ))}
                </Col>
              </div>
            );
          })}
          <p>Score: {score * 100}%</p>
          <Button
            size="lg"
            variant="outline-info"
            className="pass-again-btn"
            onClick={() => passRequest(true)}
          >
            Pass again
          </Button>
        </div>
      </>
    )
  );
};

export default withRouter(PassedPoll);
