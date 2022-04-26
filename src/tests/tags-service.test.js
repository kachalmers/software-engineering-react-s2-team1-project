/**
 * @file Implements tests for tags API
 */
import {createTuitByUser, deleteTuitByTuitText, findTuitById} from "../services/tuits-service";
import {findAllTags, deleteTag} from "../services/tags-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";

describe('user can create a tag in a tuit with REST API', () => {
    // Mocked tuit to insert
    const mockedTuit = {
        tuit: "Let's race, ace! #Sonic"
    }

    // Mocked user to insert
    const sonic = {
        username: 'SonicTheHedgehog',
        password: 'chilidogs',
        email: 'sonic@sega.com'
    }

    // Initialize test variables
    let uid = null;
    let tid = null;
    let testTuit = null;

    // Set up tests
    beforeAll(async () => {
        let promises = [];  // Initialize an empty list of promises

        // Add promise to remove users with test username to list of promises
        promises.push(deleteUsersByUsername(sonic.username));

        // Add promise to remove tuits with test text to list of promises
        promises.push(deleteTuitByTuitText(mockedTuit.tuit));

        await Promise.all(promises);    // Wait for all promises to be fulfilled

        // Create a new user with mocked user and store their id
        const author = await createUser(sonic);
        uid = author._id;

        // Create a new tuit by user with mocked tuit/user and store its id
        testTuit = await createTuitByUser(author._id, mockedTuit);
        tid = testTuit._id;
    })

    // Clean up after tests
    afterAll(async () => {

        let promises = []   // Initialize an empty list of promises

        // Add promise to delete users by username to list of promises
        promises.push(deleteUsersByUsername(sonic.username));

        // Add promise to delete tuits by tuit text to list of promises
        promises.push(deleteTuitByTuitText(mockedTuit.tuit));

        // Wait for and return the result of all promises
        return Promise.all(promises);
    })

    test("user can create a tag in a tuit with REST API", async () => {
        // Get all tags
        const allTags = await findAllTags();

        // Expect at least one tag
        expect(allTags.length).toBeGreaterThanOrEqual(1);

        // Expect #Sonic to be one of the tags
        let flag = false;
        for (let i = 0; i < allTags.length; i++) {
            if (allTags[i].tag == 'Sonic') {
                flag = true;
            }
        }
        expect(flag).toEqual(true);

    })

});

