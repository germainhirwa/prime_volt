/* ============================================
   PRIME VOLT — Main Application Logic
   GSAP Animations, Navigation, Scroll Effects
   ============================================ */

/* --- Loader --- */
function initLoader() {
  const loader = document.getElementById('loader');

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => {
        loader.style.display = 'none';
        initHeroAnimation();
      }, 500);
    }, 800);
  });
}

/* --- Navigation --- */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll effect
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Add scrolled class
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = scrollY;

    // Active nav link
    updateActiveNavLink();
  }, { passive: true });

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';

    // Stagger animate mobile links
    if (mobileMenu.classList.contains('active')) {
      const links = mobileMenu.querySelectorAll('a');
      links.forEach((link, i) => {
        link.style.transitionDelay = `${0.1 + i * 0.08}s`;
      });
    }
  });

  // Close mobile menu on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight;
        const top = target.offsetTop - offset;

        window.scrollTo({
          top: top,
          behavior: 'smooth'
        });
      }
    });
  });
}

function updateActiveNavLink() {
  const sections = ['hero', 'vehicles', 'why', 'how', 'contact'];
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollY = window.scrollY + 200;

  sections.forEach((id, index) => {
    const section = document.getElementById(id);
    if (!section) return;

    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach(link => link.classList.remove('active'));
      // Hero doesn't have a nav link, offset by 1
      if (index > 0 && navLinks[index - 1]) {
        navLinks[index - 1].classList.add('active');
      }
    }
  });
}

/* --- Hero Animation (GSAP) --- */
function initHeroAnimation() {
  if (typeof gsap === 'undefined') {
    // Fallback if GSAP fails to load
    initHeroFallback();
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Background image reveal
  const heroBg = document.getElementById('hero-bg');
  heroBg.classList.add('loaded');

  tl.to('#hero-badge', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.3
  })
  .to('#hero-title', {
    opacity: 1,
    y: 0,
    duration: 1,
  }, '-=0.4')
  .to('#hero-subtitle', {
    opacity: 1,
    y: 0,
    duration: 0.8,
  }, '-=0.5')
  .to('#hero-actions', {
    opacity: 1,
    y: 0,
    duration: 0.8,
  }, '-=0.4');
}

function initHeroFallback() {
  // Simple CSS animation fallback
  const elements = ['#hero-badge', '#hero-title', '#hero-subtitle', '#hero-actions'];
  const heroBg = document.getElementById('hero-bg');
  heroBg.classList.add('loaded');

  elements.forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (el) {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.transition = 'all 0.8s ease';
      }, 300 + i * 200);
    }
  });
}

/* --- Scroll Reveal Animations --- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --- Stats Counter Animation --- */
function initStatsCounter() {
  const statValues = document.querySelectorAll('.stat-value[data-target]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach(el => observer.observe(el));
}

function animateCounter(element) {
  const target = parseInt(element.dataset.target);
  const suffix = element.dataset.suffix || '+';
  const duration = 2000;
  const start = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);

    element.textContent = current + (progress >= 1 ? suffix : '');

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* --- GSAP ScrollTrigger Animations --- */
function initGSAPScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Parallax on hero background
  gsap.to('.hero-bg img', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // Hero glow movement
  gsap.to('.hero-glow-1', {
    x: 100,
    y: 50,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  gsap.to('.hero-glow-2', {
    x: -80,
    y: -40,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // Vehicle cards stagger
  ScrollTrigger.batch('.vehicle-card', {
    onEnter: (elements) => {
      gsap.fromTo(elements,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
      );
    },
    once: true,
    start: 'top 85%'
  });

  // Feature cards
  ScrollTrigger.batch('.feature-card', {
    onEnter: (elements) => {
      gsap.fromTo(elements,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.2)' }
      );
    },
    once: true,
    start: 'top 85%'
  });

  // Step cards
  ScrollTrigger.batch('.step-card', {
    onEnter: (elements) => {
      gsap.fromTo(elements,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.2, ease: 'power2.out' }
      );
    },
    once: true,
    start: 'top 85%'
  });

  // Section labels
  gsap.utils.toArray('.section-label').forEach(label => {
    gsap.fromTo(label,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0, duration: 0.6,
        scrollTrigger: {
          trigger: label,
          start: 'top 85%',
          once: true
        }
      }
    );
  });

  // Section titles
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.fromTo(title,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          once: true
        }
      }
    );
  });
}

/* --- Smooth image loading --- */
function initLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  images.forEach(img => {
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });

    if (!img.complete) {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
    }
  });
}

/* --- Cursor glow effect on cards --- */
function initCardGlowEffect() {
  const cards = document.querySelectorAll('.vehicle-card, .feature-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* --- Initialize Everything --- */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavigation();
  initScrollReveal();
  initStatsCounter();
  initLazyLoading();
  initCardGlowEffect();

  // GSAP animations after a small delay
  setTimeout(() => {
    initGSAPScrollAnimations();
  }, 100);
});

/* --- Preload critical image --- */
const heroImg = new Image();
heroImg.src = 'images/vehicles/pv-thunder-front.jpeg';
