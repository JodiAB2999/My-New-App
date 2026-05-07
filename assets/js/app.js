// Grocery Items Database
const groceryItems = [
    // Produce
    { id: 1, name: 'Apples', category: 'Produce', price: 2.99, emoji: '🍎' },
    { id: 2, name: 'Bananas', category: 'Produce', price: 1.99, emoji: '🍌' },
    { id: 3, name: 'Carrots', category: 'Produce', price: 1.49, emoji: '🥕' },
    { id: 4, name: 'Lettuce', category: 'Produce', price: 2.49, emoji: '🥬' },
    { id: 5, name: 'Tomatoes', category: 'Produce', price: 3.49, emoji: '🍅' },

    // Dairy
    { id: 6, name: 'Milk', category: 'Dairy', price: 3.99, emoji: '🥛' },
    { id: 7, name: 'Cheese', category: 'Dairy', price: 4.99, emoji: '🧀' },
    { id: 8, name: 'Yogurt', category: 'Dairy', price: 2.99, emoji: '🥛' },
    { id: 9, name: 'Butter', category: 'Dairy', price: 5.99, emoji: '🧈' },

    // Meat
    { id: 10, name: 'Chicken Breast', category: 'Meat', price: 7.99, emoji: '🍗' },
    { id: 11, name: 'Ground Beef', category: 'Meat', price: 6.99, emoji: '🥩' },
    { id: 12, name: 'Salmon', category: 'Meat', price: 9.99, emoji: '🐟' },

    // Bakery
    { id: 13, name: 'Bread', category: 'Bakery', price: 2.49, emoji: '🍞' },
    { id: 14, name: 'Croissants', category: 'Bakery', price: 3.99, emoji: '🥐' },
    { id: 15, name: 'Cookies', category: 'Bakery', price: 4.49, emoji: '🍪' },

    // Pantry
    { id: 16, name: 'Pasta', category: 'Pantry', price: 1.49, emoji: '🍝' },
    { id: 17, name: 'Rice', category: 'Pantry', price: 2.99, emoji: '🍚' },
    { id: 18, name: 'Olive Oil', category: 'Pantry', price: 6.99, emoji: '🍯' },
];

// State Management
let cart = [];
const TAX_RATE = 0.08;

// DOM Elements
const itemsContainer = document.getElementById('itemsContainer');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const checkoutModal = document.getElementById('checkoutModal');
const closeCartBtn = document.getElementById('closeCartBtn');
const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartCount = document.getElementById('cartCount');
const continueShopping = document.getElementById('continueShopping');
const checkoutBtn = document.getElementById('checkoutBtn');
const backToShopping = document.getElementById('backToShoppingBtn');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    renderItems(groceryItems);
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    closeCheckoutBtn.addEventListener('click', closeCheckout);
    continueShopping.addEventListener('click', closeCart);
    checkoutBtn.addEventListener('click', openCheckout);
    backToShopping.addEventListener('click', () => {
        closeCheckout();
        closeCart();
        clearCart();
    });
    searchInput.addEventListener('input', filterItems);
    categoryFilter.addEventListener('change', filterItems);
}

// Render Items
function renderItems(items) {
    itemsContainer.innerHTML = items.map(item => `
        <div class="item-card">
            <div class="item-image">${item.emoji}</div>
            <div class="item-content">
                <div class="item-category">${item.category}</div>
                <div class="item-name">${item.name}</div>
                <div class="item-price">$${item.price.toFixed(2)}</div>
                <div class="item-actions">
                    <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter Items
function filterItems() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filtered = groceryItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    renderItems(filtered);
}

// Add to Cart
function addToCart(itemId) {
    const item = groceryItems.find(i => i.id === itemId);
    const cartItem = cart.find(i => i.id === itemId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    saveCart();
    updateCartCount();
}

// Remove from Cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    renderCart();
    updateCartCount();
}

// Update Quantity
function updateQuantity(itemId, change) {
    const cartItem = cart.find(item => item.id === itemId);
    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            saveCart();
            renderCart();
        }
    }
}

// Render Cart
function renderCart() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Your cart is empty</p>
            </div>
        `;
        document.getElementById('cartSummary').style.display = 'none';
        checkoutBtn.disabled = true;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.emoji} ${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join('');

        updateCartSummary();
        document.getElementById('cartSummary').style.display = 'block';
        checkoutBtn.disabled = false;
    }
}

// Update Cart Summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Update Cart Count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}

// Open/Close Cart Modal
function openCart() {
    renderCart();
    cartModal.classList.add('show');
}

function closeCart() {
    cartModal.classList.remove('show');
}

// Open/Close Checkout Modal
function openCheckout() {
    if (cart.length === 0) return;
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    const orderSummaryHTML = cart.map(item => `
        <div class="order-summary-item">
            <span>${item.emoji} ${item.name} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');

    document.getElementById('orderSummary').innerHTML = `
        ${orderSummaryHTML}
        <div class="order-summary-item" style="margin-top: 10px; border-top: 1px solid #ecf0f1; padding-top: 10px;">
            <span>Subtotal:</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="order-summary-item">
            <span>Tax (8%):</span>
            <span>$${tax.toFixed(2)}</span>
        </div>
        <div class="order-summary-total">
            <div style="display: flex; justify-content: space-between;">
                <span>Total:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
        </div>
    `;

    cartModal.classList.remove('show');
    checkoutModal.classList.add('show');
}

function closeCheckout() {
    checkoutModal.classList.remove('show');
}

// Clear Cart
function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
}

// Local Storage
function saveCart() {
    localStorage.setItem('groceryCart', JSON.stringify(cart));
}

function loadCart() {
    const saved = localStorage.getItem('groceryCart');
    if (saved) {
        cart = JSON.parse(saved);
        updateCartCount();
    }
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        closeCart();
    }
    if (e.target === checkoutModal) {
        closeCheckout();
    }
});
