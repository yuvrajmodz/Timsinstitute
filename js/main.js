/* ============================================================
   TIMS INSTITUTE — Main JavaScript & SPA Router
   ============================================================ */

'use strict';

// ─── Utility ───────────────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── Nav Indicator (Smooth Sliding Underline) ───────────────
let navIndicatorEl = null;

function initNavIndicator() {
  const navContainer = $('.navbar-nav');
  if (!navContainer) return;

  navIndicatorEl = navContainer.querySelector('.nav-indicator');
  if (!navIndicatorEl) {
    navIndicatorEl = document.createElement('span');
    navIndicatorEl.className = 'nav-indicator';
    navIndicatorEl.setAttribute('aria-hidden', 'true');
    navContainer.appendChild(navIndicatorEl);
  }

  // Position indicator to currently active link
  updateNavIndicator();

  // Mouse hover glide effect across links
  const links = $$('.nav-link', navContainer);
  links.forEach(link => {
    link.addEventListener('mouseenter', () => updateNavIndicator(link));
  });

  navContainer.addEventListener('mouseleave', () => {
    updateNavIndicator(); // Return to active link
  });

  window.addEventListener('resize', () => updateNavIndicator(), { passive: true });
}

function updateNavIndicator(targetLink = null) {
  const navContainer = $('.navbar-nav');
  if (!navContainer || !navIndicatorEl) return;

  const activeLink = targetLink || navContainer.querySelector('.nav-link.active');
  if (!activeLink || activeLink.offsetParent === null) {
    navIndicatorEl.style.opacity = '0';
    return;
  }

  const containerRect = navContainer.getBoundingClientRect();
  const linkRect = activeLink.getBoundingClientRect();

  const pad = 12; // padding inset
  const left = linkRect.left - containerRect.left + pad;
  const width = Math.max(linkRect.width - (pad * 2), 16);

  navIndicatorEl.style.transform = `translateX(${left}px)`;
  navIndicatorEl.style.width = `${width}px`;
  navIndicatorEl.style.opacity = '1';
}

// ─── Navbar Active Links & Scroll ───────────────────────────
function updateActiveNavLinks(targetPath = window.location.pathname) {
  // Normalise: strip trailing slash, strip .html, treat '' and '/' as 'index'
  let pageName = targetPath.split('/').pop().split('#')[0].split('?')[0];
  pageName = pageName.replace(/\.html$/, '');
  if (pageName === '' || pageName === '/') pageName = 'index';

  const navLinks = $$('.nav-link');
  const mobileNavLinks = $$('.mobile-nav-link');

  const updateList = (list) => {
    list.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      // Resolve href against origin to get a clean pathname
      let linkName;
      try {
        const u = new URL(href, window.location.origin);
        linkName = u.pathname.split('/').pop().replace(/\.html$/, '');
        if (linkName === '' || u.pathname === '/') linkName = 'index';
      } catch (_) {
        linkName = href.split('/').pop().replace(/\.html$/, '') || 'index';
      }
      if (linkName === pageName) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  updateList(navLinks);
  updateList(mobileNavLinks);
  updateNavIndicator();
}

function initNavbar() {
  const navbar = $('#navbar');
  if (!navbar) return;

  // Scroll effect
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  updateActiveNavLinks();
  initNavIndicator();

  // Hamburger toggle
  const hamburger = $('#hamburger');
  const mobileMenu = $('#mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on link click
  $$('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ─── Scroll Reveal ─────────────────────────────────────────
let revealObserver = null;

function initScrollReveal() {
  if (reduceMotion()) {
    $$('.reveal, .reveal-left, .reveal-right').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  if (revealObserver) {
    revealObserver.disconnect();
  }

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  $$('.reveal, .reveal-left, .reveal-right').forEach(el => {
    if (!el.classList.contains('revealed')) {
      revealObserver.observe(el);
    }
  });
}

// ─── Animated Counters ─────────────────────────────────────
let counterObserver = null;

function initCounters() {
  if (reduceMotion()) return;

  const counters = $$('[data-count]');
  if (!counters.length) return;

  if (counterObserver) {
    counterObserver.disconnect();
  }

  counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const duration = 1800;
      const start = performance.now();

      const ease = (t) => 1 - Math.pow(1 - t, 3);

      const update = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.round(ease(progress) * target);
        el.textContent = prefix + current + suffix;
        if (progress < 1) requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));
}

// ─── Back To Top ───────────────────────────────────────────
function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.onclick = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion() ? 'auto' : 'smooth' });
  };
}

// ─── Toast ─────────────────────────────────────────────────
function showToast(message, type = 'success', duration = 3500) {
  let toast = $('#global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.className = `toast toast-${type}`;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

// ─── Contact / Enquiry Form ────────────────────────────────
function initContactForm() {
  const forms = $$('[data-enquiry-form]');
  forms.forEach(form => {
    form.onsubmit = (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const originalText = btn.textContent;

      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        form.reset();
        showToast('Message sent! We will contact you shortly.', 'success');
      }, 1200);
    };
  });

  // Handle URL query parameters for course selection
  const urlParams = new URLSearchParams(window.location.search);
  const courseParam = urlParams.get('course');
  if (courseParam) {
    const sel = document.getElementById('c-course');
    if (sel) {
      for (let opt of sel.options) {
        if (opt.value.toLowerCase() === courseParam.toLowerCase() ||
            opt.text.toLowerCase() === courseParam.toLowerCase() ||
            opt.value.toLowerCase().includes(courseParam.toLowerCase())) {
          opt.selected = true;
          break;
        }
      }
    }
  }
}

// ─── Smooth Anchor Scroll ──────────────────────────────────
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.onclick = (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || href === '') return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: reduceMotion() ? 'auto' : 'smooth' });
    };
  });
}

// ─── Stagger Cards ─────────────────────────────────────────
function initStaggerCards() {
  if (reduceMotion()) return;

  const grids = $$('[data-stagger-grid]');
  grids.forEach(grid => {
    const cards = [...grid.children];
    cards.forEach((card, i) => {
      card.classList.add('reveal');
      card.style.transitionDelay = `${i * 0.08}s`;
    });
  });
}

// ─── Filter Buttons (Courses Page) ─────────────────────────
function initFilters() {
  const filterBtns = $$('.filter-btn');
  const cards = $$('[data-category]');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.onclick = () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.filter;
      cards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = '';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    };
  });
}

// ─── Init all ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initCounters();
  initBackToTop();
  initContactForm();
  initSmoothScroll();
  initStaggerCards();
  initFilters();
});
