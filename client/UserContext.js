/* tried useContext()

import React, { useContext, useState, createContext } from 'react';

export const UserContext = React.createContext();

function UserProvider({ children }) {
  const [ signUpToggle, setSignUpToggle ] = useState(true);
  const [ user, setUser ] = useState("");
  const [ password, setPassword ] = useState("")

  return (
    <UserContext.Provider value={[signUpToggle, setSignUpToggle]}>
      <UserContext.Provider value={[ user, setUser ]}>
        <UserContext.Provider value={[ password, setPassword ]}>
        {children}
         </UserContext.Provider>
      </UserContext.Provider>
    </UserContext.Provider>
  )
}

export default UserProvider;

*/
