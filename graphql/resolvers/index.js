const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');

module.exports = {
  Post: {
    id: (parent) => {
      return parent.id || parent._id;
    },
    commentCount: (parent) => {
      return parent.comments.length;
    },
    likeCount: (parent) => {
      return parent.likes.length;
    },
  },
  Comment: {
    id: (parent) => {
      return parent.id || parent._id;
    },
  },
  Like: {
    id: (parent) => {
      return parent.id || parent._id;
    },
  },
  Query: {
    ...postsResolvers.Query,
    ...commentsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
};
