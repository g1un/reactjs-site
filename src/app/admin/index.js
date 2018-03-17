import React from 'react';
import { render } from "react-dom";
import DocumentTitle from 'react-document-title';

import '../../scss/style.scss';

import { Admin } from '../components/admin/Admin';

import { Header } from '../components/Header';
import { HeaderItem } from '../components/HeaderItem';

class AdminIndex extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <DocumentTitle title="Admin">
                <div className="container">
                    <Header>
                        <HeaderItem pageTitle='Admin'>
                            <Admin/>
                        </HeaderItem>
                    </Header>
                </div>
            </DocumentTitle>
        );
    }
}

render(<AdminIndex />, window.document.getElementById('app'));