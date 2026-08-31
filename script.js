<<<<<<< HEAD
/* ===================================================================
   JITHENDRA SAINAADH ARREPU — PORTFOLIO JAVASCRIPT
   =================================================================== */

(function () {
  'use strict';

  /* ── TYPED TEXT ─────────────────────────────────────────────── */
  const typedEl = document.getElementById('typedText');
  const phrases = [
    '3rd Sem CS & Engineering Student',
    'Full-Stack Developer',
    'Problem Solver',
    'Building Practical Solutions',
    'Curious About AI & Systems',
  ];
  let pIdx = 0, cIdx = 0, deleting = false, pauseTimer = null;

  function typeLoop() {
    if (!typedEl) return;
    const current = phrases[pIdx];
    if (!deleting) {
      typedEl.textContent = current.slice(0, ++cIdx);
      if (cIdx === current.length) {
        deleting = true;
        pauseTimer = setTimeout(typeLoop, 2200);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, --cIdx);
      if (cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
      }
    }
    clearTimeout(pauseTimer);
    pauseTimer = setTimeout(typeLoop, deleting ? 55 : 90);
  }
  setTimeout(typeLoop, 600);

  /* ── NAVBAR SCROLL ───────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', y > 50);
    if (backToTop) backToTop.classList.toggle('visible', y > 400);
    updateActiveNav();
  }, { passive: true });

  /* ── MOBILE NAV TOGGLE ──────────────────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
      });
    });
  }

  /* ── SMOOTH SCROLL (override for anchor links) ──────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── ACTIVE NAV HIGHLIGHT ───────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    let current = '';
    sections.forEach(s => { if (s.offsetTop <= scrollY) current = s.id; });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  /* ── REVEAL ON SCROLL ───────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── SKILL BAR ANIMATION ────────────────────────────────────── */
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(fill => {
          const target = fill.style.width;
          fill.style.width = '0';
          requestAnimationFrame(() => {
            setTimeout(() => { fill.style.width = target; }, 100);
          });
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));

  /* ── COUNTER ANIMATION ──────────────────────────────────────── */
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-number[data-count]').forEach(el => {
          const target = parseInt(el.dataset.count);
          const isDecimal = el.dataset.decimal;
          const duration = 1400;
          const startTime = performance.now();

          function animate(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = target * eased;
            el.textContent = isDecimal
              ? (value / 10).toFixed(1)
              : Math.round(value);
            if (progress < 1) requestAnimationFrame(animate);
            else el.textContent = isDecimal ? (target / 10).toFixed(1) : target;
          }
          requestAnimationFrame(animate);
          el.removeAttribute('data-count');
          el.removeAttribute('data-decimal');
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsEl = document.querySelector('.about-stats');
  if (statsEl) counterObserver.observe(statsEl);

  /* ── CONTACT FORM ───────────────────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const name    = document.getElementById('contactName').value.trim();
      const email   = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
      }

      const mailto = `mailto:jithendrasainaadh@gmail.com`
        + `?subject=${encodeURIComponent(subject || 'Portfolio Contact: ' + name)}`
        + `&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

      window.location.href = mailto;
      showNotification('Opening your email client...', 'success');
    });
  }

  /* ── NOTIFICATION TOAST ─────────────────────────────────────── */
  function showNotification(msg, type = 'success') {
    const existing = document.querySelector('.portfolio-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'portfolio-toast';
    toast.textContent = msg;
    toast.style.cssText = `
      position: fixed; bottom: 5rem; left: 50%; transform: translateX(-50%);
      padding: 0.75rem 1.5rem; border-radius: 8px; font-size: 0.85rem; font-weight: 600;
      background: ${type === 'success' ? '#059669' : '#dc2626'};
      color: white; z-index: 9999; box-shadow: 0 8px 24px rgba(0,0,0,0.4);
      opacity: 0; transition: opacity 0.3s;
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => { toast.style.opacity = '1'; });
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /* ── STAGGER REVEAL DELAY ───────────────────────────────────── */
  document.querySelectorAll('.hackathon-grid .hackathon-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.12}s`;
  });
  document.querySelectorAll('.cert-grid .cert-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
  });
  document.querySelectorAll('.achievements-grid .achievement-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
  });
  document.querySelectorAll('.research-grid .research-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
  });

  /* ── INIT ────────────────────────────────────────────────────── */
  updateActiveNav();
  console.log('%cJithendra Sainaadh Arrepu — Portfolio', 'color:#6366f1;font-weight:700;font-size:1rem;');
  console.log('%cBuilt with HTML · CSS · JavaScript', 'color:#94a3b8;font-size:0.8rem;');

})();
=======
/* ===================================================================
   JITHENDRA SAINAADH ARREPU — PORTFOLIO JAVASCRIPT
   =================================================================== */

