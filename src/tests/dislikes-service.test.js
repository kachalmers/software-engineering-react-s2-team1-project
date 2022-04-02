/**
 * @file Implements tests for dislikes API
 */
import {createTuitByUser, deleteTuitByTuitText, findTuitById} from "../services/tuits-service";
import {findAllTuitsDislikedByUser, userTogglesTuitDislikes} from "../services/dislikes-service";
import {userTogglesTuitLikes} from "../services/likes-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";

describe('user can dislike tuit with REST API', () => {
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

        /*
        Test tuit should have 1 like and 0 dislikes to start
        from the test set-up
         */
        expect(testTuit.stats.likes).toEqual(1);
        expect(testTuit.stats.dislikes).toEqual(0);

        // Dislike tuit
        const dislikeTuit = await userTogglesTuitDislikes(uid, tid);

        testTuit = await findTuitById(tid);  // Retrieve the disliked tuit

        // Test tuit should now have 0 likes and 1 dislike
        expect(testTuit.stats.likes).toEqual(0);
        expect(testTuit.stats.dislikes).toEqual(1);
    })
})

describe("can retrieve all tuits disliked by user with REST API", () => {
    // Mocked tuits to insert
    const mockedTuit1 = {
        tuit: "test tuit 1 for can retrieve all tuits "
              + "disliked by user with REST API",
        postedOn: "2022-02-02T00:00:00.000Z"
    }

    const mockedTuit2 = {
        tuit: "test tuit 2 for can retrieve all tuits "
              + "disliked by user with REST API",
        postedOn: "2022-02-02T00:00:00.000Z"
    }
    const mockedTuit3 = {
        tuit: "test tuit 3 for can retrieve all tuits "
              + "disliked by user with REST API",
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
        promises.push(deleteUsersByUsername(rigby.username));
        promises.push(deleteTuitByTuitText(mockedTuit1.tuit));
        promises.push(deleteTuitByTuitText(mockedTuit2.tuit));
        promises.push(deleteTuitByTuitText(mockedTuit3.tuit));

        await Promise.all(promises);    // Wait for all promises to be fulfilled

        // Create a new user with mocked user and store their id
        const author = await createUser(rigby);
        uid = author._id

        // Create a new tuits by user with mocked tuits/user and store its id
        testTuit1 = await createTuitByUser(uid, mockedTuit1);
        testTuit2 = await createTuitByUser(uid, mockedTuit2);
        testTuit3 = await createTuitByUser(uid, mockedTuit3);
        tid1 = testTuit1._id
        tid2 = testTuit2._id;
        tid3 = testTuit3._id

        // Have user like the testTuit1
        const likeTuit = await userTogglesTuitLikes(uid, tid1);

        // Have user dislike testTuit2 and testTuit3
        await userTogglesTuitDislikes(uid, tid2);
        await userTogglesTuitDislikes(uid, tid3);
    })

    // Clean up after tests
    afterAll(async () => {
        // Retrieve testTuit1, 2, and 3 by their ids
        testTuit1 = await findTuitById(tid1);
        testTuit2 = await findTuitById(tid2);
        testTuit3 = await findTuitById(tid3);

        // If testTuit1 has a like...
        if (testTuit1.stats.likes > 0) {
            // Unlike testTuit1
            await userTogglesTuitLikes(uid, tid1);
        }

        // If testTuit2 has a dislike...
        if (testTuit2.stats.dislikes > 0) {
            // Undislike the tuit
            await userTogglesTuitDislikes(uid, tid2);
        }

        // If testTuit3 has a dislike...
        if (testTuit3.stats.dislikes > 0) {
            // Undislike the tuit
            await userTogglesTuitDislikes(uid, tid3);
        }

        let promises = [];  // Initialize an empty list of promises

        /*
        Add promises to remove users with test username and
        remove tuits with test texts to list of promises
        */
        promises.push(deleteUsersByUsername(rigby.username));
        promises.push(deleteTuitByTuitText(mockedTuit1.tuit));
        promises.push(deleteTuitByTuitText(mockedTuit2.tuit));
        promises.push(deleteTuitByTuitText(mockedTuit3.tuit));

        // Wait for and return the result of all promises
        return Promise.all(promises);
    })

    test("can retrieve all tuits disliked by user with REST API", async () => {
        // Find and store all disliked tuits
        const dislikedTuits = await findAllTuitsDislikedByUser(uid);

        // The number of disliked tuits should be > 2 (at least testTuits 2 and 3)
        expect(dislikedTuits.length).toBeGreaterThanOrEqual(2);

        const likedTuitsId = [tid1];    // store id of liked tuit
        const dislikedTuitsId = [tid2, tid3];   // store ids of disliked tuits

        // For each disliked tuit...
        dislikedTuits.forEach((tuit) => {
            // Check for tuit id in list of disliked tuit ids
            expect(dislikedTuitsId.indexOf(tuit._id)).toBeGreaterThanOrEqual(0);
        })

        // For each disliked tuit...
        dislikedTuits.forEach((tuit) => {
            // Check that tuit id is not in list of liked tuit ids
            expect(likedTuitsId.indexOf(tuit._id)).toBeLessThanOrEqual(-1);
        })

    })
})