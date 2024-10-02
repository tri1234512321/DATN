import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import {makeRequest} from "../axios";
import { AuthContext } from "../../../context/authContext";
import { useContext} from "react";

const Posts = () => {
  const { currentUser } = useContext(AuthContext);
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/social/posts",{params:{access_token:currentUser.access_token}}).then((res) => {
      // console.log(res.data);
      return res.data.item;
    })
  );

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
