import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/auth";

class Navbar extends Component {
  logout = () => {
    localStorage.removeItem("token");
    this.props.dispatch(logoutUser());
  };

  render() {
    const { auth } = this.props;
    return (
      <div className="nav">
        <div className="left-nav">
          <Link to="/">
            <img
              src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="search-container">
          <img
            className="search-icon"
            src="https://image.flaticon.com/icons/png/128/622/622669.png"
            alt="search-icon"
          />
          <input placeholder="Search" />

          <div className="search-results">
            <ul>
              <li className="search-results-row">
                <img
                  src="https://image.flaticon.com/icons/png/128/2922/2922510.png"
                  alt="user-dp"
                />
                <span>John Doe</span>
              </li>
              <li className="search-results-row">
                <img
                  src="https://image.flaticon.com/icons/png/128/2922/2922510.png"
                  alt="user-dp"
                />
                <span>John Doe</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="right-nav">
          {auth.isLoggedIn && (
            <div className="user">
              <img
                src="https://image.flaticon.com/icons/png/128/3135/3135715.png"
                alt="user-pic"
              />
              <span>{auth.user.name}</span>
            </div>
          )}
          <div className="nav-links">
            <ul>
              {!auth.isLoggedIn && (
                <li>
                  <Link to="/login">Log In</Link>
                </li>
              )}

              {auth.isLoggedIn && (
                <li>
                  <button onClick={this.logout}>Log Out</button>
                </li>
              )}

              {!auth.isLoggedIn && (
                <li>
                  <Link to="/signup">Register</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Navbar);
