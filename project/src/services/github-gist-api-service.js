import axios from 'axios';

const GITHUB_GIST_API_URL = 'https://api.github.com';
const getGistsForUser = username => {
    return axios.get(`${GITHUB_GIST_API_URL}/users/${username}/gists`
        ).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
}

const getGist = gistId => {
    return axios.get(`${GITHUB_GIST_API_URL}/gists/${gistId}`
        ).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
}

export { getGistsForUser, getGist };
