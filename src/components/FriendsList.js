import React from "react";
import friends from "../reducers/friends";
import { FriendsListItem } from "./";

const FriendsList = (props) => {
  const { friends } = this.props;
  return (
    <div className="friends-list">
      <div className="header">Friends</div>
      {props.friends && props.friends.length === 0 && (
        <div className="no-friends">No Friends found!</div>
      )}

      {props.friends &&
        props.friends.map((friends) => (
          <FriendsListItem friends={friends.to_user} key={friends._id} />
        ))}
    </div>
  );
};

export default FriendsList;
