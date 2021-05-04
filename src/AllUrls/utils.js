export function getFormBody(params) {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // 'user name'=='user%20name'
    let encodedValue = encodeURIComponent(params[property]); //satyam 123 = satyam%2020123
    formBody.push(encodedKey + "=" + encodedValue);
  }
  return formBody.join("&"); //'username=akash&password=12343'
}


//fetching the token and passing it to editprofile action to match the user id
export function getAuthTokenFromLocalStorage() {
  return localStorage.getItem("token");
}
