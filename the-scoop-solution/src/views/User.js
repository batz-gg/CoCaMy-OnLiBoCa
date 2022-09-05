import React, { Component } from 'react';

import Article from '../components/Article';
import Comment from '../components/Comment';
import Scoop from '../utils/Scoop';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'comments'
    };
  }

  componentDidMount() {
    Scoop.getUser(this.props.match.params.username).then(user => {
      if (user) {
        this.setState({user: user});
      }
    });
  }

  selectMode(mode) {
    this.setState({mode: mode});
  }

  getActiveClass(mode) {
    if (this.state.mode === mode) {
      return 'active';
    } else {
      return '';
    }
  }

  deleteArticle(id) {
    return Scoop.deleteArticle(id).then(() => {
      const user = this.state.user;
      user.articles.splice(user.articles.findIndex(article => article.id === id), 1);
      this.setState({user: user});
    });
  }

  deleteComment(id) {
    return Scoop.deleteComment(id).then(() => {
      const user = this.state.user;
      user.comments.splice(user.comments.findIndex(comment => comment.id === id), 1);
      this.setState({user: user});
    });
  }

  renderArticles() {
    if (this.state.mode !== 'articles') {
      return '';
    }
    return this.state.user.articles.map(article => {
      return <Article article={article}
                      currentUser={this.props.currentUser}
                      deleteArticle={this.deleteArticle.bind(this)}
                      key={article.id} />;
    });
  }

  renderComments() {
    if (this.state.mode !== 'comments') {
      return '';
    }
    return this.state.user.comments.map(comment => {
      return <Comment comment={comment}
                      currentUser={this.props.currentUser}
                      deleteComment={this.deleteComment.bind(this)}
                      key={comment.id} />;
    });
  }

  render() {
    if (!this.state.user) {
      return <div></div>
    }
    return (
      <div className="User">
        <div className="header">
          <h2>{this.state.user.username}</h2>
          <div>
            <a className={"tab " + this.getActiveClass('comments')}
               onClick={this.selectMode.bind(this, 'comments')}>
                 Comments ({this.state.user.comments.length})
            </a>
            <a className={"tab " + this.getActiveClass('articles')}
               onClick={this.selectMode.bind(this, 'articles')}>
                 Submissions ({this.state.user.articles.length})
            </a>
          </div>
        </div>
        <div className="content">
          {this.renderComments()}
          {this.renderArticles()}
        </div>
      </div>
    );
  }
}

export default User;
