import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service"
import {Link, useParams} from "react-router-dom";
import Tuit from "./tuit";
import {updateTuit} from "../../services/tuits-service";

const TuitScreen = () => {
    const [tuit, setTuit] = useState({});
    const [newTuit, setNewTuit] = useState('');
    const {tid} = useParams();
    const findCurrentTuit = () =>
        service.findTuitById(tid)
            .then(tuit => setTuit(tuit));
    useEffect(findCurrentTuit, []);
    return(
        <div>

            <input className="bg-secondary bg-opacity-10 border-0 form-control form-control-lg rounded-pill ps-5"
                   placeholder = {tuit.tuit}
                value = {newTuit}
                   onChange={(event)=>
                       setNewTuit(event.target.value)}/>

            <button onClick = {()=>updateTuit(tid, newTuit)}
                className = "float-end tuit-button me-1">
                Update
            </button>
            <Link to={`/home`}>
                <button className="float-end tuit-button me-1"> Cancel </button>
            </Link>
        </div>
    );
};
export default TuitScreen;