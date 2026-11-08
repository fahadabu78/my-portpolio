# Abdul Fahad – Personal Portfolio Website

A sleek, responsive personal portfolio website engineered for **Abdul Fahad** — BCA student specializing in Data Science, Big Data Analytics, and Full Stack Development.

---

## 🌟 Key Features

- **Cyber-Minimalist Aesthetics:** Deep obsidian background (`#080c14`), frosted glassmorphic cards, glowing radial gradients, and fluid typography.
- **Dark & Light Mode Switcher:** Smooth instant theme switching with persistent user preference in `localStorage`.
- **Dynamic Typing Hero:** Typewriter effect dynamically showcasing roles (*Full-Stack Developer*, *Data Science Enthusiast*, *Data Analyst & Problem Solver*).
- **Interactive Project Showcase:** Filterable project categories (*All*, *Data Science*, *Full-Stack*) with interactive modal popups for deep architectural case studies.
- **Education & Journey Milestones:** Vertical glowing timeline detailing Yenepoya BCA coursework, independent projects, and collaborative leadership.
- **Working Interactive Contact:** Real-time form validation, visual toast notifications, direct email generation, and one-click copy-to-clipboard for `fba45313@gmail.com`.
- **Embedded Interactive Resume:** Clean digital resume viewer modal with direct print and PDF download support.
- **SEO & Social Ready:** Open Graph tags, Twitter cards, meta descriptions, and schema.org JSON-LD Person structured data.
- **Zero-Dependency Core:** Pure HTML5, modern Tailwind CSS, and Vanilla ES6+ JavaScript for blazing fast load times and effortless deployment.

---

## 📁 Project Structure

```text
my-portfolio/
├── index.html                 # Main semantic HTML structure & SEO metadata
├── css/
│   └── styles.css             # Glassmorphism, animations, dark/light theme styles
├── js/
│   └── script.js              # Theme switcher, typewriter, filters, modals, form
├── assets/
│   └── images/
│       ├── avatar.jpg           # Profile portrait
│       ├── project-hospital.jpg # Hospital appointment management application preview
│       ├── project-student.jpg  # Student portal academic application preview
│       ├── project-weather.jpg  # Live weather forecasting application preview
│       └── project-atm.jpg      # DeepATM cash prediction & security system preview
├── server.ps1                 # Lightweight local dev HTTP server (PowerShell)
└── README.md                  # Documentation and deployment guide
```

---

## 🚀 How to Run Locally

### Option 1: Using PowerShell (Zero Dependencies Required)
Open PowerShell inside this project folder and run:

```powershell
.\server.ps1
```

Then open your browser to [http://localhost:3000](http://localhost:3000).

### Option 2: Using VS Code Live Server
1. Open this directory in VS Code.
2. Install the **Live Server** extension if not already installed.
3. Right-click `index.html` and select **"Open with Live Server"**.

### Option 3: Direct File Opening
Double-click `index.html` to open it directly in any modern browser (Chrome, Edge, Firefox, Safari).

---

## 🌐 1-Click Deployment Guide

### Deploying to GitHub Pages (Free)
1. Initialize a git repository and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Abdul Fahad portfolio"
   ```
2. Create a new repository on GitHub (e.g. `abdul-fahad-portfolio`).
3. Link your remote repository and push:
   ```bash
   git remote add origin https://github.com/fahadabu78/abdul-fahad-portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. On GitHub, go to **Settings > Pages**.
5. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
6. Your portfolio will be live at `https://fahadabu78.github.io/abdul-fahad-portfolio/`!

### Deploying to Vercel (Free)
1. Push your code to GitHub.
2. Log into [vercel.com](https://vercel.com) using your GitHub account.
3. Click **"Add New Project"** and import this repository.
4. Keep the default settings (Framework preset: `Other`) and click **Deploy**.
5. Vercel will provide an instant, globally cached URL with free SSL!

---

## 🛠️ Personalization

To update your contact information or social links:
- **Email:** Search and update `fba45313@gmail.com` in `index.html` and `js/script.js`.
- **LinkedIn:** Search and update `https://www.linkedin.com/in/abdul-fahad-2b88a8350/`.
- **GitHub:** Configured to `https://github.com/fahadabu78`.
- **Projects:** Add or edit project details in the `projectData` object within `js/script.js`.

---

## 📄 License
Designed and developed for **Abdul Fahad**. Open for personal portfolio usage and adaptation.
