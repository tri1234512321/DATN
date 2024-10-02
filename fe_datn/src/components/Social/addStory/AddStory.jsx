import { useState } from "react";
import { makeRequest } from "../axios";
import "./addStory.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CommonUtils from "../../../utils/CommonUtils";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Close from "../../../assets/social/close-blue.png";

const AddStory = ({ setOpenAddStory }) => {
  const [cover, setCover] = useState(null);
  const [image, setImage] = useState(null);

  const access_token = localStorage.getItem("access_token");
  // const [texts, setTexts] = useState({
  //   email: user.email,
  // });

  // const upload = async (file) => {
  //   console.log(file)
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     const res = await makeRequest.post("/upload", formData);
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleChange = (e) => {
  //   setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  // };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (story) => {
      return makeRequest.post("/social/stories", story);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["stories"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();

    //TODO: find a better way to get image URL
    
    let coverUrl;
    coverUrl = image;
    
    mutation.mutate({ access_token: access_token, image: coverUrl});
    setOpenAddStory(false);
    setCover(null);
    setImage(null);
  }

  const handleChooseAvatar = async (event) => {
    let file = event.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      console.log(base64);
      // const objectURL = URL.createObjectURL(file);
      setCover(file);
      setImage(base64);
    }
  };
  
  return (
    <div className="update">
      <div className="wrapper">
        <p className="font-semibold text-black">Tải story của bạn</p>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span >Chọn ảnh</span>
              <div className="imgContainer">
                <img
                  src={
                    cover? URL.createObjectURL(cover): null
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={handleChooseAvatar}
            />
          </div>
          {/* <label>Email</label>
          <input
            type="text"
          /> */}
          <button onClick={handleClick}>Add story</button>
        </form>
        <button className="close rounded-[5px]" onClick={() => setOpenAddStory(false)}>
          <img src={Close} alt=""/>
        </button>
      </div>
    </div>
  );
};

export default AddStory;
