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
          value_area: 800
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
        speed: 3,
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

// Smooth Scroll Animation
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

const onScroll = () => {
  window.requestAnimationFrame(updateSections);
};

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

window.addEventListener('scroll', () => {
  window.requestAnimationFrame(handleNavbar);
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
