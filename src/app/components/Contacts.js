import React from 'react';
import DocumentTitle from 'react-document-title';

import { Header } from './Header';

export class Contacts extends React.Component {
    render() {
        return (
            <DocumentTitle title='Contacts'>
                <Header currentPath={this.props.location.pathname}>
                    <h1>
                        Contacts
                    </h1>
                </Header>
            </DocumentTitle>
        );
    }
}