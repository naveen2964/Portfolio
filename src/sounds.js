document.addEventListener('DOMContentLoaded', () => {
    // Initialize audio elements
    const selectSound = new Audio('src/audio/matrix_1.mp3');
    const typingSound = new Audio('src/audio/matrix_2.mp3');
    const profileVisibleSound = new Audio('src/audio/matrix_3.mp3');

    // Set volume to 20%
    const volume = 0.2;
    selectSound.volume = volume;
    typingSound.volume = volume;
    profileVisibleSound.volume = volume;

    // Loop the select sound
    selectSound.loop = true;

    // Mute/Unmute functionality
    const muteButton = document.getElementById('sound-toggle'); // Ensure this ID matches
    if (!muteButton) {
        console.error('Mute button not found');
        return;
    }

    // Default state is muted
    let isMuted = true;
    localStorage.setItem('isMuted', isMuted);

    function updateSoundIcon() {
        muteButton.textContent = isMuted ? '🔇' : '🔊';
    }

    function toggleMute() {
        selectSound.muted = isMuted;
        typingSound.muted = isMuted;
        profileVisibleSound.muted = isMuted;
    }

    muteButton.addEventListener('click', () => {
        isMuted = !isMuted;
        localStorage.setItem('isMuted', isMuted);
        updateSoundIcon();
        toggleMute();
    });

    updateSoundIcon();
    toggleMute();

    // Ensure `matrix_1.mp3` plays when the page loads
    function playSelectSound() {
        if (!isMuted) {
            selectSound.play().catch(error => {
                console.error('Error playing matrix_1.mp3:', error);
            });
        }
    }

    playSelectSound();

    // Handle option selection
    const enterMatrixButton = document.getElementById('enter-matrix');
    const bluePillButton = document.getElementById('blue-pill');

    if (!enterMatrixButton || !bluePillButton) {
        console.error('Enter Matrix or Blue Pill button not found');
        return;
    }

    enterMatrixButton.addEventListener('click', () => {
        if (!isMuted) {
            selectSound.pause();
            selectSound.currentTime = 0;

            typingSound.play().catch(error => {
                console.error('Error playing matrix_2.mp3:', error);
            });

            const typingDuration = 3000; // Example duration

            setTimeout(() => {
                typingSound.pause();
                typingSound.currentTime = 0;

                profileVisibleSound.play().catch(error => {
                    console.error('Error playing matrix_3.mp3:', error);
                });
            }, typingDuration);
        }
    });

    bluePillButton.addEventListener('click', () => {
        if (!isMuted) {
            selectSound.pause();
            selectSound.currentTime = 0;
        }
    });

    // Ensure typing sound stops when not needed
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            typingSound.pause();
        } else if (!isMuted) {
            typingSound.play();
        }
    });
});
