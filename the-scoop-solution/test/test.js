process.env.PORT = 8080;
process.env.IS_TEST_MODE = true;

const rewire = require('rewire');
const serverModule = rewire('../server.js');
const expect = require('chai').expect;

describe('Scoop - server.js: ', function() {
  let database, routes, originalDatabase, originalNextArticleId,
      originalCommentId;

  before(function() {
    database = serverModule.__get__('database');
    routes = serverModule.__get__('routes');

    originalDatabase = JSON.parse(JSON.stringify(database));
  });

  beforeEach(function() {
    serverModule.__set__('database', JSON.parse(JSON.stringify(originalDatabase)));
    database = serverModule.__get__('database');
  });

  describe('Database Setup', function() {

    it('database should have a property called comments initialized to an object', function() {
      expect(database.comments).to.eql({});
    });

    it('database should have a property called nextCommentId initialized to 1', function() {
      expect(database.nextCommentId).to.equal(1);
    });

  });

  describe('Routes Setup', function() {

    it('routes should have a property called /comments initialized to an object', function() {
      expect(routes['/comments']).to.be.an('object');
    });

    it('routes should have a property called /comments/:id initialized to an object', function() {
      expect(routes['/comments/:id']).to.be.an('object');
    });

    it('routes should have a property called /comments/:id/upvote initialized to an object', function() {
      expect(routes['/comments/:id/upvote']).to.be.an('object');
    });

    it('routes should have a property called /comments/:id/downvote initialized to an object', function() {
      expect(routes['/comments/:id/downvote']).to.be.an('object');
    });

  });

  describe('/comments POST', function() {

    beforeEach(function() {
      originalNextCommentId = database.nextCommentId;
      database.users['existing_user'] = {
        username: 'existing_user',
        articleIds: [],
        commentIds: []
      };
      database.articles[1] = {
        id: 1,
        title: 'Title',
        url: 'http://url.com',
        username: 'existing_user',
        commentIds: [],
        upvotedBy: [],
        downvotedBy: []
      };
    });

    it('routes[\'/comments\'] should have a method called POST', function() {
      expect(routes['/comments']['POST']).to.exist;
    });

    it('routes[\'/comments\'].POST should create a new comment', function() {
      const newComment = {
        body: 'Comment Body',
        username: 'existing_user',
        articleId: 1
      };
      routes['/comments']['POST']('/comments', {body: {comment: newComment}});

      expect(database.comments[originalNextCommentId]).to.exist;
      expect(database.comments[originalNextCommentId]).to.be.an('object');
      expect(database.comments[originalNextCommentId].id).to.equal(originalNextCommentId);
      expect(database.comments[originalNextCommentId].body).to.equal(newComment.body);
      expect(database.comments[originalNextCommentId].username).to.equal(newComment.username);
    });

    it('routes[\'/comments\'].POST should increment the next comment ID', function() {
      const newComment = {
        body: 'Comment Body',
        username: 'existing_user',
        articleId: 1
      };
      routes['/comments']['POST']('/comments', {body: {comment: newComment}});

      expect(database.nextCommentId).to.equal(originalNextCommentId + 1);
    });

    it('routes[\'/comments\'].POST should add a newly created comment\'s ID to the author\'s comment IDs', function() {
      const newComment = {
        body: 'Comment Body',
        username: 'existing_user',
        articleId: 1
      };
      routes['/comments']['POST']('/comments', {body: {comment: newComment}});

      expect(database.users[newComment.username].commentIds).to.contain(originalNextCommentId);
    });

    it('routes[\'/comments\'].POST should add a newly created comment\'s ID to the article\'s comment IDs', function() {
      const newComment = {
        body: 'Comment Body',
        username: 'existing_user',
        articleId: 1
      };
      routes['/comments']['POST']('/comments', {body: {comment: newComment}});

      expect(database.articles[newComment.articleId].commentIds).to.contain(originalNextCommentId);
    });

    it('routes[\'/comments\'].POST should return a 201 response containing a newly-created comment', function() {
      const newComment = {
        body: 'Comment Body',
        username: 'existing_user',
        articleId: 1
      };
      const response = routes['/comments']['POST']('/comments', {body: {comment: newComment}});

      expect(response).to.exist;
      expect(response.status).to.equal(201);
      expect(response.body.comment.id).to.equal(originalNextCommentId);
      expect(response.body.comment.body).to.eql(newComment.body);
      expect(response.body.comment.username).to.eql(newComment.username);
      expect(response.body.comment.articleId).to.eql(newComment.articleId);
      expect(response.body.comment.upvotedBy).to.eql([]);
      expect(response.body.comment.downvotedBy).to.eql([]);
    });

    it('routes[\'/comments\'].POST should return a 400 response if a required field is not supplied', function() {
      const newComment = {
        body: '',
        username: 'existing_user',
        articleId: 1
      };
      let response = routes['/comments']['POST']('/comments', {body: {comment: newComment}});

      expect(response).to.exist;
      expect(response.status).to.equal(400);

      newComment.body = 'Body';
      newComment.username = '';
      response = routes['/comments']['POST']('/comments', {body: {comment: newComment}});

      expect(response).to.exist;
      expect(response.status).to.equal(400);

      newComment.username = 'existing_user';
      newComment.articleId = '';
      response = routes['/comments']['POST']('/comments', {body: {comment: newComment}});

      expect(response).to.exist;
      expect(response.status).to.equal(400);
    });

    it('routes[\'/comments\'].POST should return a 400 response if the comment\'s user does not exist', function() {
      const newComment = {
        body: 'Body',
        username: 'nonexistent_user',
        articleId: 1
      };
      const response = routes['/comments']['POST']('/comments', {body: {comment: newComment}});

      expect(response).to.exist;
      expect(response.status).to.equal(400);
    });

    it('routes[\'/comments\'].POST should return a 400 response if the comment\'s article does not exist', function() {
      const newComment = {
        body: 'Body',
        username: 'existing_user',
        articleId: 2
      };
      const response = routes['/comments']['POST']('/comments', {body: {comment: newComment}});

      expect(response).to.exist;
      expect(response.status).to.equal(400);
    });

    it('routes[\'/comments\'].POST should return a 400 response when given a request with no body', function() {
      const response = routes['/comments']['POST']('/comments', {});

      expect(response).to.exist;
      expect(response.status).to.equal(400);
    });

    it('routes[\'/comments\'].POST should return a 400 response when given a request with no comment', function() {
      const response = routes['/comments']['POST']('/comments', {body: {}});

      expect(response).to.exist;
      expect(response.status).to.equal(400);
    });

  });

  describe('/comments/:id PUT', function() {

    beforeEach(function() {
      database.comments[1] = {
        id: 1,
        body: 'Body',
        username: 'existing_user',
        articleId: 1
      };
    });

    it('routes[\'/comments/:id\'] should have a method called PUT', function() {
      expect(routes['/comments/:id']['PUT']).to.exist;
    });

    it('routes[\'/comments/:id\'].PUT should update an existing comment', function() {
      const updatedComment = {
        id: 1,
        body: 'Updated Body',
        username: 'existing_user',
        articleId: 1
      };
      routes['/comments/:id']['PUT']('/comments/1', {body: {comment: updatedComment}});

      expect(database.comments[1].body).to.equal(updatedComment.body);
    });

    it('routes[\'/comments/:id\'].PUT should not update uneditable fields', function() {
      const updatedComment = {
        id: 2,
        body: 'Updated Body',
        username: 'existing_user2',
        articleId: 2
      };
      routes['/comments/:id']['PUT']('/comments/1', {body: {comment: updatedComment}});

      expect(database.comments[1].id).to.equal(1);
      expect(database.comments[1].username).to.equal('existing_user');
      expect(database.comments[1].articleId).to.equal(1);
    });

    it('routes[\'/comments/:id\'].PUT should not update fields to invalid values', function() {
      const updatedComment = {
        id: 1,
        body: '',
        username: 'existing_user',
        articleId: 1
      };
      routes['/comments/:id']['PUT']('/comments/1', {body: {comment: updatedComment}});

      expect(database.comments[1].body).to.not.equal('');
    });

    it('routes[\'/comments/:id\'].PUT should return a 200 response after a succesful update', function() {
      const updatedComment = {
        id: 1,
        body: 'Updated Body',
        username: 'existing_user',
        articleId: 1
      };
      const response = routes['/comments/:id']['PUT']('/comments/1', {body: {comment: updatedComment}});

      expect(response).to.exist;
      expect(response.status).to.equal(200);
    });

    it('routes[\'/comments/:id\'].PUT should return a 404 response with a non-existent comment', function() {
      const updatedComment = {
        id: 1,
        body: 'Updated Body',
        username: 'existing_user',
        articleId: 1
      };
      const response = routes['/comments/:id']['PUT']('/comments/2', {body: {comment: updatedComment}});

      expect(response).to.exist;
      expect(response.status).to.equal(404);
    });

    it('routes[\'/comments/:id\'].PUT should return a 400 response when not supplied a request body', function() {
      const updatedComment = {
        id: 1,
        body: 'Updated Body',
        username: 'existing_user',
        articleId: 1
      };
      const response = routes['/comments/:id']['PUT']('/comments/1', {});

      expect(response).to.exist;
      expect(response.status).to.equal(400);
    });

    it('routes[\'/comments/:id\'].PUT should return a 400 response when not supplied an updated comment', function() {
      const updatedComment = {
        id: 1,
        body: 'Updated Body',
        username: 'existing_user',
        articleId: 1
      };
      const response = routes['/comments/:id']['PUT']('/comments/1', {body: {}});

      expect(response).to.exist;
      expect(response.status).to.equal(400);
    });

  });

  describe('/comments/:id DELETE', function() {

    beforeEach(function() {
      database.users['user'] = {
        username: 'user',
        articleIds: [1],
        commentIds: [1, 2]
      };
      database.articles[1] = {
        id: 1,
        title: 'Title',
        url: 'http://url.com',
        username: 'user',
        commentIds: [1, 2]
      };
      database.comments[1] = {
        id: 1,
        body: 'Body',
        username: 'user',
        articleId: 1
      };
      database.comments[2] = {
        id: 2,
        body: 'Body',
        username: 'user2',
        articleId: 1
      };
    });

    it('routes[\'/comments/:id\'] should have a method called DELETE', function() {
      expect(routes['/comments/:id']['DELETE']).to.exist;
    });

    it('routes[\'/comments/:id\'].DELETE should delete an existing comment', function() {
      routes['/comments/:id']['DELETE']('/comments/1');

      expect(database.comments[1]).to.equal(null);
    });

    it('routes[\'/comments/:id\'].DELETE should remove a deleted comment ID from the author\'s comment IDs', function() {
      routes['/comments/:id']['DELETE']('/comments/1');

      expect(database.users['user'].commentIds).to.eql([2]);
    });

    it('routes[\'/comments/:id\'].DELETE should remove a deleted comment ID from the article\'s comment IDs', function() {
      routes['/comments/:id']['DELETE']('/comments/1');

      expect(database.articles[1].commentIds).to.eql([2]);
    });

    it('routes[\'/comments/:id\'].DELETE should return a 204 response after a succesful delete', function() {
      const response = routes['/comments/:id']['DELETE']('/comments/1');

      expect(response).to.exist;
      expect(response.status).to.equal(204);
    });

    it('routes[\'/comments/:id\'].DELETE should return a 404 response with a non-existent comment ID', function() {
      const response = routes['/comments/:id']['DELETE']('/comments/3');

      expect(response).to.exist;
      expect(response.status).to.equal(404);
    });

  });

  describe('/commnets/:id/upvote PUT', function() {

    beforeEach(function() {
      database.users['user'] = {
        username: 'user',
        articleIds: [],
        commentIds: []
      };
      database.users['other_user'] = {
        username: 'user2',
        articleIds: [],
        commentIds: []
      };
      database.comments[1] = {
        id: 1,
        body: 'Body',
        username: 'user',
        articleId: 1,
        upvotedBy: ['user'],
        downvotedBy: []
      };
    });

    it('routes[\'/comments/:id/upvote\'] should have a method called PUT', function() {
      expect(routes['/comments/:id/upvote']['PUT']).to.exist;
    });

    it('routes[\'/comments/:id/upvote\'].PUT should upvote an comment', function() {
      routes['/comments/:id/upvote']['PUT']('/comments/1/upvote', {body: {username: 'other_user'}});

      expect(database.comments[1].upvotedBy).to.contain('user');
      expect(database.comments[1].upvotedBy).to.contain('other_user');
    });

    it('routes[\'/comments/:id/upvote\'].PUT should not allow a user to upvote multiple times', function() {
      routes['/comments/:id/upvote']['PUT']('/comments/1/upvote', {body: {username: 'user'}});

      expect(database.comments[1].upvotedBy).to.eql(['user']);
    });

    it('routes[\'/comments/:id/upvote\'].PUT should remove a user from downvotedBy if they switch to upvote', function() {
      database.comments[1].downvotedBy.push('other_user')
      routes['/comments/:id/upvote']['PUT']('/comments/1/upvote', {body: {username: 'other_user'}});

      expect(database.comments[1].upvotedBy).to.contain('other_user');
      expect(database.comments[1].downvotedBy).not.to.contain('other_user');
    });

    it('routes[\'/comments/:id/upvote\'].PUT should return a 200 response after a succesful upvote and send back the upvoted comment', function() {
      const response = routes['/comments/:id/upvote']['PUT']('/comments/1/upvote', {body: {username: 'other_user'}});

      expect(response).to.exist;
      expect(response.status).to.equal(200);
      expect(response.body.comment).to.eql(database.comments[1]);
    });

    it('routes[\'/comments/:id/upvote\'].PUT should return a 400 response when supplied a non-existent user', function() {
      const response = routes['/comments/:id/upvote']['PUT']('/comments/1/upvote', {body: {username: 'nonexistent_user'}});

      expect(response).to.exist;
      expect(response.status).to.equal(400);
    });

    it('routes[\'/comments/:id/upvote\'].PUT should return a 400 response when supplied a non-existent comment ID', function() {
      const response = routes['/comments/:id/upvote']['PUT']('/comments/2/upvote', {body: {username: 'other_user'}});

      expect(response).to.exist;
      expect(response.status).to.equal(400);
    });

    it('routes[\'/comments/:id/upvote\'].PUT should return a 400 response when given no username', function() {
      const response = routes['/comments/:id/upvote']['PUT']('/comments/1/upvote', {body: {}});

      expect(response).to.exist;
      expect(response.status).to.equal(400);
    });

    it('routes[\'/comments/:id/upvote\'].PUT should return a 400 response when given no request body', function() {
      const response = routes['/comments/:id/upvote']['PUT']('/comments/1/upvote', {});

      expect(response).to.exist;
      expect(response.status).to.equal(400);
    });

  });

  describe('/comments/:id/downvote PUT', function() {

    beforeEach(function() {
      database.users['user'] = {
        username: 'user',
        articleIds: [],
        commentIds: []
      };
      database.users['other_user'] = {
        username: 'user2',
        articleIds: [],
        commentIds: []
      };
      database.comments[1] = {
        id: 1,
        body: 'Body',
        username: 'user',
        articleId: 1,
        upvotedBy: [],
        downvotedBy: ['user']
      };
    });

    it('routes[\'/comments/:id/downvote\'] should have a method called PUT', function() {
      expect(routes['/comments/:id/downvote']['PUT']).to.exist;
    });

    it('routes[\'/comments/:id/downvote\'].PUT should downvote an comment', function() {
      routes['/comments/:id/downvote']['PUT']('/comments/1/downvote', {body: {username: 'other_user'}});

      expect(database.comments[1].downvotedBy).to.contain('user');
      expect(database.comments[1].downvotedBy).to.contain('other_user');
    });

    it('routes[\'/comments/:id/downvote\'].PUT should not allow a user to downvote multiple times', function() {
      routes['/comments/:id/downvote']['PUT']('/comments/1/downvote', {body: {username: 'user'}});

      expect(database.comments[1].downvotedBy).to.eql(['user']);
    });

    it('routes[\'/comments/:id/downvote\'].PUT should remove a user from upvotedBy if they switch to downvote', function() {
      database.comments[1].upvotedBy.push('other_user')
      routes['/comments/:id/downvote']['PUT']('/comments/1/downvote', {body: {username: 'other_user'}});

      expect(database.comments[1].downvotedBy).to.contain('other_user');
      expect(database.comments[1].upvotedBy).not.to.contain('other_user');
    });

    it('routes[\'/comments/:id/downvote\'].PUT should return a 200 response after a succesful downvote and send back the downvoted comment', function() {
      const response = routes['/comments/:id/downvote']['PUT']('/comments/1/downvote', {body: {username: 'other_user'}});

      expect(response).to.exist;
      expect(response.status).to.equal(200);
      expect(response.body.comment).to.eql(database.comments[1]);
    });

    it('routes[\'/comments/:id/downvote\'].PUT should return a 400 response when supplied a non-existent user', function() {
      const response = routes['/comments/:id/downvote']['PUT']('/comments/1/downvote', {body: {username: 'nonexistent_user'}});

      expect(response).to.exist;
      expect(response.status).to.equal(400);
    });

    it('routes[\'/comments/:id/downvote\'].PUT should return a 400 response when supplied a non-existent comment ID', function() {
      const response = routes['/comments/:id/downvote']['PUT']('/comments/2/downvote', {body: {username: 'other_user'}});

      expect(response).to.exist;
      expect(response.status).to.equal(400);
    });

    it('routes[\'/comments/:id/downvote\'].PUT should return a 400 response when given no username', function() {
      const response = routes['/comments/:id/downvote']['PUT']('/comments/1/downvote', {body: {}});

      expect(response).to.exist;
      expect(response.status).to.equal(400);
    });

    it('routes[\'/comments/:id/downvote\'].PUT should return a 400 response when given no request body', function() {
      const response = routes['/comments/:id/downvote']['PUT']('/comments/1/downvote', {});

      expect(response).to.exist;
      expect(response.status).to.equal(400);
    });

  });

});