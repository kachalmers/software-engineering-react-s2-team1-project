import {
    createTuitByUser,
    deleteTuitByContent,
    findTuitById,
    findAllTuits
} from "../services/tuits-service"

import {createUser,
    deleteUsersByUsername
} from "../services/users-service";

describe('can create tuit with REST API', () => {
    // sample tuit to insert
    const sampleTuit = {
        tuit: "Unique sample tuit for test!",
        postedOn: "2022-03-09T00:00:00.000Z"
    }

    // sample user to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    }

    // setup test before running test
    beforeAll(()=> {
        let promises = []
        // remove any/all users to make sure we create it in the test
        // this user is used as the author of the tuit
        promises.push(deleteUsersByUsername(ripley.username));
        // remove any/all tuits to make sure we create it in the test
        promises.push(deleteTuitByContent(sampleTuit.tuit));
        return Promise.all(promises);
    })

    // clean up after test runs
    afterAll(()=> {
        let promises = []
        // remove any data we created
        promises.push(deleteUsersByUsername(ripley.username));
        promises.push(deleteTuitByContent(sampleTuit.tuit));
        return Promise.all(promises);
    })

    test('can insert new users with REST API', async () => {
        // insert new user in the database
        // this user will be the author of the tuit
        const author = await createUser(ripley);
        // insert new tuit in the database
        const newTuit = await createTuitByUser(author._id, sampleTuit);

        // verify inserted tuit's properties match parameter tuit
        expect(newTuit.tuit).toEqual(sampleTuit.tuit);
        expect(newTuit.postedOn).toEqual(sampleTuit.postedOn);
        expect(newTuit.postedBy).toEqual(author._id);
    })
});

describe('can delete tuit with REST API', () => {
    // sample tuit to delete
    const sample = {
        tuit: "Sample tuit for test"
    }

    // sample user to insert
    // This is author of the tuit to be deleted
    const sowell = {
        username: 'thommas_sowell',
        password: 'compromise',
        email: 'compromise@solutions.com'
    };

    // set up the tests before verification
    beforeAll(async ()=> {
        // insert the sample tuit we then try to remove
        const newUser = await createUser(sowell);
        return createTuitByUser(newUser._id, sample);
    })

    // clean up after test runs
    afterAll(()=> {
        let promises = []
        promises.push(deleteUsersByUsername(sowell.username));
        promises.push(deleteTuitByContent(sample.tuit));
        return Promise.all(promises);
    })

    test('can delete tuit from REST API by content', async ()=> {
        const status = await deleteTuitByContent(sample.tuit);
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    })
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    // sample tuit we want to retrieve
    const sample = {
        tuit: "Sample tuit for test",
        postedOn: "2022-03-09T00:00:00.000Z"
    }

    // sample user to insert as the author of the tuit
    const adam = {
        username: 'adam_smith',
        password: 'not0sum',
        email: 'wealth@nations.com'
    };

    //setup before running test
    beforeAll(()=>{
        let promises = [];
        promises.push(deleteUsersByUsername(adam.username));
        promises.push(deleteTuitByContent(sample.tuit));
        return Promise.all(promises);
    })

    // clean up after test runs
    afterAll(()=> {
        let promises = [];
        promises.push(deleteUsersByUsername(adam.username));
        promises.push(deleteTuitByContent(sample.tuit));
        return Promise.all(promises);
    })

    test('can retrieve tuit from REST API by primary key', async ()=> {
        // insert author of the tuit first
        const author = await createUser(adam);
        const newTuit = await createTuitByUser(author._id, sample);

        // verify new tuit matches the parameter tuit
        expect(newTuit.tuit).toEqual(sample.tuit);
        expect(newTuit.postedOn).toEqual(sample.postedOn);
        expect(newTuit.postedBy).toEqual(author._id);

        // retrieve the tuit from the database by its primary key
        const existingTuit = await findTuitById(newTuit._id);

        // verify retrieved tuit matches parameter tuit
        expect(existingTuit.tuit).toEqual(sample.tuit);
        expect(existingTuit.postedOn).toEqual(sample.postedOn);
        expect(existingTuit.postedBy._id).toEqual(author._id);
    })
});

describe('can retrieve all tuits with REST API', () => {
    // samples tuits we'll insert to then retrieve
    const tuitContents = [
        "Sample 1", "Sample 2", "Sample 3"
    ]

    // sample user to insert as the author of tuits
    const adam = {
        username: 'adam_smith',
        password: 'not0sum',
        email: 'wealth@nations.com'
    };

    // setup data before test
    beforeAll(() => {
        let promises = [];
        // delete the user we inserted
        promises.push(deleteUsersByUsername(adam.username));
        // delete tuits we inserted
        tuitContents.map(content => {
            promises.push(deleteTuitByContent(content));
        })
        return Promise.all(promises);
    })

    // clean up after test runs
    afterAll(()=> {
        let promises = []
        // delete the user we inserted
        promises.push(deleteUsersByUsername(adam.username));
        // delete tuits we inserted
        tuitContents.map((content) => {
            let deletePromise = deleteTuitByContent(content);
            promises.push(deletePromise)
        })
        return Promise.all(promises)
    })

    test('can retrieve all tuits from REST API', async () => {
        // insert a user first as the author of the tuits
        const author = await createUser(adam);
        // insert several tuits
        tuitContents.map(content => {
            createTuitByUser(author._id, {tuit: content, postedOn: "2022-03-09T00:00:00.000Z"});
        })
        // retrieve all tuits
        const tuits = await findAllTuits();

        // there should be a minimum number of tuits
        expect(tuits.length).toBeGreaterThanOrEqual(tuitContents.length);

        // let's check each tuit we inserted
        const tuitsWeInserted = tuits.filter(
            eachTuit => tuitContents.indexOf(eachTuit.tuit) >= 0);

        // compare the actual tuits in database with ones we sent
        tuitsWeInserted.forEach(tuit => {
            const content = tuitContents.find(cont => cont === tuit.tuit);
            expect(tuit.tuit).toEqual(content);
            expect(tuit.postedOn).toEqual("2022-03-09T00:00:00.000Z")
            expect(tuit.postedBy._id).toEqual(author._id)
        })
    })
});