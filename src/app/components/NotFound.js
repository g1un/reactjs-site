import React from 'react';
import DocumentTitle from 'react-document-title';

export class NotFound extends React.Component {
    render() {
        return (
            <DocumentTitle title="Nothing found">
                <div className="not-found">
                    <h2>{this.props.text}</h2>
                </div>
            </DocumentTitle>
        );
    }
}