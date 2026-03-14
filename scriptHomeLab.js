document.addEventListener('DOMContentLoaded', function() {
        const sidebarEl = document.getElementById('homelab-sidebar');
        const toggleBtn = document.getElementById('sidebar-toggle-btn');
        const overlay = document.getElementById('sidebar-overlay');
        
        if (!sidebarEl || !toggleBtn || !overlay) {
            console.error('Elementos del sidebar no encontrados');
            return;
        }

        function openSidebar() {
            sidebarEl.classList.add('mobile-open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        }
        
        function closeSidebar() {
            sidebarEl.classList.remove('mobile-open');
            overlay.classList.remove('active');
            document.body.style.overflow = ''; 
        }

        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (sidebarEl.classList.contains('mobile-open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });

        overlay.addEventListener('click', function(e) {
            e.preventDefault();
            closeSidebar();
        });

        const sidebarLinks = document.querySelectorAll('.sidebar-item, .sidebar-subitem');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    closeSidebar();
                }
            });
        });

        function updateFooterMargin() {
            const footer = document.querySelector('footer');
            if (footer) {
                footer.style.marginLeft = window.innerWidth <= 768 ? '0' : '58px';
            }
        }
        
        updateFooterMargin();
        window.addEventListener('resize', updateFooterMargin);
    });

        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) closeSidebar();
            });
        });

        function updateFooterMargin() {
            const footer = document.querySelector('footer');
            if (window.innerWidth <= 768) footer.style.marginLeft = '0';
            else footer.style.marginLeft = '58px';
        }
        updateFooterMargin();
        window.addEventListener('resize', updateFooterMargin);