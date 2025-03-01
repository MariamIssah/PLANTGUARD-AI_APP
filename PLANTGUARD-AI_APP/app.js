// Sample data for dealers and market items
let dealers = [];
let marketItems = [];
let cart = [];

// Initialize the marketplace
function initializeMarket() {
    console.log("Initializing the marketplace...");
    renderMarketItems();
}

// Render market items
function renderMarketItems() {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = ""; // Clear existing items
    console.log("Rendering market items...");

    if (marketItems.length === 0) {
        productsContainer.innerHTML = "<p>No products available.</p>";
        return;
    }

    marketItems.forEach(item => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${item.image}" alt="${item.name}" />
            </div>
            <div class="product-details">
                <h3 class="product-title">${item.name}</h3>
                <p class="product-price">$${item.price.toFixed(2)}</p>
                <p class="product-desc">${item.description}</p>
                <div class="product-meta">
                    <span>Dealer: ${item.dealer}</span>
                    <span>Location: ${item.location}</span>
                </div>
                <div class="product-actions">
                    <button class="primary-btn" onclick="addToCart('${item.id}')">Add to Cart</button>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Add a new dealer
function registerDealer(event) {
    event.preventDefault();
    const dealerForm = document.getElementById("dealer-form");
    const newDealer = {
        id: Date.now(),
        name: dealerForm["business-name"].value,
        type: dealerForm["business-type"].value,
        phone: dealerForm["business-phone"].value,
        email: dealerForm["business-email"].value,
        location: dealerForm["business-location"].value,
        description: dealerForm["business-description"].value,
    };
    dealers.push(newDealer);
    showNotification("Dealer registered successfully!", "success");
    closeModal("dealer-registration-modal");
}

// Add a new product
function addNewProduct(event) {
    event.preventDefault();
    const productForm = document.getElementById("add-product-form");
    const newProduct = {
        id: Date.now(),
        name: productForm["product-name"].value,
        category: productForm["product-category"].value,
        price: parseFloat(productForm["product-price"].value),
        description: productForm["product-description"].value,
        image: productForm["product-image"].value,
        dealer: dealers[dealers.length - 1]?.name || "Unknown Dealer", // Use the last registered dealer
        location: "Your Location" // Replace with actual location
    };
    marketItems.push(newProduct);
    showNotification("Product added successfully!", "success");
    closeModal("add-product-modal");
    renderMarketItems();
}

// Show notification
function showNotification(message, type) {
    const notificationContainer = document.getElementById("notification-container");
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
    notificationContainer.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add to cart functionality
function addToCart(productId) {
    const product = marketItems.find(item => item.id === productId);
    if (product) {
        cart.push(product);
        showNotification("Product added to cart!", "success");
        updateCartCount();
    }
}

// Update cart count display
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.length;
}

// Search products
function searchProducts() {
    const searchInput = document.getElementById("market-search").value.toLowerCase();
    const filteredItems = marketItems.filter(item => item.name.toLowerCase().includes(searchInput));
    renderFilteredMarketItems(filteredItems);
}

// Render filtered market items
function renderFilteredMarketItems(filteredItems) {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = ""; // Clear existing items

    if (filteredItems.length === 0) {
        productsContainer.innerHTML = "<p>No products found.</p>";
        return;
    }

    filteredItems.forEach(item => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${item.image}" alt="${item.name}" />
            </div>
            <div class="product-details">
                <h3 class="product-title">${item.name}</h3>
                <p class="product-price">$${item.price.toFixed(2)}</p>
                <p class="product-desc">${item.description}</p>
                <div class="product-meta">
                    <span>Dealer: ${item.dealer}</span>
                    <span>Location: ${item.location}</span>
                </div>
                <div class="product-actions">
                    <button class="primary-btn" onclick="addToCart('${item.id}')">Add to Cart</button>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Event listeners for form submissions
document.getElementById("dealer-form").addEventListener("submit", registerDealer);
document.getElementById("add-product-form").addEventListener("submit", addNewProduct);
document.getElementById("market-search").addEventListener("input", searchProducts);

// Initialize the market on page load
window.onload = initializeMarket;

// Start the camera
function startCamera() {
    const cameraFeed = document.getElementById("camera-feed");
    const cameraPlaceholder = document.getElementById("camera-placeholder");
    
    // Access the device camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            cameraFeed.srcObject = stream;
            cameraFeed.style.display = "block";
            cameraPlaceholder.style.display = "none";
            cameraFeed.play();
        })
        .catch(err => {
            console.error("Error accessing camera: ", err);
            showNotification("Unable to access camera. Please check permissions.", "error");
        });
}

// Capture the photo
function capturePhoto() {
    const cameraFeed = document.getElementById("camera-feed");
    const photoCanvas = document.getElementById("photo-canvas");
    const photoPreview = document.getElementById("photo-preview");
    
    photoCanvas.width = cameraFeed.videoWidth;
    photoCanvas.height = cameraFeed.videoHeight;
    const context = photoCanvas.getContext("2d");
    context.drawImage(cameraFeed, 0, 0, photoCanvas.width, photoCanvas.height);
    
    // Show the captured photo
    photoPreview.src = photoCanvas.toDataURL("image/png");
    photoPreview.style.display = "block";
    cameraFeed.style.display = "none";
}

// Handle file upload
function handleFileUpload(event) {
    const file = event.target.files[0];
    const photoPreview = document.getElementById("photo-preview");
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            photoPreview.src = e.target.result;
            photoPreview.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
}

// Analyze the image (placeholder function)
function analyzeImage() {
    const photoPreview = document.getElementById("photo-preview");
    if (photoPreview.src) {
        // Placeholder for image analysis logic
        showNotification("Image analysis is not yet implemented.", "info");
    } else {
        showNotification("Please capture or upload an image first.", "warning");
    }
} 