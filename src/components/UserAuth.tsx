import { useState } from "react";

const UserAuth = (props: any) => {
    const { setCurrentUser } = props
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUp = async (e: any) => {
        e.preventDefault();
        const result = await fetch('/api/signUp', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        if (result.ok) {
            setCurrentUser(await result.json());
            setEmail("");
            setPassword("")
        }
        else alert(await result.json());
    }

    const signIn = async (e: any) => {
        e.preventDefault();
        console.log('djddjd')
        const result = await fetch('/api/signIn', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (result.ok) {
            setCurrentUser(await result.json());
            setEmail("");
            setPassword("")
        }
        else alert(await result.json());
    }
    return (
        <div className="main">
            <input type="checkbox" id="chk" aria-hidden="true" />

            <div className="signup">
                <form onSubmit={signUp}>
                    <label htmlFor="chk" aria-hidden="true">Sign up</label>
                    <input type="text" name="txt" placeholder="User name" onChange={(e) => setName(e.target.value)} />
                    <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="pswd" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button>Sign up</button>
                </form>
            </div>

            <div className="login">
                <form onSubmit={signIn}>
                    <label htmlFor="chk" aria-hidden="true">Login</label>
                    <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="pswd" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button>Login</button>
                </form>
            </div>
        </div>
    )
}

export default UserAuth