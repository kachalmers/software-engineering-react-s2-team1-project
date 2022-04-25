import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service"
import {Link, useParams} from "react-router-dom";
import Tuit from "./tuit";
import {updateTuit} from "../../services/tuits-service";

const TuitScreen = () => {
    const [tuit, setTuit] = useState({});
    const [newTuitString, setNewTuitString] = useState('');
    const {tid} = useParams();
    const findCurrentTuit = () =>
        service.findTuitById(tid)
            .then(tuit => setTuit(tuit));
    useEffect(findCurrentTuit, []);
    return(
        <div>

            <h4>Old Tuit:</h4>
            <a>{tuit.tuit}</a>

            <br/>
            <br/>

            <h4>New Tuit:</h4>
            <input className="bg-secondary bg-opacity-10 border-0 form-control form-control-lg rounded-pill ps-5"
                   placeholder = {tuit.tuit}
                value = {newTuitString}
                   onChange={(event) =>
                       setNewTuitString(event.target.value)}/>

            <button onClick = {()=>updateTuit(tid, {...tuit, tuit: newTuitString})}
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