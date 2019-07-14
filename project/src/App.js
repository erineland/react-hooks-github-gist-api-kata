import React, { Component } from 'react';
import { getGistsForUser, getGist } from './services/github-gist-api-service';

import GistDetails from './gistDetails';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gistsToShow: [],
      error: undefined,
      searchTerm: '',
      gistDetailsToShow: undefined,
      userFavourites: {}, // store objects with 'username' and 'favouriteFiles' arrays.
      currentUsername: '',
    }
  }

  setFavouriteFile = (favouriteFilename) => {
    debugger;
    const username = this.state.currentUsername;

    console.info(`Setting user favourite file in outer component scope`);
    console.info(`Setting user favourite file with filename: ${favouriteFilename}`);
    console.info(`Setting user favourite file for user: ${username}`);

    const currentUserFavourites = this.state.userFavourites;
    console.info(`Current userFavourites are: ${JSON.stringify(currentUserFavourites)}`);
    const currentUserFavouriteFiles = currentUserFavourites[username];
    console.info(`Current user ${username}'s favourite files are: ${currentUserFavouriteFiles}`);

    // TODO: Use array deconstruction here instead!
    if (currentUserFavourites[username]) {
      currentUserFavourites[username] = currentUserFavouriteFiles.concat(favouriteFilename);
    } else {
      currentUserFavourites[username] = [favouriteFilename];
    }

    // Now update the favourite files with the new favourite files...
    this.setState({
      userFavourites: currentUserFavourites,
    });
  }

  searchTermChanged = e => {
    console.info(`Search term being updated to: ${e.target.value}`);
    this.setState({
      searchTerm: e.target.value,
    })
  }

  showAllGists = () => {
    // Show all gists again.
    this.setState({
      gistDetailsToShow: undefined,
    });
  }

  getGistsForUserClicked = () => {
    // debugger;

    // Clear out whatever is current shown if user clicks search button
    this.setState({
      gistsToShow: [],
      gistDetailsToShow: undefined,
    });

    const userToSearch = this.state.searchTerm;
    console.info(`The GitHub username search term is: ${userToSearch}`);
    getGistsForUser(userToSearch).then(response => {
      // debugger;
      console.info(`response is: ${JSON.stringify(response)}`);
      this.setState({
        gistsToShow: response.data,
        currentUsername: this.state.searchTerm, //we know at this point the search term is a valid GitHub username
      });
    }).catch(error => {
      debugger;
      console.error(`error in getGistsForUser is: ${JSON.stringify(error)}`);
      this.setState({
        error: error.message,
      });
    });
  }

  handleShowGist = gistId => {
    // debugger;
    console.info(`User has clicked Gist: ${gistId}`);

    getGist(gistId).then(response => {
      // debugger;
      console.info(`response from getGist is: ${response}`);
      this.setState({
        gistDetailsToShow: response.data,
      })
    }).catch(error => {
      debugger;
      console.error(`error in getGist is: ${JSON.stringify(error)}`);
      this.setState({
        error: error.message,
      });
    });
  }

  render() {
    return (
      <div className="gist-viewer__container">
        <div className="gist-viewer__gist-search-control-container">
          <input onChange={this.searchTermChanged} type="text" placeholder="Enter GitHub username to retrieve thier public Gists..." />
          <button onClick={this.getGistsForUserClicked} className="gist-viwer__search-btn">Search Gists</button>
        </div>
        {

          this.state.gistDetailsToShow ? //If a Gist has been clicked, show only the details of that Gist
            <div>
              <div>
                <button onClick={this.showAllGists}>Show all Gists for {this.state.currentUsername} (Back)</button>
              </div>
              <GistDetails
                setFavourite={this.setFavouriteFile}
                details={this.state.gistDetailsToShow}
                userFavourites={this.state.userFavourites}
                currentUsername={this.state.currentUsername}
              />
            </div>
            :
            <div className="gist-viewer__gists-search-results">
              {
                this.state.gistsToShow.map(gist => {
                  return <div>
                    <span onClick={() => this.handleShowGist(gist.id)}>
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
}

export default App;
