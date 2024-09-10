document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');

    const preloader = document.getElementById('preloader');
    const preloaderDelay = 2000; // Set delay for 2 seconds

    // Function to hide preloader
    function hidePreloader() {
        preloader.style.display = 'none';
    }

    // Show preloader for at least 2 seconds
    setTimeout(() => {
        hidePreloader();
        startMatrix();
    }, preloaderDelay);

    function startMatrix() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        let cursorX = -1;
        let cursorY = -1;

        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px monospace`;

            drops.forEach((drop, index) => {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                const x = index * fontSize;
                const y = drop * fontSize;

                const distance = Math.sqrt((x - cursorX) ** 2 + (y - cursorY) ** 2);
                const radius = 30;

                ctx.fillStyle = (cursorX !== -1 && cursorY !== -1 && distance < radius) ? '#000000' : '#00ff00';
                ctx.fillText(text, x, y);

                if (y > canvas.height && Math.random() > 0.975) {
                    drops[index] = 0;
                }

                drops[index]++;
            });
        }

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawMatrix();
        });

        canvas.addEventListener('mousemove', (event) => {
            cursorX = event.clientX;
            cursorY = event.clientY;
        });

        // Adjust the interval for performance if needed
        setInterval(drawMatrix, 33);
    }
});
