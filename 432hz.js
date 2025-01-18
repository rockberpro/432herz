stream = document.getElementsByClassName('video-stream html5-main-video')[0];
if (stream) {
    stream.preservesPitch = false;
    stream.playbackRate = 432 / 440;
}