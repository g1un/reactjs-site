import React from 'react';

export default class AdminWork extends React.Component {
    constructor() {
        super();
        this.texts = {
            'Repository': 'Репозиторий'
        }
    }

    getDesc() {
        return this.props.data[`desc${this.props.lang === 'ru' ? 'Ru' : 'En'}`];
    }

    render() {
        return (
            <div className="work block works__item">
                <div className="work__site">
                    <a href={this.props.data.address} target="_blank">
                        {this.props.data.address}
                    </a>
                </div>
                {this.props.data.repo &&
                <div className="work__repo">
                    {this.props.lang === 'ru' ? this.texts['Repository'] : 'Repository'}: {this.props.data.repo}
                </div>
                }
                <div className="work__image">
                    <img src={this.props.data.imageSrc} alt=""/>
                </div>
                <p className="work__desc">
                    {this.getDesc()}
                </p>
            </div>
        );
    }
}