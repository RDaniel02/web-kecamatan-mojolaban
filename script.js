// ========== HAMBURGER MENU TOGGLE ==========
function initHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('open');
            
            // ARIA
            const expanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', expanded);
            navLinks.setAttribute('aria-hidden', !expanded);
        });

        // Tutup menu saat klik link navigasi
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                navLinks.setAttribute('aria-hidden', 'true');
            });
        });
    }
}

// ========== ACCORDION DENGAN ARIA ==========
function toggleAccordion(headerElement) {
    const item = headerElement.parentElement;
    const content = item.querySelector('.accordion-content');
    const isOpen = item.classList.contains('open');
    
    item.classList.toggle('open');
    
    // Update ARIA
    headerElement.setAttribute('aria-expanded', !isOpen);
    if (content) {
        content.setAttribute('aria-hidden', isOpen);
    }
}

// Inisialisasi ARIA pada semua accordion saat DOM ready
function initAccordions() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach((item, index) => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const isOpen = item.classList.contains('open');
        
        if (header && content) {
            // Set IDs untuk aria-controls
            const contentId = content.id || `accordion-content-${index}`;
            content.id = contentId;
            
            // Set ARIA attributes
            header.setAttribute('role', 'button');
            header.setAttribute('tabindex', '0');
            header.setAttribute('aria-expanded', isOpen);
            header.setAttribute('aria-controls', contentId);
            content.setAttribute('role', 'region');
            content.setAttribute('aria-hidden', !isOpen);
            content.setAttribute('aria-labelledby', `accordion-header-${index}`);
            header.id = `accordion-header-${index}`;
            
            // Keyboard support: Enter & Space
            header.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleAccordion(this);
                }
            });
        }
    });
}

// ========== TAB SWITCHER DENGAN ARIA ==========
function switchTab(evt, targetId) {
    const container = evt.currentTarget.closest('.tab-container') || document;
    
    // Non-aktifkan semua tombol tab dalam grup
    const buttons = container.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
        btn.setAttribute('tabindex', '-1');
    });
    
    // Non-aktifkan semua panel tab dalam grup
    const panels = container.querySelectorAll('.tab-panel');
    panels.forEach(panel => {
        panel.classList.remove('active');
        panel.setAttribute('aria-hidden', 'true');
    });
    
    // Aktifkan tombol yang diklik dan target panel
    evt.currentTarget.classList.add('active');
    evt.currentTarget.setAttribute('aria-selected', 'true');
    evt.currentTarget.setAttribute('tabindex', '0');
    
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
        targetPanel.classList.add('active');
        targetPanel.setAttribute('aria-hidden', 'false');
    }
}

// Inisialisasi ARIA pada tab switcher
function initTabs() {
    const tabContainers = document.querySelectorAll('.tab-container');
    
    tabContainers.forEach(container => {
        const tabBar = container.querySelector('.tab-bar');
        const buttons = container.querySelectorAll('.tab-btn');
        const panels = container.querySelectorAll('.tab-panel');
        
        if (tabBar) {
            tabBar.setAttribute('role', 'tablist');
        }
        
        buttons.forEach((btn, i) => {
            btn.setAttribute('role', 'tab');
            const isActive = btn.classList.contains('active');
            btn.setAttribute('aria-selected', isActive);
            btn.setAttribute('tabindex', isActive ? '0' : '-1');
            
            // Cari target panel dari onclick
            const onclickAttr = btn.getAttribute('onclick');
            if (onclickAttr) {
                const match = onclickAttr.match(/'([^']+)'/);
                if (match) {
                    btn.setAttribute('aria-controls', match[1]);
                }
            }
        });
        
        panels.forEach(panel => {
            panel.setAttribute('role', 'tabpanel');
            const isActive = panel.classList.contains('active');
            panel.setAttribute('aria-hidden', !isActive);
            panel.setAttribute('tabindex', '0');
        });
        
        // Keyboard navigation: Arrow Left/Right
        if (tabBar) {
            tabBar.addEventListener('keydown', function(e) {
                const tabs = Array.from(this.querySelectorAll('.tab-btn'));
                const currentIndex = tabs.indexOf(document.activeElement);
                
                if (currentIndex === -1) return;
                
                let newIndex;
                if (e.key === 'ArrowRight') {
                    newIndex = (currentIndex + 1) % tabs.length;
                } else if (e.key === 'ArrowLeft') {
                    newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                } else if (e.key === 'Home') {
                    newIndex = 0;
                } else if (e.key === 'End') {
                    newIndex = tabs.length - 1;
                } else {
                    return;
                }
                
                e.preventDefault();
                tabs[newIndex].focus();
                tabs[newIndex].click();
            });
        }
    });
}

// ========== INIT ON DOM READY ==========
document.addEventListener('DOMContentLoaded', function() {
    initHamburger();
    initAccordions();
    initTabs();
});
