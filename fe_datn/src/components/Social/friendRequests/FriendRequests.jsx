import { useContext } from "react";
import "./friendRequests.scss";
import { AuthContext } from "../../../context/authContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../axios";
// import AddStory from "../../components/addStory/AddStory";
import { useState } from "react";
import Person from "../../../assets/social/person.png";
import { Buffer } from "buffer";

const FriendRequests = () => {
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser)
  const access_token = localStorage.getItem("access_token");

  const { isLoading, error, data } = useQuery(["requests"], () =>
    makeRequest.get("/social/user/requests?idUser="+currentUser["user"].id).then((res) => {
      return res.data.item;
    })
  );
  // console.log(data);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.post("/social/friends", { access_token: access_token,  idFriendUser:user.id});
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["friends"]);
      },
    }
  );

  const deleteMutation = useMutation(
    (user) => {
      return makeRequest.delete("/social/requests/" + user.requestId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["requests"]);
      },
    }
  );

  const handleAccept = (request) => {
    mutation.mutate(request);
    deleteMutation.mutate(request);
    // window.location.reload()
  };

  const handleDelete = (request) => {
    deleteMutation.mutate(request);
  };

  //TODO Add story using react-query mutations and use upload function.

  return (
    <div className="pt-[10px]">
      <p className="font-bold mb-[15px]">Lời mời kết bạn</p>
      <div className="flex flex-wrap gap-4 mb-[25px]">
        {error
          ? ""
          : isLoading
          ? "loading"
          : data.map((user,index) => (
              <div className="friendRequest" key={index}>
                { user.image
                  ? <img className="w-[170px] h-[170px]" src={Buffer.from(
                                                                user.image,
                                                                "base64"
                                                                ).toString("binary")} alt="" />
                  : <img className="w-[170px] h-[170px]" src={Person} alt="" />
                }
                <div className="px-[8px] py-[5px]">
                  <p className="text-slate-950 font-[600] py-[8px]">{user.firstName}</p>
                  <button onClick={()=>handleAccept(user)} className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-4 rounded w-full mb-[5px]">Xác nhận</button>
                  <button onClick={()=>handleDelete(user)} className="bg-[#d9d9d9] hover:bg-[#d0d0d0] text-black font-semibold py-1 px-4 rounded w-full">Từ chối</button>
                </div>
              </div>
            ))}
      </div>
      <hr/>
    </div>
  );
};

export default FriendRequests;
