import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider({children}) {
    const [accessToken, setAccessToken] = useState(null);

    useEffect(()=>{

        if(localStorage.getItem("accessToken")){
            setAccessToken(localStorage.getItem("accessToken"))
        }
    },[])

    return (
        <UserContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </UserContext.Provider>
    );
}
