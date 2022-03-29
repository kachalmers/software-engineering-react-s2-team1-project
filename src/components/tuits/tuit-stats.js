import React from "react";
import * as likesService from "../../services/likes-service";
import * as dislikesService from "../../services/dislikes-service";
import { useState, useEffect } from "react";

const TuitStats = ({tuit, likeTuit = () => {}, dislikeTuit = () => {}}) => {

    const [userLikesTuitJson, setUserLikesTuitJson] = useState({});
    useEffect(() => {
        likesService.findUserLikesTuit("me", tuit._id)
            .then(value => setUserLikesTuitJson(value));
    }, [tuit]);

    // Create use state for whether logged-in user dislikes tuits
    const [userDislikesTuitJson, setUserDislikesTuitJson] = useState({});

    // Create use state for whether logged-in user dislikes tuits
    useEffect(() => {
        // Find the dislike of a tuit by a user, if it exists
        dislikesService.findUserDislikesTuit("me", tuit._id)
            // Then, set userDislikesTuitJson to retrieved dislike
            .then(value => setUserDislikesTuitJson(value));
    }, [tuit]);

    return (
      <div className="row mt-2">
        <div className="col">
          <i className="far fa-message me-1"></i>
          {tuit.stats && tuit.stats.replies}
        </div>
        <div className="col">
          <i className="far fa-retweet me-1"></i>
          {tuit.stats && tuit.stats.retuits}
        </div>
        <div className="col">
            <span onClick={() => likeTuit(tuit)}>
              {
                  tuit.stats && tuit.stats.likes > 0 &&
                  userLikesTuitJson &&
                  (userLikesTuitJson.tuit !== null) &&
                  (JSON.stringify(userLikesTuitJson) !== '{}') &&
                  <i className="fas fa-thumbs-up me-1" style={{color: 'blue'}}></i>
              }
              {
                  // If user doesn't like tuit yet or likes count <= 0
                  tuit.stats && (userLikesTuitJson === null
                                 || JSON.stringify(userLikesTuitJson) === '{}'
                                 || tuit.stats.likes <= 0) &&
                  <i className="far fa-thumbs-up me-1"></i>
              }
            {tuit.stats && tuit.stats.likes}
          </span>
        </div>
        <div className="col">
          <span onClick={() => dislikeTuit(tuit)}>
              {
                  // If tuit has dislikes and logged-in user likes tuit...
                  tuit.stats && tuit.stats.dislikes > 0 &&
                  userDislikesTuitJson &&
                  (userDislikesTuitJson.tuit !== null) &&
                  (JSON.stringify(userDislikesTuitJson) !== '{}') &&
                  // Show solid thumbs-down icon
                  <i className="fas fa-thumbs-down me-1" style={{color: 'blue'}}></i>
              }
              {
                  // If user doesn't dislike tuit yet or dislikes count <= 0
                  tuit.stats && (userDislikesTuitJson === null
                                 || JSON.stringify(userDislikesTuitJson) === '{}'
                                 || tuit.stats.dislikes <= 0) &&

                  // Show unfilled thumbs-down icon
                  <i className="far fa-thumbs-down me-1"></i>
              }
              {tuit.stats && tuit.stats.dislikes}
          </span>
        </div>
        <div className="col">
          <i className="far fa-inbox-out"></i>
        </div>
      </div>
    );
}
export default TuitStats;