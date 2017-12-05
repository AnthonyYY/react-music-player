import React from 'react';
import './progress.less';

export default class Progress extends React.Component{

    changeProgress(e){
        let progressBar = this.refs.progressBar;
        var progress = (e.clientX - progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
        this.props.onChangeProgressHandler(progress);
    }

    render(){
        return (<div className="components-progress" ref="progressBar" onClick={ (e) => this.changeProgress(e) }>
            <div className="progress" style={{width: `${this.props.progress}%`, backgroundColor: this.props.bgColor || '#09f'}}></div>
        </div>)
    }
}