import Index from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {api, findAllTuits, deleteTuit, deleteTuitByTuitText, createTuitByUser} from "../services/tuits-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";

const MOCKED_TUITS = [
    {
        tuit: "alice's tuit",
        postedBy: {
            username: "Alice",
            password: "alice123",
            email: "alice@wonderland.com",
            _id: "1122"
        },
        _id: "111"
    },
    {
        tuit: "charlie's tuit",
        postedBy: {
            username: "Charlie",
            password: "charlie123",
            email: "charlie@123.com",
            _id: "5566"
        },
        _id: "333"
    },
    {
        tuit: "bob's tuit",
        postedBy: {
            username: "Bob",
            password: "bob123",
            email: "bob@123.com",
            _id: "3344"
        },
        _id: "222"
    },
];

test('tuit list renders static tuit array', () => {
    render(
        <HashRouter>
            <Index tuits={MOCKED_TUITS} deleteTuit={deleteTuit}/>
        </HashRouter>
    )
    MOCKED_TUITS.map(tuit => {
        // Expect username to be found in the document
        let name = tuit.postedBy.username;
        const usernameElements = screen.getAllByText(name, {exact: false});
        usernameElements.forEach(e => expect(e).toBeInTheDocument());

        // Expect tuit text to be found in the document
        const tuitElements = screen.getAllByText(tuit.tuit, {exact: false});
        tuitElements.forEach(e => expect(e).toBeInTheDocument());
    })
});

describe('tuit list renders async', ()=> {

    const tuitText = [
        "janice's test tuit 1",
        "janice's test tuit 2",
        "janice's test tuit 3"
    ]

    const user = {
        username: 'janice_joplin',
        password: 'janice123',
        email: 'pieceof@myheart.com'
    };

    // Set up tests
    beforeAll(() => {
        let promises = [];
        promises.push(deleteUsersByUsername(user.username));
        tuitText.map(text => {
            promises.push(deleteTuitByTuitText(text));
        })
        return Promise.all(promises);
    })

    // Clean up tests
    afterAll(()=> {
        let promises = []
        promises.push(deleteUsersByUsername(user.username));
        tuitText.map((text) => {
            let deletePromise = deleteTuitByTuitText(text);
            promises.push(deletePromise)
        })
        return Promise.all(promises)
    })

    test('tuit list renders async', async () => {
        const author = await createUser(user);  // Create new user

        let promises = [];  // Initialize an empty array of promises

        // Create a new tuit per tuit text in tuitText array
        tuitText.map(text => {
            promises.push(
                createTuitByUser(author._id,
                                 {
                                     tuit: text,
                                     postedOn: "2022-03-24T00:00:00.000Z"
                                 }
                                 )
            );
        })

        await Promise.all(promises);    // Wait for all promises to be fulfilled

        const tuits = await findAllTuits(); // Find all tuits

        // Render page with tuits
        render(
            <HashRouter>
                <Index tuits={tuits}/>
            </HashRouter>
        )

        // For each tuit text...
        tuitText.forEach(text => {
            // Check the tuit text exists in the document
            const tuitElements = screen.getAllByText(text, {exact: false});
            tuitElements.forEach(e => expect(e).toBeInTheDocument());
        })

        // Expect test username to be in the document
        let usernameElements = screen.getAllByText(user.username, {exact: false});
        usernameElements.forEach((e) => expect(e).toBeInTheDocument());

        // Get janice's tuit and expect it to be in the document
        const linkElements = screen.getAllByText(/janice's test tuit 1/i);
        linkElements.forEach((l) => expect(l).toBeInTheDocument());

        // Get janice's username and expect it to be in the document
        let tuitElement = screen.getAllByText(/@janice_joplin/i);
        tuitElement.forEach((l) => expect(l).toBeInTheDocument());
    })
})

test('tuit list renders mocked', async () => {
    const mock = jest.spyOn(api, 'get');
    mock.mockImplementation(() =>
                                Promise.resolve({data: {tuits: MOCKED_TUITS}}));
    const response = await findAllTuits();
    const tuits = response.tuits;

    mock.mockRestore();  // restore original implementation

    // Render tuits on page
    render(
        <HashRouter>
            <Index tuits={tuits}/>
        </HashRouter>
    )

    MOCKED_TUITS.map(tuit => {
        // Expect username to be found in the document
        let name = tuit.postedBy.username;
        const usernameElements = screen.getAllByText(name, {exact: false});
        usernameElements.forEach(e => expect(e).toBeInTheDocument());

        // Expect tuit text to be found in the document
        const tuitElements = screen.getAllByText(tuit.tuit, {exact: false});
        tuitElements.forEach(e => expect(e).toBeInTheDocument());
    })
});