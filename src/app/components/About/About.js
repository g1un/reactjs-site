import React, {Component} from "react";
import {connect} from "react-redux";

import {getSkills} from "src/app/middleware/Skills";

import {PAGES} from "src/app/consts";

class About extends Component {
    constructor() {
        super();
        this.state = {
            skills: {
                ru: [],
                en: []
            },
            skillsIsLoaded: false
        };
    }

    onSkillsGot(skills) {
        if(skills) {
            this.setState({
                skills: skills,
                skillsIsLoaded: true
            });
        } else {
            this.setState({
                skillsIsLoaded: true
            })
        }
    }

    getContent(lang) {
        if(!this.state.skillsIsLoaded) {
            return 'Loading...';
        } else if(this.state.skills[lang].length < 1) {
            return 'There are no skills yet';
        } else {
            return (
                <ul className="skills__list">
                    {this.state.skills[lang].map((item, i) => {
                        return (
                            <li className="skills__item" key={i}>
                                {this.state.skills[lang][i].split('\n').map((line, index) => {
                                    return (
                                        <span className="skills__line" key={index}>
                                            {line}
                                            {index !== item.split('\n').length - 1 && <br/>}
                                        </span>
                                    );
                                })}
                            </li>
                        )
                    })}
                </ul>
            )
        }
    }

    render() {
        const {
            path
        } = this.props;

        const {
            lang
        } = this.props.appStore;

        const {
            skillsIsLoaded
        } = this.state;

		if(!skillsIsLoaded) new getSkills(skills => this.onSkillsGot(skills)).send();

        return (
            <div className="skills">
                <h2 className="txt-title-2">
                    {PAGES[path].title[lang]}
                </h2>
                {this.getContent(lang)}
            </div>
        );
    }
}

export default connect(
	state => ({
		appStore: state
	})
)(About);