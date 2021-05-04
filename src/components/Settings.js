import React, { Component } from "react";
import { connect } from "react-redux";
import { clearAuthState, editUser } from "../actions/auth";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state({
      name: "",
      password: "",
      confirmPassword: "",
      editMode: false,
    });
  }

  handleChange = (fieldName, val) => {
    this.setState({
      [fieldName]: val,
    });
  };

  handleSave = () => {
    const { password, confirmPassword, name } = this.state;
    const { user } = this.props.auth;

    this.props.dispatch(editUser(name, password, confirmPassword, user._Id));
  };

  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }
  
  render() {
    const { user, error } = this.props.auth;
    const { editMode } = this.state;
    return (
      <div className="sttings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>
        {error && <div className="alert error-dialog">{error}</div>}
        {error === false && (
          <div className="alert success-dialog">
            Successfully profile updated
          </div>
        )}
        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="field">
          <div className="field-label">name</div>
          {editMode ? (
            <input
              type="text"
              onChange={(e) => this.handleChange("name", e.target.name)}
              value={this.state.name}
            />
          ) : (
            <div className="field-label">{user.name}</div>
          )}
        </div>

        {editMode && (
          <div className="field">
            <div className="field-label">New password</div>

            <input
              type="password"
              onChange={(e) =>
                this.handleChange("new password", e.target.password)
              }
              value={this.state.password}
            />
          </div>
        )}

        {editMode && (
          <div className="field">
            <div className="field-label">Confirm password</div>

            <input
              type="password"
              onChange={(e) => this.handleChange(e.target.confirmPassword)}
              value={this.state.confirmPassword}
            />
          </div>
        )}

        <div className="btn-grp">
          {editMode ? (
            <button className="button save-btn" onClick={this.handleSave}>
              Save
            </button>
          ) : (
            <button
              className="button edit-btn"
              onClick={() => this.handleChange("editMode", true)}
            >
              Edit Button
            </button>
          )}
        </div>

        {editMode && (
          <div
            className="go-back"
            onClick={() => this.handleChange("editMode", false)}
          >
            Go Back
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(mapStateToProps)(Settings);
