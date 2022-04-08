import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits"

const AllTuits = () => {
    const [tuits, setTuits] = useState([]);
    const findTuits = () => {
        service.findAllTuits()
            .then(tuits => {
                setTuits(tuits);
            })
    }

    useEffect(() => {
        findTuits()
    }, []);

    return (
        <Tuits tuits={tuits} refreshTuits={findTuits}/>
    )
}

export default AllTuits;