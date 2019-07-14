import React, { Component } from 'react';
import axios from 'axios';
import getGistsForUser from './services/github-gist-api-service';
import logo from './logo.svg';
import './App.css';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gistsToShow: [],
      error: undefined,
    }
  }

  getGistsForUserClicked = username => {
    debugger;

    const testUser = 'arcadia168';
    getGistsForUser(testUser).then(response => {
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
