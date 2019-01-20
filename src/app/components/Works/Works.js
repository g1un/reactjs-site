import React, {Component} from "react";
import {connect} from "react-redux";

import Work from "src/app/components/Works/Work/Work";

import {GetWorks} from "src/app/middleware/Works";

import {PAGES} from "src/app/consts";

class Works extends Component {
    constructor() {
        super();
        this.emptyWork = {
            _id: "",
            index: "",
            address: "",
            repo: "",
            descRu: "",
            descEn: "",
            imageSrc: "",
            imageFile: ""
        };
        this.state = {
            works: [
                Object.assign({}, this.emptyWork)
            ],
            worksIsLoaded: false
        };
    }

    onWorksGot(works) {
        let _works = works.length ? works : this.state.works;
        _works.sort((a, b) => a.index - b.index);

        this.setState({
            works: _works,
			worksIsLoaded: true
        });
    }

    getContent() {
        if(!this.state.worksIsLoaded) {
            return "Loading...";
        } else {
            return (
                this.state.works.map((item, i) => {
                    return (
                        <Work
                            data={item}
                            key={i}
                        />
                    )
                })
            );
        }
    }

    render() {
		const {
			path
		} = this.props;

		const {
			lang
		} = this.props.appStore;

		const {
			worksIsLoaded
        } = this.state;

		if(!worksIsLoaded) new GetWorks(works => this.onWorksGot(works)).send();

        return (
            <div className="works">
                <h2 className="txt-title-2">
					{PAGES[path].title[lang]}
                </h2>
                {this.getContent()}
            </div>
        );
    }
}

export default connect(
	state => ({
		appStore: state
	})
)(Works);