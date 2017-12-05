import React from 'react';
import './music-list-item.less';
import Pubsub from 'pubsub-js';

export default class MusicListItem extends React.Component {

    playMusic(musicItem){
        Pubsub.publish('PLAY_MUSIC', musicItem); 
    }

    deleteMusic(musicItem, e){
        e.stopPropagation();
        Pubsub.publish('DELETE_MUSIC', musicItem); 
    }

    render(){
        let musicItem = this.props.musicItem;
        return <li className={`components-musiclistitem ${this.props.focus ? 'focus' : ''} row`}
                onClick={this.playMusic.bind(this, musicItem)}>
            <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
            <p className="-col-auto delete"
            onClick={this.deleteMusic.bind(this, musicItem)}></p>
        </li>
    }
}