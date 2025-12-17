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
    // Detect language based on current page
    const currentPage = window.location.pathname;
    const isDutchPage = currentPage.includes('index-nl.html') || currentPage.includes('-nl.html');
    let currentLang = isDutchPage ? 'nl' : (localStorage.getItem('mhmit-lang') || 'en');
    
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
            'hero-title': 'Slimme tools. Echte logica. Geen onzin.',
            'hero-subtitle': 'Live BTW-preview, echte businesslogica en alles draait lokaal in je browser – zonder accounts of tracking.',
            'hero-cta-primary': 'Bekijk hoe het werkt →',
            'hero-cta-secondary': 'Bekijk hoe het werkt →',
            
            // Value Proposition
            'value-title': 'Why Businesses Choose Us',
            'value-subtitle': 'Three core values that drive everything we create',
            
            // Premium Automation Section
            'premium-automation-title': 'Powering Business With Smart Automation',
            'premium-automation-subtitle': 'At MHM IT, we turn manual work into smart digital workflows. We build automation solutions that seamlessly connect tools, eliminate repetitive tasks, and deliver real results. From invoicing and dashboards to AI-powered business intelligence, we help you work faster, smarter, and more profitably — all through intelligent software.',
            
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
            'contact_address_title': 'Visit Us',
            
            // Contact Page
            'contact_hero_title': 'Get In Touch',
            'contact_hero_subtitle': 'Have a project in mind? Questions about our services?<br>We\'d love to hear from you. Let\'s start a conversation.',
            'contact_email_title': 'Email Us',
            'contact_email_desc': 'Send us an email and we\'ll get back to you within 24 hours.',
            'contact_whatsapp_title': 'WhatsApp',
            'contact_whatsapp_desc': 'Chat with us directly on WhatsApp for quick responses.',
            'contact_whatsapp_btn': 'Chat on WhatsApp',
            'contact_linkedin_title': 'Connect on LinkedIn',
            'contact_linkedin_desc': 'Follow us on LinkedIn for updates and professional networking.',
            'contact_linkedin_btn': 'Visit LinkedIn',
            'contact_form_title': 'Send Us a Message',
            'contact_form_name': 'Name *',
            'contact_form_name_placeholder': 'Your full name',
            'contact_form_email': 'Email *',
            'contact_form_email_placeholder': 'your.email@example.com',
            'contact_form_company': 'Company (Optional)',
            'contact_form_company_placeholder': 'Your company name',
            'contact_form_service': 'I\'m interested in *',
            'contact_form_service_placeholder': 'Select a service...',
            'contact_form_service_opt1': 'SaaS & Automation Solutions',
            'contact_form_service_opt2': 'Smart Dashboards & Business Intelligence',
            'contact_form_service_opt3': 'AI-Powered Tools & Solutions',
            'contact_form_service_opt4': 'Web Development & Digital Solutions',
            'contact_form_service_opt5': 'Smart ZZP Hub Platform',
            'contact_form_service_opt6': 'Consulting & Technical Support',
            'contact_form_service_opt7': 'Other / General Inquiry',
            'contact_form_message': 'Message *',
            'contact_form_message_placeholder': 'Tell us about your project or inquiry...',
            'contact_form_submit': 'Send Message',
            'contact_form_note': 'We typically respond within 24 hours',
            'contact_faq_title': 'Frequently Asked Questions',
            'contact_faq_subtitle': 'Quick answers to common questions',
            'contact_faq_q1': 'How quickly can you start on my project?',
            'contact_faq_a1': 'We can typically start new projects within 1-2 weeks. For urgent requests, we offer expedited onboarding. Contact us to discuss your timeline and we\'ll do our best to accommodate your needs.',
            'contact_faq_q2': 'What is your pricing model?',
            'contact_faq_a2': 'We offer flexible pricing based on project scope, complexity, and timeline. Options include fixed-price projects, hourly rates, and monthly retainers for ongoing work. We\'ll provide a detailed quote after understanding your requirements.',
            'contact_faq_q3': 'Do you provide ongoing support after launch?',
            'contact_faq_a3': 'Yes! We offer comprehensive maintenance and support packages to ensure your solution continues to perform optimally. This includes bug fixes, updates, feature enhancements, and technical support.',
            'contact_faq_q4': 'Can you work with our existing systems?',
            'contact_faq_a4': 'Absolutely. We specialize in integrations and can work with your existing infrastructure, databases, and third-party services. We\'ll ensure seamless connectivity and data flow between systems.',
            'contact_faq_q5': 'What industries do you work with?',
            'contact_faq_a5': 'We\'ve worked with clients across various industries including freelancing platforms, food & hospitality, wholesale trading, e-commerce, and professional services. Our solutions are adaptable to your specific industry needs.',
            'contact_faq_q6': 'Do you work with international clients?',
            'contact_faq_a6': 'Yes! While we\'re based in the Netherlands, we work with clients globally. We\'re experienced in remote collaboration and can adapt to different time zones and communication preferences.',
            'contact_cta_title': 'Still Have Questions?',
            'contact_cta_subtitle': 'We\'re here to help. Reach out through your preferred channel<br>and we\'ll get back to you as soon as possible.',
            
            // Services Page
            'services_hero_title': 'Our Services',
            'services_hero_subtitle': 'Expert digital solutions tailored to your business needs.<br>From automation to analytics, we build technology that drives real results.',
            'services_saas_title': 'SaaS & Automation Solutions',
            'services_saas_desc': 'We build custom SaaS platforms and automation systems that streamline your workflows, eliminate repetitive tasks, and scale effortlessly with your business growth. From freelancer management systems to restaurant ordering platforms, we create solutions that solve real-world problems.',
            'services_saas_item1': 'Custom SaaS platform development',
            'services_saas_item2': 'Business process automation',
            'services_saas_item3': 'Workflow integration & optimization',
            'services_saas_item4': 'API development & integrations',
            'services_dashboards_title': 'Smart Dashboards & Business Intelligence',
            'services_dashboards_desc': 'Transform complex data into actionable insights with our custom analytics dashboards. We create powerful, real-time visualization tools that help you understand your business performance, identify trends, and make data-driven decisions with confidence.',
            'services_dashboards_item1': 'Custom KPI dashboards',
            'services_dashboards_item2': 'Real-time data visualization',
            'services_dashboards_item3': 'Business analytics & reporting',
            'services_dashboards_item4': 'Performance monitoring systems',
            'services_ai_title': 'AI-Powered Tools & Solutions',
            'services_ai_desc': 'Harness the power of artificial intelligence to transform your business operations. We develop intelligent tools that automate customer service, generate content, analyze data, and enhance decision-making—helping your team work smarter and deliver better results.',
            'services_ai_item1': 'AI-powered search & recommendations',
            'services_ai_item2': 'Content generation & automation',
            'services_ai_item3': 'Data analysis & insights',
            'services_ai_item4': 'Intelligent assistants & chatbots',
            'services_web_title': 'Web Development & Digital Solutions',
            'services_web_desc': 'Build fast, responsive, and user-friendly web applications that engage your audience and drive conversions. From corporate websites to complex web platforms, we create digital experiences that combine stunning design with powerful functionality.',
            'services_web_item1': 'Full-stack web applications',
            'services_web_item2': 'Responsive & mobile-first design',
            'services_web_item3': 'Progressive web apps (PWA)',
            'services_web_item4': 'Performance optimization & SEO',
            'services_desktop_title': 'Desktop Application Development',
            'services_desktop_desc': 'Create powerful desktop applications for Windows, macOS, and Linux that leverage native capabilities for maximum performance. Perfect for applications requiring offline functionality, intensive processing, or deep system integration.',
            'services_desktop_item1': 'Cross-platform desktop apps (Electron)',
            'services_desktop_item2': 'Offline-first applications',
            'services_desktop_item3': 'Local database solutions',
            'services_desktop_item4': 'Auto-update & deployment systems',
            'services_consulting_title': 'Consulting & Technical Support',
            'services_consulting_desc': 'Get expert guidance on your digital strategy, technology stack, and implementation approach. Our consultants bring years of real-world experience to help you make informed decisions, avoid costly mistakes, and accelerate your path to success.',
            'services_consulting_item1': 'Technology strategy & roadmapping',
            'services_consulting_item2': 'Architecture review & optimization',
            'services_consulting_item3': 'Ongoing maintenance & support',
            'services_consulting_item4': 'Digital transformation consulting',
            'services_cta_title': 'Ready to Start Your Project?',
            'services_cta_subtitle': 'Let\'s discuss how we can help you achieve your goals.<br>Contact us today for a free consultation.',
            
            // About Page
            'about_hero_title': 'About MHM IT',
            'about_hero_subtitle': 'We\'re a professional software company developing intelligent automation systems<br>and digital tools that empower businesses with smarter technology.',
            'about_mission_title': 'Our Mission',
            'about_mission_desc': 'To empower businesses with innovative technology solutions that automate workflows, enhance productivity, and drive measurable growth. We believe every company deserves access to enterprise-grade digital tools that are both powerful and accessible.',
            'about_vision_title': 'Our Vision',
            'about_vision_desc': 'To become the go-to partner for businesses seeking intelligent automation and AI-driven solutions. We\'re building an ecosystem of interconnected SaaS products that work together seamlessly to solve real business challenges.',
            'about_values_title': 'Our Values',
            'about_values_desc': 'Innovation, quality, and partnership drive everything we do. We\'re committed to building solutions that are technically excellent, user-friendly, and deliver genuine value to our clients—backed by responsive support and continuous improvement.',
            'about_sets_apart_title': 'What Sets Us Apart',
            'about_sets_apart_subtitle': 'We\'re not just developers—we\'re problem solvers and business partners',
            'about_feature1_title': 'Real, Working Products',
            'about_feature1_desc': 'We don\'t just talk about innovation—we ship it. Our portfolio includes live SaaS platforms, AI-powered tools, and automation systems actively serving real customers and solving real problems.',
            'about_feature2_title': 'Global Perspective',
            'about_feature2_desc': 'With multilingual support across 6+ languages and clients from diverse markets, we understand the nuances of building solutions that work across cultures and geographies.',
            'about_feature3_title': 'Technical Excellence',
            'about_feature3_desc': 'Our team combines deep technical expertise with practical business knowledge. We build on solid foundations using proven technologies, modern architectures, and industry best practices.',
            'about_feature4_title': 'Agile & Responsive',
            'about_feature4_desc': 'We move fast without compromising quality. Our agile development approach means rapid iterations, continuous feedback, and solutions that evolve with your needs.',
            
            // Products Page
            'products_hero_title': 'Our Products',
            'products_hero_subtitle': 'Explore our suite of proven digital tools—ready to use, battle-tested, and delivering results.<br>Each product is designed to solve real business challenges and drive measurable growth.',
            'products_zzphub_title': 'Smart ZZP Hub',
            'products_zzphub_tag1': 'SaaS Platform',
            'products_zzphub_tag2': 'Active Development',
            'products_zzphub_desc': 'A comprehensive dual-portal platform designed specifically for Dutch ZZP (freelance) professionals and the mid-sized companies they work with. Smart ZZP Hub automates the entire weekly workflow from work registration to invoice generation, eliminating manual processes and reducing administrative overhead.',
            'products_zzphub_features': 'Key Features',
            'products_zzphub_feature1': 'Company Portal: Manage ZZP profiles, log work entries (stops, hours, locations, points, projects), generate weekly statements, and export as PDF/CSV',
            'products_zzphub_feature2': 'ZZP Portal: View weekly statements, generate invoices with one click, track expenses (fuel, maintenance, materials), and manage payment status',
            'products_zzphub_feature3': 'Automated Workflows: Streamlined process from work registration to statement generation to invoice creation',
            'products_zzphub_feature4': 'Multi-tariff Support: Flexible pricing models including stop-based, hourly, location-based, point-based, and project-based rates',
            'products_zzphub_feature5': 'Expense Tracking: Basic expense management for freelancers to track business costs',
            'products_zzphub_tech': 'Technology Stack',
            'products_zzphub_tech_desc': 'Backend: Node.js + Express REST API | Database: PostgreSQL | UI Language: Dutch (with English codebase)',
            'products_chefsense_title': 'ChefSense',
            'products_chefsense_tag1': 'AI Tool',
            'products_chefsense_tag2': 'Live Platform',
            'products_chefsense_desc': 'A global recipe library featuring over 2,000 recipes from around the world, combined with an intelligent AI-powered chef assistant. ChefSense makes cooking accessible and enjoyable by providing detailed recipes, ingredient suggestions, and personalized cooking guidance—all available for free.',
            'products_chefsense_features': 'Key Features',
            'products_chefsense_feature1': 'Country-Based Browsing: Explore authentic recipes from Italy, India, Japan, Mexico, Turkey, Morocco, France, Thailand, Lebanon, Syria, and many more countries',
            'products_chefsense_feature2': 'AI Chef Assistant: Intelligent local search that suggests recipes based on available ingredients, country preferences, and difficulty level',
            'products_chefsense_feature3': 'Comprehensive Recipe Data: Each recipe includes English and local names, detailed descriptions, precise ingredient quantities, step-by-step instructions, cooking time, difficulty level, and dietary tags',
            'products_chefsense_feature4': 'Dietary Tags: Filter by vegan, spicy, gluten-free, dessert, quick meals, and more',
            'products_chefsense_feature5': 'Cooking Mode: Mobile-friendly interface optimized for use while cooking',
            'products_chefsense_feature6': 'Nutrition Information: Optional nutritional data for health-conscious users',
            'products_chefsense_tech': 'Technology Stack',
            'products_chefsense_tech_desc': 'Frontend: Static HTML5, CSS3, Vanilla JavaScript | Data: JSON-based recipe database | Hosting: GitHub Pages (Free) | Architecture: SPA-like experience with no backend required'
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
            'hero-subtitle': 'Wij bouwen intelligente digitale systemen die werk automatiseren, groei versnellen en echte resultaten leveren. Verander je processen in slimme workflows met MHM IT.',
            'hero-cta-primary': 'Start Vandaag',
            'hero-cta-secondary': 'Ontdek Gratis Tools',
            
            // Value Proposition
            'value-title': 'Waarom Bedrijven Voor Ons Kiezen',
            'value-subtitle': 'Drie kernwaarden die alles wat we creëren drijven',
            
            // Premium Automation Section
            'premium-automation-title': 'Slimmere Bedrijfsvoering met Automatisering',
            'premium-automation-subtitle': 'Bij MHM IT transformeren we handmatig werk naar slimme digitale workflows. We bouwen automatiseringsoplossingen die tools naadloos verbinden, repetitieve taken elimineren en echte resultaten leveren. Van facturering en dashboards tot AI-aangedreven business intelligence, we helpen je sneller, slimmer en winstgevender te werken — allemaal door intelligente software.',
            
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
            'contact_address_title': 'Bezoek Ons',
            
            // Contact Page
            'contact_hero_title': 'Neem Contact Op',
            'contact_hero_subtitle': 'Heb je een project in gedachten? Vragen over onze diensten?<br>We horen graag van je. Laten we een gesprek starten.',
            'contact_email_title': 'Mail Ons',
            'contact_email_desc': 'Stuur ons een e-mail en we nemen binnen 24 uur contact op.',
            'contact_whatsapp_title': 'WhatsApp',
            'contact_whatsapp_desc': 'Chat direct met ons via WhatsApp voor snelle antwoorden.',
            'contact_whatsapp_btn': 'Chat via WhatsApp',
            'contact_linkedin_title': 'Verbinden op LinkedIn',
            'contact_linkedin_desc': 'Volg ons op LinkedIn voor updates en professioneel netwerken.',
            'contact_linkedin_btn': 'Bezoek LinkedIn',
            'contact_form_title': 'Stuur Ons een Bericht',
            'contact_form_name': 'Naam *',
            'contact_form_name_placeholder': 'Uw volledige naam',
            'contact_form_email': 'E-mail *',
            'contact_form_email_placeholder': 'uw.email@voorbeeld.nl',
            'contact_form_company': 'Bedrijf (Optioneel)',
            'contact_form_company_placeholder': 'Uw bedrijfsnaam',
            'contact_form_service': 'Ik ben geïnteresseerd in *',
            'contact_form_service_placeholder': 'Selecteer een dienst...',
            'contact_form_service_opt1': 'SaaS & Automatiseringsoplossingen',
            'contact_form_service_opt2': 'Slimme Dashboards & Business Intelligence',
            'contact_form_service_opt3': 'AI-aangedreven Tools & Oplossingen',
            'contact_form_service_opt4': 'Webontwikkeling & Digitale Oplossingen',
            'contact_form_service_opt5': 'Smart ZZP Hub Platform',
            'contact_form_service_opt6': 'Consultancy & Technische Ondersteuning',
            'contact_form_service_opt7': 'Anders / Algemene Vraag',
            'contact_form_message': 'Bericht *',
            'contact_form_message_placeholder': 'Vertel ons over uw project of vraag...',
            'contact_form_submit': 'Verstuur Bericht',
            'contact_form_note': 'We reageren meestal binnen 24 uur',
            'contact_faq_title': 'Veelgestelde Vragen',
            'contact_faq_subtitle': 'Snelle antwoorden op veelgestelde vragen',
            'contact_faq_q1': 'Hoe snel kunt u met mijn project starten?',
            'contact_faq_a1': 'We kunnen meestal binnen 1-2 weken met nieuwe projecten starten. Voor urgente verzoeken bieden we versneld onboarden. Neem contact op om uw tijdlijn te bespreken en we zullen ons best doen om aan uw behoeften te voldoen.',
            'contact_faq_q2': 'Wat is uw prijsmodel?',
            'contact_faq_a2': 'We bieden flexibele prijzen op basis van projectomvang, complexiteit en tijdlijn. Opties zijn vaste prijzen, uurtarieven en maandelijkse retainers voor doorlopend werk. We geven een gedetailleerde offerte na het begrijpen van uw vereisten.',
            'contact_faq_q3': 'Bieden jullie doorlopende ondersteuning na de lancering?',
            'contact_faq_a3': 'Ja! We bieden uitgebreide onderhouds- en ondersteuningspakketten om ervoor te zorgen dat uw oplossing optimaal blijft presteren. Dit omvat bugfixes, updates, functie-uitbreidingen en technische ondersteuning.',
            'contact_faq_q4': 'Kunnen jullie werken met onze bestaande systemen?',
            'contact_faq_a4': 'Absoluut. We zijn gespecialiseerd in integraties en kunnen werken met uw bestaande infrastructuur, databases en diensten van derden. We zorgen voor naadloze connectiviteit en gegevensstroom tussen systemen.',
            'contact_faq_q5': 'Met welke branches werken jullie?',
            'contact_faq_a5': 'We hebben gewerkt met klanten uit verschillende branches, waaronder freelanceplatforms, horeca, groothandel, e-commerce en professionele diensten. Onze oplossingen zijn aanpasbaar aan uw specifieke branchebehoeften.',
            'contact_faq_q6': 'Werken jullie met internationale klanten?',
            'contact_faq_a6': 'Ja! Hoewel we gevestigd zijn in Nederland, werken we met klanten wereldwijd. We hebben ervaring met samenwerking op afstand en kunnen ons aanpassen aan verschillende tijdzones en communicatievoorkeuren.',
            'contact_cta_title': 'Nog Vragen?',
            'contact_cta_subtitle': 'We helpen je graag. Neem contact op via jouw voorkeurskanaal<br>en we nemen zo snel mogelijk contact met je op.',
            
            // Services Page
            'services_hero_title': 'Onze Diensten',
            'services_hero_subtitle': 'Deskundige digitale oplossingen op maat voor uw bedrijfsbehoeften.<br>Van automatisering tot analytics, we bouwen technologie die echte resultaten oplevert.',
            'services_saas_title': 'SaaS & Automatiseringsoplossingen',
            'services_saas_desc': 'We bouwen aangepaste SaaS-platforms en automatiseringssystemen die uw workflows stroomlijnen, repetitieve taken elimineren en moeiteloos meeschalen met uw bedrijfsgroei. Van freelancerbeheerssystemen tot restaurantbestelplatforms, we creëren oplossingen die echte problemen oplossen.',
            'services_saas_item1': 'Aangepaste SaaS-platformontwikkeling',
            'services_saas_item2': 'Bedrijfsprocesautomatisering',
            'services_saas_item3': 'Workflow-integratie & optimalisatie',
            'services_saas_item4': 'API-ontwikkeling & integraties',
            'services_dashboards_title': 'Slimme Dashboards & Business Intelligence',
            'services_dashboards_desc': 'Transformeer complexe data in bruikbare inzichten met onze aangepaste analytics dashboards. We creëren krachtige real-time visualisatietools die u helpen uw bedrijfsprestaties te begrijpen, trends te identificeren en met vertrouwen datagestuurde beslissingen te nemen.',
            'services_dashboards_item1': 'Aangepaste KPI-dashboards',
            'services_dashboards_item2': 'Realtime datavisualisatie',
            'services_dashboards_item3': 'Bedrijfsanalyse & rapportage',
            'services_dashboards_item4': 'Prestatiemonitoringsystemen',
            'services_ai_title': 'AI-aangedreven Tools & Oplossingen',
            'services_ai_desc': 'Benut de kracht van kunstmatige intelligentie om uw bedrijfsvoering te transformeren. We ontwikkelen intelligente tools die klantenservice automatiseren, content genereren, data analyseren en besluitvorming verbeteren—uw team helpen slimmer te werken en betere resultaten te leveren.',
            'services_ai_item1': 'AI-aangedreven zoeken & aanbevelingen',
            'services_ai_item2': 'Contentgeneratie & automatisering',
            'services_ai_item3': 'Data-analyse & inzichten',
            'services_ai_item4': 'Intelligente assistenten & chatbots',
            'services_web_title': 'Webontwikkeling & Digitale Oplossingen',
            'services_web_desc': 'Bouw snelle, responsieve en gebruiksvriendelijke webapplicaties die uw publiek betrekken en conversies stimuleren. Van zakelijke websites tot complexe webplatforms, we creëren digitale ervaringen die prachtig design combineren met krachtige functionaliteit.',
            'services_web_item1': 'Full-stack webapplicaties',
            'services_web_item2': 'Responsief & mobile-first design',
            'services_web_item3': 'Progressieve web apps (PWA)',
            'services_web_item4': 'Prestatie-optimalisatie & SEO',
            'services_desktop_title': 'Desktop Applicatie Ontwikkeling',
            'services_desktop_desc': 'Creëer krachtige desktopapplicaties voor Windows, macOS en Linux die native mogelijkheden benutten voor maximale prestaties. Perfect voor applicaties die offline functionaliteit, intensieve verwerking of diepe systeemintegratie vereisen.',
            'services_desktop_item1': 'Cross-platform desktop apps (Electron)',
            'services_desktop_item2': 'Offline-first applicaties',
            'services_desktop_item3': 'Lokale database oplossingen',
            'services_desktop_item4': 'Auto-update & deployment systemen',
            'services_consulting_title': 'Consultancy & Technische Ondersteuning',
            'services_consulting_desc': 'Krijg deskundig advies over uw digitale strategie, technologiestack en implementatiebenadering. Onze consultants brengen jarenlange praktijkervaring mee om u te helpen weloverwogen beslissingen te nemen, kostbare fouten te vermijden en uw pad naar succes te versnellen.',
            'services_consulting_item1': 'Technologiestrategie & roadmapping',
            'services_consulting_item2': 'Architectuur review & optimalisatie',
            'services_consulting_item3': 'Doorlopend onderhoud & support',
            'services_consulting_item4': 'Digitale transformatie consulting',
            'services_cta_title': 'Klaar om Uw Project te Starten?',
            'services_cta_subtitle': 'Laten we bespreken hoe we u kunnen helpen uw doelen te bereiken.<br>Neem vandaag nog contact op voor een gratis consultatie.',
            
            // About Page
            'about_hero_title': 'Over MHM IT',
            'about_hero_subtitle': 'We zijn een professioneel softwarebedrijf dat intelligente automatiseringssystemen ontwikkelt<br>en digitale tools die bedrijven met slimmere technologie versterken.',
            'about_mission_title': 'Onze Missie',
            'about_mission_desc': 'Bedrijven versterken met innovatieve technologieoplossingen die workflows automatiseren, productiviteit verhogen en meetbare groei stimuleren. We geloven dat elk bedrijf toegang verdient tot digitale tools van ondernemingsniveau die zowel krachtig als toegankelijk zijn.',
            'about_vision_title': 'Onze Visie',
            'about_vision_desc': 'De go-to partner worden voor bedrijven die op zoek zijn naar intelligente automatisering en AI-gedreven oplossingen. We bouwen een ecosysteem van onderling verbonden SaaS-producten die naadloos samenwerken om echte zakelijke uitdagingen op te lossen.',
            'about_values_title': 'Onze Waarden',
            'about_values_desc': 'Innovatie, kwaliteit en partnerschap drijven alles wat we doen. We zijn toegewijd aan het bouwen van oplossingen die technisch uitstekend, gebruiksvriendelijk zijn en echte waarde leveren aan onze klanten—ondersteund door responsieve support en voortdurende verbetering.',
            'about_sets_apart_title': 'Wat Ons Onderscheidt',
            'about_sets_apart_subtitle': 'We zijn niet alleen ontwikkelaars—we zijn probleemoplossers en zakelijke partners',
            'about_feature1_title': 'Echte, Werkende Producten',
            'about_feature1_desc': 'We praten niet alleen over innovatie—we leveren het. Ons portfolio omvat live SaaS-platforms, AI-aangedreven tools en automatiseringssystemen die actief echte klanten bedienen en echte problemen oplossen.',
            'about_feature2_title': 'Wereldwijd Perspectief',
            'about_feature2_desc': 'Met meertalige ondersteuning in 6+ talen en klanten uit diverse markten, begrijpen we de nuances van het bouwen van oplossingen die werken in verschillende culturen en geografieën.',
            'about_feature3_title': 'Technische Uitmuntendheid',
            'about_feature3_desc': 'Ons team combineert diepe technische expertise met praktische bedrijfskennis. We bouwen op solide fundamenten met bewezen technologieën, moderne architecturen en best practices uit de industrie.',
            'about_feature4_title': 'Wendbaar & Responsief',
            'about_feature4_desc': 'We bewegen snel zonder de kwaliteit in gevaar te brengen. Onze agile ontwikkelingsaanpak betekent snelle iteraties, continue feedback en oplossingen die met uw behoeften meegroeien.',
            
            // Products Page
            'products_hero_title': 'Onze Producten',
            'products_hero_subtitle': 'Ontdek onze suite van bewezen digitale tools—klaar voor gebruik, getest in de praktijk en levert resultaten.<br>Elk product is ontworpen om echte zakelijke uitdagingen op te lossen en meetbare groei te stimuleren.',
            'products_zzphub_title': 'Smart ZZP Hub',
            'products_zzphub_tag1': 'SaaS Platform',
            'products_zzphub_tag2': 'Actieve Ontwikkeling',
            'products_zzphub_desc': 'Een uitgebreid dual-portal platform speciaal ontworpen voor Nederlandse ZZP-professionals en de middelgrote bedrijven waarmee ze werken. Smart ZZP Hub automatiseert de hele wekelijkse workflow van werkregistratie tot factuurgeneratie, elimineert handmatige processen en vermindert administratieve overhead.',
            'products_zzphub_features': 'Belangrijkste Functies',
            'products_zzphub_feature1': 'Bedrijfsportaal: Beheer ZZP-profielen, registreer werkactiviteiten (stops, uren, locaties, punten, projecten), genereer wekelijkse overzichten en exporteer als PDF/CSV',
            'products_zzphub_feature2': 'ZZP-portaal: Bekijk wekelijkse overzichten, genereer facturen met één klik, houd onkosten bij (brandstof, onderhoud, materialen) en beheer betalingsstatus',
            'products_zzphub_feature3': 'Geautomatiseerde Workflows: Gestroomlijnd proces van werkregistratie tot overzichtgeneratie tot factuuraanmaak',
            'products_zzphub_feature4': 'Multi-tarief Ondersteuning: Flexibele prijsmodellen waaronder stop-gebaseerd, uurtarief, locatie-gebaseerd, punt-gebaseerd en project-gebaseerde tarieven',
            'products_zzphub_feature5': 'Onkostenbeheer: Basis onkostenbeheer voor freelancers om bedrijfskosten bij te houden',
            'products_zzphub_tech': 'Technologie Stack',
            'products_zzphub_tech_desc': 'Backend: Node.js + Express REST API | Database: PostgreSQL | UI Taal: Nederlands (met Engelse codebase)',
            'products_chefsense_title': 'ChefSense',
            'products_chefsense_tag1': 'AI Tool',
            'products_chefsense_tag2': 'Live Platform',
            'products_chefsense_desc': 'Een wereldwijde receptenbibliotheek met meer dan 2.000 recepten van over de hele wereld, gecombineerd met een intelligente AI-aangedreven chef-assistent. ChefSense maakt koken toegankelijk en plezierig door gedetailleerde recepten, ingrediëntsuggesties en persoonlijke kookbegeleiding te bieden—allemaal gratis beschikbaar.',
            'products_chefsense_features': 'Belangrijkste Functies',
            'products_chefsense_feature1': 'Land-gebaseerd Browsen: Ontdek authentieke recepten uit Italië, India, Japan, Mexico, Turkije, Marokko, Frankrijk, Thailand, Libanon, Syrië en vele andere landen',
            'products_chefsense_feature2': 'AI Chef Assistent: Intelligente lokale zoekfunctie die recepten voorstelt op basis van beschikbare ingrediënten, landvoorkeuren en moeilijkheidsgraad',
            'products_chefsense_feature3': 'Uitgebreide Receptdata: Elk recept bevat Engelse en lokale namen, gedetailleerde beschrijvingen, precieze ingrediënthoeveelheden, stapsgewijze instructies, kooktijd, moeilijkheidsgraad en dieet-tags',
            'products_chefsense_feature4': 'Dieet-tags: Filter op veganistisch, pittig, glutenvrij, dessert, snelle maaltijden en meer',
            'products_chefsense_feature5': 'Kookmodus: Mobielvriendelijke interface geoptimaliseerd voor gebruik tijdens het koken',
            'products_chefsense_feature6': 'Voedingsinformatie: Optionele voedingsgegevens voor gezondheidsbewuste gebruikers',
            'products_chefsense_tech': 'Technologie Stack',
            'products_chefsense_tech_desc': 'Frontend: Statische HTML5, CSS3, Vanilla JavaScript | Data: JSON-gebaseerde receptendatabase | Hosting: GitHub Pages (Gratis) | Architectuur: SPA-achtige ervaring zonder backend vereist'
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
        const heroCtaPrimary = document.querySelector('.hero-buttons .btn-primary');
        const heroCtaSecondary = document.querySelector('.hero-buttons .btn-secondary');
        
        if (heroTitle) heroTitle.textContent = translation['hero-title'];
        if (heroSubtitle) heroSubtitle.textContent = translation['hero-subtitle'];
        if (heroCtaPrimary) heroCtaPrimary.textContent = translation['hero-cta-primary'];
        if (heroCtaSecondary) heroCtaSecondary.textContent = translation['hero-cta-secondary'];
        
        // Update value proposition section
        const valueTitle = document.querySelector('.value-proposition .section-title');
        const valueSubtitle = document.querySelector('.value-proposition .section-subtitle');
        
        if (valueTitle) valueTitle.textContent = translation['value-title'];
        if (valueSubtitle) valueSubtitle.textContent = translation['value-subtitle'];
        
        // Update premium automation section
        const premiumTitle = document.querySelector('.premium-automation .section-title');
        const premiumSubtitle = document.querySelector('.premium-automation .section-subtitle');
        
        if (premiumTitle) premiumTitle.textContent = translation['premium-automation-title'];
        if (premiumSubtitle) premiumSubtitle.textContent = translation['premium-automation-subtitle'];
        
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
        
        // Update placeholders
        const placeholderElements = document.querySelectorAll('[data-placeholder-key]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-placeholder-key');
            if (translation[key]) {
                element.setAttribute('placeholder', translation[key]);
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
            
            // If switching languages, redirect to appropriate page
            if (lang === 'nl' && !isDutchPage) {
                // Redirect to Dutch version
                const currentFileName = window.location.pathname.split('/').pop() || 'index.html';
                let dutchPage = 'index-nl.html'; // Default to homepage
                
                // Map pages to their Dutch equivalents
                if (currentFileName === 'contact.html') {
                    dutchPage = 'contact-nl.html';
                } else if (currentFileName === 'index.html') {
                    dutchPage = 'index-nl.html';
                }
                // For pages without Dutch version (services, products, about), redirect to homepage
                
                window.location.href = dutchPage;
            } else if (lang === 'en' && isDutchPage) {
                // Redirect to English version
                const currentFileName = window.location.pathname.split('/').pop() || 'index-nl.html';
                let englishPage = 'index.html'; // Default to homepage
                
                // Map Dutch pages to their English equivalents
                if (currentFileName === 'contact-nl.html') {
                    englishPage = 'contact.html';
                } else if (currentFileName === 'index-nl.html') {
                    englishPage = 'index.html';
                }
                
                window.location.href = englishPage;
            } else {
                updateLanguage(lang);
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
        heroTitle.setAttribute('data-text', heroTitle.textContent);
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
