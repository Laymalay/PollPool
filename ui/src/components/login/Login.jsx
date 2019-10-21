import React, { useState } from "react";
import { AUTH_TOKEN } from "../../constants";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import { useMutation } from "react-apollo-hooks";
import { LoginMutation } from "../../schema/mutations";
import { withRouter } from "react-router";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data }] = useMutation(LoginMutation);

  const validateForm = () => {
    return username.length > 0 && password.length > 0;
  };
  
  const handleSubmit = event => {
    event.preventDefault();
    login({
      variables: {
        username,
        password
      }
    }).then(token => {
      localStorage.setItem(AUTH_TOKEN, token);
      props.history.push("/polls");
    });
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
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
          variant="outline-info"
          block
          disabled={!validateForm()}
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
};
export default withRouter(Login);
