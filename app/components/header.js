import React from 'react';
import './header.less';

export default function Header(){
    return <div className="components-header">
        <img src="/static/images/logo.png" alt=""/>
        <h1 className="caption">React Music Player</h1>
    </div>
}