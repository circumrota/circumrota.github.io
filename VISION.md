# Project Circumrota

## Core Concept
The vision is to make a single page application to print price tag labels for cigars.

## General Aim
* The page will collect the barcode, the description, and the price from the user
* The page will ask how many labels should be printed

## Guiding Principles & Scope
* This is a responsive web app
* Features should be cross-browser friendly although primarily used in Chrome or Safari
* Designed for 1" x 0.5" labels on thermal/label printers
* The current label print is a Zebra ZD411

## Technical Approach
* The app should generate labels before printing
* Built with vanilla HTML, CSS, and JavaScript (no frameworks)
* Uses qrcodejs CDN library for QR code generation
* Users should see a preview of labels on screen before printing
* Price validation: Accept numeric input only (cents optional), display formatted as USD with $ symbol and 2 decimal places
* Field requirements: Barcode, description, and price are all required fields
* Default number of labels to print: 1
* Versioning: Auto-generated using UTC timestamp format (Major.Minor.YYYYMMDDHHMMSS)
* Deployment: Netlify with automated build process that injects version on each deploy
* Print layout: Each label prints on a separate page using page-break-after CSS

## Label Design
* Label dimensions: 1" width × 0.5" height
* Print implementation: 85px × 44px (pixel-based due to browser @page directive not reliably handling custom sizes)
* Brand colors: Gold (#DAB370) and Black (#000000)
* Barcode type: QR Code (scanner is Scanmatic 2D SM420N+ which supports 2D barcodes)
* Layout:
  * Barcode: Left side, approximately 0.4" × 0.4"
  * Description: Top right, primary product name
  * Price: Bottom right, prominent display
* Font sizing: To be optimized for readability at small scale
* Long descriptions will auto-truncate with ellipsis to fit label space

## Notes (Temporary - Remove for Production)
* Current testing state: QR code hidden, price hidden, description-only display
* Test defaults in form inputs:
  * Barcode: 123456
  * Description: cigar test
  * Price: 12.34
  * Quantity: 2

