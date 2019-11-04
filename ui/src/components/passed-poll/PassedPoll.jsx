import React from "react";
import { getPassedPollQuery } from "../../schema/queries";
import { useQuery, useMutation } from "react-apollo";
import Loading from "../shared/loading";
import { Button, Row, Form, Col } from "react-bootstrap";
import { withRouter } from "react-router";

import "./PassedPoll.scss";

const PassedPoll = props => {
  console.log(props.pollId);
  const { data: { passedPoll = {} } = {}, loading, error } = useQuery(
    getPassedPollQuery,
    {
      variables: {
        id: props.passedPollId
      }
    }
  );

  const goBack = () => {
    props.history.push("/polls");
  };

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
        <Button className="back-btn" variant="outline-info" onClick={goBack}>
          <span className="oi oi-chevron-left"></span>
        </Button>
        <div className="main-content">
          <div className="poll-header" style={headerImage}>
            <div className="poll-title">
            <div>{title}</div>
            <div className="poll-creator">Creator: {creator.username}</div>
            </div>
            <div className="poll-desc"> {description}</div>
          </div>

          {answers.map(answer => {
            const style = answer.correct ? 'correct' : 'wrong';
            return (
              <div key={answer.question.title} className={`answer ${style}`} as={Row}>
                <Form.Label as="legend" column sm={5}>
                  {answer.question.title}
                </Form.Label>
                <Col sm={3}>
                  {answer.question.choices.map(choice => (
                    <Form.Check
                      readOnly
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
          <p>Score: {score*100}%</p>
        </div>
      </>
    )
  );
};

export default withRouter(PassedPoll);
