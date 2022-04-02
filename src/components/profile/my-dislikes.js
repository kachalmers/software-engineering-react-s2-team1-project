/**
 * @file Implements MyDislikes Component for displaying tuits disliked by user.
 */
import Tuits from "../tuits";
import * as service from "../../services/dislikes-service"
import {useEffect, useState} from "react";

/**
 * Implements MyDislikes Component for displaying all tuits disliked by
 * logged-in user.
 * @returns {JSX.Element}
 */
const MyDislikes = () => {
    // Maintain the state of disliked tuits
    const [dislikedTuits, setDislikedTuits] = useState([]);

    // Find tuits disliked by "me"
    const findTuitsIDislike = () => {
        service.findAllTuitsDislikedByUser("me")
            .then((tuits) => {
                setDislikedTuits(tuits);
            })
    }

    useEffect(() => {
        findTuitsIDislike()
    }, [])

    return (
        <div>
            <Tuits tuits={dislikedTuits} refreshTuits={findTuitsIDislike}/>
        </div>
    )
}

export default MyDislikes