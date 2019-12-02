import React, { useState } from "react";
import { useQuery } from "react-apollo";
import { withRouter } from "react-router";
import { Form, Button, Col, Row } from "react-bootstrap";

import { pollPassedByUserQuery, getPollQuery } from "../../schema/queries";
import Loading from "../shared/loading";
import PassedPoll from "../passed-poll";
import QuestionStat from "./question-stat";
import PollPassing from "../poll-passing";
import BackButton from "../shared/back-button";
import { getCurrentUserQuery } from "../../schema/queries";
import PollHeader from "../shared/poll-header";

import "./PollStat.css";

const PollStat = ({ history, poll }) => {
  const { creator, questions } = poll;

  const [title, setTitle] = useState(poll.title);
  const [description, setDescription] = useState(poll.description);
  const [imagePath, setImagePath] = useState(poll.imagePath);

  // TODO move to scss(?) its here because of image
  const headerImage = {
    backgroundImage: `url(${imagePath})`,
    borderRadius: 5,
    height: 250,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    overflow: "hidden",
    marginTop: "-10px",
    padding: "20px 10px 10px 10px"
  };

  const handleSubmit = () => {};

  return (
    <>
      <Form className="poll-stat-form" onSubmit={handleSubmit}>
        <div className="main-content">
          <BackButton onClick={() => history.push("/polls")} />
          <div style={headerImage}>
            <Form.Row className="first-line">
              <Form.Group as={Col} md="3">
                <Form.Control
                  type="text"
                  className="poll-stat-title"
                  defaultValue={title}
                  placeholder="Title"
                  onChange={e => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} md="8">
                <Form.Control
                  type="text"
                  defaultValue={imagePath}
                  placeholder="Image url (optional)"
                  onChange={e => setImagePath(e.target.value)}
                />
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Control
                as="textarea"
                size="lg"
                defaultValue={description}
                className="description"
                placeholder="Super challenging poll description"
                onChange={e => setDescription(e.target.value)}
              />
            </Form.Group>
          </div>
          {questions &&
            questions.map(question => <QuestionStat question={question} />)}
          <Button size="lg" variant="outline-danger">
            Delete poll
          </Button>
          <Button
            type="submit"
            className="update-user-btn"
            disabled
            size="lg"
            variant="outline-info"
          >
            Update poll
          </Button>
        </div>
      </Form>
    </>
  );
};

export default withRouter(PollStat);
