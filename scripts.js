// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons
  lucide.createIcons();

  // Initialize theme
  initTheme();

  // Initialize mobile menu
  initMobileMenu();

  // Initialize navbar scroll effect
  initNavbarScroll();

  // Initialize scroll animations
  initScrollAnimations();

  // Initialize smooth scroll
  initSmoothScroll();
});

// Theme Management
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const moonIcon = themeToggle.querySelector('[data-lucide="moon"]');
  const sunIcon = themeToggle.querySelector('[data-lucide="sun"]');
  
  // Check for saved theme preference or default to 'dark'
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  // Apply the theme
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    if (moonIcon) moonIcon.style.display = 'block';
    if (sunIcon) sunIcon.style.display = 'none';
  } else {
    document.documentElement.classList.remove('dark');
    if (moonIcon) moonIcon.style.display = 'none';
    if (sunIcon) sunIcon.style.display = 'block';
  }

  // Theme toggle click handler
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    
    if (isDark) {
      // Switch to light mode
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      if (moonIcon) moonIcon.style.display = 'none';
      if (sunIcon) sunIcon.style.display = 'block';
    } else {
      // Switch to dark mode
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      if (moonIcon) moonIcon.style.display = 'block';
      if (sunIcon) sunIcon.style.display = 'none';
    }

    // Reinitialize icons after theme change
    lucide.createIcons();
  });
}

// Mobile Menu
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!mobileMenuBtn || !mobileMenu) return;

  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu when clicking on a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// Navbar Scroll Effect
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
      navbar.classList.remove('nav-blur', 'border-slate-800/80', 'border-slate-300/80');
    }
  });
}

// Scroll Animations
function initScrollAnimations() {
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

// Smooth Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
