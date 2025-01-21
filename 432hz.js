stream = document.querySelector('video');
if (stream) {
    stream.preservesPitch = false;
    stream.playbackRate = 432 / 440;
}