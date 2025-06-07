document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.mobile-menu-btn')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu after clicking
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });

    // Navigation menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const body = document.body;

    // Create sidebar toggle button if it doesn't exist
    if (!sidebarToggle && window.innerWidth <= 768) {
        const toggle = document.createElement('button');
        toggle.className = 'sidebar-toggle';
        toggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.appendChild(toggle);
    }

    // Toggle navigation menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Toggle sidebar
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            sidebarToggle.classList.toggle('active');
        });
    }

    // Close menus when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navToggle && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            body.style.overflow = '';
        }
        if (sidebar && sidebarToggle && !sidebarToggle.contains(e.target) && !sidebar.contains(e.target)) {
            sidebar.classList.remove('active');
            sidebarToggle.classList.remove('active');
        }
    });

    // Close menus when clicking a link
    document.querySelectorAll('.nav-link, .sidebar-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                body.style.overflow = '';
            }
            if (window.innerWidth <= 768 && sidebar) {
                sidebar.classList.remove('active');
                sidebarToggle.classList.remove('active');
            }
        });
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                if (navMenu) navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
                if (sidebar) sidebar.classList.remove('active');
                if (sidebarToggle) sidebarToggle.classList.remove('active');
                body.style.overflow = '';
            }
        }, 250);
    });

    // Form validation
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        const validateInput = (input) => {
            const value = input.value.trim();
            let isValid = true;
            let errorMessage = '';

            switch (input.type) {
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    isValid = emailRegex.test(value);
                    errorMessage = 'Please enter a valid email address';
                    break;
                case 'text':
                    isValid = value.length >= 2;
                    errorMessage = 'This field is required';
                    break;
                case 'textarea':
                    isValid = value.length >= 10;
                    errorMessage = 'Message must be at least 10 characters long';
                    break;
            }

            const errorElement = input.parentElement.querySelector('.error-message');
            if (!isValid) {
                input.classList.add('error');
                if (!errorElement) {
                    const error = document.createElement('div');
                    error.className = 'error-message';
                    error.textContent = errorMessage;
                    input.parentElement.appendChild(error);
                } else {
                    errorElement.textContent = errorMessage;
                }
            } else {
                input.classList.remove('error');
                if (errorElement) {
                    errorElement.remove();
                }
            }

            return isValid;
        };

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            contactForm.querySelectorAll('input, textarea').forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                contactForm.submit();
            }
        });

        // Real-time validation
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('blur', () => validateInput(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateInput(input);
                }
            });
        });
    }

    // Close alert messages
    document.querySelectorAll('.close-alert').forEach(button => {
        button.addEventListener('click', () => {
            const alert = button.closest('.alert');
            alert.style.opacity = '0';
            setTimeout(() => alert.remove(), 300);
        });
    });

    // Auto-hide alerts after 5 seconds
    document.querySelectorAll('.alert').forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => alert.remove(), 300);
        }, 5000);
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // Handle project modals
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.dataset.modal;
            if (modalId) {
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.add('active');
                    body.style.overflow = 'hidden';
                }
            }
        });
    });

    // Close modals
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-close')) {
                modal.classList.remove('active');
                body.style.overflow = '';
            }
        });
    });
}); 