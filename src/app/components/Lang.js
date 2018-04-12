import React from 'react';

import Button from 'material-ui-next/Button';

export class LangComponent extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <Button size="small" className="lang" onClick={this.props.toggleLang}>
                {this.props.lang}
            </Button>
        );
    }
}