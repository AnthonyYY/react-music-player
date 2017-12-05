import React from 'react';
import Progress from '../components/progress';
import './player.less';
import { Link } from 'react-router-dom';

import Pubsub from 'pubsub-js';
let duration;

export default class Player extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            progress: 0,
            volume: 0,
            isPlaying: true,
            leftTime: ''
        }
        this.playOrPause = this.playOrPause.bind(this);
    }

    componentDidMount(){
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration;
            this.setState({
                volume:e.jPlayer.options.volume * 100,
                progress: e.jPlayer.status.currentPercentAbsolute,
                leftTime: this.formatTime(duration * (1-e.jPlayer.status.currentPercentAbsolute/100))
            });
        });
    }

    componentWillUnmount(){
        $('#player').unbind($.jPlayer.event.timeupdate);
    }

    changeProgressHandler(progress){
        $('#player').jPlayer('play', duration * progress);
    }

    changeVolumeHandler(progress){  
        $('#player').jPlayer('volume', progress);
    }

    formatTime(time){
        let seconds = Math.floor(time % 60);
        let minutes = Math.floor(time / 60);
        seconds < 10 ? `0${seconds}` : seconds;
        return `${minutes}:${seconds}`;
    }

    playPrev(){
        Pubsub.publish('PLAY_PREV');
    }

    playNext(){
        Pubsub.publish('PLAY_NEXT');
    }

    playOrPause() {
        if(this.state.isPlaying){
            $('#player').jPlayer('pause');
        }else{
            $('#player').jPlayer('play');
        }
        this.setState({
            isPlaying: !this.state.isPlaying
        });
    }
    render(){
        const song = this.props.currentMusicItem;
        const playAnotherMusic = this.props.onPlayNextMusic;
        return (
            <div className="player-page">
                <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
                <div className="mt20 row">
                    <div className="controll-wrapper">
                        <h2 className="music-title">{song.title}</h2>
                        <h3 className="music-artist mt10">{song.artist}</h3>
                        <div className="row mt20">
                            <div className="left-time -col-auto">{this.state.leftTime}</div>
                            <div className="volume-container">
                                <i className="icon-volume rt" style={{top: 5}}></i>
                                <div className="volume-wrapper">
                                    <Progress 
                                        onChangeProgressHandler={this.changeVolumeHandler}
                                        bgColor={'#333'}
                                        progress={this.state.volume}></Progress>
                                </div>
                            </div>
                        </div>
                        <div style={{height: 10, lineHeight: '10px'}}>
                        <Progress
                            bgColor={'orange'}
                            onChangeProgressHandler={this.changeProgressHandler} 
                            progress={this.state.progress}
                        ></Progress>
                        </div>
                        <div className="mt35 row">
                            <div>
                                <i className="icon prev" onClick={this.playPrev}></i>
                                <i className={`icon ${this.state.isPlaying ? 'pause' : 'play'} ml20`} onClick={this.playOrPause}></i>
                                <i className="icon next ml20" onClick={this.playNext}></i>
                            </div>
                            <div className="-col-auto">
                                <i className="icon repeat-cycle"></i>
                            </div>
                        </div>
                    </div>
                    <div className="-col-auto cover">
                        <img src={song.cover} alt={song.title}/>
                    </div>
                </div>
            </div>
        )
    }
}