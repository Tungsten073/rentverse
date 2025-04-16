// Initialize cart from localStorage or create a new one
let cart = JSON.parse(localStorage.getItem('rentverseCart')) || [];

// DOM Elements
const cartItemsContainer = document.getElementById('cart-items');
const cartEmptyMessage = document.getElementById('cart-empty-message');
const cartItemsSection = document.getElementById('cart-items-container');
const cartCount = document.getElementById('cart-count');
const subtotalAmount = document.getElementById('subtotal-amount');
const shippingAmount = document.getElementById('shipping-amount');
const taxAmount = document.getElementById('tax-amount');
const totalAmount = document.getElementById('total-amount');
const proceedCheckoutBtn = document.getElementById('proceed-checkout-btn');
const checkoutSection = document.getElementById('checkout-section');
const cartSection = document.querySelector('.cart-section');
const backToCartBtn = document.getElementById('back-to-cart-btn');
const placeOrderBtn = document.getElementById('place-order-btn');
const checkoutItemsContainer = document.getElementById('checkout-items');
const checkoutTotalAmount = document.getElementById('checkout-total-amount');
const orderConfirmation = document.getElementById('order-confirmation');
const orderId = document.getElementById('order-id');
const deliveryDate = document.getElementById('delivery-date');

// Initialize the cart page
function initCartPage() {
  updateCartCount();
  
  // Show/hide cart empty message or cart items
  if (cart.length === 0) {
    cartEmptyMessage.classList.remove('hidden');
    cartItemsSection.classList.add('hidden');
  } else {
    cartEmptyMessage.classList.add('hidden');
    cartItemsSection.classList.remove('hidden');
    renderCartItems();
    calculateCartTotals();
  }
  
  // Event listeners
  if (proceedCheckoutBtn) {
    proceedCheckoutBtn.addEventListener('click', proceedToCheckout);
  }
  
  if (backToCartBtn) {
    backToCartBtn.addEventListener('click', backToCart);
  }
  
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', placeOrder);
  }
  
  // Setup event delegation for quantity changes and removals
  if (cartItemsContainer) {
    cartItemsContainer.addEventListener('click', handleCartItemActions);
    cartItemsContainer.addEventListener('change', handleDurationChange);
  }
}

// Update cart count in navbar
function updateCartCount() {
  const cartCountElements = document.querySelectorAll('#cart-count');
  cartCountElements.forEach(element => {
    if (element) {
      element.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
  });
}

// Render cart items
function renderCartItems() {
  if (!cartItemsContainer) return;
  
  cartItemsContainer.innerHTML = '';
  
  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.dataset.index = index;
    
    // Determine the available duration options based on the item category
    let durationOptions = '';
    switch(item.category) {
      case 'furniture':
      case 'electronics':
        durationOptions = `        
          <option value="month" ${item.durationType === 'month' ? 'selected' : ''}>Month</option>
          <option value="3months" ${item.durationType === '3months' ? 'selected' : ''}>3 Months</option>
          <option value="6months" ${item.durationType === '6months' ? 'selected' : ''}>6 Months</option>
          <option value="year" ${item.durationType === 'year' ? 'selected' : ''}>Year</option>
        `;
        break;
      case 'clothes':
        durationOptions = `        
          <option value="event" ${item.durationType === 'event' ? 'selected' : ''}>Event (3 days)</option>
          <option value="week" ${item.durationType === 'week' ? 'selected' : ''}>Week</option>
        `;
        break;
      case 'books':
        durationOptions = `        
          <option value="month" ${item.durationType === 'month' ? 'selected' : ''}>Month</option>
          <option value="semester" ${item.durationType === 'semester' ? 'selected' : ''}>Semester (4 months)</option>
        `;
        break;
      case 'antiques':
        durationOptions = `        
          <option value="week" ${item.durationType === 'week' ? 'selected' : ''}>Week</option>
          <option value="month" ${item.durationType === 'month' ? 'selected' : ''}>Month</option>
        `;
        break;
      default:
        durationOptions = `        
          <option value="month" ${item.durationType === 'month' ? 'selected' : ''}>Month</option>
        `;
    }
    
    // Calculate item total based on quantity, price, and duration
    const itemTotal = calculateItemTotal(item);
    
    cartItem.innerHTML = `
      <div class="cart-item-details" data-label="Item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div>
          <h4 class="cart-item-name">${item.name}</h4>
          <p class="cart-item-category">${item.category}</p>
        </div>
      </div>
      <div class="cart-item-price" data-label="Price">₹${item.price}</div>
      <div class="cart-item-quantity" data-label="Quantity">
        <div class="quantity-control">
          <button class="quantity-btn decrease-btn" data-index="${index}">-</button>
          <input type="number" class="quantity-input" data-index="${index}" value="${item.quantity}" min="1">
          <button class="quantity-btn increase-btn" data-index="${index}">+</button>
        </div>
      </div>
      <div class="cart-item-duration" data-label="Duration">
        <select class="duration-select" data-index="${index}">
          ${durationOptions}
        </select>
      </div>
      <div class="cart-item-total" data-label="Total">₹${itemTotal}</div>
      <div class="cart-item-action">
        <button class="remove-item-btn" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
      </div>
    `;
    
    cartItemsContainer.appendChild(cartItem);
  });
  
  // Also update checkout items if we're on the checkout page
  if (checkoutItemsContainer) {
    renderCheckoutItems();
  }
}

