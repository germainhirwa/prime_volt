/* ============================================
   PRIME VOLT — Vehicle Data & Functionality
   ============================================ */

const WHATSAPP_NUMBER = '250788447848'; // Updated from index.html change

const vehicleData = [
  {
    id: 'pv-horizon',
    name: 'PV Horizon',
    type: 'Premium Family SUV',
    category: ['suv', 'personal'],
    price: 'RWF 28,000,000',
    priceNote: 'Starting from',
    description: 'The PV Horizon is our flagship family SUV — a stunning blend of space, power, and next-generation electric technology. With its distinctive mint green exterior and bold Aeolus-inspired design language, this vehicle turns heads while delivering class-leading range and comfort for the entire family.',
    images: [
      'images/vehicles/pv-horizon-front.jpeg',
      'images/vehicles/pv-horizon-side.jpeg',
      'images/vehicles/pv-horizon-rear.jpeg'
    ],
    specs: {
      range: '450 km',
      power: '204 HP',
      seats: '5',
      charge: '45 min',
      battery: '61.3 kWh',
      topSpeed: '170 km/h',
      drive: 'FWD',
      warranty: '5 Years'
    },
    highlights: ['Panoramic sunroof', 'Intelligent cruise control', '12.3" touchscreen', 'Level 2 ADAS']
  },
  {
    id: 'pv-thunder',
    name: 'PV Thunder',
    type: 'Executive 7-Seater SUV',
    category: ['suv', 'personal', 'commercial'],
    price: 'RWF 38,000,000',
    priceNote: 'Starting from',
    description: 'The PV Thunder is Pure Authority — a commanding executive SUV in sleek obsidian black that dominates every road in Kigali. With three rows of premium seating and an imposing presence, the Thunder is built for leaders who refuse to compromise on luxury, space, or sustainability.',
    images: [
      'images/vehicles/pv-thunder-front.jpeg',
      'images/vehicles/pv-thunder-side.jpeg'
    ],
    specs: {
      range: '520 km',
      power: '245 HP',
      seats: '7',
      charge: '50 min',
      battery: '71.4 kWh',
      topSpeed: '180 km/h',
      drive: 'AWD',
      warranty: '5 Years'
    },
    highlights: ['7-seat configuration', 'Premium leather interior', 'Wireless charging', 'Dual-zone climate']
  },
  {
    id: 'pv-storm',
    name: 'PV Storm',
    type: 'Mid-Range Family SUV',
    category: ['suv', 'personal', 'commercial'],
    price: 'RWF 32,000,000',
    priceNote: 'Starting from',
    description: 'The PV Storm strikes the perfect balance between capability and value. In striking silver-gray, this mid-range SUV offers generous space, elegant design, and an impressive electric range that makes daily commutes and weekend road trips effortless. Perfect for growing families.',
    images: [
      'images/vehicles/pv-storm-front.jpeg',
      'images/vehicles/pv-storm-side.jpeg',
      'images/vehicles/pv-storm-rear.jpeg'
    ],
    specs: {
      range: '480 km',
      power: '218 HP',
      seats: '7',
      charge: '48 min',
      battery: '66.8 kWh',
      topSpeed: '175 km/h',
      drive: 'FWD',
      warranty: '5 Years'
    },
    highlights: ['Spacious 7-seat layout', 'Advanced safety suite', 'Smart connectivity', 'Regenerative braking']
  },
  {
    id: 'pv-nova',
    name: 'PV Nova',
    type: 'Compact City SUV',
    category: ['compact', 'personal'],
    price: 'RWF 22,000,000',
    priceNote: 'Starting from',
    description: 'The PV Nova is the smart choice for urban Rwanda — a compact, agile city SUV that combines style and efficiency in a surprisingly spacious package. Perfect for navigating Kigali\'s streets with ease, the Nova proves that going electric doesn\'t mean going big or breaking the bank.',
    images: [
      'images/vehicles/pv-nova-front.jpeg',
      'images/vehicles/pv-nova-side.jpeg',
      'images/vehicles/pv-nova-front-2.jpeg',
      'images/vehicles/pv-nova-side-2.jpeg'
    ],
    specs: {
      range: '380 km',
      power: '150 HP',
      seats: '5',
      charge: '35 min',
      battery: '50.1 kWh',
      topSpeed: '160 km/h',
      drive: 'FWD',
      warranty: '5 Years'
    },
    highlights: ['Compact & agile', 'City-smart navigation', 'Fast charging capable', 'Low cost of ownership']
  }
];

