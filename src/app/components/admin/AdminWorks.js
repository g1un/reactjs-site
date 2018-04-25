import React from 'react';

import AdminWork from './AdminWork';
import { GetWorks, UpdateWork, DeleteWork } from '../../middleware/Works';

import Button from 'material-ui-next/Button';

export default class AdminWorks extends React.Component {
    constructor() {
        super();
        this.emptyWork = {
            _id: '',
            index: '',
            address: '',
            repo: '',
            descRu: '',
            descEn: '',
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
        let _works = works.length ? works : this.state.works;
        this.setState({
            works: _works,
            worksLoading: false,
            worksIndexes: this.getWorksIndexes(_works)
        });
    }

    //handles input's changes from <Work/>
    onWorkChanged(i, obj) {
        let newWorks = this.state.works.slice();
        let _key = Object.keys(obj)[0];
        let _value = obj[_key];

        newWorks[i][_key] = _value;

        this.setState({
            works: newWorks
        });
    }

    addField() {
        this.addRemoveHandler();
    }

    deleteField(id) {
        let dbId = this.state.works[id]._id;

        if(dbId === '') {
            this.addRemoveHandler(id);
        } else {
            if(!confirm('Are you sure?')) return;
            new DeleteWork((msg) => {
                console.log('delete result: ', msg);
                this.addRemoveHandler(id);
            }).send(dbId);
        }
    }

    addRemoveHandler(id) {
        let newItems = this.state.works.slice();

        if(id !== undefined) {
            //remove
            newItems.splice(id, 1);
        } else {
            //add
            newItems.push(JSON.parse(JSON.stringify(this.emptyWork)));
        }

        this.setState({
            works: newItems,
            worksIndexes: this.getWorksIndexes(newItems, id)
        });
    }

    save(e, i) {
        let newItems = this.state.works.slice();

        newItems[i].index = i;
        newItems[i].status = 'loading';

        this.setState({
            works: newItems
        });

        new UpdateWork(res => this.onWorksUpdated(res, i)).send(this.state.works[i]);
    }

    onWorksUpdated(res, i) {
        let newItems = this.state.works.slice();

        newItems[i]._id = res.work._id;
        newItems[i].imageSrc = res.work.imageSrc;
        newItems[i].imageFile = '';
        newItems[i].status = 'saved';

        this.setState({
            works: newItems
        });
    }

    //creates unique keys each 'addField' action
    indexCounter() {
        return this.counterIndex++;
    }

    getWorksIndexes(works, id) {
        //set begin number for indexCounter that will produce indexes for new works
        if(!this.counterIndex) {
            this.counterIndex = works.length;
        }

        if(!this.state.worksIndexes) {
            //after mount when no worksIndexes exists

            //create worksIndexes array
            return works.map((work, i) => i);
        } else {
            //if worksIndexes were already created

            //create copy of existing worksIndexes
            let newWorksIndexes = this.state.worksIndexes;

            if(id !== undefined) {
                //if id was passed, assuming it can only be from deleteField function
                newWorksIndexes.splice(id, 1);
            } else {
                //if no id was passed, assumnig it is from addField function
                newWorksIndexes.push(this.indexCounter());
            }

            return newWorksIndexes;
        }
    }

    getContent() {
        let content;
        if(this.state.worksLoading) {
            return 'Loading...';
        } else {
            return (
                this.state.works.map((item, i) => {
                    return (
                        <AdminWork
                            data={item}
                            key={this.state.worksIndexes[i]}
                            keyIndex={this.state.worksIndexes[i]}
                            index={i}
                            isOnlyField={this.state.works.length === 1}
                            deleteField={() => this.deleteField(i)}
                            onWorkChanged={(obj) => this.onWorkChanged(i, obj)}
                            save={(e) => this.save(e, i)}
                        />
                    )
                })
            );
        }
    }

    render() {
        return (
            <div className={this.props.childClass + " admin-item works-admin clearfix"}>
                <h2 className="txt-title-2">works</h2>
                {this.getContent()}
                {!this.state.worksLoading &&
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
                </div>
                }
            </div>
        );
    }
}