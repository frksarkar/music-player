function musicPlayer() {
	const wrapper = document.querySelector('.wrapper'),
		musicImg = wrapper.querySelector('.image-area img'),
		musicName = wrapper.querySelector('.song-details .name'),
		musicArtist = wrapper.querySelector('.song-details .artist'),
		audio = wrapper.querySelector('#main-audio'),
		playPauseBtn = wrapper.querySelector('.play-pause'),
		nextBtn = wrapper.querySelector('#next'),
		prevBtn = wrapper.querySelector('#prev'),
		musicListBtn = wrapper.querySelector('#more-music'),
		musicDirection = wrapper.querySelector('#repeat-plist'),
		progressLine = wrapper.querySelector('.progress-bar');

	let musicIndex = 0;

	window.addEventListener('load', () => {
		loadMusic(musicIndex);
	});

	// load music function

	function loadMusic(index) {
		musicName.innerText = musicData[index].name;
		musicArtist.innerText = musicData[index].artist;
		musicImg.src = musicData[index].image;
		audio.src = musicData[index].src;
	}

	// play pause button

	function pauseMusic() {
		playPauseBtn.querySelector('i').innerText = 'pause';
		wrapper.classList.remove('paused');
		audio.pause();
	}

	function playMusic() {
		playPauseBtn.querySelector('i').innerText = 'play_arrow';
		console.log('play');
		wrapper.classList.add('paused');
		audio.play();
	}

	playPauseBtn.addEventListener('click', () => {
		const isMusicPaused = wrapper.classList.contains('paused');
		console.log(isMusicPaused);
		isMusicPaused ? pauseMusic() : playMusic();
	});

	function nextAndPrevSong(value) {
		if (musicIndex >= 0 && musicIndex < musicData.length) {
			if (value == 'next') {
				musicIndex++;
				loadMusic(musicIndex);
				playMusic();
			} else {
				if (musicIndex == 0) {
					return;
				}
				musicIndex--;
				loadMusic(musicIndex);
				playMusic();
			}
		}
	}

	nextBtn.addEventListener('click', () => {
		nextAndPrevSong('next');
	});

	prevBtn.addEventListener('click', () => {
		nextAndPrevSong();
	});
}

musicPlayer();
