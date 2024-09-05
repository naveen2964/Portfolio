document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('intro-screen');
    const cardContainer = document.getElementById('card-container');
    const enterMatrixButton = document.getElementById('enter-matrix');
    const bluePillButton = document.getElementById('blue-pill');
    const typingEffect = document.getElementById('typing-effect');
    const loadingText = document.getElementById('loading-text');
    const introOptions = document.getElementById('intro-options');

    // Function to hide intro options with fade effect
    function hideIntroOptions() {
        introOptions.classList.remove('visible');
        introOptions.classList.add('hidden');
        const options = introOptions.getElementsByClassName('retro-option');
        Array.from(options).forEach(option => {
            option.style.transition = 'opacity 0.5s ease';
            option.style.opacity = 0;
        });
    }

    // Function to show typing effect
    function showTypingEffect(text, callback) {
        typingEffect.classList.remove('hidden');
        typingEffect.classList.add('visible');
        typeEffect(loadingText, text, 50, () => {
            setTimeout(() => {
                hideTypingEffect(callback);
            }, 2000); // Time to show the loading text
        });
    }

    // Function to hide typing effect
    function hideTypingEffect(callback) {
        typingEffect.classList.remove('visible');
        typingEffect.classList.add('hidden');
        if (callback) {
            setTimeout(callback, 500);
        }
    }

    // Function to show card container
    function showCardContainer() {
        // Hide the intro screen completely before showing the card container
        introScreen.style.opacity = 0;
        setTimeout(() => {
            introScreen.style.display = 'none'; // Hide intro screen completely
            cardContainer.classList.add('show');
        }, 500); // Match this duration with the fade-out transition duration
    }

    // Function to handle Enter Matrix button click
    function handleEnterMatrixClick() {
        console.log('Enter Matrix button clicked');
        hideIntroOptions();
        setTimeout(() => {
            showTypingEffect('> Loading all databases and retrieving the most wanted ex-agent from the Matrix...', showCardContainer);
        }, 500);
    }

    // Function to handle Blue Pill button click
    function handleBluePillClick() {
        console.log('Blue Pill button clicked');
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = 0;
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    }

    // Initialize options with typing effect on page load
    function showOptionsWithTypingEffect() {
        const options = Array.from(introOptions.getElementsByClassName('retro-option'));
        introOptions.classList.add('hidden'); // Ensure options container is hidden initially
        options.forEach(option => {
            option.style.opacity = '0'; // Start each option fully hidden
        });

        setTimeout(() => {
            introOptions.classList.remove('hidden');
            introOptions.classList.add('visible');

            options.forEach((option, index) => {
                setTimeout(() => {
                    option.style.transition = 'opacity 0.5s ease';
                    option.style.opacity = '1'; // Fade in the option
                    typeEffect(option, option.innerText.trim(), 50);
                }, index * 1000); // Staggered typing effect for each option
            });
        }, 100); // Short delay to ensure options are hidden before showing
    }

    // Attach event listeners
    enterMatrixButton.addEventListener('click', handleEnterMatrixClick);
    bluePillButton.addEventListener('click', handleBluePillClick);

    // Start the intro sequence
    showOptionsWithTypingEffect();
});
