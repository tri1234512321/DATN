import { AuthContext } from "../../context/authContext";
import Notification from "../Notification/Notification.jsx";
import {faBell} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import { useContext, useEffect, useRef, useState } from "react";
import {SocketContext} from "../../context/socketContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "./Notifications.scss";

const Notifications = ({idReceivedUser}) => {
  const [notifs,setNotifs] = useState(0);
  const [notification,setNotification] = useState(0);
  const { currentUser } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.emit("addUser", currentUser?.user?.id);
  }, []);

  useEffect(() => {
    // socket = io("ws://localhost:8900");
    socket.on("getNotification", async (data) => {
			console.log(data);
      await setNotifs(notifs+1);
			queryClient.invalidateQueries(["notifications"]);
    });		
  }, []);

  const navigateBell = () => {
    setNotification(!notification);
    setNotifs(0);
    console.log("navigateBell",notification);
  };
  const item = {
    icon: faBell,
    func: navigateBell,
    value: notifs,
  }
  return (
    <>
      <div className="right-item-header m-3 w-fit">
        <Button
          aria-controls={item.hover ? "simple-menu" : undefined}
          aria-haspopup={item.hover ? "true" : undefined}
          onMouseEnter={
            item.hover ? this.handleHover : undefined
          }
          onClick={item.func ? item.func : undefined}
          className="w-fit"
        >
          <FontAwesomeIcon
            size="2x"
            icon={item.icon}
            className={`icon-right-header text-[#f63635]`}
          />
          <div className="right-items-value">
            {item.value || 0}
          </div>
        </Button>
      </div>
      { notification ? <Notification idReceivedUser={currentUser.user.id}/> :<></>}
    </>
  )}

export default Notifications;
