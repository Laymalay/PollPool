import React from "react";
import { withRouter } from "react-router";
import { AUTH_TOKEN, USER_ID } from "../../constants";
import { navigate } from "hookrouter";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "./Header.css";

export const Header = () => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  
  const logout =() =>{
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(USER_ID);
  }
  
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
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form>
      {authToken ? (
        <Nav.Link
          href="/login"
          className="nav-link"
          onClick={logout}
        >
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
