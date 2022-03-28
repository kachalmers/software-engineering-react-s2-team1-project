import React from "react";
import './tuits.css';
import Tuit from "./tuit";
import * as likesService from "../../services/likes-service";
import * as dislikesService from "../../services/dislikes-service";
import * as service from "../../services/tuits-service";

const Tuits = ({tuits = [], refreshTuits}) => {
    const likeTuit = (tuit) =>
        likesService.userLikesTuit("me", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e));

    const dislikeTuit = (tuit) =>
        dislikesService.userDislikesTuit("me", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e));

    // Find whether user dislikes a tuit by retrieving the dislike of the tuit
    // by the user if it exists
    const findUserDislikesTuit = (tuit) =>
        dislikesService.findUserDislikesTuit("me", tuit._id)
            //.then(refreshTuits)
            .catch(e => alert(e));

    const deleteTuit = (tid) =>
        service.deleteTuit(tid)
            .then(refreshTuits);

    return (
        <div>
          <ul className="ttr-tuits list-group">
            {
              tuits.map && tuits.map(tuit =>
                  <Tuit key={tuit._id}
                        deleteTuit={deleteTuit}
                        likeTuit={likeTuit}
                        dislikeTuit={dislikeTuit}
                        findUserDislikesTuit={findUserDislikesTuit}
                        tuit={tuit}/>)
            }
          </ul>
        </div>
      );
}

export default Tuits;