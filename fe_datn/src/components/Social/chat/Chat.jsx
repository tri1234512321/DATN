import { useContext, useEffect, useRef, useState } from "react";
import { makeRequest } from "../axios";
import { AuthContext } from "../../../context/authContext";
// import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Close from "../../../assets/social/close-blue.png";
import Send from "../../../assets/social/send.png";
import Person from "../../../assets/social/person.png";
import { Buffer } from "buffer";
import {SocketContext} from "../../../context/socketContext";
import "./chat.scss";

const Chat = ({ chat, setChat, user , index}) => {
	const [content, setContent] = useState("");
  
	const { currentUser } = useContext(AuthContext);
	// console.log(currentUser);
	// const senderUserId = currentUser.id;
  const access_token = localStorage.getItem("access_token");
	const idReceivedUser = user.id;
	const socket = useContext(SocketContext);
  const [arrivalMessage, setArrivalMessage] = useState(null);
	const scrollRef = useRef();
	const queryClient = useQueryClient();
  

	useEffect(() => {
    // socket = io("ws://localhost:8900");
    socket.on("getMessage", (data) => {
			console.log(data);
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
			queryClient.invalidateQueries(["chats"]);
    });		
  }, []);

	const { isLoading, error, data } = useQuery(["chats"], () =>
    makeRequest.get("/social/chats", {
      params: { idReceivedUser: idReceivedUser, access_token: access_token },
    }).then((res) => {
      return res.data.item;
    })
  );
	

  const mutation = useMutation(
    (newChat) => {
      return makeRequest.post("/social/chats", newChat);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["chats"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
		await mutation.mutate({ content, access_token, idReceivedUser });

		await socket.emit("sendMessage", {
      senderId: currentUser.user.id,
      receiverId: idReceivedUser,
      text: content,
    });
    
    setContent("");
  };

	useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

	return (
		<div className=" w-[258px] h-[355px] z-[100] bg-[#f9f9f9] 
									rounded-[3%] shadow-[0px_0px_25px_-10px_rgba(0,0,0,0.38)] border-[#e7e7e7] border-solid border">
			<div className="h-[40px] border-b-[#e7e7e7] border-b-solid border-b">
				<div className="user">
					{user.image
						? <img src={Buffer.from(
              user.image,
              "base64"
              ).toString("binary")} alt=""/>
						: <img src={Person} alt=""/>
					}
					<span>{user.name}</span>
					<button className="close-chat-btn ml-auto mr-[5px] rounded-[50%] hover:bg-[#ededed]" onClick={() => setChat(chat.slice(0,index).concat(chat.slice(index+1,chat.length)))}>
						<img  src={Close} alt="" />
					</button>
					
				</div>
			</div>
			<hr/>
			<div className="overflow-scroll w-full h-[285px] text-[12px] relative py-[10px] px-[5px]">
				{error
					? ""
					: isLoading
					? "loading"
					: data.map((chat,i) => (
							<div key={index*1000+i} ref={scrollRef}>
								{
									chat.idSendedUser===user.id
										? <div className="bg-[#e0e0e0] rounded-[15px] w-fit py-[5px] px-[8px] relative left-[5px] max-w-[70%] mb-[5px]">
												<p className="my-[2px]"> {chat.content} </p>
											</div>
										: <div className="flex w-full justify-end">
												<div className="bg-[#4f87ff] rounded-[15px] text-white w-fit py-[5px] px-[8px] max-w-[70%] mb-[5px]">
													<p className="text-[white] my-[2px]"> {chat.content} </p>
												</div>
											</div>
								}
							</div>
						))}
			</div>
			<form onSubmit={handleClick} className="bg-[#f1f1f1] h-[45px] w-full absolute bottom-0 flex pl-[10px] mr-[5px]">
				<input className="w-[85%] h-[30px] self-center rounded-[10px] bg-[#e4e4e4] shadow py-2 px-3 text-black text-[12px] focus:outline-none"
					type="text"
					placeholder={"Aa"}
					onChange={(e) => setContent(e.target.value)}
					value={content}
				/>
				<button type="submit" className="ml-auto mr-[5px] rounded-[50%] hover:bg-[#e9e9e9] w-[30px] h-[30px] self-center" >
					<img src={Send} alt=""  className="w-[20px] h-[20px] mx-auto"/>
				</button>
			</form>

		</div>
	);
};

export default Chat;