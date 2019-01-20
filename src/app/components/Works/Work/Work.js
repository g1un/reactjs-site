import React, {Component} from "react";
import {connect} from "react-redux";

class Work extends Component {
    constructor() {
        super();
        this.texts = {
            'Repository': 'Репозиторий'
        }
    }

    getDesc(lang) {
        return this.props.data[`desc${lang === 'ru' ? 'Ru' : 'En'}`];
    }

    render() {
		const {
			lang
		} = this.props.appStore;

        return (
            <div className="work block works__item">
                <div className="work__site">
                    <a href={this.props.data.address} target="_blank">
                        {this.props.data.address}
                    </a>
                </div>
                {this.props.data.repo &&
                <div className="work__repo">
                    {lang === 'ru' ? this.texts['Repository'] : 'Repository'}: {this.props.data.repo}
                </div>
                }
                <div className="work__image">
                    <img src={this.props.data.imageSrc} alt=""/>
                </div>
                <p className="work__desc">
                    {this.getDesc(lang)}
                </p>
            </div>
        );
    }
}

export default connect(
	state => ({
		appStore: state
	})
)(Work);