import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../actions';

class AddComment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        };
    }

    handleChange(event) {
        this.setState({comment: event.target.value});
    }

    handleSubmit (event) {
        event.preventDefault();
        this.props.addComment(this.state.comment);
        this.setState(
            {
                comment: ''
            }
        );
    }

    render() {
        return (
            <form
                className="add-comment"
                onSubmit={ this.handleSubmit.bind(this) }
            >
                <label>Add a Comment</label>
                <textarea
                    name="comment"
                    value={this.state.comment}
                    onChange={this.handleChange.bind(this)}
                />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default connect(
    null,
    { addComment }
)(
    AddComment
);
