import { FETCH_SEARCH_RESULTS_SUCCESS } from "./actionTypes";
import { getAuthTokenFromLocalStorage } from "../AllUrls/utils";
import { APIUrls } from "..//AllUrls/urls";

export function searchUsers(searchText) {
  return (dispatch) => {
    const url = APIUrls.userSearch(searchText);

    fetch(url, {
      headers: {
        "COntent-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.succuss) {
          dispatch(searchResultsSuccess(data.data.users));
        } else {
          dispatch(searchResultsSuccess([]));
        }
      });
  };
}

export function searchResultsSuccess(users) {
  return {
    type: FETCH_SEARCH_RESULTS_SUCCESS,
    users,
  };
}
