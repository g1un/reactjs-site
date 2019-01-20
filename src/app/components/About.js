import React, {Component} from 'react';

import {getSkills} from '../middleware/Skills';

export class About extends Component {
    constructor() {
        super();
        this.state = {
            skills: {
                ru: [],
                en: []
            },
            skillsLoading: true
        };
    }

    componentDidMount() {
        //this prevents from doing the same xhr twice
        //since this component renders twice
        //second rendering caused by updating this.state.isActive in HeaderItem component
        if(this.props.isActive) new getSkills(skills => this.onSkillsGot(skills)).send();
    }

    onSkillsGot(skills) {
        if(skills) {
            this.setState({
                skills: skills,
                skillsLoading: false
            });
        } else {
            this.setState({
                skillsLoading: false
            })
        }
    }

    getContent() {
        if(this.state.skillsLoading) {
            return 'Loading...';
        } else if(this.state.skills[this.props.lang].length < 1) {
            return 'There are no skills yet';
        } else {
            return (
                <ul className="skills__list">
                    {this.state.skills[this.props.lang].map((item, i) => {
                        return (
                            <li className="skills__item" key={i}>
                                {this.state.skills[this.props.lang][i].split('\n').map((line, index) => {
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
        return (
            <div className="skills">
                <h1 className="txt-title-2">
                    {this.props.pageTitle}
                </h1>
                {this.getContent()}
            </div>
        );
    }
}