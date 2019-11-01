import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import {
  createPollMutation,
  createChoiceMutation,
  createQuestionMutation
} from "../../schema/mutations";
import { Form, Button, Col } from "react-bootstrap";
import Question from "../question";
import { withRouter } from "react-router";
import "./CreatePoll.css";
import { USER_NAME } from "../../constants";

export const CreatePoll = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState(
    "https://i.pinimg.com/originals/21/61/8e/21618e399ac27c80aac237c8e2e5021d.jpg"
  );

  const [questions, setQuestions] = useState([{}]);

  const [createPoll] = useMutation(createPollMutation);
  const [createQuestion] = useMutation(createQuestionMutation);
  const [createChoice] = useMutation(createChoiceMutation);

  const headerStyle = {
    backgroundImage: `url(${imagePath})`,
    padding: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    height: 250,
    color: "black",
    filter: "grayscale(80%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  };

  const validateForm = () => {
    return title.length > 0 && description.length > 0;
  };

  const handleSubmit = event => {
    event.preventDefault();
    createPoll({
      variables: {
        title,
        description,
        imagePath
      }
    }).then(({ data: { createPoll: { id } } }) => {
      console.log(id, questions);
      questions
        .filter(question => question.questionTitle)
        .forEach(({ questionTitle, questionAnswer, questionChoices }) => {
          createQuestion({
            variables: {
              answer: questionAnswer,
              pollId: id,
              title: questionTitle
            }
          }).then(({ data: { createQuestion: { id } } }) => {
            console.log(id);
            questionChoices.forEach(item => {
              createChoice({
                variables: {
                  title: item,
                  questionId: id
                }
              });
            });
          });
        });
      props.history.push("/polls");
    });
  };

  return (
    <Form className="create-form" onSubmit={handleSubmit}>
      <div style={headerStyle}>
        <Form.Row className="first-line">
          <Form.Group as={Col} md="3" controlId="formTitle">
            <Form.Control
              type="text"
              placeholder="Title"
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} md="5" controlId="formImageUrl">
            <Form.Control
              type="text"
              placeholder="Image url (optional)"
              onChange={e => setImagePath(e.target.value)}
            />
          </Form.Group>

          <Form.Label column md="1" className="creator">
            Creator:
          </Form.Label>
          <Form.Group as={Col} md="2" controlId="formCreator">
            <Form.Control
              type="text"
              disabled
              value={localStorage.getItem(USER_NAME)}
            />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="formDescription">
          <Form.Control
            as="textarea"
            size="sm"
            className="description"
            placeholder="Super challenging poll description"
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Group>
      </div>
      <Form.Group controlId="formImageUrl">
        <Form.Label className="poll-questions-title">Questions:</Form.Label>
        {questions.map((question, index) => (
          <Question
            key={index}
            question={question}
            updateQuestions={question => setQuestions([question, ...questions])}
          />
        ))}
      </Form.Group>

      <Button
        size="lg"
        variant="outline-info"
        block
        disabled={!validateForm()}
        type="submit"
      >
        Create
      </Button>
    </Form>
  );
};

export default withRouter(CreatePoll);
