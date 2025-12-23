// Lightbox functionality for portfolio
document.addEventListener('DOMContentLoaded', function() {
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxClose = document.querySelector('.lightbox-close');
    const portfolioViewButtons = document.querySelectorAll('.portfolio-view');
    const loadMoreBtn = document.getElementById('load-more');
    
    // Lightbox data (in a real site, this would come from a database)
    const portfolioData = {
        'video-1': {
            title: 'Corporate Brand Video',
            category: 'Video Production',
            desc: 'Brand storytelling video for a leading Rwandan corporation, showcasing their impact and values through compelling visual narrative.',
            client: 'Rwanda Corporate Ltd',
            year: '2024',
            services: 'Videography, Editing, Color Grading, Sound Design'
        },
        'video-2': {
            title: 'Tech Product Launch',
            category: 'Video Production',
            desc: 'Launch video for a new technology product in Rwanda, highlighting innovative features and user benefits.',
            client: 'Tech Solutions Rwanda',
            year: '2023',
            services: 'Product Videography, Motion Graphics, Marketing Strategy'
        },
        'audio-1': {
            title: 'Business Podcast Series',
            category: 'Audio Production',
            desc: 'Full production of 12-episode business podcast featuring interviews with industry leaders in Rwanda.',
            client: 'Business Leaders Network',
            year: '2023',
            services: 'Audio Recording, Editing, Mixing, Mastering'
        },
        'audio-2': {
            title: 'Radio Advertising Campaign',
            category: 'Audio Production',
            desc: 'Series of radio commercials for retail brand, increasing brand awareness by 150% in target markets.',
            client: 'Retail Rwanda',
            year: '2023',
            services: 'Voiceover, Audio Production, Media Buying'
        }
    };
    
    // Open lightbox
    portfolioViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get portfolio item data
            const portfolioCard = this.closest('.portfolio-card');
            const title = portfolioCard.querySelector('h3').textContent;
            const category = portfolioCard.querySelector('.portfolio-category').textContent;
            const desc = portfolioCard.querySelector('.portfolio-desc').textContent;
            
            // Set lightbox content
            document.getElementById('lightbox-title').textContent = title;
            document.getElementById('lightbox-category').textContent = category;
            document.getElementById('lightbox-desc').textContent = desc;
            
            // Try to find matching data
            const itemKey = Array.from(portfolioCard.parentElement.classList)
                .find(cls => cls !== 'portfolio-item');
            
            if (portfolioData[itemKey]) {
                const data = portfolioData[itemKey];
                document.getElementById('lightbox-client').textContent = data.client;
                document.getElementById('lightbox-year').textContent = data.year;
                document.getElementById('lightbox-services').textContent = data.services;
            } else {
                // Default values
                document.getElementById('lightbox-client').textContent = 'Confidential Client';
                document.getElementById('lightbox-year').textContent = new Date().getFullYear();
                document.getElementById('lightbox-services').textContent = category;
            }
            
            // Show lightbox
            lightboxModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    function closeLightbox() {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    // Close lightbox when clicking outside
    lightboxModal.addEventListener('click', function(e) {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // Load more functionality for portfolio
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more items
            const portfolioGrid = document.getElementById('portfolio-grid');
            const newItems = [
                {
                    category: 'video',
                    title: 'Documentary Series',
                    desc: 'Three-part documentary series on Rwandan entrepreneurship'
                },
                {
                    category: 'events',
                    title: 'Cultural Festival',
                    desc: 'Full coverage of national cultural festival'
                },
                {
                    category: 'ads',
                    title: 'Social Media Campaign',
                    desc: 'Viral social media campaign for youth brand'
                },
                {
                    category: 'brands',
                    title: 'Rebranding Project',
                    desc: 'Complete rebranding for established company'
                }
            ];
            
            newItems.forEach((item, index) => {
                const newItem = document.createElement('div');
                newItem.className = `portfolio-item ${item.category}`;
                newItem.setAttribute('data-category', item.category);
                newItem.innerHTML = `
                    <div class="portfolio-card">
                        <div class="portfolio-image">
                            <div class="image-placeholder portfolio-img">
                                <i class="fas fa-${getIconForCategory(item.category)}"></i>
                                <span>${getLabelForCategory(item.category)}</span>
                            </div>
                            <div class="portfolio-overlay">
                                <a href="#" class="portfolio-view">
                                    <i class="fas fa-expand"></i>
                                </a>
                            </div>
                        </div>
                        <div class="portfolio-info">
                            <h3>${item.title}</h3>
                            <p class="portfolio-category">${getCategoryName(item.category)}</p>
                            <p class="portfolio-desc">${item.desc}</p>
                        </div>
                    </div>
                `;
                
                portfolioGrid.appendChild(newItem);
            });
            
            // Re-attach event listeners to new items
            const newViewButtons = document.querySelectorAll('.portfolio-view');
            newViewButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    // Similar lightbox opening logic as above
                    const portfolioCard = this.closest('.portfolio-card');
                    const title = portfolioCard.querySelector('h3').textContent;
                    const category = portfolioCard.querySelector('.portfolio-category').textContent;
                    const desc = portfolioCard.querySelector('.portfolio-desc').textContent;
                    
                    document.getElementById('lightbox-title').textContent = title;
                    document.getElementById('lightbox-category').textContent = category;
                    document.getElementById('lightbox-desc').textContent = desc;
                    document.getElementById('lightbox-client').textContent = 'Confidential Client';
                    document.getElementById('lightbox-year').textContent = new Date().getFullYear();
                    document.getElementById('lightbox-services').textContent = category;
                    
                    lightboxModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });
            
            // Hide load more button if we've added enough items
            if (portfolioGrid.children.length >= 16) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
    
    // Helper functions
    function getIconForCategory(category) {
        const icons = {
            'video': 'video',
            'audio': 'microphone-alt',
            'events': 'calendar-alt',
            'ads': 'bullhorn',
            'brands': 'star'
        };
        return icons[category] || 'image';
    }
    
    function getLabelForCategory(category) {
        const labels = {
            'video': 'Video Project',
            'audio': 'Audio Project',
            'events': 'Event Coverage',
            'ads': 'Ad Campaign',
            'brands': 'Brand Project'
        };
        return labels[category] || 'Project';
    }
    
    function getCategoryName(category) {
        const names = {
            'video': 'Video Production',
            'audio': 'Audio Production',
            'events': 'Events Coverage',
            'ads': 'Advertising',
            'brands': 'Brand Promotion'
        };
        return names[category] || category;
    }
});
