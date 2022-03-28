import React from "react";
import * as likesService from "../../services/likes-service";
import * as dislikesService from "../../services/dislikes-service";
import { useState, useEffect } from "react";
//import ReactDOM from "react-dom";

const TuitStats = ({tuit, likeTuit = () => {}, dislikeTuit = () => {}, findUserDislikesTuit = () => {}}) => {
/*
    const [userLikesTuitJson, setUserLikesTuitJson] = useState({});
    useEffect(() => {
        likesService.findUserLikesTuit("me", tuit._id)
            .then(value => setUserLikesTuitJson(value));
    }, [tuit.stats.likes]); // <- add the count variable here
*/

    const [userDislikesTuitJson, setUserDislikesTuitJson] = useState({});
    useEffect(() => {
        dislikesService.findUserDislikesTuit("me", tuit._id)
            .then(value => setUserDislikesTuitJson(value));

        //if (userDislikesTuitJson !== null) {
        //console.log(userDislikesTuitJson);//;}
        console.log(JSON.stringify(userDislikesTuitJson));
        console.log(JSON.stringify(userDislikesTuitJson) === '{}');
    }, [tuit]);

/*
    const [count, setCount] = useState(0);
    const [calculation, setCalculation] = useState(0);

    useEffect(() => {
        setCalculation(() => count * 2);
    }, [count]); // <- every time count changes, call setCalculation
*/
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
                  //userLikesTuitJson &&
                  //userLikesTuitJson.tuit !== null &&
                  // tuit.userLikesTuit (bool)
                  //likesService.userLikesTuit("me", tuit._id) &&
                  <i className="fas fa-thumbs-up me-1" style={{color: 'blue'}}></i>
              }
              {
                  //tuit.stats && (userLikesTuitJson === null || tuit.stats.likes <= 0) &&
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
                  userDislikesTuitJson &&
                  (userDislikesTuitJson.tuit !== null) &&
                  (JSON.stringify(userDislikesTuitJson) !== '{}') &&
                  <i className="fas fa-thumbs-down me-1" style={{color: 'blue'}}></i>
              }
              {
                  //tuit.stats && tuit.stats.dislikes <= 0 &&
                  //console.log(userDislikesTuitJson) &&
                  //userDislikesTuitJson.then(json => console.log(json)) &&
                  //console.log(otherUserStateVariable) &&

                  // If user doesn't dislike tuit yet or dislikes count <= 0
                  tuit.stats && (userDislikesTuitJson === null
                                 || JSON.stringify(userDislikesTuitJson) === '{}'
                                 || tuit.stats.dislikes <= 0) &&

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
/*
        <p>Count: {count}</p>
        <button onClick={() => setCount((c) => c + 1)}>+</button>
        <p>Calculation: {calculation}</p>
 */
export default TuitStats;