import React from 'react';

export class Content extends React.Component {
    constructor(props) {
        super();
        this.pageTitle = props.pageTitle;
    }

    render() {
        return (
            <div className="content">
                {this.props.children}
            </div>
        );
    }
}