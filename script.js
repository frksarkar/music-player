function musicPlayer() {
    const wrapper = document.querySelector('.wrapper');
    const musicImg = wrapper.querySelector('.image-area img');
    const musicName = wrapper.querySelector('.song-details .name');
    const musicArtist = wrapper.querySelector('.song-details .artist');
    const myAudio = wrapper.querySelector('#main-audio');
    const playPauseBtn = wrapper.querySelector('.play-pause');
    const nextBtn = wrapper.querySelector('#next');
    const prevBtn = wrapper.querySelector('#prev');
    const musicListBtn = wrapper.querySelector('#more-music');
    const musicListBox = wrapper.querySelector('.music-list');
    const musicBoxClose = wrapper.querySelector('#close');
    const musicDirectionBtn = wrapper.querySelector('#repeat-plist');
    const startTime = wrapper.querySelector('.current-time');
    const totalTime = wrapper.querySelector('.total-time');
    const progressArea = wrapper.querySelector('.progress-area');
    const progressLine = wrapper.querySelector('.progress-bar');
    let musicIndex = 0;

    window.addEventListener('load', () => {
        loadMusic(musicIndex);
    });

    // load music function

    function loadMusic(index) {
        musicName.innerText = musicData[index].name;
        musicArtist.innerText = musicData[index].artist;
        musicImg.src = musicData[index].image;
        myAudio.src = musicData[index].src;
    }

    // play pause button

    function pauseMusic() {
        playPauseBtn.querySelector('i').innerText = 'pause';
        wrapper.classList.remove('paused');
        myAudio.pause();
    }

    function playMusic() {
        playPauseBtn.querySelector('i').innerText = 'play_arrow';
        wrapper.classList.add('paused');
        myAudio.play();
    }

    playPauseBtn.addEventListener('click', () => {
        const isMusicPaused = wrapper.classList.contains('paused');
        isMusicPaused ? pauseMusic() : playMusic();
    });

    function nextAndPrevSong(value) {
        if (value == 'next') {
            musicIndex++;
            musicIndex = musicIndex < musicData.length ? musicIndex : 0;
            loadMusic(musicIndex);
            playMusic();
        } else {
            musicIndex--;
            musicIndex = musicIndex == -1 ? musicData.length - 1 : musicIndex;
            loadMusic(musicIndex);
            playMusic();
        }
    }

    nextBtn.addEventListener('click', () => {
        nextAndPrevSong('next');
    });

    prevBtn.addEventListener('click', () => {
        nextAndPrevSong();
    });

    musicListBtn.addEventListener('click', () => {
        musicListBox.classList.add('active');
    });

    musicBoxClose.addEventListener('click', () => {
        musicListBox.classList.remove('active');
    });

    myAudio.addEventListener('timeupdate', (event) => {
        const currTime = event.target.currentTime;
        const { duration } = event.target;
        const percentage = (currTime / duration) * 100;

        progressLine.style.width = `${percentage}%`;

        const audioDuration = myAudio.duration;
        const totalMin = Math.floor(audioDuration / 60);
        const totalSec = Math.floor(audioDuration % 60);
        totalTime.innerText = `${totalMin}:${totalSec}`;

        const currentMin = Math.floor(currTime / 60);
        let currentSec = Math.floor(currTime % 60);
        if (currentSec < 10) {
            currentSec = `0${currentSec}`;
        }
        startTime.innerText = `${currentMin}:${currentSec}`;
    });

    myAudio.addEventListener('canplaythrough', () => {
        const audioDuration = myAudio.duration;
        const totalMin = Math.floor(audioDuration / 60);
        const totalSec = Math.floor(audioDuration % 60);
        totalTime.innerText = `${totalMin}:${totalSec}`;
    });

    // myAudio.addEventListener('timeupdate', (even) => {
    // 	const currTime = even.target.currentTime;
    // 	const duration = even.target.duration;
    // 	const percentage = (currTime / duration) * 100;

    // 	progressLine.style.width = `${percentage}%`;

    // 	myAudio.addEventListener('loadeddata', () => {
    // 		let audioDuration = myAudio.duration;
    // 		let totalMin = Math.floor(audioDuration / 60);
    // 		let totalSec = Math.floor(audioDuration % 60);
    // 		totalTime.innerText = `${totalMin}:${totalSec}`;
    // 	});

    // 	let currentMin = Math.floor(currTime / 60);
    // 	let currentSec = Math.floor(currTime % 60);
    // 	if (currentSec < 10) {
    // 		currentSec = `0${currentSec}`;
    // 	}
    // 	startTime.innerText = `${currentMin}:${currentSec}`;
    // });

    progressArea.addEventListener('click', (e) => {
        const progressWidthVal = progressArea.clientWidth;
        const clickedOffSetX = e.offsetX;
        const songDuration = myAudio.duration;
        myAudio.currentTime = (clickedOffSetX / progressWidthVal) * songDuration;
    });

    musicDirectionBtn.addEventListener('click', () => {
        const getText = musicDirectionBtn.innerText;

        switch (getText) {
            case 'repeat':
                musicDirectionBtn.innerText = 'repeat_one';
                musicDirectionBtn.setAttribute('title', 'song looped');
                break;
            case 'repeat_one':
                musicDirectionBtn.innerText = 'shuffle';
                musicDirectionBtn.setAttribute('title', 'playback shuffle');
                break;
            case 'shuffle':
                musicDirectionBtn.innerText = 'repeat';
                musicDirectionBtn.setAttribute('title', 'playlist looped');
                break;
        }
    });

    myAudio.addEventListener('ended', () => {
        const getText = musicDirectionBtn.innerText;

        switch (getText) {
            case 'repeat':
                nextAndPrevSong('next');
                break;
            case 'repeat_one':
                myAudio.currentTime = 0;
                loadMusic(musicIndex);
                playMusic();
                break;
            case 'shuffle':
                let randomIndex = Math.floor(Math.random() * musicData.length);
                do {
                    randomIndex = Math.floor(Math.random() * musicData.length);
                } while (musicIndex === randomIndex);
                musicIndex = randomIndex;
                console.log(musicIndex);
                loadMusic(musicIndex);
                playMusic();
                break;
        }
    });

    const ulTag = wrapper.querySelector('ul');

    for (let index = 0; index < musicData.length; index++) {
        const element = `<li>
							<div class="row">
								<span>${musicData[index].name}</span>
								<p>${musicData[index].artist}</p>
							</div>
							<audio class="${musicData[index].id}" src="${musicData[index].src}"></audio>
							<span id="${musicData[index].id}" class="audio-duration">3:40</span>
						</li>`;
        ulTag.insertAdjacentHTML('beforeend', element);
        const liAudioDuration = ulTag.querySelector(`#${musicData[index].id}`);
        const liAudioTag = ulTag.querySelector(`.${musicData[index].id}`);

        liAudioTag.addEventListener('loadeddata', () => {
            const audioDuration = liAudioTag.duration;
            const totalMin = Math.floor(audioDuration / 60);
            const totalSec = Math.floor(audioDuration % 60);
            liAudioDuration.innerText = `${totalMin}:${totalSec}`;
        });
    }
}

musicPlayer();
