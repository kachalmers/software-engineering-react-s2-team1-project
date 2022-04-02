/**
 * @file Implements client services
 */
import axios from "axios";  // import library to provide access to authentication middleware

const BASE_URL = process.env.REACT_APP_BASE_URL;

const AUTH_API = `${BASE_URL}/api/auth`;

// Create an axios instance instead of using the axios object directly
const api = axios.create({
    /*
    Configure axios instance to include cookie headers to establish user
    identity
    */
    withCredentials: true
});

/**
 * POSTs to the signup middleware to create a user.
 * @param user a new User with all required attributes
 * @returns {Promise<AxiosResponse<any>>} JSON for User or error status
 */
export const signup = (user) =>
    api.post(`${AUTH_API}/signup`, user)
        .then(response => response.data)

/**
 * POSTs to the login middleware to create a session.
 * @param credentials User's credentials (username, password) for login
 * @returns {Promise<AxiosResponse<any>>} JSON for User or error status
 */
export const login = (credentials) =>
    api.post(`${AUTH_API}/login`, credentials)
        .then(response => response.data)

/**
 * POSTs to the logout middleware to destroy the session.
 * @returns {Promise<AxiosResponse<any>>} Status
 */
export const logout = () =>
    api.post(`${AUTH_API}/logout`)
        .then(response => response.data)

/**
 * POSTs to the profile middleware and returns the current logged in user.
 * @returns {Promise<AxiosResponse<any>>} JSON for User or error status
 */
export const profile = () =>
    api.post(`${AUTH_API}/profile`)
        .then(response => response.data)