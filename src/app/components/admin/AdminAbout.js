import React from 'react';

import { getSkills, updateSkills } from '../../middleware/Skills';

import Button from 'material-ui-next/Button';
import TextField from 'material-ui-next/TextField';

export default class AdminAbout extends React.Component {
    constructor(props) {
        super();
        this.childClass = props.childClass;
        this.state = {
            skills: [],
            skillsLoading: true
        };
    }

    componentDidMount() {
        new getSkills(skills => this.onSkillsGot(skills)).send();
    }

    onSkillsGot(skills) {
        this.setState({
            skills: skills,
            skillsLoading: false
        });
    }

    addField() {
        let newItems = this.state.skills.slice();
        newItems.push('');

        this.setState({
            skills: newItems
        });
    }

    deleteField(id) {
        let newItems = this.state.skills.slice();
        newItems.splice(id, 1);

        this.setState({
            skills: newItems
        });
    }

    save(e) {
        e.preventDefault();
        new updateSkills(msg => this.onSkillsUpdated(msg)).send(this.state.skills);
    }

    onSkillsUpdated(message) {
        console.log('save result: ' + message);
    }

    onSkillChanged({target}, i) {
        let newItems = this.state.skills.slice();
        newItems[i] = target.value;

        this.setState({
            skills: newItems
        });
        console.log('skill changed!');
    }

    getContent() {
        let content;
        if(this.state.skillsLoading) {
            return 'Loading...';
        } else if(this.state.skills.length < 1) {
            return (
                <div className="form__item _flex _textarea">
                    <TextField
                        multiline
                        label="Write skill"
                        className="form__textarea"
                        value=""
                        margin="normal"
                        onChange={e => this.onSkillChanged(e, i)}
                    />
                </div>
            );
        } else {
            return (
                this.state.skills.map((item, i) => {
                    return (
                        <div className="form__item _flex _textarea" key={i}>
                            <TextField
                                multiline
                                label="Write skill"
                                className="form__textarea"
                                value={item}
                                margin="normal"
                                onChange={e => this.onSkillChanged(e, i)}
                            />
                            {this.state.skills.length > 1 &&
                            <Button
                                variant="fab"
                                mini
                                type="button"
                                className="form__button _left"
                                onClick={() => this.deleteField(i)}
                            >
                                -
                            </Button>
                            }
                        </div>
                    )
                })
            );
        }
    }

    render() {
        return (
            <form className="admin-item form clearfix" onSubmit={e => this.save(e)}>
                <h2 className="txt-title-2">Skills</h2>
                {this.getContent()}
                {!this.state.skillsLoading &&
                    <div className="admin-item__buttons">
                        <Button
                            variant="fab"
                            color="secondary"
                            type="button"
                            className="f-r"
                            onClick={() => this.addField()}
                        >
                            +
                        </Button>
                        <div className="admin-item__button cl-b">
                            <Button variant="raised" color="primary" type="submit">Save</Button>
                        </div>
                    </div>
                }
            </form>
        );
    }
}