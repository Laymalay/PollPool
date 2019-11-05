import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import "./Question.scss";

export const Question = ({ question, updateQuestions }) => {
  const { title = "", choices = ["", "", ""], answer = "" } = question;
  const [questionTitle, setQuestionTitle] = useState(title);
  const [questionChoices, setQuestionChoices] = useState(choices);
  const [questionAnswer, setQuestionAnswer] = useState(answer);
  const formType = Object.keys(question).length === 0 ? "create" : "edit";

  const validateForm = () => {
    return questionTitle.length > 0 && enableAnswer();
  };

  const enableAnswer = () => {
    return questionChoices.every(item => {
      return item !== "";
    });
  };

  const setChoices = (value, index) => {
    const updatedChoices = questionChoices.map((item, i) => {
      if (index === i) {
        return value;
      }
      return item;
    });
    setQuestionChoices(updatedChoices);
  };

  return (
    <div className={`question-form-${formType}`}>
      <Row>
        <Col>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            className="question-title"
            as="textarea"
            size="sm"
            defaultValue={questionTitle}
            placeholder="What is the capital of Belarus?"
            onChange={e => setQuestionTitle(e.target.value)}
          />
          <Form.Label>Choices:</Form.Label>
          {choices.map((choice, index) => (
            <Form.Control
              key={`${choice} ${index}`}
              size="sm"
              className="choice"
              type="text"
              placeholder={`choice ${index}`}
              onChange={e => setChoices(e.target.value, index)}
            />
          ))}
        </Col>
        <Col>
          <Form.Label>Question type:</Form.Label>
          <Form.Control as="select" size="sm" className="choice">
            <option>closed</option>
            <option disabled>open</option>
            <option disabled>multiple choices</option>
          </Form.Control>
          {enableAnswer() && (
            <div>
              <Form.Label>Correct answer:</Form.Label>
              <Form.Control
                as="select"
                onChange={e => setQuestionAnswer(e.target.value)}
              >
                {questionChoices
                  .filter(choice => choice !== "")
                  .map((choice, index) => (
                    <option key={`${choice} ${index}`}>{choice}</option>
                  ))}
              </Form.Control>
            </div>
          )}
          {formType === "create" && (
            <Button
              className="add-btn"
              variant="outline-info"
              block
              disabled={!validateForm()}
              onClick={() => {
                updateQuestions({
                  questionTitle,
                  questionChoices,
                  questionAnswer
                });
              }}
            >
              +
            </Button>
         

          )}
        </Col>
      </Row>
    </div>
  );
};

export default Question;
