import React from "react";
import Navigation from "../navigation";
import WhatsHappening from "../whats-happening";
import {BrowserRouter, Routes, Route, HashRouter} from "react-router-dom";
import Home from "../home";
import Bookmarks from "../bookmarks";
import Profile from "../profile";
import './tuiter.css'
import EditProfile from "../profile/edit-profile";
import Explore from "../explore";
import Notifications from "../notifications";
import Messages from "../messages";
import Lists from "../lists";
import More from "../more";
import {Login} from "../profile/login";
import Signup from "../profile/signup";
import TuitScreen from "../tuits/tuit-screen";

function Tuiter () {
  return(
    <HashRouter>
      <div className="container">
        <div className="ttr-tuiter">
          <div className="ttr-left-column">
            <Navigation/>
          </div>
          <div className="ttr-center-column">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/tuiter" element={<Home/>}/>
              <Route path="/tuiter/:uid" element={<Home/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/home/:uid" element={<Home/>}/>
<<<<<<< HEAD
              <Route path="/explore" element={<Explore/>}/>
              <!-- add below -->
              <Route path="/explore/:tagString" element={<Explore/>}/>
=======
              <Route path="/explore/*" element={<Explore/>}/>
>>>>>>> 091cf17e95c458a670578c1d85da588ff19e890d
              <Route path="/notifications" element={<Notifications/>}/>
              <Route path="/messages" element={<Messages/>}/>
              <Route path="/bookmarks" element={<Bookmarks/>}/>
              <Route path="/lists" element={<Lists/>}/>
              <Route path="/profile/*" element={<Profile/>}/>
              <Route path="/profile/edit" element={<EditProfile/>}/>
              <Route path="/more" element={<More/>}/>
              <Route path="/tuit/:tid" element={<TuitScreen/>}/>
            </Routes>
          </div>
          <div className="ttr-right-column">
            <WhatsHappening/>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}
export default Tuiter;