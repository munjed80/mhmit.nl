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
            const invoiceElement = tempContainer.querySelector('body');
            
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
                        font-family: Arial, sans-serif;
                        padding: 40px;
                        color: #333;
                        background: white;
                    }
                    .invoice-header {
                        margin-bottom: 40px;
                        border-bottom: 3px solid #3b82f6;
                        padding-bottom: 20px;
                    }
                    .invoice-title {
                        font-size: 32px;
                        font-weight: bold;
                        color: #3b82f6;
                        margin-bottom: 10px;
                    }
                    .invoice-meta {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 20px;
                    }
                    .company-info, .client-info {
                        width: 48%;
                    }
                    .section-title {
                        font-weight: bold;
                        font-size: 14px;
                        color: #666;
                        margin-bottom: 10px;
                        text-transform: uppercase;
                    }
                    .info-line {
                        margin-bottom: 5px;
                        line-height: 1.6;
                    }
                    .invoice-details {
                        text-align: right;
                        margin-bottom: 30px;
                    }
                    .invoice-details div {
                        margin-bottom: 5px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 30px 0;
                    }
                    th {
                        background: #f3f4f6;
                        padding: 12px;
                        text-align: left;
                        font-weight: bold;
                        border-bottom: 2px solid #3b82f6;
                    }
                    td {
                        padding: 10px 12px;
                        border-bottom: 1px solid #e5e7eb;
                    }
                    .totals {
                        margin-top: 30px;
                        margin-left: auto;
                        width: 300px;
                    }
                    .total-row {
                        display: flex;
                        justify-content: space-between;
                        padding: 8px 0;
                    }
                    .total-row.grand {
                        border-top: 2px solid #3b82f6;
                        margin-top: 10px;
                        padding-top: 12px;
                        font-size: 18px;
                        font-weight: bold;
                    }
                    @media print {
                        body { padding: 20px; }
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="invoice-header">
                    <div class="invoice-title">${t.invoice}</div>
                </div>
                
                <div class="invoice-meta">
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
                
                <div class="invoice-details">
                    <div><strong>${t.invoiceNo}:</strong> ${invoiceNumber}</div>
                    ${invoiceDate ? `<div><strong>${t.date}:</strong> ${invoiceDate}</div>` : ''}
                    ${dueDate ? `<div><strong>${t.paymentTerms}:</strong> ${dueDate}</div>` : ''}
                </div>
                
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
