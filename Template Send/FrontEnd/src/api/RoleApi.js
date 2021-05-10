import axios from "axios";
import { apiUrl, loadToken } from "./Api";

export async function getRoleById(id) {
  loadToken();
  try {
    return (await axios.get(`${apiUrl}/role/${id}`)).data;
  } catch (e) {
    throw e.response.data;
  }
}

export async function getRoles() {
  loadToken();
  try {
    return (await axios.get(`${apiUrl}/roles`)).data.roles;
  } catch (e) {
    throw e.response.data;
  }
}

export async function updateRole(role) {
  loadToken();
  try {
    return (await axios.post(`${apiUrl}/updateRole`, role)).data;
  } catch (e) {
    throw e.response.data;
  }
}

export async function createRole(role) {
  loadToken();
  try {
    return (await axios.post(`${apiUrl}/createRole`, role)).data;
  } catch (e) {
    throw e.response.data;
  }
}

export async function deleteRole(id) {
  loadToken();
  try {
    await axios.get(`${apiUrl}/deleteRole/${id}`);
    return id;
  } catch (e) {
    throw e.response.data;
  }
}
