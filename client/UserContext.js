import { createContext } from "react";

const UserContext = createContext({
  username: "",
  setUsername: () => {},
  password: "",
  setPassword: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userId: "",
  setUserId: () => {},
  boardId: "",
  setBoardId: () => {},
});

export default UserContext;
