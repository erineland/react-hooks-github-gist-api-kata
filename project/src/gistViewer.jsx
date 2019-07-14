import React, { Component } from 'react';
import { getGistsForUser, getGist } from './services/github-gist-api-service';

import GistDetails from './gistDetails';
import './App.css';

class GistViewer extends Component {
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
    const username = this.state.currentUsername;

    const currentUserFavourites = this.state.userFavourites;
    const currentUserFavouriteFiles = currentUserFavourites[username];

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

  isEnterPressed = e => {
    if (e.keCode === 13 || e.which === 13) {
      this.getGistsForUserClicked();
    }
  }

  searchTermChanged = e => {
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


    // Clear out whatever is current shown if user clicks search button
    this.setState({
      gistsToShow: [],
      gistDetailsToShow: undefined,
    });

    const userToSearch = this.state.searchTerm;
    getGistsForUser(userToSearch).then(response => {
      this.setState({
        gistsToShow: response.data,
        currentUsername: this.state.searchTerm, //we know at this point the search term is a valid GitHub username
      });
    }).catch(error => {
      ;
      this.setState({
        error: error.message,
      });
    });
  }

  handleShowGist = gistId => {
    getGist(gistId).then(response => {

      this.setState({
        gistDetailsToShow: response.data,
      })
    }).catch(error => {
      this.setState({
        error: error.message,
      });
    });
  }

  render() {
    const gistDetails = {
      setFavourite: this.setFavouriteFile,
      gistDetails: this.state.gistDetailsToShow,
      userFavourites: this.state.userFavourites,
      currentUsername: this.state.currentUsername
    }

    return (
      <div className="gist-viewer__container">
        <div className="gist-viewer__gist-search-control-container">
          <input className="gist-viewer__search-input" onKeyPress={this.isEnterPressed} onChange={this.searchTermChanged} type="text" placeholder="Enter GitHub username to retrieve thier public Gists..." />
          <button className="gist-viwer__search-btn" onClick={this.getGistsForUserClicked}>Search Gists</button>
        </div>
        {
          this.state.error ?
          <h1>Something went wrong! No search results found for that username. Try again.</h1>
          :
          this.state.gistDetailsToShow ? //If a Gist has been clicked, show only the details of that Gist
            <div className="gist-viewer__gist-details-container">
              <div className="gist-viewer__show-all-btn-container">
                <button className="gist-viewer__show-all-btn" onClick={this.showAllGists}>
                    Show all Gists for {this.state.currentUsername}
                </button>
              </div>
              <GistDetails {...gistDetails}/>
            </div>
            :
            this.state.gistsToShow.length === 0 ?
            <h1> No search results! Search a GitHub username above</h1>
            :
            <div className="gist-viewer__gists-search-results">
              {
                this.state.gistsToShow.map((gist, index) => {
                  return <div className="gist-viewer__gist-result" key={index}>
                    <div onClick={() => this.handleShowGist(gist.id)}>
                      <span>Description: {gist.description}</span>
                      <span>Created: {gist.created_at}</span>
                    </div>
                  </div>
                })
              }
            </div>
        }
      </div>
    );
  }
}

export default GistViewer;
