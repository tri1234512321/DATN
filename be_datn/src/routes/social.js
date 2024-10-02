import express from "express";
import socialController from "../controllers/socialController";
import authUser from "../middleware/authUser";

let router = express.Router()

//Post
router.post("/posts", socialController.handleCreateNewPost)
router.get("/posts", socialController.handleGetPost)
router.get("/posts/:id", socialController.handleGetPost)
router.delete("/posts/:id", socialController.handleDeletePost)
router.put("/posts", socialController.handleUpdatePost)

//Story
router.post("/stories", socialController.handleCreateNewStory)
router.get("/stories", socialController.handleGetStory)
router.get("/stories/:id", socialController.handleGetStory)
router.delete("/stories/:id", socialController.handleDeleteStory)
router.put("/stories", socialController.handleUpdateStory)

//Friend
router.post("/friends", socialController.handleCreateNewFriend)
router.get("/friends", socialController.handleGetFriend)
router.get("/friends/:id", socialController.handleGetFriend)
router.get("/user/friends", socialController.handleGetUserFriend)
router.delete("/friends/:id", socialController.handleDeleteFriend)
router.get("/get-recommended-friend", socialController.handleGetRecommendedFriend)


//Follow
router.post("/follows", socialController.handleCreateNewFollow)
router.get("/follows", socialController.handleGetFollow)
router.get("/follows/:id", socialController.handleGetFollow)
router.delete("/follows/:id", socialController.handleDeleteFollow)

//Request
router.post("/requests", socialController.handleCreateNewRequest)
router.get("/requests", socialController.handleGetRequest)
router.get("/requests/:id", socialController.handleGetRequest)
router.get("/user/requests", socialController.handleGetUserRequest)
router.delete("/requests/:id", socialController.handleDeleteRequest)

//Comment
router.post("/comments", socialController.handleCreateNewComment)
router.get("/comments", socialController.handleGetComment)
router.get("/comments/:id", socialController.handleGetComment)
router.get("/post/comments", socialController.handleGetPostComment)
router.delete("/comments/:id", socialController.handleDeleteComment)
router.put("/comments", socialController.handleUpdateComment)

//Chat
router.post("/chats", socialController.handleCreateNewChat)
router.get("/chats", socialController.handleGetChat)
router.get("/chats/:id", socialController.handleGetChat)
router.get("/user/chats", socialController.handleGetUserChat)
router.delete("/chats/:id", socialController.handleDeleteChat)
router.put("/chats", socialController.handleUpdateChat)

//Like
router.post("/likes", socialController.handleCreateNewLike)
router.get("/likes", socialController.handleGetLike)
router.get("/likes/:idPost", socialController.handleGetLike)
router.get("/user/likes", socialController.handleGetUserLike)
router.delete("/likes", socialController.handleDeleteLike)

//Unlike
router.post("/unlikes", socialController.handleCreateNewUnlike)
router.get("/unlikes", socialController.handleGetUnlike)
router.get("/unlikes/:idPost", socialController.handleGetUnlike)
router.get("/user/unlikes", socialController.handleGetUserUnlike)
router.delete("/unlikes", socialController.handleDeleteUnlike)

export default router