/**
 * MHM IT - Factuur Tool (Invoice Generator)
 * Generates professional invoices with dynamic line items and automatic VAT calculations
 */

(function() {
    'use strict';
    
    // =============================================
    // Dutch text labels (structured for future i18n)
    // =============================================
    const TEXT = {
        nl: {
            // Form labels
            companyName: 'Bedrijfsnaam',
            address: 'Adres',
            postcodeCity: 'Postcode + Plaats',
            btwNumber: 'BTW nummer',
            kvkNumber: 'KvK nummer',
            clientName: 'Klantnaam',
            invoiceNumber: 'Factuurnummer',
            invoiceDate: 'Factuurdatum',
            dueDate: 'Vervaldatum',
            
            // Table headers
            description: 'Omschrijving',
            quantity: 'Aantal',
            unitPrice: 'Prijs per stuk',
            vatRate: 'BTW tarief',
            lineTotal: 'Totaal',
            
            // Buttons
            addLine: 'Regel toevoegen',
            remove: 'Verwijder',
            downloadPdf: 'Download als PDF',
            reset: 'Reset formulier',
            
            // Totals
            subtotal: 'Subtotaal (excl. BTW)',
            vat21: 'BTW 21%',
            grandTotal: 'Totaalbedrag (incl. BTW)',
            
            // Invoice print
            invoice: 'FACTUUR',
            from: 'Van',
            to: 'Aan',
            date: 'Datum',
            invoiceNo: 'Factuurnummer',
            paymentTerms: 'Betaaltermijn',
            days: 'dagen'
        }
    };
    
    const lang = 'nl'; // Default language
    const t = TEXT[lang]; // Text translations
    
    // =============================================
    // Initialize when DOM is ready
    // =============================================
    document.addEventListener('DOMContentLoaded', function() {
        initializeInvoiceTool();
    });
    
    // =============================================
    // Initialize Invoice Tool
    // =============================================
    function initializeInvoiceTool() {
        const addLineBtn = document.getElementById('add-line-btn');
        const resetBtn = document.getElementById('reset-btn');
        const downloadBtn = document.getElementById('download-btn');
        const lineItemsTable = document.getElementById('line-items-table');
        
        // Add first line item by default
        addLineItem();
        
        // Event listeners
        if (addLineBtn) {
            addLineBtn.addEventListener('click', addLineItem);
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', resetForm);
        }
        
        if (downloadBtn) {
            downloadBtn.addEventListener('click', generatePDF);
        }
        
        // Listen to any input changes to recalculate totals
        document.addEventListener('input', function(e) {
            if (e.target.classList.contains('line-quantity') || 
                e.target.classList.contains('line-price') || 
                e.target.classList.contains('line-vat')) {
                calculateTotals();
            }
        });
        
        // Calculate initial totals
        calculateTotals();
    }
    
    // =============================================
    // Add Line Item Row
    // =============================================
    function addLineItem() {
        const tbody = document.getElementById('line-items-body');
        const row = document.createElement('tr');
        row.className = 'line-item-row';
        
        row.innerHTML = `
            <td>
                <input type="text" class="form-input line-description" placeholder="${t.description}">
            </td>
            <td>
                <input type="number" class="form-input line-quantity" value="1" min="0" step="0.01">
            </td>
            <td>
                <input type="number" class="form-input line-price" value="0" min="0" step="0.01">
            </td>
            <td>
                <select class="form-input line-vat">
                    <option value="0">0%</option>
                    <option value="21" selected>21%</option>
                </select>
            </td>
            <td class="line-total-cell">€ 0,00</td>
            <td>
                <button type="button" class="btn-remove" title="${t.remove}">×</button>
            </td>
        `;
        
        tbody.appendChild(row);
        
        // Add remove button event listener
        const removeBtn = row.querySelector('.btn-remove');
        removeBtn.addEventListener('click', function() {
            removeLineItem(row);
        });
        
        // Recalculate totals
        calculateTotals();
    }
    
    // =============================================
    // Remove Line Item Row
    // =============================================
    function removeLineItem(row) {
        const tbody = document.getElementById('line-items-body');
        
        // Keep at least one row
        if (tbody.children.length > 1) {
            row.remove();
            calculateTotals();
        }
    }
    
    // =============================================
    // Calculate Totals
    // =============================================
    function calculateTotals() {
        const rows = document.querySelectorAll('.line-item-row');
        let subtotal = 0;
        let vat21Total = 0;
        
        rows.forEach(row => {
            const quantity = parseFloat(row.querySelector('.line-quantity').value) || 0;
            const price = parseFloat(row.querySelector('.line-price').value) || 0;
            const vatRate = parseInt(row.querySelector('.line-vat').value) || 0;
            
            const lineTotal = quantity * price;
            const lineVat = lineTotal * (vatRate / 100);
            
            // Update line total display
            row.querySelector('.line-total-cell').textContent = formatCurrency(lineTotal);
            
            // Add to subtotal
            subtotal += lineTotal;
            
            // Add to VAT total
            if (vatRate === 21) {
                vat21Total += lineVat;
            }
        });
        
        const grandTotal = subtotal + vat21Total;
        
        // Update totals display
        document.getElementById('subtotal-amount').textContent = formatCurrency(subtotal);
        document.getElementById('vat21-amount').textContent = formatCurrency(vat21Total);
        document.getElementById('total-amount').textContent = formatCurrency(grandTotal);
    }
    
    // =============================================
    // Format Currency (Euro)
    // =============================================
    function formatCurrency(amount) {
        // Use toFixed for precise decimal formatting, then replace . with ,
        return '€ ' + amount.toFixed(2).replace('.', ',');
    }
    
    // =============================================
    // Parse Currency (convert display format back to number)
    // =============================================
    function parseCurrency(currencyString) {
        // Remove € symbol, spaces, and replace comma with period
        return parseFloat(currencyString.replace('€ ', '').replace(',', '.')) || 0;
    }
    
    // =============================================
    // Reset Form
    // =============================================
    function resetForm() {
        if (confirm('Weet je zeker dat je het formulier wilt resetten? Alle gegevens gaan verloren.')) {
            // Clear all input fields
            document.querySelectorAll('.form-input').forEach(input => {
                if (input.type === 'number') {
                    input.value = input.classList.contains('line-quantity') ? '1' : '0';
                } else if (input.tagName === 'SELECT') {
                    input.value = '21';
                } else {
                    input.value = '';
                }
            });
            
            // Reset to one line item
            const tbody = document.getElementById('line-items-body');
            tbody.innerHTML = '';
            addLineItem();
            
            // Recalculate totals
            calculateTotals();
        }
    }
    
    // =============================================
    // Generate and Download Invoice as PDF
    // =============================================
    function generatePDF() {
        // Validate required fields
        const companyName = document.getElementById('company-name').value;
        const clientName = document.getElementById('client-name').value;
        const invoiceNumber = document.getElementById('invoice-number').value;
        
        if (!companyName || !clientName || !invoiceNumber) {
            alert('Vul minimaal bedrijfsnaam, klantnaam en factuurnummer in.');
            return;
        }
        
        // Check if libraries are loaded, if not use fallback
        if (typeof html2canvas === 'undefined' || typeof window.jspdf === 'undefined') {
            console.warn('PDF libraries not loaded, using fallback method');
            generatePDFFallback();
            return;
        }
        
        // Show loading message
        const downloadBtn = document.getElementById('download-btn');
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '⏳ PDF genereren...';
        downloadBtn.disabled = true;
        
        // Create invoice HTML
        const invoiceHTML = generateInvoiceHTML();
        
        // Create a temporary container to render the invoice
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '0';
        tempContainer.style.width = '800px';
        tempContainer.innerHTML = invoiceHTML;
        document.body.appendChild(tempContainer);
        
        // Wait for content to render, then convert to PDF
        setTimeout(function() {
            // The tempContainer has the full HTML, we need to find the body element inside it
            const invoiceElement = tempContainer.firstElementChild || tempContainer;
            
            html2canvas(invoiceElement, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                width: 800,
                windowWidth: 800
            }).then(function(canvas) {
                try {
                    // Get jsPDF from global scope
                    const { jsPDF } = window.jspdf;
                    
                    // Calculate dimensions (A4 size)
                    const imgWidth = 210; // A4 width in mm
                    const pageHeight = 297; // A4 height in mm
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    
                    // Create PDF
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    const imgData = canvas.toDataURL('image/png');
                    
                    let heightLeft = imgHeight;
                    let position = 0;
                    
                    // Add first page
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                    
                    // Add additional pages if content is longer than one page
                    while (heightLeft > 0) {
                        position = heightLeft - imgHeight;
                        pdf.addPage();
                        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                        heightLeft -= pageHeight;
                    }
                    
                    // Generate filename with invoice number
                    const filename = `invoice-${invoiceNumber.replace(/[^a-zA-Z0-9-]/g, '_')}.pdf`;
                    
                    // Trigger download
                    pdf.save(filename);
                    
                    // Clean up
                    document.body.removeChild(tempContainer);
                    downloadBtn.innerHTML = originalText;
                    downloadBtn.disabled = false;
                } catch (error) {
                    console.error('Error generating PDF:', error);
                    alert('Er is een fout opgetreden bij het genereren van de PDF. Probeer het opnieuw.');
                    document.body.removeChild(tempContainer);
                    downloadBtn.innerHTML = originalText;
                    downloadBtn.disabled = false;
                }
            }).catch(function(error) {
                console.error('Error with html2canvas:', error);
                alert('Er is een fout opgetreden bij het genereren van de PDF. Probeer het opnieuw.');
                document.body.removeChild(tempContainer);
                downloadBtn.innerHTML = originalText;
                downloadBtn.disabled = false;
            });
        }, 100);
    }
    
    // =============================================
    // Generate Invoice HTML for Printing
    // =============================================
    function generateInvoiceHTML() {
        // Get form values
        const companyName = document.getElementById('company-name').value;
        const companyAddress = document.getElementById('company-address').value;
        const companyPostcodeCity = document.getElementById('company-postcode-city').value;
        const companyBtw = document.getElementById('company-btw').value;
        const companyKvk = document.getElementById('company-kvk').value;
        const companyIban = document.getElementById('company-iban').value;
        const companyBank = document.getElementById('company-bank').value;
        const companyAccountHolder = document.getElementById('company-account-holder').value;
        
        const clientName = document.getElementById('client-name').value;
        const clientAddress = document.getElementById('client-address').value;
        const clientPostcodeCity = document.getElementById('client-postcode-city').value;
        
        const invoiceNumber = document.getElementById('invoice-number').value;
        const invoiceDate = document.getElementById('invoice-date').value;
        const dueDate = document.getElementById('due-date').value;
        
        // Get line items
        const rows = document.querySelectorAll('.line-item-row');
        let lineItemsHTML = '';
        
        rows.forEach(row => {
            const description = row.querySelector('.line-description').value;
            const quantity = row.querySelector('.line-quantity').value;
            const price = parseFloat(row.querySelector('.line-price').value) || 0;
            const vatRate = row.querySelector('.line-vat').value;
            const lineTotal = parseCurrency(row.querySelector('.line-total-cell').textContent);
            
            if (description) {
                lineItemsHTML += `
                    <tr>
                        <td>${description}</td>
                        <td style="text-align: center;">${quantity}</td>
                        <td style="text-align: right;">${formatCurrency(price)}</td>
                        <td style="text-align: center;">${vatRate}%</td>
                        <td style="text-align: right;"><strong>${formatCurrency(lineTotal)}</strong></td>
                    </tr>
                `;
            }
        });
        
        // Get totals
        const subtotal = document.getElementById('subtotal-amount').textContent;
        const vat21 = document.getElementById('vat21-amount').textContent;
        const grandTotal = document.getElementById('total-amount').textContent;
        
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Factuur ${invoiceNumber}</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
                        padding: 40px 50px;
                        color: #1a1a1a;
                        background: white;
                        line-height: 1.6;
                        max-width: 800px;
                        margin: 0 auto;
                    }
                    
                    /* Header Section */
                    .invoice-header {
                        margin-bottom: 35px;
                        padding-bottom: 25px;
                        border-bottom: 2px solid #e0e0e0;
                    }
                    .company-name-header {
                        font-size: 28px;
                        font-weight: 700;
                        color: #1a1a1a;
                        margin-bottom: 8px;
                        letter-spacing: -0.5px;
                    }
                    .invoice-title {
                        font-size: 18px;
                        font-weight: 600;
                        color: #3b82f6;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }
                    
                    /* Invoice Details (top right) */
                    .invoice-details {
                        text-align: right;
                        margin-bottom: 30px;
                        font-size: 13px;
                        line-height: 1.8;
                    }
                    .invoice-details div {
                        margin-bottom: 4px;
                    }
                    .invoice-details strong {
                        color: #666;
                        font-weight: 600;
                    }
                    
                    /* Parties Section */
                    .invoice-parties {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 35px;
                        gap: 30px;
                    }
                    .company-info, .client-info {
                        flex: 1;
                    }
                    .section-title {
                        font-weight: 700;
                        font-size: 11px;
                        color: #666;
                        margin-bottom: 12px;
                        text-transform: uppercase;
                        letter-spacing: 0.8px;
                        border-bottom: 1px solid #e0e0e0;
                        padding-bottom: 6px;
                    }
                    .info-line {
                        margin-bottom: 4px;
                        line-height: 1.6;
                        font-size: 13px;
                        color: #333;
                    }
                    .info-line strong {
                        font-size: 14px;
                        color: #1a1a1a;
                    }
                    
                    /* Line Items Table */
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 30px 0;
                        font-size: 13px;
                    }
                    th {
                        background: #f8f9fa;
                        padding: 12px 10px;
                        text-align: left;
                        font-weight: 600;
                        border-bottom: 2px solid #3b82f6;
                        font-size: 12px;
                        color: #1a1a1a;
                        text-transform: uppercase;
                        letter-spacing: 0.3px;
                    }
                    td {
                        padding: 12px 10px;
                        border-bottom: 1px solid #e8e8e8;
                        vertical-align: top;
                    }
                    tbody tr:last-child td {
                        border-bottom: 2px solid #e0e0e0;
                    }
                    
                    /* Totals Section */
                    .totals {
                        margin-top: 25px;
                        margin-left: auto;
                        width: 320px;
                        border-top: 2px solid #e0e0e0;
                        padding-top: 15px;
                    }
                    .total-row {
                        display: flex;
                        justify-content: space-between;
                        padding: 6px 0;
                        font-size: 13px;
                    }
                    .total-row.grand {
                        border-top: 2px solid #3b82f6;
                        margin-top: 12px;
                        padding-top: 12px;
                        font-size: 17px;
                        font-weight: 700;
                        color: #1a1a1a;
                    }
                    
                    /* Payment Details Section */
                    .payment-section {
                        margin-top: 40px;
                        padding: 20px;
                        background: #f8f9fa;
                        border: 1px solid #e0e0e0;
                        border-radius: 6px;
                    }
                    .payment-title {
                        font-weight: 700;
                        font-size: 14px;
                        color: #1a1a1a;
                        margin-bottom: 15px;
                        text-transform: uppercase;
                        letter-spacing: 0.8px;
                        border-bottom: 2px solid #3b82f6;
                        padding-bottom: 8px;
                    }
                    .payment-details {
                        display: grid;
                        gap: 8px;
                        font-size: 13px;
                    }
                    .payment-row {
                        display: flex;
                        padding: 4px 0;
                    }
                    .payment-label {
                        font-weight: 600;
                        color: #666;
                        min-width: 140px;
                    }
                    .payment-value {
                        color: #1a1a1a;
                        font-weight: 500;
                    }
                    
                    /* Separator */
                    .section-separator {
                        margin: 30px 0;
                        border: none;
                        border-top: 1px solid #e0e0e0;
                    }
                    
                    @media print {
                        body { 
                            padding: 0.6in 0.8in;
                            max-width: 7.5in;
                        }
                        .no-print { 
                            display: none; 
                        }
                    }
                </style>
            </head>
            <body>
                <!-- Header with Company Name and Invoice Title -->
                <div class="invoice-header">
                    <div class="company-name-header">${companyName}</div>
                    <div class="invoice-title">${t.invoice}</div>
                </div>
                
                <!-- Invoice Details (Invoice Number, Date, Due Date) -->
                <div class="invoice-details">
                    <div><strong>${t.invoiceNo}:</strong> ${invoiceNumber}</div>
                    ${invoiceDate ? `<div><strong>${t.date}:</strong> ${invoiceDate}</div>` : ''}
                    ${dueDate ? `<div><strong>${t.paymentTerms}:</strong> ${dueDate}</div>` : ''}
                </div>
                
                <!-- Company and Client Information -->
                <div class="invoice-parties">
                    <div class="company-info">
                        <div class="section-title">${t.from}</div>
                        <div class="info-line"><strong>${companyName}</strong></div>
                        ${companyAddress ? `<div class="info-line">${companyAddress}</div>` : ''}
                        ${companyPostcodeCity ? `<div class="info-line">${companyPostcodeCity}</div>` : ''}
                        ${companyBtw ? `<div class="info-line">BTW: ${companyBtw}</div>` : ''}
                        ${companyKvk ? `<div class="info-line">KvK: ${companyKvk}</div>` : ''}
                    </div>
                    
                    <div class="client-info">
                        <div class="section-title">${t.to}</div>
                        <div class="info-line"><strong>${clientName}</strong></div>
                        ${clientAddress ? `<div class="info-line">${clientAddress}</div>` : ''}
                        ${clientPostcodeCity ? `<div class="info-line">${clientPostcodeCity}</div>` : ''}
                    </div>
                </div>
                
                <hr class="section-separator">
                
                <!-- Line Items Table -->
                <table>
                    <thead>
                        <tr>
                            <th>${t.description}</th>
                            <th style="text-align: center;">${t.quantity}</th>
                            <th style="text-align: right;">${t.unitPrice}</th>
                            <th style="text-align: center;">${t.vatRate}</th>
                            <th style="text-align: right;">${t.lineTotal}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${lineItemsHTML}
                    </tbody>
                </table>
                
                <!-- Totals -->
                <div class="totals">
                    <div class="total-row">
                        <span>${t.subtotal}:</span>
                        <span>${subtotal}</span>
                    </div>
                    <div class="total-row">
                        <span>${t.vat21}:</span>
                        <span>${vat21}</span>
                    </div>
                    <div class="total-row grand">
                        <span>${t.grandTotal}:</span>
                        <span>${grandTotal}</span>
                    </div>
                </div>
                
                <!-- Payment Details Section -->
                ${(companyIban || companyBank || companyAccountHolder) ? `
                <div class="payment-section">
                    <div class="payment-title">Betaalgegevens / Payment Details</div>
                    <div class="payment-details">
                        ${companyIban ? `
                        <div class="payment-row">
                            <span class="payment-label">IBAN:</span>
                            <span class="payment-value">${companyIban}</span>
                        </div>` : ''}
                        ${companyBank ? `
                        <div class="payment-row">
                            <span class="payment-label">Bank:</span>
                            <span class="payment-value">${companyBank}</span>
                        </div>` : ''}
                        ${companyAccountHolder ? `
                        <div class="payment-row">
                            <span class="payment-label">Rekeninghouder:</span>
                            <span class="payment-value">${companyAccountHolder}</span>
                        </div>` : ''}
                    </div>
                </div>
                ` : ''}
            </body>
            </html>
        `;
    }
    
    // =============================================
    // Fallback PDF Generation (Print-based)
    // =============================================
    function generatePDFFallback() {
        const invoiceNumber = document.getElementById('invoice-number').value;
        
        // Create invoice HTML
        const invoiceHTML = generateInvoiceHTML();
        
        // Create filename for the invoice
        const filename = `invoice-${invoiceNumber.replace(/[^a-zA-Z0-9-]/g, '_')}`;
        
        // Open in new window for printing/saving
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        
        if (!printWindow) {
            alert('Pop-up geblokkeerd. Sta pop-ups toe voor deze site om de factuur te downloaden.');
            return;
        }
        
        // Write content to the new window
        printWindow.document.open();
        printWindow.document.write(invoiceHTML);
        printWindow.document.close();
        
        // Update the document title to match the filename (will be suggested when saving)
        printWindow.document.title = filename;
        
        // Wait for content to load before triggering print
        printWindow.addEventListener('load', function() {
            setTimeout(function() {
                printWindow.focus();
                // window.print() will show save-to-PDF option on most browsers
                // The filename will be suggested based on document.title
                printWindow.print();
            }, 250);
        });
    }
    
})();
