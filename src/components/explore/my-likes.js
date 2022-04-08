import Tuits from "../tuits";
import * as service from '../../services/likes-service'
import {useEffect, useState} from "react";

/**
 * Implements MyLikes Component for displaying all tuits liked by
 * logged-in user.
 * @returns {JSX.Element}
 */
const MyLikes = () => {
    // Maintain the state of liked tuits
    const [likedTuits, setLikedTuits] = useState([]);

    // Find tuits liked by "me"
    const findTuitsILike = () => {
        service.findAllTuitsLikedByUser("me")
            .then((tuits) => {
                console.log(tuits);
                setLikedTuits(tuits)
            })
    }

    useEffect(()=> {
        findTuitsILike()
    }, []);

    return (
        <div>
            <Tuits tuits={likedTuits} refreshTuits={findTuitsILike}/>
        </div>
    )
}

export default MyLikes;