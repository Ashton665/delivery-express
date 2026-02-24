/* ==========================================
   MODERN LOGISTICS - VANILLA JAVASCRIPT
   Single Page Application (SPA) with Dynamic Updates
   ========================================== */

// ==========================================
// MOCK DATABASE
// ==========================================

const mockShipments = [
    {
        trackingId: 'SHIP-2024',
        origin: 'New York, NY',
        destination: 'Los Angeles, CA',
        weight: 25.5,
        service: 'Land',
        status: 'out-for-delivery',
        eta: '2024-02-22',
        currentStep: 4,
        dates: {
            ordered: '2024-02-15',
            processed: '2024-02-16',
            'in-transit': '2024-02-17',
            'out-for-delivery': '2024-02-21',
            delivered: ''
        }
    },
    {
        trackingId: 'SHIP-2025',
        origin: 'London, UK',
        destination: 'Hong Kong',
        weight: 150.0,
        service: 'Sea',
        status: 'in-transit',
        eta: '2024-03-15',
        currentStep: 3,
        dates: {
            ordered: '2024-02-10',
            processed: '2024-02-12',
            'in-transit': '2024-02-18',
            'out-for-delivery': '',
            delivered: ''
        }
    },
    {
        trackingId: 'SHIP-2026',
        origin: 'Tokyo, Japan',
        destination: 'Sydney, Australia',
        weight: 85.7,
        service: 'Air',
        status: 'processed',
        eta: '2024-02-25',
        currentStep: 2,
        dates: {
            ordered: '2024-02-18',
            processed: '2024-02-19',
            'in-transit': '',
            'out-for-delivery': '',
            delivered: ''
        }
    },
    {
        trackingId: 'SHIP-2027',
        origin: 'Dubai, UAE',
        destination: 'Berlin, Germany',
        weight: 42.3,
        service: 'Air',
        status: 'delivered',
        eta: '2024-02-20',
        currentStep: 5,
        dates: {
            ordered: '2024-02-12',
            processed: '2024-02-13',
            'in-transit': '2024-02-15',
            'out-for-delivery': '2024-02-19',
            delivered: '2024-02-20'
        }
    },
    {
        trackingId: 'SHIP-2028',
        origin: 'Shanghai, China',
        destination: 'Toronto, Canada',
        weight: 200.0,
        service: 'Sea',
        status: 'in-transit',
        eta: '2024-03-20',
        currentStep: 3,
        dates: {
            ordered: '2024-02-05',
            processed: '2024-02-08',
            'in-transit': '2024-02-14',
            'out-for-delivery': '',
            delivered: ''
        }
    },
    {
        trackingId: 'SHIP-2029',
        origin: 'Paris, France',
        destination: 'Madrid, Spain',
        weight: 35.0,
        service: 'Land',
        status: 'delivered',
        eta: '2024-02-19',
        currentStep: 5,
        dates: {
            ordered: '2024-02-14',
            processed: '2024-02-15',
            'in-transit': '2024-02-16',
            'out-for-delivery': '2024-02-18',
            delivered: '2024-02-19'
        }
    }
];

// ==========================================
// RATE CALCULATION CONFIGURATION
// ==========================================

const rateConfig = {
    land: {
        baseRate: 50,
        weightMultiplier: 2.5,
        distanceMultiplier: 0.08,
        estimatedDays: '3-7'
    },
    sea: {
        baseRate: 150,
        weightMultiplier: 0.8,
        distanceMultiplier: 0.02,
        estimatedDays: '7-14'
    },
    air: {
        baseRate: 200,
        weightMultiplier: 4.0,
        distanceMultiplier: 0.15,
        estimatedDays: '1-2'
    }
};

// ==========================================
// DOM ELEMENTS CACHING
// ==========================================

