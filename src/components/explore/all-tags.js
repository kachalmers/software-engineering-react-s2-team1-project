import {useEffect, useState} from "react";
import * as service from "../../services/tags-service";
import Tags from "../tags"

const AllTags = () => {
    const [tags, setTags] = useState([]);
    const findTags = () => {
        service.findAllTags()
            .then(tags => {
                setTags(tags);
            })
    }

    useEffect(() => {
        findTags()
    }, []);

    return (
        <Tags tags={tags} refreshTags={findTags}/>
    )
}

export default AllTags;