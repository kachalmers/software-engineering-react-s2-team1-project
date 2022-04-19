import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service"
import {Link, useParams} from "react-router-dom";
import Tuit from "./tuit";
import {updateTuit} from "../../services/tuits-service";

const TuitScreen = () => {
    const [tuit, setTuit] = useState({});
    const {tid} = useParams();
    const findTuitById = () =>
        service.findTuitById(tid)
            .then(tuit => setTuit(tuit));
    useEffect(findTuitById, []);
    return(
        <div>
            <textarea />
            <Tuit tuit={tuit}/>
            <i onClick = {()=>updateTuit(tid, tuit)}
                className = "float-end tuit-button me-1">
                Update
            </i>
            <Link to={`/`}>
                <i className="float-end tuit-button me-1"> Cancel </i>
            </Link>
        </div>
    );
};
export default TuitScreen;