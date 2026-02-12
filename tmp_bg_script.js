
// Background Decoration: Floating Shapes & Neon Stars
function createBackgroundDecorations() {
    const body = document.body;
    const bgContainer = document.createElement('div');
    bgContainer.className = 'bg-decorations-container';
    body.prepend(bgContainer);

    // 1. Large Floating Geometric Shapes (3D CSS)
    const shapes = [
        { type: 'cube', top: '10%', left: '5%', size: '100px', animation: 'float 8s ease-in-out infinite' },
        { type: 'sphere', top: '20%', right: '5%', size: '120px', animation: 'float 12s ease-in-out infinite reverse' },
        { type: 'cube', bottom: '15%', left: '8%', size: '80px', animation: 'float 10s ease-in-out infinite 2s' },
        { type: 'sphere', bottom: '10%', right: '8%', size: '150px', animation: 'float 15s ease-in-out infinite 1s' }
    ];

    shapes.forEach(shape => {
        const el = document.createElement('div');
        el.className = `bg-shape ${shape.type}`;
        el.style.top = shape.top || 'auto';
        el.style.left = shape.left || 'auto';
        el.style.right = shape.right || 'auto';
        el.style.bottom = shape.bottom || 'auto';
        el.style.width = shape.size;
        el.style.height = shape.size;
        el.style.animation = shape.animation;
        bgContainer.appendChild(el);
    });

    // 2. Small Neon Stars (Scattered around edges)
    const starCount = 30;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'bg-star';

        // Random position but avoid center 60%
        let x, y;
        if (Math.random() > 0.5) {
            // Left or Right edge
            x = Math.random() > 0.5 ? Math.random() * 20 : 80 + Math.random() * 20;
            y = Math.random() * 100;
        } else {
            // Top or Bottom edge
            x = Math.random() * 100;
            y = Math.random() > 0.5 ? Math.random() * 20 : 80 + Math.random() * 20;
        }

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        bgContainer.appendChild(star);
    }
}

createBackgroundDecorations();
