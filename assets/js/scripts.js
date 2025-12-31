/**
 * MHM IT - Scripts.js
 * Handles smooth scrolling, responsive navbar behavior, animations, and language switching
 */

(function() {
    'use strict';
    
    // =============================================
    // DOM Elements
    // =============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // =============================================
    // Language Management
    // =============================================
    // Language files
    const LANGUAGE_FILES = {
        en: '/content/en.json',
        nl: '/content/nl.json'
    };
    const translationCache = {};

    const resolveLanguageFromPath = () => {
        const pathname = (window.location.pathname || '').toLowerCase();
        const filename = pathname.split('/').pop() || '';
        if (pathname.includes('/en/') || filename.includes('-en')) {
            return 'en';
        }
        const htmlLang = (document.documentElement.lang || '').toLowerCase();
        return htmlLang === 'en' ? 'en' : 'nl';
    };

    const resolvedLang = resolveLanguageFromPath();
    let currentLang = resolvedLang;
    document.documentElement.lang = currentLang;
    
    // Language page mapping - maps current page to its language alternatives
    const languagePageMap = {
        // Home pages
        'index.html': { en: '/index-en.html', nl: '/' },
        'index-en.html': { en: '/index-en.html', nl: '/' },
        '': { en: '/index-en.html', nl: '/' },  // root path
        
        // Contact pages
        'contact.html': { en: '/contact.html', nl: '/contact-nl.html' },
        'contact-en.html': { en: '/contact.html', nl: '/contact-nl.html' },
        'contact-nl.html': { en: '/contact.html', nl: '/contact-nl.html' },
        
        // Services pages
        'services.html': { en: '/services.html', nl: '/services-nl.html' },
        'services-en.html': { en: '/services.html', nl: '/services-nl.html' },
        'services-nl.html': { en: '/services.html', nl: '/services-nl.html' },
        
        // Products pages
        'products.html': { en: '/products.html', nl: '/products-nl.html' },
        'products-en.html': { en: '/products.html', nl: '/products-nl.html' },
        'products-nl.html': { en: '/products.html', nl: '/products-nl.html' },
        
        // About pages
        'about.html': { en: '/about.html', nl: '/about-nl.html' },
        'about-en.html': { en: '/about.html', nl: '/about-nl.html' },
        'about-nl.html': { en: '/about.html', nl: '/about-nl.html' }
    };
    
    const getAlternateHref = (lang) => {
        const link = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
        return link ? link.getAttribute('href') : null;
    };
    
    const loadTranslations = async (lang) => {
        if (translationCache[lang]) return translationCache[lang];
        try {
            const response = await fetch(LANGUAGE_FILES[lang]);
            if (!response.ok) throw new Error(`Failed to load translations for ${lang} (${response.status}) from ${response.url}`);
            const data = await response.json();
            translationCache[lang] = data;
            return data;
        } catch (error) {
            console.error(error);
            console.error(`Translations for ${lang} could not be loaded; showing placeholders to expose missing strings.`);
            translationCache[lang] = {};
            return translationCache[lang];
        }
    };

    const getText = (translation, lang, key) => {
        if (translation && Object.hasOwn(translation, key)) {
            return translation[key];
        }
        console.warn(`Missing translation for ${lang}:${key}`);
        return '';
    };

    const applyText = (element, translation, lang, key, options = {}) => {
        if (!element) return;
        const value = getText(translation, lang, key);
        if (options.html) {
            element.innerHTML = value;
        } else {
            element.textContent = value;
        }
    };
    
    // Function to update all text on the page
    async function updateLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        const translation = await loadTranslations(lang);

        // Update navigation
        const navHome = document.querySelector('[data-text="nav-home"]') || document.querySelector('a.nav-link[href*="index"]');
        const navServices = document.querySelector('[data-text="nav-services"]') || document.querySelector('a.nav-link[href^="services"]');
        const navProducts = document.querySelector('[data-text="nav-products"]') || document.querySelector('a.nav-link[href^="products"]');
        const navAbout = document.querySelector('[data-text="nav-about"]') || document.querySelector('a.nav-link[href^="about"]');
        const navContact = document.querySelector('[data-text="nav-contact"]') || document.querySelector('a.nav-link[href^="contact"]');
        
        applyText(navHome, translation, lang, 'nav-home');
        applyText(navServices, translation, lang, 'nav-services');
        applyText(navProducts, translation, lang, 'nav-products');
        applyText(navAbout, translation, lang, 'nav-about');
        applyText(navContact, translation, lang, 'nav-contact');
        
        // Update hero section
        applyText(document.querySelector('.hero-title'), translation, lang, 'hero-title');
        applyText(document.querySelector('.hero-subtitle'), translation, lang, 'hero-subtitle');
        applyText(document.querySelector('.hero-buttons .btn-primary'), translation, lang, 'hero-cta-primary');
        applyText(document.querySelector('.hero-buttons .btn-secondary'), translation, lang, 'hero-cta-secondary');

        // Hero demo
        applyText(document.querySelector('.hero-demo-label'), translation, lang, 'hero-demo-label');
        applyText(document.querySelector('.hero-demo-chip'), translation, lang, 'hero-demo-chip');
        applyText(document.querySelector('.hero-demo-header span:last-child'), translation, lang, 'hero-demo-realtime');
        const heroInputLabels = document.querySelectorAll('.hero-demo-input label');
        const heroInputKeys = ['hero-amount-label', 'hero-vat-label'];
        heroInputLabels.forEach((el, index) => applyText(el, translation, lang, heroInputKeys[index]));
        const outputLabels = document.querySelectorAll('.hero-output-row span:first-child');
        const outputKeys = ['hero-output-excl', 'hero-output-vat', 'hero-output-total'];
        outputLabels.forEach((el, index) => applyText(el, translation, lang, outputKeys[index]));
        applyText(document.querySelector('.hero-note'), translation, lang, 'hero-note');

        // Tech strip
        const techItems = document.querySelectorAll('.tech-item span');
        const techKeys = ['tech-frontend', 'tech-offline', 'tech-no-tracking', 'tech-privacy'];
        techItems.forEach((el, index) => applyText(el, translation, lang, techKeys[index]));
        
        // Value proposition section
        applyText(document.querySelector('.value-proposition .section-title'), translation, lang, 'value-title');
        applyText(document.querySelector('.value-proposition .section-subtitle'), translation, lang, 'value-subtitle');
        
        // Premium automation section
        applyText(document.querySelector('.premium-automation .section-title'), translation, lang, 'premium-automation-title');
        applyText(document.querySelector('.premium-automation .section-subtitle'), translation, lang, 'premium-automation-subtitle');
        
        // Benefits
        const benefitTitles = document.querySelectorAll('.benefit-title');
        const benefitDescs = document.querySelectorAll('.benefit-description');
        const benefitTitleKeys = ['benefit1-title', 'benefit2-title', 'benefit3-title'];
        const benefitDescKeys = ['benefit1-desc', 'benefit2-desc', 'benefit3-desc'];
        benefitTitles.forEach((el, index) => applyText(el, translation, lang, benefitTitleKeys[index]));
        benefitDescs.forEach((el, index) => applyText(el, translation, lang, benefitDescKeys[index]));
        
        // What we do section
        applyText(document.querySelector('.what-we-do .section-title'), translation, lang, 'whatwedo-title');
        applyText(document.querySelector('.what-we-do .section-subtitle'), translation, lang, 'whatwedo-subtitle');
        
        // Services cards
        const serviceTitles = document.querySelectorAll('.service-title');
        const serviceDescs = document.querySelectorAll('.service-description');
        const serviceTitleKeys = ['service1-title', 'service2-title', 'service3-title'];
        const serviceDescKeys = ['service1-desc', 'service2-desc', 'service3-desc'];
        serviceTitles.forEach((el, index) => applyText(el, translation, lang, serviceTitleKeys[index]));
        serviceDescs.forEach((el, index) => applyText(el, translation, lang, serviceDescKeys[index]));
        
        // CTA section
        applyText(document.querySelector('.cta-title'), translation, lang, 'cta-title');
        applyText(document.querySelector('.cta-subtitle'), translation, lang, 'cta-subtitle', { html: true });
        const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
        if (ctaButtons.length >= 2) {
            applyText(ctaButtons[0], translation, lang, 'cta-contact');
            applyText(ctaButtons[1], translation, lang, 'cta-email');
        }

        // ZZP Hub section
        applyText(document.querySelector('.zzp-hub-badge .badge-text'), translation, lang, 'zzp-badge');
        applyText(document.querySelector('.zzp-title'), translation, lang, 'zzp-title');
        applyText(document.querySelector('.zzp-hub-section .section-subtitle'), translation, lang, 'zzp-subtitle');

        const zzpFeatureTitles = document.querySelectorAll('.zzp-feature-card .feature-title');
        const zzpFeatureDescs = document.querySelectorAll('.zzp-feature-card .feature-description');
        const zzpTitleKeys = [
            'zzp-feature1-title', 'zzp-feature2-title', 'zzp-feature3-title',
            'zzp-feature4-title', 'zzp-feature5-title', 'zzp-feature6-title',
            'zzp-feature7-title', 'zzp-feature8-title', 'zzp-feature9-title',
            'zzp-feature10-title', 'zzp-feature11-title'
        ];
        const zzpDescKeys = [
            'zzp-feature1-desc', 'zzp-feature2-desc', 'zzp-feature3-desc',
            'zzp-feature4-desc', 'zzp-feature5-desc', 'zzp-feature6-desc',
            'zzp-feature7-desc', 'zzp-feature8-desc', 'zzp-feature9-desc',
            'zzp-feature10-desc', 'zzp-feature11-desc'
        ];
        zzpFeatureTitles.forEach((el, index) => applyText(el, translation, lang, zzpTitleKeys[index]));
        zzpFeatureDescs.forEach((el, index) => applyText(el, translation, lang, zzpDescKeys[index]));
        applyText(document.querySelector('.ai-badge span'), translation, lang, 'zzp-ai-badge');

        applyText(document.querySelector('.zzp-cta-content h3'), translation, lang, 'zzp-cta-title');
        applyText(document.querySelector('.zzp-cta-content p'), translation, lang, 'zzp-cta-subtitle');
        const zzpCtaButtons = document.querySelectorAll('.zzp-cta-buttons .btn');
        if (zzpCtaButtons.length >= 2) {
            applyText(zzpCtaButtons[0], translation, lang, 'zzp-cta-primary');
            applyText(zzpCtaButtons[1], translation, lang, 'zzp-cta-secondary');
        }

        // Solutions section
        applyText(document.querySelector('.solutions-section .section-title'), translation, lang, 'solutions-title');
        applyText(document.querySelector('.solutions-section .section-subtitle'), translation, lang, 'solutions-subtitle');
        const solutionTitles = document.querySelectorAll('.solution-card .solution-title');
        const solutionDescs = document.querySelectorAll('.solution-card .solution-description');
        const solutionTitleKeys = ['solution1-title', 'solution2-title', 'solution3-title', 'solution4-title'];
        const solutionDescKeys = ['solution1-desc', 'solution2-desc', 'solution3-desc', 'solution4-desc'];
        solutionTitles.forEach((el, index) => applyText(el, translation, lang, solutionTitleKeys[index]));
        solutionDescs.forEach((el, index) => applyText(el, translation, lang, solutionDescKeys[index]));
        const solutionTags = document.querySelectorAll('.solution-card .solution-tag');
        const solutionTagKeys = ['solution1-tag', 'solution2-tag', 'solution3-tag', 'solution4-tag'];
        solutionTags.forEach((el, index) => applyText(el, translation, lang, solutionTagKeys[index]));

        // Elements with data-text
        const elements = document.querySelectorAll('[data-text]');
        elements.forEach(element => {
            const key = element.getAttribute('data-text');
            const value = getText(translation, lang, key);
            if (key.includes('subtitle')) {
                element.innerHTML = value;
            } else {
                element.textContent = value;
            }
        });
        
        // Update placeholders
        const placeholderElements = document.querySelectorAll('[data-placeholder-key]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-placeholder-key');
            element.setAttribute('placeholder', getText(translation, lang, key));
        });
        
        // Update footer
        const footerText = document.querySelector('.footer-text');
        const whatsappBtn = document.querySelector('.whatsapp-icon-btn');
        
        applyText(footerText, translation, lang, 'footer_copyright');
        if (whatsappBtn) whatsappBtn.setAttribute('title', getText(translation, lang, 'footer-whatsapp'));
        
        // Update Gratis Tools Nav link
        const gratisToolsLink = document.querySelector('.gratis-tools-link');
        applyText(gratisToolsLink, translation, lang, 'gratis-tools-nav');

        // Footer extra links
        applyText(document.querySelector('a[href="/free-tools/factuur-generator/"]'), translation, lang, 'footer_invoice_tool');
        applyText(document.querySelector('a[href="/free-tools/offerte-generator/"]'), translation, lang, 'footer_quote_tool');
        applyText(document.querySelector('a[href="/free-tools/btw-calculator/"]'), translation, lang, 'footer_btw_tool');
        applyText(document.querySelector('a[href="/about-the-tech"]'), translation, lang, 'footer_about_tech');
        
        // Update active language button
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
    }
    
    // Expose translation helpers globally for pages that need manual init
    const applyTranslations = (lang) => updateLanguage(lang);
    window.applyTranslations = applyTranslations;
    window.resolveLanguageFromPath = resolveLanguageFromPath;
    
    // Initialize language on page load (after DOM is ready)
    const initTranslations = () => applyTranslations(currentLang).catch(console.error);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTranslations);
    } else {
        initTranslations();
    }
    
    // Language button click handlers
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Get current page filename
            const currentPath = window.location.pathname;
            const currentPage = currentPath.split('/').pop() || 'index.html';
            const pageLang = resolveLanguageFromPath();
            const isDutchPage = pageLang === 'nl';

            // If switching languages, redirect to appropriate page
            if (lang === 'nl' && !isDutchPage) {
                // Try to get alternate href from hreflang tag first
                let targetHref = getAlternateHref('nl');
                
                // If no hreflang tag, use page mapping
                if (!targetHref && languagePageMap[currentPage]) {
                    targetHref = languagePageMap[currentPage].nl;
                }
                
                // Fallback to home page
                if (!targetHref) {
                    targetHref = '/';
                }
                window.location.href = targetHref;
            } else if (lang === 'en' && isDutchPage) {
                // Try to get alternate href from hreflang tag first
                let targetHref = getAlternateHref('en');
                
                // If no hreflang tag, use page mapping
                if (!targetHref && languagePageMap[currentPage]) {
                    targetHref = languagePageMap[currentPage].en;
                }
                
                // Fallback to English home page
                if (!targetHref) {
                    targetHref = '/index-en.html';
                }
                
                window.location.href = targetHref;
            } else {
                updateLanguage(lang).catch(console.error);
            }
        });
    });
    
    // =============================================
    // Mobile Menu Toggle
    // =============================================
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            // Toggle active class on menu toggle button
            menuToggle.classList.toggle('active');
            
            // Toggle active class on nav menu
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on nav links
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // =============================================
    // Sticky Header on Scroll
    // =============================================
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class when user scrolls down
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // =============================================
    // Smooth Scrolling for Anchor Links
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only apply smooth scroll to actual anchor links (not just #)
            if (href !== '#' && href !== '') {
                e.preventDefault();
                
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - headerHeight;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // =============================================
    // Active Navigation Link based on Scroll
    // =============================================
    function updateActiveNavLink() {
        // Get current page filename
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(function(link) {
            const linkHref = link.getAttribute('href');
            
            // Check if link matches current page
            if (linkHref === currentPage || 
                (currentPage === '' && linkHref === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Update active link on page load
    updateActiveNavLink();
    
    // =============================================
    // Close mobile menu on window resize
    // =============================================
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Remove active classes on larger screens
            if (menuToggle && navMenu) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    // =============================================
    // Fade-in Animation on Scroll (for feature & product cards)
    // =============================================
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe feature, product, benefit, service, and solution cards
    document.querySelectorAll('.feature-card, .product-card, .benefit-card, .service-card, .solution-card').forEach(function(card) {
        observer.observe(card);
    });
    
    // =============================================
    // MARVEL ENHANCEMENTS - Hero Section Interactive Effects
    // =============================================
    
    // 3D Tilt Effect on Dashboard Mockup
    const dashboardMockup = document.querySelector('.dashboard-mockup');
    if (dashboardMockup) {
        dashboardMockup.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((centerX - x) / centerX) * 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        dashboardMockup.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    }
    
    // Magnetic Hover Effect on Tool Cards
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.15;
            const moveY = y * 0.15;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Parallax Effect on Scroll
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    const heroSection = document.querySelector('.hero');
    
    if (heroContent && heroVisual && heroSection) {
        const heroHeight = heroSection.offsetHeight;
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    if (scrolled < heroHeight) {
                        const parallaxSpeed = 0.5;
                        heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                        heroVisual.style.transform = `translateY(${scrolled * parallaxSpeed * 0.3}px)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    // Add shimmer effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const shimmerText = heroTitle.textContent || '';
        if (!shimmerText.startsWith('[')) {
            heroTitle.setAttribute('data-shimmer-text', shimmerText);
        }
    }
    
    // Animated number counter for metrics (if present)
    function animateMetrics() {
        const metricBoxes = document.querySelectorAll('.metric-box');
        metricBoxes.forEach(function(box, index) {
            // Add CSS class for animation instead of inline styles
            box.classList.add('metric-hidden');
            
            setTimeout(function() {
                box.classList.remove('metric-hidden');
                box.classList.add('metric-visible');
            }, index * 200 + 100);
        });
    }
    
    // Trigger metric animation when hero section is visible
    if (document.querySelector('.metric-box')) {
        // Add styles for metric animation
        const metricStyle = document.createElement('style');
        metricStyle.textContent = `
            .metric-hidden {
                opacity: 0;
                transform: scale(0.8);
            }
            .metric-visible {
                opacity: 1;
                transform: scale(1);
                transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }
        `;
        document.head.appendChild(metricStyle);
        
        setTimeout(animateMetrics, 1000);
    }
    
    // Create floating particles effect
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'hero-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: radial-gradient(circle, rgba(59, 130, 246, 0.8), rgba(168, 85, 247, 0.4));
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5 + 0.3};
                animation: floatParticle ${Math.random() * 10 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                filter: blur(${Math.random() * 2}px);
                z-index: 1;
            `;
            hero.appendChild(particle);
        }
        
        // Add keyframes for particle animation if not exists
        if (!document.getElementById('particle-keyframes')) {
            const style = document.createElement('style');
            style.id = 'particle-keyframes';
            style.textContent = `
                @keyframes floatParticle {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0.3;
                    }
                    25% {
                        transform: translate(20px, -30px) scale(1.2);
                        opacity: 0.6;
                    }
                    50% {
                        transform: translate(-20px, -60px) scale(0.8);
                        opacity: 0.8;
                    }
                    75% {
                        transform: translate(30px, -30px) scale(1.1);
                        opacity: 0.5;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Initialize particles after page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createParticles);
    } else {
        createParticles();
    }

    // =============================================
    // Interactive Hero BTW Preview
    // =============================================
    const heroAmountInput = document.getElementById('hero-amount');
    const heroRateChips = document.querySelectorAll('.btw-chip');
    const heroOutputExcl = document.getElementById('hero-output-excl');
    const heroOutputVat = document.getElementById('hero-output-vat');
    const heroOutputTotal = document.getElementById('hero-output-total');

    function heroFormatCurrency(value) {
        return '€ ' + value.toFixed(2).replace('.', ',');
    }

    function animateValue(el, newValue) {
        if (!el) return;
        
        // Extract current numeric value
        const currentText = el.textContent;
        const currentNum = parseFloat(currentText.replace('€', '').replace(',', '.').trim()) || 0;
        const targetNum = parseFloat(newValue.replace('€', '').replace(',', '.').trim()) || 0;
        
        // Quick transition for similar values
        const diff = Math.abs(targetNum - currentNum);
        if (diff < 0.01) {
            el.textContent = newValue;
            return;
        }
        
        // Smooth count animation
        const duration = 250; // ms
        const steps = 15;
        const stepDuration = duration / steps;
        const increment = (targetNum - currentNum) / steps;
        let currentStep = 0;
        
        const timer = setInterval(() => {
            currentStep++;
            if (currentStep >= steps) {
                clearInterval(timer);
                el.textContent = newValue;
                el.classList.remove('animate');
                void el.offsetWidth;
                el.classList.add('animate');
            } else {
                const val = currentNum + (increment * currentStep);
                el.textContent = heroFormatCurrency(val);
            }
        }, stepDuration);
    }

    function initHeroCalculator() {
        if (!heroAmountInput || heroRateChips.length === 0) return;
        let activeRate = 21;

        heroRateChips.forEach(chip => {
            chip.addEventListener('click', () => {
                heroRateChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                activeRate = parseFloat(chip.dataset.rate) || 0;
                runHeroCalculation(activeRate);
            });
        });

        heroAmountInput.addEventListener('input', () => runHeroCalculation(activeRate));
        runHeroCalculation(activeRate);
    }

    function runHeroCalculation(rate) {
        if (!heroAmountInput) return;
        const amount = parseFloat(heroAmountInput.value) || 0;
        const vat = amount * (rate / 100);
        const total = amount + vat;

        animateValue(heroOutputExcl, heroFormatCurrency(amount));
        animateValue(heroOutputVat, heroFormatCurrency(vat));
        animateValue(heroOutputTotal, heroFormatCurrency(total));
    }

    initHeroCalculator();
    
})();
