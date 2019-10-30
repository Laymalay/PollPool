import React from "react";
import { Card, Button, CardColumns } from "react-bootstrap";
import "./PollList.scss";
import { withRouter } from "react-router";

const PollList = props => {
  const openPoll = pollId => {
    props.history.push(`poll/${pollId}`);
  };

  const polls = props.polls;
  return (
    <div>
      <CardColumns className>
        {polls.map(poll => (
          <Card key={poll.title} bg="dark" border="info" className="poll-card">
            <Card.Img
              variant="top"
              src={poll.imagePath}
              style={{ filter: "blur(3px) brightness(60%)" }}
            />
            <Card.ImgOverlay className="card-content">
              <Card.Title>{poll.title}</Card.Title>
              <Card.Text className="card-text">{poll.description}</Card.Text>
              <Button
                onClick={() => openPoll(poll.id)}
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
