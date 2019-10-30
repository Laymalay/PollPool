import React from "react";
import { withRouter } from "react-router";
import { AUTH_TOKEN, USER_ID, USER_NAME } from "../../constants";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "./Header.css";

export const Header = () => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const username = localStorage.getItem(USER_NAME);

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(USER_NAME);
  };

  return (
    <Navbar sticky="top" bg="dark" variant="dark">
      <Navbar.Brand href="/polls" className="navbar-title">
        PollPool
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/polls">All Polls</Nav.Link>
        {authToken && <Nav.Link href="/userpolls">My Polls</Nav.Link>}
        <Nav.Link href="/test">Test</Nav.Link>
      </Nav>
      {/* <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form> */}
      {username && (
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a>{username}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      )}
      {authToken ? (
        <Nav.Link href="/login" className="nav-link" onClick={logout}>
          Logout
        </Nav.Link>
      ) : (
        <Nav.Link className="nav-link" href="/login">
          Login
        </Nav.Link>
      )}
    </Navbar>
  );
};

export default withRouter(Header);
