import React from 'react';
import MusicListItem from '../components/music-list-item';

export default class MusicList extends React.Component {
    render() {
        let musicItems = this.props.musicList.map( item =>
            <MusicListItem focus={item === this.props.currentMusicItem} key={item.id} musicItem={item} />
        );
        return (
            <ul>
                {musicItems}
            </ul>
        )
    }
}