/**
 * @file Implements TuitStats component for displaying tuit stats
 */
import React from "react";

/**
 * TuitStats component that will display tuit stats.
 * @param tuit Tuit
 * @param toggleLikes callback function for toggling likes of a tuit
 * @param toggleDislikes callback function for toggling dislikes of a tuit
 */
const TuitStats = ({tuit, toggleLikes, toggleDislikes}) => {
    return (
        <div className="row mt-2">
            <div className="col">
                <i className="far fa-message me-1"></i>
                {
                    tuit.stats &&
                    <span className='ttr-stats-replies'>{tuit.stats.replies}</span>
                }
            </div>
            <div className="col">
                <i className="far fa-retweet me-1"></i>
                {
                    tuit.stats &&
                    <span className='ttr-stats-retuits'>{tuit.stats.retuits}</span>
                }
            </div>
            <div className="col">
              <span className='ttr-like-tuit-click'
                    onClick={() => toggleLikes(tuit)}>
                  {
                      tuit.stats && tuit.stats.likes !== undefined && tuit.likedByMe &&
                      <i className="fas fa-thumbs-up me-1" style={{color: 'blue'}}></i>
                  }
                  {
                      tuit.stats && tuit.stats.likes !== undefined && !tuit.likedByMe &&
                      <i className="far fa-thumbs-up me-1"></i>
                  }
                  {tuit.stats &&
                   <span className='ttr-stats-likes'>{tuit.stats.likes}</span>}
              </span>
            </div>
            <div className="col">
                <span className='ttr-dislike-tuit-click'
                    onClick={()=>toggleDislikes(tuit)}>
                    {
                        tuit.stats && tuit.stats.dislikes !== undefined && tuit.dislikedByMe &&
                        <i className="fas fa-thumbs-down me-1" style={{color: 'blue'}}></i>
                    }
                    {
                      tuit.stats && tuit.stats.dislikes !== undefined && !tuit.dislikedByMe &&
                      <i className="far fa-thumbs-down me-1"></i>
                    }
                    {tuit.stats &&
                     <span className='ttr-stats-dislikes'>{tuit.stats.dislikes}</span>}
              </span>
            </div>
            <div className="col">
                <i className="far fa-inbox-out"></i>
            </div>
        </div>
    );
}
export default TuitStats;