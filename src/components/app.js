import React, { Component } from 'react';
import AddComment from './add_comment';
import ViewComments from './view_comments';

export default class App extends Component {

    addComment() {
        this.props.addComment();
    }

    render() {
        const comment = this.props.comment;
        return (
            <div>
                <AddComment />
                <ViewComments />
            </div>
        );
    }
}
