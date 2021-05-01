import React from "react";
import PropTypes from "prop-types";

//componet App should connect with store for state as props
import { connect } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { PostsList, Navbar } from "./";
import { fetchPosts } from "../actions/posts";

class App extends React.Component {
  //Here we are going to fetch the posts from an API using conmponentDid Mount
  componentDidMount() {
    //here we are calling the fetchpost() from action and in action we will use async to fetch the data and store in redux store
    this.props.dispatch(fetchPosts());
  }

  render() {
    console.log("PROPS", this.props);
    const { posts } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
          <PostsList posts={posts} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
