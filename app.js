// Sample Data
let plants = [
    { id: 1, name: 'Tomato Plant', status: 'needs-attention', issue: 'Possible nitrogen deficiency' },
    { id: 2, name: 'Basil', status: 'healthy', issue: null }
];

let schedule = [
    { id: 1, title: 'Water Tomatoes', date: 'Today' },
    { id: 2, title: 'Check Basil', date: 'Tomorrow' }
];

let dealers = [
    {
        id: 1,
        name: "Green Thumb Supplies",
        businessType: "retailer",
        shopDetails: {
            storeName: "Green Thumb Garden Center",
            storeDescription: "Your one-stop shop for all gardening needs",
            openingHours: "9:00 AM - 6:00 PM",
            daysOpen: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            paymentMethods: ["Cash", "Credit Card", "Debit Card"],
            deliveryAvailable: true,
            deliveryArea: "Within 20km radius"
        },
        location: "123 Farm Road, Agricultural Zone",
        contact: "+1234567890",
        email: "sales@greenthumb.com",
        rating: 4.5,
        verified: true,
        specialization: ["Organic Products", "Pesticides", "Tools"],
        products: []
    },
    {
        id: 2,
        name: "Organic Farming Solutions",
        location: "456 Garden Street, Rural District",
        contact: "+1987654321",
        email: "info@organicfarming.com",
        rating: 4.8,
        verified: true,
        specialization: ["Organic Fertilizers", "Seeds", "Soil Amendments"]
    }
];

let marketItems = [
    {
        id: 1,
        name: 'Copper-Based Fungicide',
        price: '$19.99',
        category: 'Treatment',
        image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=300',
        forConditions: ['Apple___Apple_scab', 'Tomato___Late_blight', 'Potato___Early_blight'],
        description: 'Effective against various fungal diseases',
        usage: 'Apply every 7-14 days as needed',
        inStock: true,
        dealer: 1,
        quantity: 50,
        location: "123 Farm Road, Agricultural Zone",
        reviews: []
    },
    {
        id: 2,
        name: 'Organic Neem Oil Spray',
        price: '$15.99',
        category: 'Treatment',
        image: 'https://images.unsplash.com/photo-1615477081663-5e33caae26ed?w=300',
        forConditions: ['Tomato___Leaf_Mold', 'Apple___Black_rot'],
        description: 'Natural fungicide and insecticide',
        usage: 'Apply weekly as preventative measure',
        inStock: true
    },
    {
        id: 3,
        name: 'Premium Nitrogen Fertilizer',
        price: '$24.99',
        category: 'Nutrients',
        image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=300',
        forConditions: ['nitrogen_deficiency'],
        description: 'Fast-acting nitrogen supplement',
        usage: 'Apply monthly during growing season',
        inStock: true
    },
    {
        id: 4,
        name: 'Plant Health Monitoring Kit',
        price: '$39.99',
        category: 'Tools',
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300',
        forConditions: ['all'],
        description: 'Complete soil and plant health testing kit',
        usage: 'Regular monitoring of plant health',
        inStock: true
    },
    {
        id: 5,
        name: 'Pruning Shears Set',
        price: '$29.99',
        category: 'Tools',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300',
        forConditions: ['all'],
        description: 'Professional-grade pruning tools',
        usage: 'For removing infected leaves and branches',
        inStock: true
    }
];

let commonIssues = {
    diseases: [
        { name: 'Leaf Blight', symptoms: ['Yellow patches', 'Brown spots', 'Wilting leaves'] },
        { name: 'Powdery Mildew', symptoms: ['White powdery spots', 'Leaf distortion', 'Yellowing'] },
        { name: 'Root Rot', symptoms: ['Wilting', 'Yellow leaves', 'Stunted growth'] }
    ],
    deficiencies: [
        { name: 'Nitrogen Deficiency', symptoms: ['Yellowing of older leaves', 'Stunted growth', 'Light green color'] },
        { name: 'Phosphorus Deficiency', symptoms: ['Purple leaf veins', 'Slow growth', 'Dark green leaves'] },
        { name: 'Potassium Deficiency', symptoms: ['Brown leaf edges', 'Yellow leaf margins', 'Weak stems'] }
    ]
};

let cart = [];

// Tab Navigation
function initializeTabNavigation() {
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');

    // Show plants tab by default
    showTab('plants');

    // Add click handlers to tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            showTab(tabId);
        });
    });
}

// Function to show specific tab
function showTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
    });

    // Remove active class from all tabs
    document.querySelectorAll('.tab-button').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected tab content and activate tab button
    const selectedContent = document.getElementById(`${tabId}-tab`);
    const selectedTab = document.querySelector(`[data-tab="${tabId}"]`);

    if (selectedContent && selectedTab) {
        selectedContent.style.display = 'block';
        selectedTab.classList.add('active');

        // Initialize content based on tab
        switch(tabId) {
            case 'plants':
                renderPlants();
                break;
            case 'market':
                renderMarketItems();
                break;
            case 'guide':
                initializeGuide();
                break;
        }
    }
}

