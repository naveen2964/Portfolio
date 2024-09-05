// Function to handle the transition and page navigation
const handlePageTransition = (event) => {
    event.preventDefault(); // Prevent the default link behavior

    const link = event.currentTarget; // The clicked link
    const href = link.getAttribute('href'); // Get the URL from the link

    // Find the text element inside the button and add the class to hide it
    const textElement = link.querySelector('.button-text');
    if (textElement) {
        textElement.classList.add('hide-text');
    }

    // Add the transitioning class to body
    document.body.classList.add('transitioning');

    // Create the background transition animation
    document.body.animate([
        { backgroundColor: '#32abe6' },
        { backgroundColor: '#fff' }
    ], {
        duration: 800, // Adjusted duration for smoother transition
        fill: 'forwards' // Keep the final state of the animation
    });

    // Wait for the transition to complete before navigating
    setTimeout(() => {
        window.location.href = href;
    }, 800); // Duration should match the animation
};

// Function to remove the cursor after typing animation is done
const removeCursorAfterTyping = () => {
    const typingElements = document.querySelectorAll('.typing-effect span');

    typingElements.forEach((element) => {
        element.addEventListener('animationend', (event) => {
            if (event.animationName === 'typing-nav') {
                element.classList.add('typed'); // Add 'typed' class after typing animation ends
            }
        });
    });
};

// Handle page transition and footer visibility when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    // Attach event listeners to all nav links
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', handlePageTransition);
    });

    // Handle scroll events to show/hide footer
    window.addEventListener('scroll', handleFooterVisibility);

    // Initialize typing effect handler
    removeCursorAfterTyping();
});
