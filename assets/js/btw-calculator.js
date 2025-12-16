/**
 * MHM IT - BTW Calculator
 * Simple VAT calculator with instant updates
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        const amountInput = document.getElementById('btw-amount');
        const rateSelect = document.getElementById('btw-rate');

        function calculate() {
            const amount = parseFloat(amountInput.value) || 0;
            const rate = parseFloat(rateSelect.value) || 0;

            const excl = amount;
            const vat = excl * (rate / 100);
            const incl = excl + vat;

            document.getElementById('result-excl').textContent = formatCurrency(excl);
            document.getElementById('result-vat').textContent = formatCurrency(vat);
            document.getElementById('result-incl').textContent = formatCurrency(incl);
        }

        function formatCurrency(value) {
            return '€ ' + value.toFixed(2).replace('.', ',');
        }

        amountInput.addEventListener('input', calculate);
        rateSelect.addEventListener('change', calculate);

        calculate();
    });
})();
