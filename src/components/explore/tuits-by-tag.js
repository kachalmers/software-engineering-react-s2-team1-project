import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits"

const TuitsByTag = () => {
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

    const findTuitsWithTag = () => {
        // #KAC
        // findAllTuits in next line to be changed to findTuitsWithTag({tag})
        service.findAllTuits()
            .then(tuits => {
                setTuits(tuits);
            })
    };

    // When we first load the page...
    useEffect(() => {
        setTuits([]);   // Show no tuits...
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
                findTuitsWithTag(); //
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