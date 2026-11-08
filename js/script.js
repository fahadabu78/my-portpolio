/**
 * ABDUL FAHAD - PORTFOLIO INTERACTIVITY SCRIPT
 * Full-featured, lightweight Vanilla ES6+ script
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypewriter();
  initMobileMenu();
  initScrollSpy();
  initProjectFilters();
  initProjectModal();
  initContactForm();
  initCopyEmail();
  initBackToTop();
  initResumeModal();
  refreshIcons();
});

/* ==========================================
   1. Theme Management (Dark / Light)
   ========================================== */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('theme-preference');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (storedTheme === 'light' || (!storedTheme && prefersLight)) {
    document.documentElement.classList.add('light');
  } else {
    document.documentElement.classList.remove('light');
  }
  updateThemeIcons();

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.documentElement.classList.toggle('light');
      const isLight = document.documentElement.classList.contains('light');
      localStorage.setItem('theme-preference', isLight ? 'light' : 'dark');
      updateThemeIcons();
      showToast(isLight ? 'Switched to Light Mode' : 'Switched to Dark Mode', 'info');
    });
  });
}

function updateThemeIcons() {
  const isLight = document.documentElement.classList.contains('light');
  document.querySelectorAll('.theme-icon-sun').forEach(el => {
    el.style.display = isLight ? 'none' : 'block';
  });
  document.querySelectorAll('.theme-icon-moon').forEach(el => {
    el.style.display = isLight ? 'block' : 'none';
  });
}

/* ==========================================
   2. Hero Typewriter Effect
   ========================================== */
function initTypewriter() {
  const textElement = document.getElementById('typewriter-text');
  if (!textElement) return;

  const roles = [
    'Full-Stack Developer',
    'Data Science Enthusiast',
    'Data Analyst & Problem Solver'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      textElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      textElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 95;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2200; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 450;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================
   3. Mobile Navigation Menu
   ========================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
    refreshIcons();
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================
   4. Scroll Spy & Active Navigation
   ========================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px'
  });

  sections.forEach(sec => observer.observe(sec));
}

/* ==========================================
   5. Filterable Projects
   ========================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-indigo-600', 'text-white');
        b.classList.add('text-slate-400');
      });
      btn.classList.add('active', 'bg-indigo-600', 'text-white');
      btn.classList.remove('text-slate-400');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================
   6. Project Details Modal
   ========================================== */
const projectData = {
  hospital: {
    title: 'Hospital Appointment Management System',
    category: 'Full-Stack & PHP MVC Application',
    image: 'assets/images/project-hospital.jpg',
    description: 'A comprehensive web-based healthcare management portal built with PHP and SQLite/MySQL. The platform streamlines medical clinic workflows by empowering patients to book appointments online, discover suitable doctors through smart recommendation filters, and access prescription histories, while providing administrators with schedule and roster management tools.',
    features: [
      'Engineered clean MVC architecture separating models, views, and controllers with modular routing.',
      'Online appointment reservation system with dynamic doctor availability slots and instant confirmation.',
      'Physician directory and specialization filtering for cardiology, pediatrics, general medicine, and surgery.',
      'Administrative portal for managing patient records, doctor timetables, and medical prescription archives.'
    ],
    tech: ['PHP', 'SQL / SQLite', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'MVC Architecture'],
    github: 'https://github.com/fahadabu78/Hospital-appoinment-management-system',
    demo: 'https://github.com/fahadabu78/Hospital-appoinment-management-system'
  },
  student: {
    title: 'Student Portal & Academic Management System',
    category: 'Academic Web Application',
    image: 'assets/images/project-student.jpg',
    description: 'An interactive institutional academic portal designed to streamline student records, attendance tracking, and academic performance monitoring. Features dual-role authentication flows tailored for students and faculty members with responsive, accessible interfaces.',
    features: [
      'Dual portal authentication structure with customized dashboards for students and faculty staff.',
      'Comprehensive student record management, course enrollment tracking, and GPA performance calculators.',
      'Real-time attendance tracking with percentage thresholds and automated academic status alerts.',
      'Responsive, lightweight client interface optimized for quick access across laptops, tablets, and mobile devices.'
    ],
    tech: ['JavaScript (ES6+)', 'HTML5', 'CSS3', 'DOM Manipulation', 'Local Data Store', 'Responsive Design'],
    github: 'https://github.com/fahadabu78/student-portel',
    demo: 'https://github.com/fahadabu78/student-portel'
  },
  weather: {
    title: 'Live Weather Forecasting Web Application',
    category: 'API & Asynchronous UI Application',
    image: 'assets/images/project-weather.jpg',
    description: 'A dynamic meteorological web application that connects with live weather REST APIs to deliver up-to-the-minute atmospheric conditions, multi-city climate searches, temperature forecasts, humidity readings, and wind metrics through a sleek glassmorphic interface.',
    features: [
      'Asynchronous REST API integration fetching live weather data with error handling for nonexistent locations.',
      'Multi-city search with instantaneous weather state updates and localized timezone calculations.',
      'Detailed climate breakdown: real-feel temperature, humidity index, wind velocity, and atmospheric pressure.',
      'Dynamic visual condition themes adapting iconography and layout accents based on live weather data.'
    ],
    tech: ['JavaScript (ES6+)', 'REST Weather API', 'JSON Parsing', 'HTML5', 'CSS3', 'Async / Await'],
    github: 'https://github.com/fahadabu78/weather',
    demo: 'https://github.com/fahadabu78/weather'
  },
  atm: {
    title: 'DeepATM – ATM Security & Cash Prediction System',
    category: 'Deep Learning & FinTech Application',
    image: 'assets/images/project-atm.jpg',
    description: 'A full-featured deep learning financial analytics and security system engineered to predict ATM cash withdrawal volumes and spot abnormal transaction patterns. Powered by a sequential TensorFlow/Keras 5-layer neural network with real-time loss diagnostics and automated data pre-processing.',
    features: [
      'Engineered a 5-layer Keras topology (Dense 64 -> Dense 32 -> Dropout 0.20 -> Dense 16 -> Dense 1) for cash demand regression.',
      'Real-time interactive 50-epoch training simulator with live Loss Curve diagnostics (loss vs val_loss) and regression plots.',
      'Automated ETL data pipeline handling datetime feature extraction, card activity segregation (XYZ vs other banks), and StandardScaler scaling.',
      'Interactive prediction calculator evaluating holiday sequences, festival flags, and ATM footfall to protect against cash-out vulnerabilities.'
    ],
    tech: ['Python', 'TensorFlow / Keras', 'Deep Learning', 'Pandas', 'Scikit-Learn', 'Chart.js', 'HTML5 / CSS3'],
    github: 'https://github.com/fahadabu78/atm-system-security-',
    demo: 'https://github.com/fahadabu78/atm-system-security-'
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const learnMoreBtns = document.querySelectorAll('.open-project-modal');

  if (!modal) return;

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    document.getElementById('modal-img').src = data.image;
    document.getElementById('modal-img').alt = data.title;
    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-desc').textContent = data.description;

    const featuresList = document.getElementById('modal-features');
    featuresList.innerHTML = '';
    data.features.forEach(feat => {
      const li = document.createElement('li');
      li.className = 'flex items-start text-sm text-slate-300 dark:text-slate-300';
      li.innerHTML = `<span class="text-cyan-400 mr-2 font-bold">✔</span> <span>${feat}</span>`;
      featuresList.appendChild(li);
    });

    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = '';
    data.tech.forEach(t => {
      const span = document.createElement('span');
      span.className = 'px-2.5 py-1 text-xs rounded-full bg-slate-800 text-indigo-300 border border-slate-700';
      span.textContent = t;
      techContainer.appendChild(span);
    });

    document.getElementById('modal-github').href = data.github;
    document.getElementById('modal-demo').href = data.demo;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    refreshIcons();
  }

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pid = btn.getAttribute('data-project');
      openModal(pid);
    });
  });

  modalCloseBtn?.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/* ==========================================
   7. Resume Modal & Action
   ========================================== */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtns = document.querySelectorAll('.open-resume-btn');
  const closeResumeBtn = document.getElementById('close-resume-btn');
  const printResumeBtn = document.getElementById('print-resume-btn');

  if (!resumeModal) return;

  openResumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      resumeModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      refreshIcons();
    });
  });

  function closeResume() {
    resumeModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  closeResumeBtn?.addEventListener('click', closeResume);

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal || e.target.classList.contains('modal-backdrop')) {
      closeResume();
    }
  });

  printResumeBtn?.addEventListener('click', () => {
    window.print();
  });
}

