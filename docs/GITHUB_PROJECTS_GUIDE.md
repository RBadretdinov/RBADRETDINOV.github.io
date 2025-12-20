# Guide: Adding Projects to GitHub and Linking Them

This guide will walk you through the process of uploading your projects to GitHub and linking them on your projects page.

## Step 1: Prepare Your Projects

Before uploading, make sure each project is in its own folder and ready to be shared:

1. **Organize your project files** - Each project should be in its own directory
2. **Add a README.md** (optional but recommended) - Describe what the project does, how to run it, and what technologies it uses
3. **Check for sensitive information** - Make sure you don't have API keys, passwords, or personal data in your code
4. **Create a .gitignore file** (optional but recommended) - Exclude files that shouldn't be in version control (like `node_modules`, `.env`, build files, etc.)

## Step 2: Create GitHub Repositories

### Option A: Using GitHub Website (Easiest)

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+" icon** in the top right corner and select **"New repository"**
3. Fill in the repository details:
   - **Repository name**: Choose a descriptive name (e.g., `my-portfolio-project`, `task-manager-app`)
   - **Description**: Brief description of your project
   - **Visibility**: Choose Public (recommended for portfolio) or Private
   - **DO NOT** initialize with README, .gitignore, or license (since you'll be uploading existing code)
4. Click **"Create repository"**
5. Repeat for each project you want to add

### Option B: Using GitHub Desktop (Recommended for beginners)

1. Download [GitHub Desktop](https://desktop.github.com/) if you don't have it
2. Sign in with your GitHub account
3. Click **"File" → "New repository"** or click the **"+" button**
4. Fill in:
   - **Name**: Your project name
   - **Description**: Project description
   - **Local path**: Choose where to save it on your computer
   - **Git ignore**: Select the appropriate template (e.g., Node, Python, None)
   - **License**: Optional - choose if you want to include a license
5. Click **"Create repository"**

## Step 3: Upload Your Project Code

### Option A: Using GitHub Website (Upload files)

1. Go to your newly created repository on GitHub
2. Click **"uploading an existing file"** link
3. Drag and drop your project files, or click **"choose your files"**
4. Scroll down, enter a commit message (e.g., "Initial commit")
5. Click **"Commit changes"**

### Option B: Using GitHub Desktop (Recommended)

1. Open GitHub Desktop
2. Click **"File" → "Add Local Repository"** or drag your project folder into GitHub Desktop
3. If your project isn't already a Git repository, GitHub Desktop will ask to create one
4. Review the changes in the left panel
5. Write a commit message (e.g., "Initial commit")
6. Click **"Commit to main"** (or master)
7. Click **"Publish repository"** to push it to GitHub
   - Make sure to select **"Keep this code private"** only if you want it private

### Option C: Using Command Line (For advanced users)

If you're comfortable with Git commands:

```bash
# Navigate to your project folder
cd path/to/your/project

# Initialize Git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit"

# Add your GitHub repository as remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 4: Update Your Projects Page

Once your projects are on GitHub, you can link them in `projects.html`:

1. Open `projects.html`
2. For each project card, update the GitHub link:
   ```html
   <a href="https://github.com/YOUR_USERNAME/PROJECT_REPO_NAME" target="_blank" class="project-link">GitHub</a>
   ```
3. Replace:
   - `YOUR_USERNAME` with your GitHub username
   - `PROJECT_REPO_NAME` with the repository name you created

## Example Project Card

Here's a complete example of a project card with GitHub link:

```html
<div class="project-card">
    <div class="project-image">
        <img src="assets/images/my-project-screenshot.png" alt="Task Manager App">
    </div>
    <div class="project-content">
        <h2 class="project-title">Task Manager App</h2>
        <p class="project-description">
            A web application for managing daily tasks with drag-and-drop functionality.
            Built with React and Firebase for real-time synchronization.
        </p>
        <div class="project-tech">
            <span class="tech-tag">React</span>
            <span class="tech-tag">Firebase</span>
            <span class="tech-tag">CSS3</span>
        </div>
        <div class="project-links">
            <a href="https://github.com/yourusername/task-manager-app" target="_blank" class="project-link">GitHub</a>
            <a href="https://your-project-demo.netlify.app" target="_blank" class="project-link">Live Demo</a>
        </div>
    </div>
</div>
```

## Tips

- **Repository naming**: Use lowercase letters, hyphens, and no spaces (e.g., `my-awesome-project`)
- **README files**: Adding a good README makes your project look more professional
- **Regular updates**: Keep pushing updates to show active development
- **Live demos**: If you deploy your projects (using services like Netlify, Vercel, GitHub Pages), you can also link to live demos
- **Private repos**: If a project is private, only you and people you grant access to can see it. For portfolio purposes, public repos are usually better.

## Quick Checklist

- [ ] Create GitHub account (if you don't have one)
- [ ] Create a new repository for each project
- [ ] Upload project code to GitHub
- [ ] Get the repository URL (format: `https://github.com/username/repo-name`)
- [ ] Update `projects.html` with the GitHub links
- [ ] Test the links to make sure they work

## Need Help?

- GitHub Docs: [https://docs.github.com](https://docs.github.com)
- GitHub Desktop Guide: [https://docs.github.com/en/desktop](https://docs.github.com/en/desktop)
- Git Basics: [https://git-scm.com/book/en/v2/Getting-Started-Git-Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)

