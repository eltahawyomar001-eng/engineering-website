/**
 * PORTFOLIO PAGE JAVASCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
    initFilters();
    initProjectModal();
    initLoadMore();
});

// ============================================
// FILTERS
// ============================================
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const filterTags = document.querySelectorAll('.filter-tag');
    const projectCards = document.querySelectorAll('.portfolio-card');
    
    let activeCategory = 'all';
    let activeIndustry = null;
    
    // Category filters
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            activeCategory = btn.getAttribute('data-filter');
            filterProjects();
        });
    });
    
    // Industry tags
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            if (tag.classList.contains('active')) {
                tag.classList.remove('active');
                activeIndustry = null;
            } else {
                filterTags.forEach(t => t.classList.remove('active'));
                tag.classList.add('active');
                activeIndustry = tag.getAttribute('data-industry');
            }
            filterProjects();
        });
    });
    
    function filterProjects() {
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category');
            const industry = card.getAttribute('data-industry');
            
            const matchesCategory = activeCategory === 'all' || categories.includes(activeCategory);
            const matchesIndustry = !activeIndustry || industry === activeIndustry;
            
            if (matchesCategory && matchesIndustry) {
                card.classList.remove('hidden');
                card.classList.remove('filtering');
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Animate visible cards
        setTimeout(() => {
            const visibleCards = document.querySelectorAll('.portfolio-card:not(.hidden)');
            visibleCards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.05}s`;
            });
        }, 50);
    }
}

// ============================================
// PROJECT MODAL
// ============================================
function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const backdrop = modal.querySelector('.modal-backdrop');
    const projectCards = document.querySelectorAll('.portfolio-card');
    const prevBtn = modal.querySelector('.modal-nav-btn.prev');
    const nextBtn = modal.querySelector('.modal-nav-btn.next');
    
    let currentProjectIndex = 0;
    let projects = Array.from(projectCards);
    
    // Project data (would come from API/CMS in production)
    const projectsData = {
        1: {
            title: 'BENARMO',
            category: '3D Моделирование',
            year: '2024',
            description: 'Создание каталога продукции BENARMO — ведущего производителя промышленного оборудования. Проект включал разработку визуальной концепции, 3D визуализацию продукции и вёрстку многостраничного каталога.',
            client: 'BENARMO',
            services: '3D моделирование, Каталог, Фотосъёмка',
            industry: 'Производство',
            duration: '3 месяца',
            tags: ['CAD', 'Render', 'Печать', 'Вёрстка']
        },
        2: {
            title: 'CHRONOS-M',
            category: 'Айдентика',
            year: '2024',
            description: 'Комплексный проект по созданию корпоративной идентичности для CHRONOS-M. Разработан полный пакет бренда, включая логотип, фирменный стиль, каталог продукции и корпоративный веб-сайт.',
            client: 'CHRONOS-M',
            services: 'Брендинг, Веб-дизайн, Каталог',
            industry: 'Производство',
            duration: '4 месяца',
            tags: ['Логотип', 'Брендбук', 'UI/UX', 'Печать']
        },
        3: {
            title: 'PMR Group',
            category: 'Комплексный проект',
            year: '2023',
            description: 'Полный ребрендинг группы компаний PMR. Проект включал создание новой визуальной идентичности, 3D моделирование линейки продукции, разработку каталога и корпоративного сайта.',
            client: 'PMR Group',
            services: 'Ребрендинг, 3D, Веб, Каталог',
            industry: 'Производство',
            duration: '6 месяцев',
            tags: ['Брендинг', '3D', 'React', 'InDesign']
        },
        4: {
            title: 'Neural Core',
            category: '3D Моделирование',
            year: '2024',
            description: '3D визуализация инновационного промышленного оборудования для презентации инвесторам. Высокодетализированные модели с фотореалистичным рендером.',
            client: 'Neural Systems',
            services: '3D моделирование, Рендеринг',
            industry: 'Производство',
            duration: '2 месяца',
            tags: ['SolidWorks', 'KeyShot', 'Анимация']
        },
        5: {
            title: 'TechProm',
            category: 'Веб-дизайн',
            year: '2024',
            description: 'Корпоративный сайт для дистрибьютора промышленного оборудования с каталогом продукции и личным кабинетом для дилеров.',
            client: 'TechProm',
            services: 'UI/UX, Веб-разработка',
            industry: 'Дилеры/Дистрибьюторы',
            duration: '3 месяца',
            tags: ['Figma', 'WordPress', 'WooCommerce']
        },
        6: {
            title: 'СтройКомплект',
            category: 'Брендинг',
            year: '2023',
            description: 'Разработка брендбука и корпоративной айдентики для строительной компании. Создан полный пакет фирменного стиля для применения на всех носителях.',
            client: 'СтройКомплект',
            services: 'Брендинг, Айдентика',
            industry: 'Строительство',
            duration: '2 месяца',
            tags: ['Логотип', 'Брендбук', 'Гайдлайн']
        },
        7: {
            title: 'ПромКаталог',
            category: 'Каталог',
            year: '2024',
            description: 'Технический каталог с 3D визуализацией всей линейки продукции. 200+ страниц с детальными спецификациями и визуальными материалами.',
            client: 'ПромТехника',
            services: 'Каталог, 3D визуализация',
            industry: 'Производство',
            duration: '4 месяца',
            tags: ['InDesign', '3D', 'Печать', 'PDF']
        },
        8: {
            title: 'ИнжСервис',
            category: 'Веб + Айдентика',
            year: '2024',
            description: 'Комплексный проект для сервисной инженерной компании: разработка логотипа, фирменного стиля и корпоративного сайта.',
            client: 'ИнжСервис',
            services: 'Брендинг, Веб-дизайн',
            industry: 'Дилеры/Дистрибьюторы',
            duration: '2.5 месяца',
            tags: ['Логотип', 'UI/UX', 'WordPress']
        },
        9: {
            title: 'КомпрессорТех',
            category: '3D Моделирование',
            year: '2023',
            description: '3D модели компрессорного оборудования для каталога и веб-сайта. Детальное моделирование с возможностью анимации.',
            client: 'КомпрессорТех',
            services: '3D моделирование',
            industry: 'Производство',
            duration: '2 месяца',
            tags: ['SolidWorks', 'Blender', 'Render']
        }
    };
    
    // Open modal
    projectCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentProjectIndex = index;
            const projectId = card.getAttribute('data-project');
            openModal(projectId);
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') navigateProject(-1);
        if (e.key === 'ArrowRight') navigateProject(1);
    });
    
    // Navigation buttons
    prevBtn.addEventListener('click', () => navigateProject(-1));
    nextBtn.addEventListener('click', () => navigateProject(1));
    
    function openModal(projectId) {
        const data = projectsData[projectId];
        if (!data) return;
        
        // Update modal content
        modal.querySelector('.modal-title').textContent = data.title;
        modal.querySelector('.modal-category').textContent = data.category;
        modal.querySelector('.modal-year').textContent = data.year;
        modal.querySelector('.modal-description').textContent = data.description;
        
        // Update details
        const details = modal.querySelectorAll('.detail-value');
        details[0].textContent = data.client;
        details[1].textContent = data.services;
        details[2].textContent = data.industry;
        details[3].textContent = data.duration;
        
        // Update tags
        const tagsContainer = modal.querySelector('.modal-tags');
        tagsContainer.innerHTML = data.tags.map(tag => 
            `<span class="modal-tag">${tag}</span>`
        ).join('');
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function navigateProject(direction) {
        const visibleProjects = Array.from(projectCards).filter(
            card => !card.classList.contains('hidden')
        );
        
        currentProjectIndex += direction;
        
        if (currentProjectIndex < 0) {
            currentProjectIndex = visibleProjects.length - 1;
        } else if (currentProjectIndex >= visibleProjects.length) {
            currentProjectIndex = 0;
        }
        
        const projectId = visibleProjects[currentProjectIndex].getAttribute('data-project');
        openModal(projectId);
    }
}

// ============================================
// LOAD MORE
// ============================================
function initLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (!loadMoreBtn) return;
    
    loadMoreBtn.addEventListener('click', () => {
        // In production, this would load more projects from API
        loadMoreBtn.innerHTML = `
            <span>Загрузка...</span>
            <svg class="animate-rotate-slow" viewBox="0 0 24 24" fill="none" style="width: 18px; height: 18px;">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-dasharray="60" stroke-dashoffset="20"/>
            </svg>
        `;
        
        setTimeout(() => {
            loadMoreBtn.innerHTML = `
                <span>Все проекты загружены</span>
            `;
            loadMoreBtn.disabled = true;
            loadMoreBtn.style.opacity = '0.5';
        }, 1500);
    });
}

// ============================================
// GALLERY THUMBS
// ============================================
document.addEventListener('click', (e) => {
    if (e.target.closest('.thumb')) {
        const thumb = e.target.closest('.thumb');
        const thumbs = thumb.parentElement.querySelectorAll('.thumb');
        
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        
        // In production, this would update the main gallery image
    }
});
