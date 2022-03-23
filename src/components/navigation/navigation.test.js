import React from 'react';
import {fireEvent, render, screen, click} from '@testing-library/react';
import Navigation from "./index";
import {BrowserRouter} from "react-router-dom";
import '@testing-library/jest-dom'

const links = [
    {label: 'Tuiter', expect: {textOnScreen: 'Home'}, icon: 'fa-square-t', path: '/tuiter'},
    {label: 'Home', expect: {textOnScreen: 'Home'}, icon: 'fa-home', path: '/home'},
    {label: 'Explore', expect: {textOnScreen: 'Explore Screen'}, icon: 'fa-hashtag', path: '/explore'},
    {label: 'Notifications', expect: {textOnScreen: 'Notifications Screen'}, icon: 'fa-bell', path: '/notifications'},
    {label: 'Messages', expect: {textOnScreen: 'Messages Screen'}, icon: 'fa-envelope', path: '/messages'},
    {label: 'Bookmarks', expect: {textOnScreen: 'Bookmarks Screen'}, icon: 'fa-bookmark', path: '/bookmarks'},
    {label: 'Lists', expect: {textOnScreen: 'Lists Screen'}, icon: 'fa-list', path: '/lists'},
    {label: 'Profile', expect: {textOnScreen: 'Edit Profile'}, icon: 'fa-user', path: '/profile'},
    {label: 'More', expect: {textOnScreen: 'More Screen'}, icon: 'fa-circle-ellipsis', path: '/more'},
];

describe('test links', () => {
    // jest.spyOn(BrowserRouter, 'useLocation')
    //     .mockReturnValue({ pathname: '/tuiter' })
    beforeEach(() => {
        const {container} = render(
            <BrowserRouter>
                <Navigation/>
            </BrowserRouter>
        );
    })
    links.forEach((link, nth) => {
        const testName = `Clicking on ${link.label} highlights the link`;
        test(testName, () => {
            // get all the links
            const a = document.querySelectorAll("a");
            // click on the nth link
            fireEvent.click(a[nth]);
            // get all the line items
            const lis = document.querySelectorAll("li");
            // the line item should have class fw-bold to highlight
            expect(lis[nth].className
                .indexOf('fw-bold') >= 0).toBe(true);
        });
    })
    // const a = document.querySelector("a")
    // fireEvent.click(a);

    // const lis = document.querySelectorAll("li")
    // screen.findByTitle
    // console.log(element);
    // lis.forEach(li => {
    //     fireEvent.click(li)
    //    
    //     // click(li).then(result => console.log(result))
    //     console.log(li.className)
    // })
    // const liElements = container.querySelectorAll("li")
    // liElements.forEach((liElement, ndx) => {
    //     fireEvent.click(liElement,new MouseEvent('click', {
    //         bubbles: true,
    //         cancelable: true,
    //     }),);
    //     // liElement.click();
    //     test(`test link ${ndx}`, () => {
    //         expect(container.firstChild.classList.contains('fw-bold')).toBe(true)
    //     });
    // })
})

test('Navigation has Tuiter', () => {
    render(
        <BrowserRouter>
            <Navigation/>
        </BrowserRouter>
    );
    const linkElement = screen.getByText(/Tuiter/i);
    expect(linkElement).toBeInTheDocument();
});
