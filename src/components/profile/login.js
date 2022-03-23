import React from "react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import * as service from "../../services/security-service";

export const Login = () => {
    const [loginUser, setLoginUser] = useState({});
    const navigate = useNavigate()
    const login = () =>
        service.login(loginUser)
            .then((user) => navigate('/profile/mytuits'))
            .catch(e => alert(e));
    return (
        <div>
            <h1>Login</h1>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setLoginUser({...loginUser, username: e.target.value})}
                   placeholder="username"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setLoginUser({...loginUser, password: e.target.value})}
                   placeholder="password" type="password"/>
            <button onClick={login}
                    className="btn btn-primary mb-5">Login
            </button>
        </div>
    );
};