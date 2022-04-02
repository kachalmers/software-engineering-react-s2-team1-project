/**
 * @file Implements tests for my dislikes screen
 */
import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import MyDislikes from "../components/profile/my-dislikes";
import {api} from "../services/dislikes-service";
import {HashRouter} from "react-router-dom";

// List of mocked disliked tuits
const MOCKED_DISLIKED_TUITS = [
    {
        tuit: "test tuit 1 for my dislikes screen test",
        postedBy: {
            username: "TestAlice",
            password: "alice123",
            email: "alice@wonderland.com",
            _id: "123"
        },
        stats: {dislikes: 123},
        dislikedByMe: true,
        _id: "321"
    },
    {
        tuit: "test tuit 2 for my dislikes screen test",
        postedBy: {
            username: "TestAlice",
            password: "alice123",
            email: "alice@wonderland.com",
            _id: "123"
        },
        stats: {dislikes: 456},
        dislikedByMe: true,
        _id: "654"
    },
    {
        tuit: "test tuit 3 for my dislikes screen test",
        postedBy: {
            username: "TestAlice",
            password: "alice123",
            email: "alice@wonderland.com",
            _id: "123"
        },
        stats: {dislikes: 789},
        dislikedByMe: true,
        _id: "987"
    }
];

describe('my dislikes screen renders disliked mocked tuit '
         + 'and displays correct dislikes count', () => {
    const mock = jest.spyOn(api, 'get');

    afterEach(()=> {
        mock.mockRestore();
    })

    test('my dislikes screen renders disliked mocked tuit '
         + 'and displays correct dislikes count', async () => {
        mock.mockImplementation(() => {
            return  Promise.resolve({data: MOCKED_DISLIKED_TUITS});
        });

        render(
            <HashRouter>
                <MyDislikes/>
            </HashRouter>
        )

        await waitFor(() => {
            MOCKED_DISLIKED_TUITS.map(tuit => {
                // Store username of tuit poster
                let username = tuit.postedBy.username;

                // Store dislikes count of tuit
                const dislikesCount = tuit.stats.dislikes;

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
                expect(screen.getByText(dislikesCount)).toBeInTheDocument();
            })
        })
    })
});