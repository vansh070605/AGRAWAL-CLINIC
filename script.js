// Global Variables
let isScrolled = false;
let animationObserver;

// SINGLE DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing website...');
    
    // Initialize all components in order
    initPreloader();
    initNavigation();
    initMobileMenu();
    initScrollAnimations();
    initCounters();
    initFormHandling();
    initParallaxEffects();
    initInteractiveElements();
    initProgressBars();
    initMobileOptimizations();
    initWhatsAppButton();
    initAOS();
});

// Preloader
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        // Simulate loading time
        setTimeout(() => {
            preloader.classList.add('hidden');
            
            // Remove preloader from DOM after animation
            setTimeout(() => {
                preloader.style.display = 'none';
                // Start hero animations
                startHeroAnimations();
            }, 500);
        }, 2500);
    }
}

// Hero Animations
function startHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-text > *');
    
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Navigation
// Navigation
// Enhanced Navigation Function
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navbar) return;
    
    // Throttled scroll handler for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        // Update navbar appearance
        if (scrollTop > 100 && !isScrolled) {
            navbar.classList.add('scrolled');
            isScrolled = true;
        } else if (scrollTop <= 100 && isScrolled) {
            navbar.classList.remove('scrolled');
            isScrolled = false;
        }
        
        // Throttle active link updates
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateActiveNavLink();
        }, 100);
    });
    
    // Desktop-only smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const isMobile = window.innerWidth <= 768;
            const navMenu = document.getElementById('nav-menu');
            const isMenuActive = navMenu && navMenu.classList.contains('active');
            
            // Only handle on desktop or when mobile menu is not active
            if (!isMobile || !isMenuActive) {
                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();
                    
                    // Set active class immediately
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    this.classList.add('active');
                    
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 100;
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });
}



// Enhanced Update Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.pageYOffset;
    
    // Find the current section
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200; // Increased offset for mobile
        const sectionHeight = section.clientHeight;
        const sectionBottom = sectionTop + sectionHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // If no section is found, default to the first visible section
    if (!currentSection && sections.length > 0) {
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 300;
            if (scrollPosition >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });
    }
    
    // Update active class
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
    
    console.log('Current section:', currentSection, 'Scroll position:', scrollPosition);
}


// FIXED Mobile Menu Function
// ENHANCED Mobile Menu Function
// Fixed Mobile Menu Function
function initMobileMenu() {
    console.log('Initializing mobile menu...');
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;
    
    if (!hamburger || !navMenu) {
        console.error('Hamburger or nav menu element not found!');
        return;
    }
    
    // Main hamburger click handler
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = hamburger.classList.contains('active');
        
        if (isActive) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        } else {
            hamburger.classList.add('active');
            navMenu.classList.add('active');
            body.classList.add('menu-open');
        }
    });
    
    // Enhanced nav link handling for mobile
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const isMobile = window.innerWidth <= 768;
            
            // Always close mobile menu first
            if (isMobile && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
            
            // Handle section navigation
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                
                // Manually set active class immediately
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
                
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    setTimeout(() => {
                        const offsetTop = targetSection.offsetTop - 100;
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                        
                        // Force update active class after scroll
                        setTimeout(() => {
                            updateActiveNavLink();
                        }, 500);
                    }, isMobile ? 300 : 0);
                }
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active')) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
}



