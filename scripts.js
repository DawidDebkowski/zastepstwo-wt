const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress'); ``
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');
const fullscreen = player.querySelector(".fullscreen")

// console.log(fullscreen)
//fullscreen.addEventListener("click", ()=>player.requestFullscreen())

function isFullscreen(){
    return !!document.fullscreenElement;
}
function toggleFullscreen(){
    if(isFullscreen()){
        document.exitFullscreen();
    }
    else{
        player.requestFullscreen();
    }
}
player.addEventListener("fullscreenchange", updateFullscreen)
fullscreen.addEventListener("click", toggleFullscreen)
function updateFullscreen(){
    fullscreen.innerText = isFullscreen() ? "><" : "<>";
}

function toggleVideo() {
    if (video.paused) {
        video.play();
    }
    else {
        video.pause();
    }
}
function skip(skipTime) {
    video.currentTime = video.currentTime + Number(skipTime);
}

toggle.addEventListener("click", toggleVideo);
toggle.addEventListener("click", toggleChange);
video.addEventListener("click", toggleVideo);

skipButtons.forEach(b => {
    b.addEventListener("click", (event) => {
        const button = event.target;
        let skipTime = button.dataset.skip;
        skip(skipTime);
    })
});

let mouse_down = false;

progress.addEventListener("mousedown", (e) => {
    e.preventDefault()
    mouse_down = true;
})
progress.addEventListener("mousemove", (e) => {
    if (mouse_down) {
        video.currentTime = e.offsetX / progress.offsetWidth * video.duration;
    }
});
progress.addEventListener("click", function (e) {
    video.currentTime = e.offsetX / progress.offsetWidth * video.duration;
});

window.addEventListener("mouseup", () => mouse_down = false);



function toggleChange() {
    if (video.paused) {
        toggle.innerText = "||"
    }
    else {
        toggle.innerText = "|>" // ► 
    }
}



video.addEventListener("timeupdate", function () {
    progressBar.style.flexBasis = video.currentTime / video.duration * 100 + "%";
});

ranges.forEach(range => {
    const setValue = function () {
        video[this.name] = this.value;
    }
    range.addEventListener("change", setValue);
    range.addEventListener("mousemove", setValue);
})


