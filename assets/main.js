document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  setActiveNavLink();
  setupMobileNavigation();
  setupScrollHeader();
  setupInteractiveAnimations();
});

function renderHeader() {
  const headerContainer = document.getElementById('site-header');
  if (!headerContainer) return;

  headerContainer.innerHTML = `
    <header class="floating-nav-wrap" id="topHeader">
      <div class="floating-nav-pill">
        <a href="index.html" class="nav-brand" aria-label="Hri-thm Clinic home">
          <span class="nav-logo-badge">
            <img src="images/logo.png" alt="" class="nav-logo" />
          </span>
          <span class="nav-wordmark">HRI-THM</span>
        </a>

        <nav class="nav-links" id="primary-navigation" aria-label="Main navigation">
          <a href="index.html" class="nav-link">Home</a>
          <a href="about.html" class="nav-link">About Dr. Gundad</a>
          <a href="services.html" class="nav-link">Services</a>
          <a href="patient-corner.html" class="nav-link">Patient Corner</a>
          <a href="careers.html" class="nav-link">Careers</a>
        </nav>

        <div class="nav-actions">
          <a href="book-appointment.html" class="nav-pill-cta">
            <span class="cta-dot" aria-hidden="true"></span>
            <span>Book Appointment</span>
          </a>
          <button
            class="nav-toggle"
            type="button"
            aria-expanded="false"
            aria-controls="primary-navigation"
            aria-label="Open navigation"
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  `;
}

function renderFooter() {
  const footerContainer = document.getElementById('site-footer');
  if (!footerContainer) return;

  const currentYear = new Date().getFullYear();

  footerContainer.innerHTML = `
    <footer class="site-footer">
      <div class="footer-ecg-rule" aria-hidden="true">
        <svg viewBox="0 0 1200 32" fill="none" preserveAspectRatio="none">
          <path d="M0 16H520L536 16L545 6L556 26L566 2L576 29L585 13L593 16H1200" />
        </svg>
      </div>
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col footer-brand">
            <div class="footer-brand-lockup">
              <span class="brand-mark brand-mark-sm"><img src="images/logo.png" alt="" /></span>
              <h4>Hri-thm Clinic</h4>
            </div>
            <p class="footer-tagline">Preventive Cardiology | Non-Invasive Cardiac Diagnostics</p>
            <p class="footer-location">Solapur, Maharashtra, India</p>
          </div>

          <div class="footer-col">
            <h4>Navigation</h4>
            <ul class="footer-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="about.html">About Dr. Gundad</a></li>
              <li><a href="services.html">Services &amp; Diagnostics</a></li>
              <li><a href="patient-corner.html">Patient Corner &amp; FAQs</a></li>
              <li><a href="careers.html">Careers</a></li>
            </ul>
          </div>

          <div class="footer-col footer-appointments">
            <h4>Appointments</h4>
            <p>Direct consultations by appointment.</p>
            <a href="book-appointment.html" class="btn btn-violet btn-sm">Request Slot</a>
          </div>
        </div>

        <div class="copyright">
          &copy; ${currentYear} Hri-thm Clinic. All rights reserved.
        </div>
      </div>
    </footer>
  `;
}

function setActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

function setupMobileNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const header = document.getElementById('topHeader');
  const nav = document.getElementById('primary-navigation');

  if (!toggle || !header || !nav) return;

  const closeMenu = () => {
    header.classList.remove('mobile-nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    header.classList.toggle('mobile-nav-open', !isOpen);
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  });

  nav.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) closeMenu();
  });

  document.addEventListener('click', (event) => {
    if (event.target instanceof Node && !header.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

function setupScrollHeader() {
  const header = document.getElementById('topHeader');
  if (!header) return;

  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
}

function setupInteractiveAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // 1. Add scroll progress bar inside the floating pill navbar
  const pill = document.querySelector('.floating-nav-pill');
  if (pill) {
    const progressBar = document.createElement('span');
    progressBar.className = 'nav-scroll-progress';
    progressBar.setAttribute('aria-hidden', 'true');
    pill.appendChild(progressBar);

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
      progressBar.style.transform = `scaleX(${ratio})`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // 2. Scroll-triggered staggered reveals across all pages
  const revealSelectors = [
    '.intro-grid > *',
    '.section-heading',
    '.section-header',
    '.home-service-card',
    '.finder-panel',
    '.home-cta-inner',
    '.emergency-banner',
    '.principle-card',
    '.service-card',
    '.editorial-split > *',
    '.faq-item',
    '.form-panel',
    '.info-card',
    '.career-panel',
    '.inline-cta'
  ];

  const targets = document.querySelectorAll(revealSelectors.join(','));
  targets.forEach((el, idx) => {
    el.classList.add('reveal-on-scroll');
    // Stagger siblings inside grids
    const siblingIndex = Array.from(el.parentElement?.children || []).indexOf(el);
    el.style.setProperty('--reveal-delay', `${Math.min(siblingIndex * 85, 360)}ms`);
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));

  // 3. Smooth count-up animation for "14+" experience stamp
  const stampNumber = document.querySelector('.stamp-number');
  if (stampNumber) {
    const targetVal = 14;
    const duration = 1200;
    const startTime = performance.now();

    const animateCounter = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * targetVal);
      stampNumber.innerHTML = `${current}<span>+</span>`;
      if (progress < 1) requestAnimationFrame(animateCounter);
    };

    requestAnimationFrame(animateCounter);
  }

  // 4. Subtle 3D perspective tilt on hero portrait (desktop only)
  const heroVisual = document.querySelector('.home-hero-visual');
  const portraitFrame = document.querySelector('.portrait-frame');
  if (heroVisual && portraitFrame && window.matchMedia('(pointer: fine)').matches) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      portraitFrame.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });

    heroVisual.addEventListener('mouseleave', () => {
      portraitFrame.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
      portraitFrame.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
      setTimeout(() => {
        portraitFrame.style.transition = '';
      }, 500);
    });
  }
}