// Scroll Animations
function initScrollAnimations() {
    // Create intersection observer
    animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for staggered animations
                if (entry.target.classList.contains('services-grid')) {
                    animateServiceCards();
                }
                
                if (entry.target.classList.contains('qualification-list')) {
                    animateQualifications();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements
    const animatedElements = document.querySelectorAll(`
        .section-header,
        .about-content,
        .services-grid,
        .service-card,
        .experience-content,
        .contact-content,
        .qualification-list,
        .hero-stats
    `);
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
}

// Animate Service Cards
function animateServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Animate Qualifications
function animateQualifications() {
    const qualificationItems = document.querySelectorAll('.qualification-item');
    
    qualificationItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Observe counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Progress Bars
function initProgressBars() {
    const progressBars = document.querySelectorAll('.circle-progress');
    
    const animateProgress = (progressBar) => {
        const percentage = parseInt(progressBar.getAttribute('data-percentage'));
        const circle = progressBar.querySelector('.circle');
        
        if (circle) {
            const circumference = 2 * Math.PI * 45; // radius = 45
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = circumference;
            
            setTimeout(() => {
                const offset = circumference - (percentage / 100) * circumference;
                circle.style.strokeDashoffset = offset;
            }, 500);
        }
    };
    
    // Observe progress bars
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgress(entry.target);
                progressObserver.unobserve(entry.target);
            }
        });
    });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Form Handling
function initFormHandling() {
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
        
        // Real-time validation
        const formInputs = appointmentForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    }
}

// Form Submission Handler
function handleFormSubmission(form) {
    // Validate all fields first
    if (!validateForm(form)) {
        showNotification('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    const submitButton = form.querySelector('.btn-submit');
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitButton.disabled = true;
    
    // Let Formspree handle the submission
    const formData = new FormData(form);
    
    fetch('https://formspree.io/f/xnndjpbd', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showNotification('Appointment request submitted successfully! We will contact you soon.', 'success');
            form.reset();
            
            // Add success animation
            form.classList.add('form-success');
            setTimeout(() => {
                form.classList.remove('form-success');
            }, 3000);
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Failed to submit appointment request. Please try again.', 'error');
    })
    .finally(() => {
        submitButton.innerHTML = '<span>Book Appointment</span><i class="fas fa-paper-plane"></i>';
        submitButton.disabled = false;
    });
}


// Form Validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    
    // Remove existing error
    clearFieldError(field);
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation
    if (fieldType === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    // Date validation (not in the past)
    if (fieldType === 'date' && value) {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showFieldError(field, 'Please select a future date');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('error');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    formGroup.appendChild(errorElement);
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        hideNotification(notification);
    });
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        notification.remove();
    }, 300);
}

// Parallax Effects
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-medical-icons i');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
        
        // Parallax for background elements
        const bgElements = document.querySelectorAll('.gradient-orbs::before, .gradient-orbs::after');
        bgElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = scrolled * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Interactive Elements
function initInteractiveElements() {
    // Button ripple effect
    initRippleEffect();
    
    // Card hover effects
    initCardEffects();
    
    // Floating action button
    initFloatingActionButton();
}

// Ripple Effect
function initRippleEffect() {
    const rippleButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .service-btn, .btn-submit');
    
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Card Effects
function initCardEffects() {
    const cards = document.querySelectorAll('.service-card, .doctor-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Floating Action Button
function initFloatingActionButton() {
    // Create floating action button for quick appointment booking
    const fab = document.createElement('div');
    fab.className = 'floating-action-button';
    fab.innerHTML = `
        <i class="fas fa-calendar-plus"></i>
        <span class="fab-tooltip">Quick Appointment</span>
    `;
    
    document.body.appendChild(fab);
    
    // Show/hide based on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            fab.classList.add('show');
        } else {
            fab.classList.remove('show');
        }
    });
    
    // Click handler
    fab.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        // Focus on first form field
        setTimeout(() => {
            const firstInput = document.querySelector('#appointmentForm input');
            if (firstInput) {
                firstInput.focus();
            }
        }, 1000);
    });
}

