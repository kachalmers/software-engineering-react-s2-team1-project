/**
 * @file Implements Tuits component to display a list of tuits
 */
import React, {useEffect, useState} from "react";
import './tuits.css';
import Tuit from "./tuit";
import * as likeService from "../../services/likes-service";
import * as dislikeService from "../../services/dislikes-service";
import * as tuitService from '../../services/tuits-service';
import * as authService from "../../services/auth-service";
import * as followService from "../../services/follows-service";

const Tuits = ({tuits = [], refreshTuits}) => {
    const [profile, setProfile] = useState(undefined);
    useEffect(async ()=> {
        try {
            const user = await authService.profile();
            if (user) {
                setProfile(user);
            }
        } catch (e) {
        }
    }, []);

    /**
     * Toggle likes of a tuit using the API.
     * @param tuit Tuit with likes to be toggled
     */
    const toggleLikes = (tuit) => {
        if (profile !== undefined) {
            likeService.userTogglesTuitLikes("me", tuit._id)
                .then(refreshTuits)
                .catch(e => alert(e));
        } else {
            alert("Log in to like tuits!")
        }
    }

    /**
     * Toggle dislikes of a tuit using the API.
     * @param tuit Tuit with dislikes to be toggled
     */
    const toggleDislikes = (tuit) => {
        if (profile !== undefined) {
            dislikeService.userTogglesTuitDislikes("me", tuit._id)
                .then(refreshTuits)
                .catch(e => alert(e));
        } else {
            alert("Log in to dislike tuits!")
        }
    }

    /**
     * Delete tuit using API.
     * @param tid Primary key of tuit
     */
    const deleteTuit = (tid) =>
        tuitService.deleteTuit(tid)
            .then(refreshTuits);

    /**
     * Toggle follow of a tuit author using the API.
     * @param tuit Tuit with author to be followed/unfollowed
     */
    const toggleFollow = (tuit) => {
        if (profile !== undefined) {
            followService.userTogglesFollow("me", tuit.postedBy)
                .then(refreshTuits)
                .catch(e => alert(e));
        } else {
            alert("Log in to follow users!")
        }
    }

    /**
     * Modify tuit using API.
     * @param tid Primary Key of tuit
     * @param newTuit New String for Tuit
     */
    const updateTuit = (tid, newTuit) =>
        tuitService.updateTuit(tid, newTuit)
            .then(refreshTuits);

    return (
    <div>
      <ul className="ttr-tuits list-group">
        {
          tuits.map && tuits.map(tuit => {
            return (
              <Tuit key={tuit._id}
                    deleteTuit={deleteTuit}
                    toggleLikes={toggleLikes}
                    toggleDislikes={toggleDislikes}
                    toggleFollow={toggleFollow}
                    updateTuit={updateTuit}
                    tuit={tuit}/>
            );
          })
        }
      </ul>
    </div>
  );
}

export default Tuits;