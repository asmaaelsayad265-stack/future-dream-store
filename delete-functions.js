// Delete Static Product Function
function deleteStaticProduct(button, productName) {
    if (confirm(`هل أنت متأكد من حذف ${productName}؟`)) {
        const productCard = button.closest('.product-card');
        if (productCard) {
            // Add fade out animation
            productCard.style.transition = 'all 0.3s ease';
            productCard.style.opacity = '0';
            productCard.style.transform = 'scale(0.9)';

            setTimeout(() => {
                productCard.remove();
                showNotification(`تم حذف ${productName} بنجاح!`, 'success');
            }, 300);
        }
    }
}

// Get products from localStorage (for delete functionality)
function getProducts() {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}

// Delete Dynamic Product Function
function deleteDynamicProduct(productId, productName) {
    if (confirm(`هل أنت متأكد من حذف ${productName}؟`)) {
        // Remove from localStorage
        const products = getProducts();
        const updatedProducts = products.filter(product => product.id != productId);
        localStorage.setItem('products', JSON.stringify(updatedProducts));

        // Remove from UI
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const deleteBtn = card.querySelector('.delete-btn');
            if (deleteBtn && deleteBtn.onclick && deleteBtn.onclick.toString().includes(productId)) {
                // Add fade out animation
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';

                setTimeout(() => {
                    card.remove();
                    showNotification(`تم حذف ${productName} بنجاح!`, 'success');
                }, 300);
            }
        });
    }
}

// Delete Static Product Function
function deleteProduct(productId) {
    const productNames = {
        'samsung-a16': 'Samsung Galaxy A16',
        'huawei-y7': 'Huawei Y7 2019',
        'vivo-y04': 'Vivo Y04',
        'oppo-a18': 'OPPO A18',
        'oppo-a18-2': 'OPPO A18 (نسخة ثانية)',
        'honor-8c': 'Honor 8c',
        'vivo-y15': 'Vivo Y15',
        'unknown-phone': 'هاتف غير محدد',
        'oppo-a38': 'Oppo A38',
        'samsung-a03-core': 'Samsung A03 Core',
        'samsung-a03-core-2': 'Samsung A03 Core (نسخة ثانية)',
        'redmi-9a': 'Redmi 9A',
        'huawei-y7-2019': 'هاتف Y7 2019',
        'honor-x5b-plus': 'Honor X5b Plus',
        'samsung-a34-5g': 'Samsung Galaxy A34 5G',
        'samsung-a05s': 'Samsung Galaxy A05s',
        'samsung-a03s': 'Samsung Galaxy A03s',
        'samsung-j4': 'Samsung Galaxy J4',
        'iphone-7': 'iPhone 7',
        // أكسسوارات
        'samsung-charger': 'شاحن سامسونج أصلي',
        'clear-case': 'كفر حماية شفاف',
        'bluetooth-headphones': 'سماعات بلوتوث',
        'power-bank': 'بطارية متنقلة',
        'car-holder': 'حامل سيارة',
        'multi-cable': 'كابل شحن متعدد',
        'screen-protector': 'شاشة حماية زجاجية',
        'earphones': 'سماعة أذن سلكية'
    };

    const productName = productNames[productId] || 'المنتج';

    if (confirm(`هل أنت متأكد من حذف ${productName}؟`)) {
        // Find the product card
        const productCards = document.querySelectorAll('.product-card');
        let productCard = null;

        for (let card of productCards) {
            const deleteBtn = card.querySelector('.delete-btn');
            if (deleteBtn && deleteBtn.onclick && deleteBtn.onclick.toString().includes(productId)) {
                productCard = card;
                break;
            }
        }

        if (productCard) {
            // Add fade out animation
            productCard.style.transition = 'all 0.3s ease';
            productCard.style.opacity = '0';
            productCard.style.transform = 'scale(0.9)';

            setTimeout(() => {
                productCard.remove();
                showNotification(`تم حذف ${productName} بنجاح!`, 'success');
            }, 300);
        }
    }
}

// Show notification function (if not already defined)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
