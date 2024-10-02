import { useContext, useState } from "react";
import "./comments.scss";
// import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import moment from "moment";
import Send from "../../../assets/social/send.png";
import Person from "../../../assets/social/person.png";
import { Buffer } from "buffer";
import { AuthContext } from "../../../context/authContext";

const Comments = ({ idPost }) => {
  const [content, setContent] = useState("");
  // const { currentUser } = useContext(AuthContext);
  const access_token = localStorage.getItem("access_token");
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["comments",idPost], () =>
    makeRequest.get("/social/post/comments?idPost=" + idPost).then((res) => {
      // console.log(idPost);
      return res.data.item;
    })
  );

  console.log(data);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      console.log(newComment);
      return makeRequest.post("/social/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ access_token, content, idPost });
    setContent("");
  };

  return (
    <div className="comments">
      <hr className="mt-[20px]"/>
      <div className="scroll">
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((comment) => (
            <div className="comment">
              {comment.image
                ? <img className="img" src={Buffer.from(
                  comment.image,
                  "base64"
                  ).toString("binary")} alt=""/>
                : <img className="img" src={Person} alt=""/>
              }
              <div className="info">
                <p className="font-bold">{comment.firstName}</p>
                <p>{comment.content}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
      </div>
      <hr/>
      <div className="write">
      {currentUser?.user?.image
        ? <img className="img" src={Buffer.from(
          currentUser?.user?.image,
          "base64"
          ).toString("binary")} alt=""/>
        : <img className="img" src={Person} alt=""/>
      }
        
        <input
          type="text"
          placeholder="Viết bình luận ..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <form onSubmit={handleClick} className="border-none">
          <button type="submit" className="ml-auto mr-[5px] rounded-[50%] hover:bg-[#e9e9e9] w-[30px] h-[30px] self-center" >
            <img src={Send} alt=""  className="w-[20px] h-[20px] mx-auto"/>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
