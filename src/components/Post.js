import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Comment } from "./";
import { addLike, createComment } from "../actions/posts";
import { connect } from "react-redux";
// import { connect } from "react-redux";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
  }

  handleAddComment = (e) => {
    const { comment } = this.state;
    const { post } = this.props;
    if (e.key === "Enter") {
      this.props.dispatch(createComment(comment, post._id));

      //clear comment
      this.setState({
        cooment: "",
      });
    }
  };

  handleOnCommentChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };

  handlePostLikes = () => {
    const { post, user } = this.props;
    this.props.dispatch(addLike(post._id, "Post", user._id));
  };
  render() {
    const { post, user } = this.props;
    const { comment } = this.state;
    const isUserPostLikedByUser = post.likes.includes(user._id);
    return (
      <div className="post-wrapper" key={post._id}>
        <div className="post-header">
          <div className="post-avatar">
            <Link to={`/user/${post.user._id}`}>
              <img
                src="https://image.flaticon.com/icons/png/128/3135/3135715.png"
                alt="user-pic"
              />
            </Link>
            <div>
              <span classname="post-author">{post.user.name}</span>
              <span classname="post-time">a minute ago</span>
            </div>
          </div>
          <div className="post-author">{post.content}</div>

          <div className="post-action">
            <button className="post-like no-btn" onClick={this.handlePostLikes}>
              {isUserPostLikedByUser ? (
                <img
                  src="https://image.flaticon.com/icons/svg/1076/1076984.svg"
                  alt="like post"
                />
              ) : (
                <img
                  src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                  alt="likes-icon"
                />
              )}
              <span>{post.likes.length}</span>
            </button>
          </div>

          <div className="post-comment-box">
            <input
              placeholder="start typing comment"
              onChange={this.handleOnCommentChange}
              onKeyPress={this.handleAddComment}
              value={comment}
            />
          </div>

          <div className="post-comments-list">
            {post.comments.map((comment) => (
              <Comment Comment={Comment} key={Comment._id} postId={post._id} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  posts: PropTypes.array.isRequired,
};

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}

export default connect(mapStateToProps)(Post);
