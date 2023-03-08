import { createContext } from 'react';

const UserContext = createContext({
  username: '',
  setUsername: () => {},
  password: '',
  setPassword: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export default UserContext;
