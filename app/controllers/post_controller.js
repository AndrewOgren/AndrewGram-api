import mongoose from 'mongoose';
import Post from '../models/post_model';

const cleanPosts = (posts) => {
  return posts.map((post) => {
    return { id: post._id, title: post.title, tags: post.tags, content: post.content, cover_url: post.cover_url, comments: post.comments };
  });
};

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.cover_url = req.body.cover_url;
  post.comments = req.body.comments;
  post.save()
  .then((result) => {
    res.json({ message: 'Post created!' });
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};
export const getPosts = (req, res) => {
  Post.find()
  .then((result) => {
    res.json(cleanPosts(result));
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};
export const getPost = (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  Post.findById(id)
  .then((result) => {
    res.json(result);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};
export const deletePost = (req, res) => {
  Post.remove({ _id: req.params.id })
  .then((result) => {
    res.json({ message: 'Deleted post' });
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};
export const updatePost = (req, res) => {
  Post.update({ _id: req.params.id }, req.body)
  .then((result) => {
    res.json({ message: 'Updated post' });
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};
