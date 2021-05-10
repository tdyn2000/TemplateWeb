import axios from "axios";

export const apiUrl = "http://localhost:10001/api";

export function getToken() {
  return JSON.parse(localStorage.getItem("token"));
}

export function loadToken() {
  const token = getToken();
  axios.defaults.headers.common["x-access-token"] = token;
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedUser");
  }
