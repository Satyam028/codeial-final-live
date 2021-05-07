import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/auth";
import { searchUsers } from "../actions/search";

class Navbar extends Component {
  logout = () => {
    localStorage.removeItem("token");
    this.props.dispatch(logoutUser());
  };

  handleSearch = (e) => {
    const searchText = e.target.value;

    this.props.dispatch(searchUsers(searchText));
  };
  render() {
    const { auth, results } = this.props;
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
          <input placeholder="Search" onChange={this.handleSearch} />

          {results.length > 0 && (
            <div className="search-results">
              <ul>
                {results.map((user) => (
                  <li className="search-results-row" key={user._id}>
                    <Link to={`/user/${user._id}`}>
                      <img
                        src="https://image.flaticon.com/icons/png/128/2922/2922510.png"
                        alt="user-dp"
                      />
                      <span>{user.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
    results: state.search.results,
  };
}

export default connect(mapStateToProps)(Navbar);
