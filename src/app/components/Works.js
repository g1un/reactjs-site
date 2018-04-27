import React from 'react';

import Work from './Work';

import { GetWorks } from '../middleware/Works';

export class Works extends React.Component {
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
        if(this.props.isActive) new GetWorks(works => this.onWorksGot(works)).send();
    }

    onWorksGot(works) {
        let _works = works.length ? works : this.state.works;
        _works.sort((a, b) => a.index - b.index);
        this.setState({
            works: _works,
            worksLoading: false
        });
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
                            key={i}
                            lang={this.props.lang}
                        />
                    )
                })
            );
        }
    }

    render() {
        return (
            <div className="works">
                <h1>
                    {this.props.pageTitle}
                </h1>
                {this.getContent()}
            </div>
        );
    }
}