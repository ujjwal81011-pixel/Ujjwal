/**
 * ==========================================================================
 * MODERN SCHOOL PORTAL INTERACTIVITY ENGINE
 * Dynamic Placeholders, Fee Calculator, Admissions Form & Realtime Customizer
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCustomizer();
  initAdmissionsCountdown();
  initFeeCalculator();
  initFacilityFilters();
  initAboutTabs();
  initFaqAccordion();
  initAdmissionsForm();
  initMobileNav();
  initScrollHeader();
});

/* ==========================================================================
   1. THEME CONTROLLER (Dark / Light Mode & Color Accents)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('school_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('school_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  // Accent Color Setup
  const savedAccent = localStorage.getItem('school_accent') || 'sapphire';
  if (savedAccent !== 'sapphire') {
    document.documentElement.setAttribute('data-accent', savedAccent);
  }
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('themeIcon');
  if (themeIcon) {
    themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  }
}

/* ==========================================================================
   2. DYNAMIC SCHOOL DETAILS & PLACEHOLDER CUSTOMIZER
   ========================================================================== */
const DEFAULT_CONFIG = {
  schoolName: '[School Name]',
  schoolTagline: '[Inspiring Minds, Shaping Tomorrow]',
  schoolShortCode: '[AIS]',
  schoolEmail: 'admissions@[schoolname].edu',
  schoolPhone: '+1 (555) 019-2834',
  schoolAddress: '[123 Academic Boulevard, Knowledge City]',
  principalName: '[Dr. Sarah Jenkins, Ph.D.]',
  showBadges: true,
  accent: 'sapphire'
};

function getSchoolConfig() {
  const stored = localStorage.getItem('school_site_config');
  if (stored) {
    try {
      return { ...DEFAULT_CONFIG, ...JSON.parse(stored) };
    } catch (e) {
      return DEFAULT_CONFIG;
    }
  }
  return DEFAULT_CONFIG;
}

function applySchoolConfig(config) {
  // Update School Name everywhere
  document.querySelectorAll('.school-name-placeholder').forEach(el => {
    el.textContent = config.schoolName;
  });

  // Update School Tagline
  document.querySelectorAll('.school-tagline-placeholder').forEach(el => {
    el.textContent = config.schoolTagline;
  });

  // Update School Short Code
  document.querySelectorAll('.school-code-placeholder').forEach(el => {
    el.textContent = config.schoolShortCode;
  });

  // Update Email
  document.querySelectorAll('.school-email-placeholder').forEach(el => {
    el.textContent = config.schoolEmail;
    if (el.tagName === 'A') el.href = `mailto:${config.schoolEmail}`;
  });

  // Update Phone
  document.querySelectorAll('.school-phone-placeholder').forEach(el => {
    el.textContent = config.schoolPhone;
    if (el.tagName === 'A') el.href = `tel:${config.schoolPhone.replace(/[^0-9+]/g, '')}`;
  });

  // Update Address
  document.querySelectorAll('.school-address-placeholder').forEach(el => {
    el.textContent = config.schoolAddress;
  });

  // Update Principal Name
  document.querySelectorAll('.school-principal-placeholder').forEach(el => {
    el.textContent = config.principalName;
  });

  // Update Document Title
  document.title = `${config.schoolName} | Next-Gen Center of Academic Excellence`;

  // Update placeholder tags visibility
  document.querySelectorAll('.placeholder-indicator').forEach(badge => {
    badge.style.display = config.showBadges ? 'inline-block' : 'none';
  });

  // Update Accent Theme
  if (config.accent === 'sapphire') {
    document.documentElement.removeAttribute('data-accent');
  } else {
    document.documentElement.setAttribute('data-accent', config.accent);
  }
}

