import React from 'react';

import { getSkills, updateSkills } from '../../middleware/Skills';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';

import Arrows from '../Arrows';

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

    moveFields({target}, i) {
        let _fields = {
            ru: this.state.skills.ru[i],
            en: this.state.skills.en[i]
        };
        let direction = target.closest('.js-arrow-button').dataset.direction;
        let position = direction === 'up' ? (i - 1) : (i + 1);
        let newSkills = JSON.parse(JSON.stringify(this.state.skills));

        newSkills.ru.splice(i, 1);
        newSkills.en.splice(i, 1);

        newSkills.ru.splice(position, 0, _fields.ru);
        newSkills.en.splice(position, 0, _fields.en);

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
                            <div className="form__buttons admin-skill__buttons">
                                {this.state.skills.ru.length > 1 &&
                                [
                                    <Arrows
                                        key="arrows"
                                        mini={true}
                                        first={i === 0}
                                        last={i === (this.state.skills.ru.length - 1)}
                                        moveFields={(e) => this.moveFields(e, i)}
                                    />,
                                    <Button
                                        key="delete"
                                        variant="contained"
                                        className="form__button"
                                        onClick={() => this.deleteField(i)}
                                    >
                                        delete
                                    </Button>
                                ]
                                }
                            </div>
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
                        <Fab
                            color="secondary"
                            type="button"
                            className="f-r"
                            onClick={() => this.addField()}
                        >
                            +
                        </Fab>
                        <div className="admin-item__button cl-b">
                            <Button variant="contained" color="primary" type="submit">Save</Button>
                        </div>
                    </div>
                }
            </form>
        );
    }
}