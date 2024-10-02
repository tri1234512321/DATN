/** @format */
import bcrypt from "bcryptjs";
import db from "../models/index";
import JWTAction from "../middleware/JWTAction";
import { dtb } from "../config/connect";
const salt = bcrypt.genSaltSync(10);
import { driver } from "../config/neo4j";

const { Op } = require('sequelize');

//Post
const createNewPost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let access_token = data.access_token;
      let decode = JWTAction.verifyToken(access_token);
      // console.log(decode.idUser);
      let idUser = Number(decode.idUser);
      await db.Post.create({
        idUser: idUser,
        image: data.image,
        descPost: data.descPost,
      });
      resolve({
        EC: 0,
        EM: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getPost = (idUser, access_token) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(idUser,access_token);
      let decode = JWTAction.verifyToken(access_token);
      // console.log(decode.idUser);
      let idMainUser = Number(decode.idUser);
      // console.log(idMainUser);
      const q =
      idUser
        ? `SELECT p.*, u.id AS idUser, firstName, u.image AS profilePic FROM posts AS p JOIN users AS u ON (u.id = p.idUser) WHERE p.idUser = ? ORDER BY p.createdAt DESC`
        : `SELECT p.*, u.id AS idUser, firstName, u.image AS profilePic FROM posts AS p JOIN users AS u ON (u.id = p.idUser)
          LEFT JOIN friends AS r ON (p.idUser = r.idFriendUser) WHERE r.idUser= ? OR p.idUser =?
          ORDER BY p.createdAt DESC`;
        const values =
          idUser ? [idUser] : [idMainUser, idMainUser];

      dtb.query(q, values, (err, data) => {
        if (err) console.log(err);
        resolve(data);
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deletePost = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = await db.Post.findOne({
        where: { id: id },
      });
      if (!item) {
        resolve({
          EC: 2,
          message: "Item not found!",
        });
      }
      await db.Post.destroy({
        where: { id: id },
      });
      resolve({
        EC: 0,
        message: `Post with ${id} deleted successfully!`,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updatePost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          EC: 2,
          EM: "Missing id!",
        });
      }
      let item = await db.Post.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (item) {
        item.descPost = data.descPost;
        item.image = data.image;
        await item.save();
        resolve({
          EC: 0,
          message: "Item updated!",
        });
      } else {
        resolve({
          EC: 1,
          EM: "Item not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

//Story
const createNewStory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let access_token = data.access_token;
      let decode = JWTAction.verifyToken(access_token);
      // console.log(decode.idUser);
      let idUser = Number(decode.idUser);
      await db.Story.create({
        idUser: idUser,
        image: data.image,
      });
      resolve({
        EC: 0,
        EM: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getStory = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = "";
      if (id) {
        // console.log("getAllproduct");
        item = await db.Story.findAll({
          where: {
            id: id,
          },
        });
      }
      else {
        item = await db.Story.findAll()
      }
      resolve(item);
    } catch (e) {
      reject(e);
    }
  });
};

const deleteStory = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = await db.Story.findOne({
        where: { id: id },
      });
      if (!item) {
        resolve({
          EC: 2,
          message: "Item not found!",
        });
      }
      await db.Story.destroy({
        where: { id: id },
      });
      resolve({
        EC: 0,
        message: `Story with ${id} deleted successfully!`,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateStory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          EC: 2,
          EM: "Missing id!",
        });
      }
      let item = await db.Story.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (item) {
        item.image = data.image;
        await item.save();
        resolve({
          EC: 0,
          message: "Item updated!",
        });
      } else {
        resolve({
          EC: 1,
          EM: "Item not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

//Friend
const createNewFriend = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let access_token = data.access_token;
      let decode = JWTAction.verifyToken(access_token);
      // console.log(decode.idUser);
      let idUser = Number(decode.idUser);
      await db.Friend.create({
        idUser: idUser,
        idFriendUser: data.idFriendUser
      });

      const session = driver.session();
      let us = await db.User.findOne({
        where: {
          id: idUser
        }
      });
      let fus = await db.User.findOne({
        where: {
          id: data.idFriendUser
        }
      });
      console.log(us.email,fus.email);
      await session
      .run('MATCH (u1: User {userName: $userName1}) MATCH (u2: User {userName: $userName2}) MERGE (u1) - [:IS_FRIEND_WITH] -> (u2)', 
        { userName1: us.email, userName2: fus.email})
        .then((result) => {
          session.close();
        })
        .catch(error => {
          console.log(error);
        })

      resolve({
        EC: 0,
        EM: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getFriend = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = "";
      if (id) {
        // console.log("getAllproduct");
        item = await db.Friend.findAll({
          where: {
            id: id,
          },
        });
      }
      else {
        item = await db.Friend.findAll()
      }
      resolve(item);
    } catch (e) {
      reject(e);
    }
  });
};

const getUserFriend = (idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let item = "";
      // if (idUser) {
        // console.log("getAllproduct");
        // item = await db.Friend.findAll({
        //   where: {
        //     idUser: idUser,
        //   },
        // });

        const q = `SELECT u.*,f.id as friendId FROM friends AS f JOIN users AS u ON ((f.idFriendUser = u.id AND f.idUser = ?) OR (f.idFriendUser = ? AND f.idUser = u.id)) LIMIT 4`;
        const values = [idUser, idUser];

        dtb.query(q, values, (err, data) => {
          resolve(data);
        });
      // }
      // resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const deleteFriend = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = await db.Friend.findOne({
        where: { id: id },
      });
      if (!item) {
        resolve({
          EC: 2,
          message: "Item not found!",
        });
      }
      await db.Friend.destroy({
        where: { id: id },
      });
      resolve({
        EC: 0,
        message: `Friend with ${id} deleted successfully!`,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getRecommendedFriend = async (userName) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(userName);
      let rc = [];
      const session = driver.session();
      await session
        .run('MATCH (u:User {userName:$name}) MATCH (u)-[:IS_FRIEND_WITH]-(:User)-[:IS_FRIEND_WITH]-(other:User) WITH other, count(*) AS strength ORDER BY strength DESC LIMIT 5 RETURN other.userName AS email, strength', 
          { name: userName})
        .then((result) => {
          session.close();
          result.records.forEach((record) => {
            rc.push(record.get("email"));
          });
        })
        .catch((error) => {
          console.log(error);
        });
      if(rc.length===0) {
        resolve([]);
      }
      let products = await db.User.findAll({
        where: {
          email: {
            [Op.or]: rc,
          },
        },
      });
      resolve(products);
    } catch (e) {
      reject(e);
    }
  });
}

//Follow
const createNewFollow = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let access_token = data.access_token;
      let decode = JWTAction.verifyToken(access_token);
      // console.log(decode.idUser);
      let idUser = Number(decode.idUser);
      await db.Follow.create({
        idFollowerUser: idUser,
        idFollowedUser: data.idFollowedUser
      });
      resolve({
        EC: 0,
        EM: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getFollow = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = "";
      if (id) {
        // console.log("getAllproduct");
        item = await db.Follow.findAll({
          where: {
            id: id,
          },
        });
      }
      else {
        item = await db.Follow.findAll()
      }
      resolve(item);
    } catch (e) {
      reject(e);
    }
  });
};

