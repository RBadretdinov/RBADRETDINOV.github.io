# Quick Start: Generate Portfolio PDFs

## What You Need

**Node.js** must be installed. Check if you have it:
```bash
node --version
```

If you get an error, install Node.js from: https://nodejs.org/

## Steps to Generate PDFs

1. **Install dependencies** (one-time setup):
   ```bash
   npm install
   ```

2. **Generate PDFs**:
   ```bash
   node generate-pdf.js
   ```

3. **Find your PDFs**:
   - English: `assets/pdfs/portfolio-en.pdf`
   - Russian: `assets/pdfs/portfolio-ru.pdf`

## What the Script Does

✅ Combines all portfolio sections into PDFs
✅ Preserves design and color scheme  
✅ Removes navigation, buttons, and hyperlinks
✅ Creates one page per section
✅ Optimizes file size (targets < 5MB)

## Output Files

- `portfolio-en.pdf` - English version
- `portfolio-ru.pdf` - Russian version

Both PDFs include:
1. Home
2. About Me
3. Technical Skills
4. Professional Skills
5. Certifications
6. Projects
7. Resume

