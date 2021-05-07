import {
  ADD_POST,
  ADD_COMMENT,
  UPDATE_POSTS,
  UPDATE_POST_LIKES,
} from "./actionTypes";
import { APIUrls } from "../AllUrls/urls";
import { getFormBody } from "../AllUrls/utils";
import { getAuthTokenFromLocalStorage } from "../AllUrls/utils";

export function fetchPosts() {
  return (dispatch) => {
    const url = APIUrls.fetchPosts();
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(updatePosts(data.data.posts));
      });
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function createPost(content) {
  return (dispatch) => {
    const url = APIUrls.createPost();

    fetch(url, {
      method: "POST",
      headers: {
        Content_type: "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ content }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data", data);

        if (data.success) {
          dispatch(addPost(data.data.post));
        }
      });
  };
}

//adding comment for particular user's post
export function createComment(content, postId) {
  return (dispatch) => {
    const url = APIUrls.createComment();

    fetch(url, {
      method: "POST",
      headers: {
        Content_type: "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ content, post_id: postId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data", data);

        if (data.success) {
          dispatch(addComment(data.data.comment, postId));
        }
      });
  };
}

export function addComment(comment, postId) {
  return {
    type: ADD_COMMENT,
    comment,
    postId,
  };
}

export function addLike(id, likeTypes, userId) {
  return (dispatch) => {
    const url = APIUrls.toggleLike(id, likeTypes);

    fetch(url, {
      method: "POST",
      headers: {
        Content_type: "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("LIKE To POST", data);

        if (data.success) {
          dispatch(addLikeToStore(id, userId));
        }
      });
  };
}

export function addLikeToStore(postId, userId) {
  return {
    type: UPDATE_POST_LIKES,
    postId,
    userId,
  };
}
