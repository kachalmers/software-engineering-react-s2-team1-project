/**
 * @file Implements tests for the Explore page
 */
import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import MyDislikes from "../components/profile/my-dislikes";
import {api} from "../services/dislikes-service";
import {HashRouter} from "react-router-dom";
import Explore from "../components/explore";
import TuitsByTag from "../components/explore/tuits-by-tag";

// List of mocked tuits w/tags
const MOCKED_TAG_TUITS = [
    {
        tuit: "Explore screen test #TestyTestTest",
        postedBy: {
            username: "Tester",
            password: "tester123",
            email: "test@test.com",
            _id: "123"
        },
        stats: {dislikes: 0},
        dislikedByMe: false,
        _id: "321"
    },
    {
        tuit: "Explore screen test 2 #Testing #TestyTestTest",
        postedBy: {
            username: "Tester",
            password: "tester123",
            email: "test@test.com",
            _id: "123"
        },
        stats: {dislikes: 0},
        dislikedByMe: false,
        _id: "654"
    },
    {
        tuit: "Explore screen test 3 #TestingMore #Testing #TestyTestTest",
        postedBy: {
            username: "Tester",
            password: "tester123",
            email: "test@test.com",
            _id: "123"
        },
        stats: {dislikes: 0},
        dislikedByMe: false,
        _id: "987"
    }
];

describe('my explore screen renders mocked tuits with hashtags '
    + 'and displays correct tags', () => {
    const mock = jest.spyOn(api, 'get');

    afterEach(()=> {
        mock.mockRestore();
    })
///////////////////////////////////////////////////////////////////////
    test('my explore screen renders mocked tuits with hashtags '
        + 'and displays correct tags', async () => {
        mock.mockImplementation(() => {
            return  Promise.resolve({data: MOCKED_TAG_TUITS});
        });

        // This was in reference to components > profile > my-dislikes.js
        render(
            <HashRouter>
                <TuitsByTag/>
            </HashRouter>
        )

        await waitFor(() => {
            MOCKED_TAG_TUITS.map(tuit => {
                // Store username of tuit poster
                let username = tuit.postedBy.username;

                // Store tag(s) from tuit
                const splitTuit = tuit.tuit.split(" "); // Parse out tag(s) from the tuit text
                let tags = [];
                for (let i = 0; i < splitTuit.length; i++) {
                    if (splitTuit[i].startsWith('#')) {
                        tags.push(splitTuit[i].slice(1));
                    }
                }

                // Get username from screen by username
                const usernameElements =  screen
                    .getAllByText(username, {exact: false});

                // Get tuit from screen by tuit text
                const tuitElements =  screen.getAllByText(tuit.tuit, {exact: false});

                // Expect each username element found to be in the document
                usernameElements.forEach(e => expect(e).toBeInTheDocument());

                // Expect each tuit element found to be in the document
                tuitElements.forEach(e => expect(e).toBeInTheDocument());

                // Expect the tags of the tuit to be in the document
                tags.forEach(tag => {
                    expect(screen.getByText(tag)).toBeInTheDocument();
                })
                //expect(screen.getByText(tags)).toBeInTheDocument();
            })
        })
    })
});