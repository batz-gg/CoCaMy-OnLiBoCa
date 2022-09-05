import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Score from './Score';

const VIEW_MODE = 'view';
const EDIT_MODE = 'edit';

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: VIEW_MODE,
      editedBody: props.comment.body
    };
  }

  setMode(mode) {
    if (mode === VIEW_MODE) {
      this.setState({mode: mode});
    } else if (mode === EDIT_MODE) {
      this.setState({
        editedBody: this.props.comment.body,
        mode: mode
      });
    }
  }

  updateComment() {
    this.props.updateComment(this.props.comment.id, this.state.editedBody)
      .then(() => {
        this.setMode(VIEW_MODE);
      });
  }

  updateBody(event) {
    this.setState({editedBody: event.target.value});
  }

  renderEditButtons() {
    if (this.props.currentUser !== this.props.comment.username) {
      return '';
    }

    if (this.state.mode === EDIT_MODE) {
      return (
        <div>
          <div className="edit button"
               onClick={this.updateComment.bind(this)}>Save</div>
          <div className="edit button"
               onClick={this.setMode.bind(this, VIEW_MODE)}>Cancel</div>
        </div>
      )
    } else {
      return (
        <div>
          <div className="edit button"
               onClick={this.setMode.bind(this, EDIT_MODE)}>Edit</div>
          <div className="delete button"
               onClick={this.props.deleteComment.bind(null, this.props.comment.id)}>Delete</div>
        </div>
      )
    }
  }

  renderCommentBody() {
    if (this.state.mode === EDIT_MODE) {
      return <input value={this.state.editedBody} onChange={this.updateBody.bind(this)} />
    } else {
      return <div className="body">{this.props.comment.body}</div>
    }
  }

  render() {
    const comment = this.props.comment;
    return (
      <div className="Comment">
        <Score item={comment}
               currentUser={this.props.currentUser}
               type="comment" />
        <div className="information">
          <Link to={'/users/' + comment.username} className="username">{comment.username}</Link>
          {this.renderCommentBody()}
          {this.renderEditButtons()}
        </div>
      </div>
    );
  }
}

export default Comment;
