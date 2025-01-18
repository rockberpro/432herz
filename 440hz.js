stream = document.getElementsByClassName('video-stream html5-main-video')[0];
if (stream !== 'undefined') {
    stream.preservesPitch = true;
    stream.playbackRate = 1.0;
}