// Render items in the checkout summary
function renderCheckoutItems() {
  checkoutItemsContainer.innerHTML = '';
  
  cart.forEach(item => {
    const durationLabel = getDurationLabel(item.durationType);
    const checkoutItem = document.createElement('div');
    checkoutItem.classList.add('checkout-item');
    checkoutItem.innerHTML = `
      <div>
        <div class="checkout-item-name">${item.name} × ${item.quantity}</div>
        <div class="checkout-item-details">${durationLabel} at ₹${item.price}/month</div>
      </div>
      <div>₹${calculateItemTotal(item)}</div>
    `;
    checkoutItemsContainer.appendChild(checkoutItem);
  });
  
  // Update checkout total
  const total = cart.reduce((total, item) => total + parseFloat(calculateItemTotal(item)), 0);
  const shipping = 50;
  const tax = (total * 0.18);
  const finalTotal = (total + shipping + tax).toFixed(2);
  checkoutTotalAmount.textContent = `₹${finalTotal}`;
}

// Get human-readable duration label
function getDurationLabel(durationType) {
  switch(durationType) {
    case '3months': return '3 Months';
    case '6months': return '6 Months';
    case 'year': return '1 Year';
    case 'event': return 'Event (3 days)';
    case 'week': return '1 Week';
    case 'semester': return 'Semester (4 months)';
    default: return '1 Month';
  }
}

// Handle changing the rental duration
function handleDurationChange(event) {
  if (event.target.classList.contains('duration-select')) {
    const index = parseInt(event.target.dataset.index);
    cart[index].durationType = event.target.value;
    localStorage.setItem('rentverseCart', JSON.stringify(cart));
    renderCartItems();
    calculateCartTotals();
  }
}

// Handle cart item actions like quantity change or removal
function handleCartItemActions(event) {
  const target = event.target;
  
  // Handle quantity input change
  if (target.classList.contains('quantity-input')) {
    const index = parseInt(target.dataset.index);
    const quantity = parseInt(target.value);
    if (quantity > 0) {
      cart[index].quantity = quantity;
      localStorage.setItem('rentverseCart', JSON.stringify(cart));
      renderCartItems();
      calculateCartTotals();
      updateCartCount();
    }
  } 
  // Handle decrease button
  else if (target.classList.contains('decrease-btn')) {
    const index = parseInt(target.dataset.index);
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
      localStorage.setItem('rentverseCart', JSON.stringify(cart));
      renderCartItems();
      calculateCartTotals();
      updateCartCount();
    }
  } 
  // Handle increase button
  else if (target.classList.contains('increase-btn')) {
    const index = parseInt(target.dataset.index);
    cart[index].quantity++;
    localStorage.setItem('rentverseCart', JSON.stringify(cart));
    renderCartItems();
    calculateCartTotals();
    updateCartCount();
  } 
  // Handle remove button
  else if (target.classList.contains('remove-item-btn') || target.closest('.remove-item-btn')) {
    const button = target.classList.contains('remove-item-btn') ? target : target.closest('.remove-item-btn');
    const index = parseInt(button.dataset.index);
    cart.splice(index, 1);
    localStorage.setItem('rentverseCart', JSON.stringify(cart));
    
    // If cart is empty after removal, show empty message
    if (cart.length === 0) {
      cartEmptyMessage.classList.remove('hidden');
      cartItemsSection.classList.add('hidden');
    } else {
      renderCartItems();
      calculateCartTotals();
    }
    
    updateCartCount();
  }
}

// Calculate item total
function calculateItemTotal(item) {
  const durationMultiplier = getDurationMultiplier(item.durationType);
  return (parseFloat(item.price) * item.quantity * durationMultiplier).toFixed(2);
}

// Get multiplier based on duration
function getDurationMultiplier(durationType) {
  switch(durationType) {
    case '3months': return 3;
    case '6months': return 6;
    case 'year': return 12;
    case 'event': return 3 / 30; // 3 days
    case 'week': return 1 / 4; // 1 week
    case 'semester': return 4;
    default: return 1; // month
  }
}

