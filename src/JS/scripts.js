document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');

    // Show the preloader initially
    preloader.style.display = 'flex';

    // Set a minimum display time of 1 seconds
    const minDisplayTime = 1000;
    let loaderShownTime = Date.now();

    const hidePreloader = () => {
        // Ensure the preloader is shown for at least 2 seconds
        const elapsedTime = Date.now() - loaderShownTime;
        const delay = Math.max(minDisplayTime - elapsedTime, 0);

        // Hide the preloader after the delay
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500); // Match the transition duration
        }, delay);
    };

    // Listen for the window load event to ensure all assets are loaded
    window.addEventListener('load', hidePreloader);
});
