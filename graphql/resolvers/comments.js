const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const auth = require('../../util/auth');

module.exports = {
  Query: {
    getComments: async (_, { postId }, context) => {
      const post = await Post.findById(postId);

      if (!post) {
        throw new UserInputError('Post not found');
      }

      const comments = await Comment.find({ post });

      return comments;
    },
  },
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const user = auth(context);
      if (body.trim() === '') {
        throw new UserInputError('Comment cannot be empty', {
          errors: {
            body: 'Comment cannot be empty',
          },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        const newComment = new Comment({
          body,
          username: user.username,
          createdAt: new Date().toISOString(),
          post: post._id,
        });

        await newComment.save();

        return post;
      } else throw new UserInputError('Post not found');
    },

    deleteComment: async (_, { postId, commentId }, context) => {
      const user = auth(context);

      const post = await Post.findById(postId);

      if (!post) {
        throw new UserInputError('Post not found');
      }

      const comment = await Comment.findById(commentId);

      if (!comment) {
        throw new UserInputError('Comment not found');
      }

      if (!comment.username === user.username) {
        throw new AuthenticationError('Action not allowed');
      }

      await comment.remove();

      return post;
    },
  },
};
