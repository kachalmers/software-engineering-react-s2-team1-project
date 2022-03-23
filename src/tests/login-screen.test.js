import axios from 'axios';
import {
  createUser,
  deleteUsersByUsername, findAllUsers,
  findUserById
} from "../services/users-service";
import services from "./services";
import {Login} from "../components/profile/login";
import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import Tuiter from "../components/tuiter";
import React from "react";

jest.mock("axios");

const MOCKED_USERS = [
  {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com'},
  {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com'},
]

test("mocked hello world axios works", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ data: {message: 'hello world'} }));
  const response = await axios.get();
  expect(response.data.message).toEqual('hello world')
});

describe('sss', () => {
  test("mocked hello world axios works", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: {message: 'hello world'} }));
    const response = await axios.get();
    expect(response.data.message).toEqual('hello world')
  });
})

test("find all users mock works", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ data: {users: MOCKED_USERS} }));
  const response = await services.findAllUsers();
  const users = response.users;
  expect(users.length).toEqual(MOCKED_USERS.length);
  users.forEach((user, nth) => {
    expect(user.username).toEqual(MOCKED_USERS[nth].username);
  });
});

describe('fff', () => {
  test("find all users mock works", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: {users: MOCKED_USERS} }));
    const response = await services.findAllUsers();
    const users = response.users;
    expect(users.length).toEqual(MOCKED_USERS.length);
    users.forEach((user, nth) => {
      expect(user.username).toEqual(MOCKED_USERS[nth].username);
    });
  });
})

describe('www', () => {
  beforeEach(() => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: {users: MOCKED_USERS} }));

    act(() => {
      render(<Tuiter/>)
    });
  });


  test("login renders users", async () => {
    // console.log(qwe);
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: {users: MOCKED_USERS} }));

    await act(async () => {
      // get all the links
      // const a = document.querySelectorAll("a#Login");
      const a = await screen.getByText(/Login/i);
      // console.log(a);
      // click on the nth link
      fireEvent.click(a);
    })

    await waitFor(() => {
      // const regex = new RegExp(link.expect.textOnScreen, "i");
      const linkElement = screen.getByText(/bob/i);
      expect(linkElement).toBeInTheDocument();
    });


    // act(() => {
    //   const loginLink = screen.getByText(/Login/i);
    //   console.log(loginLink)
    //   // // get all the links
    //   // const a = document.querySelectorAll("a");
    //   // // click on the nth link
    //   // fireEvent.click(a[nth]);
    // })

    // ;
    // await waitFor(() => {
    //   const linkElement = screen.getByText(/ellenripley/i);
    //   expect(linkElement).toBeInTheDocument();
    // });

    // expect(await screen.getByText(/ellen_ripley/i)).toBeInTheDocument();

    // const {container} = render(
    //   <HashRouter>
    //     <Login/>
    //   </HashRouter>
    // );


    // act(() => {
    //   render(
    //     <HashRouter>
    //       <Login/>
    //     </HashRouter>
    //   )
    // });
    //
    // const a = document.querySelectorAll("a");
    //
    //   console.log(a);

    // await waitFor(async () => {
    //   await screen.getByText(/ellen_ripley/i);
    //   expect(user).toBeInTheDocument();
    // }, {timeout: 5000});

    // screen.getByText(/ellen_ripley/i)
    //   .then(ddd => {
    //     console.log(ddd)
    //     // expect(user).toBeInTheDocument();
    //   })
  });
});

describe('createUser', () => {


  // axios.get.mockResolvedValue(resp);
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  jest.mock('axios', () => ({
    get: jest.fn((url) => {
      return new Promise((resolve) => {
        const ripley = {
          username: 'ellenripley',
          password: 'lv426',
          email: 'ellenripley@aliens.com'
        };
        const users = [ripley];
        const resp = {data: users};
        resolve(resp);
      })
    })
  }))

  test('user service can insert new users in database', async () => {

    act(() => {
      render(
        <HashRouter>
          <Login/>
        </HashRouter>
      );
    });

    const user = screen.getByText(/ellenripley/i);
    expect(user).toBeInTheDocument();

  });
});

describe('deleteUsersByUsername', () => {

  const sowell = {
    username: 'thommas_sowell',
    password: 'compromise',
    email: 'compromise@solutions.com'
  };

  // setup the tests before verification
  beforeAll(() => {
    return createUser(sowell);
  });

  test('user service can delete users by their username', async () => {
    // delete a user by their username. Assumes user already exists
    const status = await deleteUsersByUsername(sowell.username);

    // verify we deleted at least one user by their username
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });
});

describe('findUserById',  () => {

  const adam = {
    username: 'adam_smith',
    password: 'not0sum',
    email: 'wealth@nations.com'
  };

  beforeAll(() => {
    // clean up before the test making sure the user doesn't already exist
    return deleteUsersByUsername(adam.username)
  })

  afterAll(() => {
    // clean up after ourselves
    return deleteUsersByUsername(adam.username);
  });

  test('user service can retrieve user from database', async () => {
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

  const usernames = [
    "larry", "curley", "moe"
  ];

  // setup
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

  afterAll(() =>
    // delete the users we inserted
    usernames.map(username =>
      deleteUsersByUsername(username)
    )
  );

  test('user service can retrieve all users from database', async () => {

    const users = await findAllUsers();

    expect(users.length).toBeGreaterThanOrEqual(usernames.length);

    const usersWeInserted = users.filter(
      user => usernames.indexOf(user.username) >= 0);

    usersWeInserted.forEach(user => {
      const username = usernames.find(username => username === user.username);
      expect(user.username).toEqual(username);
      expect(user.password).toEqual(`${username}123`);
      expect(user.email).toEqual(`${username}@stooges.com`);
    });
  });
});
