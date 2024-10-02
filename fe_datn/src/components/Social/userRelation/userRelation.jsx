import { useContext } from "react";
import "./userRelation.scss";
import { AuthContext } from "../../../context/authContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../axios";
// import AddStory from "../../components/addStory/AddStory";
import { useState } from "react";
import Person from "../../../assets/social/person.png";
import { Buffer } from "buffer";

const UserRelation = ({user}) => {
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser)
  const access_token = localStorage.getItem("access_token");
  const queryClient = useQueryClient();


  const { isLoading, error, data } = useQuery(["relations"], () =>
    // makeRequest.get("/getRelation",{params:{idUser:Number(currentUser.user.id),idRelationUser:Number(user.id)}}).then((res) => {
    makeRequest.get("/getRelation",{params:{idUser:currentUser.user.id,idRelationUser:Number(user.id)}}).then((res) => {
      return res.data.item;
    })
  );
  console.log(currentUser.user.id,user.id,data);

  const friendMutation = useMutation(
    () => {
      return makeRequest.post("/social/requests", { access_token: access_token,  idRequestedUser:user.id});
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["requests"]);
        queryClient.invalidateQueries(["relations"]);
      },
    }
  );

  const followMutation = useMutation(
    () => {
      return makeRequest.post("/social/follows", { access_token: access_token,  idFollowedUser:user.id});
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["follows"]);
        queryClient.invalidateQueries(["relations"]);
      },
    }
  );

  const deleteFriendMutation = useMutation(
    () => {
      return makeRequest.delete("/social/friends/"+data.idFriend);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["friends"]);
        queryClient.invalidateQueries(["relations"]);
      },
    }
  );

  const deleteFollowMutation = useMutation(
    () => {
      return makeRequest.delete("/social/follows/" + data.idFollow);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["follows"]);
        queryClient.invalidateQueries(["relations"]);
      },
    }
  );

  const handleMakeFiend = () => {
    friendMutation.mutate();
    // window.location.reload()
  };

  const handleMakeFollow = () => {
    followMutation.mutate();
    // window.location.reload()
  };

  const handleDeleteFriend = () => {
    deleteFriendMutation.mutate();
  };

  const handleDeleteFollow = () => {
    deleteFollowMutation.mutate();
  };


  return (
    <div className="friendRequest" key={user.id}>
      { user.image
        ? <img className="w-[170px] h-[170px]" src={Buffer.from(
                                                      user.image,
                                                      "base64"
                                                      ).toString("binary")} alt="" />
        : <img className="w-[170px] h-[170px]" src={Person} alt="" />
      }
      <div className="px-[8px] py-[5px]">
        <p className="text-slate-950 font-[600] py-[8px]">{user.firstName}</p>
        {data?.isFollow 
          ?<button onClick={handleDeleteFollow} className="bg-[#d9d9d9] hover:bg-[#d0d0d0] text-black font-semibold py-1 px-4 rounded w-full mb-[5px]">Bỏ theo dõi</button>
          :<button onClick={handleMakeFollow} className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-4 rounded w-full mb-[5px]">Theo dõi</button>
        }
        {data?.isFriend
          ?<button onClick={handleDeleteFriend} className="bg-red-400 hover:bg-red-500 text-white font-medium py-1 px-4 rounded w-full mb-[5px]">Hủy kết bạn</button>
          :<button onClick={handleMakeFiend} className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-4 rounded w-full mb-[5px]">Kết bạn</button>
        }
        </div>
    </div>
  );
};

export default UserRelation;
