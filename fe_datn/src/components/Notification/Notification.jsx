import { Buffer } from "buffer";
import {makeRequest} from "../Social/axios";
import { useQuery } from "@tanstack/react-query";
import Person from "../../assets/social/person.png";
import moment from "moment";
import "./Notification.scss";

const Notification = ({idReceivedUser}) => {
  const { isLoading, error, data:notifications =[]} = useQuery(['notifications',idReceivedUser], async () => {
    const res = await makeRequest.get("/notifications",{params:{idReceivedUser}});
    return res.data.item || [];
    }
  );
  // console.log(notifications,idReceivedUser);
  return (
    <div className="notifications">
      <p className="text-xl font-bold text-black">THÔNG BÁO</p>
      {/* {notifications?.map( (noti) => 
        <span className="notification" key={noti.id}>{`${noti.idReceivedUser} ${noti.content}.`}</span>
      )} */}
      {error
        ? ""
        : isLoading
        ? "loading"
        : notifications?.map((noti) => (
            <div className="users" key={noti.id}>
              <div className="userInfo">
                {noti.image
                  ? <img src={Buffer.from(
                                noti.image,
                                "base64"
                                ).toString("binary")} alt=""/>
                  : <img src={Person} alt=""/>
                }
                <div>
                  <span>{`${noti.firstName} ${noti.content}.`}</span>
                  <p className="date">{moment(noti.createdAt).fromNow()}</p>
                </div>
              </div>
            </div>
              ))}
    </div>
  )
}

export default Notification;