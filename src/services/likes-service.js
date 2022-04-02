/**
 * @file Implements the service for likes
 */
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;

/**
 * Create AxiosInstance for API.
 * @type {AxiosInstance} api Axios instance for API.
 */
const api = axios.create({
    withCredentials: true
});

/**
 * Uses API to toggle likes of a tuit, creating or removing likes or
 * dislikes as needed.
 * @param {string} uid Primary key of user to toggle likes of tuit
 * @param {string} tid Primary key of tuit with likes to be toggled
 * @returns {Promise<AxiosResponse<any>>} Promise to be notified when likes
 * are toggled
 */
export const userTogglesTuitLikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);

/**
 * Uses API to find all tuits liked by user.
 * @param {string} userId Primary key of user
 * @returns {Promise<AxiosResponse<any>>} Promise to be notified when tuits
 * have been retrieved from the database
 */
export const findAllTuitsLikedByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/likes`)
        .then(response => response.data)