import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits"

const SearchedTag = (tagString) => {
    const [tuits, setTuits] = useState([]);
    const [tempTag, setTempTag] = useState('');
    const navigate = useNavigate();
    const findTuitsWithTag = (tagString) => {
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
                        value= {tagString}
                    //onChange={console.log(this.state.value)}
                />
                <div className="mt-2 position-relative">
                    <select name="selectSort"
                            defaultValue="RECENT"
                            id = "selectSort">
                        <option value="LIKES">Sort By: Most Likes</option>
                        <option value="RECENT">Sort By: Most Recent</option>
                    </select>

                    <button onClick={() =>
                        //add into param of findTuitsWithTag
                        navigate(tempTag)
                    }
                            className = "btn-primary border-0 float-end rounded-pill">
                        Search
                    </button>
                </div>
            </div>
            <br/>
            <Tuits tuits={tuits} refreshTuits={findTuitsWithTag}/>
        </div>
    )
}

export default SearchedTag;