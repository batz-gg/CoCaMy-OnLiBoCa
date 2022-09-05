import React, { Component } from 'react';

import Article from '../components/Article';
import Comment from '../components/Comment';
import Scoop from '../utils/Scoop';

class ArticleView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newComment: ''
    };

    this.saveArticle = this.saveArticle.bind(this);
    this.updateNewComment = this.updateNewComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.createComment = this.createComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  componentDidMount() {
    Scoop.getArticle(this.props.match.params.id).then(article => {
      if (article) {
        this.setState({article: article});
      }
    });
  }

  saveArticle(title, url, id) {
    return Scoop.updateArticle(id, title, url).then(article => {
      if (!article) {
        return;
      }

      this.setState({article: article});
    });
  }

  deleteArticle(id) {
    return Scoop.deleteArticle(id).then(() => {
      window.location = '/';
    });
  }

  updateNewComment(event) {
    this.setState({newComment: event.target.value});
  }

  createComment() {
    Scoop.createComment(this.state.newComment, this.state.article.id, 
      this.props.currentUser).then(comment => {
        if (!comment) {
          return;
        }

        const article = this.state.article;
        article.comments.unshift(comment);
        this.setState({
          article: article,
          newComment: ''
        });
      });
  }

  updateComment(id, body) {
    return Scoop.updateComment(id, body).then(comment => {
      if (!comment) {
        return;
      }

      const article = this.state.article;
      const comments = article.comments;
      comments[comments.findIndex(comment => comment.id === id)] = comment;
      this.setState({article: article});
    });
  }

  deleteComment(id) {
    return Scoop.deleteComment(id).then(() => {
      const article = this.state.article;
      article.comments.splice(article.comments.findIndex(
        comment => comment.id === id), 1);
      this.setState({article: article});
    });
  }

  renderComments() {
    return this.state.article.comments.map(comment => {
      return <Comment comment={comment}
                      updateComment={this.updateComment}
                      deleteComment={this.deleteComment}
                      currentUser={this.props.currentUser}
                      key={comment.id} />;
    });
  }

  render() {
    if (!this.state.article) {
      return <div></div>
    }
    return (
      <div className="ArticleView">
        <div className="article">
          <Article article={this.state.article}
                   saveArticle={this.saveArticle}
                   deleteArticle={this.deleteArticle}
                   currentUser={this.props.currentUser}
                   isArticleView={true} />
        </div>
        <div className="comment-list">
          <textarea placeholder="Leave a comment!" value={this.state.newComment} onChange={this.updateNewComment} />
          <a className="button edit" onClick={this.createComment}>Post</a>
          {this.renderComments()}
        </div>
      </div>
    );
  }
}

export default ArticleView;
