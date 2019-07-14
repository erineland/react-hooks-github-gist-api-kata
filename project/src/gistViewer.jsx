import React, { useState } from 'react';
import { getGistsForUser, getGist } from './services/github-gist-api-service';

// import GistDetails from './gistDetails';
import './App.css';

const GistViewer = () => {
  // Declare hooks to use
  const [gistsToShow, setGistsToShow] = useState([]);
  const [error, setError] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [gistDetailsToShow, setGistDetailsToShow] = useState(undefined);
  const [userFavourites, setUserFavourites] = useState([]);
  const [currentUsername, setCurrentUsername] = useState('');

  const isFileCurrentUserFavourite = (filename, currentUsername, userFavourites) => {
    debugger
    // Retreive favourite files for the current username
    const currentUserFavourites = userFavourites.filter(currentUserFavourites => {
      return currentUserFavourites.username === currentUsername;
    });

    // Now check to see if the file to be rendered is a favourite of the currently searched user.
    let fileIsFavouriteOfCurrentUser = false;
    if (currentUserFavourites.length > 0) {
      fileIsFavouriteOfCurrentUser = currentUserFavourites[0].favourites.indexOf(filename) > -1;
    }

    return fileIsFavouriteOfCurrentUser
  }

  const setFavouriteFile = favouriteFilename => {
    debugger;
    console.info(`Setting user favourite file in outer component scope`);
    console.info(`Setting user favourite file with filename: ${favouriteFilename}`);
    console.info(`Setting user favourite file for user: ${currentUsername}`);

    console.info(`Current userFavourites are: ${JSON.stringify(userFavourites)}`);

    let userFavouritesFound = false;
    for (let i = 0; i < userFavourites.length; i++) {
      const currentUserFavourites = userFavourites[i];

      if (currentUserFavourites.username === currentUsername) {
        userFavouritesFound = true;

        if (currentUserFavourites.favourites.indexOf(favouriteFilename) < -1) {
          currentUserFavourites.favourites.push(favouriteFilename);
        }
      }
    }

    if (!userFavouritesFound) {
      const newUserFavourites = {
        username: currentUsername,
        favourites: [favouriteFilename]
      }

      userFavourites.push(newUserFavourites);
    }

    // Now update the favourite files with the new favourite files...
    setUserFavourites([...userFavourites]);
  }

  const searchTermChanged = e => {
    console.info(`Search term being updated to: ${e.target.value}`);
    setSearchTerm(e.target.value);
  }

  const showAllGists = () => {
    // Show all gists again.
    setGistDetailsToShow(undefined);
  }

  const getGistsForUserClicked = () => {
    // debugger;

    // Clear out whatever is current shown if user clicks search button
    setGistsToShow([]);
    setGistDetailsToShow(undefined);

    const userToSearch = searchTerm;
    console.info(`The GitHub username search term is: ${userToSearch}`);
    getGistsForUser(userToSearch).then(response => {
      // debugger;
      console.info(`response is: ${JSON.stringify(response)}`);
      setGistsToShow(response.data);
      setCurrentUsername(searchTerm);
    }).catch(error => {
      debugger;
      console.error(`error in getGistsForUser is: ${JSON.stringify(error)}`);
      setError(error.message);
    });
  }

  const handleShowGist = gistId => {
    // debugger;
    console.info(`User has clicked Gist: ${gistId}`);

    getGist(gistId).then(response => {
      // debugger;
      console.info(`response from getGist is: ${response}`);
      setGistDetailsToShow(response.data);
    }).catch(error => {
      debugger;
      console.error(`error in getGist is: ${JSON.stringify(error)}`);
      setError(error.message);
    });
  }

  // const gistDetails = {
  //   setFavourite: setFavouriteFile,
  //   gistDetails: gistDetailsToShow,
  //   userFavourites: userFavourites,
  //   currentUsername: currentUsername
  // }

  return (
    <div className="gist-viewer__container">
      <div className="gist-viewer__gist-search-control-container">
        <input onChange={searchTermChanged} type="text" placeholder="Enter GitHub username to retrieve thier public Gists..." />
        <button onClick={getGistsForUserClicked} className="gist-viwer__search-btn">Search Gists</button>
      </div>
      <div>
        <span>User favourites are: {JSON.stringify(userFavourites)}</span>
      </div>
      {
        gistDetailsToShow ? //If a Gist has been clicked, show only the details of that Gist
          <div>
            <div>
              <button onClick={showAllGists}>Show all Gists for {currentUsername} (Back)</button>
            </div>
            <div className="gist-details__container">
              <h1>Gist Details!</h1>
              <div>
                <h2>Files in Gist:</h2>
                {
                  Object.keys(gistDetailsToShow.files).map((fileKey, index) => {
                    const currentFileDetails = gistDetailsToShow.files[fileKey];
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
                            ) ? <span> - FAVOURITED! </span> : null
                          }
                        </h3>
                        <button onClick={() => setFavouriteFile(currentFileDetails.filename)}>Favourite</button>
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
          </div>
          :
          <div className="gist-viewer__gists-search-results">
            {
              gistsToShow.map(gist => {
                return <div>
                  <span onClick={() => handleShowGist(gist.id)}>
                    Description: {gist.description} Created: {gist.created_at}
                  </span>
                </div>
              })
            }
          </div>
      }
    </div>
  );
}

export default GistViewer;
