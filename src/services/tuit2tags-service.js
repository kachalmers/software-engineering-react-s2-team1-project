/**
 * @file Implements the service for tuits2tags
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
 * Use API to retrieve tuits with a given tag
 * @param {string} tagString String of the tag
 * @returns {Promise<AxiosResponse<any>>} Tuits Array
 */
export const findTuitsWithTag = (tagString) =>
    api.get(`${TAGS_API}/${tagString}/tuits`)
        .then(response => response.data);