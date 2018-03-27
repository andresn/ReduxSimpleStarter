import React, { Component } from 'react';
import { connect } from 'react-redux';

const ViewComments = (props) => (
    <section className="view-comment">
        <h1>Comments</h1>
        <ul>
            {
                props.comments.map(
                    (comment, i) => {
                        return (
                            <li key={i}>{comment}</li>
                        );
                    }
                )
            }
        </ul>
    </section>
);


function mapStateToProps(state) {
    return {
        comments: state.comments
    };
}

export default connect(
    mapStateToProps,
    null
)(
    ViewComments
);
