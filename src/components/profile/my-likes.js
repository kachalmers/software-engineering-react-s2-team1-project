import Tuits from "../tuits";
import * as service from "../../services/likes-service";
import {useEffect, useState} from "react";

const MyLikes = () => {
    // Store likedTuits as state. Set likedTuits with setLikedTuits
    const [likedTuits, setLikedTuits] = useState([]);

    // Find tuits I like
    const findTuitsILike = () =>
        service.findAllTuitsLikedByUser("me")
            // then, set likedTuits to list of tuits I liked
            .then((tuits) => setLikedTuits(tuits));

    // Call findTuitsILike once whenever anything on the page changes
    useEffect(findTuitsILike, []);
    
    return(
        <div>
            <Tuits tuits={likedTuits} refreshTuits={findTuitsILike}/>
        </div>
    );
};
export default MyLikes;