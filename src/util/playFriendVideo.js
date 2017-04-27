const playFriendVideo = (stream) => {
    const video = document.querySelectorAll('video')[1];// eslint-disable-line
    if (video.src === '') {
        video.src = window.URL.createObjectURL(stream);// eslint-disable-line
        video.play();
    } else {
        const video2 = document.querySelectorAll('video')[2];
        video2.src = window.URL.createObjectURL(stream);// eslint-disable-line
        video2.play();
    }
};

module.exports = playFriendVideo;
