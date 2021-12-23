import { useEffect, useState, useContext } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ userName }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = userName
        ? await axios.get("http://localhost:8000/api/posts/profile/" + userName)
        : await axios.get(
            "http://localhost:8000/api/posts/timeline/" + user._id
          );

      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [userName, user]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!userName || userName === user.userName) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
