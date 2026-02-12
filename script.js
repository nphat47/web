document.addEventListener('DOMContentLoaded', () => {
    console.log('Design & Tech M.1 Site Ready!');

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            // Simple toggle for mobile menu
            // In a real implementation this would toggle a class
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.right = '0';
                navLinks.style.backgroundColor = '#fff';
                navLinks.style.width = '100%';
                navLinks.style.textAlign = 'center';
                navLinks.style.padding = '1rem 0';
                navLinks.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
            }
        });
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Background Decoration: Floating Shapes & Neon Stars
    function createBackgroundDecorations() {
        // Only run if not already created
        if (document.querySelector('.bg-decorations-container')) return;

        const body = document.body;
        const bgContainer = document.createElement('div');
        bgContainer.className = 'bg-decorations-container';
        // Ensure it's behind everything
        bgContainer.style.position = 'fixed';
        bgContainer.style.top = '0';
        bgContainer.style.left = '0';
        bgContainer.style.width = '100%';
        bgContainer.style.height = '100%';
        bgContainer.style.zIndex = '-1';
        bgContainer.style.overflow = 'hidden';
        bgContainer.style.pointerEvents = 'none';
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
            el.style.setProperty('--float-duration', shape.animation.split(' ')[1]);
            bgContainer.appendChild(el);
        });

        // 2. Small Neon Stars (Scattered around edges)
        const starCount = 40;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'bg-star';

            // Random position but avoid center 60%
            let x, y;
            if (Math.random() > 0.5) {
                // Left or Right edge
                x = Math.random() > 0.5 ? Math.random() * 15 : 85 + Math.random() * 15;
                y = Math.random() * 100;
            } else {
                // Top or Bottom edge
                x = Math.random() * 100;
                y = Math.random() > 0.5 ? Math.random() * 15 : 85 + Math.random() * 15;
            }

            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            bgContainer.appendChild(star);
        }
    }

    createBackgroundDecorations();
    // Background Decoration: Floating Shapes & Neon Stars
    function createBackgroundDecorations() {
        // Only run if not already created
        if (document.querySelector('.bg-decorations-container')) return;

        const body = document.body;
        const bgContainer = document.createElement('div');
        bgContainer.className = 'bg-decorations-container';
        // Ensure it's behind everything
        bgContainer.style.position = 'fixed';
        bgContainer.style.top = '0';
        bgContainer.style.left = '0';
        bgContainer.style.width = '100%';
        bgContainer.style.height = '100%';
        bgContainer.style.zIndex = '-1';
        bgContainer.style.overflow = 'hidden';
        bgContainer.style.pointerEvents = 'none';
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
            el.style.setProperty('--float-duration', shape.animation.split(' ')[1]);
            bgContainer.appendChild(el);
        });

        // 2. Small Neon Stars (Scattered around edges)
        const starCount = 40;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'bg-star';

            // Random position but avoid center 60%
            let x, y;
            if (Math.random() > 0.5) {
                // Left or Right edge
                x = Math.random() > 0.5 ? Math.random() * 15 : 85 + Math.random() * 15;
                y = Math.random() * 100;
            } else {
                // Top or Bottom edge
                x = Math.random() * 100;
                y = Math.random() > 0.5 ? Math.random() * 15 : 85 + Math.random() * 15;
            }

            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            bgContainer.appendChild(star);
        }
    }

    createBackgroundDecorations();
});
