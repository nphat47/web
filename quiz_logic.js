// Main Quiz Logic
let currentQuiz = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

// DOM Elements
const quizContainer = document.getElementById('quiz-interface');
const menuContainer = document.getElementById('quiz-menu');
const questionEl = document.getElementById('question-text');
const optionsEl = document.getElementById('options-container');
const progressEl = document.getElementById('progress-text');
const feedbackModal = document.getElementById('feedback-modal');
const feedbackText = document.getElementById('feedback-text');
const feedbackBtn = document.getElementById('feedback-btn');
const scoreContainer = document.getElementById('score-container');
const finalScoreEl = document.getElementById('final-score');
const fireworksCanvas = document.getElementById('fireworks-canvas');

// Sound Effects (Optional placeholders)
// const correctSound = new Audio('correct.mp3');
// const wrongSound = new Audio('wrong.mp3');

function startQuiz(type) {
    if (type === 'midterm') {
        currentQuiz = midtermQuiz; // from quiz_data.js
        document.getElementById('quiz-title').textContent = "แบบทดสอบกลางภาค (บทที่ 1-3)";
    } else {
        currentQuiz = finalQuiz; // from quiz_data.js
        document.getElementById('quiz-title').textContent = "แบบทดสอบปลายภาค (บทที่ 4-7)";
    }

    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];

    // UI Transitions
    menuContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    scoreContainer.style.display = 'none';

    loadQuestion();
}

function loadQuestion() {
    const questionData = currentQuiz[currentQuestionIndex];
    questionEl.textContent = `${currentQuestionIndex + 1}. ${questionData.q}`;
    progressEl.textContent = `ข้อที่ ${currentQuestionIndex + 1} / ${currentQuiz.length}`;

    optionsEl.innerHTML = '';
    questionData.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(index);
        optionsEl.appendChild(btn);
    });
}

function checkAnswer(selectedIndex) {
    const correctIndex = currentQuiz[currentQuestionIndex].answer;
    const isCorrect = selectedIndex === correctIndex;

    // Show Feedback Modal
    showFeedback(isCorrect);

    if (isCorrect) {
        score++;
    }
}

function showFeedback(isCorrect) {
    feedbackModal.style.display = 'flex';

    if (isCorrect) {
        feedbackText.innerHTML = '<h2 style="color: #4ECDC4;">เก่งมาก! ถูกต้องครับ <i class="fas fa-check-circle"></i></h2>';
        feedbackBtn.textContent = 'ไปข้อต่อไป';
        feedbackBtn.className = 'btn-primary';
        startFireworks(); // Trigger Fireworks
    } else {
        const encouragingMessages = [
            "พยายามอีกนิดนะ!",
            "อาจจะยังไม่ใช่น้า ลองใหม่รอบหน้า",
            "ไม่ต้องเสียใจ สู้ๆ ครับ",
            "ผิดเป็นครู เรียนรู้กันไปนะ",
            "เกือบถูกแล้ว เชียร์อยู่นะ!"
        ];
        const randomMsg = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
        feedbackText.innerHTML = `<h2 style="color: #FF6B6B;">${randomMsg} <i class="fas fa-times-circle"></i></h2><p>เฉลย: ${currentQuiz[currentQuestionIndex].options[currentQuiz[currentQuestionIndex].answer]}</p>`;
        feedbackBtn.textContent = 'ไปข้อต่อไป';
        feedbackBtn.className = 'btn-secondary';
    }

    feedbackBtn.onclick = () => {
        feedbackModal.style.display = 'none';
        stopFireworks(); // Stop Fireworks
        nextQuestion();
    };
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuiz.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    quizContainer.style.display = 'none';
    scoreContainer.style.display = 'block';
    finalScoreEl.textContent = `${score} / ${currentQuiz.length}`;

    // Add some celebration if score is high
    if (score > currentQuiz.length * 0.7) {
        startFireworks();
        setTimeout(stopFireworks, 5000); // Stop after 5 seconds
    }
}

function restartQuiz() {
    scoreContainer.style.display = 'none';
    menuContainer.style.display = 'grid'; // Grid for buttons
    currentQuestionIndex = 0;
    score = 0;
}

// Fireworks Implementation (Canvas)
let fireworksInterval;
const ctx = fireworksCanvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8
        };
        this.alpha = 1;
        this.friction = 0.95;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.02;
    }
}

function createFirework(x, y) {
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    for (let i = 0; i < 30; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function animateFireworks() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Trail effect
    ctx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

    particles.forEach((particle, index) => {
        if (particle.alpha > 0) {
            particle.update();
            particle.draw();
        } else {
            particles.splice(index, 1);
        }
    });
}

function startFireworks() {
    fireworksCanvas.style.display = 'block';
    // Create random fireworks
    fireworksInterval = setInterval(() => {
        const x = Math.random() * fireworksCanvas.width;
        const y = Math.random() * fireworksCanvas.height * 0.5; // Top half
        createFirework(x, y);
    }, 400); // Frequency

    // Animation loop
    const animate = () => {
        animateFireworks();
        if (fireworksCanvas.style.display === 'block') {
            requestAnimationFrame(animate);
        }
    };
    animate();
}

function stopFireworks() {
    clearInterval(fireworksInterval);
    fireworksCanvas.style.display = 'none';
    particles = [];
    ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
}
