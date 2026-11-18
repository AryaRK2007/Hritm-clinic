document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  setActiveNavLink();
  setupMobileNavigation();
  setupScrollHeader();
  setupInteractiveAnimations();
  initGoogleTranslate();
  setupFormSubmission();
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
          <!-- Google Translate Widget Container -->
          <div id="google_translate_element"></div>

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

  const revealSelectors = [
    '.intro-grid > *', '.section-heading', '.section-header', '.home-service-card',
    '.finder-panel', '.home-cta-inner', '.emergency-banner', '.principle-card',
    '.service-card', '.editorial-split > *', '.faq-item', '.form-panel',
    '.info-card', '.career-panel', '.inline-cta'
  ];

  const targets = document.querySelectorAll(revealSelectors.join(','));
  targets.forEach((el) => {
    el.classList.add('reveal-on-scroll');
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
}

// Non-blocking asynchronous Google Translate loader
function initGoogleTranslate() {
  window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'en,hi,mr,kn,pa,bn,te,ta,gu,ml,ur,or,as,ne,zh-CN,de,es,fr,ar',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
  };

  if (!document.getElementById('google-translate-script')) {
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.type = 'text/javascript';
    script.async = true;
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);
  }
}



// 1. Sleek Corner Toast Notification Popup
function showToast(message) {
  const existing = document.getElementById('notificationToast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'notificationToast';
  toast.className = 'toast-notification';
  toast.innerHTML = `
    <div class="toast-icon" aria-hidden="true">✓</div>
    <div class="toast-content">
      <span class="toast-eyebrow">Message Received</span>
      <p class="toast-text">${message}</p>
    </div>
  `;
  document.body.appendChild(toast);

  // Trigger smooth slide-in animation
  setTimeout(() => toast.classList.add('is-visible'), 15);

  // Auto-dismiss after 4.5 seconds
  setTimeout(() => {
    toast.classList.remove('is-visible');
    setTimeout(() => toast.remove(), 350);
  }, 4500);
}

// 2. Form Submission Handler
function setupFormSubmission() {
  const form = document.getElementById('appointmentForm') || document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Submit Request';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Request...';
    }

    try {
      // Simulating a fast, smooth async network response:
      await new Promise((resolve) => setTimeout(resolve, 900));

      showToast('Your appointment request has been successfully received. Our clinic team will reach out shortly.');
      form.reset();
    } catch (err) {
      showToast('Unable to send request. Please try again or call the clinic directly.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    }
  });
}