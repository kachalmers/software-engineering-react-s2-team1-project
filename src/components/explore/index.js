/**
 * @file Implements Profile component for displaying user explore page
 */
import React, {useEffect, useState} from "react";
import AllTuits from "./all-tuits"; // import MyTuits to render in explore screen
import {Link, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import MyLikes from "./my-likes";
import TuitsByTag from "./tuits-by-tag";
import AllTags from "./all-tags";

const Profile = () => {
  const location = useLocation();

  return(
    <div className="ttr-explore">
      <div className="border border-bottom-0">
        <h4 className="p-2 mb-0 pb-0 fw-bolder">
          Explore
        </h4>
        <div className="p-2">
          <ul className="mt-0 nav nav-pills nav-fill">
            <li className="nav-item">
              <Link to="/explore/alltuits"
                    className={`nav-link ${location.pathname.indexOf('alltuits') >= 0 ? 'active':''}`}>
                Tuits</Link>
            </li>
            <li className="nav-item">
              <Link to="/explore/mylikes"
                    className={`nav-link ${location.pathname.indexOf('mylikes') >= 0 ? 'active':''}`}>
                Likes</Link>
            </li>
            <li className="nav-item">
              <Link to="/explore/tuitsbytag"
                    className={`nav-link ${location.pathname.indexOf('tuitsbytag') >= 0 ? 'active':''}`}>
                Tuits By Tag</Link>
            </li>
            <li className="nav-item">
              <Link to="/explore/alltags"
                    className={`nav-link ${location.pathname.indexOf('alltags') >= 0 ? 'active':''}`}>
                All Tags</Link>
            </li>
          </ul>
        </div>
      </div>
      <Routes>
        <Route path="/alltuits" element={<AllTuits/>}/>
        <Route path="/mylikes" element={<MyLikes/>}/>
        <Route path="/tuitsbytag" element={<TuitsByTag/>}/>
        <Route path="/alltags" element={<AllTags/>}/>
      </Routes>
    </div>
  );
}
export default Profile;