describe("can retrieve all tags with REST API", () => {
    // Mocked tuits to insert
    const mockedTuit1 = {
        tuit: "Let's race, ace! #Sonic"
    }

    const mockedTuit2 = {
        tuit: "I'm Sonic. Sonic the #hedgehog"
    }
    const mockedTuit3 = {
        tuit: "I’m waaaaiiiitiiiing! #Sonic"
    }

    // Mocked user to insert
    const sonic = {
        username: 'SonicTheHedgehog',
        password: 'chilidogs',
        email: 'sonic@sega.com'
    }

    // Initialize test variables
    let uid = null;
    let tid1, testTuit1 = null;
    let tid2, testTuit2 = null;
    let tid3, testTuit3 = null;

    // Set up tests
    beforeAll(async () => {
        let promises = [];  // Initialize an empty list of promises

        /*
        Add promises to remove users with test username and
        remove tuits with test texts to list of promises
        */
        promises.push(deleteUsersByUsername(sonic.username));
        promises.push(await deleteTuitByTuitText(mockedTuit1.tuit));
        promises.push(await deleteTuitByTuitText(mockedTuit2.tuit));
        promises.push(await deleteTuitByTuitText(mockedTuit3.tuit));

        await Promise.all(promises);    // Wait for all promises to be fulfilled

        // Create a new user with mocked user and store their id
        const author = await createUser(sonic);
        uid = author._id

        // Create a new tuits by user with mocked tuits/user and store its id
        testTuit1 = await createTuitByUser(uid, mockedTuit1);
        testTuit2 = await createTuitByUser(uid, mockedTuit2);
        testTuit3 = await createTuitByUser(uid, mockedTuit3);
        tid1 = testTuit1._id;
        tid2 = testTuit2._id;
        tid3 = testTuit3._id;

    })

    // Clean up after tests
    afterAll(async () => {
        // Retrieve testTuit1, 2, and 3 by their ids
        testTuit1 = await findTuitById(tid1);
        testTuit2 = await findTuitById(tid2);
        testTuit3 = await findTuitById(tid3);

        let promises = [];  // Initialize an empty list of promises

        /*
        Add promises to remove users with test username and
        remove tuits with test texts to list of promises
        */
        promises.push(deleteUsersByUsername(sonic.username));
        promises.push(await deleteTuitByTuitText(mockedTuit1.tuit));
        promises.push(await deleteTuitByTuitText(mockedTuit2.tuit));
        promises.push(await deleteTuitByTuitText(mockedTuit3.tuit));

        // Wait for and return the result of all promises
        return Promise.all(promises);
    })

    test("can retrieve all tags with REST API", async () => {
        // Find and store all tags
        const theTags = await findAllTags();

        // The number of tags should be at least 2
        expect(theTags.length).toBeGreaterThanOrEqual(2);

        let sonicFlag = false;
        let hedgehogFlag = false;

        // Check theTags contains the 3 expected
        for (let i = 0; i < theTags.length; i++) {
            if (theTags[i].tag == 'Sonic') {
                sonicFlag = true;
                expect(theTags[i].count).toBeGreaterThanOrEqual(2);
            } else if (theTags[i].tag == 'hedgehog') {
                hedgehogFlag = true;
            }
        }
        expect(sonicFlag).toEqual(true);
        expect(hedgehogFlag).toEqual(true);

    })
})

describe('user can delete a tag with REST API', () => {
    // Mocked tuit to insert
    const mockedTuit = {
        tuit: "Juice and jam time! #SonicTheHedgehog"
    }

    // Mocked user to insert
    const sonic = {
        username: 'SonicTheHedgehog',
        password: 'chilidogs',
        email: 'sonic@sega.com'
    }

    // Initialize test variables
    let uid = null;
    let tid = null;
    let testTuit = null;

    // Set up tests
    beforeAll(async () => {
        let promises = [];  // Initialize an empty list of promises

        // Add promise to remove users with test username to list of promises
        promises.push(deleteUsersByUsername(sonic.username));

        // Add promise to remove tuits with test text to list of promises
        promises.push(deleteTuitByTuitText(mockedTuit.tuit));

        await Promise.all(promises);    // Wait for all promises to be fulfilled

        // Create a new user with mocked user and store their id
        const author = await createUser(sonic);
        uid = author._id

        // Create a new tuit by user with mocked tuit/user and store its id
        testTuit = await createTuitByUser(author._id, mockedTuit);
        tid = testTuit._id;

    })

    // Clean up after tests
    afterAll(async () => {

        let promises = [];  // Initialize an empty list of promises

        // Add promise to remove users with test username to list of promises
        promises.push(deleteUsersByUsername(sonic.username));

        // Add promise to remove tuits with test text to list of promises
        promises.push(deleteTuitByTuitText(mockedTuit.tuit));

        await Promise.all(promises);    // Wait for all promises to be fulfilled
    })

    test("user can delete a tag with REST API",async () => {
        const allTags = await findAllTags();  // Retrieve all tags

        // Get ID of the tag
        let tagID = '';
        for (let i = 0; i < allTags.length; i++) {
            if (allTags[i].tag == 'SonicTheHedgehog') {
                 tagID = allTags[i]._id;
                break;
            }
        }
        // Delete the tag
        await deleteTag(tagID);

        // Confirm the tag was deleted
        const allTags2 = await findAllTags();
        let flag = false;
        for (let i = 0; i < allTags2.length; i++) {
            if (allTags2[i] == 'SonicTheHedgehog') {
                flag = true;
            }
        }
        expect(flag).toEqual(false);

    })
})