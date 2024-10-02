import Stories from "../../../components/Social/stories/Stories"
import Posts from "../../../components/Social/posts/Posts"
import Share from "../../../components/Social/share/Share"
import LeftBar from "../../../components/Social/leftBar/LeftBar";
import RightBar from "../../../components/Social/rightBar/RightBar";
import HomeHeader from "../../../components/HomeHeader/HomeHeader";
import "./home.scss"

const Home = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{ flex: 6 }}>
          <div className="home">
            <Stories/>
            <Share/>
            <Posts/>
          </div>
        </div>
        <RightBar />
      </div>
    </div>
    
  )
}

export default Home