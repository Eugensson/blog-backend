const fs = require('fs/promises');
const path = require("path");
const {nanoid} = require("nanoid");

const postsPath = path.join(__dirname, "posts.json");

const getAllPosts = async () => {
  const posts = await fs.readFile(postsPath);
  return JSON.parse(posts);
}

const getPostById = async (postId) => {
  const posts = await getAllPosts();
  const post = await posts.find(post => post.id === postId);
  return post || null;
}

const addPost = async (body) => {
  const posts = await getAllPosts();
  
  const newPost = {
    id: nanoid(),
    ...body,
  }

  posts.push(newPost);    
  await fs.writeFile(postsPath, JSON.stringify(posts, null, 2));
  return newPost;
}

const updatePostById = async (postId, body) => {
  const posts = await getAllPosts();
  const index = posts.findIndex(post => post.id === postId);
  if (index === -1) {
      return null;
  }
  posts[index] = {id: postId, ...body};
  await fs.writeFile(postsPath, JSON.stringify(posts, null, 2));
  return posts[index];
}

const deletePostById = async (postId) => {
  const posts = await getAllPosts();
  const index = posts.findIndex(post => post.id === postId);
  if (index === -1) {
    return null;
  }
  const [deletedPost] = posts.splice(index, 1);
  await fs.writeFile(postsPath, JSON.stringify(posts, null, 2));
  return deletedPost;
}

module.exports = {
  getAllPosts,
  getPostById,
  deletePostById,
  addPost,
  updatePostById,
}