import React from 'react';

import Lang from '../middleware/lang';

import Button from 'material-ui-next/Button';

export class LangComponent extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <Button size="small" className="lang" onClick={this.props.toggleLang}>
                {Lang.getLang() === 'en' ? 'ru' : 'en'}
            </Button>
        );
    }
}