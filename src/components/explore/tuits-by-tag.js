import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits"

const TuitsByTag = () => {
    const [tuits, setTuits] = useState([]);
    const findTuitsWithTag = () => {
        // #KAC-findTuitsWithTag
        service.findAllTuits()
            .then(tuits => {
                setTuits(tuits);
            })
    };

    useEffect(() => {
        findTuitsWithTag()
    }, []);

    return (
        <div className="ttr-whats-happening p-0">
            <div className="ttr-search position-relative">
                <i className="fas fa-search position-absolute"></i>
                <input className="bg-secondary bg-opacity-10 border-0 form-control form-control-lg rounded-pill ps-5"
                       placeholder="Search Tuits By Tag"
                       //value={this.state.value}
                       //onChange={console.log(this.state.value)}
                />
            </div>
            <div>
                <div className="mt-2 position-relative">
                    <select name="selectSort" id="selectSort">
                        <option value="LIKES">Sort By: Most Likes</option>
                        <option value="RECENT" selected = "selected">Sort By: Most Recent</option>
                    </select>

                    <button className = "btn-primary border-0 float-end rounded-pill">Search</button>
                </div>
            </div>
            <Tuits tuits={tuits} refreshTuits={findTuitsWithTag}/>
        </div>
    )
}

export default TuitsByTag;