import React, { useContext, useState } from "react";
import "./topbar.css";
import {
  Person,
  Search,
  Chat,
  Notifications,
  MoreVert,
  Brightness4,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Button, Menu, MenuItem, Switch } from "@material-ui/core";
import { logout } from "../../apiCalls";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDarkMode = () => {
    dispatch({ type: "DARKMODE" });
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Friends Bay</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for a friend, post or video."
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user?.userName}`}>
          <img
            className="topbarImg"
            src={
              user?.profilePicture
                ? PF + user.profilePicture
                : PF + "noprofile.png"
            }
            alt="profile image"
          />
        </Link>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>
            <Brightness4 />
          </span>
          <Switch onChange={handleDarkMode} />
        </div>
        <div>
          <Button onClick={handleClick}>
            <MoreVert />
          </Button>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                logout();
                window.location.replace("/");
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
