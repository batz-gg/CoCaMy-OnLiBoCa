import React, { Component } from 'react';

import Article from '../components/Article';
import Scoop from '../utils/Scoop';

class ArticleList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      hasNewArticle: false
    };

    this.addNewArticle = this.addNewArticle.bind(this);
    this.removeNewArticle = this.removeNewArticle.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  componentDidMount() {
    Scoop.getArticles().then(articles => {
      if (articles.length) {
        this.setState({articles: articles});
      }
    });
  }

  getDisplayClass() {
    return this.state.hasNewArticle ? 'none' : '';
  }

  addNewArticle() {
    const articles = this.state.articles;
    const newArticle = {
      id: 'new',
      title: '',
      url: '',
      username: this.props.currentUser
    };
    articles.unshift(newArticle);
    this.setState({articles: articles, hasNewArticle: true});
  }

  removeNewArticle() {
    let articles = this.state.articles;
    articles = articles.filter(article => article.id !== 'new');
    this.setState({articles: articles, hasNewArticle: false});
  }

  saveArticle(title, url, id) {
    if (!id && !title && !url) {
      this.removeNewArticle();
      return;
    }

    if (id === 'new') {
      return Scoop.createArticle(title, url, this.props.currentUser).then(
        article => {
          if (!article) {
            return;
          }

          let articles = this.state.articles;
          articles.shift();
          articles.unshift(article);
          this.setState({articles: articles, hasNewArticle: false});
        });
    } else {
      return Scoop.updateArticle(id, title, url).then(article => {
        if (!article) {
          return;
        }

        const articles = this.state.articles;
        articles[articles.findIndex(article => article.id === id)] = article;
        this.setState({articles: articles});
      });
    }
  }

  deleteArticle(id) {
    return Scoop.deleteArticle(id).then(() => {
      const articles = this.state.articles;
      articles.splice(articles.findIndex(article => article.id === id), 1);
      this.setState({articles: articles});
    });
  }

  renderNewArticleButton() {
    if (!this.props.currentUser) {
      return '';
    }

    return <a className={'button ' + this.getDisplayClass()} onClick={this.addNewArticle}>Post New Article</a>;
  }

  renderArticles() {
    if (!this.state.articles.length) {
      return '';
    }

    return this.state.articles.map(article => {
      return <Article article={article}
                      currentUser={this.props.currentUser}
                      saveArticle={this.saveArticle}
                      deleteArticle={this.deleteArticle}
                      removeNewArticle={this.removeNewArticle}
                      key={article.id} />;
    });
  }

  render() {
    return (
      <div className="ArticleList">
        <div className="header">
          <h2>LATEST ARTICLES</h2>
          {this.renderNewArticleButton()}
        </div>
        <div>
          {this.renderArticles()}
        </div>
      </div>
    );
  }
}

export default ArticleList;
