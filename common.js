// Function to include HTML files
async function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    
    for (const element of elements) {
        const file = element.getAttribute('data-include');
        try {
            const response = await fetch(file);
            if (response.ok) {
                const content = await response.text();
                element.innerHTML = content;
                
                // Execute scripts in the included content
                const scripts = element.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    
                    if (script.src) {
                        newScript.src = script.src;
                    } else {
                        newScript.textContent = script.textContent;
                    }
                    
                    document.body.appendChild(newScript);
                    script.remove();
                });
            } else {
                element.innerHTML = `Error loading ${file}: ${response.status}`;
            }
        } catch (error) {
            element.innerHTML = `Error loading ${file}: ${error.message}`;
        }
    }
    
    // Initialize sliders after all content is loaded
    initializeSliders();
}

// Initialize sliders
function initializeSliders() {
    // Slider functionality
    function initSlider(nextBtn, prevBtn, sliderGrid) {
        const scrollAmount = 360; // Width of card + gap
        
        if (!nextBtn || !prevBtn || !sliderGrid) return;
        
        nextBtn.addEventListener('click', function() {
            sliderGrid.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        prevBtn.addEventListener('click', function() {
            sliderGrid.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
    }
    
    // Initialize project slider
    const projectNext = document.getElementById('project-next');
    const projectPrev = document.getElementById('project-prev');
    const projectGrid = document.querySelector('.project-grid.slider-grid');
    
    if (projectNext && projectPrev && projectGrid) {
        initSlider(projectNext, projectPrev, projectGrid);
    }
    
    // Initialize blog slider
    const blogNext = document.getElementById('blog-next');
    const blogPrev = document.getElementById('blog-prev');
    const blogGrid = document.querySelector('.blog-grid.slider-grid');
    
    if (blogNext && blogPrev && blogGrid) {
        initSlider(blogNext, blogPrev, blogGrid);
    }
}

// Initialize header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    includeHTML().then(() => {
        initHeaderScroll();
    });
}); 