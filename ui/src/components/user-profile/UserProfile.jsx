import React, { useState } from "react";
import { useQuery } from "react-apollo-hooks";
import { getCurrentUserQuery, meQuery } from "../../schema/queries";
import { withRouter } from "react-router-dom";
import Loading from "../shared/loading";
import { Form, Button, Col, Row } from "react-bootstrap";
import BackButton from "../shared/back-button";
import { useMutation } from "react-apollo-hooks";
import { updateUserMutation } from "../../schema/mutations";

import "./UserProfile.css";

const UserProfile = ({ history }) => {
  const { data: { currentUser } = {}, loading, error } = useQuery(
    getCurrentUserQuery,
    { pollInterval: 500 } // get correct user after cache updated and logout/login
  );

  const [updateUser] = useMutation(updateUserMutation);

  const [email, setEmail] = useState(currentUser.email);
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [about, setAbout] = useState(currentUser.about);

  const validateForm = () => {
    return {
      email: email.length === 0,
      firstName: firstName.length === 0,
      lastName: lastName.length === 0,
      about: about.length === 0
    };
  };

  const errors = validateForm();
  const isUpdateDisabled = Object.keys(errors).some(x => errors[x]);

  const handleSubmit = event => {
    event.preventDefault();
    updateUser({
      variables: {
        ...currentUser,
        email,
        firstName,
        lastName,
        about
      },
      update(cache, { data }) {
        cache.writeData({
          data: {
            currentUser: { ...currentUser, firstName, email, lastName, about }
          }
        });
      }
    })
      .then(result => {})
      .catch(e => console.log(e));
  };

  if (loading) return <Loading />;
  if (error) return <>Error</>;

  return (
    <>
      <BackButton onClick={() => history.push("/polls")} />
      <Form onSubmit={handleSubmit}>
        <div className="user-content">
          <div className="column-flex">
            <div className="row-flex">
              <div className="column-flex">
                <img
                  alt="userpic"
                  className="user-pic"
                  src="https://img2.freepng.ru/20180504/phe/kisspng-professional-computer-icons-avatar-job-5aec571ec854c8.3222584415254382388206.jpg"
                />
                <Button
                  className="change-user-photo-btn"
                  variant="outline-info"
                  disabled
                >
                  Change
                </Button>
              </div>
              <div className="main-user-info">
                <div className="username">{currentUser.username}</div>
                <Form.Group as={Row} controlId="userForm.email">
                  <Form.Label column sm="3">
                    Email
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      isInvalid={errors.email}
                      onChange={e => setEmail(e.target.value)}
                      type="email"
                      required
                      placeholder="Enter your email"
                      defaultValue={email}
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
                      required
                      isInvalid={errors.firstName}
                      placeholder="Enter your first name"
                      onChange={e => setFirstName(e.target.value)}
                      defaultValue={firstName}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="userForm.lastName">
                  <Form.Label column sm="3">
                    LastName
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      required
                      type="text"
                      isInvalid={errors.lastName}
                      placeholder="Enter your last name"
                      onChange={e => setLastName(e.target.value)}
                      defaultValue={lastName}
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
              <Form.Control
                required
                onChange={e => setAbout(e.target.value)}
                className="sized-textarea"
                as="textarea"
                isInvalid={errors.about}
                rows="3"
                placeholder="Write a few words about yourself"
                defaultValue={about}
              />
            </Form.Group>
          </div>
          <Button
            disabled={isUpdateDisabled}
            className="update-user-btn"
            type="submit"
            size="lg"
            variant="outline-info"
          >
            Update me
          </Button>
        </div>
      </Form>
    </>
  );
};

export default withRouter(UserProfile);
