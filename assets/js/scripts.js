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
    let currentLang = localStorage.getItem('mhmit-lang') || 'en';
    
    // Language text content
    const translations = {
        en: {
            // Navigation
            'nav-home': 'Home',
            'nav-services': 'Services',
            'nav-products': 'Products',
            'nav-about': 'About',
            'nav-contact': 'Contact',
            
            // Hero Section
            'hero-title': 'Smart Tools for Smart Business',
            'hero-subtitle': 'We build intelligent digital systems that automate work, accelerate growth, and deliver real results.<br>Transform your business with cutting-edge technology and innovation.',
            'hero-cta': 'Get Started Today',
            
            // Value Proposition
            'value-title': 'Why Businesses Choose Us',
            'value-subtitle': 'Three core values that drive everything we create',
            
            // Benefits
            'benefit1-title': 'Innovation First',
            'benefit1-desc': 'We leverage cutting-edge technologies like AI, automation, and advanced analytics to build solutions that put you ahead of the competition.',
            'benefit2-title': 'Results That Matter',
            'benefit2-desc': 'Every solution is designed to deliver measurable results—reduced costs, increased efficiency, and accelerated growth for your business.',
            'benefit3-title': 'Partnership Approach',
            'benefit3-desc': 'We don\'t just build tools—we become your technology partner, providing ongoing support and evolving solutions as your business grows.',
            
            // What We Do
            'whatwedo-title': 'What We Do',
            'whatwedo-subtitle': 'Specialized digital solutions tailored to modern business needs',
            
            // Services
            'service1-title': 'SaaS & Automation Solutions',
            'service1-desc': 'Build custom SaaS platforms and automation systems that streamline workflows, eliminate repetitive tasks, and scale effortlessly with your business growth.',
            'service2-title': 'Smart Dashboards & Business Insights',
            'service2-desc': 'Create powerful, real-time analytics dashboards that transform complex data into actionable insights, enabling smarter, faster business decisions.',
            'service3-title': 'AI-powered Tools for Productivity',
            'service3-desc': 'Harness the power of artificial intelligence to automate customer service, content generation, data analysis, and enhance team productivity across your organization.',
            
            // CTA Section
            'cta-title': 'Ready to Transform Your Business?',
            'cta-subtitle': 'Let\'s discuss how our smart tools and solutions can help your business grow.<br>Get in touch today for a free consultation.',
            'cta-contact': 'Contact Us Now',
            'cta-email': 'Email Us',
            
            // Gratis Tools Section
            'free_tools_title': 'Free Tools',
            'free_tools_subtitle': 'Handy free tools for freelancers and entrepreneurs.',
            'free_tools_invoice_title': 'Create Invoice',
            'free_tools_invoice_desc': 'This tool helps freelancers and small businesses quickly create professional invoices.',
            'free_tools_btw_title': 'VAT Calculator',
            'free_tools_btw_desc': 'This tool calculates 9% and 21% VAT for amounts including or excluding VAT.',
            'free_tools_button': 'Open tool',
            
            // Footer
            'footer-copyright': '© 2024 MHM IT. All rights reserved.',
            'footer-whatsapp': 'Chat on WhatsApp'
        },
        nl: {
            // Navigation
            'nav-home': 'Home',
            'nav-services': 'Diensten',
            'nav-products': 'Producten',
            'nav-about': 'Over Ons',
            'nav-contact': 'Contact',
            
            // Hero Section
            'hero-title': 'Slimme Tools voor Slim Zakendoen',
            'hero-subtitle': 'Wij bouwen intelligente digitale systemen die werk automatiseren, groei versnellen en echte resultaten leveren.<br>Transformeer je bedrijf met geavanceerde technologie en innovatie.',
            'hero-cta': 'Start Vandaag',
            
            // Value Proposition
            'value-title': 'Waarom Bedrijven Voor Ons Kiezen',
            'value-subtitle': 'Drie kernwaarden die alles wat we creëren drijven',
            
            // Benefits
            'benefit1-title': 'Innovatie Eerst',
            'benefit1-desc': 'We maken gebruik van geavanceerde technologieën zoals AI, automatisering en geavanceerde analytics om oplossingen te bouwen die u een voorsprong geven op de concurrentie.',
            'benefit2-title': 'Resultaten Die Ertoe Doen',
            'benefit2-desc': 'Elke oplossing is ontworpen om meetbare resultaten te leveren—lagere kosten, verhoogde efficiëntie en versnelde groei voor uw bedrijf.',
            'benefit3-title': 'Partnerschapsbenadering',
            'benefit3-desc': 'We bouwen niet alleen tools—we worden uw technologiepartner, met doorlopende ondersteuning en evoluerende oplossingen naarmate uw bedrijf groeit.',
            
            // What We Do
            'whatwedo-title': 'Wat We Doen',
            'whatwedo-subtitle': 'Gespecialiseerde digitale oplossingen op maat voor moderne bedrijfsbehoeften',
            
            // Services
            'service1-title': 'SaaS & Automatiseringsoplossingen',
            'service1-desc': 'Bouw aangepaste SaaS-platforms en automatiseringssystemen die workflows stroomlijnen, repetitieve taken elimineren en moeiteloos meeschalen met uw bedrijfsgroei.',
            'service2-title': 'Slimme Dashboards & Bedrijfsinzichten',
            'service2-desc': 'Creëer krachtige real-time analytics dashboards die complexe data transformeren in bruikbare inzichten, wat slimmere, snellere bedrijfsbeslissingen mogelijk maakt.',
            'service3-title': 'AI-aangedreven Tools voor Productiviteit',
            'service3-desc': 'Benut de kracht van kunstmatige intelligentie om klantenservice, contentgeneratie, data-analyse te automatiseren en de productiviteit van teams in uw organisatie te verbeteren.',
            
            // CTA Section
            'cta-title': 'Klaar om Uw Bedrijf te Transformeren?',
            'cta-subtitle': 'Laten we bespreken hoe onze slimme tools en oplossingen uw bedrijf kunnen helpen groeien.<br>Neem vandaag nog contact op voor een gratis consultatie.',
            'cta-contact': 'Neem Nu Contact Op',
            'cta-email': 'Mail Ons',
            
            // Gratis Tools Section
            'free_tools_title': 'Gratis Tools',
            'free_tools_subtitle': 'Handige, gratis tools voor ondernemers en ZZP\'ers',
            'free_tools_invoice_title': 'Factuur maken',
            'free_tools_invoice_desc': 'Deze tool helpt ZZP\'ers en kleine ondernemingen om snel professionele facturen te maken. Eenvoudig, overzichtelijk en altijd beschikbaar.',
            'free_tools_btw_title': 'BTW Calculator',
            'free_tools_btw_desc': 'Deze tool berekent BTW 9% en 21% voor bedragen inclusief of exclusief btw. Ideaal voor snelle berekeningen tijdens je administratie.',
            'free_tools_button': 'Open tool',
            
            // Footer
            'footer-copyright': '© 2024 MHM IT. Alle rechten voorbehouden.',
            'footer-whatsapp': 'Chat via WhatsApp'
        }
    };
    
    // Function to update all text on the page
    function updateLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('mhmit-lang', lang);
        
        // Update all elements with data-i18n attribute
        const translation = translations[lang];
        
        // Update navigation
        const navHome = document.querySelector('a[href="index.html"].nav-link');
        const navServices = document.querySelector('a[href="services.html"].nav-link');
        const navProducts = document.querySelector('a[href="products.html"].nav-link');
        const navAbout = document.querySelector('a[href="about.html"].nav-link');
        const navContact = document.querySelector('a[href="contact.html"].nav-link');
        
        if (navHome) navHome.textContent = translation['nav-home'];
        if (navServices) navServices.textContent = translation['nav-services'];
        if (navProducts) navProducts.textContent = translation['nav-products'];
        if (navAbout) navAbout.textContent = translation['nav-about'];
        if (navContact) navContact.textContent = translation['nav-contact'];
        
        // Update hero section
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroCta = document.querySelector('.hero-buttons .btn-primary');
        
        if (heroTitle) heroTitle.textContent = translation['hero-title'];
        if (heroSubtitle) heroSubtitle.innerHTML = translation['hero-subtitle'];
        if (heroCta) heroCta.textContent = translation['hero-cta'];
        
        // Update value proposition section
        const valueTitle = document.querySelector('.value-proposition .section-title');
        const valueSubtitle = document.querySelector('.value-proposition .section-subtitle');
        
        if (valueTitle) valueTitle.textContent = translation['value-title'];
        if (valueSubtitle) valueSubtitle.textContent = translation['value-subtitle'];
        
        // Update benefits
        const benefitTitles = document.querySelectorAll('.benefit-title');
        const benefitDescs = document.querySelectorAll('.benefit-description');
        
        if (benefitTitles.length >= 3) {
            benefitTitles[0].textContent = translation['benefit1-title'];
            benefitTitles[1].textContent = translation['benefit2-title'];
            benefitTitles[2].textContent = translation['benefit3-title'];
        }
        
        if (benefitDescs.length >= 3) {
            benefitDescs[0].textContent = translation['benefit1-desc'];
            benefitDescs[1].textContent = translation['benefit2-desc'];
            benefitDescs[2].textContent = translation['benefit3-desc'];
        }
        
        // Update what we do section
        const whatTitle = document.querySelector('.what-we-do .section-title');
        const whatSubtitle = document.querySelector('.what-we-do .section-subtitle');
        
        if (whatTitle) whatTitle.textContent = translation['whatwedo-title'];
        if (whatSubtitle) whatSubtitle.textContent = translation['whatwedo-subtitle'];
        
        // Update services
        const serviceTitles = document.querySelectorAll('.service-title');
        const serviceDescs = document.querySelectorAll('.service-description');
        
        if (serviceTitles.length >= 3) {
            serviceTitles[0].textContent = translation['service1-title'];
            serviceTitles[1].textContent = translation['service2-title'];
            serviceTitles[2].textContent = translation['service3-title'];
        }
        
        if (serviceDescs.length >= 3) {
            serviceDescs[0].textContent = translation['service1-desc'];
            serviceDescs[1].textContent = translation['service2-desc'];
            serviceDescs[2].textContent = translation['service3-desc'];
        }
        
        // Update CTA section
        const ctaTitle = document.querySelector('.cta-title');
        const ctaSubtitle = document.querySelector('.cta-subtitle');
        const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
        
        if (ctaTitle) ctaTitle.textContent = translation['cta-title'];
        if (ctaSubtitle) ctaSubtitle.innerHTML = translation['cta-subtitle'];
        if (ctaButtons.length >= 2) {
            ctaButtons[0].textContent = translation['cta-contact'];
            ctaButtons[1].textContent = translation['cta-email'];
        }
        
        // Update Gratis Tools section
        const elements = document.querySelectorAll('[data-text]');
        elements.forEach(element => {
            const key = element.getAttribute('data-text');
            if (translation[key]) {
                element.textContent = translation[key];
            }
        });
        
        // Update footer
        const footerText = document.querySelector('.footer-text');
        const whatsappBtn = document.querySelector('.whatsapp-icon-btn');
        
        if (footerText) footerText.textContent = translation['footer-copyright'];
        if (whatsappBtn) whatsappBtn.setAttribute('title', translation['footer-whatsapp']);
        
        // Update active language button
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
    }
    
    // Initialize language on page load
    updateLanguage(currentLang);
    
    // Language button click handlers
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            updateLanguage(lang);
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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe feature, product, benefit, and service cards
    document.querySelectorAll('.feature-card, .product-card, .benefit-card, .service-card').forEach(function(card) {
        observer.observe(card);
    });
    
})();
