import axios from 'axios';

const getGistsForUser = username => {
    debugger;

    return axios.get(`https://api.github.com/users/${username}/gists`
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

export default getGistsForUser;
