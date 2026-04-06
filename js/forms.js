/* ============================================
   PRIME VOLT — Forms & WhatsApp Integration
   ============================================ */

const WHATSAPP_NUM = '250788447848'; // Updated from index.html change

/* --- Form Validation & Submission --- */
function setupContactForm() {
  const form = document.getElementById('contact-form');
  const successEl = document.getElementById('form-success');
  const submitBtn = document.getElementById('form-submit-btn');
  const whatsappBtn = document.getElementById('form-whatsapp-btn');

  if (!form) return;

  // Submit handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Simulate submission with visual feedback
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
      Sending...
    `;

    // Simulate network delay
    setTimeout(() => {
      form.style.display = 'none';
      successEl.classList.add('active');
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        Send Inquiry
      `;
    }, 1500);
  });

  // WhatsApp button
  whatsappBtn.addEventListener('click', () => {
    if (!validateForm()) return;
    sendViaWhatsApp();
  });
}

/* --- Validate Form --- */
function validateForm() {
  const fields = [
    { id: 'form-name', validator: (v) => v.trim().length > 0 },
    { id: 'form-phone', validator: (v) => /^[\+]?[0-9\s\-]{9,}$/.test(v.trim()) },
    { id: 'form-location', validator: (v) => v !== '' },
    { id: 'form-model', validator: (v) => v !== '' }
  ];

  let valid = true;

  fields.forEach(({ id, validator }) => {
    const input = document.getElementById(id);
    const group = input.closest('.form-group');

    if (!validator(input.value)) {
      group.classList.add('error');
      valid = false;
    } else {
      group.classList.remove('error');
    }
  });

  return valid;
}

/* --- Send via WhatsApp --- */
function sendViaWhatsApp() {
  const name = document.getElementById('form-name').value.trim();
  const phone = document.getElementById('form-phone').value.trim();
  const location = document.getElementById('form-location').value;
  const model = document.getElementById('form-model').value;
  const message = document.getElementById('form-message').value.trim();

  const waText = `Hello Prime Volt! 🚗⚡\n\n` +
    `*New Inquiry:*\n` +
    `━━━━━━━━━━━━━━\n` +
    `👤 Name: ${name}\n` +
    `📞 Phone: ${phone}\n` +
    `📍 Location: ${location}\n` +
    `🚙 Model: ${model}\n` +
    (message ? `💬 Message: ${message}\n` : '') +
    `━━━━━━━━━━━━━━\n\n` +
    `I'd like to learn more about this vehicle!`;

  const encodedText = encodeURIComponent(waText);
  window.open(`https://wa.me/${WHATSAPP_NUM}?text=${encodedText}`, '_blank');
}

/* --- Clear form errors on input --- */
function setupFormInteractions() {
  const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      if (group) group.classList.remove('error');
    });

    input.addEventListener('change', () => {
      const group = input.closest('.form-group');
      if (group) group.classList.remove('error');
    });

    // Floating label effect (visual feedback on focus)
    input.addEventListener('focus', () => {
      const group = input.closest('.form-group');
      if (group) group.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      const group = input.closest('.form-group');
      if (group) group.classList.remove('focused');
    });
  });
}

/* --- Floating WhatsApp Button --- */
function setupFloatingWhatsApp() {
  const float = document.getElementById('whatsapp-float');
  if (!float) return;

  // Show after a small delay
  float.style.opacity = '0';
  float.style.transform = 'translateY(20px)';
  float.style.transition = 'all 0.5s ease';

  setTimeout(() => {
    float.style.opacity = '1';
    float.style.transform = 'translateY(0)';
  }, 2000);

  // Hide when scrolled to bottom (near footer)
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;

    // Fade out near footer
    if (scrollTop + winHeight > docHeight - 200) {
      float.style.opacity = '0.5';
    } else {
      float.style.opacity = '1';
    }

    lastScrollTop = scrollTop;
  }, { passive: true });
}

/* --- Initialize --- */
document.addEventListener('DOMContentLoaded', () => {
  setupContactForm();
  setupFormInteractions();
  setupFloatingWhatsApp();
});
