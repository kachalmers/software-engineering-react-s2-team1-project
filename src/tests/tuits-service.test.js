import {
    createTuitByUser,
    deleteTuitByTuitText,
    findTuitById,
    findAllTuits
} from "../services/tuits-service"

import {createUser,
    deleteUsersByUsername
} from "../services/users-service";

describe('can create tuit with REST API', () => {
    const testTuit = {
        tuit: "test tuit for can create tuit with REST API",
        postedOn: "2022-03-30T00:00:00.000Z"
    }

    // Mocked user
    const ripley = {
        username: 'janedoe',
        password: 'foxm888',
        email: 'janedoe@xfiles.com'
    }

    // Set up tests
    beforeAll(()=> {
        let promises = []
        promises.push(deleteUsersByUsername(ripley.username));
        promises.push(deleteTuitByTuitText(testTuit.tuit));
        return Promise.all(promises);
    })

    // Clean up after tests
    afterAll(()=> {
        let promises = []
        promises.push(deleteUsersByUsername(ripley.username));
        promises.push(deleteTuitByTuitText(testTuit.tuit));
        return Promise.all(promises);
    })

    test('can insert new users with REST API', async () => {
        const author = await createUser(ripley);
        const newTuit = await createTuitByUser(author._id, testTuit);

        expect(newTuit.tuit).toEqual(testTuit.tuit);
        expect(newTuit.postedOn).toEqual(testTuit.postedOn);
        expect(newTuit.postedBy).toEqual(author._id);
    })
});

describe('can delete tuit with REST API', () => {
    // Mocked tuit
    const testTuit = {
        tuit: "test tuit for can delete tuit with REST API"
    }

    // Mocked user to post tuit
    const barney = {
        username: 'barney_dinosaur',
        password: 'tieYourShoes',
        email: 'countWithMe@123.com'
    };

    // Set up tests
    beforeAll(async ()=> {
        const newUser = await createUser(barney);
        return createTuitByUser(newUser._id, testTuit);
    })

    // Clean up after tests
    afterAll(()=> {
        let promises = []
        promises.push(deleteUsersByUsername(barney.username));
        promises.push(deleteTuitByTuitText(testTuit.tuit));
        return Promise.all(promises);
    })

    test('can delete tuit from REST API by text', async ()=> {
        // Delete tuits
        const status = await deleteTuitByTuitText(testTuit.tuit);
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    })
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    // Mocked tuit
    const testTuit = {
        tuit: "test tuit for can retrieve a tuit by their primary "
              + "key with REST API",
        postedOn: "2022-03-30T00:00:00.000Z"
    }

    // Mocked user
    const albert = {
        username: 'unwell_alligator',
        password: 'ate2muchchickn',
        email: 'swimmy@swim.com'
    };

    // Set up test
    beforeAll(()=>{
        let promises = [];

        // Remove users with test username and tuits with test text
        promises.push(deleteUsersByUsername(albert.username));
        promises.push(deleteTuitByTuitText(testTuit.tuit));

        return Promise.all(promises);   // Wait for promises to be fulfilled
    })

    // Clean up after test
    afterAll(()=> {
        let promises = [];

        // Remove users with test username and tuits with test text
        promises.push(deleteUsersByUsername(albert.username));
        promises.push(deleteTuitByTuitText(testTuit.tuit));

        return Promise.all(promises);   // Wait for promises to be fulfilled
    })

    test('can retrieve tuit from REST API by primary key', async ()=> {
        // Create user to be the author of a tuit, then create tuit
        const author = await createUser(albert);
        const newTuit = await createTuitByUser(author._id, testTuit);

        // Check new tuit created with API matched test mocked tuit
        expect(newTuit.tuit).toEqual(testTuit.tuit);
        expect(newTuit.postedOn).toEqual(testTuit.postedOn);
        expect(newTuit.postedBy).toEqual(author._id);

        // Retrieve tuit by its primary key
        const existingTuit = await findTuitById(newTuit._id);

        // Expect existing tuit to match test mocked tuit
        expect(existingTuit.tuit).toEqual(testTuit.tuit);
        expect(existingTuit.postedOn).toEqual(testTuit.postedOn);
        expect(existingTuit.postedBy._id).toEqual(author._id);
    })
});

describe('can retrieve all tuits with REST API', () => {
    // Create test tuits
    const tuitText = [
        "test tuit 1 for can retrieve all tuits with REST API",
        "test tuit 2 for can retrieve all tuits with REST API",
        "test tuit 3 for can retrieve all tuits with REST API"
    ]

    // Mocked user
    const beef = {
        username: 'james_obloy',
        password: 'beef0105',
        email: 'beef@oklahoma.com'
    };

    // Set up test
    beforeAll(() => {
        let promises = [];

        // Delete users with existing username so we can start from scratch
        promises.push(deleteUsersByUsername(beef.username));

        // Delete tuits with testTuit tuit text
        tuitText.map(text => {
            promises.push(deleteTuitByTuitText(text));
        })
        return Promise.all(promises);
    })

    // Clean up after tests
    afterAll(()=> {
        let promises = []

        // Delete users with username of mocked user
        promises.push(deleteUsersByUsername(beef.username));

        // Delete tuits with same text as mocked tuit
        tuitText.map((text) => {
            let deletePromise = deleteTuitByTuitText(text);
            promises.push(deletePromise)
        })

        return Promise.all(promises)    // Wait for all promises to be fulfilled
    })

    test('can retrieve all tuits from REST API', async () => {
        // Insert mocked user into database
        const author = await createUser(beef);

        // Insert each mocked tuit into database
        tuitText.map(text => {
            createTuitByUser(author._id,
                             {tuit: text,
                postedOn: "2022-03-14T00:00:00.000Z"});
        })

        // Find and store all tuits
        const tuits = await findAllTuits();

        // We should find at least as many tuits as we inserted
        expect(tuits.length).toBeGreaterThanOrEqual(tuitText.length);

        // Check each tuit we inserted is in the database
        const tuitsWeInserted = tuits.filter(
            eachTuit => tuitText.indexOf(eachTuit.tuit) >= 0);

        // Compare tuits in database with mocked tuits
        tuitsWeInserted.forEach(tuit => {
            const text = tuitText.find(cont => cont === tuit.tuit);
            expect(tuit.tuit).toEqual(text);
            expect(tuit.postedOn).toEqual("2022-03-14T00:00:00.000Z")
            expect(tuit.postedBy._id).toEqual(author._id)
        })
    })
});