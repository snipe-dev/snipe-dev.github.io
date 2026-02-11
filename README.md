# 👉 https://snipe-dev.github.io

This repository hosts my personal **GitHub Pages** website.

The site serves as a lightweight developer homepage and portfolio, showcasing my work around **Blockchain and EVM tooling**.

------------------------------------------------------------------------

## Project Structure

### 1. `index.html`

Main HTML file containing all website sections:

-   Hero (landing section)
-   About
-   Core Stack (6 technology blocks)
-   Projects
-   Contact
-   Footer

------------------------------------------------------------------------

### 2. `src/input.css`

Tailwind entry file:

``` css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Used as the source for Tailwind build.

------------------------------------------------------------------------

### 3. `dist/output.css`

Compiled and minified Tailwind CSS file.\
This is the only CSS file connected in production.

------------------------------------------------------------------------

### 4. `background.css`

Custom background styles (grid effect + dark/light mode).\
Separated from Tailwind to avoid purge conflicts.

------------------------------------------------------------------------

### 5. `tailwind.config.js`

Tailwind configuration:

-   `darkMode: 'class'`
-   Custom `cyber` color palette
-   Content scanning for HTML and JS files

------------------------------------------------------------------------

### 6. `scripts.js`

JavaScript functionality:

-   Lucide icons initialization
-   Dark / light theme toggle (stored in localStorage)
-   Mobile menu toggle
-   Navbar scroll effect
-   Scroll-based animations
-   Smooth anchor scrolling

------------------------------------------------------------------------

## Theme Switching

Fully functional theme system:

-   Default: Dark mode
-   Toggle button in navbar
-   Icon switches (moon ↔ sun)
-   Preference stored in `localStorage`
-   Automatically restored on reload

Dark mode is implemented using:

    darkMode: 'class'

------------------------------------------------------------------------

## Build Process

Tailwind CSS is compiled locally using CLI.

### Development (watch mode)

``` bash
npm run dev
```

### Production build

``` bash
npm run build
```

Output:

    dist/output.css

------------------------------------------------------------------------

## Dependencies

Installed via npm:

-   Tailwind CSS v3
-   Node.js (LTS recommended)

External CDN:

-   Lucide Icons
-   Google Fonts (Inter, Fira Code)

------------------------------------------------------------------------

## Features

-   Fully responsive layout (desktop, tablet, mobile)
-   Dark and light themes with smooth transitions
-   Scroll-triggered animations
-   Cyberpunk-inspired cyan / magenta accent palette
-   Modular project structure
-   Clean production build (no CDN Tailwind)
-   Optimized and minified CSS

------------------------------------------------------------------------

## Tech Stack

-   HTML5
-   Tailwind CSS (local build)
-   JavaScript (ES6+)
-   Lucide Icons
-   Google Fonts

------------------------------------------------------------------------

## Deployment

Optimized for static hosting platforms:

-   GitHub Pages
-   Netlify
-   Vercel (static mode)
