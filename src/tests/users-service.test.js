import {
  createUser,
  deleteUsersByUsername, findAllUsers,
  findUserById
} from "../services/users-service";

describe('createUser', () => {
  // sample user to insert
  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  };

  // setup test before running test
  beforeAll(() => {
    // remove any/all users to make sure we create it in the test
    return deleteUsersByUsername(ripley.username);
  })

  // clean up after test runs
  afterAll(() => {
    // remove any data we created
    return deleteUsersByUsername(ripley.username);
  })

  test('can insert new users with REST API', async () => {
    // insert new user in the database
    const newUser = await createUser(ripley);

    // verify inserted user's properties match parameter user
    expect(newUser.username).toEqual(ripley.username);
    expect(newUser.password).toEqual(ripley.password);
    expect(newUser.email).toEqual(ripley.email);
  });
});

describe('deleteUsersByUsername', () => {

  // sample user to delete
  const sowell = {
    username: 'thommas_sowell',
    password: 'compromise',
    email: 'compromise@solutions.com'
  };

  // setup the tests before verification
  beforeAll(() => {
    // insert the sample user we then try to remove
    return createUser(sowell);
  });

  // clean up after test runs
  afterAll(() => {
    // remove any data we created
    return deleteUsersByUsername(sowell.username);
  })

  test('can delete users from REST API by username', async () => {
    // delete a user by their username. Assumes user already exists
    const status = await deleteUsersByUsername(sowell.username);

    // verify we deleted at least one user by their username
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });
});

describe('findUserById',  () => {
  // sample user we want to retrieve
  const adam = {
    username: 'adam_smith',
    password: 'not0sum',
    email: 'wealth@nations.com'
  };

  // setup before running test
  beforeAll(() => {
    // clean up before the test making sure the user doesn't already exist
    return deleteUsersByUsername(adam.username)
  });

  // clean up after ourselves
  afterAll(() => {
    // remove any data we inserted
    return deleteUsersByUsername(adam.username);
  });

  test('can retrieve user from REST API by primary key', async () => {
    // insert the user in the database
    const newUser = await createUser(adam);

    // verify new user matches the parameter user
    expect(newUser.username).toEqual(adam.username);
    expect(newUser.password).toEqual(adam.password);
    expect(newUser.email).toEqual(adam.email);

    // retrieve the user from the database by its primary key
    const existingUser = await findUserById(newUser._id);

    // verify retrieved user matches parameter user
    expect(existingUser.username).toEqual(adam.username);
    expect(existingUser.password).toEqual(adam.password);
    expect(existingUser.email).toEqual(adam.email);
  });
});


describe('findAllUsers',  () => {

  // sample users we'll insert to then retrieve
  const usernames = [
    "larry", "curley", "moe"
  ];

  // setup data before test
  beforeAll(() =>
    // insert several known users
    usernames.map(username =>
      createUser({
        username,
        password: `${username}123`,
        email: `${username}@stooges.com`
      })
    )
  );

  // clean up after ourselves
  afterAll(() =>
    // delete the users we inserted
    usernames.map(username =>
      deleteUsersByUsername(username)
    )
  );

  test('can retrieve all users from REST API', async () => {
    // retrieve all the users
    const users = await findAllUsers();

    // there should be a minimum number of users
    expect(users.length).toBeGreaterThanOrEqual(usernames.length);

    // let's check each user we inserted
    const usersWeInserted = users.filter(
      user => usernames.indexOf(user.username) >= 0);

    // compare the actual users in database with the ones we sent
    usersWeInserted.forEach(user => {
      const username = usernames.find(username => username === user.username);
      expect(user.username).toEqual(username);
      expect(user.password).toEqual(`${username}123`);
      expect(user.email).toEqual(`${username}@stooges.com`);
    });
  });
});
