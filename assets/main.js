document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  setActiveNavLink();
  setupMobileNavigation();
  setupScrollHeader();
});

function renderHeader() {
  const headerContainer = document.getElementById('site-header');
  if (!headerContainer) return;

  headerContainer.innerHTML = `
    <header class="site-header">
      <div class="clinical-utility-bar">
        <div class="container utility-bar-inner">
          <span class="utility-meta">
            <span class="utility-pulse" aria-hidden="true"></span>
            <span>Preventive Cardiology &middot; Non-Invasive Cardiac Diagnostics</span>
          </span>
          <span class="utility-location">
            <span>Solapur, Maharashtra, India</span>
            <span class="utility-divider" aria-hidden="true"></span>
            <span>Direct consultations by appointment</span>
          </span>
        </div>
      </div>
      <div class="container nav-wrapper">
        <a href="index.html" class="brand-logo" aria-label="Hri-thm Clinic home">
          <span class="brand-mark"><img src="images/logo.png" alt="" /></span>
          <span>Hri-thm Clinic</span>
        </a>

        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" aria-label="Open navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav id="primary-navigation" aria-label="Main navigation">
          <ul class="nav-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Dr. Gundad</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="patient-corner.html">Patient Corner</a></li>
            <li><a href="careers.html">Careers</a></li>
            <li><a href="book-appointment.html" class="btn btn-violet btn-nav">Book Appointment</a></li>
          </ul>
        </nav>
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
  
  navLinks.forEach(link => {
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
  const header = document.querySelector('header');
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

  nav.addEventListener('click', event => {
    if (event.target instanceof Element && event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
}

function setupScrollHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
}