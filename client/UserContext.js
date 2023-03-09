import { createContext } from "react";

const UserContext = createContext({
  username: "",
  setUsername: () => {},
  password: "",
  setPassword: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userId: 1,
  setUserId: () => {},
});

export default UserContext;
