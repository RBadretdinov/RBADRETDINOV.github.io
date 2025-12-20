# Quick Start Guide

## Immediate Next Steps

### 1. Fill Out Content Inventory (15-30 minutes)
Open `CONTENT_INVENTORY.md` and fill it out with all content from your Google Sites portfolio:
- Copy text from each page
- List all images you need to download
- Document project details
- Note any special features or design elements

### 2. Extract Content from Google Sites (30-60 minutes)
1. Visit your Google Sites portfolio
2. Open each page and copy the text content
3. Right-click and save all images to your computer
4. Organize images: rename them descriptively (e.g., `project1-screenshot.png`, `profile-photo.jpg`)
5. Move images to `assets/images/` folder

### 3. Update HTML Files (30-60 minutes)

#### Update `index.html`:
- Replace "Your Name" with your actual name (appears in multiple places)
- Replace placeholder email, GitHub, LinkedIn links
- Add your actual bio/introduction text
- Update skills list with your technologies
- Add your profile picture to `assets/images/profile.jpg` (or update the path)

#### Update `projects.html`:
- Copy the project card template for each project
- Fill in project details:
  - Project name
  - Description
  - Technologies used
  - GitHub and demo links
  - Screenshot images
- Remove the placeholder project card when done

### 4. Customize Styling (Optional, 15-30 minutes)
Edit `style.css` to match your preferences:
- Change color scheme in `:root` variables
- Adjust fonts if desired
- Modify spacing or layout

### 5. Test Locally
1. Open `index.html` in your web browser
2. Click through all links
3. Check that images load correctly
4. Test on mobile (resize browser window)
5. Fix any broken links or missing images

### 6. Push to GitHub
```bash
git init
git add .
git commit -m "Initial portfolio setup"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

### 7. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **main** branch
4. Click **Save**
5. Your site will be live at: `https://yourusername.github.io/your-repo-name`

## Common Customizations

### Add More Pages
1. Create new HTML file (e.g., `resume.html`)
2. Copy structure from `index.html`
3. Update navigation menu in all HTML files
4. Add link to new page in nav menu

### Add Resume/CV
1. Save your resume PDF to `assets/pdfs/resume.pdf`
2. Add a link in navigation or on home page:
   ```html
   <a href="assets/pdfs/resume.pdf" target="_blank">Download Resume</a>
   ```

### Add Dark Mode (Advanced)
You can add a dark mode toggle by:
1. Adding CSS variables for dark theme
2. Creating a JavaScript toggle function
3. Adding a button to switch themes

## Troubleshooting

### Images Not Showing
- Check file paths are correct (case-sensitive on some systems)
- Ensure images are in `assets/images/` folder
- Verify image file names match exactly (including extensions)

### GitHub Pages Not Updating
- Wait a few minutes (can take up to 10 minutes)
- Check repository settings → Pages is enabled
- Verify you're pushing to the correct branch

### Styling Looks Off
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- Check browser console for errors (F12)
- Verify CSS file is linked correctly in HTML

## Need Help?

- Review `MIGRATION_PLAN.md` for detailed migration steps
- Check `CONTENT_INVENTORY.md` to organize your content
- Refer to README.md for repository structure

