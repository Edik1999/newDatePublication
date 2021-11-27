import React from 'react';
import Video from './Video'

const VideoList = (props) => {
    return props.list.map(item => <Video key={item.url} url={item.url} date={item.date} />);
}

export default VideoList;
