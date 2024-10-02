import "./leftBar.scss";
import Friends from "../../../assets/social/friend.png";
import Groups from "../../../assets/social/group.png";
import Memories from "../../../assets/social/celebrate.png";
import Events from "../../../assets/social/event.png";
import Games from "../../../assets/social/game.png";
import Market from "../../../assets/social/market.png";
import Save from "../../../assets/social/save.png";
import Gallery from "../../../assets/social/galary.png";
import Person from "../../../assets/social/person.png";
import { AuthContext } from "../../../context/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Buffer } from "buffer";

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);
  // console.log("currentUser: ", currentUser);
  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          {/* <Link to={"/profile/"+currentUser.id} style={{ textDecoration: "none" }}> */}
          <div className="user">
            {currentUser["user"].image ? (
              <img
                src={Buffer.from(currentUser["user"].image, "base64").toString(
                  "binary"
                )}
                alt=""
              />
            ) : (
              <img src={Person} alt="" />
            )}
            <span>{currentUser["user"].firstName}</span>
          </div>
          {/* </Link> */}
          <Link to="/social/friend" style={{ textDecoration: "none" }}>
            <div className="item">
              <img src={Friends} alt="" />
              <span>Bạn bè</span>
            </div>
          </Link>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Kỷ niệm</span>
          </div>
          <div className="item">
            <img src={Save} alt="" />
            <span>Đã lưu</span>
          </div>
          <div className="item">
            <img src={Groups} alt="" />
            <span>Nhóm</span>
          </div>
          <div className="item">
            <img src={Market} alt="" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={Games} alt="" />
            <span>Game</span>
          </div>

          <div className="item">
            <img src={Events} alt="" />
            <span>Sự kiện</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>

          <div className="item">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
