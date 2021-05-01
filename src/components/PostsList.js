import React, { Component } from "react";
import PropTypes from "prop-types";

class PostsList extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="posts-list">
        {posts.map((post) => (
          <div className="post-wrapper" key={post._id}>
            <div className="post-header">
              <div className="post-avatar">
                <img
                  src="https://image.flaticon.com/icons/png/128/3135/3135715.png"
                  alt="user-pic"
                />
                <div>
                  <span classname="post-author">{post.user.name}</span>
                  <span classname="post-time">a minute ago</span>
                </div>
              </div>
              <div className="post-author">{post.content}</div>

              <div className="post-action">
                <div className="post-like">
                  <img
                    src="https://t4.ftcdn.net/jpg/01/42/20/11/240_F_142201188_TEWIeGNSQSWJ0jcCzuohEfOsVgvqgvZ0.jpg"
                    alt="likes-icon"
                  />
                  <span>{post.likes.length}</span>
                </div>
              </div>
              <div className="post-comment-box">
                <input placeholder="start typing here something" />
              </div>

              <div className="post-comments-list">
                <div className="post-comments-items">
                  <div className="post-comments-header">
                    <span className="post-comment-author">Bill</span>
                    <span className="post-comment-time">a minute ago</span>
                    <span className="post-comment-likes">20</span>
                  </div>
                  <div className="post-comment-content">Random content</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostsList;