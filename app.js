/**
 * AONICON — Client-Side Application Script
 * Enterprise-grade interactivity: Theme Toggle, Mobile Navigation Drawer,
 * Smooth Section Scrolling, and High-Intent 3-Step Lead Capture Form Engine.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initSmoothScroll();
  initConversionForm();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Light / Dark Mode)
   -------------------------------------------------------------------------- */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('aonicon-theme') || 'light';
  document.documentElement.setAttribute('data-theme', storedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('aonicon-theme', nextTheme);
      updateThemeIcon(toggleBtn, nextTheme);
    });
    updateThemeIcon(toggleBtn, storedTheme);
  }
}

function updateThemeIcon(btn, theme) {
  if (!btn) return;
  btn.innerHTML = theme === 'dark'
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
}

/* --------------------------------------------------------------------------
   2. Sticky Navigation & Mobile Drawer
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.getElementById('main-header');
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link');

  // Sticky header shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile drawer open / close
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });

    const closeDrawer = () => {
      mobileDrawer.classList.remove('open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    closeDrawerBtn?.addEventListener('click', closeDrawer);
    drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (mobileDrawer.classList.contains('open') && 
          !mobileDrawer.contains(e.target) && 
          !mobileToggle.contains(e.target)) {
        closeDrawer();
      }
    });
  }
}

/* --------------------------------------------------------------------------
   3. Smooth Scrolling & Discovery Call Triggers
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  // Smooth scroll and focus lead input for any CTA targeting #contact
  const contactTriggers = document.querySelectorAll('a[href="#contact"]');
  const leadNameInput = document.getElementById('lead-name');

  contactTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const targetSec = document.getElementById('contact');
      if (targetSec) {
        e.preventDefault();
        targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          leadNameInput?.focus();
        }, 450);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. High-Intent 3-Step Lead Capture Form Engine
   -------------------------------------------------------------------------- */
