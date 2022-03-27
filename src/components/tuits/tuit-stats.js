import React from "react";
//import * as likesService from "../../services/likes-service";
//import * as dislikesService from "../../services/dislikes-service";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const TuitStats = ({tuit, likeTuit = () => {}, dislikeTuit = () => {}, userDislikesTuit = () => {}}) => {
   // const userDislikesTuitBool = (tuit) =>
     //   dislikesService.userDislikesTuit("me", tuit._id);
    //const userDislikesTuitJson = userDislikesTuit(tuit);

    const [userDislikesTuitJson, setUserDislikesTuitJson] = useState({});
    const [otherUserStateVariable, setOtherUserStateVariable] = useState({});

    useEffect(() => {
        setUserDislikesTuitJson(async () => await userDislikesTuit(tuit));
        //setUserDislikesTuitJson(userDislikesTuit(tuit));


    //    userDislikesTuitJson && userDislikesTuitJson.then(json => setOtherUserStateVariable(json));
    }, [tuit, userDislikesTuit]); // <- add the count variable here


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
                  // tuit.userLikesTuit (bool)
                  //likesService.userLikesTuit("me", tuit._id) &&
                  <i className="fas fa-thumbs-up me-1" style={{color: 'blue'}}></i>
              }
              {
                  tuit.stats && tuit.stats.likes <= 0 &&
                  //tuit.stats && (!(likesService.userLikesTuit("me", tuit._id)) || tuit.stats.likes <= 0) &&
                  <i className="far fa-thumbs-up me-1"></i>
              }
            {tuit.stats && tuit.stats.likes}
          </span>
        </div>
        <div className="col">
          <span onClick={() => dislikeTuit(tuit)}>
              {
                  tuit.stats && tuit.stats.dislikes > 0 &&
                  userDislikesTuitJson.tuit !== null &&
                  <i className="fas fa-thumbs-down me-1" style={{color: 'blue'}}></i>
              }
              {
                  //tuit.stats && tuit.stats.dislikes <= 0 &&
                  //console.log(userDislikesTuitJson) &&
                  //userDislikesTuitJson.then(json => console.log(json)) &&
                  //console.log(otherUserStateVariable) &&

                  // If user doesn't dislike tuit yet or dislikes count <= 0
                  tuit.stats && (userDislikesTuitJson === null || tuit.stats.dislikes <= 0) &&

                  // Don't fill shape
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
//ReactDOM.render(<TuitStats />, document.getElementById("root"));

export default TuitStats;