import React, { Component } from 'react';
import getGistsForUser from './services/github-gist-api-service';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gistsToShow: [],
      error: undefined,
      searchTerm: '',
    }
  }

  searchTermChanged = e => {
    console.info(`Search term being updated to: ${e.target.value}`);
    this.setState({
      searchTerm: e.target.value,
    })
  }

  getGistsForUserClicked = username => {
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
      console.error(`error is: ${JSON.stringify(error)}`);
      this.setState({
        error: error.message,
      });
    });
  }

  render() {
    return (
      <div className="gist-viewer__container">
        <div className="gist-viewer__gist-search-control-container">
          <input onChange={this.searchTermChanged} type="text" placeholder="Enter GitHub username to retrieve thier public Gists..."/>
          <button onClick={this.getGistsForUserClicked} className="gist-viwer__search-btn">Search Gists</button>
        </div>
        <div className="gist-viewer__gists-search-results">
          {
            this.state.gistsToShow.map(gist => {
              return <div>Description: {gist.description} Created: {gist.created_at}</div>
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
