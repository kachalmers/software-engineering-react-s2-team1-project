import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits";

const MyTuits = () => {
    const [tuits, setTuits] = useState([]);
    const findMyTuits = () =>
        service.findTuitByUser("my")
            .then(tuits => setTuits(tuits));
    useEffect(findMyTuits, []);
    return(
        <Tuits tuits={tuits}
               refreshTuits={findMyTuits}/>
    );
};

export default MyTuits;