// Function to initialize guide content
function initializeGuide() {
    const guideContent = document.querySelector('.guide-content');
    if (guideContent) {
        guideContent.innerHTML = `
            <div class="guide-section">
                <h3>Common Plant Diseases</h3>
                <div class="issues-grid">
                    ${commonIssues.diseases.map(disease => `
                        <div class="issue-card">
                            <h4>${disease.name}</h4>
                            <div class="symptoms">
                                <h5>Common Symptoms:</h5>
                                <ul>
                                    ${disease.symptoms.map(symptom => `<li>${symptom}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="guide-section">
                <h3>Nutrient Deficiencies</h3>
                <div class="issues-grid">
                    ${commonIssues.deficiencies.map(deficiency => `
                        <div class="issue-card">
                            <h4>${deficiency.name}</h4>
                            <div class="symptoms">
                                <h5>Common Symptoms:</h5>
                                <ul>
                                    ${deficiency.symptoms.map(symptom => `<li>${symptom}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

// Plant List Functions
function renderPlants() {
    const plantList = document.querySelector('.plant-list');
    plantList.innerHTML = plants.map(plant => `
        <div class="plant-item">
            <span class="material-icons">${plant.status === 'healthy' ? '🌿' : '⚠️'}</span>
            <div>
                <h3>${plant.name}</h3>
                <span class="plant-status ${plant.status === 'healthy' ? 'status-healthy' : 'status-attention'}">
                    ${plant.status === 'healthy' ? 'Healthy' : 'Needs Attention'}
                </span>
                ${plant.issue ? `<p class="issue-text">${plant.issue}</p>` : ''}
            </div>
        </div>
    `).join('');
}

// Market Functions
function renderMarketItems(category = 'All', condition = null) {
    const marketList = document.querySelector('.market-items');
    let filteredItems = marketItems;

    if (category !== 'All') {
        filteredItems = filteredItems.filter(item => item.category === category);
    }

    if (condition) {
        filteredItems = filteredItems.filter(item => 
            item.forConditions.includes(condition) || item.forConditions.includes('all')
        );
    }

    marketList.innerHTML = `
        <div class="market-header">
            <div class="market-actions">
                <button class="gradient-button" onclick="showDealerRegistration()">
                    Register as Dealer
                </button>
                <button class="gradient-button-secondary" onclick="showAddProductForm()">
                    Add Product
                </button>
            </div>
            <div class="market-filters">
                <div class="category-pills">
                    <button class="category-pill ${category === 'All' ? 'active' : ''}" 
                            onclick="filterMarket('All')">All</button>
                    <button class="category-pill ${category === 'Treatment' ? 'active' : ''}" 
                            onclick="filterMarket('Treatment')">Treatments</button>
                    <button class="category-pill ${category === 'Nutrients' ? 'active' : ''}" 
                            onclick="filterMarket('Nutrients')">Nutrients</button>
                    <button class="category-pill ${category === 'Tools' ? 'active' : ''}" 
                            onclick="filterMarket('Tools')">Tools</button>
                </div>
            </div>
        </div>
        <div class="market-grid">
            ${filteredItems.map(item => {
                const dealer = dealers.find(d => d.id === item.dealer);
                return `
                    <div class="market-item ${item.inStock ? '' : 'out-of-stock'}">
                        <div class="market-item-image">
                            <img src="${item.image}" alt="${item.name}">
                            ${!item.inStock ? '<span class="out-of-stock-label">Out of Stock</span>' : ''}
                            ${dealer.verified ? '<span class="verified-dealer">✓ Verified Dealer</span>' : ''}
                        </div>
                        <div class="market-item-info">
                            <h3>${item.name}</h3>
                            <p class="price">${item.price}</p>
                            <p class="description">${item.description}</p>
                            <p class="dealer-info">
                                <strong>Seller:</strong> ${dealer.name}
                                <span class="dealer-rating">★ ${dealer.rating}</span>
                            </p>
                            <p class="location"><i class="fas fa-map-marker-alt"></i> ${item.location}</p>
                            <p class="stock-info">In Stock: ${item.quantity} units</p>
                            <div class="market-item-actions">
                                <button class="gradient-button" 
                                        onclick="addToCart(${item.id})"
                                        ${!item.inStock ? 'disabled' : ''}>
                                    Add to Cart
                                </button>
                                <button class="gradient-button-secondary" 
                                        onclick="showProductDetails(${item.id})">
                                    Details
                                </button>
                                <button class="contact-dealer-button" 
                                        onclick="contactDealer(${dealer.id})">
                                    Contact Seller
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function filterMarket(category) {
    const currentCondition = document.querySelector('.condition-filter')?.textContent.split(': ')[1];
    renderMarketItems(category, currentCondition);
}

function clearConditionFilter() {
    renderMarketItems('All');
}

function addToCart(itemId) {
    const item = marketItems.find(i => i.id === itemId);
    if (item && item.inStock) {
        cart.push({
            ...item,
            quantity: 1
        });
        updateCartUI();
        showNotification('Added to cart: ' + item.name);
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
    
    const cartTotal = cart.reduce((total, item) => total + (parseFloat(item.price.replace('$', '')) * item.quantity), 0);
    const cartTotalElement = document.getElementById('cart-total');
    if (cartTotalElement) {
        cartTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
    }
}

function showProductDetails(itemId) {
    const item = marketItems.find(i => i.id === itemId);
    if (!item) return;

    const modal = document.createElement('div');
    modal.className = 'modal product-details-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <div class="product-details">
                <img src="${item.image}" alt="${item.name}">
                <h2>${item.name}</h2>
                <p class="price">${item.price}</p>
                <div class="details-section">
                    <h3>Description</h3>
                    <p>${item.description}</p>
                </div>
                <div class="details-section">
                    <h3>Usage Instructions</h3>
                    <p>${item.usage}</p>
                </div>
                <div class="details-section">
                    <h3>Recommended For</h3>
                    <ul>
                        ${item.forConditions.map(condition => 
                            `<li>${condition.replace(/_/g, ' ')}</li>`
                        ).join('')}
                    </ul>
                </div>
                ${item.inStock ? `
                    <button class="gradient-button" onclick="addToCart(${item.id})">
                        Add to Cart
                    </button>
                ` : `
                    <button class="gradient-button" disabled>
                        Out of Stock
                    </button>
                `}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Update the diagnosis result to include product recommendations
function updateDiagnosisResult(results) {
    const result = results[0];
    const recommendedProducts = marketItems.filter(item => 
        item.forConditions.includes(result.details.name) || 
        item.forConditions.includes('all')
    );

    const diagnosisResult = document.getElementById('diagnosis-result');
    diagnosisResult.innerHTML += `
        <div class="recommended-products">
            <h3>Recommended Products</h3>
            <div class="product-grid">
                ${recommendedProducts.map(product => `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}">
                        <h4>${product.name}</h4>
                        <p>${product.price}</p>
                        <button class="gradient-button" 
                                onclick="addToCart(${product.id})"
                                ${!product.inStock ? 'disabled' : ''}>
                            Add to Cart
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Add Plant Functions
function showAddPlantForm() {
    document.getElementById('addPlantModal').style.display = 'flex';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

function addPlant() {
    const plantName = document.getElementById('plantName').value;
    if (plantName) {
        plants.push({
            id: plants.length + 1,
            name: plantName,
            status: 'healthy'
        });
        renderPlants();
        closeModal('addPlantModal');
        document.getElementById('plantName').value = '';
    }
}

// Enhanced Plant Disease Database
const plantDiseases = {
    leafBlight: {
        name: 'Leaf Blight',
        symptoms: ['Yellow patches', 'Brown spots', 'Wilting leaves'],
        causes: ['Fungal infection', 'High humidity', 'Poor air circulation'],
        treatment: [
            'Remove affected leaves immediately',
            'Apply copper-based fungicide',
            'Improve air circulation around plants',
            'Water at soil level to keep leaves dry'
        ],
        prevention: [
            'Maintain proper plant spacing',
            'Water early in the day',
            'Keep garden free of debris'
        ]
    },
    powderyMildew: {
        name: 'Powdery Mildew',
        symptoms: ['White powdery spots', 'Leaf distortion', 'Yellowing'],
        causes: ['Fungal spores', 'High humidity', 'Poor air circulation'],
        treatment: [
            'Apply neem oil solution',
            'Remove heavily infected parts',
            'Increase air circulation'
        ],
        prevention: [
            'Space plants properly',
            'Avoid overhead watering',
            'Maintain good air circulation'
        ]
    }
};

const nutrientDeficiencies = {
    nitrogen: {
        name: 'Nitrogen Deficiency',
        symptoms: ['Yellowing of older leaves', 'Stunted growth', 'Light green color'],
        causes: ['Poor soil quality', 'Heavy rainfall', 'Insufficient fertilization'],
        treatment: [
            'Apply nitrogen-rich fertilizer',
            'Add composted manure',
            'Use blood meal or fish emulsion'
        ],
        prevention: [
            'Regular soil testing',
            'Crop rotation',
            'Proper fertilization schedule'
        ]
    },
    phosphorus: {
        name: 'Phosphorus Deficiency',
        symptoms: ['Purple leaf veins', 'Slow growth', 'Dark green leaves'],
        causes: ['Cold soil', 'High soil pH', 'Compacted soil'],
        treatment: [
            'Apply phosphorus-rich fertilizer',
            'Add bone meal',
            'Correct soil pH if necessary'
        ],
        prevention: [
            'Maintain proper soil pH',
            'Regular soil testing',
            'Add organic matter'
        ]
    }
};

// Update the analyzeImage function to handle API calls
async function analyzeImage(imageElement) {
    try {
        // Show loading state
        const diagnosisResult = document.getElementById('diagnosis-result');
        diagnosisResult.innerHTML = `
            <div class="diagnosis-card loading">
                <h3>Analyzing Plant Health 🔍</h3>
                <div class="analysis-steps">
                    <div class="step active">
                        <span class="step-number">1</span>
                        <span class="step-text">Processing image...</span>
                    </div>
                    <div class="step">
                        <span class="step-number">2</span>
                        <span class="step-text">Running AI analysis...</span>
                    </div>
                    <div class="step">
                        <span class="step-number">3</span>
                        <span class="step-text">Generating recommendations...</span>
                    </div>
                </div>
                <div class="loading-spinner"></div>
            </div>
        `;

        // Convert image to base64
        const canvas = document.createElement('canvas');
        canvas.width = imageElement.naturalWidth;
        canvas.height = imageElement.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(imageElement, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg').split(',')[1];

        // Activate step 2
        document.querySelector('.analysis-steps .step:nth-child(2)').classList.add('active');

        // Use the ML model for analysis
        const results = await detector.analyzeImage(imageElement);

        // Activate step 3
        document.querySelector('.analysis-steps .step:nth-child(3)').classList.add('active');

        // Display results
        const resultsHTML = results.map(result => `
            <div class="diagnosis-section ${result.type}-section">
                <div class="diagnosis-header">
                    <h4>${result.details.name}</h4>
                    <span class="severity-badge ${result.severity}">${result.severity}</span>
                </div>
                
                <div class="confidence-bar">
                    <div class="confidence-level" style="width: ${result.confidence}"></div>
                    <span>Confidence: ${result.confidence}</span>
                </div>

                <div class="diagnosis-details">
                    <div class="detail-section">
                        <h5>Description:</h5>
                        <p>${result.details.description}</p>
                    </div>

                    ${result.details.treatment.length > 0 ? `
                        <div class="detail-section">
                            <h5>Recommended Treatment:</h5>
                            <ul>
                                ${result.details.treatment.map(step => `<li>${step}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');

        // Update the diagnosis result
        diagnosisResult.innerHTML = `
            <div class="diagnosis-card">
                <h3>AI Analysis Results</h3>
                ${resultsHTML}
                <div class="action-buttons">
                    <button class="gradient-button" onclick="saveToHistory()">
                        Save to History
                    </button>
                    <button class="gradient-button-secondary" onclick="downloadReport(${JSON.stringify(results)})">
                        Download Report
                    </button>
                </div>
            </div>
        `;

        updateDiagnosisResult(results);

        return results;
    } catch (error) {
        console.error('Error analyzing image:', error);
        document.getElementById('diagnosis-result').innerHTML = `
            <div class="diagnosis-card error">
                <h3>Analysis Error</h3>
                <p>Sorry, we couldn't analyze your image. Please try again with a clearer photo.</p>
                <ul class="error-tips">
                    <li>Ensure good lighting</li>
                    <li>Focus on the affected area</li>
                    <li>Keep the camera steady</li>
                    <li>Avoid blurry images</li>
                </ul>
            </div>
        `;
        return null;
    }
}

// Function to download detailed report
function downloadReport(results) {
    const result = results[0]; // Get the main diagnosis
    const reportText = `
Plant Health Analysis Report
Generated on: ${new Date().toLocaleString()}

DIAGNOSIS DETAILS
----------------
Condition: ${result.details.name}
Confidence: ${result.confidence}
Severity: ${result.severity}

Description:
${result.details.description}

Recommended Treatment:
${result.details.treatment.map((step, index) => `${index + 1}. ${step}`).join('\n')}

Additional Notes:
- Keep monitoring the plant's response to treatment
- Take follow-up photos to track progress
- Consult a local expert if condition worsens

Generated by PlantGuard AI
    `.trim();

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plant-health-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Update the camera capture function to immediately analyze
async function takePicture() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const videoPreview = document.createElement('video');
        videoPreview.srcObject = stream;
        videoPreview.autoplay = true;
        videoPreview.style.width = '100%';
        videoPreview.style.height = '100%';
        videoPreview.style.objectFit = 'cover';

        const captureButton = document.createElement('button');
        captureButton.className = 'gradient-button capture-button';
        captureButton.innerHTML = '📸 Capture';
        
        const cancelButton = document.createElement('button');
        cancelButton.className = 'gradient-button-secondary capture-button';
        cancelButton.innerHTML = '❌ Cancel';

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'camera-overlay-buttons';
        buttonContainer.appendChild(captureButton);
        buttonContainer.appendChild(cancelButton);

        const preview = document.getElementById('photo-preview');
        preview.innerHTML = '';
        preview.appendChild(videoPreview);
        preview.appendChild(buttonContainer);

        // Handle capture
        captureButton.onclick = async () => {
            const canvas = document.createElement('canvas');
            canvas.width = videoPreview.videoWidth;
            canvas.height = videoPreview.videoHeight;
            canvas.getContext('2d').drawImage(videoPreview, 0, 0);

            // Stop camera stream
            stream.getTracks().forEach(track => track.stop());

            // Display captured image
            const imageData = canvas.toDataURL('image/jpeg');
            preview.innerHTML = `
                <img src="${imageData}" style="width: 100%; height: 100%; object-fit: contain;">
                <div class="scan-overlay">
                    <div class="scan-line"></div>
                </div>
            `;

            // Immediately analyze the image
            const img = preview.querySelector('img');
            img.onload = () => analyzeImage(img);
        };

        // Handle cancel
        cancelButton.onclick = () => {
            stream.getTracks().forEach(track => track.stop());
            preview.innerHTML = `
                <div class="preview-placeholder">
                    Take or upload a clear photo of the affected plant part
                </div>
            `;
        };

    } catch (error) {
        handleCameraError(error);
    }
}

// Handle file upload and immediate analysis
document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('photo-preview');
            preview.innerHTML = `
                <img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: contain;">
                <div class="scan-overlay">
                    <div class="scan-line"></div>
                </div>
            `;
            
            // Analyze the image once it's loaded
            const img = preview.querySelector('img');
            img.onload = () => analyzeImage(img);
        };
        reader.readAsDataURL(file);
    }
});

// Schedule Functions
function renderSchedule() {
    const scheduleList = document.querySelector('.schedule-list');
    scheduleList.innerHTML = schedule.map(item => `
        <div class="schedule-item">
            <div class="schedule-date">${item.date}</div>
            <div>${item.title}</div>
        </div>
    `).join('');
}

// Function to show dealer registration modal with enhanced shop details
function showDealerRegistration() {
    const modal = document.getElementById('dealerRegistrationModal');
    modal.querySelector('.modal-content').innerHTML = `
        <span class="close-button" onclick="closeModal('dealerRegistrationModal')">&times;</span>
        <h2>Register as a Dealer</h2>
        <form id="dealerRegistrationForm" onsubmit="registerDealer(event)">
            <div class="form-section">
                <h3>Business Information</h3>
                <div class="form-group">
                    <label for="businessName">Business Name*</label>
                    <input type="text" id="businessName" name="businessName" required />
                </div>

                <div class="form-group">
                    <label for="businessType">Business Type*</label>
                    <select id="businessType" name="businessType" required>
                        <option value="">Select Business Type</option>
                        <option value="manufacturer">Manufacturer</option>
                        <option value="wholesaler">Wholesaler</option>
                        <option value="retailer">Retailer</option>
                        <option value="farmer">Farmer</option>
                    </select>
                </div>
            </div>

            <div class="form-section">
                <h3>Shop Details</h3>
                <div class="form-group">
                    <label for="storeName">Store Name*</label>
                    <input type="text" id="storeName" name="storeName" required />
                </div>

                <div class="form-group">
                    <label for="storeDescription">Store Description*</label>
                    <textarea id="storeDescription" name="storeDescription" required 
                        placeholder="Tell customers about your store and what makes it special..."></textarea>
                </div>

                <div class="form-row">
                    <div class="form-group half">
                        <label for="openingTime">Opening Time*</label>
                        <input type="time" id="openingTime" name="openingTime" required />
                    </div>
                    <div class="form-group half">
                        <label for="closingTime">Closing Time*</label>
                        <input type="time" id="closingTime" name="closingTime" required />
                    </div>
                </div>

                <div class="form-group">
                    <label>Business Days*</label>
                    <div class="checkbox-group days-group">
                        <label><input type="checkbox" name="businessDays" value="Monday"> Monday</label>
                        <label><input type="checkbox" name="businessDays" value="Tuesday"> Tuesday</label>
                        <label><input type="checkbox" name="businessDays" value="Wednesday"> Wednesday</label>
                        <label><input type="checkbox" name="businessDays" value="Thursday"> Thursday</label>
                        <label><input type="checkbox" name="businessDays" value="Friday"> Friday</label>
                        <label><input type="checkbox" name="businessDays" value="Saturday"> Saturday</label>
                        <label><input type="checkbox" name="businessDays" value="Sunday"> Sunday</label>
                    </div>
                </div>

                <div class="form-group">
                    <label>Payment Methods Accepted*</label>
                    <div class="checkbox-group payment-group">
                        <label><input type="checkbox" name="paymentMethods" value="Cash"> Cash</label>
                        <label><input type="checkbox" name="paymentMethods" value="Credit Card"> Credit Card</label>
                        <label><input type="checkbox" name="paymentMethods" value="Debit Card"> Debit Card</label>
                        <label><input type="checkbox" name="paymentMethods" value="Mobile Payment"> Mobile Payment</label>
                    </div>
                </div>

                <div class="form-group">
                    <label for="deliveryAvailable">Delivery Service</label>
                    <select id="deliveryAvailable" name="deliveryAvailable">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>

                <div class="form-group" id="deliveryAreaGroup">
                    <label for="deliveryArea">Delivery Area</label>
                    <input type="text" id="deliveryArea" name="deliveryArea" 
                        placeholder="e.g., Within 20km radius" />
                </div>
            </div>

            <div class="form-section">
                <h3>Contact Information</h3>
                <div class="form-row">
                    <div class="form-group half">
                        <label for="contactName">Contact Person*</label>
                        <input type="text" id="contactName" name="contactName" required />
                    </div>
                    <div class="form-group half">
                        <label for="contactPhone">Phone Number*</label>
                        <input type="tel" id="contactPhone" name="contactPhone" required />
                    </div>
                </div>

                <div class="form-group">
                    <label for="email">Business Email*</label>
                    <input type="email" id="email" name="email" required />
                </div>

                <div class="form-group">
                    <label for="website">Website (Optional)</label>
                    <input type="url" id="website" name="website" placeholder="https://" />
                </div>

                <div class="form-group">
                    <label for="address">Business Address*</label>
                    <textarea id="address" name="address" required></textarea>
                </div>

                <div class="form-row">
                    <div class="form-group half">
                        <label for="city">City*</label>
                        <input type="text" id="city" name="city" required />
                    </div>
                    <div class="form-group half">
                        <label for="zipCode">ZIP Code*</label>
                        <input type="text" id="zipCode" name="zipCode" required />
                    </div>
                </div>
            </div>

            <div class="form-section">
                <h3>Business Verification</h3>
                <div class="form-group">
                    <label for="businessLicense">Business License Number*</label>
                    <input type="text" id="businessLicense" name="businessLicense" required />
                </div>

                <div class="form-group">
                    <label for="taxId">Tax ID Number*</label>
                    <input type="text" id="taxId" name="taxId" required />
                </div>
            </div>

            <div class="form-group checkbox-group">
                <input type="checkbox" id="terms" name="terms" required />
                <label for="terms">I agree to the Terms and Conditions*</label>
            </div>

            <div class="form-actions">
                <button type="submit" class="gradient-button">Register as Dealer</button>
                <button type="button" class="gradient-button-secondary" 
                    onclick="closeModal('dealerRegistrationModal')">Cancel</button>
            </div>
        </form>
    `;
    modal.style.display = 'flex';

    // Show/hide delivery area based on delivery service selection
    document.getElementById('deliveryAvailable').addEventListener('change', function() {
        const deliveryAreaGroup = document.getElementById('deliveryAreaGroup');
        deliveryAreaGroup.style.display = this.value === 'true' ? 'block' : 'none';
    });
}

// Enhanced dealer registration function
async function registerDealer(event) {
    event.preventDefault();
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    try {
        submitButton.disabled = true;
        submitButton.innerHTML = 'Registering... <div class="loading-spinner"></div>';

        const formData = new FormData(form);
        const newDealer = {
            id: dealers.length + 1,
            name: formData.get('businessName'),
            businessType: formData.get('businessType'),
            shopDetails: {
                storeName: formData.get('storeName'),
                storeDescription: formData.get('storeDescription'),
                openingHours: `${formData.get('openingTime')} - ${formData.get('closingTime')}`,
                daysOpen: Array.from(form.querySelectorAll('input[name="businessDays"]:checked')).map(cb => cb.value),
                paymentMethods: Array.from(form.querySelectorAll('input[name="paymentMethods"]:checked')).map(cb => cb.value),
                deliveryAvailable: formData.get('deliveryAvailable') === 'true',
                deliveryArea: formData.get('deliveryArea')
            },
            contactName: formData.get('contactName'),
            contact: formData.get('contactPhone'),
            email: formData.get('email'),
            website: formData.get('website'),
            address: formData.get('address'),
            city: formData.get('city'),
            zipCode: formData.get('zipCode'),
            businessLicense: formData.get('businessLicense'),
            taxId: formData.get('taxId'),
            rating: 0,
            verified: false,
            dateRegistered: new Date().toISOString(),
            status: 'pending',
            products: []
        };

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Add new dealer to the list
        dealers.push(newDealer);
        
        // Set current user as dealer
        currentUser = {
            ...newDealer,
            isDealer: true,
            dealerId: newDealer.id
        };

        showNotification('Registration successful! Your application is under review.');
        form.reset();
        closeModal('dealerRegistrationModal');

        // Show dealer dashboard after successful registration
        showDealerDashboard(newDealer.id);

    } catch (error) {
        console.error('Registration error:', error);
        showNotification('Registration failed. Please try again.', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Register as Dealer';
    }
}

// Function to show dealer dashboard
function showDealerDashboard(dealerId) {
    const dealer = dealers.find(d => d.id === dealerId);
    if (!dealer) return;

    const dashboardTab = document.createElement('div');
    dashboardTab.id = 'dealer-dashboard';
    dashboardTab.className = 'tab-content';
    dashboardTab.innerHTML = `
        <h2>Dealer Dashboard</h2>
        <div class="dashboard-sections">
            <div class="shop-info-section">
                <h3>Shop Information</h3>
                <div class="shop-details">
                    <h4>${dealer.shopDetails.storeName}</h4>
                    <p>${dealer.shopDetails.storeDescription}</p>
                    <div class="details-grid">
                        <div class="detail-item">
                            <strong>Hours:</strong> ${dealer.shopDetails.openingHours}
                        </div>
                        <div class="detail-item">
                            <strong>Days Open:</strong> ${dealer.shopDetails.daysOpen.join(', ')}
                        </div>
                        <div class="detail-item">
                            <strong>Payment Methods:</strong> ${dealer.shopDetails.paymentMethods.join(', ')}
                        </div>
                        <div class="detail-item">
                            <strong>Delivery:</strong> 
                            ${dealer.shopDetails.deliveryAvailable ? 
                                `Available (${dealer.shopDetails.deliveryArea})` : 'Not available'}
                        </div>
                    </div>
                    <button class="gradient-button-secondary" onclick="editShopDetails(${dealer.id})">
                        Edit Shop Details
                    </button>
                </div>
            </div>

            <div class="products-section">
                <h3>My Products</h3>
                <button class="gradient-button" onclick="showAddProductForm()">
                    Add New Product
                </button>
                <div class="products-grid">
                    ${dealer.products.map(product => `
                        <div class="product-card">
                            <img src="${product.image}" alt="${product.name}">
                            <div class="product-info">
                                <h4>${product.name}</h4>
                                <p class="price">${product.price}</p>
                                <p>Stock: ${product.quantity}</p>
                                <div class="product-actions">
                                    <button onclick="editProduct(${product.id})" class="gradient-button-secondary">
                                        Edit
                                    </button>
                                    <button onclick="deleteProduct(${product.id})" class="delete-button">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('') || '<p>No products added yet</p>'}
                </div>
            </div>
        </div>
    `;

    // Add dashboard to the app
    document.querySelector('.app').appendChild(dashboardTab);

    // Add dashboard tab to navigation
    const navTabs = document.querySelector('.nav-tabs');
    const dashboardButton = document.createElement('button');
    dashboardButton.className = 'tab-button';
    dashboardButton.dataset.tab = 'dealer-dashboard';
    dashboardButton.innerHTML = `
        <i class="fas fa-store"></i>
        Dashboard
    `;
    navTabs.appendChild(dashboardButton);

    // Show dashboard
    showTab('dealer-dashboard');
}

// Function to show add product form with enhanced features
function showAddProductForm() {
    if (!currentUser || !currentUser.isDealer) {
        showNotification('Please register as a dealer first');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal add-product-modal';
    modal.id = 'add-product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button" onclick="closeAddProductModal()">&times;</span>
            <h2>Add New Product</h2>
            <form id="add-product-form" class="add-product-form" onsubmit="addNewProduct(event)">
                <div class="form-section">
                    <h3>Basic Information</h3>
                    <div class="section-content">
                        <div class="form-group">
                            <label>Product Name*</label>
                            <input type="text" name="productName" required>
                        </div>
                        <div class="form-row">
                            <div class="form-group half">
                                <label>Category*</label>
                                <select name="category" required>
                                    <option value="">Select Category</option>
                                    <option value="Treatment">Treatment</option>
                                    <option value="Nutrients">Nutrients</option>
                                    <option value="Tools">Tools</option>
                                    <option value="Seeds">Seeds</option>
                                </select>
                            </div>
                            <div class="form-group half">
                                <label>Price*</label>
                                <input type="number" name="price" step="0.01" required>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Product Details</h3>
                    <div class="section-content">
                        <div class="form-group">
                            <label>Description*</label>
                            <textarea name="description" required 
                                placeholder="Detailed description of your product..."></textarea>
                        </div>
                        <div class="form-group">
                            <label>Usage Instructions*</label>
                            <textarea name="usage" required
                                placeholder="How to use this product..."></textarea>
                        </div>
                        <div class="form-row">
                            <div class="form-group half">
                                <label>Quantity Available*</label>
                                <input type="number" name="quantity" required min="0">
                            </div>
                            <div class="form-group half">
                                <label>Unit*</label>
                                <select name="unit" required>
                                    <option value="piece">Piece</option>
                                    <option value="kg">Kilogram</option>
                                    <option value="g">Gram</option>
                                    <option value="l">Liter</option>
                                    <option value="ml">Milliliter</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Product Images</h3>
                    <div class="section-content">
                        <div class="form-group">
                            <label>Main Product Image*</label>
                            <div class="main-image-upload">
                                <input type="file" id="main-product-image" name="mainImage" 
                                    accept="image/*" required>
                                <div class="image-preview">
                                    <i class="fas fa-plus"></i>
                                    <span>Add Main Image</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Additional Images (up to 4)</label>
                            <div class="additional-images-grid"></div>
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Store Location</h3>
                    <div class="section-content">
                        <div class="form-group">
                            <label>Store Address*</label>
                            <input type="text" name="storeAddress" required>
                        </div>
                        <div class="form-row">
                            <div class="form-group half">
                                <label>Latitude*</label>
                                <input type="number" id="product-latitude" name="latitude" 
                                    step="any" required>
                            </div>
                            <div class="form-group half">
                                <label>Longitude*</label>
                                <input type="number" id="product-longitude" name="longitude" 
                                    step="any" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="location-map"></div>
                            <button type="button" id="get-current-location" 
                                class="gradient-button-secondary">
                                Get Current Location
                            </button>
                        </div>
                    </div>
                </div>

                <div class="form-actions">
                    <button type="submit" class="gradient-button">Add Product</button>
                    <button type="button" class="gradient-button-secondary" 
                        onclick="closeAddProductModal()">Cancel</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    // Initialize the form functionality
    const productForm = new AddProductForm(modal);
    productForm.init();

    // Show the modal
    modal.style.display = 'flex';
}

// Add Product Form Class
class AddProductForm {
    constructor(modal) {
        this.modal = modal;
        this.form = modal.querySelector('#add-product-form');
        this.mainImageInput = modal.querySelector('#main-product-image');
        this.additionalImagesGrid = modal.querySelector('.additional-images-grid');
        this.map = null;
        this.marker = null;
    }

    init() {
        this.setupImageUploads();
        this.setupLocationFeatures();
        this.setupFormValidation();
        this.setupResponsiveHandling();
    }

    setupImageUploads() {
        // Main image upload handling
        const mainImageContainer = this.modal.querySelector('.main-image-upload');
        const mainImagePreview = mainImageContainer.querySelector('.image-preview');

        this.mainImageInput.addEventListener('change', (e) => {
            this.handleImageUpload(e.target.files[0], mainImagePreview);
        });

        // Setup drag and drop for main image
        this.setupDragAndDrop(mainImageContainer, this.mainImageInput, mainImagePreview);

        // Additional images
        for (let i = 0; i < 4; i++) {
            this.createAdditionalImageUpload(i);
        }
    }

    setupDragAndDrop(container, input, preview) {
        container.addEventListener('dragover', (e) => {
            e.preventDefault();
            container.classList.add('drag-over');
        });

        container.addEventListener('dragleave', () => {
            container.classList.remove('drag-over');
        });

        container.addEventListener('drop', (e) => {
            e.preventDefault();
            container.classList.remove('drag-over');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                input.files = e.dataTransfer.files;
                this.handleImageUpload(file, preview);
            }
        });
    }

    createAdditionalImageUpload(index) {
        const container = document.createElement('div');
        container.className = 'additional-image-container';

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.className = 'additional-image-input';
        input.name = `additionalImage${index + 1}`;

        const preview = document.createElement('div');
        preview.className = 'image-preview';
        preview.innerHTML = '<i class="fas fa-plus"></i><span>Add Image</span>';

        container.appendChild(input);
        container.appendChild(preview);
        this.additionalImagesGrid.appendChild(container);

        input.addEventListener('change', (e) => {
            this.handleImageUpload(e.target.files[0], preview);
        });

        this.setupDragAndDrop(container, input, preview);
    }

    handleImageUpload(file, previewElement) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewElement.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                previewElement.classList.add('has-image');
            };
            reader.readAsDataURL(file);
        }
    }

    setupLocationFeatures() {
        const mapContainer = this.modal.querySelector('.location-map');
        const latInput = this.modal.querySelector('#product-latitude');
        const lngInput = this.modal.querySelector('#product-longitude');

        // Initialize map with default location
        this.map = new google.maps.Map(mapContainer, {
            zoom: 13,
            center: { lat: 0, lng: 0 }
        });

        // Add click event to map
        this.map.addListener('click', (e) => {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            this.updateMarker(lat, lng);
            latInput.value = lat;
            lngInput.value = lng;
        });

        // Setup current location button
        this.modal.querySelector('#get-current-location').addEventListener('click', () => {
            this.getCurrentLocation();
        });
    }

    getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    this.map.setCenter({ lat, lng });
                    this.updateMarker(lat, lng);
                    this.modal.querySelector('#product-latitude').value = lat;
                    this.modal.querySelector('#product-longitude').value = lng;
                },
                (error) => {
                    showNotification('Error getting location: ' + error.message, 'error');
                }
            );
        } else {
            showNotification('Geolocation is not supported by your browser', 'error');
        }
    }

    updateMarker(lat, lng) {
        if (this.marker) {
            this.marker.setMap(null);
        }
        this.marker = new google.maps.Marker({
            position: { lat, lng },
            map: this.map,
            draggable: true
        });

        this.marker.addListener('dragend', () => {
            const position = this.marker.getPosition();
            this.modal.querySelector('#product-latitude').value = position.lat();
            this.modal.querySelector('#product-longitude').value = position.lng();
        });
    }

    setupFormValidation() {
        const requiredFields = this.form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            field.addEventListener('input', () => this.validateField(field));
            field.addEventListener('blur', () => this.validateField(field));
        });

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateForm()) {
                this.submitForm();
            }
        });
    }

    validateField(field) {
        const formGroup = field.closest('.form-group');
        if (!field.value.trim()) {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            return false;
        } else {
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
            return true;
        }
    }

    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (!this.mainImageInput.files[0]) {
            showNotification('Please upload a main product image', 'error');
            isValid = false;
        }

        return isValid;
    }

    setupResponsiveHandling() {
        // Adjust image preview sizes based on screen size
        const resizeImagePreviews = () => {
            const isMobile = window.innerWidth <= 768;
            const mainImageUpload = this.modal.querySelector('.main-image-upload');
            if (mainImageUpload) {
                mainImageUpload.style.height = isMobile ? '200px' : '250px';
            }
        };

        window.addEventListener('resize', resizeImagePreviews);
        resizeImagePreviews();

        // Make form sections collapsible on mobile
        if (window.innerWidth <= 768) {
            const sections = this.modal.querySelectorAll('.form-section');
            sections.forEach(section => {
                const header = section.querySelector('h3');
                const content = section.querySelector('.section-content');
                
                header.addEventListener('click', () => {
                    content.style.display = content.style.display === 'none' ? 'block' : 'none';
                    header.classList.toggle('collapsed');
                });
            });
        }
    }

    async submitForm() {
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        try {
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="loading-spinner"></span> Adding Product...';

            const formData = new FormData(this.form);
            
            // Add additional images to formData
            for (let i = 0; i < 4; i++) {
                const input = this.modal.querySelector(`input[name="additionalImage${i + 1}"]`);
                if (input.files[0]) {
                    formData.append(`additional_image_${i}`, input.files[0]);
                }
            }

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show success message
            this.showNotification('Product added successfully!', 'success');
            this.closeModal();
            
            // Reset form
            this.form.reset();
            this.resetImagePreviews();
            if (this.marker) {
                this.marker.setMap(null);
            }

        } catch (error) {
            console.error('Error submitting form:', error);
            this.showNotification('Error adding product. Please try again.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    }

    resetImagePreviews() {
        const mainPreview = this.modal.querySelector('.main-image-upload .image-preview');
        mainPreview.innerHTML = '<i class="fas fa-plus"></i><span>Add Main Image</span>';
        mainPreview.classList.remove('has-image');

        this.additionalImagesGrid.innerHTML = '';
        for (let i = 0; i < 4; i++) {
            this.createAdditionalImageUpload(i);
        }
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    closeModal() {
        if (this.modal) {
            this.modal.remove();
        }
    }
}

function closeAddProductModal() {
    const modal = document.getElementById('add-product-modal');
    if (modal) {
        modal.remove();
    }
}

// Global variables for current user and detector
let currentUser = null;
let detector = {
    analyzeImage: async function(imageElement) {
        // Simulate analysis
        await new Promise(resolve => setTimeout(resolve, 2000));
        return [{
            type: 'disease',
            details: {
                name: 'Leaf Blight',
                description: 'A common fungal disease affecting leaves',
                treatment: ['Remove affected leaves', 'Apply fungicide', 'Improve air circulation']
            },
            severity: 'moderate',
            confidence: '85%'
        }];
    }
};

// Function to handle camera errors
function handleCameraError(error) {
    console.error('Camera error:', error);
    const preview = document.getElementById('photo-preview');
    preview.innerHTML = `
        <div class="camera-permission">
            <p>Unable to access camera: ${error.message}</p>
            <p>Please make sure you have granted camera permissions.</p>
        </div>
    `;
}

// Initialize the app with all features
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize tab navigation
        initializeTabNavigation();
        
        // Initialize cart UI
        updateCartUI();

        // Add event listeners for plant items
        document.querySelectorAll('.plant-item').forEach(plant => {
            plant.addEventListener('click', () => {
                const plantId = plant.getAttribute('data-id');
                if (plantId) {
                    showPlantDetails(parseInt(plantId));
                }
            });
        });

        // Add event listeners for market filters
        document.querySelectorAll('.category-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                const category = pill.textContent.trim();
                filterMarket(category);
            });
        });

        // Initialize file input for image upload
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.addEventListener('change', handleFileUpload);
        }

    } catch (error) {
        console.error('Initialization error:', error);
        showNotification('Error initializing application. Please refresh the page.', 'error');
    }
});

// Handle file upload
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('photo-preview');
            if (preview) {
                preview.innerHTML = `
                    <img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: contain;">
                    <div class="scan-overlay">
                        <div class="scan-line"></div>
                    </div>
                `;
                
                const img = preview.querySelector('img');
                if (img) {
                    img.onload = () => analyzeImage(img);
                }
            }
        };
        reader.readAsDataURL(file);
    }
}

// Function to show plant details
function showPlantDetails(plantId) {
    const plant = plants.find(p => p.id === parseInt(plantId));
    if (!plant) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <div class="plant-details">
                <h2>${plant.name}</h2>
                <div class="status-badge ${plant.status}">${plant.status}</div>
                ${plant.issue ? `<p class="issue-warning">${plant.issue}</p>` : ''}
                <div class="plant-actions">
                    <button class="gradient-button" onclick="analyzePlant(${plant.id})">
                        Analyze Health
                    </button>
                    <button class="gradient-button-secondary" onclick="showPlantHistory(${plant.id})">
                        View History
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
} 