/* --- Render Vehicle Cards --- */
function renderVehicleCards(filter = 'all') {
  const grid = document.getElementById('vehicle-grid');
  if (!grid) return;

  const filtered = filter === 'all'
    ? vehicleData
    : vehicleData.filter(v => v.category.includes(filter));

  grid.innerHTML = '';

  filtered.forEach((vehicle, index) => {
    const card = document.createElement('div');
    card.className = 'vehicle-card reveal';
    card.style.transitionDelay = `${index * 0.1}s`;
    card.setAttribute('data-vehicle', vehicle.id);
    card.onclick = () => openVehicleModal(vehicle.id);

    // Use first three specs for card
    const mainSpecs = [
      { value: vehicle.specs.range, label: 'Range' },
      { value: vehicle.specs.power, label: 'Power' },
      { value: vehicle.specs.seats, label: 'Seats' }
    ];

    card.innerHTML = `
      <div class="vehicle-card-image">
        <img src="${vehicle.images[0]}" alt="${vehicle.name} - ${vehicle.type}" loading="lazy">
        <span class="vehicle-card-badge">${vehicle.category.includes('compact') ? 'Compact' : 'SUV'}</span>
        <div class="vehicle-card-gallery-dots">
          ${vehicle.images.map((_, i) => `<span class="${i === 0 ? 'active' : ''}"></span>`).join('')}
        </div>
      </div>
      <div class="vehicle-card-info">
        <h3 class="vehicle-card-name">${vehicle.name}</h3>
        <p class="vehicle-card-type">${vehicle.type}</p>
        <div class="vehicle-card-specs">
          ${mainSpecs.map(s => `
            <div class="vehicle-card-spec">
              <div class="vehicle-card-spec-value">${s.value}</div>
              <div class="vehicle-card-spec-label">${s.label}</div>
            </div>
          `).join('')}
        </div>
        <div class="vehicle-card-footer">
          <div class="vehicle-card-price">
            <span class="from">${vehicle.priceNote}</span>
            ${vehicle.price}
          </div>
          <button class="btn btn-primary btn-sm">View Details</button>
        </div>
      </div>
    `;

    grid.appendChild(card);

    // Card image hover slider
    setupCardImageSlider(card, vehicle);
  });

  // Re-fire reveal animations
  setTimeout(() => {
    document.querySelectorAll('.vehicle-card.reveal').forEach(el => {
      if (isElementInViewport(el)) {
        el.classList.add('active');
      }
    });
  }, 100);
}

/* --- Card Image Hover Slider --- */
function setupCardImageSlider(card, vehicle) {
  if (vehicle.images.length <= 1) return;

  const img = card.querySelector('.vehicle-card-image img');
  const dots = card.querySelectorAll('.vehicle-card-gallery-dots span');
  let currentIndex = 0;
  let interval;

  card.addEventListener('mouseenter', () => {
    interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % vehicle.images.length;
      img.style.opacity = '0';
      setTimeout(() => {
        img.src = vehicle.images[currentIndex];
        img.style.opacity = '1';
        dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
      }, 200);
    }, 1500);
  });

  card.addEventListener('mouseleave', () => {
    clearInterval(interval);
    currentIndex = 0;
    img.src = vehicle.images[0];
    img.style.opacity = '1';
    dots.forEach((d, i) => d.classList.toggle('active', i === 0));
  });
}

/* --- Vehicle Modal --- */
let currentModalSlide = 0;

