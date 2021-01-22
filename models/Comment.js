const { model, Schema } = require('mongoose');

const commentSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
});

module.exports = model('Comment', commentSchema);
