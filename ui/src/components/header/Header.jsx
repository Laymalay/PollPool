import React, { useState, useEffect } from "react";
import { useQuery } from "react-apollo-hooks";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { meQuery } from "../../schema/queries";
import { AUTH_TOKEN, USER_ID, USER_NAME } from "../../constants";
import { Navbar, Nav } from "react-bootstrap";
import "./Header.css";
import { useApolloClient } from "@apollo/react-hooks";

export const Header = props => {
  let authToken = localStorage.getItem(AUTH_TOKEN);

  const { data: { me = {} } = {} } = useQuery(meQuery);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const client = useApolloClient();

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(USER_NAME);
    client.writeData({ data: { isLoggedIn: false } });
  };

  useEffect(() => {
    console.log("useeffect, is admin ?", me && me.isStaff, me.username);
    me && me.isStaff ? setIsAdmin(true) : setIsAdmin(false);
    setUsername(me.username);
  }, [me]);

  return (
    <Navbar sticky="top" variant="dark">
      <Navbar.Brand className="navbar-title">
        <Link className="navbar-title" to="/polls">
          PollPool
        </Link>
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Link className="nav-link" to="/polls">
          All Polls
        </Link>
        {authToken && (
          <Link className="nav-link" to="/userpolls">
            My Polls
          </Link>
        )}
        <Link className="nav-link" to="/test">
          Test
        </Link>
      </Nav>

      {username && (
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as:{" "}
            <Link className="user-link" to="/userprofile">
              {username}
            </Link>
          </Navbar.Text>
          {isAdmin && (
            <a
              className="settings-link"
              href="http://localhost:8000/admin"
              target="_blank"
            >
              settings
            </a>
          )}
        </Navbar.Collapse>
      )}
      {authToken ? (
        <Link onClick={logout} className="nav-link" to="/login">
          Logout
        </Link>
      ) : (
        <Link className="nav-link" to="/login">
          Login
        </Link>
      )}
    </Navbar>
  );
};

export default withRouter(Header);
