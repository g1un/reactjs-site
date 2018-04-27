import React from 'react';

import Button from 'material-ui-next/Button';
import TextField from 'material-ui-next/TextField';

import Arrows from '../Arrows';

export default class AdminWork extends React.Component {
    constructor(props) {
        super();
        this.state = {
            isChanged: false
        };
    }

    onWorkChanged({target}) {
        let _key = target.closest("[data-name]").dataset.name;
        let _value = _key !== 'imageFile' ? target.value : target.files[0];

        console.log(_key);

        this.setState({
            isChanged: true
        });

        this.props.onWorkChanged({ [_key]: _value });

        if(target.dataset.name === 'imageFile') {
            this.onImageChanged(target.files[0]);
        }
    }

    onImageChanged(file) {
        let reader = new FileReader;

        reader.onload = e => {
            this.props.onWorkChanged({imageSrc: e.target.result});
            this.setState({
                noImageAdded: false
            });
        };
        reader.readAsDataURL(file);
    }

    save(e) {
        e.preventDefault();

        //error message for empty image input
        if(!this.props.data.imageSrc) {
            this.setState({
                noImageAdded: true
            })
        } else {
            this.props.save(e);
        }
    }

    render() {
        return (
            <form className="work-admin works-admin__item" onSubmit={e => this.save(e)}>
                key: {this.props.keyIndex}<br/>
                _id: {this.props.data._id}<br/>
                index: {this.props.data.index}
                <div className="form__row _flex">
                    <TextField
                        className="input form__input"
                        label="Site Address"
                        value={this.props.data.address}
                        data-name="address"
                        margin="normal"
                        onChange={e => this.onWorkChanged(e)}
                        required
                    />
                    <TextField
                        className="input form__input"
                        label="Repository Link"
                        value={this.props.data.repo}
                        data-name="repo"
                        margin="normal"
                        onChange={e => this.onWorkChanged(e)}
                    />
                </div>
                <div className="form__row">
                    <label className={`work-admin__image${this.state.noImageAdded ? ' _error' : this.props.data.imageSrc ? ' _has-image' : ''}`}>
                        <input
                            type="file"
                            value=""
                            data-name="imageFile"
                            onChange={e => this.onWorkChanged(e)}
                        />
                        <img src={this.props.data.imageSrc} alt=""/>
                    </label>
                </div>
                <div className="form__row">
                    <TextField
                        multiline
                        className="textarea form__textarea"
                        label="Describe Work in Russian"
                        value={this.props.data.descRu}
                        data-name="descRu"
                        margin="normal"
                        onChange={e => this.onWorkChanged(e)}
                        required
                    />
                </div>
                <div className="form__row">
                    <TextField
                        multiline
                        className="textarea form__textarea"
                        label="Describe Work in English"
                        value={this.props.data.descEn}
                        data-name="descEn"
                        margin="normal"
                        onChange={e => this.onWorkChanged(e)}
                        required
                    />
                </div>
                <div className={`form__buttons${this.props.worksLength > 1 ? " _jc-sb" : ""}`}>
                    {this.props.worksLength > 1 &&
                    [
                        <Button
                            key="delete"
                            className="button form__button"
                            onClick={() => this.props.deleteField()}
                        >
                            Delete
                        </Button>,
                        <Arrows
                            key="arrows"
                            mini={true}
                            first={this.props.index === 0}
                            last={this.props.index === (this.props.savedWorksLength - 1)}
                            notSaved={!this.props.data._id}
                            moveFields={e => this.props.moveFields(e)}
                        />
                    ]
                    }
                    <div className="work-admin__button">
                        {this.props.data.status &&
                        <div className={`work-admin__status${this.props.data.status === 'saved' ? ' _saved' : ''}`}>
                            {this.props.data.status}
                        </div>
                        }
                        <Button variant="raised" color="secondary" type="submit" disabled={!this.state.isChanged}>Save</Button>
                    </div>
                </div>
            </form>
        );
    }
}