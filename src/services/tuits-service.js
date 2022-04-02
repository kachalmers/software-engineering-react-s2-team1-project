/**
 * @file Implements the service for tuits
 */
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const TUITS_API = `${BASE_URL}/api/tuits`;
const USERS_API = `${BASE_URL}/api/users`;

/**
 * Since tuits-service interacts with an API that uses session, axios is
 * configured to include cookies in the headers to support credentials.
 * @type {AxiosInstance}
 */
export const api = axios.create({
    withCredentials: true
});

/**
 * Uses API to find all tuits.
 * @returns {Promise<AxiosResponse<any>>} JSON array with tuits
 */
export const findAllTuits = () =>
    api.get(TUITS_API)
        .then(response => response.data);

/**
 * Uses API to retrieve a tuit by its primary key.
 * @param tid Primary key of tuit
 * @returns {Promise<AxiosResponse<any>>} JSON with tuit
 */
export const findTuitById = (tid) =>
    api.get(`${TUITS_API}/${tid}`)
        .then(response => response.data);

/**
 * Uses API to retrieve tuits posted by a given user.
 * @param uid Primary key of user
 * @returns {Promise<AxiosResponse<any>>} JSON array with tuits
 */
export const findTuitByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/tuits`)
        .then(response => response.data);

/**
 * Uses API to create a tuit posted by a given user.
 * @param uid Primary key of user
 * @param tuit Primary key of tuit
 * @returns {Promise<AxiosResponse<any>>} JSON array with tuit
 */
export const createTuitByUser = (uid, tuit) =>
    api.post(`${USERS_API}/${uid}/tuits`, tuit)
        .then(response => response.data);

/**
 * Uses API to update a given tuit with given values.
 * @param tid Primary key of tuit
 * @param tuit Tuit
 * @returns {Promise<AxiosResponse<any>>} JSON with tuit
 */
export const updateTuit = (tid, tuit) =>
    api.post(`${TUITS_API}/${tid}`, tuit)
        .then(response => response.data);

/**
 * Use API to delete a given tuit.
 * @param {Tuit} tid Primary key of tuit
 * @returns {Promise<AxiosResponse<any>>} Status
 */
export const deleteTuit = (tid) =>
    api.delete(`${TUITS_API}/${tid}`)
        .then(response => response.data);

/**
 * (For testing) Use API to remove tuits with given text.
 * @param {String} text Tuit text
 * @returns {Promise<AxiosResponse<any>>} Status for tuit deletion
 */
export const deleteTuitByTuitText = (text) =>
    api.delete(`${TUITS_API}/text/${text}`)
        .then(response => response.data)
