// Form and UI elements
const labelForm = document.getElementById('labelForm');
const printArea = document.getElementById('printArea');

// Form submission handler
labelForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const barcodeEl = document.getElementById('barcode');
    let barcode = barcodeEl.value.trim();
    // Enforce 20-character limit (keeps input and printed value consistent)
    if (barcode.length > 20) {
        barcode = barcode.slice(0, 20);
        barcodeEl.value = barcode;
    }
    const description = document.getElementById('description').value.trim();
    const priceInput = document.getElementById('price').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    
    // Format price
    const price = formatPrice(priceInput);
    
    // Clear previous previews
    printArea.innerHTML = '';

    // Generate print-only labels
    for (let i = 0; i < quantity; i++) {
        createPrintLabel(barcode, description, price);
    }
    // Open print dialog after generating labels
    window.print();
});

// Format price as USD
function formatPrice(price) {
    const numPrice = parseFloat(price);
    return '$' + numPrice.toFixed(2);
}

// preview removed — print-only workflow

// Create print label (for actual printing)
function createPrintLabel(barcode, description, price) {
    const labelDiv = document.createElement('div');
    labelDiv.className = 'label-print';

    // Barcode wrapper
    const barcodeWrap = document.createElement('div');
    barcodeWrap.className = 'barcode-wrap';
    const barcodeCanvas = document.createElement('canvas');
    const barcodeId = 'print-barcode-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    barcodeCanvas.id = barcodeId;
    barcodeWrap.appendChild(barcodeCanvas);
    labelDiv.appendChild(barcodeWrap);

    // Description wrapper (below barcode)
    const descWrap = document.createElement('div');
    descWrap.className = 'desc-wrap';
    const descDiv = document.createElement('div');
    descDiv.className = 'label-description';
    descDiv.textContent = description || '';
    descWrap.appendChild(descDiv);
    labelDiv.appendChild(descWrap);

    printArea.appendChild(labelDiv);

    // Generate Code 128 barcode for print
    try {
        // Render the canvas at device pixel ratio for crisp output
        const visibleWidth = 120; // visible barcode width in CSS pixels
        const visibleHeight = 25; // visible barcode height in CSS pixels
        const dpr = window.devicePixelRatio || 1;
        barcodeCanvas.style.width = visibleWidth + 'px';
        barcodeCanvas.style.height = visibleHeight + 'px';
        barcodeCanvas.width = Math.round(visibleWidth * dpr);
        barcodeCanvas.height = Math.round(visibleHeight * dpr);

        const modules = 11 * String(barcode).length + 35;
        let moduleWidth = Math.floor(barcodeCanvas.width / modules); // in canvas pixels
        if (moduleWidth < 1) moduleWidth = 1;

        JsBarcode(barcodeCanvas, barcode, {
            format: 'CODE128',
            width: moduleWidth,
            height: barcodeCanvas.height,
            displayValue: false,
            margin: 2
        });
    } catch (e) {
        console.error('Barcode generation failed:', e);
        labelDiv.textContent = barcode;
    }
}
