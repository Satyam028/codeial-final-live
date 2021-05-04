import { FETCH_FRIEND_SUCCESS, ADD_FRIEND } from "./actionTypes";
import { APIUrls } from "../AllUrls/urls";
import { getAuthTokenFromLocalStorage } from "../AllUrls/utils";

export function fetchFriendsSuccess(friend) {
  return {
    type: FETCH_FRIEND_SUCCESS,
    friend,
  };
}

export function fetchUserFriends(userId) {
  return (dispatch) => {
    const url = APIUrls.userFriends(userId);
    fetch(url, {
      headers: {
        Content_type: "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        dispatch(fetchFriendsSuccess(data.data.friends));
      });
  };
}

export function addFriend(friendship) {
  return {
    type: ADD_FRIEND,
    friendship,
  };
}

export function removedFriend(userId) {
  return {
    type: ADD_FRIEND,
    userId,
  };
}
