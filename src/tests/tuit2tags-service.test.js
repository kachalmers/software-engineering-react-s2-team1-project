/**
 * @file Implements tests for tuit2tags API
 */
import {createTuitByUser, deleteTuitByTuitText, findTuitById} from "../services/tuits-service";
import {findAllTuitsDislikedByUser, userTogglesTuitDislikes} from "../services/dislikes-service";
import {userTogglesTuitLikes} from "../services/likes-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";
import {findTuitsWithTag} from "../services/tuit2tags-service";
import {deleteTag} from "../services/tags-service";


describe("can retrieve all tuit2tags with REST API", () => {
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
        promises.push(deleteTuitByTuitText(mockedTuit1.tuit));
        promises.push(deleteTuitByTuitText(mockedTuit2.tuit));
        promises.push(deleteTuitByTuitText(mockedTuit3.tuit));

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
        promises.push(deleteTuitByTuitText(mockedTuit1.tuit));
        promises.push(deleteTuitByTuitText(mockedTuit2.tuit));
        promises.push(deleteTuitByTuitText(mockedTuit3.tuit));

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

/*describe('user can dislike tuit with REST API', () => {
    // Mocked tuit to insert
    const mockedTuit = {
        tuit: "test tuit for user can dislike tuit with REST API",
        postedOn: "2022-02-02T00:00:00.000Z"
    }

    // Mocked user to insert
    const rigby = {
        username: 'eleanorrigby',
        password: '70swereatime',
        email: 'eleanorrigby@beatles.com'
    }

    // Initialize test variables
    let uid = null;
    let tid = null;
    let testTuit = null;

    // Set up tests
    beforeAll(async () => {
        let promises = [];  // Initialize an empty list of promises

        // Add promise to remove users with test username to list of promises
        promises.push(deleteUsersByUsername(rigby.username));

        // Add promise to remove tuits with test text to list of promises
        promises.push(deleteTuitByTuitText(mockedTuit.tuit));

        await Promise.all(promises);    // Wait for all promises to be fulfilled

        // Create a new user with mocked user and store their id
        const author = await createUser(rigby);
        uid = author._id;

        // Create a new tuit by user with mocked tuit/user and store its id
        testTuit = await createTuitByUser(author._id, mockedTuit);
        tid = testTuit._id;
    })

    // Clean up after tests
    afterAll(async () => {
        // If the tuit had dislikes...
        if (testTuit.stats.dislikes > 0) {
            // Remove the dislike using the toggle function
            await userTogglesTuitDislikes(uid, tid);
        }

        let promises = []   // Initialize an empty list of promises

        // Add promise to delete users by username to list of promises
        promises.push(deleteUsersByUsername(rigby.username));

        // Add promise to delete tuits by tuit text to list of promises
        promises.push(deleteTuitByTuitText(mockedTuit.tuit));

        // Wait for and return the result of all promises
        return Promise.all(promises);
    })

    test("user can dislike a tuit", async () => {
        // Test tuit should have 0 dislikes to start
        expect(testTuit.stats.dislikes).toEqual(0);

        // Dislike the tuit with dislike toggle function
        const dislike = await userTogglesTuitDislikes(uid, tid);

        testTuit = await findTuitById(tid);  // Retrieve the disliked tuit

        // Test tuit should now have 1 dislike
        expect(testTuit.stats.dislikes).toEqual(1);
    })

});

describe('user can undislike a tuit with REST API '
    + 'if they already disliked the tuit', () => {
    // Mocked tuit to insert
    const mockedTuit = {
        tuit: "test tuit for user can undislike a tuit with REST API "
            + "if they already disliked the tuit",
        postedOn: "2022-02-02T00:00:00.000Z"
    }

    // Mocked user to insert
    const rigby = {
        username: 'eleanorrigby',
        password: '70swereatime',
        email: 'eleanorrigby@beatles.com'
    }

    // Initialize test variables
    let uid = null;
    let tid = null;
    let testTuit = null;

    // Set up tests
    beforeAll(async () => {
        let promises = [];  // Initialize an empty list of promises

        // Add promise to remove users with test username to list of promises
        promises.push(deleteUsersByUsername(rigby.username));

        // Add promise to remove tuits with test text to list of promises
        promises.push(deleteTuitByTuitText(mockedTuit.tuit));

        await Promise.all(promises);    // Wait for all promises to be fulfilled

        // Create a new user with mocked user and store their id
        const author = await createUser(rigby);
        uid = author._id

        // Create a new tuit by user with mocked tuit/user and store its id
        testTuit = await createTuitByUser(author._id, mockedTuit);
        tid = testTuit._id;

        // Have user dislike the tuit so it may be undisliked in the test
        const dislike = await userTogglesTuitDislikes(uid, tid);
    })

    // Clean up after tests
    afterAll(async () => {
        // If the tuit had dislikes...
        if (testTuit.stats.dislikes > 0) {
            // Remove the dislike using the toggle function
            await userTogglesTuitDislikes(uid, tid);
        }

        let promises = [];  // Initialize an empty list of promises

        // Add promise to remove users with test username to list of promises
        promises.push(deleteUsersByUsername(rigby.username));

        // Add promise to remove tuits with test text to list of promises
        promises.push(deleteTuitByTuitText(mockedTuit.tuit));

        await Promise.all(promises);    // Wait for all promises to be fulfilled
    })

    test("user can un-dislike a tuit "
        + "if they already disliked the tuit",async () => {
        testTuit = await findTuitById(tid);  // Retrieve the disliked tuit

        // Test tuit should have 1 dislike to start from the test set-up
        expect(testTuit.stats.dislikes).toEqual(1);

        // Undislike tuit
        const unDislikeTuit = await userTogglesTuitDislikes(uid, tid);

        testTuit = await findTuitById(tid);  // Retrieve the undisliked tuit

        // Test tuit should now have 0 dislikes
        expect(testTuit.stats.dislikes).toEqual(0);
    })
})

describe("user can dislike a tuit with REST API "
    + "if they already liked the tuit", () => {
    // Mocked tuit to insert
    const mockedTuit = {
        tuit: "test tuit for user can dislike a tuit with REST API "
            + "if they already liked the tuit",
        postedOn: "2022-02-02T00:00:00.000Z"
    }

    // Mocked user to insert
    const rigby = {
        username: 'eleanorrigby',
        password: '70swereatime',
        email: 'eleanorrigby@beatles.com'
    }

    // Initialize test variables
    let uid = null;
    let tid = null;
    let testTuit = null;

    // Set up tests
    beforeAll(async () => {
        let promises = [];  // Initialize an empty list of promises

        // Add promise to remove users with test username to list of promises
        promises.push(deleteUsersByUsername(rigby.username));

        // Add promise to remove tuits with test text to list of promises
        promises.push(deleteTuitByTuitText(mockedTuit.tuit));

        await Promise.all(promises);    // Wait for all promises to be fulfilled

        // Create a new user with mocked user and store their id
        const author = await createUser(rigby);
        uid = author._id

        // Create a new tuit by user with mocked tuit/user and store its id
        testTuit = await createTuitByUser(author._id, mockedTuit);
        tid = testTuit._id;

        // Have user like the tuit so it may be disliked in the test
        const likeTuit = await userTogglesTuitLikes(uid, tid);
    })

    // Clean up after tests
    afterAll(async () => {
        // If the tuit had dislikes...
        if (testTuit.stats.dislikes > 0) {
            // Remove the dislike using the toggle function
            await userTogglesTuitDislikes(uid, tid);
        }
        let promises = [];  // Initialize an empty list of promises

        // Add promise to remove users with test username to list of promises
        promises.push(deleteUsersByUsername(rigby.username));

        // Add promise to remove tuits with test text to list of promises
        promises.push(deleteTuitByTuitText(mockedTuit.tuit));

        await Promise.all(promises);    // Wait for all promises to be fulfilled
    })

    test("user can dislike a tuit with REST API "
        + "if they already liked the tuit",async () => {

        testTuit = await findTuitById(tid);  // Retrieve the liked tuit

        /!*
        Test tuit should have 1 like and 0 dislikes to start
        from the test set-up
         *!/
        expect(testTuit.stats.likes).toEqual(1);
        expect(testTuit.stats.dislikes).toEqual(0);

        // Dislike tuit
        const dislikeTuit = await userTogglesTuitDislikes(uid, tid);

        testTuit = await findTuitById(tid);  // Retrieve the disliked tuit

        // Test tuit should now have 0 likes and 1 dislike
        expect(testTuit.stats.likes).toEqual(0);
        expect(testTuit.stats.dislikes).toEqual(1);
    })
})*/

