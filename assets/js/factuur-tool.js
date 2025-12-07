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
            vat9: 'BTW 9%',
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
    // Generate PDF / Print Invoice
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
        
        // Get jsPDF from the global scope
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Get form values
        const companyAddress = document.getElementById('company-address').value;
        const companyPostcodeCity = document.getElementById('company-postcode-city').value;
        const companyBtw = document.getElementById('company-btw').value;
        const companyKvk = document.getElementById('company-kvk').value;
        
        const clientAddress = document.getElementById('client-address').value;
        const clientPostcodeCity = document.getElementById('client-postcode-city').value;
        
        const invoiceDate = document.getElementById('invoice-date').value;
        const dueDate = document.getElementById('due-date').value;
        
        // Set document properties
        doc.setProperties({
            title: 'Factuur ' + invoiceNumber,
            subject: 'Factuur',
            author: companyName,
            keywords: 'factuur, invoice',
            creator: 'MHM IT Factuur Generator'
        });
        
        // Set font
        doc.setFont('helvetica');
        
        // Header
        doc.setFontSize(24);
        doc.setTextColor(59, 130, 246); // Blue color
        doc.text('FACTUUR', 20, 25);
        
        // Invoice number and date
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('Factuurnummer: ' + invoiceNumber, 150, 25);
        if (invoiceDate) {
            doc.text('Datum: ' + invoiceDate, 150, 30);
        }
        if (dueDate) {
            doc.text('Vervaldatum: ' + dueDate, 150, 35);
        }
        
        // Company info
        let yPos = 50;
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('VAN', 20, yPos);
        yPos += 5;
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(11);
        doc.text(companyName, 20, yPos);
        yPos += 5;
        
        if (companyAddress) {
            doc.text(companyAddress, 20, yPos);
            yPos += 5;
        }
        if (companyPostcodeCity) {
            doc.text(companyPostcodeCity, 20, yPos);
            yPos += 5;
        }
        if (companyBtw) {
            doc.text('BTW: ' + companyBtw, 20, yPos);
            yPos += 5;
        }
        if (companyKvk) {
            doc.text('KvK: ' + companyKvk, 20, yPos);
            yPos += 5;
        }
        
        // Client info
        yPos = 50;
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('AAN', 120, yPos);
        yPos += 5;
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(11);
        doc.text(clientName, 120, yPos);
        yPos += 5;
        
        if (clientAddress) {
            doc.text(clientAddress, 120, yPos);
            yPos += 5;
        }
        if (clientPostcodeCity) {
            doc.text(clientPostcodeCity, 120, yPos);
            yPos += 5;
        }
        
        // Table header
        yPos = 95;
        doc.setFillColor(243, 244, 246);
        doc.rect(20, yPos, 170, 8, 'F');
        
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'bold');
        doc.text('Omschrijving', 22, yPos + 5);
        doc.text('Aantal', 110, yPos + 5);
        doc.text('Prijs', 135, yPos + 5);
        doc.text('BTW', 155, yPos + 5);
        doc.text('Totaal', 175, yPos + 5);
        
        // Line items
        yPos += 12;
        doc.setFont('helvetica', 'normal');
        const rows = document.querySelectorAll('.line-item-row');
        
        rows.forEach(row => {
            const description = row.querySelector('.line-description').value;
            const quantity = row.querySelector('.line-quantity').value;
            const price = parseFloat(row.querySelector('.line-price').value) || 0;
            const vatRate = row.querySelector('.line-vat').value;
            const lineTotal = parseCurrency(row.querySelector('.line-total-cell').textContent);
            
            if (description) {
                // Check if we need a new page
                if (yPos > 250) {
                    doc.addPage();
                    yPos = 20;
                }
                
                doc.text(description.substring(0, 40), 22, yPos);
                doc.text(quantity, 110, yPos);
                doc.text(formatCurrency(price), 135, yPos);
                doc.text(vatRate + '%', 155, yPos);
                doc.text(formatCurrency(lineTotal), 175, yPos);
                yPos += 7;
            }
        });
        
        // Totals
        yPos += 10;
        const subtotal = document.getElementById('subtotal-amount').textContent;
        const vat21 = document.getElementById('vat21-amount').textContent;
        const grandTotal = document.getElementById('total-amount').textContent;
        
        doc.setFont('helvetica', 'normal');
        doc.text('Subtotaal (excl. BTW):', 130, yPos);
        doc.text(subtotal, 175, yPos);
        yPos += 7;
        
        doc.text('BTW 21%:', 130, yPos);
        doc.text(vat21, 175, yPos);
        yPos += 10;
        
        // Grand total with line
        doc.setLineWidth(0.5);
        doc.setDrawColor(59, 130, 246);
        doc.line(130, yPos - 3, 190, yPos - 3);
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text('Totaalbedrag (incl. BTW):', 130, yPos + 2);
        doc.text(grandTotal, 175, yPos + 2);
        
        // Save the PDF
        doc.save('Factuur_' + invoiceNumber + '.pdf');
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
    
})();
