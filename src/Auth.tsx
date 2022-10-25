import { useEffect, useState } from "react";
import { UserInfo } from "remult";
import Login from "./components/Login";

const Auth: React.FC<{ children: JSX.Element }> = ({ children }) => {
    
    const [currentUser, setCurrentUser] = useState<UserInfo>();

    
    const signOut = async () => {
        await fetch('/api/signOut', {
            method: "POST"
        });
        setCurrentUser(undefined);
    }
    useEffect(() => {
        fetch('/api/currentUser').then(r => r.json())
            .then(async currentUserFromServer => {
                setCurrentUser(currentUserFromServer)
            });
    }, []);

    if (!currentUser)
        return (
            <Login  setCurrentUser= {setCurrentUser}/>
        )
    return <>
    
        <button onClick={signOut}>Sign Out</button>
        {children}
    </>
}
export default Auth;