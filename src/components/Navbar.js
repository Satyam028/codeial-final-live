import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
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
        <div className="user">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
            id='user-dp'
          />
          <span>John Doe</span>
        </div>
        <div className="nav-links">
          <ul>
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/logout">Log Out</Link>
            </li>
            <li>
              <Link to="/signup">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
