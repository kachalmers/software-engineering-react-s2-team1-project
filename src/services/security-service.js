import axios from "axios";
// const BASE_URL = "https://cs5500-01-sp22.herokuapp.com/api";
// const BASE_URL = "http://localhost:4000/api";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const SECURITY_API = `${BASE_URL}/api/auth`;

const api = axios.create({
    withCredentials: true
});

export const register = (user) =>
    api.post(`${SECURITY_API}/register`, user)
        .then(response => response.data);

export const login = (user) =>
    api.post(`${SECURITY_API}/login`, user)
        .then(response => response.data);

export const logout = (user) =>
    api.post(`${SECURITY_API}/logout`, user)
        .then(response => response.data);

export const profile = () =>
    api.post(`${SECURITY_API}/profile`)
        .then(response => response.data);