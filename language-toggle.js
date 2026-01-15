// Language Toggle Functionality
(function() {
    'use strict';

    // Detect current language from URL path
    const detectLanguageFromURL = () => {
        const path = window.location.pathname;
        if (path.includes('/ru/')) {
            return 'ru';
        } else if (path.includes('/en/')) {
            return 'en';
        }
        // Default to English if no language in path
        return 'en';
    };

    // Get current page filename from URL
    const getCurrentPage = () => {
        const path = window.location.pathname;
        const pathParts = path.split('/').filter(part => part);
        
        // If path is like /en/about.html or /ru/about.html
        if (pathParts.length >= 2) {
            return pathParts[pathParts.length - 1];
        }
        // If path is root or just filename
        return pathParts[pathParts.length - 1] || 'index.html';
    };

    // Calculate corresponding page in other language directory
    const getAlternateLanguagePage = () => {
        const currentLang = detectLanguageFromURL();
        const currentPage = getCurrentPage();
        const targetLang = currentLang === 'en' ? 'ru' : 'en';
        
        return `/${targetLang}/${currentPage}`;
    };

    // Get alternate language code
    const getAlternateLanguage = () => {
        const currentLang = detectLanguageFromURL();
        return currentLang === 'en' ? 'ru' : 'en';
    };

    // Update HTML lang attribute
    const updateHTMLlang = () => {
        const currentLang = detectLanguageFromURL();
        document.documentElement.setAttribute('lang', currentLang);
    };

    // Initialize language toggle on page load
    const initLanguageToggle = () => {
        const toggle = document.querySelector('.language-toggle');
        if (!toggle) return;

        const alternateLang = getAlternateLanguage();
        const alternatePage = getAlternateLanguagePage();

        // Update button text
        toggle.textContent = alternateLang === 'en' ? 'En' : 'Ru';
        
        // Update href
        toggle.setAttribute('href', alternatePage);
        
        // Update aria-label
        const label = alternateLang === 'en' 
            ? 'Switch to English' 
            : 'Switch to Russian';
        toggle.setAttribute('aria-label', label);
        toggle.setAttribute('title', label);
    };

    // Initialize on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            updateHTMLlang();
            initLanguageToggle();
        });
    } else {
        updateHTMLlang();
        initLanguageToggle();
    }
})();





