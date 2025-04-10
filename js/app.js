const audio = new Audio();
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const coverImage = document.getElementById('coverImage');
const trackTitle = document.getElementById('trackTitle');
const artistName = document.getElementById('artistName');
const playlist = document.getElementById('playlist');
const tracks = playlist.getElementsByTagName('li');
const loader = document.querySelector('.loader');
const player = document.querySelector('.player');
const settings = document.querySelector('.settings');
const container = document.getElementById('container');

let currentTrack = 0;

// Загрузка трека
function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.getAttribute('data-src');
    coverImage.src = track.getAttribute('data-cover');
    trackTitle.textContent = track.getAttribute('data-title');
    artistName.textContent = track.getAttribute('data-artist');
    audio.play();
    playPauseBtn.textContent = '⏸️';
}

// Обновление прогресс-бара
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    currentTime.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
});

// Перемотка
progressBar.addEventListener('input', () => {
    const time = (progressBar.value / 100) * audio.duration;
    audio.currentTime = time;
});

// Форматирование времени
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Смена треков
playlist.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        currentTrack = Array.from(tracks).indexOf(e.target);
        loadTrack(currentTrack);
    }
});

// Кнопки управления
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = '⏸️';
    } else {
        audio.pause();
        playPauseBtn.textContent = '▶️';
    }
});

prevBtn.addEventListener('click', () => {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
});

nextBtn.addEventListener('click', () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
});

// Автопереход к следующему треку
audio.addEventListener('ended', () => {
    nextBtn.click();
});

// Плавный переход между загрузкой и основным интерфейсом
setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
        player.classList.remove('hidden');
        player.classList.add('visible');
    }, 500); // Задержка для плавного исчезновения
}, 1000); // Задержка в 1 секунды

// Загрузка первого трека
loadTrack(currentTrack);

settings.addEventListener('click', () => {
    player.style.opacity = '0.3';
    container.style.display = 'flex';
})