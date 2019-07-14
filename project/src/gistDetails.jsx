import React, { Component } from 'react';

class GistDetails extends Component {
    constructor(props) {
        super(props);
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
                                <h3>Filename: {currentFileDetails.filename}</h3>
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
