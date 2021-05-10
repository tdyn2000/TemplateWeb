import axios from "axios";
import { apiUrl, loadToken } from "./Api";

export function getLoggedUser() {
  return JSON.parse(localStorage.getItem("loggedUser"));
}

export async function getAllUsers(params) {
  loadToken();
  var allUsers = [];

  try {
    allUsers = (await axios.get(`${apiUrl}/users`)).data.users;
  } catch (e) {
    throw e.response.data;
  }

  if (!params) return allUsers;

  const lowerParam = params.toLowerCase();

  return allUsers.filter((user) =>
    user.username.toLowerCase().includes(lowerParam)
  );
}

export async function getUserById(id) {
  loadToken();
  var user;

  try {
    user = (await axios.get(`${apiUrl}/user/${id}`)).data.user;
  } catch (e) {
    throw e.response.data;
  }
  return user;
}

export async function updateUser(user) {
  loadToken();
  try {
    var _user = (await axios.post(`${apiUrl}/updateUser`, user)).data.user;
    return _user;
  } catch (e) {
    throw e.response.data;
  }
}

export async function getRoleById(id) {
  loadToken();
  return axios.get(`${apiUrl}/role/${id}`);
}

export async function getRoles() {
  loadToken();
  try {
    return (await axios.get(`${apiUrl}/roles`)).data.roles;
  } catch (e) {
    throw e.response.data;
  }
}

export async function register(userData) {
  const users = await getAllUsers();

  if (users.find((u) => u.email === userData.email)) {
    throw new Error("Email already exists.");
  }

  try {
    return (await axios.post(`${apiUrl}/users`, userData)).data.user;
  } catch (e) {
    throw e.response.data;
  }
}

export async function login(user) {
  try {
    const result = await axios.post(`${apiUrl}/signIn`, {
      username: user.username,
      password: user.password,
    });
    if (result.data) {
      localStorage.setItem("token", JSON.stringify(result.data.token));
      localStorage.setItem("loggedUser", JSON.stringify(result.data.user));
      return result.data;
    } else {
      throw new Error("Incorrect username/password");
    }
  } catch (e) {
    throw e.response.data;
  }
}

export async function deleteUser(id) {
  try {
    await axios.get(`${apiUrl}/deleteUser/${id}`);
    return id;
  } catch (e) {
    throw e.response.data;
  }
}

export async function createUser(user) {
  loadToken();
  try {
    return (await axios.post(`${apiUrl}/createUser`, user)).data.user;
  } catch (e) {
    throw e.response.data;
  }
}
