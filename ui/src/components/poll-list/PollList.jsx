import React from "react";
import { Row, Card, Button } from "react-bootstrap";
import "./PollList.css";

const PollList = (props) => {
  console.log(props)
  const polls = props.polls;
  return (
      <div>
        <Row className="row">
          {polls.map(poll => (
            <Card bg="dark" border="info" className="poll-card">
              <Card.Img
                variant="top"
                src={poll.imagePath}
              />
              <Card.Body>
                <Card.Title>{poll.title}</Card.Title>
                <Card.Text>{poll.description}</Card.Text>
                <Button variant="outline-info">Pass</Button>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </div>
  );
};

export default PollList;
