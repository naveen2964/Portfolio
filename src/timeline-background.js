'use strict';

const particleCount = 700;
const particlePropCount = 9;
const particlePropsLength = particleCount * particlePropCount;
const baseTTL = 100;
const rangeTTL = 500;
const baseSpeed = 0.1;
const rangeSpeed = 1;
const baseSize = 2;
const rangeSize = 10;
const baseHue = 10;
const rangeHue = 100;
const backgroundColor = 'hsla(60,50%,3%,1)';

let container;
let canvas;
let ctx;
let center;
let tick;
let particleProps;

function setup() {
    createCanvas();
    resize();
    initParticles();
    draw();
}

function initParticles() {
    tick = 0;
    particleProps = new Float32Array(particlePropsLength);

    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        initParticle(i);
    }
}

function initParticle(i) {
    const x = Math.random() * canvas.a.width;
    const y = Math.random() * canvas.a.height;
    const theta = Math.atan2(y - center[1], x - center[0]);
    const vx = Math.cos(theta) * 6;
    const vy = Math.sin(theta) * 6;
    const life = 0;
    const ttl = baseTTL + Math.random() * rangeTTL;
    const speed = baseSpeed + Math.random() * rangeSpeed;
    const size = baseSize + Math.random() * rangeSize;
    const hue = baseHue + Math.random() * rangeHue;

    particleProps.set([x, y, vx, vy, life, ttl, speed, size, hue], i);
}

function drawParticles() {
    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        updateParticle(i);
    }
}

function updateParticle(i) {
    const i2 = i + 1;
    const i3 = i + 2;
    const i4 = i + 3;
    const i5 = i + 4;
    const i6 = i + 5;
    const i7 = i + 6;
    const i8 = i + 7;
    const i9 = i + 8;

    let x = particleProps[i];
    let y = particleProps[i2];
    let theta = Math.atan2(y - center[1], x - center[0]) + 0.75 * Math.PI;
    const vx = lerp(particleProps[i3], 2 * Math.cos(theta), 0.05);
    const vy = lerp(particleProps[i4], 2 * Math.sin(theta), 0.05);
    const life = particleProps[i5];
    const ttl = particleProps[i6];
    const speed = particleProps[i7];
    const x2 = x + vx * speed;
    const y2 = y + vy * speed;
    const size = particleProps[i8];
    const hue = particleProps[i9];

    drawParticle(x, y, theta, life, ttl, size, hue);

    particleProps[i] = x2;
    particleProps[i2] = y2;
    particleProps[i3] = vx;
    particleProps[i4] = vy;
    particleProps[i5] = life + 1;

    if (particleProps[i5] > ttl) {
        initParticle(i);
    }
}

function drawParticle(x, y, theta, life, ttl, size, hue) {
    const xRel = x - (0.5 * size);
    const yRel = y - (0.5 * size);

    ctx.a.save();
    ctx.a.lineCap = 'round';
    ctx.a.lineWidth = 1;
    ctx.a.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
    ctx.a.beginPath();
    ctx.a.translate(xRel, yRel);
    ctx.a.rotate(theta);
    ctx.a.translate(-xRel, -yRel);
    ctx.a.strokeRect(xRel, yRel, size, size);
    ctx.a.closePath();
    ctx.a.restore();
}

function createCanvas() {
    container = document.querySelector('.content--canvas');
    if (!container) {
        console.error('Canvas container not found');
        return;
    }
    canvas = {
        a: document.createElement('canvas'),
        b: document.createElement('canvas')
    };
    canvas.b.style.position = 'fixed';
    canvas.b.style.top = '0';
    canvas.b.style.left = '0';
    canvas.b.style.width = '100%';
    canvas.b.style.height = '100%';
    container.appendChild(canvas.b);
    ctx = {
        a: canvas.a.getContext('2d'),
        b: canvas.b.getContext('2d')
    };
    center = [];
    if (!ctx.a || !ctx.b) {
        console.error('Failed to get canvas context');
        return;
    }
}

function resize() {
    const { innerWidth, innerHeight } = window;

    canvas.a.width = innerWidth;
    canvas.a.height = innerHeight;

    ctx.a.drawImage(canvas.b, 0, 0);

    canvas.b.width = innerWidth;
    canvas.b.height = innerHeight;

    ctx.b.drawImage(canvas.a, 0, 0);

    center[0] = 0.5 * canvas.a.width;
    center[1] = 0.5 * canvas.a.height;
}

function renderGlow() {
    ctx.b.save();
    ctx.b.filter = 'blur(8px) brightness(200%)';
    ctx.b.globalCompositeOperation = 'lighter';
    ctx.b.drawImage(canvas.a, 0, 0);
    ctx.b.restore();

    ctx.b.save();
    ctx.b.filter = 'blur(4px) brightness(200%)';
    ctx.b.globalCompositeOperation = 'lighter';
    ctx.b.drawImage(canvas.a, 0, 0);
    ctx.b.restore();
}

function render() {
    ctx.b.save();
    ctx.b.globalCompositeOperation = 'lighter';
    ctx.b.drawImage(canvas.a, 0, 0);
    ctx.b.restore();
}

function draw() {
    tick++;

    ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);

    ctx.b.fillStyle = backgroundColor;
    ctx.b.fillRect(0, 0, canvas.a.width, canvas.a.height);

    drawParticles();
    renderGlow();
    render();

    window.requestAnimationFrame(draw);
}

window.addEventListener('load', setup);
window.addEventListener('resize', resize);

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function fadeInOut(life, ttl) {
    return Math.max(0, Math.min(1, (ttl - life) / ttl));
}
