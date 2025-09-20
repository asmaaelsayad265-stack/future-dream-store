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
