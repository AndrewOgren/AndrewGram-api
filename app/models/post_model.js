import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: String,
  tags: String,
  content: String,
  cover_url: String,
  username: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [],
});

// create PostModel class from schema
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
