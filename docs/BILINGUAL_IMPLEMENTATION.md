# Bilingual Feature Implementation Guide
## Step-by-Step Implementation Instructions

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Phase 1: Infrastructure Setup](#phase-1-infrastructure-setup)
3. [Phase 2: File Structure Migration](#phase-2-file-structure-migration)
4. [Phase 3: Language Toggle Implementation](#phase-3-language-toggle-implementation)
5. [Phase 4: Content Translation](#phase-4-content-translation)
6. [Phase 5: Navigation Updates](#phase-5-navigation-updates)
7. [Phase 6: SEO & Polish](#phase-6-seo--polish)
8. [Testing Checklist](#testing-checklist)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting implementation:

- ✅ Review `BILINGUAL_FEATURE.md` for feature requirements
- ✅ Backup current project files
- ✅ Ensure all existing pages are working correctly
- ✅ Have Russian translations ready (or plan to translate as you go)

---

## Phase 1: Infrastructure Setup

### Step 1.1: Create `language-toggle.js`

Create a new file `language-toggle.js` in the root directory with the following code:

```javascript
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
```

### Step 1.2: Add Language Toggle Styles to `style.css`

Add the following CSS to `style.css` (add after the theme toggle styles):

```css
/* Language Toggle */
.language-toggle {
    background: transparent;
    border: 1px solid var(--border-color);
    color: var(--text-color);
    padding: 0.5rem 1rem;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-block;
}

.language-toggle:hover {
    background-color: var(--surface-color);
    border-color: var(--primary-color);
    color: var(--primary-color);
    transform: translateY(-1px);
}

.language-toggle:active {
    transform: translateY(0);
}

/* Mobile responsive */
@media (max-width: 768px) {
    .language-toggle {
        padding: 0.4rem 0.8rem;
        font-size: 0.85rem;
    }
}
```

---

## Phase 2: File Structure Migration

### Step 2.1: Create Directory Structure

Create the following directories:

```bash
# Create directories
mkdir en
mkdir ru
```

### Step 2.2: Move Existing Files to `en/` Directory

Move all existing HTML files to the `en/` directory:

**Files to move:**
- `index.html` → `en/index.html`
- `about.html` → `en/about.html`
- `skills.html` → `en/skills.html`
- `technical-skills.html` → `en/technical-skills.html`
- `certifications.html` → `en/certifications.html`
- `projects.html` → `en/projects.html`
- `resume.html` → `en/resume.html`
- `professional-skills.html` → `en/professional-skills.html` (if exists)

### Step 2.3: Update Asset Paths in English Pages

For each file in `en/`, update asset paths to use absolute paths:

**Before:**
```html
<link rel="stylesheet" href="style.css">
<script src="theme-toggle.js" defer></script>
<img src="assets/images/portfolio-pic.png">
```

**After:**
```html
<link rel="stylesheet" href="/style.css">
<script src="/theme-toggle.js" defer></script>
<script src="/language-toggle.js" defer></script>
<img src="/assets/images/portfolio-pic.png">
```

**Files to update:**
- All files in `en/` directory
- Update CSS links: `href="style.css"` → `href="/style.css"`
- Update JS script tags: `src="theme-toggle.js"` → `src="/theme-toggle.js"`
- Add: `<script src="/language-toggle.js" defer></script>`
- Update image paths: `src="assets/..."` → `src="/assets/..."`

### Step 2.4: Update Navigation Links in English Pages

Update all internal navigation links to include `/en/` prefix:

**Before:**
```html
<a href="index.html">Home</a>
<a href="about.html">About Me</a>
```

**After:**
```html
<a href="/en/index.html">Home</a>
<a href="/en/about.html">About Me</a>
```

**Files to update:**
- All navigation menus in `en/` directory
- All internal links (buttons, cards, etc.)

### Step 2.5: Add Language Toggle to Navigation

Add the language toggle button to the navigation bar in all English pages.

**Find this section in each HTML file:**
```html
<li>
    <button class="theme-toggle" aria-label="Toggle theme" title="Toggle light/dark mode">
        <!-- SVG icons -->
    </button>
</li>
```

**Add after the theme toggle (before closing `</li>`):**
```html
<li>
    <button class="theme-toggle" aria-label="Toggle theme" title="Toggle light/dark mode">
        <!-- SVG icons -->
    </button>
    <a href="#" class="language-toggle" aria-label="Switch to Russian">Ru</a>
</li>
```

**Note:** The `href="#"` will be updated by `language-toggle.js` on page load.

---

## Phase 3: Language Toggle Implementation

### Step 3.1: Verify Language Toggle Script

1. Ensure `language-toggle.js` is in the root directory
2. Ensure all pages in `en/` include:
   ```html
   <script src="/language-toggle.js" defer></script>
   ```
3. Ensure all pages have the language toggle button in navigation

### Step 3.2: Test Language Toggle on English Pages

1. Open `en/index.html` in browser
2. Verify "Ru" button appears in navigation
3. Click "Ru" button
4. Should navigate to `/ru/index.html` (will be created in Phase 4)

---

## Phase 4: Content Translation

### Step 4.1: Create Russian Page Templates

For each page in `en/`, create a corresponding page in `ru/`:

1. Copy `en/index.html` → `ru/index.html`
2. Copy `en/about.html` → `ru/about.html`
3. Copy `en/skills.html` → `ru/skills.html`
4. Copy `en/technical-skills.html` → `ru/technical-skills.html`
5. Copy `en/certifications.html` → `ru/certifications.html`
6. Copy `en/projects.html` → `ru/projects.html`
7. Copy `en/resume.html` → `ru/resume.html`
8. Copy `en/professional-skills.html` → `ru/professional-skills.html` (if exists)

### Step 4.2: Update Russian Pages - Metadata

For each Russian page, update:

1. **HTML lang attribute:**
   ```html
   <html lang="ru">
   ```

2. **Title tag:**
   ```html
   <title>Роман Бадретдинов - Портфолио</title>
   ```

3. **Meta description:**
   ```html
   <meta name="description" content="Личный сайт-портфолио">
   ```

### Step 4.3: Translate Navigation Elements

Update navigation in all Russian pages:

**English:**
```html
<a href="/en/index.html" class="nav-link">Home</a>
<a href="/en/about.html" class="nav-link">About Me</a>
<a href="/en/skills.html" class="nav-link">Skills</a>
```

**Russian:**
```html
<a href="/ru/index.html" class="nav-link">Главная</a>
<a href="/ru/about.html" class="nav-link">Обо мне</a>
<a href="/ru/skills.html" class="nav-link">Навыки</a>
```

**Translation Reference:**
- Home → Главная
- About Me → Обо мне
- Skills → Навыки
- Technical Skills → Технические навыки
- Certifications → Сертификаты
- Projects → Проекты
- Resume → Резюме

### Step 4.4: Translate Page Content

For each Russian page, translate:

1. **Headings (h1, h2, h3, etc.)**
2. **Paragraphs and text content**
3. **Button labels**
4. **Link text**
5. **Footer text**

**Example - Footer:**
```html
<!-- English -->
<p>&copy; 2025 Roman Badretdinov. All rights reserved.</p>

<!-- Russian -->
<p>&copy; 2025 Роман Бадретдинов. Все права защищены.</p>
```

### Step 4.5: Update Navigation Links in Russian Pages

Update all internal navigation links to include `/ru/` prefix:

```html
<a href="/ru/index.html">Главная</a>
<a href="/ru/about.html">Обо мне</a>
```

### Step 4.6: Verify Language Toggle on Russian Pages

1. Open `ru/index.html` in browser
2. Verify "En" button appears in navigation
3. Click "En" button
4. Should navigate to `/en/index.html`

---

## Phase 5: Navigation Updates

### Step 5.1: Update All Internal Links

Ensure all internal links (not just navigation) use absolute paths with language prefix:

**In English pages (`en/`):**
- All links should start with `/en/`
- Example: `<a href="/en/about.html">About Me</a>`

**In Russian pages (`ru/`):**
- All links should start with `/ru/`
- Example: `<a href="/ru/about.html">Обо мне</a>`

### Step 5.2: Update Dropdown Menus

Update dropdown menu links in both languages:

**English (`en/skills.html`):**
```html
<ul class="dropdown-menu">
    <li><a href="/en/technical-skills.html">Technical Skills</a></li>
    <li><a href="/en/certifications.html">Certifications</a></li>
</ul>
```

**Russian (`ru/skills.html`):**
```html
<ul class="dropdown-menu">
    <li><a href="/ru/technical-skills.html">Технические навыки</a></li>
    <li><a href="/ru/certifications.html">Сертификаты</a></li>
</ul>
```

### Step 5.3: Update Home Page Navigation Buttons

Update the home page navigation buttons:

**English (`en/index.html`):**
```html
<div class="home-nav-buttons">
    <a href="/en/about.html" class="home-nav-btn"><span>About Me</span></a>
    <a href="/en/skills.html" class="home-nav-btn"><span>Skills</span></a>
    <a href="/en/projects.html" class="home-nav-btn"><span>Projects</span></a>
    <a href="/en/resume.html" class="home-nav-btn"><span>Resume</span></a>
</div>
```

**Russian (`ru/index.html`):**
```html
<div class="home-nav-buttons">
    <a href="/ru/about.html" class="home-nav-btn"><span>Обо мне</span></a>
    <a href="/ru/skills.html" class="home-nav-btn"><span>Навыки</span></a>
    <a href="/ru/projects.html" class="home-nav-btn"><span>Проекты</span></a>
    <a href="/ru/resume.html" class="home-nav-btn"><span>Резюме</span></a>
</div>
```

---

## Phase 6: SEO & Polish

### Step 6.1: Add hreflang Tags

Add hreflang tags to all pages (both English and Russian versions).

**In `<head>` section of each page, add:**

**English pages (`en/`):**
```html
<link rel="alternate" hreflang="en" href="https://yourdomain.com/en/index.html">
<link rel="alternate" hreflang="ru" href="https://yourdomain.com/ru/index.html">
<link rel="alternate" hreflang="x-default" href="https://yourdomain.com/en/index.html">
```

**Russian pages (`ru/`):**
```html
<link rel="alternate" hreflang="en" href="https://yourdomain.com/en/index.html">
<link rel="alternate" hreflang="ru" href="https://yourdomain.com/ru/index.html">
<link rel="alternate" hreflang="x-default" href="https://yourdomain.com/en/index.html">
```

**Note:** Replace `yourdomain.com` with your actual domain.

### Step 6.2: Add Canonical Tags

Add canonical tags to each page:

**English pages:**
```html
<link rel="canonical" href="https://yourdomain.com/en/index.html">
```

**Russian pages:**
```html
<link rel="canonical" href="https://yourdomain.com/ru/index.html">
```

### Step 6.3: Handle Root index.html

Create or update root `index.html` to redirect to English version:

**Option A: Redirect (using meta refresh):**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=/en/index.html">
    <title>Redirecting...</title>
</head>
<body>
    <p>Redirecting to <a href="/en/index.html">English version</a>...</p>
</body>
</html>
```

**Option B: JavaScript redirect:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Redirecting...</title>
    <script>
        window.location.href = '/en/index.html';
    </script>
</head>
<body>
    <p>Redirecting...</p>
</body>
</html>
```

### Step 6.4: Update Logo Links

Update logo links in navigation to point to language-specific home:

**English pages:**
```html
<a href="/en/index.html" class="nav-logo">Roman Badretdinov</a>
```

**Russian pages:**
```html
<a href="/ru/index.html" class="nav-logo">Роман Бадретдинов</a>
```

---

## Testing Checklist

### Functionality Tests

- [ ] Language toggle appears on all English pages (`/en/`)
- [ ] Language toggle shows "Ru" on English pages
- [ ] Language toggle appears on all Russian pages (`/ru/`)
- [ ] Language toggle shows "En" on Russian pages
- [ ] Clicking toggle navigates to same page in other language
- [ ] HTML `lang` attribute is correct (`lang="en"` or `lang="ru"`)
- [ ] All navigation links work correctly
- [ ] All internal page links work correctly
- [ ] Dropdown menus work correctly
- [ ] Home page navigation buttons work correctly

### Asset Tests

- [ ] CSS loads correctly on all pages
- [ ] JavaScript files load correctly
- [ ] Images display correctly
- [ ] Fonts load correctly
- [ ] PDFs accessible (if linked)

### Navigation Tests

- [ ] Can navigate from English to Russian and back
- [ ] Can navigate between pages within same language
- [ ] Browser back/forward buttons work correctly
- [ ] Direct URL access works (e.g., `/ru/about.html`)
- [ ] Bookmarked pages load in correct language

### SEO Tests

- [ ] hreflang tags present on all pages
- [ ] Canonical tags present on all pages
- [ ] Meta descriptions are language-specific
- [ ] Title tags are language-specific

### Responsive Tests

- [ ] Language toggle visible on mobile
- [ ] Language toggle clickable on mobile
- [ ] Navigation works on mobile
- [ ] All pages responsive in both languages

### Edge Cases

- [ ] Root URL redirects to `/en/index.html`
- [ ] 404 handling (if page doesn't exist in one language)
- [ ] Special characters in Russian text display correctly
- [ ] Theme toggle works independently of language toggle

---

## Troubleshooting

### Issue: Language toggle not appearing

**Solution:**
1. Check that `language-toggle.js` is in root directory
2. Check that script tag is included: `<script src="/language-toggle.js" defer></script>`
3. Check that HTML has: `<a href="#" class="language-toggle">Ru</a>` or `<a href="#" class="language-toggle">En</a>`
4. Check browser console for JavaScript errors

### Issue: Toggle shows wrong language

**Solution:**
1. Check URL path contains `/en/` or `/ru/`
2. Verify `detectLanguageFromURL()` function in `language-toggle.js`
3. Check browser console for errors

### Issue: Assets not loading (404 errors)

**Solution:**
1. Verify all asset paths use absolute paths (`/assets/...` not `assets/...`)
2. Check CSS link: `href="/style.css"` not `href="style.css"`
3. Check JS script tags use absolute paths
4. Verify assets folder is in root directory

### Issue: Navigation links broken

**Solution:**
1. Verify all links include language prefix (`/en/` or `/ru/`)
2. Check that target pages exist in correct language directory
3. Verify absolute paths are used

### Issue: Russian text not displaying correctly

**Solution:**
1. Ensure `<meta charset="UTF-8">` is in `<head>`
2. Verify HTML `lang="ru"` attribute
3. Check that font supports Cyrillic characters
4. Verify file encoding is UTF-8

### Issue: Language toggle doesn't navigate

**Solution:**
1. Check that `getAlternateLanguagePage()` returns correct path
2. Verify target page exists
3. Check browser console for JavaScript errors
4. Verify href is being updated: inspect element after page load

---

## File Checklist

### Files to Create

- [ ] `language-toggle.js` (root)
- [ ] `en/index.html`
- [ ] `en/about.html`
- [ ] `en/skills.html`
- [ ] `en/technical-skills.html`
- [ ] `en/certifications.html`
- [ ] `en/projects.html`
- [ ] `en/resume.html`
- [ ] `en/professional-skills.html` (if exists)
- [ ] `ru/index.html`
- [ ] `ru/about.html`
- [ ] `ru/skills.html`
- [ ] `ru/technical-skills.html`
- [ ] `ru/certifications.html`
- [ ] `ru/projects.html`
- [ ] `ru/resume.html`
- [ ] `ru/professional-skills.html` (if exists)
- [ ] Root `index.html` (redirect)

### Files to Update

- [ ] `style.css` (add language toggle styles)
- [ ] All pages in `en/` (update paths, add toggle, update links)
- [ ] All pages in `ru/` (translate content, update paths, add toggle, update links)

---

## Implementation Order Summary

1. ✅ Create `language-toggle.js`
2. ✅ Add CSS styles for language toggle
3. ✅ Create `en/` and `ru/` directories
4. ✅ Move existing HTML files to `en/`
5. ✅ Update asset paths in `en/` pages (absolute paths)
6. ✅ Add language toggle button to `en/` pages
7. ✅ Update navigation links in `en/` pages
8. ✅ Copy `en/` pages to `ru/` directory
9. ✅ Translate all `ru/` pages
10. ✅ Update navigation links in `ru/` pages
11. ✅ Add hreflang and canonical tags
12. ✅ Create root `index.html` redirect
13. ✅ Test everything
14. ✅ Fix any issues

---

## Notes

- **Asset Paths**: Always use absolute paths (`/assets/...`) for consistency
- **Language Detection**: Based on URL path, not localStorage
- **Toggle Display**: Shows only the other language option
- **No Persistence**: Language state is URL-based only
- **Theme Toggle**: Works independently of language toggle
- **Testing**: Test thoroughly on both desktop and mobile

---

**Document Version**: 1.0  
**Created**: 2025-01-20  
**Status**: Implementation Guide - Ready to Use









