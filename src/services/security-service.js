/**
 * @file Implements client services.
 */
import axios from "axios";  // import library to provide access to authentication middleware
// const BASE_URL = "https://cs5500-01-sp22.herokuapp.com";
//const BASE_URL = "http://localhost:4000";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const SECURITY_API = `${BASE_URL}/api/auth`;

// Create an axios instance instead of using the axios object directly
const api = axios.create({
    // Configure axios instance to include cookie headers to establish user
    // identity
    withCredentials: true
});

export const register = (user) =>
    api.post(`${SECURITY_API}/register`, user)
        .then(response => response.data);

export const login = (user) =>
    api.post(`${SECURITY_API}/login`, user)
        .then(response => response.data);

// POSTs to the logout middleware to destroy the session
export const logout = (user) =>
    api.post(`${SECURITY_API}/logout`, user)
        .then(response => response.data);

// POSTs to the profile middleware and returns the current logged in user
export const profile = () =>
    api.post(`${SECURITY_API}/profile`)
        .then(response => response.data);