function initCustomizer() {
  const config = getSchoolConfig();
  applySchoolConfig(config);

  const customizerToggle = document.getElementById('customizerToggle');
  const customizerDrawer = document.getElementById('customizerDrawer');
  const customizerClose = document.getElementById('customizerClose');
  const customizerSave = document.getElementById('customizerSave');
  const customizerReset = document.getElementById('customizerReset');

  // Input fields
  const inputName = document.getElementById('customSchoolName');
  const inputTagline = document.getElementById('customSchoolTagline');
  const inputCode = document.getElementById('customSchoolCode');
  const inputEmail = document.getElementById('customSchoolEmail');
  const inputPhone = document.getElementById('customSchoolPhone');
  const inputAddress = document.getElementById('customSchoolAddress');
  const inputBadges = document.getElementById('customShowBadges');

  function populateInputs() {
    const cur = getSchoolConfig();
    if (inputName) inputName.value = cur.schoolName;
    if (inputTagline) inputTagline.value = cur.schoolTagline;
    if (inputCode) inputCode.value = cur.schoolShortCode;
    if (inputEmail) inputEmail.value = cur.schoolEmail;
    if (inputPhone) inputPhone.value = cur.schoolPhone;
    if (inputAddress) inputAddress.value = cur.schoolAddress;
    if (inputBadges) inputBadges.checked = cur.showBadges;

    document.querySelectorAll('.palette-swatch').forEach(swatch => {
      swatch.classList.toggle('active', swatch.dataset.accent === cur.accent);
    });
  }

  if (customizerToggle && customizerDrawer) {
    customizerToggle.addEventListener('click', () => {
      populateInputs();
      customizerDrawer.classList.add('open');
    });
  }

  if (customizerClose && customizerDrawer) {
    customizerClose.addEventListener('click', () => {
      customizerDrawer.classList.remove('open');
    });
  }

  // Accent Swatches
  document.querySelectorAll('.palette-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      document.querySelectorAll('.palette-swatch').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
    });
  });

  // Save Settings
  if (customizerSave) {
    customizerSave.addEventListener('click', () => {
      const activeSwatch = document.querySelector('.palette-swatch.active');
      const updated = {
        schoolName: inputName ? inputName.value.trim() : DEFAULT_CONFIG.schoolName,
        schoolTagline: inputTagline ? inputTagline.value.trim() : DEFAULT_CONFIG.schoolTagline,
        schoolShortCode: inputCode ? inputCode.value.trim() : DEFAULT_CONFIG.schoolShortCode,
        schoolEmail: inputEmail ? inputEmail.value.trim() : DEFAULT_CONFIG.schoolEmail,
        schoolPhone: inputPhone ? inputPhone.value.trim() : DEFAULT_CONFIG.schoolPhone,
        schoolAddress: inputAddress ? inputAddress.value.trim() : DEFAULT_CONFIG.schoolAddress,
        principalName: DEFAULT_CONFIG.principalName,
        showBadges: inputBadges ? inputBadges.checked : true,
        accent: activeSwatch ? activeSwatch.dataset.accent : 'sapphire'
      };

      localStorage.setItem('school_site_config', JSON.stringify(updated));
      localStorage.setItem('school_accent', updated.accent);
      applySchoolConfig(updated);
      customizerDrawer.classList.remove('open');
      showToast('School details updated successfully!');
    });
  }

  // Reset to default
  if (customizerReset) {
    customizerReset.addEventListener('click', () => {
      localStorage.removeItem('school_site_config');
      localStorage.removeItem('school_accent');
      applySchoolConfig(DEFAULT_CONFIG);
      populateInputs();
      showToast('Reset to original placeholder templates.');
    });
  }
}

/* ==========================================================================
   3. ADMISSIONS COUNTDOWN TIMER
   ========================================================================== */
