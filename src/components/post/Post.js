import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { FaRegThumbsUp, FaRegHeart, FaThumbsUp } from "react-icons/fa";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { API } from "../../backend";
import { isAuthenticated } from "../../apiCalls";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, darkMode } = useContext(AuthContext);
  const { accessToken } = isAuthenticated();
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/users?userId=${post.userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUser(res.data);
      console.log(user);
    };
    fetchUser();
  }, [post.userId]);

  // handle post likes
  const handleLike = () => {
    console.log(post);
    console.log(currentUser);
    try {
      axios.put(`http://localhost:8000/api/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleDeleteClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = (postId) => {
    try {
      axios.delete(`${API}posts/${postId}`, {
        body: {
          userId: user._id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.userName}`}>
              {user.profilePicture ? (
                <img
                  className="postProfileImg"
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "noprofile.png"
                  }
                  alt="profile image"
                />
              ) : (
                <Avatar />
              )}
            </Link>
            <span className="postUserName">{user.userName}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <IconButton
              onClick={handleDeleteClick}
              className={darkMode ? `darkMoreVert` : ``}
            >
              <MoreVert />
            </IconButton>
          </div>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                handleDeletePost(post._id);
              }}
            >
              Delete Post
            </MenuItem>
          </Menu>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.description}</span>
          <img className="postImg" src={PF + post?.image} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {isLiked ? (
              <FaThumbsUp
                onClick={handleLike}
                style={{ color: "#007FFF" }}
                className="likeIcon"
              />
            ) : (
              <FaRegThumbsUp
                onClick={handleLike}
                style={{ color: "#007FFF" }}
                className="likeIcon"
              />
            )}
            {/* <FaRegHeart style={{ color: "red" }} className="likeIcon" /> */}
            <span className="postLikeCounter">{like} people like it.</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
