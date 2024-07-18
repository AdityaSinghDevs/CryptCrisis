let banner = document.querySelector('.banner');
let canvas = document.getElementById('dotsCanvas');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext('2d');
const arrayColors = ['#ffffff'];  // Only white color for the dots
let dots = [];
let mouse = { x: null, y: null };
const maxDistance = 100;  // Reduced distance for web animation

// Increase the number of dots to 100 and vary the size of the dots
for (let index = 0; index < 100; index++) {
    dots.push({
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * canvas.height),
        size: Math.random() * 4 + 1,  // Vary the size of dots between 1 and 5
        color: arrayColors[Math.floor(Math.random() * arrayColors.length)],
        dx: (Math.random() - 0.5) * 0.5,  // Reduced speed of dots
        dy: (Math.random() - 0.5) * 0.5   // Reduced speed of dots
    });
}

const drawDots = () => {
    dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.shadowColor = dot.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

const updateDots = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(dot => {
        dot.x += dot.dx;
        dot.y += dot.dy;

        if (dot.x < 0 || dot.x > canvas.width) dot.dx = -dot.dx;
        if (dot.y < 0 || dot.y > canvas.height) dot.dy = -dot.dy;
    });
    drawDots();
    drawSpiderweb();
    requestAnimationFrame(updateDots);
}

const drawSpiderweb = () => {
    if (mouse.x !== null && mouse.y !== null) {
        dots.forEach(dot => {
            let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
            if (distance < maxDistance) {
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';  // Thin white lines with some transparency
                ctx.lineWidth = 0.5;  // Thinner line width
                ctx.beginPath();
                ctx.moveTo(dot.x, dot.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        });
    }
}

drawDots();
updateDots();

banner.addEventListener('mousemove', (event) => {
    mouse.x = event.pageX - banner.getBoundingClientRect().left;
    mouse.y = event.pageY - banner.getBoundingClientRect().top;
});

banner.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener('resize', () => {
    canvas.width = banner.offsetWidth;
    canvas.height = banner.offsetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dots = [];
    for (let index = 0; index < 100; index++) {
        dots.push({
            x: Math.floor(Math.random() * canvas.width),
            y: Math.floor(Math.random() * canvas.height),
            size: Math.random() * 4 + 1,  // Vary the size of dots between 1 and 5
            color: arrayColors[Math.floor(Math.random() * arrayColors.length)],
            dx: (Math.random() - 0.9) * 0.1,  // Reduced speed of dots
            dy: (Math.random() - 0.9) * 0.1   // Reduced speed of dots
        });
    }
    drawDots();
});
