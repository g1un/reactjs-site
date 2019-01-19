import React from 'react';

import Fab from '@material-ui/core/Fab';

import ArrowDown from '../../svg/arrow-down.svg';
import ArrowUp from '../../svg/arrow-up.svg';

export default class Arrows extends React.Component {
    constructor() {
        super();
    }

    isDisables(i) {
        return ((i === 0 && this.props.first) || (i === 1 && this.props.last) || this.props.notSaved)
    }

    render() {
        return (
            <div className="arrows form__arrows">
                {[ArrowUp, ArrowDown].map((item, i) => {
                    return(
                        <Fab
                            key={i}
                            data-direction={i === 0 ? 'up' : 'down'}
                            className="md-button arrows__item _arrow js-arrow-button"
                            size={this.props.mini ? "small" : "medium"}
                            color="secondary"
                            disabled={this.isDisables(i)}
                            onClick={e => this.props.moveFields(e)}
                        >
                            {React.createElement(item)}
                        </Fab>
                    )
                })}
            </div>
        );
    }
}