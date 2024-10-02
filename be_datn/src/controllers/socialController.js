/** @format */

import socialService from "../services/socialService";
import { verifyToken } from "../middleware/JWTAction";

//Post
const handleCreateNewPost = async (req, res) => {
  const data = req.body;
  let message = await socialService.createNewPost(data);
  return res.status(200).json(message);
};

const handleGetPost = async (req, res) => {
  let idUser = Number(req.query.idUser);
  let access_token = req.query.access_token;
  // console.log(idUser,access_token);
  let item = await socialService.getPost(idUser, access_token);
  // console.log(posts);
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    item: item,
  });
};

const handleDeletePost = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    return res.status(200).json({
      EC: 1,
      EM: "Missing parameter",
    });
  }
  let message = await socialService.deletePost(id);
  return res.status(200).json(message);
};

const handleUpdatePost = async (req, res) => {
  const data = req.body;
  let message = await socialService.updatePost(data);
  return res.status(200).json(message);
};

//Story
const handleCreateNewStory = async (req, res) => {
  const data = req.body;
  let message = await socialService.createNewStory(data);
  return res.status(200).json(message);
};

const handleGetStory = async (req, res) => {
  let id = req.params.id;
  // console.log(id);
  let item = await socialService.getStory(id);
  // console.log(Storys);
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    item: item,
  });
};

const handleDeleteStory = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    return res.status(200).json({
      EC: 1,
      EM: "Missing parameter",
    });
  }
  let message = await socialService.deleteStory(id);
  return res.status(200).json(message);
};

const handleUpdateStory = async (req, res) => {
  const data = req.body;
  let message = await socialService.updateStory(data);
  return res.status(200).json(message);
};

//Friend
const handleCreateNewFriend = async (req, res) => {
  const data = req.body;
  let message = await socialService.createNewFriend(data);
  return res.status(200).json(message);
};

const handleGetFriend = async (req, res) => {
  let id = req.params.id;
  // console.log(id);
  let item = await socialService.getFriend(id);
  // console.log(Friends);
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    item: item,
  });
};

const handleGetUserFriend = async (req, res) => {
  let idUser = req.query.idUser;
  // console.log(id);
  let item = await socialService.getUserFriend(idUser);
  // console.log(Friends);
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    item: item,
  });
};

const handleDeleteFriend = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    return res.status(200).json({
      EC: 1,
      EM: "Missing parameter",
    });
  }
  let message = await socialService.deleteFriend(id);
  return res.status(200).json(message);
};

const handleGetRecommendedFriend = async (req, res) => {
  let userName = req.query.userName;
  // console.log(id);
  let item = await socialService.getRecommendedFriend(userName);
  // console.log(Friends);
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    item: item,
  });
};


//Follow
const handleCreateNewFollow = async (req, res) => {
  const data = req.body;
  let message = await socialService.createNewFollow(data);
  return res.status(200).json(message);
};

const handleGetFollow = async (req, res) => {
  let id = req.params.id;
  // console.log(id);
  let item = await socialService.getFollow(id);
  // console.log(Follows);
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    item: item,
  });
};

const handleDeleteFollow = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    return res.status(200).json({
      EC: 1,
      EM: "Missing parameter",
    });
  }
  let message = await socialService.deleteFollow(id);
  return res.status(200).json(message);
};

//Follow
const handleCreateNewRequest = async (req, res) => {
  const data = req.body;
  let message = await socialService.createNewRequest(data);
  return res.status(200).json(message);
};

const handleGetRequest = async (req, res) => {
  let id = req.params.id;
  // console.log(id);
  let item = await socialService.getRequest(id);
  // console.log(Requests);
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    item: item,
  });
};

const handleGetUserRequest = async (req, res) => {
  let idUser = req.query.idUser;
  // console.log(id);
  let item = await socialService.getUserRequest(idUser);
  // console.log(Requests);
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    item: item,
  });
};

const handleDeleteRequest = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    return res.status(200).json({
      EC: 1,
      EM: "Missing parameter",
    });
  }
  let message = await socialService.deleteRequest(id);
  return res.status(200).json(message);
};

//Comment
const handleCreateNewComment = async (req, res) => {
  const data = req.body;
  let message = await socialService.createNewComment(data);
  return res.status(200).json(message);
};

const handleGetComment = async (req, res) => {
  let id = req.params.id;
  // console.log(id);
  let item = await socialService.getComment(id);
  // console.log(Comments);
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    item: item,
  });
};

const handleGetPostComment = async (req, res) => {
  let idPost = req.query.idPost;
  // console.log(idPost);
  let item = await socialService.getPostComment(idPost);
  // console.log(Comments);
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    item: item,
  });
};

const handleDeleteComment = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    return res.status(200).json({
      EC: 1,
      EM: "Missing parameter",
    });
  }
  let message = await socialService.deleteComment(id);
  return res.status(200).json(message);
};

const handleUpdateComment = async (req, res) => {
  const data = req.body;
  let message = await socialService.updateComment(data);
  return res.status(200).json(message);
};

