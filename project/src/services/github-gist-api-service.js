import axios from 'axios';

const GITHUB_GIST_API_URL = 'https://api.github.com';
const getGistsForUser = username => {
    debugger;

    return axios.get(`${GITHUB_GIST_API_URL}/users/${username}/gists`
        ).then(response => {
        debugger;
        console.info(`response is: ${JSON.stringify(response)}`);
        return response;
    }).catch(error => {
        debugger;
        console.error(`error is: ${JSON.stringify(error)}`);
        throw error;
    })
}

const getGist = gistId => {
    debugger;
    console.log(`Getting singular Gist info for ${gistId}`);
    return axios.get(`${GITHUB_GIST_API_URL}/gists/${gistId}`
        ).then(response => {
        debugger;
        console.info(`response is: ${JSON.stringify(response)}`);
        return response;
    }).catch(error => {
        debugger;
        console.error(`error is: ${JSON.stringify(error)}`);
        throw error;
    })
}

export { getGistsForUser, getGist };
