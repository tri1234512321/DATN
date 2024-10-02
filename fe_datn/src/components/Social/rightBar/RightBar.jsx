import "./rightBar.scss";
import Chat from "../chat/Chat";
// import { AuthContext } from "../../context/authContext";
// import { useContext } from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import Close from "../../../assets/social/close-blue.png";
import Send from "../../../assets/social/send.png";
import Person from "../../../assets/social/person.png";
import { Buffer } from "buffer";
import { AuthContext } from "../../../context/authContext.js";
import { useContext,useEffect } from "react";
import {SocketContext} from "../../../context/socketContext.js";

const RightBar = () => {
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser["user"]);
  const [openChat, setOpenChat] = useState(false);
  const [chat, setChat] = useState([]);
  const socket = useContext(SocketContext);
  // console.log(chat)
  const [onlineUsers, setOnlineUsers] = useState([]);

  const { isLoading, error, data } = useQuery(["friends"], () =>
    makeRequest.get("/social/user/friends?idUser="+currentUser["user"].id).then((res) => {
      return res.data.item;
    })
  );
  console.log("fr: ",data);
  useEffect(() => {
    // socket.emit("addUser", currentUser?.user?.id);
    socket.on("getUsers", (users) => {
      console.log("online: ",users);
      setOnlineUsers(data?.filter((f) => users.some((u) => u.userId === f.id)));
      // console.log(users);
    });
  }, [data]);
  console.log("onlinefr: ",onlineUsers);
  
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
        <p className="px-[10px] mt-[10px] mb-[15px] font-semibold">Quán ăn nổi bật</p>
          <div className="user" onClick={() => setOpenChat(!openChat)}>
            <div className="userInfo">
              <img 
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              {/* <div className="online" /> */}
              <span>Jane Doe</span>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded w-[100px]">Theo dõi</button>
            </div>
          </div>
          <div className="user" onClick={() => setOpenChat(!openChat)}>
            <div className="userInfo">
              <img 
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              {/* <div className="online" /> */}
              <span>Jane Doe</span>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded w-[100px]">Theo dõi</button>
            </div>
          </div>
          <div className="user" onClick={() => setOpenChat(!openChat)}>
            <div className="userInfo">
              <img 
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              {/* <div className="online" /> */}
              <span>Jane Doe</span>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded w-[100px]">Theo dõi</button>
            </div>
          </div>
        </div>
        
        <hr/>
        <div className="item">
          <p className="px-[10px] mt-[10px] mb-[15px] font-semibold">Người liên hệ</p>
          {error
            ? ""
            : isLoading
            ? "loading"
            : onlineUsers?.map((friend) => (
                <div className="user" onClick={()=>setChat(chat.concat(friend))} key={friend.id}>
                  <div className="userInfo">
                    {friend.image
                      ? <img src={Buffer.from(
                                    friend.image,
                                    "base64"
                                    ).toString("binary")} alt=""/>
                      : <img src={Person} alt=""/>
                    }
                    <div className="online" />
                    <span>{friend.firstName}</span>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <div className="fixed right-[60px] bottom-[0px]">
        <div className="flex flex-row-reverse">
        {chat.map((user,index) => <div key={index}><Chat chat={chat} setChat = {setChat} user = {user} index={index}/></div>)}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
