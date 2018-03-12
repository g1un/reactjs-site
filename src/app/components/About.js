import React from 'react';

import { getSkills } from '../middleware/Skills';

export class About extends React.Component {
    constructor(props) {
        super();
        this.state = {
            skills: [],
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
        this.setState({
            skills: skills,
            skillsLoading: false
        });
    }

    getContent() {
        if(this.state.skillsLoading) {
            return 'Loading...';
        } else if(this.state.skills.length < 1) {
            return 'There are no skills yet';
        } else {
            return (
                <ul className="skills__list">
                    {this.state.skills.map((item, i) => {
                        return (
                            <li className="skills__item" key={i}>
                                {item.split('\n').map((line, index) => {
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
                    About
                </h1>
                {this.getContent()}
            </div>
        );
    }
}