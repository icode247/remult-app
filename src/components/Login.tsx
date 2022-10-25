import { useState } from "react";
const Login = (props: any) => {
    const { setCurrentUser } = props
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");

    const signIn = async () => {
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
        }
        else alert(await result.json());
    }
    return (
        <div className="main">
            <input type="checkbox" id="chk" aria-hidden="true" />

            <div className="signup">
                <form>
                    <label htmlFor="chk" aria-hidden="true">Sign up</label>
                    <input type="text" name="txt" placeholder="User name" />
                    <input type="email" name="email" placeholder="Email" />
                    <input type="password" name="pswd" placeholder="Password" />
                    <button>Sign up</button>
                </form>
            </div>

            <div className="login">
                <form>
                    <label htmlFor="chk" aria-hidden="true">Login</label>
                    <input type="email" name="email" placeholder="Email" />
                    <input type="password" name="pswd" placeholder="Password" />
                    <button>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login