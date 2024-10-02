import "./share.scss";
import Image from "../../../assets/social/img.png";
import Video from "../../../assets/social/video.png";
import Friend from "../../../assets/social/friend.png";
import Person from "../../../assets/social/person.png";
import { useContext, useState } from "react";
// import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import CommonUtils from "../../../utils/CommonUtils";
const Share = () => {
  const [file, setFile] = useState(null);
  const [cover, setCover] = useState("");
  const [desc, setDesc] = useState("");

  const access_token = localStorage.getItem("access_token");

  // const upload = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     const res = await makeRequest.post("/upload", formData);
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/social/posts", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({access_token:access_token , descPost:desc, image: file });
    setDesc("");
    setCover("");
    setFile(null);
  };

  const handleChooseAvatar = async (event) => {
    let file = event.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      // const objectURL = URL.createObjectURL(file);
      setCover(file);
      setFile(base64);
    }
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={Person} alt="" />
            <input
              className="m-0"
              type="text"
              placeholder={`Bạn đang nghĩ gì thế ?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(cover)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleChooseAvatar}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Thêm hình</span>
              </div>
            </label>
            <div className="item">
              <img src={Video} alt="" />
              <span>Thêm video</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Thêm bạn</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Đăng</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
