import React from 'react';
import DocumentTitle from 'react-document-title';

import { Header } from './Header';

export class Works extends React.Component {
    render() {
        return (
            <DocumentTitle title='Works'>
                <Header currentPath={this.props.location.pathname}>
                    <h1>
                        Works
                    </h1>
                </Header>
            </DocumentTitle>
        );
    }
}