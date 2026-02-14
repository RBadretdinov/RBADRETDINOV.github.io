const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Sections to include in order
const sections = [
    { file: 'index.html', title: 'Home' },
    { file: 'about.html', title: 'About Me' },
    { file: 'technical-skills.html', title: 'Technical Skills' },
    { file: 'certifications.html', title: 'Certifications' },
    { file: 'projects.html', title: 'Projects' },
    { file: 'resume.html', title: 'Resume' }
];

function extractMainContent(htmlContent) {
    // Remove script tags completely
    htmlContent = htmlContent.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    
    // Extract main content - find <main> tag and its content
    const mainMatch = htmlContent.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    if (!mainMatch) {
        console.warn('No main tag found');
        return '';
    }
    
    let mainContent = mainMatch[1];
    
    // Remove buttons
    mainContent = mainContent.replace(/<button[^>]*>[\s\S]*?<\/button>/gi, '');
    
    // Remove contact links (but keep the container structure)
    mainContent = mainContent.replace(/<div[^>]*class=["'][^"']*contact-links[^"']*["'][^>]*>[\s\S]*?<\/div>/gi, '');
    
    // Remove download button sections
    mainContent = mainContent.replace(/<div[^>]*class=["'][^"']*resume-download[^"']*["'][^>]*>[\s\S]*?<\/div>/gi, '');
    
    // Remove home page nav buttons (About Me, Skills, Projects, Resume) - not needed in PDF
    mainContent = mainContent.replace(/<div[^>]*class=["'][^"']*home-nav-buttons[^"']*["'][^>]*>[\s\S]*?<\/div>/gi, '');
    
    // Remove project links (the GitHub/demo buttons) but keep the structure
    mainContent = mainContent.replace(/<div[^>]*class=["'][^"']*project-links[^"']*["'][^>]*>[\s\S]*?<\/div>/gi, '');
    
    // Convert remaining links to spans (keep text, remove href)
    mainContent = mainContent.replace(/<a\s+([^>]*\s+)?href=["'][^"']*["'][^>]*>/gi, '<span>');
    mainContent = mainContent.replace(/<\/a>/gi, '</span>');
    
    // Remove onclick and other event attributes
    mainContent = mainContent.replace(/\s+on\w+=["'][^"']*["']/gi, '');
    
    // Fix image paths - convert absolute paths starting with / to relative
    // This handles paths like /assets/images/... -> assets/images/...
    mainContent = mainContent.replace(/src=["']\/([^"']+)["']/g, (match, imgPath) => {
        // Remove leading slash to make it relative
        return `src="${imgPath}"`;
    });
    
    return mainContent;
}

/** Wrap each <div class="project-card"> in a full-page flex container so it centers vertically on its PDF page */
function wrapProjectCardsForPdf(html) {
    const re = /<div class="project-card"[^>]*>/gi;
    const segments = [];
    let lastEnd = 0;
    let m;
    while ((m = re.exec(html)) !== null) {
        const start = m.index;
        const tagLen = m[0].length;
        let depth = 1;
        let pos = start + tagLen;
        while (depth > 0 && pos < html.length) {
            const nextOpen = html.indexOf('<div', pos);
            const nextClose = html.indexOf('</div>', pos);
            if (nextClose === -1) break;
            if (nextOpen !== -1 && nextOpen < nextClose) {
                depth++;
                pos = nextOpen + 4;
            } else {
                depth--;
                pos = nextClose + 6;
                if (depth === 0) {
                    const end = nextClose + 6;
                    segments.push({ before: html.slice(lastEnd, start), card: html.slice(start, end) });
                    lastEnd = end;
                    break;
                }
            }
        }
    }
    if (segments.length === 0) return html;
    let out = '';
    for (let i = 0; i < segments.length; i++) {
        out += segments[i].before;
        out += '<div class="pdf-project-page-wrap">' + segments[i].card + '</div>';
    }
    out += html.slice(lastEnd);
    return out;
}

function combineSections(lang) {
    const langDir = path.join(__dirname, lang);
    const stylePath = path.join(__dirname, 'style.css');
    const styles = fs.readFileSync(stylePath, 'utf8');
    
    // Escape backslashes in styles for Windows paths if needed
    const escapedStyles = styles.replace(/\\/g, '\\\\');
    
    let combinedHTML = `<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio - Roman Badretdinov</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        ${escapedStyles}
        
        /* PDF-specific overrides */
        * {
            animation: none !important;
            transition: none !important;
        }
        
        body {
            background-color: var(--bg-color);
            color: var(--text-color);
        }

        /* Flatten layout for print: simple vertical flow */
        main {
            margin: 0 !important;
            padding: 0 !important;
        }
        /* Prevent any section/hero from forcing blank pages (e.g. 80vh) */
        .hero, section, [class*="section"] {
            min-height: auto !important;
            height: auto !important;
        }

        .pdf-section {
            margin-bottom: 1.5rem;
            padding: 1.5rem 0;
        }

        /* Neutralize tall, full-screen sections so they don't create blank pages */
        .about-section,
        .skills-section,
        .projects-section,
        .resume-section {
            padding: 0 !important;
            min-height: auto !important;
            height: auto !important;
            background: none !important;
        }

        /* About Me: start on page 2 so profile/intro aren't cut between page 1 and 2 */
        #section-1 {
            page-break-before: always;
            break-before: page;
        }
        /* About Me: one card per page so pages 3–6 have content (no blank About pages) */
        .about-card {
            page-break-before: always;
            break-before: page;
        }
        /* Center the about cards on pages 3–6 (closer to middle of page) */
        #section-1 .about-card {
            max-width: 680px;
            margin-left: auto;
            margin-right: auto;
            margin-top: 2.5rem;
            margin-bottom: 2rem;
        }

        /* Resume: start on a new page and compact so header isn't stranded at bottom */
        #section-5 .resume-section,
        #section-5 .resume-content,
        #section-5 .resume-document {
            min-height: 0 !important;
            height: auto !important;
            padding-top: 0 !important;
            margin-top: 0 !important;
        }
        #section-5 .resume-document {
            padding: 1rem 1.5rem !important;
        }
        #section-5 {
            page-break-before: always;
            break-before: page;
            padding-top: 0;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
        }
        
        /* Prevent breaking inside important cards/blocks */
        .project-card,
        .about-card,
        .certification-item {
            page-break-inside: avoid;
            break-inside: avoid;
        }
        /* Allow resume sections to flow so Education + Volunteer Work can share a page (no big gap) */
        .resume-section-item {
            page-break-inside: auto;
            break-inside: auto;
        }
        /* Extracurriculars: start on a new page so heading isn't cut off from its content */
        .pdf-extracurriculars-block {
            page-break-before: always;
            break-before: page;
        }
        /* Technical Skills: start on new page so all fit on page 7 (not partly on 6) */
        #section-2 {
            page-break-before: always;
            break-before: page;
        }
        /* Projects subheader (PDF-only): same as category headers e.g. Professional Development */
        .pdf-projects-subheader {
            page-break-after: avoid;
        }
        /* Microsoft 365: move to page 8 (with header, not split across 7/8) */
        .pdf-ms365-block {
            page-break-before: always;
            break-before: page;
        }
        /* Microsoft 2019: move to page 9 (fill blank page 9) */
        .pdf-ms2019-block {
            page-break-before: always;
            break-before: page;
        }
        /* Professional Development certifications: start on page 10 so not split across 9 and 10 */
        .pdf-professional-dev-block {
            page-break-before: always;
            break-before: page;
        }
        /* Center each project card in the middle of its page (center at half page height) */
        .pdf-project-page-wrap {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
        }
        #section-4 .project-card {
            max-width: 720px;
            margin-left: auto;
            margin-right: auto;
        }

        /* Make animated cards visible in PDF (no JS/animations will run) */
        .about-card,
        .project-card,
        .certification-item,
        .certification-item-compact {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
        }
        
        /* Prevent titles from being orphaned */
        .section-title {
            page-break-after: avoid;
            break-after: avoid;
        }
        
        /* Hide navigation and footer */
        nav, .navbar, footer {
            display: none !important;
        }
        
        /* Hide interactive elements */
        button, .theme-toggle, .language-toggle, .home-nav-btn, .project-link, .resume-download-btn, .resume-download, .contact-link {
            display: none !important;
        }
        
        /* Ensure content containers are visible */
        .about-grid, .about-card, .projects-grid, .project-card {
            display: block !important;
            visibility: visible !important;
        }
        
        /* Remove link styling but keep text */
        a {
            text-decoration: none;
            color: inherit;
            cursor: default;
        }
        
        /* Ensure images load */
        img {
            max-width: 100%;
            height: auto;
            display: block;
        }
    </style>
</head>
<body data-theme="light">
    <div class="pdf-container">
`;

    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const filePath = path.join(langDir, section.file);
        
        if (!fs.existsSync(filePath)) {
            console.warn(`File not found: ${filePath}`);
            continue;
        }
        
        const htmlContent = fs.readFileSync(filePath, 'utf8');
        let mainContent = extractMainContent(htmlContent);
        
        if (!mainContent || mainContent.trim().length === 0) {
            console.warn(`Warning: No content extracted from ${section.file}`);
        } else {
            console.log(`✓ Extracted ${mainContent.length} chars from ${section.file}`);
        }
        
        /* PDF-only: remove nav/buttons sentence and add link to full portfolio online */
        if (i === 0 && mainContent) {
            mainContent = mainContent.replace(' Use the navigation bar above or the buttons below to get started.', '');
            mainContent = mainContent.replace(' Используйте навигационную панель выше или кнопки ниже, чтобы начать. ', ' ');
            const portfolioUrl = 'https://rbadretdinov.github.io/';
            mainContent = mainContent.replace(
                /raynor\.roma@gmail\.com([^<]*)(<\/p>)/gi,
                (_, middle, closeTag) => lang === 'ru'
                    ? `raynor.roma@gmail.com${middle}. Полную версию портфолио можно посмотреть на сайте ${portfolioUrl}.${closeTag}`
                    : `raynor.roma@gmail.com${middle}. You can view the full portfolio online at ${portfolioUrl}.${closeTag}`
            );
        }
        /* PDF-only: remove "My Coding Journey" block (keep on website) */
        if (i === 2 && mainContent) {
            mainContent = mainContent.replace(
                /<!-- My Coding Journey -->\s*<div class="skills-category">\s*<h2 class="category-title">[^<]*<\/h2>\s*<div class="coding-journey-content">[\s\S]*?<\/div>\s*<\/div>/gi,
                ''
            );
        }
        /* PDF-only: certification blocks start on dedicated pages (8=MS365, 9=MS2019, 10=Prof Dev) */
        if (i === 3 && mainContent) {
            mainContent = mainContent.replace(
                /<div class="skills-category">\s*<h2 class="category-title">Microsoft 365<\/h2>/gi,
                '<div class="skills-category pdf-ms365-block"><h2 class="category-title">Microsoft 365</h2>'
            );
            mainContent = mainContent.replace(
                /<div class="skills-category">\s*<h2 class="category-title">Microsoft Office 2019<\/h2>/gi,
                '<div class="skills-category pdf-ms2019-block"><h2 class="category-title">Microsoft Office 2019</h2>'
            );
            mainContent = mainContent.replace(
                /<div class="skills-category">\s*<h2 class="category-title">Professional Development<\/h2>/gi,
                '<div class="skills-category pdf-professional-dev-block"><h2 class="category-title">Professional Development</h2>'
            );
            mainContent = mainContent.replace(
                /<div class="skills-category">\s*<h2 class="category-title">Профессиональное развитие<\/h2>/gi,
                '<div class="skills-category pdf-professional-dev-block"><h2 class="category-title">Профессиональное развитие</h2>'
            );
        }
        /* PDF-only: Projects subheader + wrap each card so it centers vertically on its page */
        if (i === 4 && mainContent) {
            const projectsLabel = lang === 'ru' ? 'Проекты' : 'Projects';
            mainContent = `<h2 class="category-title pdf-projects-subheader">${projectsLabel}</h2>` + mainContent;
            mainContent = wrapProjectCardsForPdf(mainContent);
        }
        /* PDF-only: mark Extracurriculars block so it starts on new page (heading not cut off) */
        if (i === 5 && mainContent) {
            mainContent = mainContent.replace(
                /<div class="resume-section-item">\s*<h3 class="resume-section-title">Extracurriculars<\/h3>/gi,
                '<div class="resume-section-item pdf-extracurriculars-block"><h3 class="resume-section-title">Extracurriculars</h3>'
            );
            mainContent = mainContent.replace(
                /<div class="resume-section-item">\s*<h3 class="resume-section-title">Внеклассная деятельность<\/h3>/gi,
                '<div class="resume-section-item pdf-extracurriculars-block"><h3 class="resume-section-title">Внеклассная деятельность</h3>'
            );
        }
        
        combinedHTML += `
        <div class="pdf-section" id="section-${i}">
            ${mainContent}
        </div>`;
    }
    
    combinedHTML += `
    </div>
</body>
</html>`;
    
    // Convert relative image paths to absolute file:// URLs so images load when opening temp file
    const projectRoot = path.resolve(__dirname);
    combinedHTML = combinedHTML.replace(/src=["'](assets\/[^"']+)["']/g, (_, imgPath) => {
        const absolutePath = path.join(projectRoot, imgPath).replace(/\\/g, '/');
        return 'src="file:///' + absolutePath + '"';
    });
    
    return combinedHTML;
}

async function generatePDF(lang) {
    console.log(`Generating PDF for ${lang}...`);
    
    const combinedHTML = combineSections(lang);
    const tempHTMLPath = path.join(__dirname, `temp-${lang}.html`);
    
    // Convert to proper file URL for Windows
    const fileUrl = tempHTMLPath.replace(/\\/g, '/');
    
    fs.writeFileSync(tempHTMLPath, combinedHTML);
    
    // Use system browser (Edge on Windows) - much faster, no download needed
    const browser = await chromium.launch({
        headless: true,
        channel: 'msedge' // Use Edge browser that comes with Windows
    });
    
    try {
        const page = await browser.newPage();
        
        // Set viewport
        await page.setViewportSize({ width: 1200, height: 1600 });
        
        // Load the HTML file - use file:// protocol
        const fileProtocolUrl = `file:///${fileUrl}`;
        await page.goto(fileProtocolUrl, { 
            waitUntil: 'networkidle',
            timeout: 30000 
        });
        
        // Wait for fonts
        await page.evaluate(() => document.fonts.ready);
        
        // Wait for images to load
        await page.waitForTimeout(2000);
        
        // Generate PDF with optimized settings
        const outputPath = path.join(__dirname, `assets/pdfs/portfolio-${lang}.pdf`);
        const pdfDir = path.dirname(outputPath);
        if (!fs.existsSync(pdfDir)) {
            fs.mkdirSync(pdfDir, { recursive: true });
        }
        
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '5mm',
                right: '10mm',
                bottom: '5mm',
                left: '10mm'
            },
            preferCSSPageSize: false,
            displayHeaderFooter: false,
        });
        
        fs.writeFileSync(outputPath, pdfBuffer);
        
        const fileSizeMB = pdfBuffer.length / (1024 * 1024);
        console.log(`✓ Generated ${path.basename(outputPath)} (${fileSizeMB.toFixed(2)} MB)`);
        
        // Clean up temp file
        try {
            fs.unlinkSync(tempHTMLPath);
        } catch (e) {
            // Ignore cleanup errors
        }
        
        return { path: outputPath, size: fileSizeMB };
    } catch (error) {
        console.error(`Error generating PDF for ${lang}:`, error);
        throw error;
    } finally {
        await browser.close();
    }
}

async function main() {
    console.log('Starting PDF generation...\n');
    
    try {
        const enResult = await generatePDF('en');
        const ruResult = await generatePDF('ru');
        
        console.log('\n✓ PDF generation complete!');
        console.log(`English: ${enResult.path} (${enResult.size.toFixed(2)} MB)`);
        console.log(`Russian: ${ruResult.path} (${ruResult.size.toFixed(2)} MB)`);
    } catch (error) {
        console.error('Error generating PDFs:', error);
        process.exit(1);
    }
}

main();

