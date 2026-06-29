// =====================================================
//  APURBO PORTFOLIO — JavaScript
// =====================================================

/* ---------- NAVBAR SCROLL ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ---------- MOBILE NAV TOGGLE ---------- */
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Animate hamburger to X
  const spans = navToggle.querySelectorAll('span');
  navLinks.classList.contains('open')
    ? spans.forEach((s, i) => {
        if (i === 0) { s.style.transform = 'rotate(45deg) translate(5px, 5px)'; }
        if (i === 1) { s.style.opacity = '0'; }
        if (i === 2) { s.style.transform = 'rotate(-45deg) translate(5px, -5px)'; }
      })
    : spans.forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
});

// Close nav when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});

/* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const observeNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(item => item.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => observeNav.observe(section));

/* ---------- SCROLL-IN ANIMATIONS ---------- */
const animatedEls = document.querySelectorAll(
  '.skill-category, .project-card, .about-highlights .highlight-item, ' +
  '.interest-item, .publication-card, .contact-card, .scholar-cta, ' +
  '.section-header, .about-grid, .research-col-title, .contact-form'
);

animatedEls.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children within the same parent
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 0);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

animatedEls.forEach((el, i) => {
  fadeObserver.observe(el);
});

/* ---------- STAGGER CHILDREN ---------- */
// Stagger skill tags
document.querySelectorAll('.skill-category').forEach(cat => {
  const tags = cat.querySelectorAll('.skill-tag');
  tags.forEach((tag, i) => {
    tag.style.transitionDelay = `${i * 0.04}s`;
    tag.classList.add('fade-in');
    fadeObserver.observe(tag);
  });
});

// Stagger project cards
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

// Stagger highlight items
document.querySelectorAll('.highlight-item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.1}s`;
});

// Stagger interest items
document.querySelectorAll('.interest-item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.06}s`;
});

/* ---------- SCROLL INDICATOR ---------- */
const scrollIndicator = document.getElementById('scroll-indicator');
if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  });
}

/* ---------- CONTACT FORM ---------- */
function handleContactForm(e) {
  e.preventDefault();
  const form = document.getElementById('contact-form');
  const btn = document.getElementById('contact-submit-btn');
  const success = document.getElementById('form-success');

  // Simulate sending
  btn.disabled = true;
  btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg> Sending...`;

  setTimeout(() => {
    // Open mailto as fallback
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email-input').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    const mailtoLink = `mailto:apurbomd77@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Hi Apurbo,\n\n${message}\n\nFrom: ${name} (${email})`
    )}`;

    window.location.href = mailtoLink;

    // Show success
    success.style.display = 'flex';
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/>
    </svg> Sent!`;

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg> Send Message`;
      form.reset();
      success.style.display = 'none';
    }, 4000);
  }, 1200);
}

/* ---------- TYPED HERO TITLE EFFECT ---------- */
// Subtle shimmer on gradient text
const gradientTexts = document.querySelectorAll('.gradient-text');
gradientTexts.forEach(el => {
  el.style.backgroundSize = '200% 200%';
  el.style.animation = 'gradientShift 4s ease infinite';
});

// Inject keyframe for gradient shift
const styleEl = document.createElement('style');
styleEl.innerHTML = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;
document.head.appendChild(styleEl);

/* ---------- SMOOTH CURSOR GLOW (optional enhancement) ---------- */
let mouseX = 0, mouseY = 0;
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: left 0.3s ease, top 0.3s ease;
`;
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  glow.style.left = mouseX + 'px';
  glow.style.top = mouseY + 'px';
});

/* ---------- SKILL TAG HOVER RIPPLE ---------- */
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      width: 50px; height: 50px;
      background: rgba(139,92,246,0.4);
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      animation: ripple 0.6s ease-out forwards;
      pointer-events: none;
    `;
    tag.style.position = 'relative';
    tag.style.overflow = 'hidden';
    ripple.style.left = e.offsetX + 'px';
    ripple.style.top = e.offsetY + 'px';
    tag.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Inject ripple keyframe
const rippleStyle = document.createElement('style');
rippleStyle.innerHTML = `
  @keyframes ripple {
    to { transform: translate(-50%, -50%) scale(4); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

/* ---------- YEAR IN FOOTER ---------- */
const yearEls = document.querySelectorAll('.footer-copy');
yearEls.forEach(el => {
  el.innerHTML = el.innerHTML.replace('2026', new Date().getFullYear());
});

console.log('%c Apurbo Portfolio Loaded 🚀', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