const deleteFollow = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = await db.Follow.findOne({
        where: { id: id },
      });
      if (!item) {
        resolve({
          EC: 2,
          message: "Item not found!",
        });
      }
      await db.Follow.destroy({
        where: { id: id },
      });
      resolve({
        EC: 0,
        message: `Follow with ${id} deleted successfully!`,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//Request
const createNewRequest = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let access_token = data.access_token;
      let decode = JWTAction.verifyToken(access_token);
      // console.log(decode.idUser);
      let idUser = Number(decode.idUser);
      await db.Request.create({
        idRequesterUser: idUser,
        idRequestedUser: data.idRequestedUser
      });
      resolve({
        EC: 0,
        EM: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getRequest = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = "";
      if (id) {
        // console.log("getAllproduct");
        item = await db.Request.findAll({
          where: {
            id: id,
          },
        });
      }
      else {
        item = await db.Request.findAll()
      }
      resolve(item);
    } catch (e) {
      reject(e);
    }
  });
};

const getUserRequest = (idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let item = "";
      // if (idUser) {
        // console.log("getAllproduct");
        // item = await db.Friend.findAll({
        //   where: {
        //     idUser: idUser,
        //   },
        // });

        const q = `SELECT u.*,r.id as requestId FROM requests AS r JOIN users AS u ON (r.idRequesterUser = u.id AND r.idRequestedUser = ?)`;
        const values = [idUser];

        dtb.query(q, values, (err, data) => {
          resolve(data);
        });
      // }
      // resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const deleteRequest = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = await db.Request.findOne({
        where: { id: id },
      });
      if (!item) {
        resolve({
          EC: 2,
          message: "Item not found!",
        });
      }
      await db.Request.destroy({
        where: { id: id },
      });
      resolve({
        EC: 0,
        message: `Request with ${id} deleted successfully!`,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//Comment
const createNewComment = async (data) => {
  try {
    const { access_token, idReceivedUser, rateId, idPost, idFood, content } = data;
    const decoded = JWTAction.verifyToken(access_token);
    const idUser = Number(decoded.idUser);
    console.log(idPost,typeof(idPost));
    await db.Comment.create({
      idUserSend: idUser,
      idReceivedUser,
      rateId,
      idPost,
      idFood,
      content,
    });

    return {
      EC: 0,
      EM: "OK",
    };
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error; // Rethrow the error for upstream handling
  }
};

const getComment = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = "";
      if (id) {
        // console.log("getAllproduct");
        item = await db.Comment.findAll({
          where: {
            id: id,
          },
        });
      }
      else {
        item = await db.Comment.findAll()
      }
      resolve(item);
    } catch (e) {
      reject(e);
    }
  });
};

