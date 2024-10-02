import Friends from "../../../components/Social/friends/Friends"
import FriendRequests from "../../../components/Social/friendRequests/FriendRequests"
import LeftBar from "../../../components/Social/leftBar/LeftBar";
import RightBar from "../../../components/Social/rightBar/RightBar";
import "./friend.scss"
import FindUsers from "../../../components/Social/findUser/findUser";
import Recomment from "../../../components/Social/recomment/Recomment";

const Home = () => {
  return (
    <div style={{ display: "flex" }}>
      <LeftBar />
      <div style={{ flex: 6 }}>
        <div className="home">
          <FindUsers/>
          <Recomment/>
          <FriendRequests/>
          <Friends/>
        </div>
      </div>
      <RightBar />
    </div>
    
  )
}

export default Home