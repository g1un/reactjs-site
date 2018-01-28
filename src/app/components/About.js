import React from 'react';
import DocumentTitle from 'react-document-title';

import { Header } from './Header';

export class About extends React.Component {
    render() {
        return (
            <DocumentTitle title='About'>
                <Header currentPath={this.props.location.pathname}>
                    <h1>
                        About
                    </h1>
                </Header>
            </DocumentTitle>
        );
    }
}