const getPostComment = (idPost) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(idPost);
      let item = "";
      if (idPost) {
        const q = `SELECT c.*, u.id AS userId, firstName, image FROM comments AS c JOIN users AS u ON (u.id = c.idUserSend)
          WHERE c.idPost = ? ORDER BY c.createdAt DESC`
          ;
        let value = idPost;
        await dtb.query(q, value, (err, data) => {
          // console.log(data);
          resolve(data);
        });
      }
      // else {
      //   item = await db.Comment.findAll()
      // }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteComment = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = await db.Comment.findOne({
        where: { id: id },
      });
      if (!item) {
        resolve({
          EC: 2,
          message: "Item not found!",
        });
      }
      await db.Comment.destroy({
        where: { id: id },
      });
      resolve({
        EC: 0,
        message: `Comment with ${id} deleted successfully!`,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateComment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          EC: 2,
          EM: "Missing id!",
        });
      }
      let item = await db.Comment.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (item) {
        item.content = data.content;
        await item.save();
        resolve({
          EC: 0,
          message: "Item updated!",
        });
      } else {
        resolve({
          EC: 1,
          EM: "Item not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

//Chat
const createNewChat = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let access_token = data.access_token;
      let decode = JWTAction.verifyToken(access_token);
      // console.log(decode.idUser);
      let idUser = Number(decode.idUser);
      await db.Chat.create({
        idSendedUser: idUser,
        idReceivedUser: data.idReceivedUser,
        content: data.content
      });
      resolve({
        EC: 0,
        EM: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getChat = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = "";
      if (id) {
        // console.log("getAllproduct");
        item = await db.Chat.findAll({
          where: {
            id: id,
          },
        });
      }
      else {
        item = await db.Chat.findAll()
      }
      resolve(item);
    } catch (e) {
      reject(e);
    }
  });
};

const getUserChat = (access_token, receivedUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let decode = JWTAction.verifyToken(access_token);
      // console.log(decode.idUser);
      let idUser = Number(decode.idUser);

      const q = `SELECT * FROM chats AS c WHERE ((c.idSendedUser = ? AND c.IdReceivedUser = ?) OR (c.idSendedUser = ? AND c.IdReceivedUser = ?))`;

      db.query(q, [idUser,receivedUser,receivedUser,idUser], (err, data) => {
        resolve(data);
      });

    } catch (e) {
      reject(e);
    }
  });
};

