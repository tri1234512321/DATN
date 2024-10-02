// import { useContext } from "react";
import "./stories.scss";
// import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import { Buffer } from "buffer";
import AddStory from "../../../components/Social/addStory/AddStory";
import { useState } from "react";
import Person from "../../../assets/social/person.png";

const Stories = () => {
  const [openAddStory, setOpenAddStory] = useState(false);
  // const { currentUser } = useContext(AuthContext);
  // console.log(currentUser)

  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get("/social/stories").then((res) => {
      return res.data.item;
    })
  );

  //TODO Add story using react-query mutations and use upload function.

  return (
    <div className="stories">
      <div className="story">
        <img src={Person} alt="" />
        <span>{"currentUser.name"}</span>
        <button onClick={() => setOpenAddStory(true)}>+</button>
      </div>
      {error
        ? ""
        : isLoading
        ? "loading"
        : data.slice(undefined,3).map((story) => (
            <div className="story" key={story.id}>
              <img src={Buffer.from(
                          story.image,
                          "base64"
                        ).toString("binary")} alt="" />
              <span>{story.name}</span>
            </div>
          ))}
      
      {openAddStory && <AddStory setOpenAddStory={setOpenAddStory} />}
    </div>
  );
};

export default Stories;
