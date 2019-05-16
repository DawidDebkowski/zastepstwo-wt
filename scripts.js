const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');

function toggleVideo() {
    if (video.paused) {
        video.play();
    }
    else {
        video.pause();
    }
}

progress.addEventListener("click", function (e) {
    video.currentTime = e.offsetX / progress.offsetWidth * video.duration;
});
// sprawdzenie czy mysza jest juz nie na pasku

// progress.addEventListener("mousemove", function (e) {
//     if (e.mousedown){
//     video.currentTime = e.offsetX / progress.offsetWidth * video.duration;}
// });

toggle.addEventListener("click", toggleVideo);

video.addEventListener("click", toggleVideo);

video.addEventListener("timeupdate", function () {
    progressBar.style.flexBasis = video.currentTime / video.duration * 100 + "%";
});

ranges.forEach(range => {
    const setValue = function(){
        video[this.name] = this.value;
    }
    range.addEventListener("change",setValue);
    range.addEventListener("mousemove", setValue);
})
