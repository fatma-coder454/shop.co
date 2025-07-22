
  const productCards = document.querySelectorAll('.you-might-like .product-card');

  productCards.forEach(card => {
    card.addEventListener('click', () => {
      const image = card.querySelector('img').getAttribute('src');
      const title = card.querySelector('.product-name').innerText;
      const price = card.querySelector('.current-price').innerText;
      const oldPriceElement = card.querySelector('.old-price');
      const ratingStars = card.querySelector('.stars').innerText;
      const ratingCount = card.querySelector('.rating-count')?.innerText || "";

      // تحديث الصورة الرئيسية
      document.getElementById('mainImage').src = image;

      // تحديث الاسم
      document.getElementById('productTitle').innerText = title;

      // تحديث السعر الحالي
      document.getElementById('productPrice').innerText = price;

      // تحديث السعر القديم (لو موجود)
      if (oldPriceElement) {
        document.getElementById('oldPrice').innerText = oldPriceElement.innerText;
        // حساب الخصم
        const oldPrice = parseFloat(oldPriceElement.innerText.replace('$', ''));
        const currentPrice = parseFloat(price.replace('$', ''));
        const discount = Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
        document.getElementById('discount').innerText = `-${discount}%`;
        document.getElementById('oldPrice').style.display = 'inline';
        document.getElementById('discount').style.display = 'inline';
      } else {
        // إخفاء السعر القديم والخصم لو مش موجودين
        document.getElementById('oldPrice').style.display = 'none';
        document.getElementById('discount').style.display = 'none';
      }

      // تحديث التقييم (استبدال النجوم والنص)
      const ratingDiv = document.querySelector('#product-details .rating');
      ratingDiv.innerHTML = `${ratingStars} <span>(${ratingCount})</span>`;

      // تحديث الوصف الافتراضي (اختياري)
      document.getElementById('productDescription').innerText = `Description of ${title}`;
      
      // سكرول للسكشن
      document.getElementById('product-details').scrollIntoView({ behavior: "smooth" });
    });
  });









  // Cart functionality
class ShoppingCart {
    constructor() {
        this.items = [
            { id: 1, name: 'Gradient Graphic T-shirt', price: 145, quantity: 1 },
            { id: 2, name: 'Checkered Shirt', price: 180, quantity: 1 },
            { id: 3, name: 'Skinny Fit Jeans', price: 240, quantity: 1 }
        ];
        this.discountRate = 0.20;
        this.deliveryFee = 15;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateSummary();
    }
    
    bindEvents() {
        // Quantity controls
        document.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cartItem = e.target.closest('.cart-item');
                const itemId = parseInt(cartItem.dataset.id);
                const isPlus = e.target.classList.contains('plus');
                
                this.updateQuantity(itemId, isPlus ? 1 : -1);
            });
        });
        
        // Remove buttons
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cartItem = e.target.closest('.cart-item');
                const itemId = parseInt(cartItem.dataset.id);
                
                this.removeItem(itemId);
            });
        });
        
        // Promo code
        document.querySelector('.apply-btn').addEventListener('click', () => {
            this.applyPromoCode();
        });
        
        // Newsletter subscription
        document.querySelector('.subscribe-btn').addEventListener('click', () => {
            this.subscribeNewsletter();
        });
        
        // Close promo banner
        document.querySelector('.close-banner').addEventListener('click', () => {
            document.querySelector('.promo-banner').style.display = 'none';
        });
        
        // Checkout button
        document.querySelector('.checkout-btn').addEventListener('click', () => {
            this.checkout();
        });
    }
    
    updateQuantity(itemId, change) {
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            item.quantity = Math.max(1, item.quantity + change);
            
            // Update UI
            const cartItem = document.querySelector(`[data-id="${itemId}"]`);
            const quantitySpan = cartItem.querySelector('.quantity');
            quantitySpan.textContent = item.quantity;
            
            this.updateSummary();
        }
    }
    
    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        
        // Remove from UI
        const cartItem = document.querySelector(`[data-id="${itemId}"]`);
        cartItem.remove();
        
        this.updateSummary();
        
        // Show empty cart message if no items
        if (this.items.length === 0) {
            document.querySelector('.cart-items').innerHTML = 
                '<div class="empty-cart"><h3>Your cart is empty</h3><p>Add some items to get started!</p></div>';
        }
    }
    
    updateSummary() {
        const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discount = subtotal * this.discountRate;
        const total = subtotal - discount + this.deliveryFee;
        
        // Update UI
        document.querySelector('.subtotal').textContent = `$${subtotal}`;
        document.querySelector('.discount-amount').textContent = `-$${Math.round(discount)}`;
        document.querySelector('.total-amount').textContent = `$${Math.round(total)}`;
    }
    
    applyPromoCode() {
        const promoInput = document.querySelector('.promo-input');
        const code = promoInput.value.trim().toLowerCase();
        
        if (code === 'save20' || code === 'discount20') {
            this.discountRate = 0.20;
            this.showNotification('Promo code applied successfully!', 'success');
        } else if (code === 'save10') {
            this.discountRate = 0.10;
            this.showNotification('Promo code applied successfully!', 'success');
        } else if (code) {
            this.showNotification('Invalid promo code', 'error');
        }
        
        promoInput.value = '';
        this.updateSummary();
    }
    
    subscribeNewsletter() {
        const emailInput = document.querySelector('.email-input');
        const email = emailInput.value.trim();
        
        if (this.isValidEmail(email)) {
            this.showNotification('Successfully subscribed to newsletter!', 'success');
            emailInput.value = '';
        } else {
            this.showNotification('Please enter a valid email address', 'error');
        }
    }
    
    checkout() {
        if (this.items.length === 0) {
            this.showNotification('Your cart is empty', 'error');
            return;
        }
        
        this.showNotification('Redirecting to checkout...', 'success');
        
        // Simulate checkout process
        setTimeout(() => {
            alert('Checkout functionality would be implemented here!');
        }, 1000);
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            backgroundColor: type === 'success' ? '#4CAF50' : '#f44336',
            zIndex: '1000',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Search functionality
class SearchHandler {
    constructor() {
        this.init();
    }
    
    init() {
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        searchBtn.addEventListener('click', () => {
            this.performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch(searchInput.value);
            }
        });
    }
    
    performSearch(query) {
        if (query.trim()) {
            console.log('Searching for:', query);
            // In a real application, this would trigger a search API call
            alert(`Searching for: "${query}"`);
        }
    }
}

// Mobile menu handler
class MobileMenuHandler {
    constructor() {
        this.init();
    }
    
    init() {
        // Add mobile menu toggle if needed
        this.handleResponsiveNavigation();
    }
    
    handleResponsiveNavigation() {
        // Handle responsive navigation behavior
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                // Mobile view adjustments
                this.adjustForMobile();
            } else {
                // Desktop view adjustments
                this.adjustForDesktop();
            }
        });
    }
    
    adjustForMobile() {
        // Mobile-specific adjustments
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.style.display = 'none'; // Hide on mobile by default
        }
    }
    
    adjustForDesktop() {
        // Desktop-specific adjustments
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.style.display = 'flex'; // Show on desktop
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ShoppingCart();
    new SearchHandler();
    new MobileMenuHandler();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});