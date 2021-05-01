import React from 'react';

function Navbar(props) {
    return (
        <div className="nav">
          <div className="left-nav">
            <img
              src="https://t3.ftcdn.net/jpg/02/99/16/06/240_F_299160630_WelNuVXwjH68vTfq1xUN4YHc8OLIiKO4.jpg"
              alt="logo"
            />
          </div>
          <div className="search-container">
            <img
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
                src="https://image.flaticon.com/icons/png/128/2922/2922510.png"
                alt="user-dp"
                id="user-dp"
              />
              <span>John Doe</span>
            </div>
            <div className="nav-link">
              <ul>
                <li>Log In</li>
                <li>Log Out</li>
                <li>Register</li>
              </ul>
            </div>
          </div>
        </div>
    );
}

export default Navbar;