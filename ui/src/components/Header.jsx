import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { AUTH_TOKEN } from "../constants";
import { navigate } from "hookrouter";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

export const Header = () => {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/polls" className="navbar-title">
        PollPool
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/polls">All</Nav.Link>
        {authToken && <Nav.Link href="/create">CREATE</Nav.Link>}
        <Nav.Link href="/test">TEST</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form>
      {authToken ? (
       <Nav.Link href="/polls"
          onClick={() => {
            localStorage.removeItem(AUTH_TOKEN);
            navigate("/polls/");
          }}
        >
          LOGOUT
        </Nav.Link>
      ) : (
        <Nav.Link href="/login">LOGIN</Nav.Link>
      )}
    </Navbar>
  );
};

export default withRouter(Header);
