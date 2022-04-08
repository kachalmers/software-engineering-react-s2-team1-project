import React from "react";
import searchedExplore from "./search-list-item";
const Explore = (searchTag) => {
      if(searchTag !== ""){
        return(
            <searchedExplore/>
        );
      }else {
        return (
            <h1>Explore Screen</h1>
        )
      }
};
export default Explore;