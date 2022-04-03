import {
  createUser,
  deleteUsersByUsername,
  findAllUsers,
  findUserById
} from "../services/users-service";

describe('createUser', () => {
  // Mocked user
  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  };

  // Set up test
  beforeAll(() => {
    // Remove users with test user username
    return deleteUsersByUsername(ripley.username);
  })

  // Clean up after tests
  afterAll(() => {
    // Remove users with username of mocked user
    return deleteUsersByUsername(ripley.username);
  })

  test('can insert new users with REST API', async () => {
    const newUser = await createUser(ripley);

    expect(newUser.username).toEqual(ripley.username);
    expect(newUser.password).toEqual(ripley.password);
    expect(newUser.email).toEqual(ripley.email);
  });
});

describe('deleteUsersByUsername', () => {
  const sharpay = {
    username: 'sharpay_evans',
    password: 'fabulous',
    email: 'super@star.com'
  };

  // Set up test
  beforeAll(() => {
    return createUser(sharpay);
  });

  // Clean up tests
  afterAll(() => {
    // Delete users with mock user username
    return deleteUsersByUsername(sharpay.username);
  })

  test('can delete users from REST API by username', async () => {
    // Remove users with mock user username
    const status = await deleteUsersByUsername(sharpay.username);

    // Check we removed a user
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });
});

describe('findUserById',  () => {
  // Mocked user
  const john = {
    username: 'john_smith',
    password: 'goldizgud',
    email: 'adventure@beyond.com'
  };

  // Set up test
  beforeAll(() => {
    // Clear users with mock username
    return deleteUsersByUsername(john.username)
  });

  // Clean up tests
  afterAll(() => {
    // Remove users with mocked user username
    return deleteUsersByUsername(john.username);
  });

  test('can retrieve user from REST API by primary key', async () => {
    // Insert user into database
    const newUser = await createUser(john);

    // Check new user matches our mocked user
    expect(newUser.username).toEqual(john.username);
    expect(newUser.password).toEqual(john.password);
    expect(newUser.email).toEqual(john.email);

    // Find user by their primary key
    const existingUser = await findUserById(newUser._id);

    // Check user found with api matched our mocked user
    expect(existingUser.username).toEqual(john.username);
    expect(existingUser.password).toEqual(john.password);
    expect(existingUser.email).toEqual(john.email);
  });
});


describe('findAllUsers',  () => {

  // List of usernames
  const usernames = [
    "larry", "curley", "moe"
  ];

  // Set up test
  beforeAll(() => {
    // Insert users with usernames from our list of usernames
    let promises = []
    usernames.map((username) => {
      let createPromise = createUser({
                                       username,
                                       password: `${username}123`,
                                       email: `${username}@stooges.com`});
      promises.push(createPromise)
    })
    return Promise.all(promises);
  });

  // Clean up tests
  afterAll(() => {
    let promises = []
    // Remove users with usernames matching any we created for the test
    usernames.map((username) => {
      let deletePromise = deleteUsersByUsername(username);
      promises.push(deletePromise)
    })
    return Promise.all(promises)
  });

  test('can retrieve all users from REST API', async () => {
    // Retrieve all users
    const users = await findAllUsers();

    // Number of users should be at least as long as our usernames list
    expect(users.length).toBeGreaterThanOrEqual(usernames.length);

    // Get list of users we made that are in the database
    const usersWeInserted = users.filter(
      user => usernames.indexOf(user.username) >= 0);

    // Compare users from database with our mocked users we inserted
    usersWeInserted.forEach(user => {
      const username = usernames.find(username => username === user.username);
      expect(user.username).toEqual(username);
      expect(user.password).toEqual(`${username}123`);
      expect(user.email).toEqual(`${username}@stooges.com`);
    });
  });
});
