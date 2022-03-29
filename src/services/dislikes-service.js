/**
 * @file Service for dislikes.
 */
import axios from "axios";

//const BASE_URL = "http://localhost:4000";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;
const TUITS_API = `${BASE_URL}/api/tuits`;

/**
 * Create AxiosInstance for API.
 * @type {AxiosInstance} api Axios instance for API.
 */
const api = axios.create({
  withCredentials: true
});

/**
 * Uses API to find all tuits disliked by user.
 * @param {string} userId Primary key of user
 * @returns {Promise<AxiosResponse<any>>} Promise to be notified when tuits
 * have been retrieved from the database
 */
export const findAllTuitsDislikedByUser = (userId) =>
    api.get(`${USERS_API}/${userId}/dislikes`)
        .then(response => response.data);

/**
 * Uses API to find all users that disliked a tuit.
 * @param {string} tid Primary key of disliked tuit
 * @returns {Promise<AxiosResponse<any>>} Promise to be notified when users
 * have been retrieved from the database
 */
export const findAllUsersThatDislikedTuit = (tid) =>
    api.get(`${TUITS_API}/${tid}/dislikes`)
        .then(response => response.data);

/**
 * Uses API to create a new dislike instance between a user and a tuit.
 * @param {string} uid Primary key of user to dislike tuit
 * @param {string} tid Primary key of tuit to be disliked
 * @returns {Promise<AxiosResponse<any>>} Promise to be notified when dislike
 * is inserted into the database
 */
export const userDislikesTuit = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);

/**
 * Retrieve dislike of given tuit by given user if it exists.
 * @param {string} uid Primary key of user to dislike tuit
 * @param {string} tid Primary key of tuit to be disliked
 * @returns {Promise<AxiosResponse<any>>} Promise to be notified when dislike
 * is retrieved from the database
 */
export const findUserDislikesTuit = (uid, tid) =>
    api.get(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => {
            return response.data;
        });