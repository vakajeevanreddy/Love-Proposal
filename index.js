// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Initialize loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling after loading
        }, 500);
    }, 2000);

    // Initialize image slider
    initImageSlider();

    // Initialize YouTube players
    initYouTubePlayers();

    // Set up event listeners
    setupEventListeners();
});

// Initialize the image slider
function initImageSlider() {
    const slider = document.querySelector('.image-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.slide');
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slide-nav';
    
    // Create navigation dots
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.className = 'slide-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    slider.appendChild(dotsContainer);
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // Function to go to a specific slide
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dotsContainer.children[currentSlide].classList.remove('active');
        
        currentSlide = (index + slideCount) % slideCount;
        
        slides[currentSlide].classList.add('active');
        dotsContainer.children[currentSlide].classList.add('active');
    }
    
    // Auto-advance slides
    setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
}

// Initialize YouTube players
function initYouTubePlayers() {
    // The YouTube API will handle the iframes we've directly embedded
    // We just need to add some event listeners for better UX
    const iframes = document.querySelectorAll('iframe');
    
    iframes.forEach(iframe => {
        // Add hover effects
        iframe.addEventListener('mouseenter', () => {
            iframe.style.transform = 'scale(1.02)';
            iframe.style.transition = 'transform 0.3s ease';
        });
        
        iframe.addEventListener('mouseleave', () => {
            iframe.style.transform = 'scale(1)';
        });
    });
}

// Set up all event listeners
function setupEventListeners() {
    // Response buttons
    const yesButton = document.querySelector('.yes-button');
    const noButton = document.querySelector('.no-button');
    
    if (yesButton) {
        yesButton.addEventListener('click', handleYesClick);
        yesButton.addEventListener('mouseenter', () => {
            yesButton.style.transform = 'scale(1.05)';
        });
        yesButton.addEventListener('mouseleave', () => {
            yesButton.style.transform = 'scale(1)';
        });
    }
    
    if (noButton) {
        noButton.addEventListener('click', handleNoClick);
        noButton.addEventListener('mouseenter', () => {
            noButton.style.transform = 'translateX(10px) scale(1.05)';
        });
        noButton.addEventListener('mouseleave', () => {
            noButton.style.transform = 'translateX(0) scale(1)';
        });
    }
    
    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.body.style.backgroundPositionY = -scrolled * 0.5 + 'px';
    });
}

// Handle yes button click
function handleYesClick() {
    createConfetti();
    showSuccessMessage();
    playCelebrationSound();
}

// Handle no button click
function handleNoClick() {
    showTeaseMessage();
}

// Create confetti effect
function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    const confettiCount = 200;
    const confettiColors = ['#ff6b6b', '#4ecdc4', '#ffcc00', '#3498db', '#9b59b6', '#e74c3c'];
    
    // Clear existing confetti
    confettiContainer.innerHTML = '';
    
    // Create new confetti
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.animationDuration = Math.random() * 2 + 3 + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confettiContainer.appendChild(confetti);
    }
}

// Show success message
function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <h2>Yay! 🎉 You said Yes!</h2>
        <p>Thank you for making me the happiest person in the world!</p>
        <div class="heart-animation">
            <div class="heart"></div>
            <div class="heart"></div>
            <div class="heart"></div>
        </div>
    `;
    document.body.appendChild(message);
    
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => message.remove());
    message.appendChild(closeBtn);
}

// Show tease message
function showTeaseMessage() {
    const messages = [
        "Aw, come on! 😢 You know you want to say Yes!",
        "That wasn't the right answer! Try again! ❤️",
        "I don't accept that answer! 😘",
        "Let's pretend you clicked Yes instead! 😊",
        "You must have misclicked! Try the other button! 💕"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    const message = document.createElement('div');
    message.className = 'tease-message';
    message.textContent = randomMessage;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 500);
    }, 2000);
}

// Play celebration sound
function playCelebrationSound() {
    // Note: For autoplay to work, this must be triggered by a user gesture
    const celebrationSound = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    celebrationSound.volume = 0.5;
    
    // Try to play, but catch any errors (especially autoplay restrictions)
    celebrationSound.play().catch(e => {
        console.log("Audio playback failed:", e);
    });
}

// YouTube API callback (required for YouTube iframe API)
function onYouTubeIframeAPIReady() {
    // This is called when the YouTube API is ready
    // We've already set up our iframes directly in the HTML
    // so we don't need to do anything extra here
}