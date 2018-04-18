import React from 'react';

import { getSkills, updateSkills } from '../../middleware/Skills';

import Button from 'material-ui-next/Button';
import TextField from 'material-ui-next/TextField';

export default class AdminAbout extends React.Component {
    constructor(props) {
        super();
        this.childClass = props.childClass;
        this.skillsTemplate = {
            ru: [''],
            en: ['']
        };
        this.state = {
            skills: JSON.parse(JSON.stringify(this.skillsTemplate)),
            skillsLoading: true
        };
    }

    componentDidMount() {
        new getSkills(skills => this.onSkillsGot(skills)).send();
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
            });
        }
    }

    addField() {
        let newSkills = JSON.parse(JSON.stringify(this.state.skills));
        newSkills.ru.push('');
        newSkills.en.push('');

        this.setState({
            skills: newSkills
        });
    }

    deleteField(id) {
        let newSkills = JSON.parse(JSON.stringify(this.state.skills));
        newSkills.ru.splice(id, 1);
        newSkills.en.splice(id, 1);

        this.setState({
            skills: newSkills
        });
    }

    save(e) {
        e.preventDefault();
        new updateSkills(msg => this.onSkillsUpdated(msg)).send(this.state.skills);
    }

    onSkillsUpdated(message) {
        console.log('save result: ' + message);
    }

    onSkillChanged({target}, i, lang) {
        let newSkills = JSON.parse(JSON.stringify(this.state.skills));
        newSkills[lang][i] = target.value;

        this.setState({
            skills: newSkills
        });
    }

    getContent() {
        let content;
        if(this.state.skillsLoading) {
            return 'Loading...';
        } else {
            return (
                this.state.skills.ru.map((item, i) => {
                    return [
                        <div className="admin-skill admin-skills__item clearfix" key={i}>
                            <div className="admin-skill__inputs">
                                <TextField
                                    multiline
                                    label="Write skill in russian"
                                    className="form__textarea admin-skill__textarea"
                                    value={this.state.skills.ru[i]}
                                    margin="normal"
                                    onChange={e => this.onSkillChanged(e, i, 'ru')}
                                />
                                <TextField
                                    multiline
                                    label="Write skill in english"
                                    className="form__textarea admin-skill__textarea"
                                    value={this.state.skills.en[i]}
                                    margin="normal"
                                    onChange={e => this.onSkillChanged(e, i, 'en')}
                                />
                            </div>
                            {this.state.skills.ru.length > 1 &&
                            <Button
                                variant="raised"
                                className="form__button _left f-r"
                                onClick={() => this.deleteField(i)}
                            >
                                delete
                            </Button>
                            }
                        </div>
                    ]
                })
            );
        }
    }

    render() {
        return (
            <form className="admin-item form clearfix admin-skills" onSubmit={e => this.save(e)}>
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