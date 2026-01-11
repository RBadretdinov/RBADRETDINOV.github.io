# Bilingual Feature Implementation Plan
## English (En) and Russian (Ru) Language Support

---

## Overview

This document describes the implementation plan for adding bilingual support (English and Russian) to the portfolio website. The feature will allow users to switch between English and Russian versions of all pages, similar to the existing light/dark theme toggle functionality.

---

## Feature Requirements

### 1. Language Toggle Component
- **Location**: Navigation bar, next to the theme toggle button
- **Design**: Button/toggle similar to the theme toggle
- **Labels**: Shows only the other language option (not the current one)
- **Functionality**: 
  - On English pages: Shows "Ru" button/link
  - On Russian pages: Shows "En" button/link
  - Clicking the toggle navigates to the same page in the other language
  - No persistence: Language is determined by current URL path

### 2. Page Structure

**DECISION: Subdirectory Structure (Option B)**

- **English pages**: Located in `en/` subdirectory
  - Example: `en/index.html`, `en/about.html`, `en/skills.html`
- **Russian pages**: Located in `ru/` subdirectory
  - Example: `ru/index.html`, `ru/about.html`, `ru/skills.html`
- **Root**: Root `index.html` can redirect to `en/index.html` or serve as English default

### 3. URL Structure

**DECISION: Subdirectory Structure Matching Folder Organization**

- **English URLs**: `/en/index.html`, `/en/about.html`, `/en/skills.html`, etc.
- **Russian URLs**: `/ru/index.html`, `/ru/about.html`, `/ru/skills.html`, etc.
- **URL reflects language**: The language is visible in the URL path
- **Consistent structure**: URL structure directly mirrors the folder structure

### 4. Pages to Translate

All existing pages need Russian versions:
- `index.html` → Home page
- `about.html` → About Me
- `skills.html` → Skills landing
- `technical-skills.html` → Technical Skills
- `certifications.html` → Certifications
- `projects.html` → Projects
- `resume.html` → Resume
- `professional-skills.html` → Professional Skills (if applicable)

### 5. Content to Translate

#### Navigation Elements
- Logo text (if applicable)
- Navigation menu items:
  - "Home"
  - "About Me"
  - "Skills"
  - "Technical Skills"
  - "Certifications"
  - "Projects"
  - "Resume"
- Dropdown menu labels

#### Page Content
- All headings (h1, h2, h3, etc.)
- All paragraphs and text content
- Button labels
- Links text
- Form labels (if any)
- Footer text

#### Metadata
- `<html lang="en">` → `<html lang="ru">` for Russian pages
- `<title>` tags
- `<meta name="description">` tags
- `aria-label` attributes

#### Static Content
- Footer copyright text
- Alt text for images (if descriptive)
- Placeholder text (if any)

### 6. Language Toggle Implementation

#### Visual Design
- Position: Next to theme toggle in navigation bar
- Style: Similar button style to theme toggle
- **DECISION: Show Only Other Language**
  - Display: Single button/link showing only the other language option
  - On English pages (`/en/`): Shows "Ru" button
  - On Russian pages (`/ru/`): Shows "En" button
  - No current language indicator: Only the switchable option is visible
- No icons: Simple text-based design for clarity

#### Behavior
- **Language Detection**: Determined from current URL path (`/en/` or `/ru/`)
- **Toggle Display**: Only shows the other language option
  - If on `/en/about.html` → Shows "Ru" button linking to `/ru/about.html`
  - If on `/ru/about.html` → Shows "En" button linking to `/en/about.html`
- **Navigation**: Clicking the toggle navigates to same page in other language directory
- **No Persistence**: Language state is determined by URL, not stored in localStorage

### 7. Technical Implementation

#### JavaScript Module: `language-toggle.js`

**Why we need this module:**
- Detect current language from URL path (`/en/` or `/ru/`)
- Extract current page filename from URL
- Calculate the corresponding page path in the other language directory
- Update the language toggle button to show correct language and link
- Handle navigation when toggle is clicked
- Update HTML `lang` attribute based on current URL

**Functions Needed:**
```javascript
- detectLanguageFromURL() // Detect current language from URL path (/en/ or /ru/)
- getCurrentPage() // Get current page filename (e.g., "about.html")
- getAlternateLanguagePage() // Calculate corresponding page in other language directory
- initLanguageToggle() // Initialize toggle on page load - set button text and link
- switchLanguage() // Navigate to same page in other language (when toggle clicked)
- updateHTMLlang() // Update <html lang="en"> or <html lang="ru"> attribute
```