// Mobile-specific enhancements
function initMobileOptimizations() {
    // Touch event handling
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - hide mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const hamburger = document.getElementById('hamburger');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
        }
    }
    
    // Optimize form inputs for mobile
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        // Add proper input types for mobile keyboards
        if (input.name === 'email') {
            input.type = 'email';
            input.autocomplete = 'email';
        }
        if (input.name === 'phone') {
            input.type = 'tel';
            input.autocomplete = 'tel';
        }
        if (input.name === 'name') {
            input.autocomplete = 'name';
        }
        
        // Prevent zoom on focus for iOS
        input.addEventListener('focus', () => {
            if (window.innerWidth < 768) {
                const viewport = document.querySelector('meta[name=viewport]');
                if (viewport) {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
                }
            }
        });
        
        input.addEventListener('blur', () => {
            if (window.innerWidth < 768) {
                const viewport = document.querySelector('meta[name=viewport]');
                if (viewport) {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');
                }
            }
        });
    });
    
    // Add click-to-call functionality
    const phoneNumbers = document.querySelectorAll('.phone-link');
    phoneNumbers.forEach(link => {
        if (!link.href.startsWith('tel:')) {
            const phoneText = link.textContent.replace(/\D/g, '');
            link.href = `tel:+91${phoneText}`;
        }
    });
}

// Initialize AOS
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 0,
            anchorPlacement: 'top-bottom',
            disable: function() {
                return window.innerWidth < 768;
            }
        });
        
        // Refresh AOS on window resize
        window.addEventListener('resize', function() {
            AOS.refresh();
        });
    }
}

// WhatsApp Button Functionality
function initWhatsAppButton() {
    const whatsappFloat = document.getElementById('whatsapp-float');
    const whatsappChat = document.getElementById('whatsapp-chat');
    const chatClose = document.getElementById('chat-close');
    const quickBtns = document.querySelectorAll('.quick-btn');
    
    // Only proceed if WhatsApp elements exist
    if (whatsappFloat) {
        // Show WhatsApp button after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                whatsappFloat.classList.add('show');
            }, 3000);
        });
        
        // Show/hide based on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                whatsappFloat.classList.add('show');
            } else {
                whatsappFloat.classList.remove('show');
            }
        });
        
        // Toggle chat widget
        whatsappFloat.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (whatsappChat && whatsappChat.classList.contains('show')) {
                whatsappChat.classList.remove('show');
            } else if (whatsappChat) {
                whatsappChat.classList.add('show');
                
                // Auto-hide after 10 seconds if no interaction
                setTimeout(() => {
                    if (whatsappChat.classList.contains('show')) {
                        whatsappChat.classList.remove('show');
                    }
                }, 10000);
            }
        });
    }
    
    // Close chat widget
    if (chatClose) {
        chatClose.addEventListener('click', () => {
            if (whatsappChat) {
                whatsappChat.classList.remove('show');
            }
        });
    }
    
    // Quick button functionality
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const message = btn.getAttribute('data-message');
            const phoneNumber = '919811955712';
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            window.open(whatsappUrl, '_blank');
            if (whatsappChat) {
                whatsappChat.classList.remove('show');
            }
        });
    });
    
    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
        if (whatsappFloat && whatsappChat && 
            !whatsappFloat.contains(e.target) && 
            !whatsappChat.contains(e.target)) {
            whatsappChat.classList.remove('show');
        }
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance Optimization
const optimizedScrollHandler = throttle(() => {
    updateActiveNavLink();
}, 100);

const optimizedResizeHandler = debounce(() => {
    // Handle responsive adjustments
    handleResponsiveAdjustments();
}, 250);

window.addEventListener('scroll', optimizedScrollHandler);
window.addEventListener('resize', optimizedResizeHandler);

function handleResponsiveAdjustments() {
    // Adjust layouts for different screen sizes
    const isMobile = window.innerWidth <= 768;
    
    // Adjust hero content layout
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        if (isMobile) {
            heroContent.style.gridTemplateColumns = '1fr';
            heroContent.style.textAlign = 'center';
        } else {
            heroContent.style.gridTemplateColumns = '1fr 1fr';
            heroContent.style.textAlign = 'left';
        }
    }
}

// Handle orientation change
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        window.scrollTo(0, window.scrollY + 1);
        window.scrollTo(0, window.scrollY - 1);
    }, 500);
});

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// Page Visibility API
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause animations
        document.body.classList.add('page-hidden');
    } else {
        // Page is visible, resume animations
        document.body.classList.remove('page-hidden');
    }
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateField,
        showNotification,
        debounce,
        throttle
    };
}
