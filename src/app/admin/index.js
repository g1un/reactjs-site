import React from 'react';
import { render } from "react-dom";
import DocumentTitle from 'react-document-title';

import DocTitle from '../middleware/docTitle';

import '../../scss/style.scss';

import { Admin } from '../components/admin/Admin';
import { Header } from '../components/Header';
import { HeaderItem } from '../components/HeaderItem';

class AdminIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            documentTitle: DocTitle.get()
        }
    }

    updateDocumentTitle() {
        this.setState({
            documentTitle: DocTitle.get()
        });
    }

    render() {
        return (
            <DocumentTitle title={this.state.documentTitle}>
                <div className="container">
                    <Header>
                        <HeaderItem
                            routePath="/admin"
                            pageTitle="Admin"
                            updateDocumentTitle={() => {}}

                        >
                            <Admin updateDocTitle={() => this.updateDocumentTitle()}/>
                        </HeaderItem>
                    </Header>
                </div>
            </DocumentTitle>
        );
    }
}

render(<AdminIndex />, window.document.getElementById('app'));