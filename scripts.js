// Initialize particles.js
window.addEventListener('load', () => {
  if (typeof particlesJS === 'undefined') {
    console.error('particles.js is not loaded');
    return;
  }

  particlesJS('particles-js', {
    particles: {
      number: {
        value: 50, // Reduced particle count
        density: {
          enable: true,
          value_area: 600 // Reduced density
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
        value: 0.3,
        anim: {
          enable: false
        }
      },
      size: {
        value: 2,
        random: true,
        anim: {
          enable: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 2, // Reduced speed for smoother animations
        direction: 'none',
        out_mode: 'out'
      }
    },
    interactivity: {
      detect_on: 'canvas',
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
          particles_nb: 3 // Slightly reduced number of particles pushed on click
        }
      }
    },
    retina_detect: true
  });
});

// Smooth Scroll Animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Hide loader and display main content
const loader = document.getElementById('loader');
const mainContent = document.getElementById('main-content');

if (loader && mainContent) {
  window.addEventListener('load', () => {
    loader.style.transition = 'opacity 0.5s ease';
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
      mainContent.style.display = 'block';
    }, 500);
  });
} else {
  console.error('Loader or main content not found');
}

// Debounce function to limit scroll event execution
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function () {
    const context = this, args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Smooth Scroll Animation with Debounce
const sections = document.querySelectorAll('section');

const updateSections = () => {
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (sectionTop < windowHeight - 150) {
      section.classList.add('fade-in');
    }
  });
};

const onScroll = debounce(() => {
  window.requestAnimationFrame(updateSections);
});

window.addEventListener('scroll', onScroll);
window.addEventListener('load', updateSections);

// Navbar Hide/Show on Scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

const handleNavbar = () => {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    // Scrolling down
    if (navbar) {
      navbar.style.transform = "translateY(-80px)";
    }
  } else {
    // Scrolling up
    if (navbar) {
      navbar.style.transform = "translateY(0px)";
    }
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
};

window.addEventListener('scroll', debounce(() => {
  window.requestAnimationFrame(handleNavbar);
}));

// Navbar Toggle Functionality for Mobile
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    navToggle.classList.toggle('active');
  });
}

// Mobile Navbar Hide/Show
const mobileNavbar = document.querySelector('.glass-floating-bar');
const desktopNavbar = document.querySelector('.navbar');

const handleResize = () => {
  if (window.innerWidth <= 768) {
    if (desktopNavbar) desktopNavbar.style.display = 'none';
    if (mobileNavbar) mobileNavbar.style.display = 'flex';
  } else {
    if (desktopNavbar) desktopNavbar.style.display = 'flex';
    if (mobileNavbar) mobileNavbar.style.display = 'none';
  }
};

window.addEventListener('resize', debounce(handleResize));
window.addEventListener('load', handleResize);
