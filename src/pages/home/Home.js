import "./home.css";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function Home() {
  const { darkMode } = useContext(AuthContext);
  console.log(darkMode);
  return (
    <>
      <Topbar />
      <div className={darkMode ? "darkMode" : "homeContainer"}>
        {/* <div className="darkMode"> */}
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
