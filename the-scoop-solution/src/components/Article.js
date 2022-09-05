import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Score from './Score';

const VIEW_MODE = 'view';
const EDIT_MODE = 'edit';

class Article extends Component {
  constructor(props) {
    super(props);

    const startingMode = props.article.id === 'new' ? EDIT_MODE : VIEW_MODE;

    this.state = {
      mode: startingMode,
      editedUrl: props.article.url,
      editedTitle: props.article.title
    };
  }

  setMode(mode) {
    if (mode === VIEW_MODE) {
      this.setState({mode: mode});
    } else if (mode === EDIT_MODE) {
      this.setState({
        editedUrl: this.props.article.url,
        editedTitle: this.props.article.title,
        mode: mode
      });
    }
  }

  cancelEdit() {
    if (this.props.article.id === 'new') {
      this.props.removeNewArticle();
    }
    this.setMode(VIEW_MODE);
  }

  saveArticle() {
    this.props.saveArticle(this.state.editedTitle,
      this.state.editedUrl, this.props.article.id).then(() => {
        if (this.props.article.id === 'new') {
          return;
        }
        this.setMode(VIEW_MODE);
      });
  }

  updateUrl(event) {
    this.setState({editedUrl: event.target.value});
  }

  updateTitle(event) {
    this.setState({editedTitle: event.target.value});
  }

  renderEditButtons() {
    if (this.props.currentUser !== this.props.article.username) {
      return '';
    }
    if (this.state.mode === EDIT_MODE) {
      return (
        <div>
          <div className="edit button"
               onClick={this.saveArticle.bind(this)}>Save</div>
          <div className="edit button"
               onClick={this.cancelEdit.bind(this)}>Cancel</div>
        </div>
      )
    } else {
      return (
        <div>
          <div className="edit button"
               onClick={this.setMode.bind(this, EDIT_MODE)}>Edit</div>
          <div className="delete button"
               onClick={this.props.deleteArticle.bind(null, this.props.article.id)}>Delete</div>
        </div>
      )
    }
  }

  renderScore() {
    if (this.props.article.id !== 'new') {
      return <Score item={this.props.article}
                    currentUser={this.props.currentUser}
                    type="article" />;
    } else {
      return '';
    }
  }

  renderArticle() {
    const article = this.props.article;
    if (this.state.mode === EDIT_MODE) {
      return (
        <div className="edit-section">
          <span className="label">Title</span><input value={this.state.editedTitle} onChange={this.updateTitle.bind(this)} />
          <span className="label">URL</span><input value={this.state.editedUrl} onChange={this.updateUrl.bind(this)} />
          {this.renderEditButtons()}
        </div>
      );
    } else {
      return (
        <div>
          <a href={article.url} className="url" target="_blank">{article.title}</a>
          <div className="information">
            <span>submitted by <Link to={'/users/' + article.username} className="username">{article.username}</Link></span>
            {this.renderComments()}
          </div>
          {this.renderEditButtons()}
        </div>
      );
    }
  }

  renderComments() {
    if (this.props.isArticleView) {
      const comments = this.props.article.comments;
      if (comments.length === 1) {
        return <span className="comments">1 Comment</span>
      } else {
        return <span className="comments">{comments.length} Comments</span>;
      }
    } else {
      return <Link to={'/articles/' + this.props.article.id} className="comments">View Comments</Link>;
    }
  }

  render() {
    return (
      <div className="Article">
        {this.renderScore()}
        {this.renderArticle()}
      </div>
    );
  }
}

export default Article;
