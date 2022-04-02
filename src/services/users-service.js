/**
 * @file Implements the service for users
 */
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const LOGIN_API = `${BASE_URL}/api/login`;
const USERS_API = `${BASE_URL}/api/users`;

/**
 * Uses API to create user.
 * @param user User with username, password, and email
 * @returns {Promise<AxiosResponse<any>>} JSON with user
 */
export const createUser = (user) =>
    axios.post(USERS_API, user)
        .then(response => response.data);

/**
 * Uses API to find all users.
 * @returns {Promise<AxiosResponse<any>>} JSON array with users
 */
export const findAllUsers = () =>
    axios.get(USERS_API)
        .then(response => response.data);

/**
 * Uses API to find a user by their primary key.
 * @param uid Primary key of user
 * @returns {Promise<AxiosResponse<any>>} JSON with user
 */
export const findUserById = (uid) =>
    axios.get(`${USERS_API}/${uid}`)
        .then(response => response.data);

/**
 * Uses API to remove a user.
 * @param uid Primary key of user
 * @returns {Promise<AxiosResponse<any>>} Status of deletion
 */
export const deleteUser = (uid) =>
  axios.delete(`${USERS_API}/${uid}`)
    .then(response => response.data);

/**
 * (For testing) Uses API to remove users with a given username.
 * @param username Username of user to be deleted
 * @returns {Promise<AxiosResponse<any>>} Status of deletion
 */
export const deleteUsersByUsername = (username) =>
  axios.get(`${USERS_API}/username/${username}/delete`)
    .then(response => response.data);

/**
 * Uses API to find a user by their login credentials.
 * @param credentials Credentials of user
 * @returns {Promise<AxiosResponse<any>>} JSON with user or error status
 */
export const findUserByCredentials = (credentials) =>
  axios.post(`${LOGIN_API}`, credentials)
    .then(response => response.data);

const service = {
  findAllUsers
}

export default service;