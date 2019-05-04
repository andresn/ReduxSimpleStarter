import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {

    componentWillMount() {
        this.props.fetchMessage();
    }

    render () {
        return (
            <div>
                <h2>{this.props.feature}</h2>
                <ul>
                    <li>this is my uber secret feature list...</li>
                    <li>... which continues here...</li>
                    <li>... and ends here and here.</li>
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {feature} = state.feature;
    return {
        feature: feature
    };
}

export default connect(
    mapStateToProps,
    actions
)(
    Feature
);
