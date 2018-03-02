import React from 'react';

import { TextField } from 'rmwc/TextField';
import { Button } from 'rmwc/Button';

import '@material/textfield/dist/mdc.textfield.min.css';
import '@material/button/dist/mdc.button.min.css';

const ABOUT_ITEMS = [
    'Я – верстальщик.',
    '— HTML. Использую jade (pug).\n— CSS. На самом деле SCSS (также stylus и less).\n— БЭМ. Использую методологию. Перечитываю документацию. Совершенствую применение.',
    '— GULP. Компиляция scss в css, jade в html. Autoprefixer. Сборка png-спрайтов. Вставка svg в html. Обновление браузера. Это только основное.'
];

export default class AdminAbout extends React.Component {
    constructor(props) {
        super();
        this.childClass = props.childClass;
        this.state = {
            items: ABOUT_ITEMS
        };
    }

    addField() {
        let newItems = this.state.items.slice();
        newItems.push('');

        this.setState({
            items: newItems
        });
    }

    deleteField(id) {
        let newItems = this.state.items.slice();
        newItems.splice(id, 1);

        this.setState({
            items: newItems
        });
    }

    render() {
        return (
            <form className={this.childClass + " admin-item form clearfix"}>
                <h2 className="txt-title-2">Skills</h2>
                {this.state.items.map((item, i) => {
                    return (
                        <div className="form__item _flex _textarea" key={i}>
                            <TextField textarea className="form__textarea" label="Write skill" defaultValue={item}/>
                            <Button type="button" className="form__button _left" onClick={() => this.deleteField(i)}>Delete</Button>
                        </div>
                    )
                })}
                <Button stroked type="button" className="f-r" onClick={() => this.addField()}>Add</Button>
                <div className="admin-item__button cl-b">
                    <Button raised type="submit">Save</Button>
                </div>
            </form>
        );
    }
}