//Chat
const handleCreateNewChat = async (req, res) => {
  const data = req.body;
  let message = await socialService.createNewChat(data);
  return res.status(200).json(message);
};

const handleGetChat = async (req, res) => {
  let id = req.params.id;
  // console.log(id);
  let item = await socialService.getChat(id);
  // console.log(Chats);
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    item: item,
  });
};

const handleGetUserChat = async (req, res) => {
  let access_token = req.params.access_token;
  let idReceivedUser = req.params.idReceivedUser;
  // console.log(id);
  let item = await socialService.getUserChat(access_token, receivedUser);
  // console.log(Chats);
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    item: item,
  });
};

const handleDeleteChat = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    return res.status(200).json({
      EC: 1,
      EM: "Missing parameter",
    });
  }
  let message = await socialService.deleteChat(id);
  return res.status(200).json(message);
};

const handleUpdateChat = async (req, res) => {
  const data = req.body;
  let message = await socialService.updateChat(data);
  return res.status(200).json(message);
};

//Like
const handleCreateNewLike = async (req, res) => {
  const data = req.body;
  let message = await socialService.createNewLike(data);
  return res.status(200).json(message);
};

const handleGetLike = async (req, res) => {
  let idPost = req.params.idPost;
  // console.log(id);
  let item = await socialService.getLike(idPost);
  // console.log(Likes);
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    item: item,
  });
};

const handleGetUserLike = async (req, res) => {
  let access_token = req.query.access_token;
  // console.log(access_token);
  let item = await socialService.getUserLike(access_token);
  // console.log(Likes);
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    item: item,
  });
};

const handleDeleteLike = async (req, res) => {
  let access_token = req.query.access_token;
  let idPost = req.query.idPost;
  if (!idPost) {
    return res.status(200).json({
      EC: 1,
      EM: "Missing parameter",
    });
  }
  let message = await socialService.deleteLike(access_token, idPost);
  return res.status(200).json(message);
};

//Unlike
const handleCreateNewUnlike = async (req, res) => {
  const data = req.body;
  let message = await socialService.createNewUnlike(data);
  return res.status(200).json(message);
};

const handleGetUnlike = async (req, res) => {
  let idPost = req.params.idPost;
  // console.log(id);
  let item = await socialService.getUnlike(idPost);
  // console.log(Unlikes);
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    item: item,
  });
};

const handleGetUserUnlike = async (req, res) => {
  let access_token = req.query.access_token;
  // console.log(access_token);
  let item = await socialService.getUserUnlike(access_token);
  // console.log(Unlikes);
  return res.status(200).json({
    EC: 0,
    EM: "Ok",
    item: item,
  });
};

const handleDeleteUnlike = async (req, res) => {
  let access_token = req.query.access_token;
  let idPost = req.query.idPost;
  if (!idPost) {
    return res.status(200).json({
      EC: 1,
      EM: "Missing parameter",
    });
  }
  let message = await socialService.deleteUnlike(access_token,idPost);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateNewPost: handleCreateNewPost,
  handleGetPost: handleGetPost,
  handleDeletePost: handleDeletePost,
  handleUpdatePost: handleUpdatePost,

  handleCreateNewStory: handleCreateNewStory,
  handleGetStory: handleGetStory,
  handleDeleteStory: handleDeleteStory,
  handleUpdateStory: handleUpdateStory,

  handleCreateNewFriend: handleCreateNewFriend,
  handleGetFriend: handleGetFriend,
  handleGetUserFriend: handleGetUserFriend,
  handleDeleteFriend: handleDeleteFriend,
  handleGetRecommendedFriend,

  handleCreateNewFollow: handleCreateNewFollow,
  handleGetFollow: handleGetFollow,
  handleDeleteFollow: handleDeleteFollow,

  handleCreateNewRequest: handleCreateNewRequest,
  handleGetRequest: handleGetRequest,
  handleGetUserRequest: handleGetUserRequest,
  handleDeleteRequest: handleDeleteRequest,
  
  handleCreateNewComment: handleCreateNewComment,
  handleGetComment: handleGetComment,
  handleGetPostComment: handleGetPostComment,
  handleDeleteComment: handleDeleteComment,
  handleUpdateComment: handleUpdateComment,

  handleCreateNewChat: handleCreateNewChat,
  handleGetChat: handleGetChat,
  handleGetUserChat: handleGetUserChat,
  handleDeleteChat: handleDeleteChat,
  handleUpdateChat: handleUpdateChat,

  handleCreateNewLike: handleCreateNewLike,
  handleGetLike: handleGetLike,
  handleGetUserLike: handleGetUserLike,
  handleDeleteLike: handleDeleteLike,

  handleCreateNewUnlike: handleCreateNewUnlike,
  handleGetUnlike: handleGetUnlike,
  handleGetUserUnlike: handleGetUserUnlike,
  handleDeleteUnlike: handleDeleteUnlike,
}