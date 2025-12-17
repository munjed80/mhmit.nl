/**
 * MHM IT - BTW Calculator
 * Simple VAT calculator with instant updates
 */

(function() {
    'use strict';

    const STORAGE_KEY = 'mhmit_btw_state_v1';
    const BACKUP_KEY = 'mhmit_btw_state_backup';
    let isRestoringState = false;

    document.addEventListener('DOMContentLoaded', function() {
        const amountInput = document.getElementById('btw-amount');
        const rateSelect = document.getElementById('btw-rate');
        const resetBtn = document.getElementById('btw-reset');
        const undoBtn = document.getElementById('btw-undo');
        const resetModal = createResetModal(performReset);

        restoreState(amountInput, rateSelect);

        function calculate() {
            const amount = parseFloat(amountInput.value) || 0;
            const rate = parseFloat(rateSelect.value) || 0;

            const excl = amount;
            const vat = excl * (rate / 100);
            const incl = excl + vat;

            document.getElementById('result-excl').textContent = formatCurrency(excl);
            document.getElementById('result-vat').textContent = formatCurrency(vat);
            document.getElementById('result-incl').textContent = formatCurrency(incl);

            const result = { amount: excl, vat, total: incl, rate };
            updateStatus(result);
            saveState(amountInput, rateSelect, result);
        }

        function formatCurrency(value) {
            return '€ ' + value.toFixed(2).replace('.', ',');
        }

        amountInput.addEventListener('input', calculate);
        rateSelect.addEventListener('change', calculate);

        if (resetBtn) {
            resetBtn.addEventListener('click', () => resetModal.open());
        }

        if (undoBtn) {
            undoBtn.addEventListener('click', () => restoreBackupState(amountInput, rateSelect));
        }

        calculate();
    });

    function saveState(amountInput, rateSelect, totals = {}) {
        if (isRestoringState) return;
        try {
            const data = {
                amount: amountInput?.value || '',
                rate: rateSelect?.value || '21',
                totals
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
            console.warn('Kon BTW staat niet opslaan', error);
        }
    }

    function restoreState(amountInput, rateSelect) {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (!saved) return;
            const data = JSON.parse(saved);
            isRestoringState = true;
            if (amountInput && data.amount) amountInput.value = data.amount;
            if (rateSelect && data.rate) rateSelect.value = data.rate;
            isRestoringState = false;
        } catch (error) {
            console.warn('Geen BTW staat gevonden', error);
        }
    }

    function backupState(amountInput, rateSelect) {
        try {
            const data = {
                amount: amountInput?.value || '',
                rate: rateSelect?.value || '21'
            };
            localStorage.setItem(BACKUP_KEY, JSON.stringify(data));
        } catch (error) {
            console.warn('Kon backup niet opslaan', error);
        }
    }

    function restoreBackupState(amountInput, rateSelect) {
        try {
            const saved = localStorage.getItem(BACKUP_KEY);
            if (!saved) return;
            const data = JSON.parse(saved);
            isRestoringState = true;
            if (amountInput && typeof data.amount !== 'undefined') amountInput.value = data.amount;
            if (rateSelect && data.rate) rateSelect.value = data.rate;
            isRestoringState = false;
            amountInput.dispatchEvent(new Event('input'));
        } catch (error) {
            console.warn('Geen backup om te herstellen', error);
        }
    }

    function updateStatus(result = {}) {
        const statusEl = document.getElementById('btw-status');
        if (!statusEl) return;
        const amount = result.amount || 0;
        const rate = result.rate || 0;
        let message = 'Voer een bedrag in en kies het BTW tarief.';
        let css = 'info';

        if (amount > 100000) {
            message = 'Waarschuwing: bedrag is erg hoog. Controleer de invoer.';
            css = 'warning';
        } else if (rate === 0 && amount > 0) {
            message = 'Info: tarief staat op 0%. Klopt dat voor deze berekening?';
            css = 'info';
        } else if (amount > 0) {
            message = 'Succes: berekening is up-to-date en offline beschikbaar.';
            css = 'success';
        }

        statusEl.className = `form-status ${css}`;
        statusEl.innerHTML = `<span class="status-dot"></span><span>${message}</span>`;
    }

    function createResetModal(onConfirm) {
        const modal = document.createElement('div');
        modal.className = 'modal-backdrop';
        modal.innerHTML = `
            <div class="modal-card">
                <h3>Berekening resetten?</h3>
                <p>We bewaren de huidige waarden zodat je ze kunt terughalen.</p>
                <div class="modal-actions">
                    <button type="button" class="btn btn-ghost" data-cancel>Annuleer</button>
                    <button type="button" class="btn btn-primary" data-confirm>Reset</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const close = () => modal.classList.remove('show');
        modal.querySelector('[data-cancel]').addEventListener('click', close);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) close();
        });
        modal.querySelector('[data-confirm]').addEventListener('click', () => {
            close();
            onConfirm();
        });

        return {
            open: () => modal.classList.add('show'),
            close
        };
    }

    function performReset() {
        const amountInput = document.getElementById('btw-amount');
        const rateSelect = document.getElementById('btw-rate');
        if (!amountInput || !rateSelect) return;
        backupState(amountInput, rateSelect);
        amountInput.value = '';
        rateSelect.value = '21';
        amountInput.dispatchEvent(new Event('input'));
    }

})();
