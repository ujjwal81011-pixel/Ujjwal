/**
 * Restaurant Modern Showcase - Main Application Logic
 * Interactive UI, Dynamic Placeholder Engine, Reservation Engine & Cart
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- State Management ---
  const state = {
    brandName: localStorage.getItem('res_brand_name') || '[RESTAURANT NAME]',
    brandTagline: localStorage.getItem('res_brand_tagline') || 'Haute Cuisine & Epicurean Artistry',
    activeFilter: 'all',
    cart: JSON.parse(localStorage.getItem('res_cart') || '[]'),
    selectedTime: '19:30',
    selectedGuests: '2',
    currentModalDish: null
  };

  // --- Element Selectors ---
  const header = document.querySelector('.site-header');
  const menuContainer = document.getElementById('menu-grid-container');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const cartBtn = document.getElementById('cart-toggle-btn');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartTaxEl = document.getElementById('cart-tax');
  const cartTotalEl = document.getElementById('cart-total');
  const cartCountBadges = document.querySelectorAll('.cart-count');
  
  // Customizer Elements
  const customizerModal = document.getElementById('customizer-modal');
  const customizerOpenBtn = document.getElementById('customizer-toggle-btn');
  const customizerCloseBtn = document.getElementById('customizer-close-btn');
  const brandNameInput = document.getElementById('custom-brand-name-input');
  const brandTaglineInput = document.getElementById('custom-brand-tagline-input');
  const saveBrandBtn = document.getElementById('save-brand-btn');
  const resetBrandBtn = document.getElementById('reset-brand-btn');
  const presetButtons = document.querySelectorAll('.preset-btn');

  // Dish Modal Elements
  const dishModal = document.getElementById('dish-modal');
  const dishModalClose = document.getElementById('dish-modal-close');
  const dishModalContent = document.getElementById('dish-modal-content');

  // Reservation Elements
  const reservationForm = document.getElementById('reservation-form');
  const timePills = document.querySelectorAll('.time-pill');
  const guestPills = document.querySelectorAll('.guest-pill');
  const resDateInput = document.getElementById('res-date');
  const confirmationModal = document.getElementById('confirmation-modal');
  const confirmationDetails = document.getElementById('confirmation-details');
  const confirmationClose = document.getElementById('confirmation-close');

  // Vercel Assistant Modal Elements
  const vercelModal = document.getElementById('vercel-modal');
  const vercelOpenBtns = document.querySelectorAll('.vercel-guide-trigger');
  const vercelCloseBtn = document.getElementById('vercel-modal-close');

  // Lightbox Elements
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  // Set default reservation date to tomorrow
  if (resDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    resDateInput.value = tomorrow.toISOString().split('T')[0];
    resDateInput.min = new Date().toISOString().split('T')[0];
  }

  // --- Initialize Brand Placeholders ---
  function applyBrandIdentity() {
    const brandElements = document.querySelectorAll('[data-brand-target="name"]');
    brandElements.forEach(el => {
      el.textContent = state.brandName;
    });

    const taglineElements = document.querySelectorAll('[data-brand-target="tagline"]');
    taglineElements.forEach(el => {
      el.textContent = state.brandTagline;
    });

    // Update document title
    document.title = `${state.brandName} | Luxury Fine Dining Experience`;

    if (brandNameInput) brandNameInput.value = state.brandName;
    if (brandTaglineInput) brandTaglineInput.value = state.brandTagline;
  }

  applyBrandIdentity();

  // --- Scroll Effects ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Render Menu Items ---
  function renderMenu(category = 'all') {
    if (!menuContainer || typeof MENU_ITEMS === 'undefined') return;

    let items = MENU_ITEMS;
    if (category !== 'all') {
      items = MENU_ITEMS.filter(item => item.category === category);
    }

    menuContainer.innerHTML = '';

    items.forEach(dish => {
      const card = document.createElement('div');
      card.className = 'dish-card';
      card.innerHTML = `
        <div class="dish-image-wrapper">
          <img src="${dish.image}" alt="${dish.name}" loading="lazy">
          <span class="dish-tag">${dish.badge}</span>
          <span class="dish-price-tag">$${dish.price}</span>
        </div>
        <div class="dish-body">
          <div class="dish-header">
            <h4 class="dish-title">${dish.name}</h4>
            <span style="font-size:0.75rem; color:var(--text-gold); text-transform:uppercase; letter-spacing:0.08em;">${dish.tag} • ${dish.calories}</span>
          </div>
          <p class="dish-desc">${dish.description}</p>
          <div class="dish-pairing">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 22h8m-4-7v7M7 3h10a4 4 0 0 1 4 4v2a8 8 0 0 1-8 8 8 8 0 0 1-8-8V7a4 4 0 0 1 4-4z"/></svg>
            <span>Pairing: ${dish.pairing}</span>
          </div>
          <div class="dish-footer">
            <button class="btn btn-secondary btn-sm quick-view-btn" data-id="${dish.id}">
              Details
            </button>
            <button class="btn btn-primary btn-sm add-cart-btn" data-id="${dish.id}">
              + Add to Tasting
            </button>
          </div>
        </div>
      `;
      menuContainer.appendChild(card);
    });

    // Attach listeners
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dishId = e.currentTarget.getAttribute('data-id');
        openDishModal(dishId);
      });
    });

    document.querySelectorAll('.add-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dishId = e.currentTarget.getAttribute('data-id');
        addToCart(dishId);
      });
    });
  }

  renderMenu();

  // Menu Category Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');
      state.activeFilter = cat;
      renderMenu(cat);
    });
  });

  // --- Dish Modal View ---
  function openDishModal(dishId) {
    const dish = MENU_ITEMS.find(d => d.id === dishId);
    if (!dish || !dishModal) return;

    state.currentModalDish = dish;

    dishModalContent.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
        <div style="border-radius: var(--radius-md); overflow: hidden; height: 320px; position:relative;">
          <img src="${dish.image}" alt="${dish.name}" style="width:100%; height:100%; object-fit:cover;">
          <span style="position:absolute; top:12px; left:12px; background:rgba(0,0,0,0.8); color:var(--gold-primary); padding:4px 10px; border-radius:99px; font-size:0.75rem; border:1px solid var(--gold-primary);">
            ${dish.badge}
          </span>
        </div>
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
            <h3 style="font-family:var(--font-serif); font-size:1.75rem; color:var(--text-primary);">${dish.name}</h3>
            <span style="font-size:1.75rem; font-family:var(--font-display); color:var(--gold-primary); font-weight:700;">$${dish.price}</span>
          </div>
          <p style="color:var(--text-gold); font-size:0.875rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;">
            ${dish.tag} • ${dish.calories}
          </p>
          <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:1.5rem;">
            ${dish.description}
          </p>
          <div style="margin-bottom:1.5rem;">
            <h5 style="font-size:0.8125rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--gold-light); margin-bottom:0.5rem;">Curated Ingredients</h5>
            <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
              ${dish.ingredients.map(ing => `<span style="background:rgba(255,255,255,0.06); padding:4px 10px; border-radius:var(--radius-sm); font-size:0.8125rem; color:var(--text-muted);">${ing}</span>`).join('')}
            </div>
          </div>
          <div style="padding:1rem; background:rgba(212,175,55,0.08); border-left:3px solid var(--gold-primary); border-radius:var(--radius-sm); margin-bottom:1.5rem;">
            <strong style="color:var(--gold-light); font-size:0.875rem; display:block; margin-bottom:0.25rem;">Sommelier's Wine Pairing</strong>
            <span style="font-size:0.875rem; color:var(--text-secondary);">${dish.pairing}</span>
          </div>
          <button id="modal-add-btn" class="btn btn-primary" style="width:100%;">
            Add to Tasting Experience ($${dish.price})
          </button>
        </div>
      </div>
    `;

    document.getElementById('modal-add-btn').addEventListener('click', () => {
      addToCart(dish.id);
      closeDishModal();
    });

    dishModal.classList.add('active');
  }

  function closeDishModal() {
    if (dishModal) dishModal.classList.remove('active');
  }

  if (dishModalClose) {
    dishModalClose.addEventListener('click', closeDishModal);
  }

  // --- Cart System ---
  function updateCartUI() {
    // Update badge count
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountBadges.forEach(badge => {
      badge.textContent = totalCount;
    });

    // Update item list
    if (cartItemsList) {
      if (state.cart.length === 0) {
        cartItemsList.innerHTML = `
          <div style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin:0 auto 1rem; opacity:0.5;"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <p>Your tasting selection is empty.</p>
            <p style="font-size:0.8125rem; margin-top:0.5rem;">Explore our culinary menu to curate your evening.</p>
          </div>
        `;
      } else {
        cartItemsList.innerHTML = state.cart.map(item => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div style="flex-grow:1;">
              <h5 style="font-size:0.9375rem; font-weight:600; color:var(--text-primary); margin-bottom:0.25rem;">${item.name}</h5>
              <span style="color:var(--gold-light); font-size:0.875rem; font-weight:600;">$${item.price} each</span>
            </div>
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <button class="cart-qty-btn" data-action="dec" data-id="${item.id}" style="width:26px; height:26px; border:1px solid var(--border-subtle); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--text-secondary);">-</button>
              <span style="font-size:0.875rem; font-weight:600; min-width:18px; text-align:center;">${item.quantity}</span>
              <button class="cart-qty-btn" data-action="inc" data-id="${item.id}" style="width:26px; height:26px; border:1px solid var(--border-subtle); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--text-secondary);">+</button>
            </div>
          </div>
        `).join('');

        // Attach quantity buttons
        document.querySelectorAll('.cart-qty-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            const action = e.currentTarget.getAttribute('data-action');
            if (action === 'inc') {
              addToCart(id);
            } else {
              removeFromCart(id);
            }
          });
        });
      }
    }

    // Calculations
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08875;
    const total = subtotal + tax;

    if (cartSubtotalEl) cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (cartTaxEl) cartTaxEl.textContent = `$${tax.toFixed(2)}`;
    if (cartTotalEl) cartTotalEl.textContent = `$${total.toFixed(2)}`;

    localStorage.setItem('res_cart', JSON.stringify(state.cart));
  }

  function addToCart(dishId) {
    const dish = MENU_ITEMS.find(d => d.id === dishId);
    if (!dish) return;

    const existing = state.cart.find(item => item.id === dishId);
    if (existing) {
      existing.quantity += 1;
    } else {
      state.cart.push({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        image: dish.image,
        quantity: 1
      });
    }

    updateCartUI();
    showToast(`Added ${dish.name} to tasting selection.`);
  }

  function removeFromCart(dishId) {
    const existingIndex = state.cart.findIndex(item => item.id === dishId);
    if (existingIndex > -1) {
      if (state.cart[existingIndex].quantity > 1) {
        state.cart[existingIndex].quantity -= 1;
      } else {
        state.cart.splice(existingIndex, 1);
      }
      updateCartUI();
    }
  }

  function openCart() {
    if (cartDrawer && drawerBackdrop) {
      cartDrawer.classList.add('open');
      drawerBackdrop.classList.add('active');
    }
  }

  function closeCart() {
    if (cartDrawer && drawerBackdrop) {
      cartDrawer.classList.remove('open');
      drawerBackdrop.classList.remove('active');
    }
  }

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', () => {
      closeCart();
      closeMobileMenu();
    });
  }

  // Pre-order checkout trigger
  const checkoutBtn = document.getElementById('checkout-order-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (state.cart.length === 0) {
        showToast('Your tasting bag is empty. Please select dishes first.');
        return;
      }
      closeCart();
      showToast(`✨ Tasting experience confirmed for table service! A sommelier will present your courses upon arrival.`);
      state.cart = [];
      updateCartUI();
    });
  }

  updateCartUI();

  // --- Brand Customizer Logic ---
  if (customizerOpenBtn) {
    customizerOpenBtn.addEventListener('click', () => {
      customizerModal.classList.add('active');
    });
  }

  if (customizerCloseBtn) {
    customizerCloseBtn.addEventListener('click', () => {
      customizerModal.classList.remove('active');
    });
  }

  if (saveBrandBtn) {
    saveBrandBtn.addEventListener('click', () => {
      const newName = brandNameInput.value.trim() || '[RESTAURANT NAME]';
      const newTagline = brandTaglineInput.value.trim() || 'Haute Cuisine & Epicurean Artistry';

      state.brandName = newName;
      state.brandTagline = newTagline;

      localStorage.setItem('res_brand_name', newName);
      localStorage.setItem('res_brand_tagline', newTagline);

      applyBrandIdentity();
      customizerModal.classList.remove('active');
      showToast(`Branding updated live to: "${newName}"`);
    });
  }

  if (resetBrandBtn) {
    resetBrandBtn.addEventListener('click', () => {
      state.brandName = '[RESTAURANT NAME]';
      state.brandTagline = 'Haute Cuisine & Epicurean Artistry';
      brandNameInput.value = '[RESTAURANT NAME]';
      brandTaglineInput.value = 'Haute Cuisine & Epicurean Artistry';
      localStorage.removeItem('res_brand_name');
      localStorage.removeItem('res_brand_tagline');
      applyBrandIdentity();
      showToast('Brand name reset to placeholder "[RESTAURANT NAME]"');
    });
  }

  presetButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const presetName = e.currentTarget.getAttribute('data-name');
      const presetTag = e.currentTarget.getAttribute('data-tagline');
      brandNameInput.value = presetName;
      brandTaglineInput.value = presetTag;
    });
  });

  // --- Reservation Interaction ---
  timePills.forEach(pill => {
    pill.addEventListener('click', () => {
      timePills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      state.selectedTime = pill.getAttribute('data-time');
    });
  });

  guestPills.forEach(pill => {
    pill.addEventListener('click', () => {
      guestPills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      state.selectedGuests = pill.getAttribute('data-guests');
    });
  });

  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const guestName = document.getElementById('res-name').value;
      const guestEmail = document.getElementById('res-email').value;
      const guestPhone = document.getElementById('res-phone').value;
      const seatingArea = document.getElementById('res-seating').value;
      const occasion = document.getElementById('res-occasion').value;
      const date = resDateInput.value;

      const bookingRef = 'RES-' + Math.floor(100000 + Math.random() * 900000);

      if (confirmationDetails && confirmationModal) {
        confirmationDetails.innerHTML = `
          <div style="background:rgba(212,175,55,0.08); border:1px solid var(--border-gold); border-radius:var(--radius-md); padding:1.5rem; margin-bottom:1.5rem; text-align:left;">
            <div style="display:flex; justify-content:space-between; margin-bottom:1rem; border-bottom:1px solid var(--border-subtle); padding-bottom:0.75rem;">
              <span style="color:var(--text-muted); font-size:0.875rem;">Booking Reference</span>
              <strong style="color:var(--gold-primary); font-family:var(--font-display); letter-spacing:0.1em;">${bookingRef}</strong>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; font-size:0.875rem;">
              <div><span style="color:var(--text-muted);">Guest:</span> <strong>${guestName}</strong></div>
              <div><span style="color:var(--text-muted);">Party Size:</span> <strong>${state.selectedGuests} Guests</strong></div>
              <div><span style="color:var(--text-muted);">Date:</span> <strong>${date}</strong></div>
              <div><span style="color:var(--text-muted);">Time Slot:</span> <strong>${state.selectedTime}</strong></div>
              <div><span style="color:var(--text-muted);">Seating:</span> <strong>${seatingArea}</strong></div>
              <div><span style="color:var(--text-muted);">Occasion:</span> <strong>${occasion}</strong></div>
            </div>
          </div>
          <p style="font-size:0.875rem; color:var(--text-secondary); line-height:1.6; margin-bottom:1.5rem;">
            A concierge confirmation with dress code details has been dispatched to <strong>${guestEmail}</strong> and SMS alerts to <strong>${guestPhone}</strong>.
          </p>
        `;
        confirmationModal.classList.add('active');
        showToast(`Table confirmed at ${state.brandName}! Ref: ${bookingRef}`);
      }
    });
  }

  if (confirmationClose) {
    confirmationClose.addEventListener('click', () => {
      if (confirmationModal) confirmationModal.classList.remove('active');
    });
  }

  // --- Gallery Lightbox ---
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-caption');
      if (img && lightboxModal && lightboxImg) {
        lightboxImg.src = img.src;
        if (lightboxCaption && caption) {
          lightboxCaption.textContent = caption.textContent;
        }
        lightboxModal.classList.add('active');
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      if (lightboxModal) lightboxModal.classList.remove('active');
    });
  }

  // --- Vercel Assistant Modal ---
  vercelOpenBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (vercelModal) vercelModal.classList.add('active');
    });
  });

  if (vercelCloseBtn) {
    vercelCloseBtn.addEventListener('click', () => {
      if (vercelModal) vercelModal.classList.remove('active');
    });
  }

  // Copy code buttons
  document.querySelectorAll('.copy-cmd-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const code = e.currentTarget.getAttribute('data-code');
      navigator.clipboard.writeText(code).then(() => {
        showToast('Command copied to clipboard!');
      });
    });
  });

  // --- Mobile Menu Toggle ---
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav-drawer');
  const mobileClose = document.getElementById('mobile-nav-close');

  function openMobileMenu() {
    if (mobileNav && drawerBackdrop) {
      mobileNav.classList.add('open');
      drawerBackdrop.classList.add('active');
    }
  }

  function closeMobileMenu() {
    if (mobileNav && drawerBackdrop) {
      mobileNav.classList.remove('open');
      drawerBackdrop.classList.remove('active');
    }
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // --- Newsletter Form Toast ---
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      if (emailInput && emailInput.value) {
        showToast(`✨ Thank you! VIP culinary invitations will be sent to ${emailInput.value}`);
        emailInput.value = '';
      }
    });
  }

  // --- Toast Function ---
  function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // Close modals when clicking backdrop outside
  window.addEventListener('click', (e) => {
    if (e.target === customizerModal) customizerModal.classList.remove('active');
    if (e.target === dishModal) dishModal.classList.remove('active');
    if (e.target === confirmationModal) confirmationModal.classList.remove('active');
    if (e.target === vercelModal) vercelModal.classList.remove('active');
    if (e.target === lightboxModal) lightboxModal.classList.remove('active');
  });
});
