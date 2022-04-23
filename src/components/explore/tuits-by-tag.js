import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as service from "../../services/tuits-service";
import * as tagService from "../../services/tuit2tags-service";
import Tuits from "../tuits"

const TuitsByTag = () => {
    //Uses Parameters to search
    let { tagSearch } = useParams();
    const navigate = useNavigate();

    const [tuits, setTuits] = useState([]);
    const [tempTag, setTempTag] = useState('');
    const [tag, setTag] = useState('');

    // Currently sets tuits to be shown back to an empty list of tuits
    // TBD what we actually want to show here,
    // We can decide when we get the backend hooked-up and working
    const findAllTuits = () => {
        /*
        // Find all tuits
        service.findAllTuits()
            .then(tuits => {
                setTuits(tuits);
            })
         */
        setTuits([]);   // set tuits to empty array
        setTag(tempTag);    // Set tag to what was entered
    };


    const goToSearch = () => {
        console.log(tempTag + ". This is the tempTag");
        console.log(tagSearch + ". This is the TagSearch");
        const tuitArray = tagService.findTuitsWithTag(tagSearch);
        console.log(tuitArray);
        tagService.findTuitsWithTag(tempTag)
            .then(newTuits => {
                setTuits(newTuits);
            });
        console.log("Tuits with " + tempTag + " added!");
        //console.log(tuits.length);
        navigate(`/explore/tuitsbytag/${tempTag}`);
    }

    const findTuitsWithTag = () => {
        // #KAC
        // findAllTuits in next line to be changed to findTuitsWithTag({tag})
        console.log("Page Opened: This is the Param: -->" + tagSearch + "<--")
        service.findAllTuits()
                .then(tuits => {
                    setTuits(tuits);
                })
    };

    // When we first load the page...
    useEffect(() => {
        //setTuits([]);// Show no tuits...
        findTuitsWithTag();

        console.log("Use Effect activated");
        //goToSearch();
        /*
        Note: this can later be changed to show all tuits with any tag.
        This can later be discussed by the team how we want to present this
         */
    }, []);


    // Whenever a keyboard button is clicked...
    const handleKeyDown = (event) => {
        /*
        If the 'Enter' key was pressed and there's something in the input
        box...
         */
        if (event.key === 'Enter') {
            if (tempTag !== "") {
                setTag(tempTag);    // Set tag to what was entered
                findTuitsWithTag(tempTag); //
                console.log("Enter!");
                setTempTag("");
            } else {
                findAllTuits(); // currently shows no tuits right now
            }
        }
    }

    // Log won't pick up on updates to states of objects until right before the return...
    // printing here to show value of tag
    // https://jsramblings.com/are-you-logging-the-state-immediately-after-updating-it-heres-why-that-doesnt-work/
    console.log(JSON.parse(JSON.stringify("before return: "+tag)));
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

                    <button onClick={() =>
                        //add into param of findTuitsWithTag
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