import React, { Component } from 'react';

import Scoop from '../utils/Scoop';

class Score extends Component {
  constructor(props) {
    super(props);

    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);

    this.state = {
      score: this.calculateScore(this.props.item),
      upvotedBy: props.item.upvotedBy,
      downvotedBy: props.item.downvotedBy
    };
  }

  upvote() {
    Scoop.vote(this.props.item, this.props.currentUser, this.props.type, 'upvote')
      .then(item => {
        if (!item) return;
        this.setState({
          score: this.calculateScore(item),
          upvotedBy: item.upvotedBy,
          downvotedBy: item.downvotedBy
        });
      });
  }

  downvote() {
    Scoop.vote(this.props.item, this.props.currentUser, this.props.type, 'downvote')
      .then(item => {
        if (!item) return;
        this.setState({
          score: this.calculateScore(item),
          upvotedBy: item.upvotedBy,
          downvotedBy: item.downvotedBy
        });
      });

  }

  calculateScore(item) {
    return item.upvotedBy.length - item.downvotedBy.length;
  }

  getActiveClass(comments) {
    if (comments.includes(this.props.currentUser)) {
      return 'active';
    } else {
      return '';
    }
  }

  renderVoting() {
    if (this.props.currentUser) {
      return (
        <div>
          <a className={"vote " + this.getActiveClass(this.state.upvotedBy)}
             onClick={this.upvote}><img alt="upvote" src='public/img/upvote.svg' /></a>
          <a className={"vote " + this.getActiveClass(this.state.downvotedBy)}
             onClick={this.downvote}><img alt="downvote" src='public/img/downvote.svg' /></a>
       </div>
      );
    } else {
      return '';
    }
  }

  render() {
    return (
      <div className="Score">
        <div>{this.state.score}</div>
        {this.renderVoting()}
      </div>
    );
  }
}

export default Score;
