import React from "react";
import * as likesService from "../../services/likes-service";

const TuitStats = ({tuit, likeTuit = () => {}}) => {
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
                  // If I've liked the tuit
                  tuit.stats && tuit.stats.likes > 0 &&
                  likesService.userLikesTuit("me", tuit._id) &&
                  <i className="fas fa-thumbs-up me-1" style={{color: 'blue'}}></i>
              }
              {
                  tuit.stats && //tuit.stats.likes <= 0 &&
                  !(likesService.userLikesTuit("me", tuit._id)) &&
                  <i className="far fa-thumbs-up me-1"></i>
              }
            {tuit.stats && tuit.stats.likes}
          </span>
        </div>
        <div className="col">
          <i className="far fa-inbox-out"></i>
        </div>
      </div>
    );
}
export default TuitStats;