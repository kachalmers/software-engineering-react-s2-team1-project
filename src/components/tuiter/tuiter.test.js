import React from "react";
import {
    fireEvent,
    render,
    screen,
    click,
    act,
    waitFor
} from '@testing-library/react';
import Tuiter from "./index";
import '@testing-library/jest-dom'

// jest.mock("react-router-dom", () => ({
//     ...jest.requireActual("react-router-dom"),
//     useLocation: jest.fn(),
// }));
const links = [
    {label: 'Tuiter', expect: {textOnScreen: 'Home Screen'}, icon: 'fa-square-t', path: '/tuiter'},
    {label: 'Home', expect: {textOnScreen: 'Home Screen'}, icon: 'fa-home', path: '/home'},
    {label: 'Explore', expect: {textOnScreen: 'Explore Screen'}, icon: 'fa-hashtag', path: '/explore'},
    {label: 'Notifications', expect: {textOnScreen: 'Notifications Screen'}, icon: 'fa-bell', path: '/notifications'},
    {label: 'Messages', expect: {textOnScreen: 'Messages Screen'}, icon: 'fa-envelope', path: '/messages'},
    {label: 'Bookmarks', expect: {textOnScreen: 'Bookmarks Screen'}, icon: 'fa-bookmark', path: '/bookmarks'},
    {label: 'Lists', expect: {textOnScreen: 'Lists Screen'}, icon: 'fa-list', path: '/lists'},
    {label: 'Profile', expect: {textOnScreen: 'Edit Profile'}, icon: 'fa-user', path: '/profile'},
    {label: 'More', expect: {textOnScreen: 'More Screen'}, icon: 'fa-circle-ellipsis', path: '/more'},
    {label: 'Login', expect: {textOnScreen: 'ellenripley'}, icon: 'fa-user', path: '/login'},
];

describe('test123', () => {
    beforeEach(() => {
        act(() => {
            render(<Tuiter/>)
        });
    });
    links.forEach((link, nth) => {
        const testName = `Clicking on ${link.label} navigates to new screen`;
        test(testName, async () => {
            act(() => {
                // get all the links
                const a = document.querySelectorAll("a");
                // click on the nth link
                fireEvent.click(a[nth]);
            })
            // const regex = new RegExp(link.expect.textOnScreen, "i");
            // const linkElement = await screen.getByText(regex);
            // expect(linkElement).toBeInTheDocument();

            await waitFor(() => {
                const regex = new RegExp(link.expect.textOnScreen, "i");
                const linkElement = screen.getByText(regex);
                expect(linkElement).toBeInTheDocument();
            });
        });
    });
});
