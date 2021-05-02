import React from "react";
import PropTypes from "prop-types";

//componet App should connect with store for state as props
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Navbar, Page404, Login } from "./";
import { fetchPosts } from "../actions/posts";

const Signup = () => <div>Signup</div>;

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
