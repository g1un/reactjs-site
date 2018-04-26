import React from 'react';

import Button from 'material-ui-next/Button';

import ArrowDown from '../../svg/arrow-down.svg';
import ArrowUp from '../../svg/arrow-up.svg';

export default class Arrows extends React.Component {
    constructor() {
        super();
    }

    isDisables(i) {
        return ((i === 0 && this.props.first) || (i === 1 && this.props.last))
    }

    render() {
        return (
            <div className="arrows form__arrows">
                {[ArrowUp, ArrowDown].map((item, i) => {
                    return(
                        <Button
                            key={i}
                            data-direction={i === 0 ? 'up' : 'down'}
                            className="md-button arrows__item _arrow js-arrow-button"
                            variant="fab"
                            color="secondary"
                            disabled={this.isDisables(i)}
                            onClick={e => this.props.moveFields(e)}
                        >
                            {React.createElement(item)}
                        </Button>
                    )
                })}
            </div>
        );
    }
}