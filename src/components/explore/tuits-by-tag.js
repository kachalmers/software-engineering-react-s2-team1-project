import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as service from "../../services/tuits-service";
import * as tagService from "../../services/tuit2tags-service";
import Tuits from "../tuits";

const TuitsByTag = () => {
    //Uses Parameters to search
    let { tagString } = useParams();

    const navigate = useNavigate();

    // Set useStates
    const [tuits, setTuits] = useState([]);
    const [tempTag, setTempTag] = useState('');

    const goToSearch = () => {
        const tuitArray = tagService.findTuitsWithTag(tagString);

        tagService.findTuitsWithTag(tempTag)
            .then(newTuits => {
                setTuits(newTuits);
            });

        navigate(`/explore/tuitsbytag/${tempTag}`);
    }

    const findTuitsWithTag = () => {
        setTempTag(tagString);

        if(tagString === undefined) {
            service.findAllTuits()
                .then(tuits => {
                    setTuits(tuits);
                })
        }else{
            tagService.findTuitsWithTag(tagString).then(newTuits => {
                setTuits(newTuits);
            });
        }
    };

    // When we first load the page...
    useEffect(() => {
        findTuitsWithTag();
    }, []);

    return (
        <div className="ttr-whats-happening p-0">
            <div className="ttr-search position-relative">
                <i className="fas fa-search position-absolute"></i>

                <input className="bg-secondary bg-opacity-10 border-0 form-control form-control-lg rounded-pill ps-5"
                       placeholder="Search Tuits By Tag"
                       value={tempTag}
                       onChange={(event)=>
                            setTempTag(event.target.value)}
                />


            </div>
            <div>
                <div className="mt-2 position-relative">
                    <select name="selectSort"
                            defaultValue="RECENT"
                            id = "selectSort">
                        <option value="LIKES">Sort By: Most Likes</option>
                        <option value="RECENT">Sort By: Most Recent</option>
                    </select>

                    <a>    Tuits Displayed: {tuits.length}</a>

                    <button onClick={() =>
                        // add into param of findTuitsWithTag
                        {goToSearch()}
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

export default TuitsByTag;