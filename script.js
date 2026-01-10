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
    
    // Label info
    const labelInfo = document.createElement('div');
    labelInfo.className = 'label-info';
    
    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'label-description';
    descriptionDiv.textContent = description;
    
    const priceDiv = document.createElement('div');
    priceDiv.className = 'label-price';
    priceDiv.textContent = price;
    
    // Barcode container
    const barcodeContainer = document.createElement('div');
    barcodeContainer.className = 'barcode-container';
    const barcodeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    barcodeSvg.id = `preview-barcode-${labelNumber}`;
    barcodeContainer.appendChild(barcodeSvg);
    
    labelInfo.appendChild(descriptionDiv);
    labelInfo.appendChild(priceDiv);
    labelInfo.appendChild(barcodeContainer);
    
    labelDiv.appendChild(labelInfo);
    
    previewContainer.appendChild(labelDiv);
    
    // Generate Code 128 barcode
    JsBarcode(`#preview-barcode-${labelNumber}`, barcode, {
        format: 'CODE128',
        width: 2,
        height: 25,
        displayValue: false,
        margin: 0
    });
}

// Create print label (for actual printing)
function createPrintLabel(barcode, description, price) {
    const labelDiv = document.createElement('div');
    labelDiv.className = 'label-print';
    
    // Label info
    const labelInfo = document.createElement('div');
    labelInfo.className = 'label-info';
    
    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'label-description';
    descriptionDiv.textContent = description;
    
    const priceDiv = document.createElement('div');
    priceDiv.className = 'label-price';
    priceDiv.textContent = price;
    
    // Barcode container
    const barcodeContainer = document.createElement('div');
    barcodeContainer.className = 'barcode-container';
    const barcodeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const barcodeId = 'print-barcode-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    barcodeSvg.id = barcodeId;
    barcodeContainer.appendChild(barcodeSvg);
    
    labelInfo.appendChild(descriptionDiv);
    labelInfo.appendChild(priceDiv);
    labelInfo.appendChild(barcodeContainer);
    
    labelDiv.appendChild(labelInfo);
    
    printArea.appendChild(labelDiv);
    
    // Generate Code 128 barcode for print
    JsBarcode(`#${barcodeId}`, barcode, {
        format: 'CODE128',
        width: 1,
        height: 20,
        displayValue: false,
        margin: 0
    });
}
