(async () => {
    await tsParticles.load("tsparticles", {
      fpsLimit: 60,
      particles: {
        groups: {
          z5000: { number: { value: 70 }, zIndex: { value: 5000 } },
          z7500: { number: { value: 30 }, zIndex: { value: 75 } },
          z2500: { number: { value: 50 }, zIndex: { value: 25 } },
          z1000: { number: { value: 40 }, zIndex: { value: 10 } }
        },
        number: {
          value: 200,
          density: {
            enable: false,
            area: 800
          }
        },
        color: { value: "#fff" },
        shape: { type: "circle" },
        opacity: { value: { min: 0.1, max: 1 } },
        size: { value: 3 },
        move: {
          angle: { value: 10, offset: 0 },
          enable: true,
          speed: 5,
          direction: "right",
          straight: true,
          outModes: "out"
        },
        zIndex: { value: 5, opacityRate: 0.5 }
      },
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          push: {
            quantity: 4,
            groups: ["z5000", "z7500", "z2500", "z1000"]
          }
        }
      },
      detectRetina: true,
      background: { color: "#000000" },
      emitters: {
        position: { y: 55, x: -30 },
        rate: { delay: 7, quantity: 1 },
        size: { width: 0, height: 0 },
        particles: {
          shape: {
            type: "images",
            options: {
              images: [
                { src: "https://particles.js.org/images/amongus_blue.png", width: 205, height: 267 },
                { src: "https://particles.js.org/images/amongus_cyan.png", width: 207, height: 265 },
                { src: "https://particles.js.org/images/amongus_green.png", width: 204, height: 266 },
                { src: "https://particles.js.org/images/amongus_lime.png", width: 206, height: 267 },
                { src: "https://particles.js.org/images/amongus_orange.png", width: 205, height: 265 },
                { src: "https://particles.js.org/images/amongus_pink.png", width: 205, height: 265 },
                { src: "https://particles.js.org/images/amongus_red.png", width: 204, height: 267 },
                { src: "https://particles.js.org/images/amongus_white.png", width: 205, height: 267 }
              ]
            }
          },
          opacity: { value: 1 },
          size: { value: 40 },
          move: {
            speed: 10,
            outModes: { default: "destroy", left: "none" },
            straight: true
          },
          zIndex: { value: 0 },
          rotate: {
            value: { min: 0, max: 360 },
            animation: { enable: true, speed: 10, sync: true }
          }
        }
      }
    });
  })();
