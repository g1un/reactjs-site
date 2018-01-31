import React from 'react';
import DocumentTitle from 'react-document-title';

export class Content extends React.Component {
    constructor(props) {
        super();
        this.pageTitle = props.pageTitle;
    }

    render() {
        return (
            <DocumentTitle title={this.pageTitle}>
                <div className="content">
                    {this.props.children}
                </div>
            </DocumentTitle>
        );
    }
}