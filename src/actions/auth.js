import { LOGIN_START } from "./actionTypes";
import { getFormBody } from "../AllUrls/utils";
export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function login(email, password) {
  return (disatch) => {
    const url = APIUrls.login();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ email, password }),
    });
  };
}
