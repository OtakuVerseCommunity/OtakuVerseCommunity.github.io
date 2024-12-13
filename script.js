function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        const modalId = event.target.id;
        closeModal(modalId);
    }
}

// Enhanced Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg', 'navbar-scrolled');
        navbar.style.transform = 'translateY(0)';
        navLinks.forEach(link => {
            link.classList.add('nav-scrolled');
            link.style.transform = 'scale(0.95)';
            link.style.opacity = '0.9';
        });
    } else {
        navbar.classList.remove('shadow-lg', 'navbar-scrolled');
        navLinks.forEach(link => {
            link.classList.remove('nav-scrolled');
            link.style.transform = 'scale(1)';
            link.style.opacity = '1';
        });
    }
});

// Navbar Links Hover Effect
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.color = '#4FC3F7';
        this.style.transition = 'all 0.3s ease';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.color = '';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active Section Highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-section');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active-section');
        }
    });
});

// Advanced Scroll-Triggered Reveal Animations
function revealOnScroll() {
    const reveals = document.querySelectorAll('.feature-card, .event-card, section');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('reveal-active');
        } else {
            reveal.classList.remove('reveal-active');
        }
    });
}

// Parallax Effect for Header
function parallaxHeader() {
    const header = document.querySelector('header');
    let scrollPosition = window.pageYOffset;
    
    header.style.transform = `translateY(${scrollPosition * 0.3}px)`;
}

// Performance-Optimized Scroll Event Listener
window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
        revealOnScroll();
        parallaxHeader();
    });
});

// Enhanced Card Hover Interactions
document.querySelectorAll('.feature-card, .event-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Page Load Animation
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('header');
    const featureCards = document.querySelectorAll('.feature-card');
    const eventCards = document.querySelectorAll('.event-card');

    heroSection.style.opacity = '0';
    featureCards.forEach(card => card.style.opacity = '0');
    eventCards.forEach(card => card.style.opacity = '0');

    // Add CSS for reveal animations
    const style = document.createElement('style');
    style.innerHTML = `
        .feature-card, .event-card, section {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .reveal-active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        heroSection.style.transition = 'opacity 1s ease';
        heroSection.style.opacity = '1';
    }, 300);

    setTimeout(() => {
        featureCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 800);

    setTimeout(() => {
        eventCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 1400);
});


// Add mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    // Create mobile menu toggle
    const navContainer = document.querySelector('nav .container');
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.classList.add('mobile-menu-toggle');
    mobileMenuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    document.body.appendChild(mobileMenuToggle);

    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', () => {
        navContainer.classList.toggle('mobile-active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking outside or on a nav link
    document.addEventListener('click', (event) => {
        const isClickInsideNav = navContainer.contains(event.target);
        const isClickOnToggle = mobileMenuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navContainer.classList.contains('mobile-active')) {
            navContainer.classList.remove('mobile-active');
            mobileMenuToggle.classList.remove('active');
        }
    });

    // Add header text animation
    const heroTitle = document.getElementById('hero-title');
    heroTitle.classList.add('header-text-animation');
    heroTitle.setAttribute('data-text', heroTitle.textContent);
});