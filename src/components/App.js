import React from "react";
import PropTypes from "prop-types";

//componet App should connect with store for state as props
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Navbar, Page404, Login, Signup } from "./";
import { fetchPosts } from "../actions/posts";
import * as jwtDecode from "jwt-decode";
import { authenticateUser } from "../actions/auth";

class App extends React.Component {
  //Here we are going to fetch the posts from an API using conmponentDid Mount
  componentDidMount() {
    //here we are calling the fetchpost() from action and in action we will use async to fetch the data and store in redux store
    this.props.dispatch(fetchPosts());

    const token = localStorage.getItem("token");

    if (token) {
      const user = jwtDecode(token);

      console.log("user", user);

      //store the user is reducer
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
    }
  }

  render() {
    console.log("PROPS", this.props);
    const { posts } = this.props;
    return (
      <Router>
        <div>
          <Navbar />

          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return <Home {...props} posts={posts} />;
              }}
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route component={Page404} />
          </Switch>
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

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
