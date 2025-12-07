/**
 * MHM IT - Cookie Consent Banner
 * GDPR/AVG Compliant Cookie Consent System
 */

(function() {
    'use strict';
    
    // Cookie consent configuration
    const COOKIE_NAME = 'mhmit_cookie_consent';
    const COOKIE_EXPIRY_DAYS = 365;
    
    // Translations
    const translations = {
        en: {
            message: 'We use cookies to improve your browsing experience and analyze website traffic.',
            acceptButton: 'Accept',
            policyLink: 'Cookie Policy'
        },
        nl: {
            message: 'We gebruiken cookies om uw browse-ervaring te verbeteren en websiteverkeer te analyseren.',
            acceptButton: 'Accepteren',
            policyLink: 'Cookiebeleid'
        }
    };
    
    // Get current language
    function getCurrentLanguage() {
        return localStorage.getItem('mhmit-lang') || 'en';
    }
    
    // Set cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
    
    // Get cookie
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    // Check if consent has been given
    function hasConsent() {
        return getCookie(COOKIE_NAME) === 'accepted';
    }
    
    // Create and show cookie banner
    function showCookieBanner() {
        // Don't show if already accepted
        if (hasConsent()) {
            loadTrackingScripts();
            return;
        }
        
        const lang = getCurrentLanguage();
        const t = translations[lang];
        
        // Create banner HTML
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-consent-container">
                <div class="cookie-consent-content">
                    <p class="cookie-consent-message">${t.message}</p>
                    <div class="cookie-consent-actions">
                        <button id="cookie-accept-btn" class="cookie-consent-btn cookie-accept">${t.acceptButton}</button>
                        <a href="cookie-policy.html" class="cookie-consent-link">${t.policyLink}</a>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);
        
        // Add event listener to accept button
        document.getElementById('cookie-accept-btn').addEventListener('click', function() {
            acceptCookies();
        });
        
        // Show banner with animation
        setTimeout(function() {
            banner.classList.add('show');
        }, 100);
    }
    
    // Accept cookies
    function acceptCookies() {
        setCookie(COOKIE_NAME, 'accepted', COOKIE_EXPIRY_DAYS);
        
        // Hide banner
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(function() {
                banner.remove();
            }, 300);
        }
        
        // Load tracking scripts
        loadTrackingScripts();
    }
    
    // Load tracking scripts after consent
    function loadTrackingScripts() {
        // Google Analytics (if you add it later)
        // Example:
        // const script = document.createElement('script');
        // script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
        // script.async = true;
        // document.head.appendChild(script);
        
        // For now, just log that consent was given
        console.log('Cookie consent accepted - tracking scripts can be loaded');
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showCookieBanner);
    } else {
        showCookieBanner();
    }
    
    // Update banner language when language changes
    window.addEventListener('storage', function(e) {
        if (e.key === 'mhmit-lang' && !hasConsent()) {
            const banner = document.getElementById('cookie-consent-banner');
            if (banner) {
                banner.remove();
                showCookieBanner();
            }
        }
    });
    
})();
