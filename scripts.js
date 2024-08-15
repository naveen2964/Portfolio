// Initialize particles.js
window.addEventListener('load', () => {
  if (typeof particlesJS === 'undefined') {
    console.error('particles.js is not loaded');
    return;
  }

  particlesJS('particles-js', {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 700
        }
      },
      color: {
        value: '#ffffff'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000'
        }
      },
      opacity: {
        value: 0.5,
        anim: {
          enable: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 6,
        direction: 'none',
        out_mode: 'out'
      }
    },
    interactivity: {
      detect_on: 'window',
      events: {
        onhover: {
          enable: true,
          mode: 'repulse'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  });
});

// Hide loader and show main content
const loader = document.getElementById('loader');
const mainContent = document.getElementById('main-content');

if (loader && mainContent) {
  setTimeout(() => {
    loader.style.transition = 'opacity 0.5s'; // Add transition
    loader.style.opacity = '0'; // Fade out loader
    setTimeout(() => {
      loader.style.display = 'none'; // Hide loader
      mainContent.style.display = 'block'; // Show main content
    }, 500); // Match the transition time
  }, 100); // Small delay to ensure particles.js initializes
} else {
  console.error('Loader or main content not found');
}

// Scroll Animation
const sections = document.querySelectorAll('section');

const revealSection = () => {
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (sectionTop < windowHeight - 100) { // Adjust threshold if needed
      section.classList.add('fade-in'); // Add the fade-in class
    }
  });
};

// Debounce scroll event to improve performance
const debounce = (func, wait) => {
  let timeout;
  return () => {
    clearTimeout(timeout);  
    timeout = setTimeout(func, wait);
  };
};

window.addEventListener('scroll', debounce(revealSection, 20));
window.addEventListener('load', revealSection); // To handle initial load

// Navbar Hide/Show on Scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    // Scrolling down
    navbar.style.top = "-80px"; // Adjust this value to hide the navbar
  } else {
    // Scrolling up
    navbar.style.top = "0px"; // Adjust this value to show the navbar
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});

// Navigation for Project 1 Images
document.querySelectorAll('.portfolio-item').forEach(item => {
    const scrollableImages = item.querySelector('.scrollable-images');
    const prevBtn = item.querySelector('.prev');
    const nextBtn = item.querySelector('.next');

    if (scrollableImages && prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        scrollableImages.scrollBy({
          left: -scrollableImages.clientWidth,
          behavior: 'smooth'
        });
      });

      nextBtn.addEventListener('click', () => {
        scrollableImages.scrollBy({
          left: scrollableImages.clientWidth,
          behavior: 'smooth'
        });
      });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
