/**
 * Temporary: Extract the last 3 pages from each portfolio PDF and save as resume-last3-{lang}.pdf.
 * Run after generate-pdf.js. The website "Download PDF Resume" button will serve these files.
 */
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

const PDF_DIR = path.join(__dirname, 'assets', 'pdfs');
const PAGES_TO_TAKE = 3;

async function extractLastPages(lang) {
    const srcPath = path.join(PDF_DIR, `portfolio-${lang}.pdf`);
    const outPath = path.join(PDF_DIR, `resume-last3-${lang}.pdf`);
    if (!fs.existsSync(srcPath)) {
        console.warn(`Skip ${lang}: ${srcPath} not found`);
        return;
    }
    const srcBytes = fs.readFileSync(srcPath);
    const srcDoc = await PDFDocument.load(srcBytes);
    const pageCount = srcDoc.getPageCount();
    if (pageCount < PAGES_TO_TAKE) {
        console.warn(`Skip ${lang}: only ${pageCount} pages, need at least ${PAGES_TO_TAKE}`);
        return;
    }
    const newDoc = await PDFDocument.create();
    const indices = [];
    for (let i = pageCount - PAGES_TO_TAKE; i < pageCount; i++) indices.push(i);
    const copied = await newDoc.copyPages(srcDoc, indices);
    copied.forEach(p => newDoc.addPage(p));
    const outBytes = await newDoc.save();
    fs.writeFileSync(outPath, outBytes);
    console.log(`✓ ${path.basename(outPath)} (last ${PAGES_TO_TAKE} pages of portfolio-${lang}.pdf)`);
}

async function main() {
    console.log('Extracting last 3 pages from portfolio PDFs...\n');
    await extractLastPages('en');
    await extractLastPages('ru');
    console.log('\nDone. Resume download button will use resume-last3-en.pdf / resume-last3-ru.pdf');
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
