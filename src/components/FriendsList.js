import React from "react";
import { FriendsListItem } from "./";

const FriendsList = (props) => {
  const { friends } = this.props;
  return (
    <div className="friends-list">
      <div className="header">Friends</div>
      {friends && friends.length === 0 && (
        <div className="no-friends">No Friends found!</div>
      )}

      {friends &&
        friends.map((friends) => (
          <FriendsListItem friends={friends.to_user} key={friends._id} />
        ))}
    </div>
  );
};

export default FriendsList;
