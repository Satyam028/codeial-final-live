import { APIUrls } from "../AllUrls/urls";
import {
  FETCH_USER_PROFILE,
  USER_PROFILE_FAILED,
  USER_PROFILE_SUCCESSFUL,
} from "./actionTypes";
import { getAuthTokenFromLocalStorage } from "../AllUrls/utils";

export function startUserProfileFetch() {
  return {
    type: FETCH_USER_PROFILE,
  };
}

export function userProfileSuccess(user) {
  return {
    type: USER_PROFILE_SUCCESSFUL,
    user,
  };
}

export function userProfileFailed(error) {
  return {
    type: USER_PROFILE_FAILED,
    error,
  };
}

export function fetchUserProfile(userId) {
  return (dispatch) => {
    dispatch(startUserProfileFetch);

    const url = APIUrls.userprofile(userId);
    fetch(url, {
      headers: {
        Content_type: "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(userProfileSuccess(data.data.user));

          return;
        }
        dispatch(userProfileFailed(data.message));
      });
  };
}