const dom = {
    trackingInput: document.getElementById('trackingInput'),
    searchButton: document.querySelector('.search-button'),
    progressSection: document.getElementById('progressSection'),
    shipmentTableBody: document.getElementById('shipmentTableBody'),
    weight: document.getElementById('weight'),
    distance: document.getElementById('distance'),
    serviceType: document.getElementById('serviceType'),
    calculateBtn: document.getElementById('calculateBtn'),
    rateResult: document.getElementById('rateResult'),
    shipmentDetails: document.getElementById('shipmentDetails')
};

// ==========================================
// TRACKING & PROGRESS STEPPER
// ==========================================

dom.searchButton.addEventListener('click', handleTracking);
dom.trackingInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleTracking();
});

function handleTracking() {
    const trackingId = dom.trackingInput.value.trim().toUpperCase();
    
    if (!trackingId) {
        alert('Please enter a tracking ID');
        return;
    }

    const shipment = mockShipments.find(s => s.trackingId === trackingId);
    
    if (!shipment) {
        alert(`Tracking ID "${trackingId}" not found. Try "SHIP-2024"`);
        return;
    }

    // Show progress section
    dom.progressSection.style.display = 'block';
    dom.progressSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Update progress stepper
    updateProgressStepper(shipment);
    
    // Update shipment details
    updateShipmentDetails(shipment);
}

function updateProgressStepper(shipment) {
    const steps = ['ordered', 'processed', 'in-transit', 'out-for-delivery', 'delivered'];
    
    steps.forEach((step, index) => {
        const stepElement = document.querySelector(`.step-item[data-step="${step}"]`);
        const dateElement = document.getElementById(`date-${step}`);
        
        // Remove all classes first
        stepElement.classList.remove('completed', 'active');
        
        if (index < shipment.currentStep) {
            // Completed steps
            stepElement.classList.add('completed');
            if (shipment.dates[step]) {
                dateElement.textContent = formatDate(shipment.dates[step]);
            }
        } else if (index === shipment.currentStep) {
            // Current active step
            stepElement.classList.add('active');
            dateElement.textContent = 'Today';
        } else {
            // Future steps
            dateElement.textContent = 'Pending';
        }
    });
}

function updateShipmentDetails(shipment) {
    const statusText = shipment.status.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    const html = `
        <h3>Shipment Details</h3>
        <div class="details-grid">
            <div class="detail-item">
                <strong>Tracking ID</strong>
                <span>${shipment.trackingId}</span>
            </div>
            <div class="detail-item">
                <strong>Current Status</strong>
                <span>${statusText}</span>
            </div>
            <div class="detail-item">
                <strong>Origin</strong>
                <span>${shipment.origin}</span>
            </div>
            <div class="detail-item">
                <strong>Destination</strong>
                <span>${shipment.destination}</span>
            </div>
            <div class="detail-item">
                <strong>Weight</strong>
                <span>${shipment.weight} kg</span>
            </div>
            <div class="detail-item">
                <strong>Service Type</strong>
                <span>${shipment.service}</span>
            </div>
            <div class="detail-item">
                <strong>Estimated Delivery</strong>
                <span>${formatDate(shipment.eta)}</span>
            </div>
            <div class="detail-item">
                <strong>Days in Transit</strong>
                <span>${calculateDaysInTransit(shipment.dates['in-transit'] || shipment.dates['processed'])} days</span>
            </div>
        </div>
    `;

    dom.shipmentDetails.innerHTML = html;
}

