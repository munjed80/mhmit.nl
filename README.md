# MHM IT — Company Website and Product Hub

A high-end, professional, fully responsive multilingual static website for MHM IT (mhmit.nl).

## 🌟 Features

### Multilingual Support
- **Default Language**: English (EN)
- **Second Language**: Dutch (NL)
- Language switcher visible in navbar
- All content toggles dynamically between languages using JavaScript
- Language preference saved in localStorage

### Design
- Dark premium metallic theme
- Electric-blue and purple gradient accents
- Mobile-first responsive design
- Smooth animations and micro-interactions
- Accessible and SEO-ready

### Technologies
- HTML5 + CSS3 + JavaScript (no frameworks)
- Clean semantic code
- CSS custom properties (variables)
- Vanilla JavaScript for interactivity

## 📁 Project Structure

```
/
  index.html          # Home page with hero, features, and products
  about.html          # About page (to be implemented)
  services.html       # Services page (to be implemented)
  products.html       # Products page (to be implemented)
  contact.html        # Contact page (to be implemented)
  assets/
    css/
      styles.css      # Main stylesheet with CSS variables
    js/
      scripts.js      # JavaScript for navigation, language switching, animations
    images/           # Image assets
  README.md
  CNAME               # Domain configuration (mhmit.nl)
```

## 🎨 Design System

### CSS Variables
```css
--bg: #0d1117              /* Primary background */
--bg-soft: #111827         /* Secondary background */
--text: #e5e7eb            /* Primary text color */
--muted: #9ca3af           /* Secondary text color */
--accent-blue: #3b82f6     /* Blue accent */
--accent-purple: #6d28d9   /* Purple accent */
```

## 🚀 Current Implementation (index.html)

### 1. Sticky Navigation Bar
- Transparent navbar with blur effect on scroll
- Logo on the left
- Navigation menu (Home, Services, Products, About, Contact)
- Language toggle (EN / NL)
- Mobile-responsive hamburger menu

### 2. Hero Section
- Full viewport height
- Gradient background with radial overlay
- Multilingual content:
  - **EN**: "Smart Tools for Smart Business"
  - **NL**: "Slimme Tools voor Slimme Bedrijven"
- Two CTA buttons: "Get Started" (primary) and "Our Services" (secondary)

### 3. "What We Do" Section
Four feature cards showcasing core services:
- Web Automation & SaaS Systems
- Smart Dashboards & Business Insights
- AI-powered Productivity Tools
- Secure & Fast Web Development

### 4. "Our Products" Section
Five product cards:
- Smart ZZP Hub
- ChefSense
- Product Ad Generator
- SmartOrderHub
- MHM UBA Automations

### 5. Footer
- Contact email: info@mhmit.nl
- WhatsApp quick-chat button
- Copyright notice
- Continues working with language switcher

## 🔧 JavaScript Features

- **Language Switching**: All text content dynamically switches between EN/NL
- **Smooth Scrolling**: Anchor links scroll smoothly to sections
- **Mobile Menu**: Responsive hamburger menu with slide-in animation
- **Sticky Header**: Navbar becomes more opaque on scroll
- **Fade-in Animations**: Cards fade in when scrolling into view
- **Active Link Highlighting**: Current page highlighted in navigation

## 📱 Responsive Design

- **Desktop**: Full layout with grid-based cards
- **Tablet** (≤768px): Adjusted spacing and font sizes
- **Mobile** (≤480px): Single-column layout, mobile menu

## 🌐 Deployment

The website is configured for GitHub Pages deployment with the custom domain `mhmit.nl` via the CNAME file.

## 📝 Next Steps

Pages to be added:
- about.html - Company mission and team
- services.html - Detailed service offerings
- products.html - Full product catalog
- contact.html - Contact form and location info

---

**Note**: The core multilingual homepage is complete with all required sections, responsive design, and language switching functionality. Additional pages referenced in the navigation will be implemented in future updates.
/  
  index.html  
  about.html  
  services.html  
  products.html  
  contact.html  
  assets/  
    css/  
      styles.css  
    js/  
      scripts.js  
    images/  
  README.md  
  CNAME  