#### Page Mapping Logic
- **URL Detection**: Detect current language from URL path
  - If URL contains `/en/` → English
  - If URL contains `/ru/` → Russian
  - If root URL → Default to English
- **Page Mapping**: Map each page to its counterpart
  - `en/index.html` ↔ `ru/index.html`
  - `en/about.html` ↔ `ru/about.html`
  - `en/skills.html` ↔ `ru/skills.html`
  - etc.
- **Navigation**: When switching languages:
  - Extract current page filename from URL
  - Determine current language from URL path
  - Calculate target language directory (opposite of current)
  - Navigate to same page in other language directory
  - No localStorage: Language state is URL-based only
- **Edge Cases**:
  - Direct URL access: Detect language from URL, update toggle accordingly
  - Bookmarked pages: Load in correct language, toggle shows other language option
  - Browser navigation: Language determined by URL path

### 8. SEO Considerations

- **hreflang tags**: Add `<link rel="alternate" hreflang="en">` and `<link rel="alternate" hreflang="ru">` to all pages
- **Canonical URLs**: Set appropriate canonical tags
- **Language-specific meta descriptions**: Different descriptions for each language
- **Sitemap**: Include both language versions in sitemap.xml

### 9. Browser Language Detection

**DECISION: No Automatic Detection**

- No automatic browser language detection
- Users must manually select their preferred language by clicking the toggle
- Default language is always English (`en`) when accessing root URL
- No localStorage: Language is determined by URL path only

### 10. Content Management

**DECISION: Separate HTML Files for Each Language**

- **Approach**: Each page has two separate HTML files (one in `en/`, one in `ru/`)
- **Pros**: 
  - Simple and straightforward
  - SEO-friendly (each language has its own URL)
  - Fast loading (no JavaScript required for content)
  - Easy to maintain individual page translations
- **Structure**: 
  - English: `en/index.html`, `en/about.html`, etc.
  - Russian: `ru/index.html`, `ru/about.html`, etc.
- **Maintenance**: Each language version is maintained independently

### 11. Implementation Phases

#### Phase 1: Infrastructure
1. Create `language-toggle.js` module
   - URL-based language detection
   - Page mapping logic
   - Toggle button initialization
   - Navigation handling
2. Add language toggle button to navigation (all pages)
   - Button shows only the other language option
   - Link points to corresponding page in other language directory
3. Create page mapping system
   - Map English pages to Russian equivalents
   - Handle all page types (index, about, skills, etc.)

#### Phase 2: Content Translation
1. Translate navigation elements
2. Translate each page content (one page at a time)
3. Create Russian versions of all pages
4. Update metadata (lang attributes, titles, descriptions)

#### Phase 3: Polish & Testing
1. Test language switching on all pages
2. Test direct URL access (bookmarks, direct links)
3. Verify all links work correctly
4. Test browser back/forward navigation
5. Add hreflang tags for SEO
6. Test responsive design with language toggle

### 12. File Structure (Final)

```
github-eportfolio/
├── index.html (root - redirects to en/index.html or serves as English default)
├── en/
│   ├── index.html
│   ├── about.html
│   ├── skills.html
│   ├── technical-skills.html
│   ├── certifications.html
│   ├── projects.html
│   ├── resume.html
│   └── professional-skills.html
├── ru/
│   ├── index.html
│   ├── about.html
│   ├── skills.html
│   ├── technical-skills.html
│   ├── certifications.html
│   ├── projects.html
│   ├── resume.html
│   └── professional-skills.html
├── language-toggle.js (new)
├── theme-toggle.js (existing)
├── animations.js (existing)
├── style.css (updated for language toggle)
└── assets/
    ├── icons/
    ├── images/
    └── pdfs/
```

**Note**: All shared assets (CSS, JS, images) remain in root or assets folder and are referenced with relative paths from both `en/` and `ru/` directories.

### 13. Styling Considerations

- Language toggle button styling in `style.css`
- Active/inactive states for language indicators
- Responsive design (mobile-friendly toggle)
- Consistent with existing theme toggle design
- Hover effects and transitions

### 14. Edge Cases to Handle

1. **Direct URL access**: User visits `ru/index.html` directly
   - Detect language from URL path (`/ru/`)
   - Language toggle should show "En" button (other language option)
   - No localStorage needed - language determined from URL
   
