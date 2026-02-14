# Portfolio PDF Generation Guide

This guide explains how to generate PDF versions of your portfolio for both English and Russian versions.

## Prerequisites

You need Node.js installed on your system. If you don't have it:

1. Download Node.js from [https://nodejs.org/](https://nodejs.org/)
2. Install it (this will also install npm)
3. Restart your terminal/PowerShell

## Installation

1. Open PowerShell/Terminal in the project directory
2. Run:
```bash
npm install
```

This will install Puppeteer, which is used to convert HTML to PDF.

## Generating PDFs

Run the generation script:

```bash
node generate-pdf.js
```

Or using npm:

```bash
npm run generate
```

This will create two PDF files:
- `assets/pdfs/portfolio-en.pdf` (English version)
- `assets/pdfs/portfolio-ru.pdf` (Russian version)

## PDF Features

- ✅ All sections included (Home, About, Technical Skills, Professional Skills, Certifications, Projects, Resume)
- ✅ Design and color scheme preserved
- ✅ Navigation and buttons removed
- ✅ Hyperlinks removed (text preserved)
- ✅ One page per section with page breaks
- ✅ File size optimized to stay under 5MB

## Troubleshooting

If you get errors:

1. **"npm is not recognized"**: Install Node.js from nodejs.org
2. **"Puppeteer download failed"**: Check your internet connection and try again
3. **PDF files are too large**: The script automatically optimizes, but if files are still large, you may need to compress images in the `assets/images/` folder
4. **Images not showing**: Make sure image paths in HTML files are correct

## Manual Alternative (If Node.js is not available)

If you cannot install Node.js, you can:

1. Open each HTML file in a browser
2. Use browser's "Print to PDF" feature (Ctrl+P, then "Save as PDF")
3. Combine the PDFs using a PDF merger tool

However, this method won't preserve the styling as well as the automated script.

