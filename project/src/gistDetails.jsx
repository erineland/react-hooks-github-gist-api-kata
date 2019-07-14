import React, { Component } from 'react';

class GistDetails extends Component {
    isFileCurrentUserFavourite = filename => {
        debugger;
        const currentUsername = this.props.currentUsername;
        const userFavourites = this.props.userFavourites;

        console.info(`The currentUsername: ${currentUsername}`);
        console.info(`The current favourites are: ${JSON.stringify(userFavourites)}`);

        // Retreive favourite files for the current username
        const currentUserFavourites = userFavourites[currentUsername];
        console.info(`The favourites for the current user ${currentUsername} are: ${currentUserFavourites}`);

        // Now check to see if the file to be rendered is a favourite of the currently searched user.
        let fileIsFavouriteOfCurrentUser = false;
        if (currentUserFavourites) {
            fileIsFavouriteOfCurrentUser = currentUserFavourites.indexOf(filename) > -1;
        }

        console.info(`The current file ${filename} is a favourite of the current user ${currentUsername}? ${fileIsFavouriteOfCurrentUser}`);
        return fileIsFavouriteOfCurrentUser
    }

    render() {
        const details = this.props.details;
        const setFavourite = this.props.setFavourite;

        return (
            <div>
                <h1>Gist Details!</h1>
                <div>
                    <h2>Files in Gist:</h2>
                    {
                        Object.keys(details.files).map((fileKey, index) => {
                            const currentFileDetails = details.files[fileKey];
                            console.info(
                                `The current file details being rendered are: ${JSON.stringify(currentFileDetails)}`
                            );
                            return <div key={index}>
                                <h3>
                                    Filename: {currentFileDetails.filename}
                                    {
                                        this.isFileCurrentUserFavourite(currentFileDetails.filename) ?
                                            <span> - FAVOURITED! </span> : null
                                    }
                                </h3>
                                <h4>Content:</h4>
                                <p>{currentFileDetails.content}</p>
                                <button onClick={() => setFavourite(currentFileDetails.filename)}>Mark file as favourite</button>
                            </div>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default GistDetails;
