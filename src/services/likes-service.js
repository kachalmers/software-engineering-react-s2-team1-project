import axios from "axios";

//const BASE_URL = "http://localhost:4000";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;
const TUITS_API = `${BASE_URL}/api/tuits`;

const api = axios.create({
  withCredentials: true
});

export const findAllTuitsLikedByUser = (userId) =>
    api.get(`${USERS_API}/${userId}/likes`)
        .then(response => response.data);

export const findAllUsersThatLikedTuit = (tid) =>
    api.get(`${TUITS_API}/${tid}/likes`)
        .then(response => response.data);

/**
 * Returns
 * @param uid
 * @param tid
 * @returns {Promise<AxiosResponse<any>>}
 */
export const userLikesTuit = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);

export const findUserLikesTuit = (uid, tid) =>
    api.get(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => { return response.data; });