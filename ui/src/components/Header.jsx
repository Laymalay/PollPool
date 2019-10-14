import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { AUTH_TOKEN } from "../constants";
import { navigate } from "hookrouter";

export const Header = () => {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-light">
      <a className="navbar-brand navbar-title" href="/">
        PollPool
      </a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a href="/polls" className="nav-link">
              ALL
            </a>
          </li>
          {authToken && (
            <li className="nav-item">
              <a href="/create" className="nav-link">
                CREATE
              </a>
            </li>
          )}
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
          />
          <button className="btn btn-secondary my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
        <div>
          {authToken ? (
            <div
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
                navigate('/polls/');;
              }}
            >
              logout
            </div>
          ) : (
            <a href="/login" className="nav-link login-link">
              LOGIN
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Header);
