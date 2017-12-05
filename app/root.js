import React from 'react';
import Pubsub from 'pubsub-js';
import Header from './components/header';
import Player from './page/player';
import MusicList from './page/musicList';
import { MUSIC_LIST } from './config/musicList';
import {
    HashRouter as Router,
    Switch,
    Link,
    Route
} from 'react-router-dom';

let duration;

export default class Root extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            musicList: MUSIC_LIST,
            currentMusicItem: MUSIC_LIST[0]
        
        }
        this.playMusic = this.playMusic.bind(this);
        this.findMusicIndex = this.findMusicIndex.bind(this);
        this.playMusic = this.playMusic.bind(this)
    }

    playMusic(music){
        $('#player').jPlayer('setMedia', {
            mp3: music.file
        }).jPlayer('play');
        this.setState({
            currentMusicItem: music
        });
    }

    findMusicIndex(music){
        return this.state.musicList.indexOf(music);
    }

    playNext(type = 'next'){
        let index = this.findMusicIndex(this.state.currentMusicItem);
        let newIndex = null;
        let musicListLength = this.state.musicList.length;
        if(type === 'next'){
            newIndex = (index + 1) % musicListLength;
        }else{
            newIndex = (index - 1 + musicListLength) % musicListLength
        }
        this.playMusic(this.state.musicList[newIndex]);
    }

    componentDidMount(){
        $('#player').jPlayer({
            supplied: 'mp3',
            wmode: 'window'
        });
        $('#player').bind($.jPlayer.event.ended, () => {
            this.playNext();
        });
        this.playMusic(this.state.currentMusicItem);
        Pubsub.subscribe('PLAY_PREV', () => this.playNext('prev'));
        Pubsub.subscribe('PLAY_NEXT', () => this.playNext('next'));
        Pubsub.subscribe('PLAY_MUSIC', (event, music) => this.playMusic(music));
        Pubsub.subscribe('DELETE_MUSIC', (event, music) => this.setState({
            musicList: this.state.musicList.filter( item => item.id !== music.id )
        }));
    }

    componentWillUnmount(){
        Pubsub.clearAllSubscrption();
    }

    render(){
        return <div>
            <Header />
            <Router>
                <Switch>
                    <Route exact path="/" render={ () => (<Player onPlayNextMusic={this.playNext} currentMusicItem={this.state.currentMusicItem} />) } />
                    <Route path="/list" render={ () => (<MusicList musicList={this.state.musicList} currentMusicItem={this.state.currentMusicItem} />) } />
                </Switch>
            </Router>
        </div>
    }
}