/**
 * @file Implements test for rendering Tuit stats correctly
 */
import {act, create} from 'react-test-renderer';
import TuitStats from "../components/tuits/tuit-stats";

test('stats render correctly', () => {
    let stats = {
        likes: 123,
        replies: 234,
        retuits: 345
    }

    const toggleLikes = () => {
        act(() => {
            stats.likes++;
            tuitStats.update(
                <TuitStats
                    tuit={{stats: stats}}
                    toggleLikes={() => {}}
                />)
        })
    }

    let tuitStats
    act(() => {
        tuitStats = create(
            <TuitStats
                toggleLikes={toggleLikes}
                tuit={{stats: stats}}/>
        );
    })

    const root = tuitStats.root;
    const likesCounter = root.findByProps({className: 'ttr-stats-likes'})
    const retuitsCounter = root.findByProps({className: 'ttr-stats-retuits'})
    const repliesCounter = root.findByProps({className: 'ttr-stats-replies'})
    const toggleLikesButton = root.findByProps(
        {className: 'ttr-like-tuit-click'})

    let likesText = likesCounter.children[0];
    const repliesText = repliesCounter.children[0];
    const retuitsText = retuitsCounter.children[0];
    expect(likesText).toBe('123');
    expect(repliesText).toBe('234');
    expect(retuitsText).toBe('345');

    act(() => {toggleLikesButton.props.onClick()})
    likesText = likesCounter.children[0];
    expect(likesText).toBe('124');
});