import React, { Component } from "react";
import friends from "../reducers/friends";
import { Chat, PostsList } from "./";
import FriendsList from "./FriendsList";

export default class Home extends Component {
  render() {
    const { posts, friends, isLoggedIn } = this.props;
    return (
      <div className="home">
        <PostsList posts={posts} />
            {isLoggedIn && <FriendsList friends={friends} />}
            {isLoggedIn && <Chat/>}
      </div>
    );
  }
}
