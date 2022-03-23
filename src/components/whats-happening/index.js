import React from "react";
import whatsHappening from "./whats-happening-data.json";
import './whats-happening.css'

function WhatsHappening() {
 return(
  <div className="ttr-whats-happening p-2">
   <div className="ttr-search position-relative">
    <i className="fas fa-search position-absolute"></i>
    <input className="bg-secondary bg-opacity-10 border-0 form-control form-control-lg rounded-pill ps-5"
           placeholder="Search Tuiter"/>
   </div>
   <div className="bg-secondary bg-opacity-10 ttr-rounded-15px mt-2 p-2">
    <h2>What's happening</h2>
    {
     whatsHappening.map(wh => {
       return(
         <div key={wh._id} className="ttr-whats-happening-tuit d-flex mb-3">
           <div className="flex-grow-1">
            <h3 className="fs-6 fw-lighter">
             {wh.topic} - {wh['hours-ago']} hours ago</h3>
            <div className="fw-bold mb-2 pe-1">
             {wh.content}
            </div>
            <h4 className="fs-6 fw-lighter">{wh.likes} likes</h4>
           </div>
           <div>
            <img src={`../images/${wh['user-logo']}`}
                 className="ttr-rounded-15px ttr-user-logo"/>
           </div>
          </div>
       );
     })
    }
   </div>
  </div>
    );
}
export default WhatsHappening;