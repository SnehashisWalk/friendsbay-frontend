import axios from "axios";
import { API } from "./backend";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({
    type: "LOGIN_START",
  });
  try {
    const res = await axios.post(API + "auth/login", userCredential);
    authenticate(res.data);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: error,
    });
  }
};

export const authenticate = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  if (localStorage.getItem("jwt"))
    return JSON.parse(localStorage.getItem("jwt"));
  return false;
};

export const logout = () => {
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
  }
};
