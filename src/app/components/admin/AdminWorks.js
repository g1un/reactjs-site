import React from 'react';

import Work from './Work';
import { GetWorks, UpdateWork, DeleteWork } from '../../middleware/Works';

import { Button } from 'rmwc/Button';

import '@material/textfield/dist/mdc.textfield.min.css';
import '@material/button/dist/mdc.button.min.css';

export default class AdminWorks extends React.Component {
    constructor() {
        super();
        this.emptyWork = {
            _id: '',
            index: '',
            address: '',
            repo: '',
            desc: '',
            imageSrc: '',
            imageFile: ''
        };
        this.state = {
            works: [
                Object.assign({}, this.emptyWork)
            ],
            worksLoading: true
        };
    }

    componentDidMount() {
        //get works from server
        new GetWorks(works => this.onWorksGot(works)).send();
    }

    onWorksGot(works) {
        this.setState({
            works: works.length ? works : this.state.works,
            worksLoading: false,
            worksIndexes: works.map((work, i) => i)
        });
        this.counterIndex = this.state.worksIndexes.length;
    }

    onWorksChanged(i, paramObj) {
        let newWorks = this.state.works.slice();
        let _key = Object.keys(paramObj)[0];
        let _value = paramObj[_key];

        newWorks[i][_key] = _value;

        this.setState({
            works: newWorks
        });
    }

    addField() {
        let newItems = this.state.works.slice();
        newItems.push(JSON.parse(JSON.stringify(this.emptyWork)));

        let newWorksIndexes = this.state.worksIndexes;
        newWorksIndexes.push(this.indexCounter());

        this.setState({
            works: newItems,
            worksIndexes: newWorksIndexes
        });
    }

    deleteField(id) {
        if(!confirm('Are you sure?')) return;
        let newItems = this.state.works.slice();
        newItems.splice(id, 1);

        let newWorksIndexes = this.state.worksIndexes;
        newWorksIndexes.splice(id, 1);

        new DeleteWork((msg) => {console.log('delete result: ', msg)}).send(id);

        this.setState({
            works: newItems,
            worksIndexes: newWorksIndexes
        });
    }

    save(e, i) {
        this.state.works[i].index = i;

        console.log('save: ', this.state.works[i]);
        new UpdateWork(msg => this.onWorksUpdated(msg)).send(this.state.works[i]);
    }

    //creates unique keys each 'addField' action
    indexCounter() {
        return this.counterIndex++;
    }

    onWorksUpdated(message) {
        console.log('save result: ' + message);
    }

    getContent() {
        let content;
        if(this.state.worksLoading) {
            return 'Loading...';
        } else {
            return (
                this.state.works.map((item, i) => {
                    return (
                        <Work
                            data={item}
                            key={this.state.worksIndexes[i]}
                            index={i}
                            isOnlyField={this.state.works.length === 1}
                            deleteField={() => this.deleteField(i)}
                            onWorksChanged={(obj) => this.onWorksChanged(i, obj)}
                            save={(e) => this.save(e, i)}
                        />
                    )
                })
            );
        }
    }

    render() {
        return (
            <div className={this.props.childClass + " admin-item works clearfix"}>
                <h2 className="txt-title-2">works</h2>
                {this.getContent()}
                {!this.state.worksLoading &&
                <div className="admin-item__buttons">
                    <Button stroked type="button" className="f-r" onClick={() => this.addField()}>Add</Button>
                </div>
                }
            </div>
        );
    }
}