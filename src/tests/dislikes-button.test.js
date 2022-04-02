/**
 * @file Implements test for rendering dislikes button with the correct
 * dislikes count.
 */
import {render, screen} from "@testing-library/react";
import React from "react";
import Tuit from "../components/tuits/tuit";
import {HashRouter} from "react-router-dom";

/**
 * Mocked Tuit with dislikes count.
 */
const MOCKED_TUIT = {
    tuit: "Alice's tuit for testing dislikes button",
    postedBy: {
        username: "Alice",
        password: "aliceiam54321",
        email: "alice@wonderland.com",
        _id: "123"
    },
    stats: {dislikes: 798},
    likedByMe: true,
    _id: "111"
}

/**
 * Test whether dislikes button can render with the correct count.
 */
describe("render dislikes-button with mocked tuit", () => {
    render(
        <HashRouter>
            <Tuit tuit={MOCKED_TUIT}/>
        </HashRouter>
    )

    test("render dislikes-button with mocked tuit", () => {
        const dislikesButton = screen.getByText('798', {exact: true})
        expect(dislikesButton).toBeInTheDocument();
    })
})
