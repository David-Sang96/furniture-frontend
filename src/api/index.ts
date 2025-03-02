import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      //   window.location.href = "/login";
      //This redirects unauthenticated users to the login page with a redirect parameter, so after logging in, they are sent back to the page they originally wanted to visit instead of always landing on the homepage
      window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
    }
    // propagate the error to wherever the request was made
    return Promise.reject(error);
  },
);

export default api;

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
