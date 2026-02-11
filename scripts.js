/**
 * Entry point executed after DOM is fully loaded.
 * Initializes all UI-related behaviors:
 * - Icon rendering
 * - Theme management
 * - Mobile navigation
 * - Navbar scroll effects
 * - Scroll-triggered animations
 * - Smooth anchor scrolling
 */
document.addEventListener('DOMContentLoaded', function () {
  lucide.createIcons();
  initTheme();
  initMobileMenu();
  initNavbarScroll();
  initScrollAnimations();
  initSmoothScroll();
});

/**
 * Initializes theme management logic.
 *
 * Responsibilities:
 * - Reads persisted theme from localStorage
 * - Applies the correct theme class to <html>
 * - Toggles between dark and light modes
 * - Updates toggle icons accordingly
 * - Re-renders Lucide icons after theme change
 */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const moonIcon = themeToggle.querySelector('[data-lucide="moon"]');
  const sunIcon = themeToggle.querySelector('[data-lucide="sun"]');

  /**
   * Retrieve stored theme preference.
   * Defaults to "dark" if not set.
   * @type {string}
   */
  const savedTheme = localStorage.getItem('theme') || 'dark';

  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    if (moonIcon) moonIcon.style.display = 'block';
    if (sunIcon) sunIcon.style.display = 'none';
  } else {
    document.documentElement.classList.remove('dark');
    if (moonIcon) moonIcon.style.display = 'none';
    if (sunIcon) sunIcon.style.display = 'block';
  }

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');

    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      if (moonIcon) moonIcon.style.display = 'none';
      if (sunIcon) sunIcon.style.display = 'block';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      if (moonIcon) moonIcon.style.display = 'block';
      if (sunIcon) sunIcon.style.display = 'none';
    }

    lucide.createIcons();
  });
}

/**
 * Initializes mobile navigation menu behavior.
 *
 * Features:
 * - Toggles mobile menu visibility
 * - Automatically closes menu when a link is clicked
 */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!mobileMenuBtn || !mobileMenu) return;

  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

/**
 * Initializes navbar scroll behavior.
 *
 * Adds blur and border styling when page is scrolled
 * beyond a threshold.
 */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('nav-blur');

      if (document.documentElement.classList.contains('dark')) {
        navbar.classList.add('border-slate-800/80');
      } else {
        navbar.classList.add('border-slate-300/80');
      }
    } else {
      navbar.classList.remove(
        'nav-blur',
        'border-slate-800/80',
        'border-slate-300/80'
      );
    }
  });
}

/**
 * Initializes scroll-triggered fade-in animations.
 *
 * Uses IntersectionObserver to:
 * - Detect when elements enter viewport
 * - Add `.visible` class for transition effects
 */
function initScrollAnimations() {
  /**
   * @type {IntersectionObserverInit}
   */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Enables smooth scrolling for internal anchor links.
 *
 * Intercepts links with href starting with "#"
 * and performs animated scrolling instead of default jump.
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const target = document.querySelector(
        this.getAttribute('href')
      );

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
