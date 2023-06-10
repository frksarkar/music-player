function musicPlayer() {
	const wrapper = document.querySelector('.wrapper'),
		musicImg = wrapper.querySelector('.image-area img'),
		musicName = wrapper.querySelector('.song-details .name'),
		musicArtist = wrapper.querySelector('.song-details .artist'),
		myAudio = wrapper.querySelector('#main-audio'),
		playPauseBtn = wrapper.querySelector('.play-pause'),
		nextBtn = wrapper.querySelector('#next'),
		prevBtn = wrapper.querySelector('#prev'),
		musicListBtn = wrapper.querySelector('#more-music'),
		musicListBox = wrapper.querySelector('.music-list'),
		musicBoxClose = wrapper.querySelector('#close'),
		musicDirection = wrapper.querySelector('#repeat-plist'),
		startTime = wrapper.querySelector('.current-time'),
		totalTime = wrapper.querySelector('.total-time'),
		progressArea = wrapper.querySelector('.progress-area'),
		progressLine = wrapper.querySelector('.progress-bar');
	let musicIndex = 1;

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
		const duration = event.target.duration;
		const percentage = (currTime / duration) * 100;

		progressLine.style.width = `${percentage}%`;

		let audioDuration = myAudio.duration;
		let totalMin = Math.floor(audioDuration / 60);
		let totalSec = Math.floor(audioDuration % 60);
		totalTime.innerText = `${totalMin}:${totalSec}`;

		let currentMin = Math.floor(currTime / 60);
		let currentSec = Math.floor(currTime % 60);
		if (currentSec < 10) {
			currentSec = `0${currentSec}`;
		}
		startTime.innerText = `${currentMin}:${currentSec}`;
	});

	myAudio.addEventListener('canplaythrough', () => {
		let audioDuration = myAudio.duration;
		let totalMin = Math.floor(audioDuration / 60);
		let totalSec = Math.floor(audioDuration % 60);
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
		let progressWidthVal = progressArea.clientWidth;
		let clickedOffSetX = e.offsetX;
		let songDuration = myAudio.duration;
		myAudio.currentTime =
			(clickedOffSetX / progressWidthVal) * songDuration;
	});
}

musicPlayer();
