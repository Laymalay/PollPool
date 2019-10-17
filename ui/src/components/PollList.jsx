import React from "react";
import Poll from "./Poll";
import { useQuery } from "react-apollo-hooks";
import { getAllPollsQuery } from "../schema/queries";
import { Row, Card, Button, CardDeck } from "react-bootstrap";
import "./PollList.css";
import { AUTH_TOKEN } from "../constants";

const PollList = () => {
  const { data, loading: loading, error: error } = useQuery(getAllPollsQuery);
  if (loading) return <>Loading</>;
  if (error) return <>Error</>;

  const { allPolls: polls } = data;

  return (
    polls && (
      <div>
        <Row className="row">
          {polls.map(poll => (
            <Card className="poll-card">
              <Card.Img
                variant="top"
                src="https://image.shutterstock.com/z/stock-photo-colorful-sliced-carrots-with-knife-on-wooden-cutting-board-on-rustic-kitchen-table-background-with-730621522.jpg"
              />
              <Card.Body>
                <Card.Title>{poll.title}</Card.Title>
                <Card.Text>{poll.description}</Card.Text>
                <Button variant="primary">Pass</Button>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </div>
    )
  );
};

export default PollList;
