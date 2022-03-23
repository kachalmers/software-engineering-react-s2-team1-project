import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as service from "../../services/users-service";
import * as security from "../../services/security-service";
import React from "react";
import {UserList} from "./user-list";

export const Login = () => {
    const [loginUser, setLoginUser] = useState({});
  const [existingUsers, setExistingUsers] = useState([]);
  const [newUser, setNewUser] = useState({});
  const navigate = useNavigate()
    const login = () =>
        security.login(loginUser)
            .then((user) => navigate('/profile'))
            .catch(e => alert(e));

  const deleteUser = (uid) =>
    service.deleteUser(uid)
      .then(findAllUsers)
  const findAllUsers = () =>
    service.findAllUsers()
      .then(users => {
        setExistingUsers(users)
      })
  const register = () =>
    service.createUser(newUser)
      .then(findAllUsers);
  useEffect(findAllUsers, []);
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
      <button onClick={login} className="btn btn-primary mb-5">Login</button>

      <h1>Login As</h1>

      <UserList users={existingUsers} deleteUser={deleteUser}/>

    </div>
  );
};