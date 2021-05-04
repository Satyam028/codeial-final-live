import React from "react";
import friends from "../reducers/friends";
import { FriendsListItem } from "./";

const FriendsList = (props) => {
  return (
    <div className="friends-list">
      <div className="header">Friends</div>
      {props.friends && props.friends.length === 0 && (
        <div className="no-friends">No Friends found!</div>
      )}

      {props.friends &&
        props.friends.map((friends) => (
          <FriendsListItem friend={friends.to_user} key={friend._id} />
        ))}
    </div>
  );
};
