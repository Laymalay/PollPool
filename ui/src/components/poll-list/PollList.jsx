import React from "react";
import { Card, Button, CardColumns } from "react-bootstrap";
import "./PollList.scss";
import { withRouter } from "react-router";

const PollList = props => {
  const openPollView = pollId => {
    props.history.push(`pollView/${pollId}`);
  };

  const polls = props.polls;
  return (
    <div>
      <CardColumns>
        {polls.map(poll => (
          <Card key={poll.title} bg="dark" border="light" className="poll-card">
            <Card.Img
              variant="top"
              src={poll.imagePath}
              style={{ filter: "blur(3px)" }}
            />
            <Card.ImgOverlay className="card-content shadow-on-card">
                <Card.Title className="card-title">{poll.title}</Card.Title>
                <Card.Subtitle>By {poll.creator.username}</Card.Subtitle>
              <Card.Text className="card-text">{poll.description}</Card.Text>
              <Button
                onClick={() => openPollView(poll.id)}
                className="pass-btn"
                variant="outline-info"
              >
                Pass
              </Button>
            </Card.ImgOverlay>
          </Card>
        ))}
      </CardColumns>
    </div>
  );
};

export default withRouter(PollList);
