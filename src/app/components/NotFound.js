import React from 'react';

export class NotFound extends React.Component {
    render() {
        return (
            <div className="not-found">
                <h2>{this.props.text}</h2>
            </div>
        );
    }
}