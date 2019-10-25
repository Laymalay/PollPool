import React, { useState } from "react";
import { AUTH_TOKEN, USER_ID } from "../../constants";
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  FormLabel
} from "react-bootstrap";
import "./Login.css";
import { useMutation } from "react-apollo-hooks";
import { LoginMutation, SignupMutation } from "../../schema/mutations";
import { meQuery } from "../../schema/queries";
import { withRouter } from "react-router";
import { useLazyQuery } from "@apollo/react-hooks";

const Login = props => {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useMutation(LoginMutation);
  const [signUp] = useMutation(SignupMutation);
  const [getMe, { loadingUser, data }] = useLazyQuery(meQuery);

  if (loadingUser) return <p>Loading ...</p>;

  if (data && data.me) {
    localStorage.setItem(USER_ID, data.me.id);
    props.history.push("/polls");
  }

  const validateForm = () => {
    return username.length > 0 && password.length > 0;
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!isLogin) {
      signUp({
        variables: {
          email,
          password,
          username
        }
      }).then(() => setIsLogin(true));
      return;
    }
    login({
      variables: {
        username,
        password
      }
    }).then(({ data: { tokenAuth: { token } } }) => {
      localStorage.setItem(AUTH_TOKEN, token);
      getMe();
    });
  };

  return (
    <Form className="login-form" onSubmit={handleSubmit}>
      {!isLogin && (
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
      )}
      <FormGroup controlId="username">
        <FormLabel>Username</FormLabel>
        <FormControl
          autoFocus
          type="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </FormGroup>
      <FormGroup controlId="password">
        <FormLabel>Password</FormLabel>
        <FormControl
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
        />
      </FormGroup>
      <Button
        variant="info"
        block
        className="action-btn"
        size="lg"
        disabled={!validateForm()}
        type="submit"
      >
        {isLogin ? "Login" : "Create account"}
      </Button>
      <Button
        variant="outline-info"
        size="sm"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "need to create an account?" : "already have an account?"}
      </Button>
    </Form>
  );
};
export default withRouter(Login);
