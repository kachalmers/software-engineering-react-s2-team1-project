/**
 * @file Implement Tag component for displaying each tag
 */
import React from "react";
import {Link} from "react-router-dom";

const Tag = ({tag}) => {



    return (
        <div className="row">
            <div className="col-6">
                <a onClick={console.log("Clicked")}
                   className={`btn btn-primary rounded-pill fa-pull-right
                                  fw-bold ps-4 pe-4`}>
                    {tag.tag}
                </a>
            </div>
            <div className="col-5 ttr-font-size-150pc text-primary">
                <h>
                    {"Tag count: "+tag.count}
                </h>
            </div>
        </div>
    );


}
export default Tag;