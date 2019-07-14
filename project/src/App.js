import React, { Component } from 'react';
import { getGistsForUser, getGist } from './services/github-gist-api-service';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gistsToShow: [],
      error: undefined,
      searchTerm: '',
      gistDetailsToShow: undefined,
    }
  }

  searchTermChanged = e => {
    console.info(`Search term being updated to: ${e.target.value}`);
    this.setState({
      searchTerm: e.target.value,
    })
  }

  getGistsForUserClicked = () => {
    debugger;

    const userToSearch = this.state.searchTerm;
    console.info(`The GitHub username search term is: ${userToSearch}`);
    getGistsForUser(userToSearch).then(response => {
      debugger;
      console.info(`response is: ${JSON.stringify(response)}`);
      this.setState({
        gistsToShow: response.data
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
    debugger;
    console.info(`User has clicked Gist: ${gistId}`);

    getGist(gistId).then(response => {
      debugger;
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
        <div className="gist-viewer__gists-search-results">
          {
            this.state.gistsToShow.map(gist => {
              return <div>
                <span>
                  Description: {gist.description} Created: {gist.created_at}
                </span>
                <span>
                  <button onClick={() => this.handleShowGist(gist.id)} className="gist-viewer__show-gist-details">
                    Show details
                  </button>
                </span>
              </div>
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
