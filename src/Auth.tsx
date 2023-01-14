import { useState, useEffect } from "react";
import UserAuth from "./components/UserAuth";
import { Todo } from "./server/shared/todo";
import { User } from "./server/shared/user";


const Auth: React.FC<{ children: JSX.Element }> = ({ children }) => {

    const [currentUser, setCurrentUser] = useState<User>();

    const signOut = async () => {
        await fetch('/api/signOut', {
            method: "POST"
        });
        setCurrentUser(undefined);
    }
    if (!currentUser)
        return (
            <UserAuth setCurrentUser={setCurrentUser} />
        )
    return <>
        <button onClick={signOut}>Sign Out</button>
        {children}
    </>
}
export default Auth;