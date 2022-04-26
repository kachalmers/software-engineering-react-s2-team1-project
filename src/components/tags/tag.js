/**
 * @file Implement Tag component for displaying each tag
 */
import React from "react";
import {useNavigate} from "react-router-dom";


const Tag = ({tag}) => {

    const navigate = useNavigate();

    return (
        <div className="row">
            <div className="col-6">
                <a onClick = {()=> navigate(`/explore/tuitsbytag/${tag.tag}`)}
                   className={`btn btn-primary rounded-pill fa-pull-right
                                  fw-bold ps-4 pe-4`}>
                    {tag.tag}
                </a>
            </div>
            <div className="col-5 ttr-font-size-150pc text-primary">
                <p>
                    {"Tag count: "+tag.count}
                </p>
            </div>
        </div>
    );


}
export default Tag;