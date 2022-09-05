import 'whatwg-fetch';

const Scoop = {};
const baseUrl = 'http://localhost:4000';

Scoop.getUser = username => {
  const url = `${baseUrl}/users/${username}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      const user = jsonResponse.user;
      user.articles = jsonResponse.userArticles;
      user.comments = jsonResponse.userComments;
      return user;
    });
  });
};

Scoop.createUser = username => {
  const url = `${baseUrl}/users`;
  const fetchOptions = {
    method: 'POST',
    body: JSON.stringify({username: username})
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.user;
    });
  });
};

Scoop.getArticles = () => {
  const url = `${baseUrl}/articles`;

  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve([]));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.articles;
    });
  });
};

Scoop.getArticle = id => {
  const url = `${baseUrl}/articles/${id}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.article;
    });
  });
};

Scoop.createArticle = (title, articleUrl, username) => {
  const url = `${baseUrl}/articles`;
  const fetchOptions = {
    method: 'POST',
    body: JSON.stringify({article: {title, url: articleUrl, username}})
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.article;
    });
  });
};

Scoop.updateArticle = (id, title, articleUrl) => {
  const url = `${baseUrl}/articles/${id}`;
  const fetchOptions = {
    method: 'PUT',
    body: JSON.stringify({article: {id, title, url: articleUrl}})
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.article;
    });
  });
};

Scoop.deleteArticle = id => {
  const url = `${baseUrl}/articles/${id}`;
  const fetchOptions = {
    method: 'DELETE'
  };
  return fetch(url, fetchOptions);
};

Scoop.createComment = (body, articleId, username) => {
  const url = `${baseUrl}/comments`;
  const fetchOptions = {
    method: 'POST',
    body: JSON.stringify({comment: {body, articleId, username}})
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.comment;
    });
  });
};

Scoop.updateComment = (id, body) => {
  const url = `${baseUrl}/comments/${id}`;
  const fetchOptions = {
    method: 'PUT',
    body: JSON.stringify({comment: {id, body}})
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.comment;
    });
  });
};

Scoop.deleteComment = id => {
  const url = `${baseUrl}/comments/${id}`;
  const fetchOptions = {
    method: 'DELETE'
  };
  return fetch(url, fetchOptions);
};

Scoop.vote = (item, username, itemType, voteType) => {
  if ((voteType !== 'upvote' && voteType !== 'downvote') ||
      (itemType !== 'article' && itemType !== 'comment')) {
    return;
  }
  const url = `${baseUrl}/${itemType}s/${item.id}/${voteType}`;
  const fetchOptions = {
    method: 'PUT',
    body: JSON.stringify({username})
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse[itemType];
    });
  });
};

export default Scoop;