/**
 * @file Implements the service for follows
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
 * Uses API to toggle follow of the author of a tuit, creating or removing a follow
 * as needed.
 * @param {string} uid Primary key of user to toggle follow of the author of a tuit
 * @param {string} tid Primary key of tuit with author to be followed/unfollowed
 * @returns {Promise<AxiosResponse<any>>} Promise to be notified when follow
 * is toggled
 */
export const userTogglesFollow = (uid, otherUser) => {
    return api.put(`${USERS_API}/${uid}/followees/${otherUser._id}`)
        .then(response => response.data);
}