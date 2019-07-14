import React from 'react';

const isFileCurrentUserFavourite = (filename, currentUsername, userFavourites) => {
    // Retreive favourite files for the current username
    const currentUserFavourites = userFavourites[currentUsername];

    // Now check to see if the file to be rendered is a favourite of the currently searched user.
    let fileIsFavouriteOfCurrentUser = false;
    if (currentUserFavourites) {
        fileIsFavouriteOfCurrentUser = currentUserFavourites.indexOf(filename) > -1;
    }

    return fileIsFavouriteOfCurrentUser
}

const GistDetails = ({
    gistDetails,
    setFavourite,
    currentUsername,
    userFavourites
}) => {
    return (
        <div className="gist-details__container">
            <h1>Gist Details!</h1>
            <div>
                <h2>Files in Gist:</h2>
                {
                    Object.keys(gistDetails.files).map((fileKey, index) => {
                        const currentFileDetails = gistDetails.files[fileKey];
                        console.info(
                            `The current file details being rendered are: ${JSON.stringify(currentFileDetails)}`
                        );
                        return <div key={index}>
                            <div className="gist-details__title-container">
                                <h3>
                                    Filename: {currentFileDetails.filename}
                                    {
                                        isFileCurrentUserFavourite(
                                            currentFileDetails.filename,
                                            currentUsername,
                                            userFavourites,
                                        ) ?
                                            <span> - FAVOURITED! </span> : null
                                    }
                                </h3>
                                <button onClick={() => setFavourite(currentFileDetails.filename)}>Favourite</button>
                            </div>
                            <div>
                                <h4>Content:</h4>
                                <code>{currentFileDetails.content}</code>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default GistDetails;