2. **Bookmarked pages**: User has bookmarked Russian page (`ru/about.html`)
   - Should load in Russian (determined by URL)
   - Language toggle should show "En" button linking to `en/about.html`
   
3. **404 errors**: User tries to access non-existent language version
   - Fallback to English version (`en/`) or show 404 error
   - Check if English version exists before falling back
   
4. **Missing translations**: Some content not yet translated
   - All pages should have Russian versions created
   - If a page is missing, redirect to English version
   
5. **Browser navigation**: Back/forward buttons
   - Language determined by URL path
   - Toggle updates based on current URL
   - No persistence needed - URL is the source of truth
   
6. **Root URL access**: User visits root `index.html`
   - Default to English (`en/index.html`)
   - Can redirect or serve English content directly
   - Toggle shows "Ru" button

---

## Decisions Made

✅ **File Structure**: Russian pages in `ru/` subdirectory, English pages in `en/` subdirectory

✅ **URL Structure**: URLs reflect folder structure (`/en/` and `/ru/` prefixes visible in URL)

✅ **Automatic Detection**: No automatic browser language detection

✅ **Translation Storage**: Separate HTML files for each language

✅ **Toggle Design**: Show only the other language option (not current language)
  - On English pages: Shows "Ru" button
  - On Russian pages: Shows "En" button

✅ **Default Language**: English (`en`) is the default language

✅ **No Persistence**: Language is determined by URL path, not stored in localStorage

---

## Technical Implementation Details

### Asset Path Handling

Since pages will be in subdirectories (`en/` and `ru/`), asset references need to be adjusted:

- **Current structure**: Assets referenced from root (e.g., `assets/images/...`)
- **New structure**: Pages in subdirectories need to go up one level
- **Solution**: Use relative paths `../assets/...` or absolute paths `/assets/...`
  - Relative: `../assets/images/portfolio-pic.png` (from `en/index.html`)
  - Absolute: `/assets/images/portfolio-pic.png` (works from any location)
- **Recommendation**: Use absolute paths (`/assets/...`) for consistency and easier maintenance

### Language Toggle HTML Structure

**DECISION: Show Only Other Language Option**

On English pages (`/en/`):
```html
<a href="/ru/index.html" class="language-toggle" aria-label="Switch to Russian">Ru</a>
```

On Russian pages (`/ru/`):
```html
<a href="/en/index.html" class="language-toggle" aria-label="Switch to English">En</a>
```

**Note**: The href will be dynamically updated by `language-toggle.js` to point to the same page in the other language directory.

### Navigation Link Updates

All internal navigation links need to be updated to include language prefix:
- Current: `href="about.html"`
- New: `href="en/about.html"` or `href="ru/about.html"` (depending on current language)
- Or use relative paths: `href="../en/about.html"` when in `ru/` directory

**Recommendation**: Use JavaScript to dynamically update navigation links based on current language, or use absolute paths with language prefix.

---

## Remaining Questions (Optional)

1. **Content Priority**: Which pages should be translated first?
   - All at once
   - Priority order (e.g., Home → About → Skills → Projects → Resume)

2. **Root Index Handling**: How should root `index.html` be handled?
   - Redirect to `en/index.html`
   - Serve as English default (copy of `en/index.html`)
   - Show language selection page

3. **Navigation Links**: How should navigation links be handled?
   - Hardcode language prefix in each link (`en/about.html`, `ru/about.html`)
   - Use JavaScript to dynamically add language prefix
   - Use relative paths and let language toggle handle navigation

---

## Next Steps

1. **Review this document** and answer clarification questions
2. **Decide on file structure and URL approach**
3. **Create translation content** for all pages
4. **Implement language toggle infrastructure**
5. **Create Russian versions of all pages**
6. **Test thoroughly** across all pages and scenarios
7. **Add SEO enhancements** (hreflang tags, etc.)

---

## Notes

- This feature should work independently of the theme toggle
- Language is determined by URL path, not stored in localStorage
- Theme preference (localStorage) and language (URL-based) work independently
- Both features should work together seamlessly
- Consider accessibility (ARIA labels, keyboard navigation)
- Ensure mobile responsiveness of language toggle
- Language toggle shows only the other language option (not current language)

---

**Document Version**: 3.0  
**Created**: 2025-01-20  
**Updated**: 2025-01-20  
**Status**: Ready for Implementation - All Decisions Finalized

