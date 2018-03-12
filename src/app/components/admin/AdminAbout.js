import React from 'react';

import { getSkills, updateSkills } from '../../middleware/Skills';

import { TextField } from 'rmwc/TextField';
import { Button } from 'rmwc/Button';

import '@material/textfield/dist/mdc.textfield.min.css';
import '@material/button/dist/mdc.button.min.css';

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
                        textarea
                        className="form__textarea"
                        label="Write skill"
                        value=""
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
                                textarea
                                className="form__textarea"
                                label="Write skill"
                                value={item}
                                onChange={e => this.onSkillChanged(e, i)}
                            />
                            {this.state.skills.length > 1 &&
                            <Button type="button" className="form__button _left" onClick={() => this.deleteField(i)}>Delete</Button>
                            }
                        </div>
                    )
                })
            );
        }
    }

    render() {
        return (
            <form className={this.childClass + " admin-item form clearfix"} onSubmit={e => this.save(e)}>
                <h2 className="txt-title-2">Skills</h2>
                {this.getContent()}
                {!this.state.skillsLoading &&
                    <div className="admin-item__buttons">
                        <Button stroked type="button" className="f-r" onClick={() => this.addField()}>Add</Button>
                        <div className="admin-item__button cl-b">
                            <Button raised type="submit">Save</Button>
                        </div>
                    </div>
                }
            </form>
        );
    }
}