function formatDate(dateString) {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function calculateDaysInTransit(startDate) {
    if (!startDate) return 0;
    const start = new Date(startDate);
    const today = new Date();
    const days = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    return Math.max(days, 0);
}

// ==========================================
// SHIPPING RATE CALCULATOR
// ==========================================

dom.calculateBtn.addEventListener('click', calculateRate);
dom.weight.addEventListener('change', calculateRate);
dom.distance.addEventListener('change', calculateRate);
dom.serviceType.addEventListener('change', calculateRate);

function calculateRate() {
    const weight = parseFloat(dom.weight.value) || 0;
    const distance = parseFloat(dom.distance.value) || 0;
    const service = dom.serviceType.value;

    if (weight <= 0 || distance <= 0) {
        dom.rateResult.style.display = 'none';
        return;
    }

    const config = rateConfig[service];
    
    // Calculate individual charges
    const baseRate = config.baseRate;
    const weightCharge = weight * config.weightMultiplier;
    const distanceCharge = distance * config.distanceMultiplier;
    const totalRate = baseRate + weightCharge + distanceCharge;

    // Update UI with rates
    document.getElementById('baseRate').textContent = `$${baseRate.toFixed(2)}`;
    document.getElementById('weightCharge').textContent = `$${weightCharge.toFixed(2)}`;
    document.getElementById('distanceCharge').textContent = `$${distanceCharge.toFixed(2)}`;
    document.getElementById('totalRate').textContent = `$${totalRate.toFixed(2)}`;
    document.getElementById('deliveryEstimate').textContent = 
        `Estimated delivery: ${config.estimatedDays}`;

    // Show result with animation
    dom.rateResult.style.display = 'block';
}

// ==========================================
// SHIPMENT TABLE POPULATION
// =========================================

function populateShipmentTable() {
    const rows = mockShipments.map(shipment => {
        const statusClass = shipment.status.replace(' ', '-');
        return `
            <tr>
                <td><strong>${shipment.trackingId}</strong></td>
                <td>${shipment.origin}</td>
                <td>${shipment.destination}</td>
                <td>${shipment.weight} kg</td>
                <td>${shipment.service}</td>
                <td><span class="status-badge ${statusClass}">${capitalizeStatus(shipment.status)}</span></td>
                <td>${formatDate(shipment.eta)}</td>
            </tr>
        `;
    }).join('');

    dom.shipmentTableBody.innerHTML = rows;
}

function capitalizeStatus(status) {
    return status
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// ==========================================
// SMOOTH SCROLL FOR NAVIGATION
// =========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// INPUT VALIDATION
// =========================================

dom.weight.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, '');
});

dom.distance.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

dom.trackingInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase();
});

// ==========================================
// INITIALIZATION
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    // Populate shipment table on load
    populateShipmentTable();

    // Add some visual polish with IntersectionObserver for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service cards and form groups
    document.querySelectorAll('.service-card, .form-group').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Real-time calculator (auto-calculate on input)
    calculateRate();
});

// ==========================================
// KEYBOARD SHORTCUTS
// =========================================

document.addEventListener('keydown', (e) => {
    // Ctrl + / to focus search
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        dom.trackingInput.focus();
    }
    // Escape to clear search
    if (e.key === 'Escape' && dom.trackingInput.value) {
        dom.trackingInput.value = '';
        dom.progressSection.style.display = 'none';
    }
});

// ==========================================
// RESPONSIVE TABLE ENHANCEMENT
// =========================================

function handleTableResponsiveness() {
    const table = document.querySelector('.shipment-table');
    const headers = Array.from(table.querySelectorAll('th'));
    
    table.querySelectorAll('tbody tr').forEach(row => {
        const cells = row.querySelectorAll('td');
        cells.forEach((cell, index) => {
            cell.setAttribute('data-label', headers[index]?.textContent || '');
        });
    });
}

window.addEventListener('load', handleTableResponsiveness);

// ==========================================
// PERFORMANCE: LAZY LOAD IMAGES (Future Enhancement)
// =========================================

if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// ==========================================
// UTILITY: GENERATE SAMPLE TRACKING FOR DEMO
// =========================================

window.demoTracking = function() {
    const samples = mockShipments.map(s => s.trackingId);
    const random = samples[Math.floor(Math.random() * samples.length)];
    dom.trackingInput.value = random;
    handleTracking();
};

console.log('Modern Logistics SPA loaded successfully');
console.log('Try demoTracking() in console or search "SHIP-2024"');
