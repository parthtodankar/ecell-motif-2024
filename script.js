// main.js
const canvas = document.getElementById('galaxyCanvas');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 500;  // Number of stars
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Star class to create stars with properties
class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * canvas.width;
        this.size = Math.random() * 0.0001;
        this.speed = 8;
    }






    

    update() {
        this.z -= this.speed;  // Move star towards the screen

        if (this.z <= 0) {
            this.z = canvas.width;  // Reset star position if it moves out
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
        }
    }

    draw() {
        let x, y, s;
        x = (this.x - canvas.width / 2) * (canvas.width / this.z) + canvas.width / 2;
        y = (this.y - canvas.height / 2) * (canvas.width / this.z) + canvas.height / 2;
        s = this.size * (canvas.width / this.z);

        ctx.beginPath();
        ctx.arc(x, y, s, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    }
}

// Initialize stars
function initStars() {
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

// Animate stars with a trailing effect
function animate() {
    // Fill the canvas with a slightly transparent black color
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';  // Lower opacity to leave trails
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animate);
}

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    initStars();
});

initStars();
animate();

// temcard

//Events
let slideIndex = 0;
let slides = document.getElementsByClassName("event-slide");

// Show the first slide initially
showSlides(slideIndex);

// Automatic Slideshow
let autoSlideInterval = setInterval(function() {
    changeSlide(1);
}, 5000); // Change slide every 5 seconds

// Show a specific slide
function showSlides(index) {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[index].style.display = "flex"; // Use 'flex' to maintain layout
}

// Change slide when next or previous button is clicked
function changeSlide(n) {
    slideIndex += n;
    if (slideIndex >= slides.length) { 
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    showSlides(slideIndex);
}

// Event listeners for buttons
document.querySelector('.prev').addEventListener('click', function() {
    clearInterval(autoSlideInterval); // Stop automatic slideshow when manual control is used
    changeSlide(-1);
});

document.querySelector('.next').addEventListener('click', function() {
    clearInterval(autoSlideInterval); // Stop automatic slideshow when manual control is used
    changeSlide(1);
});

