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
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.transition = 'opacity 0.5s';
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
        mainContent.style.display = 'block';
      }, 500);
    }, 100);
  });
} else {
  console.error('Loader or main content not found');
}

// Smooth Scroll Animation
const sections = document.querySelectorAll('section');

const revealSection = () => {
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (sectionTop < windowHeight - 150) {
      section.classList.add('fade-in');
    }
  });
};

// Debounce and throttle scroll event to improve performance
const debounce = (func, wait) => {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
};

const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function() {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      if (lastFunc) clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

window.addEventListener('scroll', throttle(revealSection, 50));
window.addEventListener('load', revealSection);

// Navbar Hide/Show on Scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    // Scrolling down
    if (navbar) {
      navbar.style.top = "-80px";
    }
  } else {
    // Scrolling up
    if (navbar) {
      navbar.style.top = "0px";
    }
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
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

window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);