function initAdmissionsCountdown() {
  const daysEl = document.getElementById('countDays');
  const hoursEl = document.getElementById('countHours');
  const minsEl = document.getElementById('countMins');
  const secsEl = document.getElementById('countSecs');

  if (!daysEl) return;

  // Target deadline 15 days from now
  let targetTime = Date.now() + (14 * 24 * 60 * 60 * 1000) + (18 * 60 * 60 * 1000) + (35 * 60 * 1000);

  function updateTimer() {
    const diff = targetTime - Date.now();
    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(d).padStart(2, '0');
    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   4. INTERACTIVE TUITION & FEE CALCULATOR
   ========================================================================== */
function initFeeCalculator() {
  const gradeSelect = document.getElementById('calcGrade');
  const transportSelect = document.getElementById('calcTransport');
  const mealCheckbox = document.getElementById('calcMeal');
  const roboticsCheckbox = document.getElementById('calcRobotics');
  const sportsCheckbox = document.getElementById('calcSports');
  const artsCheckbox = document.getElementById('calcArts');

  const baseFeeDisplay = document.getElementById('receiptBaseFee');
  const transportFeeDisplay = document.getElementById('receiptTransport');
  const activitiesFeeDisplay = document.getElementById('receiptActivities');
  const totalFeeDisplay = document.getElementById('receiptTotal');
  const printFeeBtn = document.getElementById('printFeeBtn');

  if (!gradeSelect) return;

  const GRADE_FEES = {
    'prek': { name: 'Early Childhood / Pre-K', fee: 3800 },
    'primary': { name: 'Primary Wing (Grades 1-5)', fee: 5200 },
    'middle': { name: 'Middle School (Grades 6-8)', fee: 6400 },
    'high': { name: 'Secondary Wing (Grades 9-10)', fee: 7600 },
    'senior': { name: 'Senior Secondary (Grades 11-12)', fee: 8900 }
  };

  const TRANSPORT_FEES = {
    'none': 0,
    'zone1': 650,
    'zone2': 1100,
    'zone3': 1600
  };

  function calculate() {
    const selectedGrade = gradeSelect.value;
    const selectedTransport = transportSelect.value;

    const base = GRADE_FEES[selectedGrade] ? GRADE_FEES[selectedGrade].fee : 5200;
    const transport = TRANSPORT_FEES[selectedTransport] || 0;

    let activities = 0;
    if (mealCheckbox && mealCheckbox.checked) activities += 850;
    if (roboticsCheckbox && roboticsCheckbox.checked) activities += 450;
    if (sportsCheckbox && sportsCheckbox.checked) activities += 500;
    if (artsCheckbox && artsCheckbox.checked) activities += 350;

    const total = base + transport + activities;

    if (baseFeeDisplay) baseFeeDisplay.textContent = `$${base.toLocaleString()}`;
    if (transportFeeDisplay) transportFeeDisplay.textContent = transport > 0 ? `$${transport.toLocaleString()}` : '$0 (Self)';
    if (activitiesFeeDisplay) activitiesFeeDisplay.textContent = `$${activities.toLocaleString()}`;
    if (totalFeeDisplay) totalFeeDisplay.textContent = `$${total.toLocaleString()}`;
  }

  [gradeSelect, transportSelect, mealCheckbox, roboticsCheckbox, sportsCheckbox, artsCheckbox].forEach(el => {
    if (el) el.addEventListener('change', calculate);
  });

  if (printFeeBtn) {
    printFeeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  calculate();
}

/* ==========================================================================
   5. FACILITIES GALLERY FILTERS
   ========================================================================== */
function initFacilityFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const facilityItems = document.querySelectorAll('.facility-item-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      facilityItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. ABOUT US SECTION TABS
   ========================================================================== */
function initAboutTabs() {
  const tabs = document.querySelectorAll('.about-tab-btn');
  const contents = document.querySelectorAll('.about-tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.dataset.target;
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.add('active');
    });
  });
}

/* ==========================================================================
   7. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   8. ADMISSIONS FORM & CELEBRATION MODAL
   ========================================================================== */
function initAdmissionsForm() {
  const form = document.getElementById('admissionsForm');
  const modalBackdrop = document.getElementById('successModal');
  const modalClose = document.getElementById('modalCloseBtn');
  const modalRefId = document.getElementById('modalAppId');
  const modalStudentName = document.getElementById('modalStudentName');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const studentName = document.getElementById('studentName')?.value || 'Student Applicant';
      const grade = document.getElementById('studentGrade')?.value || 'Class';
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const generatedId = `ADM-2025-${randomNum}`;

      if (modalRefId) modalRefId.textContent = generatedId;
      if (modalStudentName) modalStudentName.textContent = studentName;

      if (modalBackdrop) {
        modalBackdrop.classList.add('open');
      }

      form.reset();
    });
  }

  if (modalClose && modalBackdrop) {
    modalClose.addEventListener('click', () => {
      modalBackdrop.classList.remove('open');
    });
  }

  // Virtual Tour Modal
  const tourTrigger = document.getElementById('openTourBtn');
  const tourModal = document.getElementById('tourModal');
  const tourClose = document.getElementById('tourCloseBtn');

  if (tourTrigger && tourModal) {
    tourTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      tourModal.classList.add('open');
    });
  }

  if (tourClose && tourModal) {
    tourClose.addEventListener('click', () => {
      tourModal.classList.remove('open');
    });
  }
}

/* ==========================================================================
   9. MOBILE NAVIGATION & SCROLL HEADER
   ========================================================================== */
function initMobileNav() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      menuBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close when clicking nav links
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }
}

function initScrollHeader() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   10. LIGHTWEIGHT TOAST NOTIFIER
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('siteToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'siteToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: #0f172a;
      color: #fff;
      padding: 12px 24px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      font-size: 0.9rem;
      font-weight: 600;
      z-index: 9999;
      transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
      display: flex;
      align-items: center;
      gap: 8px;
    `;
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fas fa-check-circle" style="color:#10b981;"></i> ${message}`;
  toast.style.transform = 'translateX(-50%) translateY(0)';

  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(100px)';
  }, 3200);
}