function openVehicleModal(vehicleId) {
  const vehicle = vehicleData.find(v => v.id === vehicleId);
  if (!vehicle) return;

  const modal = document.getElementById('vehicle-modal');
  const track = document.getElementById('modal-gallery-track');
  const dots = document.getElementById('modal-gallery-dots');
  const title = document.getElementById('modal-title');
  const type = document.getElementById('modal-type');
  const desc = document.getElementById('modal-description');
  const specs = document.getElementById('modal-specs');
  const price = document.getElementById('modal-price');
  const whatsappBtn = document.getElementById('modal-whatsapp-btn');
  const inquireBtn = document.getElementById('modal-inquire-btn');

  // Gallery
  track.innerHTML = vehicle.images.map(img => `
    <div class="modal-gallery-slide">
      <img src="${img}" alt="${vehicle.name}">
    </div>
  `).join('');

  dots.innerHTML = vehicle.images.map((_, i) => `
    <span class="${i === 0 ? 'active' : ''}" onclick="goToModalSlide(${i})"></span>
  `).join('');

  currentModalSlide = 0;
  updateModalGallery();

  // Info
  title.textContent = vehicle.name;
  type.textContent = vehicle.type;
  desc.textContent = vehicle.description;
  price.innerHTML = `<span class="currency">${vehicle.priceNote}</span> ${vehicle.price}`;

  // Specs grid
  const specItems = [
    { icon: '🔋', value: vehicle.specs.range, label: 'Range' },
    { icon: '⚡', value: vehicle.specs.power, label: 'Power' },
    { icon: '👥', value: vehicle.specs.seats, label: 'Seats' },
    { icon: '⏱️', value: vehicle.specs.charge, label: 'Fast Charge' },
    { icon: '🔌', value: vehicle.specs.battery, label: 'Battery' },
    { icon: '💨', value: vehicle.specs.topSpeed, label: 'Top Speed' },
    { icon: '🚙', value: vehicle.specs.drive, label: 'Drivetrain' },
    { icon: '🛡️', value: vehicle.specs.warranty, label: 'Warranty' }
  ];

  specs.innerHTML = specItems.map(s => `
    <div class="modal-spec-item">
      <div class="modal-spec-icon">${s.icon}</div>
      <div class="modal-spec-value">${s.value}</div>
      <div class="modal-spec-label">${s.label}</div>
    </div>
  `).join('');

  // WhatsApp link
  const waMessage = encodeURIComponent(`Hello Prime Volt! I'm interested in the ${vehicle.name} (${vehicle.type}). Can I get more details?`);
  whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  // Inquire button closes modal and scrolls to contact
  inquireBtn.onclick = (e) => {
    e.preventDefault();
    closeVehicleModal();
    // Pre-select model in form
    const modelSelect = document.getElementById('form-model');
    if (modelSelect) {
      modelSelect.value = vehicle.name;
    }
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeVehicleModal() {
  const modal = document.getElementById('vehicle-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function updateModalGallery() {
  const track = document.getElementById('modal-gallery-track');
  const dots = document.querySelectorAll('#modal-gallery-dots span');

  track.style.transform = `translateX(-${currentModalSlide * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === currentModalSlide));
}

function goToModalSlide(index) {
  const track = document.getElementById('modal-gallery-track');
  const totalSlides = track.children.length;
  currentModalSlide = Math.max(0, Math.min(index, totalSlides - 1));
  updateModalGallery();
}

function nextModalSlide() {
  const track = document.getElementById('modal-gallery-track');
  const totalSlides = track.children.length;
  currentModalSlide = (currentModalSlide + 1) % totalSlides;
  updateModalGallery();
}

function prevModalSlide() {
  const track = document.getElementById('modal-gallery-track');
  const totalSlides = track.children.length;
  currentModalSlide = (currentModalSlide - 1 + totalSlides) % totalSlides;
  updateModalGallery();
}

/* --- Filter System --- */
function setupFilters() {
  const filterBar = document.getElementById('filter-bar');
  if (!filterBar) return;

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    // Update active state
    filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Filter vehicles
    const filter = btn.dataset.filter;
    renderVehicleCards(filter);
  });
}

/* --- Utility --- */
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom > 0
  );
}

/* --- Initialize --- */
document.addEventListener('DOMContentLoaded', () => {
  renderVehicleCards();
  setupFilters();

  // Modal close handlers
  document.getElementById('modal-close').addEventListener('click', closeVehicleModal);
  document.getElementById('vehicle-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeVehicleModal();
  });

  // Gallery navigation
  document.getElementById('modal-prev').addEventListener('click', prevModalSlide);
  document.getElementById('modal-next').addEventListener('click', nextModalSlide);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('vehicle-modal');
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') closeVehicleModal();
    if (e.key === 'ArrowLeft') prevModalSlide();
    if (e.key === 'ArrowRight') nextModalSlide();
  });

  // Touch swipe for modal gallery
  let touchStartX = 0;
  const galleryEl = document.getElementById('modal-gallery');

  galleryEl.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  galleryEl.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) nextModalSlide();
      else prevModalSlide();
    }
  }, { passive: true });
});
