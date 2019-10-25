import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { createPollMutation } from "../../schema/mutations";
import { Form, Button, Col } from "react-bootstrap";
import Question from "../question";
import { withRouter } from "react-router";
import "./CreatePoll.css";

export const CreatePoll = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState(
    "https://i.pinimg.com/originals/21/61/8e/21618e399ac27c80aac237c8e2e5021d.jpg"
  );
  
  const [questions, setQuestions] = useState([{}]);

  const [createPoll] = useMutation(createPollMutation);

  const headerStyle = {
    backgroundImage: `url(${imagePath})`,
    padding: 10,
    borderRadius: 5,
    height: 250,
    color: "black",
    filter: "grayscale(80%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: "10px 0"
  };
  const validateForm = () => {
    return title.length > 0 && description.length > 0;
  };

  const updateQuestions = question => {
    setQuestions([question, ...questions]);
  };

  const handleSubmit = event => {
    event.preventDefault();
    createPoll({
      variables: {
        title,
        description,
        imagePath,
      }
    }).then(poll => {
      props.history.push("/polls");
    });
  };

  return (
    <Form className="create-form" onSubmit={handleSubmit}>
      <div style={headerStyle}>
        <Form.Row>
          <Form.Group as={Col} md="3" controlId="formTitle">
            <Form.Control
              type="text"
              placeholder="Title"
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="formImageUrl">
            <Form.Control
              type="text"
              placeholder="Image url (optional)"
              onChange={e => setImagePath(e.target.value)}
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
        <Form.Label>Questions:</Form.Label>
        {questions.map((question, index) => (
          <Question
            key={index}
            question={question}
            updateQuestions={updateQuestions}
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
