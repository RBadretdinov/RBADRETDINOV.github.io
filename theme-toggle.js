// Theme Toggle Functionality
(function() {
    // Get theme from localStorage or default to dark
    const getTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'dark';
    };

    // Set theme
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    // Initialize theme on page load
    const initTheme = () => {
        const theme = getTheme();
        setTheme(theme);
    };

    // Toggle theme
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    // Initialize on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }

    // Add click handler to theme toggle button
    document.addEventListener('DOMContentLoaded', () => {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
    });

    // Make toggleTheme available globally for inline handlers (if needed)
    window.toggleTheme = toggleTheme;
})();

