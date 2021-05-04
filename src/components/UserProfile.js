import React, { Component } from "react";
import { fetchUserProfile } from "../actions/profile";
import { connect } from "react-redux";
import { APIUrls } from "../AllUrls/urls";
import { getAuthTokenFromLocalStorage } from "../AllUrls/utils";
import { addFriend } from "../actions/friend";
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state({
      success: null,
      error: null,
      successMessage: null,
    });
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.userId) {
      //dispatch an action to fetch that particular user
      this.props.dispatch(fetchUserProfile(match.params.userId));
    }
  }

  checkIfUserIsAFriend = () => {
    console.log("this.props", this.props);
    const { match, friends } = this.props;
    const userId = match.params.userId;

    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);

    if (index !== -1) {
      return true;
    }
    return false;
  };

  handleAddFriendClick = async () => {
    const userId = this.match.params.userId;
    const url = APIUrls.addFriend(userId);
    const options = {
      method: "POST",
      Headers: {
        "Content-Type": "application/x-www-form-url-encoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (data.success) {
      this.setState({
        success: true,
        successMessage: "Added Friend successfully!",
      });
      this.props.dispatch(addFriend(data.data.friendship));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  handleRemoveFriendClick = async () => {
    const userId = this.match.params.userId;
    const url = APIUrls.removeFriend(userId);
    const options = {
      method: "POST",
      Headers: {
        "Content-Type": "application/x-www-form-url-encoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (data.success) {
      this.setState({
        success: true,
        successMessage: "Removed Friend successfully!",
      });
      this.props.dispatch(addFriend(data.data.userId));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  render() {
    const {
      match: { params },
      profile,
    } = this.props;
    console.log("this.props", params);
    const user = profile.user;

    if (profile.inProgress) {
      return <h1>Loading profile!!</h1>;
    }

    const isUserAFriend = this.checkIfUserIsAFriend();
    const { success, error, successMessage } = this.state;

    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="btn-grp">
          {!isUserAFriend ? (
            <button
              className="button save-btn"
              onClick={this.handleAddFriendClick}
            >
              Add Friend
            </button>
          ) : (
            <button
              className="button save-btn"
              onClick={this.handleRemoveFriendClick}
            >
              Remove Friend
            </button>
          )}

          {success && (
            <div className="alert success-dialog">{successMessage}</div>
          )}
          {error && <div className="alert error-dialog">{error}</div>}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ profile, friends }) {
  return {
    profile,
    friends,
  };
}

export default connect(mapStateToProps)(UserProfile);
