# Google Sites to GitHub Pages Migration Plan

## Overview
This document outlines the step-by-step process to migrate your portfolio from Google Sites to GitHub Pages.

## Step 1: Content Inventory
Before migrating, you need to catalog all content from your Google Sites portfolio.

### What to Document:
1. **Home/About Page**
   - Personal introduction/bio
   - Profile picture
   - Contact information
   - Social media links
   - Skills/technologies

2. **Projects Page**
   - Project titles
   - Project descriptions
   - Technologies used
   - Links (GitHub, live demos, etc.)
   - Screenshots/images
   - Project dates

3. **Additional Pages**
   - Resume/CV
   - Blog posts
   - Certifications
   - Education
   - Work experience

4. **Media Assets**
   - Images (profile, project screenshots, logos)
   - Videos (if any)
   - PDFs (resume, certificates) 

## Step 2: Content Extraction
1. Visit your Google Sites portfolio
2. Copy text content from each page
3. Download all images and save them with descriptive names
4. Note the structure and navigation flow
5. Document any interactive elements or special features

## Step 3: File Structure Setup
```
github-eportfolio/
├── index.html          # Home/About page
├── projects.html       # Projects showcase
├── style.css           # Main stylesheet
├── assets/
│   ├── images/         # All images (profile, projects, etc.)
│   ├── pdfs/           # Resume, certificates
│   └── icons/          # Social media icons, logos
├── README.md           # Repository description
└── .gitignore          # Git ignore file
```

## Step 4: Content Migration
1. **Home Page (index.html)**
   - Transfer your bio/introduction
   - Add profile picture
   - Include contact information
   - Add navigation menu

2. **Projects Page (projects.html)**
   - Create project cards/sections
   - Add project descriptions
   - Include technology tags
   - Add links to GitHub repos and live demos
   - Embed project screenshots

3. **Styling (style.css)**
   - Create responsive design
   - Match or improve upon Google Sites design
   - Add hover effects and animations
   - Ensure mobile-friendly layout

## Step 5: GitHub Pages Setup
1. Push your code to GitHub repository
2. Go to repository Settings → Pages
3. Select source branch (usually `main` or `gh-pages`)
4. Your site will be available at: `https://[username].github.io/[repository-name]`

## Step 6: Testing & Refinement
1. Test all links (internal and external)
2. Check responsive design on mobile/tablet/desktop
3. Verify all images load correctly
4. Test contact forms (if any)
5. Check browser compatibility

## Step 7: Custom Domain (Optional)
1. Purchase domain (if desired)
2. Add CNAME file to repository
3. Configure DNS settings with domain provider

## Tips for Success
- **Start Simple**: Begin with basic structure, then enhance
- **Version Control**: Commit frequently as you build
- **Mobile First**: Design for mobile, then scale up
- **Performance**: Optimize images before uploading
- **SEO**: Add meta tags, descriptions, and alt text for images
- **Accessibility**: Use semantic HTML and proper ARIA labels

## Next Steps
1. Fill out the `CONTENT_INVENTORY.md` template
2. Extract content from Google Sites
3. Set up the file structure
4. Begin migrating content page by page