// Calculate and update the total, tax, shipping, etc.
function calculateCartTotals() {
  const subtotal = cart.reduce((total, item) => total + parseFloat(calculateItemTotal(item)), 0);
  const shipping = 50; // Fixed shipping cost
  const tax = (subtotal * 0.18).toFixed(2); // 18% tax
  const total = (parseFloat(subtotal) + parseFloat(shipping) + parseFloat(tax)).toFixed(2);

  if (subtotalAmount) subtotalAmount.textContent = `₹${subtotal.toFixed(2)}`;
  if (shippingAmount) shippingAmount.textContent = `₹${shipping.toFixed(2)}`;
  if (taxAmount) taxAmount.textContent = `₹${tax}`;
  if (totalAmount) totalAmount.textContent = `₹${total}`;
  
  // Also update checkout total if we're on the checkout page
  if (checkoutTotalAmount) {
    checkoutTotalAmount.textContent = `₹${total}`;
  }
}

function proceedToCheckout() {
  if (!checkoutSection || !cartSection) return;
  
  checkoutSection.classList.remove('hidden');
  cartSection.classList.add('hidden');
  renderCheckoutItems();
  
  // Scroll to top of checkout section
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function backToCart() {
  if (!checkoutSection || !cartSection) return;
  
  checkoutSection.classList.add('hidden');
  cartSection.classList.remove('hidden');
  
  // Scroll to top of cart section
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function placeOrder() {
  const form = document.getElementById('address-form');
  
  // Basic form validation
  if (form && !form.checkValidity()) {
    form.reportValidity();
    return;
  }
  
  // Hide checkout section
  if (checkoutSection) {
    checkoutSection.classList.add('hidden');
  }
  
  // Show order confirmation
  if (orderConfirmation) {
    orderConfirmation.classList.remove('hidden');
    
    // Generate random order ID
    const orderIdValue = 'RV' + new Date().getFullYear() + 
                       String(new Date().getMonth() + 1).padStart(2, '0') + 
                       String(new Date().getDate()).padStart(2, '0') + 
                       String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    
    orderId.textContent = orderIdValue;
    
    // Set delivery date to 3-5 days from now
    const today = new Date();
    const deliveryDateValue = new Date(today);
    deliveryDateValue.setDate(today.getDate() + 5);
    deliveryDate.textContent = `Within 3-5 working days (est. by ${deliveryDateValue.toLocaleDateString()})`;
  }
  
  // Clear the cart
  cart = [];
  localStorage.removeItem('rentverseCart');
  updateCartCount();
  
  // Set timeout to redirect to home page after 5 seconds
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 5000);
}

// Add item to cart function - can be called from any page
function addToCart(name, price, category, image, quantity = 1) {
  // Default duration type based on category
  let durationType = 'month';
  if (category === 'clothes') durationType = 'event';
  if (category === 'books') durationType = 'month';
  
  // Check if item already exists in cart
  const existingItemIndex = cart.findIndex(item => item.name === name);
  
  if (existingItemIndex >= 0) {
    // Item exists, increase quantity
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.push({
      name,
      price,
      category,
      image,
      quantity,
      durationType
    });
  }
  
  // Save to localStorage
  localStorage.setItem('rentverseCart', JSON.stringify(cart));
  
  // Update cart count
  updateCartCount();
  
  // Show success message
  showAddedToCartMessage(name);
}

// Show a temporary message when item is added to cart
function showAddedToCartMessage(itemName) {
  // Create a message element
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('added-to-cart-message');
  messageDiv.innerHTML = `
    <i class="fas fa-check-circle"></i>
    ${itemName} added to cart!
    <a href="cart.html">View Cart</a>
  `;
  
  // Style the message
  messageDiv.style.position = 'fixed';
  messageDiv.style.top = '20px';
  messageDiv.style.right = '20px';
  messageDiv.style.backgroundColor = '#4CAF50';
  messageDiv.style.color = 'white';
  messageDiv.style.padding = '10px 20px';
  messageDiv.style.borderRadius = '4px';
  messageDiv.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  messageDiv.style.zIndex = '1000';
  messageDiv.style.transition = 'opacity 0.5s';
  
  // Add to document
  document.body.appendChild(messageDiv);
  
  // Remove after 3 seconds
  setTimeout(() => {
    messageDiv.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(messageDiv);
    }, 500);
  }, 3000);
}

// Initialize cart functionality if we're on the cart page
if (window.location.pathname.includes('cart.html')) {
  document.addEventListener('DOMContentLoaded', initCartPage);
} else {
  // Otherwise just update the cart count for the nav bar
  document.addEventListener('DOMContentLoaded', updateCartCount);
}

// Setup listeners for "Add to Cart" buttons if we're on a product page
document.addEventListener('DOMContentLoaded', function() {
  const rentButtons = document.querySelectorAll('.rent-button');
  
  rentButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productCard = this.closest('.product-card');
      if (!productCard) return;
      
      const name = productCard.dataset.name;
      const price = parseFloat(productCard.dataset.price);
      const category = productCard.dataset.category;
      const image = productCard.querySelector('.product-img').src;
      
      addToCart(name, price, category, image);
    });
  });
});