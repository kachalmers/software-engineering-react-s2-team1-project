/**
 * @file Implements tests for the Explore page
 */
import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import MyDislikes from "../components/profile/my-dislikes";
import {api} from "../services/dislikes-service";
import {HashRouter} from "react-router-dom";

// List of mocked disliked tuits
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

        render(
            <HashRouter>
                <Explore/>
            </HashRouter>
        )

        await waitFor(() => {
            MOCKED_TAG_TUITS.map(tuit => {
                // Store username of tuit poster
                let username = tuit.postedBy.username;

                // Store tag(s) from tuit
                const tags = tuit.tuit; // Add in way to parse out tag from text using split

                // Get username from screen by username
                const usernameElements =  screen
                    .getAllByText(username, {exact: false});

                // Get tuit from screen by tuit text
                const tuitElements =  screen.getAllByText(tuit.tuit, {exact: false});

                // Expect each username element found to be in the document
                usernameElements.forEach(e => expect(e).toBeInTheDocument());

                // Expect each tuit element found to be in the document
                tuitElements.forEach(e => expect(e).toBeInTheDocument());

                // Expect the dislikes count of the tuit to be in the document
                expect(screen.getByText(tags)).toBeInTheDocument();
            })
        })
    })
});