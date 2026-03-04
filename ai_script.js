document.addEventListener('DOMContentLoaded', () => {
    const aiMascot = document.getElementById('aiMascot');
    const aiMenu = document.getElementById('aiMenu');
    const aiTooltip = document.getElementById('aiTooltip');
    const aiCloseMenu = document.getElementById('aiCloseMenu');
    const mascot3d = document.querySelector('.ai-mascot-3d');

    if (mascot3d && aiMenu) {
        // Toggle menu when clicking the mascot
        mascot3d.addEventListener('click', (e) => {
            e.stopPropagation();
            aiMenu.classList.toggle('active');

            // Hide tooltip when menu is open
            if (aiMenu.classList.contains('active')) {
                aiTooltip.style.display = 'none';
            } else {
                aiTooltip.style.display = 'block';
            }
        });

        // Close menu
        aiCloseMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            aiMenu.classList.remove('active');
            aiTooltip.style.display = 'block';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!aiMascot.contains(e.target) && aiMenu.classList.contains('active')) {
                aiMenu.classList.remove('active');
                aiTooltip.style.display = 'block';
            }
        });
    }
});
