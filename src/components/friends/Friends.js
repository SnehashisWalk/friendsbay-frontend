import "./friends.css";

export default function Friends({ user }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <img
        className="sidebarFriendImg"
        src={PUBLIC_FOLDER + user.profilePicture}
        alt="friend"
      />
      <span className="sidebarFriendName">{user.userName}</span>
    </li>
  );
}
