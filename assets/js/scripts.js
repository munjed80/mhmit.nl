/**
 * MHM IT - Scripts.js
 * Handles smooth scrolling, responsive navbar behavior, and multilingual content
 */

(function() {
    'use strict';
    
    // =============================================
    // Multilingual Content
    // =============================================
    const translations = {
        en: {
            // Navigation
            nav_home: 'Home',
            nav_services: 'Services',
            nav_products: 'Products',
            nav_about: 'About',
            nav_contact: 'Contact',
            
            // Hero Section
            hero_title: 'Smart Tools for Smart Business',
            hero_subtitle: 'We build intelligent digital systems that automate work, accelerate growth, and deliver real results.',
            hero_btn_primary: 'Get Started',
            hero_btn_secondary: 'Our Services',
            
            // What We Do Section
            what_we_do_title: 'What We Do',
            what_we_do_subtitle: 'We deliver cutting-edge digital solutions that transform the way businesses operate',
            
            feature1_title: 'Web Automation & SaaS Systems',
            feature1_desc: 'Build custom automation tools and SaaS platforms that streamline your business processes and boost productivity.',
            
            feature2_title: 'Smart Dashboards & Business Insights',
            feature2_desc: 'Create powerful analytics dashboards that provide real-time insights to make data-driven decisions.',
            
            feature3_title: 'AI-powered Productivity Tools',
            feature3_desc: 'Leverage artificial intelligence to automate repetitive tasks and enhance team productivity.',
            
            feature4_title: 'Secure & Fast Web Development',
            feature4_desc: 'Develop secure, lightning-fast web applications with modern technologies and best practices.',
            
            // Products Section
            products_title: 'Our Products',
            products_subtitle: 'Real, live products ready to use. Explore our suite of working digital tools.',
            
            product1_title: 'Smart ZZP Hub',
            product1_desc: 'A complete all-in-one workspace for freelancers (ZZP). Manage clients, invoices, schedules, tasks, and business documents through a smart dashboard built for independent professionals.',
            
            product2_title: 'ChefSense',
            product2_desc: 'A smart cooking platform with more than 2,000 recipes and an AI chef assistant named "Sense". It helps with menu planning, ingredient substitutions, nutrition, food cost calculations, and step-by-step cooking support.',
            
            product3_title: 'Product Ad Generator',
            product3_desc: 'AI-powered visual generator for marketing. Instantly creates high-quality product images, social ads, and store banners to improve engagement and conversions.',
            
            product4_title: 'SmartOrderHub',
            product4_desc: 'Smart order and POS hub for restaurants. Connects tables, kitchen, delivery, and payments for faster service and fewer mistakes.',
            
            product5_title: 'MHM UBA Automations',
            product5_desc: 'Universal Business Automator — connects business tools and automates workflows such as invoicing, task tracking, and reporting, reducing repetitive work to almost zero.',
            
            product6_title: 'Custom Business Dashboards',
            product6_desc: 'Tailored KPI dashboards and real-time analytics for companies that need insights to make smarter decisions.',
            
            product_tag_saas: 'SaaS Platform',
            product_tag_automation: 'Automation',
            product_tag_ai: 'AI Tool',
            product_tag_analytics: 'Analytics',
            
            // Footer
            footer_whatsapp: 'Chat on WhatsApp',
            footer_rights: 'All rights reserved.'
        },
        nl: {
            // Navigation
            nav_home: 'Home',
            nav_services: 'Diensten',
            nav_products: 'Producten',
            nav_about: 'Over Ons',
            nav_contact: 'Contact',
            
            // Hero Section
            hero_title: 'Slimme Tools voor Slimme Bedrijven',
            hero_subtitle: 'Wij bouwen intelligente digitale systemen die werk automatiseren, groei versnellen en concrete resultaten leveren.',
            hero_btn_primary: 'Begin Nu',
            hero_btn_secondary: 'Onze Diensten',
            
            // What We Do Section
            what_we_do_title: 'Wat Wij Doen',
            what_we_do_subtitle: 'Wij leveren geavanceerde digitale oplossingen die de manier waarop bedrijven werken transformeren',
            
            feature1_title: 'Web Automatisering & SaaS Systemen',
            feature1_desc: 'Bouw op maat gemaakte automatiseringstools en SaaS-platforms die uw bedrijfsprocessen stroomlijnen en productiviteit verhogen.',
            
            feature2_title: 'Slimme Dashboards & Bedrijfsinzichten',
            feature2_desc: 'Creëer krachtige analytische dashboards die realtime inzichten bieden voor datagestuurde beslissingen.',
            
            feature3_title: 'AI-aangedreven Productiviteitstools',
            feature3_desc: 'Benut kunstmatige intelligentie om repetitieve taken te automatiseren en teamproductiviteit te verbeteren.',
            
            feature4_title: 'Veilige & Snelle Webontwikkeling',
            feature4_desc: 'Ontwikkel veilige, bliksemsnelle webapplicaties met moderne technologieën en best practices.',
            
            // Products Section
            products_title: 'Onze Producten',
            products_subtitle: 'Echte, live producten klaar voor gebruik. Verken ons pakket van werkende digitale tools.',
            
            product1_title: 'Smart ZZP Hub',
            product1_desc: 'Een complete all-in-one werkplek voor ZZP\'ers. Beheer klanten, facturen, planning, taken en documenten via één slim dashboard voor zelfstandigen.',
            
            product2_title: 'ChefSense',
            product2_desc: 'Een slim kookplatform met meer dan 2.000 recepten en een AI-chefassistent genaamd "Sense". Het helpt bij menukeuze, ingrediëntenvervanging, voeding, kostenberekening en stap-voor-stap kookondersteuning.',
            
            product3_title: 'Product Ad Generator',
            product3_desc: 'AI-gestuurde generator voor marketingvisuals. Maakt direct hoogwaardige productafbeeldingen, advertenties en banners voor betere conversie.',
            
            product4_title: 'SmartOrderHub',
            product4_desc: 'Slim order- en kassaplatform voor restaurants. Verbindt tafels, keuken, bezorging en betalingen voor snellere service en minder fouten.',
            
            product5_title: 'MHM UBA Automations',
            product5_desc: 'Universal Business Automator — koppelt zakelijke tools en automatiseert workflows zoals facturatie, taakbeheer en rapportage, waardoor repetitief werk vrijwel verdwijnt.',
            
            product6_title: 'Custom Business Dashboards',
            product6_desc: 'Aangepaste KPI-dashboards en realtime-analyse voor bedrijven die slimmere beslissingen willen nemen.',
            
            product_tag_saas: 'SaaS Platform',
            product_tag_automation: 'Automatisering',
            product_tag_ai: 'AI Tool',
            product_tag_analytics: 'Analyse',
            
            // Footer
            footer_whatsapp: 'Chat op WhatsApp',
            footer_rights: 'Alle rechten voorbehouden.'
        }
    };
    
    // Current language (default: en)
    let currentLang = localStorage.getItem('mhmit-lang') || 'en';
    
    // =============================================
    // Language Switching Function
    // =============================================
    function switchLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('mhmit-lang', lang);
        
        // Update all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(function(element) {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        // Update language buttons
        document.querySelectorAll('.lang-btn').forEach(function(btn) {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Update page title
        if (lang === 'nl') {
            document.title = 'MHM IT - Slimme Tools voor Slimme Bedrijven';
        } else {
            document.title = 'MHM IT - Smart Tools for Smart Business';
        }
    }
    
    // =============================================
    // DOM Elements
    // =============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // =============================================
    // Language Button Event Listeners
    // =============================================
    if (langButtons.length > 0) {
        langButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                switchLanguage(lang);
            });
        });
    }
    
    // Initialize language on page load
    switchLanguage(currentLang);
    
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
    
    // Observe feature and product cards
    document.querySelectorAll('.feature-card, .product-card').forEach(function(card) {
        observer.observe(card);
    });
    
})();
