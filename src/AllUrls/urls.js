const API_URLS = "http://codeial.com:8000/api/v2";

export const APIUrls = {
  login: () => `${API_URLS}/users/login`,
  signup: () => `${API_URLS}/users/signup`,
  fetchPosts: (page = 1, limit = 5) => `/posts?page=${page}&limit=${limit}`,
};