const deleteChat = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = await db.Chat.findOne({
        where: { id: id },
      });
      if (!item) {
        resolve({
          EC: 2,
          message: "Item not found!",
        });
      }
      await db.Chat.destroy({
        where: { id: id },
      });
      resolve({
        EC: 0,
        message: `Chat with ${id} deleted successfully!`,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateChat = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          EC: 2,
          EM: "Missing id!",
        });
      }
      let item = await db.Chat.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (item) {
        item.content = data.content;
        await item.save();
        resolve({
          EC: 0,
          message: "Item updated!",
        });
      } else {
        resolve({
          EC: 1,
          EM: "Item not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

//Like
const createNewLike = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let access_token = data.access_token;
      let decode = JWTAction.verifyToken(access_token);
      // console.log(decode.idUser);
      let idUser = Number(decode.idUser);
      await db.Like.create({
        idUser: idUser,
        idPost: data.idPost,
      });
      resolve({
        EC: 0,
        EM: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getLike = (idPost) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = "";
      if (idPost) {
        // console.log("getAllproduct");
        item = await db.Like.findAll({
          where: {
            idPost: idPost,
          },
        });
      }
      else {
        item = await db.Like.findAll()
      }
      resolve(item.map(like=>like.idUser));
    } catch (e) {
      reject(e);
    }
  });
};

const getUserLike = (access_token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let decode = JWTAction.verifyToken(access_token);
      // console.log(decode.idUser);
      let idUser = Number(decode.idUser);
      let item = await db.Like.findOne({
        where: { idUser: idUser },
      });
      resolve(item);
    } catch (e) {
      reject(e);
    }
  });
}

const deleteLike = (access_token, idPost) => {
  return new Promise(async (resolve, reject) => {
    try {
      let decode = JWTAction.verifyToken(access_token);
      // console.log(decode.idUser);
      let idUser = Number(decode.idUser);
      let item = await db.Like.findOne({
        where: { idUser: idUser, idPost: idPost },
      });
      if (!item) {
        resolve({
          EC: 2,
          message: "Item not found!",
        });
      }
      await db.Like.destroy({
        where: { idUser: idUser, idPost: idPost },
      });
      resolve({
        EC: 0,
        message: `Like deleted successfully!`,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//Unlike
const createNewUnlike = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let access_token = data.access_token;
      let decode = JWTAction.verifyToken(access_token);
      // console.log(decode.idUser);
      let idUser = Number(decode.idUser);
      await db.Unlike.create({
        idUser: idUser,
        idPost: data.idPost,
      });
      resolve({
        EC: 0,
        EM: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getUnlike = (idPost) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = "";
      if (idPost) {
        // console.log("getAllproduct");
        item = await db.Unlike.findAll({
          where: {
            idPost: idPost,
          },
        });
      }
      else {
        item = await db.Unlike.findAll()
      }
      resolve(item.map(like=>like.idUser));
    } catch (e) {
      reject(e);
    }
  });
};

const getUserUnlike = (access_token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let decode = JWTAction.verifyToken(access_token);
      // console.log(decode.idUser);
      let idUser = Number(decode.idUser);
      let item = await db.Unlike.findOne({
        where: { idUser: idUser },
      });
      resolve(item);
    } catch (e) {
      reject(e);
    }
  });
}

const deleteUnlike = (access_token, idPost) => {
  return new Promise(async (resolve, reject) => {
    try {
      let decode = JWTAction.verifyToken(access_token);
      // console.log(decode.idUser);
      let idUser = Number(decode.idUser);
      let item = await db.Unlike.findOne({
        where: { idUser: idUser, idPost: idPost },
      });
      if (!item) {
        resolve({
          EC: 2,
          message: "Item not found!",
        });
      }
      await db.Unlike.destroy({
        where: { idUser: idUser, idPost: idPost },
      });
      resolve({
        EC: 0,
        message: `Unlike deleted successfully!`,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewPost: createNewPost,
  getPost: getPost,
  updatePost: updatePost,
  deletePost: deletePost,

  createNewStory: createNewStory,
  getStory: getStory,
  updateStory: updateStory,
  deleteStory: deleteStory,

  createNewFriend: createNewFriend,
  getFriend: getFriend,
  getUserFriend: getUserFriend,
  deleteFriend: deleteFriend,
  getRecommendedFriend,

  createNewFollow: createNewFollow,
  getFollow: getFollow,
  deleteFollow: deleteFollow,

  createNewRequest: createNewRequest,
  getRequest: getRequest,
  getUserRequest: getUserRequest,
  deleteRequest: deleteRequest,

  createNewComment: createNewComment,
  getComment: getComment,
  getPostComment: getPostComment,
  updateComment: updateComment,
  deleteComment: deleteComment,

  createNewChat: createNewChat,
  getChat: getChat,
  updateChat: updateChat,
  getUserChat:getUserChat,
  deleteChat: deleteChat,

  createNewLike: createNewLike,
  getLike: getLike,
  getUserLike:getUserLike,
  deleteLike: deleteLike,

  createNewUnlike: createNewUnlike,
  getUnlike: getUnlike,
  getUserUnlike:getUserUnlike,
  deleteUnlike: deleteUnlike,

}