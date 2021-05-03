import React, { Component } from "react";
import { connect } from "react-redux";
import { signup, startSignup } from "../actions/auth";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    };
  }

  handleInputChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, name } = this.state;

    if (email && password && confirmPassword && name) {
      this.props.dispatch(startSignup());

      this.props.dispatch(signup(email, password, confirmPassword, name));
    }
  };
  render() {
    const { error, inProgress } = this.props.auth;
    return (
      <form className="login-form">
        <span className="login-signup-header">Signup</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="text"
            placeholder="name"
            required
            // ref={this.emailInputRef}
            onChange={(e) => this.handleInputChange("name", e.target.value)}
          />
        </div>
        <div className="field">
          <input
            type="text"
            placeholder="email"
            required
            // ref={passwordInputRef}
            onChange={(e) => this.handleInputChange("email", e.target.value)}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Confirm Password"
            required
            // ref={passwordInputRef}
            onChange={(e) =>
              this.handleInputChange("confirmPassword", e.target.value)
            }
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            // ref={passwordInputRef}
            onChange={(e) => this.handleInputChange("password", e.target.value)}
          />
        </div>
        <div className="field">
          <button onClick={this.onFormSubmit} disabled={inProgress}>
            Signup
          </button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Signup);
