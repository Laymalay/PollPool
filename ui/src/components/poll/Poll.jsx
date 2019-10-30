import React from "react";
import "./Poll.css";
import { getPollQuery } from "../../schema/queries";
import { useQuery } from "react-apollo";
import Loading from "../shared/loading";
import { Form, Row, Col, Button  } from "react-bootstrap";

const Poll = props => {
  console.log("sdf");
  const { data: { poll = {} } = {}, loading, error } = useQuery(getPollQuery, {
    variables: {
      id: props.match.params.id
    }
  });

  if (loading) return <Loading />;
  if (error) return <>Error</>;

  const { id, title, description, imagePath, questions } = poll;

  const validateForm =()=>{
    return true
  }
  
  const handleSubmit = () =>{

  }

  const headerImage = {
    backgroundImage: `url(${imagePath})`,
    borderRadius: 5,
    height: 250,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center"
  };
  
  console.log(questions);
  
  return (
    poll && (
      <div className="main-content">
        <div className="poll-header" style={headerImage}>
          <div className="poll-title">{title}</div>
          <div className="poll-desc"> {description}</div>
        </div>
        <Form onSubmit={handleSubmit} >
          {questions.map(question => (
            <Form.Group key={question.id} className="question" as={Row}>
              <Form.Label as="legend" column sm={5}>
                {question.title}
              </Form.Label>
              <Col sm={3}>
                {question.choices.map(choice => (
                  <Form.Check
                    type="radio"
                    key={`${question.title}${choice.id}`}
                    name={question.title}
                    id={choice.id}
                    label={choice.title}
                  />
                ))}
              </Col>
            </Form.Group>
          ))}
          <Button
            size="lg"
            variant="outline-info"
            block
            disabled={!validateForm()}
            type="submit"
          >
            Send
          </Button>
        </Form>
      </div>
    )
  );
};

export default Poll;
