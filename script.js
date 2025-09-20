// Contact function
function contactUs(productName) {
    const phone1 = "010070490";
    const phone2 = "01111349853";
    const message = `مرحبا، أريد شراء ${productName} من Future Dream`;

    // Try to open WhatsApp first
    const whatsappUrl = `https://wa.me/${phone2}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Also show phone numbers as fallback
    alert(`يمكنك الاتصال بنا:\n📞 ${phone1}\n📱 ${phone2}\n\nأو مراسلتنا على واتساب`);
}

// DOM Elements
const addProductForm = document.getElementById('add-product-form');
const productsList = document.getElementById('products-list');

// Load products from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
});

// Add product form submission
addProductForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    const productDescription = document.getElementById('product-description').value;
    const productImage = document.getElementById('product-image').files[0];

    // Create product object
    const product = {
        id: Date.now(),
        name: productName,
        price: productPrice,
        description: productDescription,
        image: productImage ? URL.createObjectURL(productImage) : 'https://via.placeholder.com/300x200?text=No+Image'
    };

    // Save to localStorage
    saveProduct(product);

    // Add to UI
    addProductToUI(product);

    // Reset form
    addProductForm.reset();

    // Show success message
    showNotification('تم إضافة المنتج بنجاح!', 'success');
});

// Save product to localStorage
function saveProduct(product) {
    const products = getProducts();
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
}

// Get products from localStorage
function getProducts() {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}

// Load products and display them
function loadProducts() {
    const products = getProducts();
    products.forEach(product => {
        addProductToUI(product);
    });
}

// Add product to UI
function addProductToUI(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">${product.price} جنيه</div>
            <p class="product-description">${product.description}</p>
            <button onclick="contactUs('${product.name}')" class="buy-btn">اطلب الآن</button>
        </div>
    `;

    productsList.appendChild(productCard);
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
