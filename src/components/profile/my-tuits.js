import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits";

<<<<<<< HEAD
const MyTuits = () => { // render tuits by currently logged in user
    const [tuits, setTuits] = useState([]); // state variable holding my tuits
    const findMyTuits = () =>   // function to retrieve my tuits
        service.findTuitByUser("my")    // from RESTful API
            .then(tuits => setTuits(tuits));    // and update local state
    useEffect(findMyTuits, []); // on load invoke findMyTuits
=======
const MyTuits = () => {
    const [tuits, setTuits] = useState([]);
    const findMyTuits = () =>
        service.findTuitByUser("me")
            .then(tuits => setTuits(tuits));
    //useEffect(findMyTuits, []);
    useEffect(() => {
        findMyTuits();
        return () => {
            setTuits({});
        };
    }, []);
>>>>>>> dislikes-button
    return(
        <Tuits tuits={tuits}    // render my tuits
               refreshTuits={findMyTuits}/>
    );
};

export default MyTuits;