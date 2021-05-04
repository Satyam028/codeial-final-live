const API_URLS = "http://codeial.com:8000/api/v2";

export const APIUrls = {
  login: () => `${API_URLS}/users/login`,
  signup: () => `${API_URLS}/users/signup`,
  editProfile: () => `${API_URLS}/users/editprofile`,
  fetchPosts: (page = 1, limit = 5) => `/posts?page=${page}&limit=${limit}`,
  userprofile: (userId) => `${API_URLS}/users/${userId}`,
  userFriends: () => `${API_URLS}/friendship/fetch_user_friends`,
  addFriend: (userId) => `${API_URLS}/users/friendship/create_friendship ? user_id=${userId}`,
  removeFriend: (userId) => `${API_URLS}/users/friendship/remove_friendship ? user_id=${userId}`,

};
