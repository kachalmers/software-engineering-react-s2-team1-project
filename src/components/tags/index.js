/**
 * @file Implements Tags component to display a list of tags
 */
import React, {useEffect, useState} from "react";
import './tags.css';
import Tag from "./tag";
import * as likeService from "../../services/likes-service";
import * as dislikeService from "../../services/dislikes-service";
import * as tagService from '../../services/tags-service';
import * as authService from "../../services/auth-service";

const Tags = ({tags = [], refreshTags}) => {
    const [profile, setProfile] = useState(undefined);
    useEffect(async ()=> {
        try {
            const user = await authService.profile();
            if (user) {
                setProfile(user);
            }
        } catch (e) {
        }
    }, []);

    /**
     * Toggle likes of a tag using the API.
     * @param tag Tag with likes to be toggled
     */
    const toggleLikes = (tag) => {
        if (profile !== undefined) {
            likeService.userTogglesTuitLikes("me", tag._id)
                .then(refreshTags)
                .catch(e => alert(e));
        } else {
            alert("Log in to like tags!")
        }
    }

    /**
     * Toggle dislikes of a tag using the API.
     * @param tag Tag with dislikes to be toggled
     */
    const toggleDislikes = (tag) => {
        if (profile !== undefined) {
            dislikeService.userTogglesTuitDislikes("me", tag._id)
                .then(refreshTags)
                .catch(e => alert(e));
        } else {
            alert("Log in to dislike tags!")
        }
    }

    /**
     * Delete tag using API.
     * @param tid Primary key of tag
     */
    const deleteTag = (tid) =>
        tagService.deleteTag(tid)
            .then(refreshTags);

    return (
    <div>
      <ul className="ttr-tags list-group">
        {
          tags.map && tags.map(tag => {
            return (
              <Tag key={tag._id}
                    deleteTag={deleteTag}
                    toggleLikes={toggleLikes}
                    toggleDislikes={toggleDislikes}
                    tag={tag}/>
            );
          })
        }
      </ul>
    </div>
  );
}

export default Tags;