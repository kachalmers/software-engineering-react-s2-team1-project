/**
 * @file Implements the service for dislikes
 */
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;

/**
 * Create AxiosInstance for API.
 * @type {AxiosInstance} api Axios instance for API.
 */
export const api = axios.create({
    withCredentials: true
});

/**
 * Uses API to toggle dislikes of a tuit, creating or removing likes or
 * dislikes as needed.
 * @param {string} uid Primary key of user to toggle dislikes of tuit
 * @param {string} tid Primary key of tuit with dislikes to be toggled
 * @returns {Promise<AxiosResponse<any>>} Promise to be notified when dislikes
 * are toggled
 */
export const userTogglesTuitDislikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data)

/**
 * Uses API to find all tuits disliked by user.
 * @param {string} userId Primary key of user
 * @returns {Promise<AxiosResponse<any>>} Promise to be notified when tuits
 * have been retrieved from the database
 */
export const findAllTuitsDislikedByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/dislikes`)
        .then(response => response.data)