/* ==========================================
   8. Contact Form Handling
   ========================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = document.getElementById('contact-submit-btn');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = `Portfolio Inquiry from ${name}`;
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'warning');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'warning');
      emailInput.focus();
      return;
    }

    // Visual button state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Sending...</span>`;
    submitBtn.disabled = true;

    setTimeout(() => {
      // Simulate successful transmission & prepare mailto fallback
      const mailtoUrl = `mailto:fba45313@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Abdul Fahad,\n\nMy name is ${name} (${email}).\n\n${message}`)}`;
      
      showToast('Message sent! Abdul Fahad will reply soon.', 'success');
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      refreshIcons();

      // Open email client in background/fallback
      const mailtoLink = document.createElement('a');
      mailtoLink.href = mailtoUrl;
      mailtoLink.target = '_blank';
      document.body.appendChild(mailtoLink);
      mailtoLink.click();
      document.body.removeChild(mailtoLink);
    }, 800);
  });
}

/* ==========================================
   9. Copy Email to Clipboard
   ========================================== */
function initCopyEmail() {
  const copyBtns = document.querySelectorAll('.copy-email-btn');
  const email = 'fba45313@gmail.com';

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!', 'success');
        const iconContainer = btn.querySelector('.copy-icon-slot');
        if (iconContainer) {
          const original = iconContainer.innerHTML;
          iconContainer.innerHTML = '<i data-lucide="check" class="w-4 h-4 text-emerald-400"></i>';
          refreshIcons();
          setTimeout(() => {
            iconContainer.innerHTML = original;
            refreshIcons();
          }, 2000);
        }
      }).catch(() => {
        showToast('Direct email: fba45313@gmail.com', 'info');
      });
    });
  });
}

/* ==========================================
   10. Back to Top Button
   ========================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
      backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
      backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================
   11. Toast Notification System
   ========================================== */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  let bgClass = 'bg-slate-900 border border-slate-700 text-white';
  let iconName = 'info';

  if (type === 'success') {
    bgClass = 'bg-slate-900 border border-emerald-500/50 text-emerald-300';
    iconName = 'check-circle';
  } else if (type === 'warning') {
    bgClass = 'bg-slate-900 border border-amber-500/50 text-amber-300';
    iconName = 'alert-triangle';
  }

  toast.className = `toast ${bgClass}`;
  toast.innerHTML = `
    <i data-lucide="${iconName}" class="w-5 h-5 flex-shrink-0"></i>
    <span class="text-sm font-medium flex-1">${message}</span>
  `;

  container.appendChild(toast);
  refreshIcons();

  setTimeout(() => {
    toast.style.transition = 'all 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}

/* ==========================================
   12. Lucide Icons Refresher
   ========================================== */
function refreshIcons() {
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}
