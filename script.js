// Form and UI elements
const labelForm = document.getElementById('labelForm');
const previewSection = document.getElementById('previewSection');
const previewContainer = document.getElementById('previewContainer');
const printArea = document.getElementById('printArea');
const printBtn = document.getElementById('printBtn');

// Form submission handler
labelForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const barcode = document.getElementById('barcode').value.trim();
    const description = document.getElementById('description').value.trim();
    const priceInput = document.getElementById('price').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    
    // Format price
    const price = formatPrice(priceInput);
    
    // Clear previous previews
    previewContainer.innerHTML = '';
    printArea.innerHTML = '';
    
    // Generate labels
    for (let i = 0; i < quantity; i++) {
        createPreviewLabel(barcode, description, price, i + 1);
        createPrintLabel(barcode, description, price);
    }
    
    // Show preview section
    previewSection.style.display = 'block';
    
    // Scroll to preview
    previewSection.scrollIntoView({ behavior: 'smooth' });
});

// Print button handler
printBtn.addEventListener('click', () => {
    window.print();
});

// Format price as USD
function formatPrice(price) {
    const numPrice = parseFloat(price);
    return '$' + numPrice.toFixed(2);
}

// Create preview label (for screen display)
function createPreviewLabel(barcode, description, price, labelNumber) {
    const labelDiv = document.createElement('div');
    labelDiv.className = 'label-preview';
    
    // QR Code container
    const qrContainer = document.createElement('div');
    qrContainer.className = 'qr-container';
    qrContainer.id = `preview-qr-${labelNumber}`;
    
    // Label info
    const labelInfo = document.createElement('div');
    labelInfo.className = 'label-info';
    
    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'label-description';
    descriptionDiv.textContent = description;
    
    const priceDiv = document.createElement('div');
    priceDiv.className = 'label-price';
    priceDiv.textContent = price;
    
    labelInfo.appendChild(descriptionDiv);
    labelInfo.appendChild(priceDiv);
    
    labelDiv.appendChild(qrContainer);
    labelDiv.appendChild(labelInfo);
    
    previewContainer.appendChild(labelDiv);
    
    // Generate QR code
    new QRCode(qrContainer, {
        text: barcode,
        width: 80,
        height: 80,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
    });
}

// Create print label (for actual printing)
function createPrintLabel(barcode, description, price) {
    const labelDiv = document.createElement('div');
    labelDiv.className = 'label-print';
    
    // QR Code container
    const qrContainer = document.createElement('div');
    qrContainer.className = 'qr-container';
    const qrId = 'print-qr-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    qrContainer.id = qrId;
    
    // Label info
    const labelInfo = document.createElement('div');
    labelInfo.className = 'label-info';
    
    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'label-description';
    descriptionDiv.textContent = description;
    
    const priceDiv = document.createElement('div');
    priceDiv.className = 'label-price';
    priceDiv.textContent = price;
    
    labelInfo.appendChild(descriptionDiv);
    labelInfo.appendChild(priceDiv);
    
    labelDiv.appendChild(qrContainer);
    labelDiv.appendChild(labelInfo);
    
    printArea.appendChild(labelDiv);
    
    // Generate QR code for print
    new QRCode(qrContainer, {
        text: barcode,
        width: 38,
        height: 38,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
    });
}
