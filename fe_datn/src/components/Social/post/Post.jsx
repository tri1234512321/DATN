import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import { Buffer } from "buffer";
import Person from "../../../assets/social/person.png";

const Post = ({ post }) => {
  // console.log("post: ", post);
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // console.log(post);
  const { currentUser } = useContext(AuthContext);

  const {
    isLoading: loadingLike,
    error: errorLike,
    data: dataLike = [],
  } = useQuery(["likes", post.id], () =>
    makeRequest.get("/social/likes/" + post.id).then((res) => {
      return res.data.item || [];
    })
  );

  const {
    isLoading: loadingUnLike,
    error: errorUnLike,
    data: dataUnLike = [],
  } = useQuery(["unlikes", post.id], () =>
    makeRequest.get("/social/unlikes/" + post.id).then((res) => {
      return res.data.item || [];
    })
  );

  // console.log(dataUnLike);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked) => {
      if (liked)
        return makeRequest.delete("/social/likes/", {
          params: { idPost: post.id, access_token: currentUser.access_token },
        });
      return makeRequest.post("/social/likes", {
        access_token: currentUser.access_token,
        idPost: post.id,
      });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const umutation = useMutation(
    (unliked) => {
      if (unliked)
        return makeRequest.delete("/social/unlikes/", {
          params: { idPost: post.id, access_token: currentUser.access_token },
        });
      return makeRequest.post("/social/unlikes", {
        access_token: currentUser.access_token,
        idPost: post.id,
      });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["unlikes"]);
      },
    }
  );

  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/social/posts" + postId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(dataLike.includes(currentUser.user.id));
    if (dataUnLike.includes(currentUser.user.id)) {
      umutation.mutate(dataUnLike.includes(currentUser.user.id));
    }
  };

  const uhandleLike = () => {
    console.log("check handleLike 13");

    umutation.mutate(dataUnLike.includes(currentUser.user.id));
    console.log("check handle unLike");

    if (dataLike.includes(currentUser.user.id)) {
      mutation.mutate(dataLike.includes(currentUser.user.id));
    }
  };

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            {post?.profilePic
              ? <img src={Buffer.from(
                post.profilePic,
                "base64"
                ).toString("binary")} alt=""/>
              : <img src={Person} alt=""/>
            }
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post?.firstName}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {/* {menuOpen && post.userId === currentUser.user.id && ( */}
          {menuOpen && <button onClick={handleDelete}>delete</button>}
        </div>
        <div className="content">
          <p className="mx-[15px]">{post.descPost}</p>
          <img
            src={Buffer.from(post.image, "base64").toString("binary")}
            alt=""
          />
        </div>
        <div className="info">
          <div className="flex items-center gap-[7px] rounded-[999px] bg-[#e4ebf7]">
            {loadingLike ? (
              "loading"
            ) : dataLike?.includes(currentUser.user.id) ? (
              <div
                onClick={handleLike}
                className="hover:bg-[#d8e0ee] rounded-full w-[38px] h-[38px] p-[7px]"
              >
                <ThumbUpIcon style={{ color: "blue", fontSize: "large" }} />
              </div>
            ) : (
              <div
                onClick={handleLike}
                className="hover:bg-[#d8e0ee] rounded-full w-[38px] h-[38px] p-[7px]"
              >
                <ThumbUpOutlinedIcon style={{ fontSize: "large" }} />
              </div>
            )}
            {dataLike?.length - dataUnLike?.length}
            {loadingUnLike ? (
              "loading"
            ) : dataUnLike?.includes(currentUser.user.id) ? (
              <div
                onClick={uhandleLike}
                className="hover:bg-[#d8e0ee] rounded-full w-[38px] h-[38px] p-[7px]"
              >
                <ThumbDownIcon style={{ color: "red", fontSize: "large" }} />
              </div>
            ) : (
              <div
                onClick={uhandleLike}
                className="hover:bg-[#d8e0ee] rounded-full w-[38px] h-[38px] p-[7px]"
              >
                <ThumbDownOutlinedIcon style={{ fontSize: "large" }} />
              </div>
            )}
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            Bình luận
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments idPost={post.id} />}
      </div>
    </div>
  );
};

export default Post;
