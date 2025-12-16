/**
 * MHM IT - Offerte Tool (Quote Generator)
 * Creates professional quotes with dynamic line items and PDF export
 */

(function() {
    'use strict';

    const TEXT = {
        nl: {
            companyName: 'Bedrijfsnaam',
            address: 'Adres',
            kvk: 'KvK',
            clientName: 'Klantnaam',
            quoteNumber: 'Offertenummer',
            quoteDate: 'Offertedatum',
            validUntil: 'Geldig tot',
            description: 'Omschrijving',
            quantity: 'Aantal',
            unitPrice: 'Prijs',
            vatRate: 'BTW',
            lineTotal: 'Totaal',
            addLine: 'Regel toevoegen',
            remove: 'Verwijder',
            downloadPdf: 'Download als PDF',
            reset: 'Reset formulier',
            subtotal: 'Subtotaal (excl. BTW)',
            vat: 'BTW',
            grandTotal: 'Totaalbedrag (incl. BTW)',
            quote: 'OFFERTE',
            from: 'Van',
            to: 'Aan',
            date: 'Datum',
            validThrough: 'Geldig tot'
        }
    };

    const t = TEXT.nl;

    document.addEventListener('DOMContentLoaded', function() {
        initializeQuoteTool();
    });

    function initializeQuoteTool() {
        const addLineBtn = document.getElementById('add-line-btn');
        const resetBtn = document.getElementById('reset-btn');
        const downloadBtn = document.getElementById('download-btn');

        addLineItem();

        if (addLineBtn) {
            addLineBtn.addEventListener('click', addLineItem);
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', resetForm);
        }

        if (downloadBtn) {
            downloadBtn.addEventListener('click', generatePDF);
        }

        document.addEventListener('input', function(e) {
            if (
                e.target.classList.contains('line-quantity') ||
                e.target.classList.contains('line-price') ||
                e.target.classList.contains('line-vat')
            ) {
                calculateTotals();
            }
        });

        calculateTotals();
    }

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
                    <option value="21" selected>21%</option>
                    <option value="9">9%</option>
                    <option value="0">0%</option>
                </select>
            </td>
            <td class="line-total-cell">€ 0,00</td>
            <td>
                <button type="button" class="btn-remove" title="${t.remove}">×</button>
            </td>
        `;

        tbody.appendChild(row);

        const removeBtn = row.querySelector('.btn-remove');
        removeBtn.addEventListener('click', function() {
            removeLineItem(row);
        });

        calculateTotals();
    }

    function removeLineItem(row) {
        const tbody = document.getElementById('line-items-body');

        if (tbody.children.length > 1) {
            row.remove();
            calculateTotals();
        }
    }

    function calculateTotals() {
        const rows = document.querySelectorAll('.line-item-row');
        let subtotal = 0;
        let vatTotal = 0;

        rows.forEach(row => {
            const quantity = parseFloat(row.querySelector('.line-quantity').value) || 0;
            const price = parseFloat(row.querySelector('.line-price').value) || 0;
            const vatRate = parseFloat(row.querySelector('.line-vat').value) || 0;

            const lineTotal = quantity * price;
            const lineVat = lineTotal * (vatRate / 100);

            row.querySelector('.line-total-cell').textContent = formatCurrency(lineTotal);

            subtotal += lineTotal;
            vatTotal += lineVat;
        });

        const grandTotal = subtotal + vatTotal;

        document.getElementById('subtotal-amount').textContent = formatCurrency(subtotal);
        document.getElementById('vat-amount').textContent = formatCurrency(vatTotal);
        document.getElementById('total-amount').textContent = formatCurrency(grandTotal);
    }

    function formatCurrency(amount) {
        return '€ ' + amount.toFixed(2).replace('.', ',');
    }

    function parseCurrency(currencyString) {
        return parseFloat(currencyString.replace('€ ', '').replace(',', '.')) || 0;
    }

    function resetForm() {
        if (confirm('Weet je zeker dat je het formulier wilt resetten? Alle gegevens gaan verloren.')) {
            document.querySelectorAll('.form-input').forEach(input => {
                if (input.type === 'number') {
                    input.value = input.classList.contains('line-quantity') ? '1' : '0';
                } else if (input.tagName === 'SELECT') {
                    input.value = '21';
                } else {
                    input.value = '';
                }
            });

            const tbody = document.getElementById('line-items-body');
            tbody.innerHTML = '';
            addLineItem();
            calculateTotals();
        }
    }

    function generatePDF() {
        const companyName = document.getElementById('company-name').value;
        const clientName = document.getElementById('client-name').value;
        const quoteNumber = document.getElementById('quote-number').value;

        if (!companyName || !clientName || !quoteNumber) {
            alert('Vul minimaal bedrijfsnaam, klantnaam en offertenummer in.');
            return;
        }

        if (typeof html2canvas === 'undefined' || typeof window.jspdf === 'undefined') {
            generatePDFFallback();
            return;
        }

        const downloadBtn = document.getElementById('download-btn');
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '⏳ PDF genereren...';
        downloadBtn.disabled = true;

        const quoteHTML = generateQuoteHTML();
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '0';
        tempContainer.style.width = '800px';
        tempContainer.innerHTML = quoteHTML;
        document.body.appendChild(tempContainer);

        setTimeout(function() {
            const quoteElement = tempContainer.firstElementChild || tempContainer;

            html2canvas(quoteElement, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                width: 800,
                windowWidth: 800
            }).then(function(canvas) {
                const { jsPDF } = window.jspdf;
                const imgWidth = 210;
                const pageHeight = 297;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                const pdf = new jsPDF('p', 'mm', 'a4');
                const imgData = canvas.toDataURL('image/png');

                let heightLeft = imgHeight;
                let position = 0;

                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft > 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                const filename = `offerte-${quoteNumber.replace(/[^a-zA-Z0-9-]/g, '_')}.pdf`;
                pdf.save(filename);

                document.body.removeChild(tempContainer);
                downloadBtn.innerHTML = originalText;
                downloadBtn.disabled = false;
            }).catch(function() {
                document.body.removeChild(tempContainer);
                downloadBtn.innerHTML = originalText;
                downloadBtn.disabled = false;
                alert('Er is een fout opgetreden bij het genereren van de PDF. Probeer het opnieuw.');
            });
        }, 100);
    }

    function generateQuoteHTML() {
        const companyName = document.getElementById('company-name').value;
        const companyAddress = document.getElementById('company-address').value;
        const companyKvk = document.getElementById('company-kvk').value;

        const clientName = document.getElementById('client-name').value;
        const clientAddress = document.getElementById('client-address').value;

        const quoteNumber = document.getElementById('quote-number').value;
        const quoteDate = document.getElementById('quote-date').value;
        const validUntil = document.getElementById('quote-valid-until').value;

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

        const subtotal = document.getElementById('subtotal-amount').textContent;
        const vat = document.getElementById('vat-amount').textContent;
        const grandTotal = document.getElementById('total-amount').textContent;

        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Offerte ${quoteNumber}</title>
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
                    .quote-header {
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
                    .quote-title {
                        font-size: 18px;
                        font-weight: 600;
                        color: #3b82f6;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }
                    .quote-details {
                        text-align: right;
                        margin-bottom: 30px;
                        font-size: 13px;
                        line-height: 1.8;
                    }
                    .quote-details div { margin-bottom: 4px; }
                    .quote-details strong { color: #666; font-weight: 600; }
                    .quote-parties {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 35px;
                        gap: 30px;
                    }
                    .company-info, .client-info { flex: 1; }
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
                    .info-line strong { font-size: 14px; color: #1a1a1a; }
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
                    tbody tr:last-child td { border-bottom: 2px solid #e0e0e0; }
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
                    @media print {
                        body { padding: 0.6in 0.8in; max-width: 7.5in; }
                    }
                </style>
            </head>
            <body>
                <div class="quote-header">
                    <div class="company-name-header">${companyName}</div>
                    <div class="quote-title">${t.quote}</div>
                </div>

                <div class="quote-details">
                    <div><strong>Offertenummer:</strong> ${quoteNumber}</div>
                    ${quoteDate ? `<div><strong>${t.date}:</strong> ${quoteDate}</div>` : ''}
                    ${validUntil ? `<div><strong>${t.validThrough}:</strong> ${validUntil}</div>` : ''}
                </div>

                <div class="quote-parties">
                    <div class="company-info">
                        <div class="section-title">${t.from}</div>
                        <div class="info-line"><strong>${companyName}</strong></div>
                        ${companyAddress ? `<div class="info-line">${companyAddress}</div>` : ''}
                        ${companyKvk ? `<div class="info-line">KvK: ${companyKvk}</div>` : ''}
                    </div>

                    <div class="client-info">
                        <div class="section-title">${t.to}</div>
                        <div class="info-line"><strong>${clientName}</strong></div>
                        ${clientAddress ? `<div class="info-line">${clientAddress}</div>` : ''}
                    </div>
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
                        <span>${t.vat}:</span>
                        <span>${vat}</span>
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

    function generatePDFFallback() {
        const quoteNumber = document.getElementById('quote-number').value;
        const quoteHTML = generateQuoteHTML();
        const filename = `offerte-${quoteNumber.replace(/[^a-zA-Z0-9-]/g, '_')}`;

        const printWindow = window.open('', '_blank', 'width=800,height=600');

        if (!printWindow) {
            alert('Pop-up geblokkeerd. Sta pop-ups toe voor deze site om de offerte te downloaden.');
            return;
        }

        printWindow.document.open();
        printWindow.document.write(quoteHTML);
        printWindow.document.close();
        printWindow.document.title = filename;

        printWindow.addEventListener('load', function() {
            setTimeout(function() {
                printWindow.focus();
                printWindow.print();
            }, 250);
        });
    }
})();