function initConversionForm() {
  const form = document.getElementById('conversion-lead-form');
  const successPane = document.getElementById('conversion-success-state');
  const resetBtn = document.getElementById('btn-reset-conversion');

  if (!form) return;

  // Step Panels & Nav Indicators
  const panels = {
    1: document.querySelector('[data-step-panel="1"]'),
    2: document.querySelector('[data-step-panel="2"]'),
    3: document.querySelector('[data-step-panel="3"]')
  };

  const indicators = {
    1: document.querySelector('[data-step-indicator="1"]'),
    2: document.querySelector('[data-step-indicator="2"]'),
    3: document.querySelector('[data-step-indicator="3"]')
  };

  // Buttons
  const btnToStep2 = document.getElementById('btn-to-step-2');
  const btnBackToStep1 = document.getElementById('btn-back-to-step-1');
  const btnToStep3 = document.getElementById('btn-to-step-3');
  const btnBackToStep2 = document.getElementById('btn-back-to-step-2');
  const btnSubmit = document.getElementById('btn-submit-discovery');

  // Inputs
  const nameInput = document.getElementById('lead-name');
  const emailInput = document.getElementById('lead-email');
  const errName = document.getElementById('err-lead-name');
  const errEmail = document.getElementById('err-lead-email');
  const errService = document.getElementById('err-lead-service');

  // Service Choice Cards (Multi-Select)
  const serviceCards = document.querySelectorAll('.service-choice-card');
  serviceCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const checkbox = card.querySelector('.choice-checkbox');
      if (e.target !== checkbox) {
        checkbox.checked = !checkbox.checked;
      }
      card.classList.toggle('selected', checkbox.checked);
      errService?.classList.remove('visible');
    });
  });

  // Timeline Choice Cards (Single Select Radio)
  const timelineCards = document.querySelectorAll('.timeline-choice-card');
  timelineCards.forEach(card => {
    card.addEventListener('click', () => {
      timelineCards.forEach(c => {
        c.classList.remove('selected');
        const radio = c.querySelector('.timeline-radio');
        if (radio) radio.checked = false;
      });
      card.classList.add('selected');
      const radio = card.querySelector('.timeline-radio');
      if (radio) radio.checked = true;
    });
  });

  // Step Navigation Helper
  function goToStep(stepNum) {
    Object.keys(panels).forEach(k => {
      const num = parseInt(k, 10);
      panels[num].classList.toggle('active', num === stepNum);
      
      const ind = indicators[num];
      if (ind) {
        ind.classList.remove('active', 'completed');
        if (num === stepNum) {
          ind.classList.add('active');
        } else if (num < stepNum) {
          ind.classList.add('completed');
        }
      }
    });
  }

  // Email Validation Helper
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Step 1 -> Step 2 Validation
  btnToStep2?.addEventListener('click', () => {
    let valid = true;

    if (!nameInput.value.trim()) {
      nameInput.classList.add('field-error');
      errName?.classList.add('visible');
      valid = false;
    } else {
      nameInput.classList.remove('field-error');
      errName?.classList.remove('visible');
    }

    if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
      emailInput.classList.add('field-error');
      errEmail?.classList.add('visible');
      valid = false;
    } else {
      emailInput.classList.remove('field-error');
      errEmail?.classList.remove('visible');
    }

    if (valid) {
      goToStep(2);
    }
  });

  // Clear errors on input
  nameInput?.addEventListener('input', () => {
    nameInput.classList.remove('field-error');
    errName?.classList.remove('visible');
  });

  emailInput?.addEventListener('input', () => {
    emailInput.classList.remove('field-error');
    errEmail?.classList.remove('visible');
  });

  // Step 2 -> Back to 1
  btnBackToStep1?.addEventListener('click', () => {
    goToStep(1);
  });

  // Step 2 -> Step 3 Validation (ensure at least 1 service is checked)
  btnToStep3?.addEventListener('click', () => {
    const selectedServices = Array.from(document.querySelectorAll('.choice-checkbox:checked'));
    if (selectedServices.length === 0) {
      errService?.classList.add('visible');
      return;
    }
    errService?.classList.remove('visible');
    goToStep(3);
  });

  // Step 3 -> Back to 2
  btnBackToStep2?.addEventListener('click', () => {
    goToStep(2);
  });

  // Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const clientName = nameInput.value.trim() || 'Valued Partner';
    const checkedServices = Array.from(document.querySelectorAll('.choice-checkbox:checked'))
      .map(cb => cb.value);
    const selectedTimelineRadio = document.querySelector('.timeline-radio:checked');
    const timelineVal = selectedTimelineRadio ? selectedTimelineRadio.value : 'Standard Cadence (8–12 Weeks)';

    // Provide visual feedback
    if (btnSubmit) {
      btnSubmit.innerHTML = `<span>Processing Request...</span>`;
      btnSubmit.style.opacity = '0.75';
      btnSubmit.disabled = true;
    }

    setTimeout(() => {
      // Populate confirmation details
      const successName = document.getElementById('success-client-name');
      const successServices = document.getElementById('success-summary-services');
      const successTimeline = document.getElementById('success-summary-timeline');

      if (successName) successName.textContent = clientName;
      if (successServices) successServices.textContent = checkedServices.join(', ') || 'Software Engineering';
      if (successTimeline) successTimeline.textContent = timelineVal;

      // Hide form & show success pane
      form.style.display = 'none';
      if (successPane) {
        successPane.style.display = 'block';
        successPane.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      if (btnSubmit) {
        btnSubmit.innerHTML = `<span>Book a Discovery Call</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
        btnSubmit.style.opacity = '1';
        btnSubmit.disabled = false;
      }
    }, 400);
  });

  // Reset Form
  resetBtn?.addEventListener('click', () => {
    form.reset();
    serviceCards.forEach((c, idx) => {
      const cb = c.querySelector('.choice-checkbox');
      const shouldSelect = idx === 0; // Default first selected
      if (cb) cb.checked = shouldSelect;
      c.classList.toggle('selected', shouldSelect);
    });
    timelineCards.forEach((c, idx) => {
      const radio = c.querySelector('.timeline-radio');
      const shouldSelect = idx === 1; // Default standard cadence
      if (radio) radio.checked = shouldSelect;
      c.classList.toggle('selected', shouldSelect);
    });

    goToStep(1);
    if (successPane) successPane.style.display = 'none';
    form.style.display = 'block';
    nameInput?.focus();
  });
}
