import React, {useState} from "react";
import {useHistory} from "react-router-dom";


const LoginScreen = props => {
    let history = useHistory()
    const [user, setUser] = useState({
        user_id: "",
        password: ""
    })

    const onUserNameChange = event => {
        const username_changed = event.target.value;
        setUser(prevState => {
            return {...prevState, user_id: username_changed}
        });
    }

    const onPasswordChange = event => {
        const password_changed = event.target.value;
        setUser(prevState => {
            return {...prevState, password: password_changed}
        });
    }

    const handleLogin = async event => {
        event.preventDefault();
        let id
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user.user_id,
                    password: user.password
                })
            });
            const responseData = await response.json()
            console.log(responseData)
            if (response.ok) {
                redirectToMain()
            }
        } catch (e) {
            window.alert("Invalid Login")
        }

    }
    const redirectToMain = () => {
        props.onLoginSucess(user.user_id)
        history.push('/main')
    }


    return (
        <div id="Login-Screen" className="w3-panel w3-card w3-light-green full-width">
            <form onSubmit={handleLogin}>
                <div className="w3-container w3-row w3-section">
                    <div className="w3-container w3-col s4">
                        <label className="w3-text-white"><b>Username</b></label>
                    </div>
                    <div className="w3-rest">
                        <input name="username" className="w3-input" type="text" required onChange={onUserNameChange}
                               value={user.user_id}
                        />
                    </div>
                </div>
                <div className="w3-container w3-row w3-section">
                    <div className="w3-container w3-col s4">
                        <label className="w3-text-white"><b>Password</b></label>
                    </div>
                    <div className="w3-rest">
                        <input name="password" className="w3-input" type="password" required
                               onChange={onPasswordChange}
                               value={user.password}
                        />
                    </div>
                </div>
                <div className="w3-container w3-row w3-section">
                    <div className="w3-container w3-row w3-section">
                        <input type="submit" id="Login-Submit" className="w3-button w3-lime w3-text-white"
                               value="Log in"/>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default LoginScreen