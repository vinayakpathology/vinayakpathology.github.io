document.addEventListener('DOMContentLoaded', function() {
    // Header Menu Toggle Functionality
    const toggleMenu = document.getElementById('toggleMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const desktopDropdown = document.getElementById('desktopDropdown');
    
    // Get overlay element from HTML
    const overlay = document.getElementById('mobileMenuOverlay');

    // Check if device is mobile or tablet
    function isMobileOrTablet() {
        return window.innerWidth <= 1024 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    function isMobile() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Function to update toggle button appearance
    function updateToggleButton(isMenuOpen) {
        if (toggleMenu) {
            const icon = toggleMenu.querySelector('i');
            if (icon) {
                if (isMenuOpen) {
                    icon.className = 'fas fa-times';
                    toggleMenu.classList.add('active');
                } else {
                    icon.className = 'fas fa-bars';
                    toggleMenu.classList.remove('active');
                }
            }
        }
    }

    // Close all menus
    function closeAllMenus() {
        if (mobileMenu) {
            mobileMenu.classList.remove('show');
        }
        if (desktopDropdown) {
            desktopDropdown.classList.remove('show');
        }
        if (overlay) {
            overlay.classList.remove('show');
        }
        document.body.style.overflow = '';
        updateToggleButton(false);
    }

    // Toggle menu functionality
    if (toggleMenu) {
        toggleMenu.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (isMobileOrTablet()) {
                // Mobile/Tablet behavior - show slide-in menu
                if (mobileMenu) {
                    const isMenuOpen = mobileMenu.classList.contains('show');
                    
                    if (isMenuOpen) {
                        mobileMenu.classList.remove('show');
                        if (overlay) overlay.classList.remove('show');
                        document.body.style.overflow = '';
                        updateToggleButton(false);
                    } else {
                        mobileMenu.classList.add('show');
                        if (overlay) overlay.classList.add('show');
                        document.body.style.overflow = 'hidden';
                        updateToggleButton(true);
                    }
                }
            } else {
                // Desktop behavior - show dropdown
                if (desktopDropdown) {
                    const isDropdownOpen = desktopDropdown.classList.contains('show');
                    
                    if (isDropdownOpen) {
                        desktopDropdown.classList.remove('show');
                        updateToggleButton(false);
                    } else {
                        desktopDropdown.classList.add('show');
                        updateToggleButton(true);
                    }
                }
            }
        });
    }

    // Close mobile menu
    if (closeMenu) {
        closeMenu.addEventListener('click', function(e) {
            e.preventDefault();
            closeAllMenus();
        });
    }

    // Close menu when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', function() {
            closeAllMenus();
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!isMobileOrTablet() && toggleMenu && desktopDropdown && 
            !toggleMenu.contains(e.target) && 
            !desktopDropdown.contains(e.target)) {
            desktopDropdown.classList.remove('show');
            updateToggleButton(false);
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        // Close all menus on resize
        closeAllMenus();
        
        // Add a small delay to handle orientation changes on mobile
        setTimeout(() => {
            if (!isMobileOrTablet() && desktopDropdown) {
                desktopDropdown.classList.remove('show');
            }
            if (!isMobile() && mobileMenu) {
                mobileMenu.classList.remove('show');
                overlay.classList.remove('show');
                document.body.style.overflow = '';
            }
        }, 100);
    });

    // Prevent menu from closing when clicking inside mobile menu
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Handle mobile menu links
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-items a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Close menu when a link is clicked
            closeAllMenus();
        });
    });

    // Handle desktop dropdown links
    const desktopDropdownLinks = document.querySelectorAll('.desktop-dropdown a');
    desktopDropdownLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Close dropdown when a link is clicked
            if (desktopDropdown) {
                desktopDropdown.classList.remove('show');
                updateToggleButton(false);
            }
        });
    });

    // Keyboard support for dropdown
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllMenus();
        }
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                console.log('Searching for:', searchTerm);
                // Add your search logic here
                alert('Searching for: ' + searchTerm);
            }
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    console.log('Searching for:', searchTerm);
                    // Add your search logic here
                    alert('Searching for: ' + searchTerm);
                }
            }
        });
    }

    // Sign in button handler
    const signinBtn = document.querySelector('.signin-btn');
    if (signinBtn) {
        signinBtn.addEventListener('click', function() {
            console.log('Sign in clicked');
            // Add sign in logic here
            alert('Patient login functionality to be implemented');
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                answer.style.padding = '0 20px';
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                answer.style.padding = '0 20px 20px 20px';
            }
        });
    });
});