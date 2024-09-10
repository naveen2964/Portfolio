  document.addEventListener("DOMContentLoaded", function() {
    var items = document.querySelectorAll(".timeline li");

    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    function callbackFunc() {
      for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
          items[i].classList.add("in-view");
        } else {
          items[i].classList.remove("in-view");
        }
      }
    }

    // Initial check
    callbackFunc();

    // Listen for events
    window.addEventListener("resize", callbackFunc);
    window.addEventListener("scroll", callbackFunc);

    // JavaScript to hide preloader once content is fully loaded
    window.addEventListener('load', function() {
      const preloader = document.querySelector('.preloader');
      // Ensure the preloader is visible initially
      preloader.style.display = 'flex';
      preloader.style.opacity = '1';
      preloader.style.transition = 'opacity 0.5s ease-out';
    
      // Fade out the preloader
      setTimeout(() => {
        preloader.style.opacity = '0';
        // After the opacity transition ends, hide the preloader completely
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500); // Match this duration with the opacity transition duration
      }, 2000); // Show the preloader for 2 seconds
    });
  });