(function () {
  'use strict';

  /* ── TYPED TEXT ─────────────────────────────────────────────── */
  const typedEl = document.getElementById('typedText');
  const phrases = [
    '3rd Sem CS & Engineering Student',
    'Full-Stack Developer',
    'Problem Solver',
    'Building Practical Solutions',
    'Curious About AI & Systems',
  ];
  let pIdx = 0, cIdx = 0, deleting = false, pauseTimer = null;

  function typeLoop() {
    if (!typedEl) return;
    const current = phrases[pIdx];
    if (!deleting) {
      typedEl.textContent = current.slice(0, ++cIdx);
      if (cIdx === current.length) {
        deleting = true;
        pauseTimer = setTimeout(typeLoop, 2200);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, --cIdx);
      if (cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
      }
    }
    clearTimeout(pauseTimer);
    pauseTimer = setTimeout(typeLoop, deleting ? 55 : 90);
  }
  setTimeout(typeLoop, 600);

  /* ── NAVBAR SCROLL ───────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', y > 50);
    if (backToTop) backToTop.classList.toggle('visible', y > 400);
    updateActiveNav();
  }, { passive: true });

  /* ── MOBILE NAV TOGGLE ──────────────────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
      });
    });
  }

  /* ── SMOOTH SCROLL (override for anchor links) ──────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── ACTIVE NAV HIGHLIGHT ───────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    let current = '';
    sections.forEach(s => { if (s.offsetTop <= scrollY) current = s.id; });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  /* ── REVEAL ON SCROLL ───────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── SKILL BAR ANIMATION ────────────────────────────────────── */
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(fill => {
          const target = fill.style.width;
          fill.style.width = '0';
          requestAnimationFrame(() => {
            setTimeout(() => { fill.style.width = target; }, 100);
          });
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));

  /* ── COUNTER ANIMATION ──────────────────────────────────────── */
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-number[data-count]').forEach(el => {
          const target = parseInt(el.dataset.count);
          const isDecimal = el.dataset.decimal;
          const duration = 1400;
          const startTime = performance.now();

          function animate(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = target * eased;
            el.textContent = isDecimal
              ? (value / 10).toFixed(1)
              : Math.round(value);
            if (progress < 1) requestAnimationFrame(animate);
            else el.textContent = isDecimal ? (target / 10).toFixed(1) : target;
          }
          requestAnimationFrame(animate);
          el.removeAttribute('data-count');
          el.removeAttribute('data-decimal');
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsEl = document.querySelector('.about-stats');
  if (statsEl) counterObserver.observe(statsEl);

  /* ── CONTACT FORM ───────────────────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const name    = document.getElementById('contactName').value.trim();
      const email   = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
      }

      const mailto = `mailto:jithendrasainaadh@gmail.com`
        + `?subject=${encodeURIComponent(subject || 'Portfolio Contact: ' + name)}`
        + `&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

      window.location.href = mailto;
      showNotification('Opening your email client...', 'success');
    });
  }

  /* ── NOTIFICATION TOAST ─────────────────────────────────────── */
  function showNotification(msg, type = 'success') {
    const existing = document.querySelector('.portfolio-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'portfolio-toast';
    toast.textContent = msg;
    toast.style.cssText = `
      position: fixed; bottom: 5rem; left: 50%; transform: translateX(-50%);
      padding: 0.75rem 1.5rem; border-radius: 8px; font-size: 0.85rem; font-weight: 600;
      background: ${type === 'success' ? '#059669' : '#dc2626'};
      color: white; z-index: 9999; box-shadow: 0 8px 24px rgba(0,0,0,0.4);
      opacity: 0; transition: opacity 0.3s;
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => { toast.style.opacity = '1'; });
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /* ── STAGGER REVEAL DELAY ───────────────────────────────────── */
  document.querySelectorAll('.hackathon-grid .hackathon-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.12}s`;
  });
  document.querySelectorAll('.cert-grid .cert-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
  });
  document.querySelectorAll('.achievements-grid .achievement-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
  });
  document.querySelectorAll('.research-grid .research-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
  });

  /* ── INIT ────────────────────────────────────────────────────── */
  updateActiveNav();
  console.log('%cJithendra Sainaadh Arrepu — Portfolio', 'color:#6366f1;font-weight:700;font-size:1rem;');
  console.log('%cBuilt with HTML · CSS · JavaScript', 'color:#94a3b8;font-size:0.8rem;');

})();
>>>>>>> 970be7c2d44387c522a27a9e9cc1a4d4bd15fa37
