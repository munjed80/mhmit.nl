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
            'free_tools_btw_desc': 'This tool calculates 21% VAT for amounts including or excluding VAT.',
            'free_tools_button': 'Open tool',
            
            // Factuur Page
            'factuur_hero_title': 'Create Invoice',
            'factuur_hero_subtitle': 'Create professional invoices quickly and easily for your clients.<br>Perfect for freelancers and small businesses.',
            
            // BTW Page
            'btw_hero_title': 'VAT Calculator',
            'btw_hero_subtitle': 'Calculate 21% VAT quickly and easily for your amounts.<br>Perfect for your administration and quotes.',
            
            // Footer
            'footer-copyright': '© 2025 MHM IT. All rights reserved.',
            'footer-whatsapp': 'Chat on WhatsApp',
            'footer_privacy': 'Privacy Policy',
            'footer_cookies': 'Cookie Policy',
            'footer_copyright': '© 2025 MHM IT. All rights reserved.',
            'footer_nav_title': 'Navigation',
            'footer_nav_home': 'Home',
            'footer_nav_tools': 'Free Tools',
            'footer_nav_contact': 'Contact',
            'footer_legal_title': 'Legal',
            'footer_social_title': 'Connect',
            
            // Gratis Tools Nav
            'gratis-tools-nav': 'Free Tools',
            
            // Privacy Policy
            'privacy_title': 'Privacy Policy',
            'privacy_subtitle': 'Last updated: December 7, 2024',
            'privacy_intro_title': 'Introduction',
            'privacy_intro_text': 'MHM IT ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.',
            'privacy_info_title': 'Information We Collect',
            'privacy_info_text': 'We may collect information about you in a variety of ways. The information we may collect on the website includes:',
            'privacy_info_1': 'Personal data such as your name, email address, and contact information when you voluntarily provide it to us',
            'privacy_info_2': 'Usage data including your IP address, browser type, and browsing behavior on our website',
            'privacy_info_3': 'Cookies and similar tracking technologies to enhance your experience',
            'privacy_use_title': 'How We Use Your Information',
            'privacy_use_text': 'We use the information we collect to:',
            'privacy_use_1': 'Respond to your inquiries and provide customer support',
            'privacy_use_2': 'Improve our website and services',
            'privacy_use_3': 'Send you marketing communications (with your consent)',
            'privacy_use_4': 'Analyze usage patterns and optimize user experience',
            'privacy_security_title': 'Data Security',
            'privacy_security_text': 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
            'privacy_rights_title': 'Your Rights',
            'privacy_rights_text': 'Under GDPR and other applicable privacy laws, you have the right to access, correct, delete, or restrict the use of your personal data. To exercise these rights, please contact us at info@mhmit.nl.',
            'privacy_contact_title': 'Contact Us',
            'privacy_contact_text': 'If you have questions or concerns about this Privacy Policy, please contact us:',
            
            // Cookie Policy
            'cookie_title': 'Cookie Policy',
            'cookie_subtitle': 'Last updated: December 7, 2024',
            'cookie_what_title': 'What Are Cookies',
            'cookie_what_text': 'Cookies are small text files that are stored on your device when you visit a website. They help us provide you with a better experience by remembering your preferences and understanding how you use our website.',
            'cookie_types_title': 'Types of Cookies We Use',
            'cookie_essential_title': 'Essential Cookies',
            'cookie_essential_text': 'These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.',
            'cookie_preference_title': 'Preference Cookies',
            'cookie_preference_text': 'These cookies allow our website to remember choices you make (such as your language preference) and provide enhanced, more personalized features.',
            'cookie_analytics_title': 'Analytics Cookies',
            'cookie_analytics_text': 'We use analytics cookies to understand how visitors interact with our website. This helps us improve the website\'s functionality and user experience.',
            'cookie_manage_title': 'How to Manage Cookies',
            'cookie_manage_text': 'You can control and manage cookies in various ways:',
            'cookie_manage_1': 'Most browsers allow you to refuse or accept cookies',
            'cookie_manage_2': 'You can delete cookies that are already stored on your device',
            'cookie_manage_3': 'You can set your browser to notify you when you receive a cookie',
            'cookie_thirdparty_title': 'Third-Party Cookies',
            'cookie_thirdparty_text': 'We may use third-party services that also set cookies on your device. These third parties have their own privacy policies and cookie policies.',
            'cookie_contact_title': 'Contact Us',
            'cookie_contact_text': 'If you have questions about our use of cookies, please contact us:',
            
            // Contact Address
            'contact_address_title': 'Visit Us'
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
            'free_tools_btw_desc': 'Deze tool berekent BTW 21% voor bedragen inclusief of exclusief btw. Ideaal voor snelle berekeningen tijdens je administratie.',
            'free_tools_button': 'Open tool',
            
            // Factuur Page
            'factuur_hero_title': 'Factuur maken',
            'factuur_hero_subtitle': 'Maak snel en eenvoudig professionele facturen voor je klanten.<br>Ideaal voor ZZP\'ers en kleine ondernemingen.',
            
            // BTW Page
            'btw_hero_title': 'BTW Calculator',
            'btw_hero_subtitle': 'Bereken snel en eenvoudig BTW 21% voor je bedragen.<br>Perfect voor je administratie en offertes.',
            
            // Footer
            'footer-copyright': '© 2025 MHM IT. Alle rechten voorbehouden.',
            'footer-whatsapp': 'Chat via WhatsApp',
            'footer_privacy': 'Privacybeleid',
            'footer_cookies': 'Cookiebeleid',
            'footer_copyright': '© 2025 MHM IT. Alle rechten voorbehouden.',
            'footer_nav_title': 'Navigatie',
            'footer_nav_home': 'Home',
            'footer_nav_tools': 'Gratis Tools',
            'footer_nav_contact': 'Contact',
            'footer_legal_title': 'Juridisch',
            'footer_social_title': 'Verbinden',
            
            // Gratis Tools Nav
            'gratis-tools-nav': 'Gratis Tools',
            
            // Privacy Policy
            'privacy_title': 'Privacybeleid',
            'privacy_subtitle': 'Laatst bijgewerkt: 7 december 2024',
            'privacy_intro_title': 'Introductie',
            'privacy_intro_text': 'MHM IT ("wij", "ons") hecht groot belang aan uw privacy. Dit privacybeleid legt uit hoe wij uw informatie verzamelen, gebruiken, openbaar maken en beschermen wanneer u onze website bezoekt.',
            'privacy_info_title': 'Informatie Die Wij Verzamelen',
            'privacy_info_text': 'Wij kunnen op verschillende manieren informatie over u verzamelen. De informatie die wij op de website kunnen verzamelen omvat:',
            'privacy_info_1': 'Persoonlijke gegevens zoals uw naam, e-mailadres en contactinformatie wanneer u deze vrijwillig aan ons verstrekt',
            'privacy_info_2': 'Gebruiksgegevens waaronder uw IP-adres, browsertype en surfgedrag op onze website',
            'privacy_info_3': 'Cookies en vergelijkbare trackingtechnologieën om uw ervaring te verbeteren',
            'privacy_use_title': 'Hoe Wij Uw Informatie Gebruiken',
            'privacy_use_text': 'Wij gebruiken de verzamelde informatie om:',
            'privacy_use_1': 'Te reageren op uw vragen en klantenondersteuning te bieden',
            'privacy_use_2': 'Onze website en diensten te verbeteren',
            'privacy_use_3': 'U marketingcommunicatie te sturen (met uw toestemming)',
            'privacy_use_4': 'Gebruikspatronen te analyseren en gebruikerservaring te optimaliseren',
            'privacy_security_title': 'Gegevensbeveiliging',
            'privacy_security_text': 'Wij implementeren passende technische en organisatorische beveiligingsmaatregelen om uw persoonlijke informatie te beschermen tegen ongeautoriseerde toegang, wijziging, openbaarmaking of vernietiging.',
            'privacy_rights_title': 'Uw Rechten',
            'privacy_rights_text': 'Onder de AVG en andere toepasselijke privacywetten heeft u het recht om toegang te krijgen tot, te corrigeren, te verwijderen of het gebruik van uw persoonlijke gegevens te beperken. Om deze rechten uit te oefenen, neem contact met ons op via info@mhmit.nl.',
            'privacy_contact_title': 'Contact',
            'privacy_contact_text': 'Als u vragen of zorgen heeft over dit privacybeleid, neem dan contact met ons op:',
            
            // Cookie Policy
            'cookie_title': 'Cookiebeleid',
            'cookie_subtitle': 'Laatst bijgewerkt: 7 december 2024',
            'cookie_what_title': 'Wat Zijn Cookies',
            'cookie_what_text': 'Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen wanneer u een website bezoekt. Ze helpen ons u een betere ervaring te bieden door uw voorkeuren te onthouden en te begrijpen hoe u onze website gebruikt.',
            'cookie_types_title': 'Soorten Cookies Die Wij Gebruiken',
            'cookie_essential_title': 'Essentiële Cookies',
            'cookie_essential_text': 'Deze cookies zijn noodzakelijk voor het goed functioneren van de website. Ze maken basisfuncties mogelijk zoals paginanavigatie en toegang tot beveiligde gebieden van de website.',
            'cookie_preference_title': 'Voorkeurscookies',
            'cookie_preference_text': 'Deze cookies stellen onze website in staat keuzes die u maakt (zoals uw taalvoorkeur) te onthouden en verbeterde, meer gepersonaliseerde functies te bieden.',
            'cookie_analytics_title': 'Analytische Cookies',
            'cookie_analytics_text': 'Wij gebruiken analytische cookies om te begrijpen hoe bezoekers omgaan met onze website. Dit helpt ons de functionaliteit en gebruikerservaring van de website te verbeteren.',
            'cookie_manage_title': 'Hoe Cookies Te Beheren',
            'cookie_manage_text': 'U kunt cookies op verschillende manieren beheren en controleren:',
            'cookie_manage_1': 'De meeste browsers stellen u in staat cookies te weigeren of te accepteren',
            'cookie_manage_2': 'U kunt cookies verwijderen die al op uw apparaat zijn opgeslagen',
            'cookie_manage_3': 'U kunt uw browser instellen om u te waarschuwen wanneer u een cookie ontvangt',
            'cookie_thirdparty_title': 'Cookies Van Derden',
            'cookie_thirdparty_text': 'Wij kunnen diensten van derden gebruiken die ook cookies op uw apparaat plaatsen. Deze derden hebben hun eigen privacybeleid en cookiebeleid.',
            'cookie_contact_title': 'Contact',
            'cookie_contact_text': 'Als u vragen heeft over ons gebruik van cookies, neem dan contact met ons op:',
            
            // Contact Address
            'contact_address_title': 'Bezoek Ons'
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
                // Use innerHTML for subtitle fields that may contain HTML
                if (key.includes('subtitle')) {
                    element.innerHTML = translation[key];
                } else {
                    element.textContent = translation[key];
                }
            }
        });
        
        // Update footer
        const footerText = document.querySelector('.footer-text');
        const whatsappBtn = document.querySelector('.whatsapp-icon-btn');
        
        if (footerText) footerText.textContent = translation['footer-copyright'];
        if (whatsappBtn) whatsappBtn.setAttribute('title', translation['footer-whatsapp']);
        
        // Update Gratis Tools Nav link
        const gratisToolsLink = document.querySelector('.gratis-tools-link');
        if (gratisToolsLink) gratisToolsLink.textContent = translation['gratis-tools-nav'];
        
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
