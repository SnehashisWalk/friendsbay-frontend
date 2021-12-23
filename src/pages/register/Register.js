import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";

export default function Register() {
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirm = useRef();
  const history = useHistory();

  const handleClick = async (event) => {
    event.preventDefault();
    if (password.current.value !== passwordConfirm.current.value) {
      passwordConfirm.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        userName: userName.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("http://localhost:8000/api/auth/register", user);
        history.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Friends Bay</h3>
          <span className="loginDesc">
            Connect with your friends all over the globe.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Name"
              ref={userName}
              type="text"
              className="loginInput"
              required
            />
            <input
              placeholder="Email"
              ref={email}
              type="email"
              className="loginInput"
              required
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              ref={password}
              required
              minLength="6"
            />
            <input
              placeholder="Confirm Password"
              type="password"
              className="loginInput"
              ref={passwordConfirm}
              required
              minLength="6"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton">
              Log into your account.
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
