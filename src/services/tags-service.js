/**
 * @file Implements the service for tags
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
 * Use API to delete a given tag.
 * @param {Tag} tagID Primary key of tag
 * @returns {Promise<AxiosResponse<any>>} Status
 */
export const deleteTag = (tagID) =>
    api.delete(`${TAGS_API}/${tagID}`)
        .then(response => response.data);


