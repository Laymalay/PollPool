import React, { useState, useMemo } from "react";
import { getPollQuery, pollPassedByUserQuery } from "../../schema/queries";
import { useQuery, useMutation } from "react-apollo";
import Loading from "../shared/loading";
import PollHeader from "../shared/poll-header";
import { Form, Row, Col, Button } from "react-bootstrap";
import { createPassedPollMutation } from "../../schema/mutations";
import { withRouter } from "react-router";

import "./PollPassing.css";

const PollPassing = ({ pollId, history, passRequest }) => {
  const [answers, setAnswers] = useState([]);
  const [passPoll] = useMutation(createPassedPollMutation, {
    update(cache, { data: { createPassedPoll } }) {
      const { pollPassedByUser } = cache.readQuery({
        query: pollPassedByUserQuery,
        variables: { poll: pollId }
      });
      console.log(pollPassedByUser);

      cache.writeQuery({
        query: pollPassedByUserQuery,
        data: {
          pollPassedByUser: {
            ...pollPassedByUser,
            __typename: "PassedPollType",
            id: createPassedPoll.id
          }
        },
        variables: { poll: pollId }
      });
    }
  });

  const { data: { poll = {} } = {}, loading, error } = useQuery(getPollQuery, {
    variables: {
      id: pollId
    }
  });

  useMemo(() => {
    if (poll.questions) {
      setAnswers(
        poll.questions.map(question => ({
          questionId: question.id,
          choiceId: undefined
        }))
      );
    }
  }, [poll]);

  if (loading) return <Loading />;
  if (error) return <>Error</>;

  const { id, title, description, imagePath, questions, creator } = poll;

  const validateForm = () => {
    return answers.every(({ choiceId }) => choiceId !== undefined);
  };

  const handleSubmit = e => {
    e.preventDefault();
    passPoll({
      variables: {
        pollId: id,
        answeredQuestions: answers
      }
    }).then(data => {
      passRequest(false);
    });
  };

  const updateAnswers = (questionId, choiceId) => {
    setAnswers(
      answers.map(answer =>
        answer.questionId === questionId ? { ...answer, choiceId } : answer
      )
    );
  };

  const headerImage = {
    backgroundImage: `url(${imagePath})`,
    borderRadius: 5,
    height: 250,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center"
  };

  return (
    poll && (
      <>
        <div className="main-content">
          <PollHeader
            headerImage={headerImage}
            title={title}
            username={creator.username}
            description={description}
          />
          <Form onSubmit={handleSubmit}>
            {questions.map(question => (
              <Form.Group key={question.id} className="question" as={Row}>
                <Form.Label as="legend" column sm={5}>
                  {question.title}
                </Form.Label>
                <Col sm={3}>
                  {question.choices.map(choice => (
                    <Form.Check
                      custom
                      type="radio"
                      key={`${question.title}${choice.id}`}
                      name={question.title}
                      id={choice.id}
                      onChange={_ => updateAnswers(question.id, choice.id)}
                      label={choice.title}
                    />
                  ))}
                </Col>
              </Form.Group>
            ))}
            <Button
              size="lg"
              variant="outline-info"
              className="send-btn"
              disabled={!validateForm()}
              type="submit"
            >
              Send
            </Button>
          </Form>
        </div>
      </>
    )
  );
};

export default withRouter(PollPassing);
