import React from 'react';

const GistDetails = props => {
    return (
        <div>
            <h1>Gist Details!</h1>
            <div>
                <h2>Files in Gist:</h2>
                {
                    Object.keys(props.files).map((fileKey, index) => {
                        const currentFileDetails = props.files[fileKey];
                        console.info(
                            `The current file details being rendered are: ${JSON.stringify(currentFileDetails)}`
                        );
                        return <div key={index}>
                            <h3>Filename: {currentFileDetails.filename}</h3>
                            <h4>Content:</h4>
                            <p>{currentFileDetails.content}</p>
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default GistDetails;
