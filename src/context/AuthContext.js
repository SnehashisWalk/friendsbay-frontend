import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  // user: {
  //   profilePicture: "/person/profile1.jpg",
  //   coverPicture: "",
  //   followers: [],
  //   followings: ["6084fb4c6a7a9045d810200f"],
  //   isAdmin: false,
  //   _id: "6084fb446a7a9045d810200e",
  //   userName: "John",
  //   email: "john@gmail.com",
  //   createdAt: "2021-04-25T05:16:52.018Z",
  //   __v: 0,
  //   city: "New York",
  //   description: "Updated description.",
  //   from: "New York",
  //   relationship: 1,
  // },
  user: null,
  isFetching: false,
  error: false,
  darkMode: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        darkMode: state.darkMode,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
