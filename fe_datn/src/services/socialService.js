/** @format */

import axios from "../axios";


//Post
const handleCreateNewPost = async (data) => {
  return axios.post("/api/social/posts", data);
};

const handleGetPost = async (id) => {
  return axios.get("/api/social/posts/"+toString(id));
};

const handleDeletePost = async (id) => {
  return axios.delete("/api/social/posts/"+toString(id));
};

const handleUpdatePost = async (data) => {
  return axios.put("/api/social/posts", data);
};

//Story
const handleCreateNewStory = async (data) => {
  return axios.post("/api/social/stories", data);
};

const handleGetStory = async (id) => {
  return axios.get("/api/social/stories/"+toString(id));
};

const handleDeleteStory = async (id) => {
  return axios.delete("/api/social/stories/"+toString(id));
};

const handleUpdateStory = async (data) => {
  return axios.put("/api/social/stories", data);
};

//Friend
const handleCreateNewFriend = async (data) => {
  return axios.post("/api/social/friends", data);
};

const handleGetFriend = async (id) => {
  return axios.get("/api/social/friends/"+toString(id));
};

const handleDeleteFriend = async (id) => {
  return axios.delete("/api/social/friends/"+toString(id));
};

//Follow
const handleCreateNewFollow = async (data) => {
  return axios.post("/api/social/follows", data);
};

const handleGetFollow = async (id) => {
  return axios.get("/api/social/follows/"+toString(id));
};

const handleDeleteFollow = async (id) => {
  return axios.delete("/api/social/follows/"+toString(id));
};

//Request
const handleCreateNewRequest = async (data) => {
  return axios.post("/api/social/requests", data);
};

const handleGetRequest = async (id) => {
  return axios.get("/api/social/requests/"+toString(id));
};

const handleDeleteRequest = async (id) => {
  return axios.delete("/api/social/requests/"+toString(id));
};

//Comment
const handleCreateNewComment = async (data) => {
  return axios.post("/api/social/comments", data);
};

const handleGetComment = async (id) => {
  return axios.get("/api/social/comments/"+toString(id));
};

const handleDeleteComment = async (id) => {
  return axios.delete("/api/social/comments/"+toString(id));
};

const handleUpdateComment = async (data) => {
  return axios.put("/api/social/comments", data);
};

//Chat
const handleCreateNewChat = async (data) => {
  return axios.post("/api/social/chats", data);
};

const handleGetChat = async (id) => {
  return axios.get("/api/social/chats/"+toString(id));
};

const handleDeleteChat = async (id) => {
  return axios.delete("/api/social/chats/"+toString(id));
};

const handleUpdateChat = async (data) => {
  return axios.put("/api/social/chats", data);
};

export {
  handleCreateNewPost,
  handleGetPost,
  handleDeletePost,
  handleUpdatePost,

  handleCreateNewStory,
  handleGetStory,
  handleDeleteStory,
  handleUpdateStory,

  handleCreateNewFriend,
  handleGetFriend,
  handleDeleteFriend,

  handleCreateNewFollow,
  handleGetFollow,
  handleDeleteFollow,

  handleCreateNewRequest,
  handleGetRequest,
  handleDeleteRequest,
  
  handleCreateNewComment,
  handleGetComment,
  handleDeleteComment,
  handleUpdateComment,

  handleCreateNewChat,
  handleGetChat,
  handleDeleteChat,
  handleUpdateChat,
}