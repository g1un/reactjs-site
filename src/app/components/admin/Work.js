import React from 'react';

import { TextField } from 'rmwc/TextField';
import { Button } from 'rmwc/Button';

import '@material/textfield/dist/mdc.textfield.min.css';
import '@material/button/dist/mdc.button.min.css';

const IMAGES_PATH = 'http://localhost:3000/';

export default class Work extends React.Component {
    constructor(props) {
        super();
        this.state = {
            imageSrc: props.data.imageSrc ? IMAGES_PATH + props.data.imageSrc : '',
            isChanged: false
        };
    }

    onWorkChanged({target}) {
        let _key = target.dataset.name;
        let _value = _key !== 'imageFile' ? target.value : target.files[0];

        this.setState({
            isChanged: true
        });

        this.props.onWorksChanged({ [_key]: _value });

        if(target.dataset.name === 'imageFile') {
            this.onImageChanged(target.files[0]);
        }
    }

    onImageChanged(file) {
        let reader = new FileReader;

        reader.onload = e => {
            this.setState({
                imageSrc: e.target.result,
                noImageAdded: false
            });
        };
        reader.readAsDataURL(file);
    }

    save(e) {
        e.preventDefault();

        //error message for empty image input
        if(!this.state.imageSrc) {
            this.setState({
                noImageAdded: true
            })
        } else {
            this.props.save(e);
        }
    }

    render() {
        return (
            <form className="work works__item" onSubmit={e => this.save(e)}>
                <div className="form__row _flex">
                    <TextField
                        className="input form__input"
                        label="Site Address"
                        value={this.props.data.address}
                        data-name="address"
                        onChange={e => this.onWorkChanged(e)}
                        required
                    />
                    <TextField
                        className="input form__input"
                        label="Repository Link"
                        value={this.props.data.repo}
                        data-name="repo"
                        onChange={e => this.onWorkChanged(e)}
                    />
                </div>
                <div className="form__row">
                    <label className={`work__image${this.state.noImageAdded ? ' _error' : this.state.imageSrc ? ' _has-image' : ''}`}>
                        <input
                            type="file"
                            value={this.props.imageSrc}
                            data-name="imageFile"
                            onChange={e => this.onWorkChanged(e)}
                        />
                        <img src={this.state.imageSrc} alt=""/>
                    </label>
                </div>
                <div className="form__row">
                    <TextField
                        textarea
                        className="textarea form__textarea"
                        label="Describe Work"
                        value={this.props.data.desc}
                        data-name="desc"
                        onChange={e => this.onWorkChanged(e)}
                        required
                    />
                </div>
                <div className={`form__buttons${!this.props.isOnlyField ? " _jc-sb" : ""}`}>
                    {!this.props.isOnlyField &&
                    <Button type="button" className="button form__button" onClick={() => this.props.deleteField()}>Delete</Button>
                    }
                    <Button raised type="submit" disabled={!this.state.isChanged}>Save</Button>
                </div>
            </form>
        );
    }
}