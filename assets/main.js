document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  setActiveNavLink();
  setupMobileNavigation();
});

function renderHeader() {
  const headerContainer = document.getElementById('site-header');
  if (!headerContainer) return;

  headerContainer.innerHTML = `
    <header>
      <div class="container nav-wrapper">
        <a href="index.html" class="brand-logo" aria-label="Hri-thm Clinic home">
          <img src="images/logo.png" alt="" />
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
            <li><a href="book-appointment.html" class="btn btn-violet">Book Appointment</a></li>
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
    <footer>
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <h4 style="font-family: var(--font-heading);">Hri-thm Clinic</h4>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">Preventive Cardiology | Non-Invasive Cardiac Diagnostics</p>
            <p style="color: var(--text-muted); font-size: 0.85rem;">Solapur, Maharashtra, India</p>
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

          <div class="footer-col">
            <h4>Appointments</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1rem;">Direct consultations by appointment.</p>
            <a href="book-appointment.html" class="btn btn-violet" style="padding: 0.6rem 1.2rem; font-size: 0.85rem;">Request Slot</a>
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