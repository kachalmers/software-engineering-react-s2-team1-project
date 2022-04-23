/**
 * @file Implements tests for tuit2tags API
 */
import {createTuitByUser, deleteTuitByTuitText, findTuitById} from "../services/tuits-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";
import {findTuitsWithTag} from "../services/tuit2tags-service";


describe("can retrieve all tuits with tags with REST API", () => {
    // Mocked tuits to insert
    const mockedTuit1 = {
        tuit: "Alrighty, we're in! #Tails"
    }

    const mockedTuit2 = {
        tuit: "All's well that ends well, right?...Sonic? #SonicTheHedgehog"
    }
    const mockedTuit3 = {
        tuit: "Hey, Sonic! #SonicTheHedgehog"
    }

    // Mocked user to insert
    const tails = {
        username: 'tails',
        password: 'sonicntails4evs',
        email: 'tails@sega.com'
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
        promises.push(deleteUsersByUsername(tails.username));
        promises.push(await deleteTuitByTuitText(mockedTuit1.tuit));
        promises.push(await deleteTuitByTuitText(mockedTuit2.tuit));
        promises.push(await deleteTuitByTuitText(mockedTuit3.tuit));

        await Promise.all(promises);    // Wait for all promises to be fulfilled

        // Create a new user with mocked user and store their id
        const author = await createUser(tails);
        uid = author._id

        // Create a new tuits by user with mocked tuits/user and store its id
        testTuit1 = await createTuitByUser(uid, mockedTuit1);
        testTuit2 = await createTuitByUser(uid, mockedTuit2);
        testTuit3 = await createTuitByUser(uid, mockedTuit3);
        tid1 = testTuit1._id
        tid2 = testTuit2._id;
        tid3 = testTuit3._id
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
        promises.push(deleteUsersByUsername(tails.username));
        promises.push(await deleteTuitByTuitText(mockedTuit1.tuit));
        promises.push(await deleteTuitByTuitText(mockedTuit2.tuit));
        promises.push(await deleteTuitByTuitText(mockedTuit3.tuit));

        // Wait for and return the result of all promises
        return Promise.all(promises);
    })

    test("can retrieve all tuit2tags with REST API", async () => {
        // Find and store all tuits with tags
        const taggedTuits = await findTuitsWithTag('SonicTheHedgehog');
        const tailsTagTuit = await findTuitsWithTag('Tails');

        // The number of tuits w/SonicTheHedgehog tag should be at least 2
        expect(taggedTuits.length).toBeGreaterThanOrEqual(2);
        // The number of tuits w/Tails tag should be at least 1
        expect(tailsTagTuit.length).toBeGreaterThanOrEqual(1);

        const tailsTuitID = [tid1];    // store id of #Tails tuits
        const sonicTuitsID = [tid2, tid3];   // store id of #SonicTheHedgehog tuits

        // For each sonic tagged tuit...
        taggedTuits.forEach((tuit) => {
            // Check for tuit id in list of sonic tagged tuit ids
            expect(sonicTuitsID.indexOf(tuit._id)).toBeGreaterThanOrEqual(0);
        })

        // For each tails tagged tuit...
        tailsTagTuit.forEach((tuit) => {
            // Check for tuit id in list of tails tagged tuit ids
            expect(tailsTuitID.indexOf(tuit._id)).toBeGreaterThanOrEqual(0);
        })
    })
})

