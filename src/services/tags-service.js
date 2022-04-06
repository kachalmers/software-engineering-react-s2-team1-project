/**
 * @file Implements the service for tuits
 */
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const TAGS_API = `${BASE_URL}/api/tags`;

/**
 * Since tags-service interacts with an API that uses session, axios is
 * configured to include cookies in the headers to support credentials.
 * @type {AxiosInstance}
 */
export const api = axios.create({
                                    withCredentials: true
                                });

/**
 * Uses API to find all tags.
 * @returns {Promise<AxiosResponse<any>>} JSON array with tags
 */
export const findAllTags = () =>
    api.get(TAGS_API)
        .then(response => response.data);

/**
 * Uses API to retrieve a tags by its primary key.
 * @param tid Primary key of tag
 * @returns {Promise<AxiosResponse<any>>} JSON with tag
 */
/*
export const findTagById = (tid) =>
    api.get(`${TAGS_API}/${tid}`)
        .then(response => response.data);
*/

/**
 * Use API to delete a given tuit.
 * @param {Tuit} tid Primary key of tuit
 * @returns {Promise<AxiosResponse<any>>} Status
 */
export const deleteTag = (tid) =>
    api.delete(`${TAGS_API}/${tid}`)
        .then(response => response.data);
