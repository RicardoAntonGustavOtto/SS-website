// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Initialize all functionality
    initContactButton();
    initScrollAnimations();
    initTimelineNavigation();
    initParallaxEffects();
    initScrollProgress();
    initCallSimulation();
    initAnimatedCounters();
    
    // Add smooth scrolling for explore button
    const exploreBtn = document.getElementById('explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            scrollToSection('early-morning');
        });
    }
});

// Contact Button Functionality
function initContactButton() {
    const contactToggle = document.getElementById('contact-toggle');
    const contactDropdown = document.getElementById('contact-dropdown');
    const chevron = contactToggle.querySelector('.chevron');
    
    contactToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = contactDropdown.classList.contains('active');
        
        if (isActive) {
            contactDropdown.classList.remove('active');
            contactToggle.classList.remove('active');
        } else {
            contactDropdown.classList.add('active');
            contactToggle.classList.add('active');
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!contactToggle.contains(e.target) && !contactDropdown.contains(e.target)) {
            contactDropdown.classList.remove('active');
            contactToggle.classList.remove('active');
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger staggered animations for child elements
                const animatedElements = entry.target.querySelectorAll('.content-card, .insight-item, .achievement-item, .strategy-item, .deal-item');
                animatedElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s both`;
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections and animated elements
    const sections = document.querySelectorAll('.timeline-section');
    const animatedElements = document.querySelectorAll('.fade-in-up, .section-header, .content-card');
    
    [...sections, ...animatedElements].forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
}

// Timeline Navigation
function initTimelineNavigation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const sections = document.querySelectorAll('section[id]');
    
    // Add click handlers for timeline items
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.dataset.section;
            scrollToSection(sectionId);
        });
    });
    
    // Update active timeline item on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '-20% 0px -20% 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                updateActiveTimelineItem(sectionId);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Parallax Effects
function initParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-shape, .floating-shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Scroll Progress
function initScrollProgress() {
    const progressFill = document.getElementById('progress-fill');
    const progressPercentage = document.getElementById('progress-percentage');
    
    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        if (progressFill) {
            progressFill.style.width = `${scrollPercent}%`;
        }
        
        if (progressPercentage) {
            progressPercentage.textContent = `${Math.round(scrollPercent)}%`;
        }
    }
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // Initial call
}

// Call Simulation Animation
function initCallSimulation() {
    const callPhases = document.querySelectorAll('.call-phase');
    let currentPhase = 0;
    
    function cycleCallPhases() {
        // Remove active class from all phases
        callPhases.forEach(phase => phase.classList.remove('active'));
        
        // Add active class to current phase
        if (callPhases[currentPhase]) {
            callPhases[currentPhase].classList.add('active');
        }
        
        // Move to next phase
        currentPhase = (currentPhase + 1) % callPhases.length;
    }
    
    // Start with first phase active
    if (callPhases.length > 0) {
        callPhases[0].classList.add('active');
        
        // Cycle through phases every 4 seconds
        setInterval(cycleCallPhases, 4000);
    }
}

// Animated Counters
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.metric-value, .stat-number, .competitor-score');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Utility Functions
function scrollToSection(sectionId, offset = 100) {
    const section = document.getElementById(sectionId);
    if (section) {
        const targetPosition = section.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function updateActiveTimelineItem(sectionId) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === sectionId) {
            item.classList.add('active');
        }
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const hasEuroSign = text.includes('€');
    const hasPercentSign = text.includes('%');
    const numberMatch = text.match(/[\d.]+/);
    
    if (!numberMatch) return;
    
    const finalNumber = parseFloat(numberMatch[0]);
    const duration = 2000;
    const startTime = Date.now();
    
    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentNumber = finalNumber * easeOut;
        
        let displayText = '';
        
        if (hasEuroSign) {
            if (finalNumber >= 1000000) {
                displayText = `€${(currentNumber / 1000000).toFixed(1)}M`;
            } else if (finalNumber >= 1000) {
                displayText = `€${Math.round(currentNumber / 1000)}K`;
            } else {
                displayText = `€${Math.round(currentNumber)}`;
            }
        } else if (hasPercentSign) {
            displayText = `${Math.round(currentNumber)}%`;
        } else {
            displayText = Math.round(currentNumber).toString();
        }
        
        element.textContent = displayText;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    updateCounter();
}

// Progress Bar Animations
function initProgressBars() {
    const progressBars = document.querySelectorAll('.bar-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.style.width || '0%';
                
                // Reset width to 0
                progressBar.style.width = '0%';
                
                // Animate to target width
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 100);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Enhanced Scroll Effects
function initEnhancedScrollEffects() {
    let lastScrollY = window.pageYOffset;
    let ticking = false;
    
    function updateScrollEffects() {
        const currentScrollY = window.pageYOffset;
        const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        
        // Add scroll direction class to body
        document.body.classList.toggle('scroll-down', scrollDirection === 'down');
        document.body.classList.toggle('scroll-up', scrollDirection === 'up');
        
        // Update timeline sidebar visibility
        const timelineSidebar = document.querySelector('.timeline-sidebar');
        if (timelineSidebar) {
            if (currentScrollY > window.innerHeight * 0.5) {
                timelineSidebar.style.opacity = '1';
                timelineSidebar.style.transform = 'translateY(-50%) translateX(0)';
            } else {
                timelineSidebar.style.opacity = '0.7';
                timelineSidebar.style.transform = 'translateY(-50%) translateX(-10px)';
            }
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    function requestScrollTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollTick, { passive: true });
}

// Intersection Observer for Timeline Items
function initTimelineItemAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-event, .priority-item, .update-item');
    
    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        itemObserver.observe(item);
    });
}

// Mobile Menu Toggle (if needed)
function initMobileOptimizations() {
    // Hide timeline sidebar on mobile scroll
    if (window.innerWidth <= 1024) {
        const timelineSidebar = document.querySelector('.timeline-sidebar');
        if (timelineSidebar) {
            timelineSidebar.style.display = 'none';
        }
    }
    
    // Optimize touch interactions
    const touchElements = document.querySelectorAll('.content-card, .timeline-item, .contact-toggle');
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            this.style.transform = '';
        }, { passive: true });
    });
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Lazy load images (excluding Emma avatar)
    const images = document.querySelectorAll('img[src]');
    const filteredImages = Array.from(images).filter(img => !img.closest('.avatar-main'));
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.onload = () => {
                    img.style.transition = 'opacity 0.3s ease';
                    img.style.opacity = '1';
                };
                imageObserver.unobserve(img);
            }
        });
    });
    
    filteredImages.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Trigger any scroll-based animations here
            initProgressBars();
        }, 100);
    }, { passive: true });
}

// Initialize additional features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initProgressBars();
    initEnhancedScrollEffects();
    initTimelineItemAnimations();
    initMobileOptimizations();
    initPerformanceOptimizations();
});

// Handle window resize
window.addEventListener('resize', function() {
    // Recalculate positions and sizes if needed
    const timelineSidebar = document.querySelector('.timeline-sidebar');
    if (timelineSidebar && window.innerWidth <= 1024) {
        timelineSidebar.style.display = 'none';
    } else if (timelineSidebar && window.innerWidth > 1024) {
        timelineSidebar.style.display = 'block';
    }
}, { passive: true });

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const scrollToSection = (sectionId, offset = 100) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const targetPosition = section.offsetTop - offset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 800;
            let start = null;
            
            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min(progress / duration, 1);
                
                // Easing function
                const easeInOutCubic = percentage < 0.5 
                    ? 4 * percentage * percentage * percentage 
                    : (percentage - 1) * (2 * percentage - 2) * (2 * percentage - 2) + 1;
                
                window.scrollTo(0, startPosition + distance * easeInOutCubic);
                
                if (progress < duration) {
                    requestAnimationFrame(step);
                }
            }
            
            requestAnimationFrame(step);
        }
    };
}
