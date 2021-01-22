const { AuthenticationError, UserInputError } = require('apollo-server');
const Post = require('../../models/Post');
const auth = require('../../util/auth');

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.aggregate([
          {
            $lookup: {
              from: 'comments',
              localField: '_id',
              foreignField: 'post',
              as: 'comments',
            },
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
        ]);
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getPost(_, { postId }) {
      try {
        if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error('Invalid ID');
        }

        const post = await Post.findById(postId);

        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      try {
        const user = auth(context);
        const newPost = new Post({
          body,
          user: user.id,
          username: user.username,
          createdAt: new Date().toISOString(),
        });

        const post = await newPost.save();

        return post;
      } catch (err) {
        throw new Error(err);
      }
    },
    async deletePost(_, { postId }, context) {
      const user = auth(context);
      try {
        const post = await Post.findById(postId);
        if (post) {
          if (post.username === user.username) {
            await post.delete();
            return 'Post deleted!';
          } else {
            throw new AuthenticationError('Action not allowed');
          }
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async likePost(_, { postId }, context) {
      const user = auth(context);
      try {
        const post = await Post.findById(postId);
        if (post) {
          if (post.likes.find((like) => like.username === user.username)) {
            post.likes = post.likes.filter(
              (like) => like.username !== user.username
            );
          } else {
            post.likes.push({
              username: user.username,
              createdAt: new Date().toISOString(),
            });
          }
          await post.save();
          return post;
        } else {
          throw new UserInputError('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
