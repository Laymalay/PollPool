import React, { useState } from "react";
import { useQuery } from "react-apollo-hooks";
import { meQuery } from "../../schema/queries";
import { withRouter } from "react-router-dom";
import Loading from "../shared/loading";
import { Form, Button, Col, Row } from "react-bootstrap";
import BackButton from "../shared/back-button";

import "./UserProfile.css";

const UserProfile = ({ history }) => {
  const { data, loading, error } = useQuery(meQuery);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const validateForm = () => {
    return true;
  };
  const handleSubmit = event => {};

  if (loading) return <Loading />;
  if (error) return <>Error</>;

  const { me } = data;

  return (
    <>
      <BackButton onClick={() => window.history.back()} />
      <Form onSubmit={handleSubmit}>
        <div className="user-content">
          <div className="column-flex">
            <div className="row-flex">
              <div className="column-flex">
                <img
                  className="user-pic"
                  src="https://img2.freepng.ru/20180504/phe/kisspng-professional-computer-icons-avatar-job-5aec571ec854c8.3222584415254382388206.jpg"
                />
                <Button
                  className="change-user-photo-btn"
                  variant="outline-info"
                >
                  Change
                </Button>
              </div>
              <div className="main-user-info">
                <div className="username">{me.username}</div>
                <Form.Group as={Row} controlId="userForm.email">
                  <Form.Label column sm="3">
                    Email
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      defaultValue={me.email}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="userForm.firstName">
                  <Form.Label column sm="3">
                    FirstName
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Enter email"
                      defaultValue={me.username}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="userForm.lastName">
                  <Form.Label column sm="3">
                    LastName
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Enter email"
                      defaultValue={me.email}
                    />
                  </Col>
                </Form.Group>
                <div className="hr" />
                <a className="user-polls-link" href="/userpolls">
                  My polls
                </a>
              </div>
            </div>
            <Form.Group className="user-about" controlId="userForm.about">
              <Form.Label>About</Form.Label>
              <Form.Control className="sized-textarea" as="textarea" rows="3" />
            </Form.Group>
          </div>
          <Button className="update-user-btn" size="lg" variant="outline-info">
            Update
          </Button>
        </div>
      </Form>
    </>
  );
};

export default withRouter(UserProfile);
