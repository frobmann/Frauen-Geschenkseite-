/* ===================================================
   LuxuryForHer – Main JavaScript
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation ---
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close on link click (mobile)
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Mobile dropdown toggle
    const dropdownItem = document.querySelector('.nav__item--dropdown');
    if (dropdownItem && window.innerWidth <= 768) {
        dropdownItem.querySelector('.nav__link').addEventListener('click', (e) => {
            e.preventDefault();
            dropdownItem.classList.toggle('active');
        });
    }

    // --- Sticky Header ---
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // --- Search Overlay ---
    const searchBtn = document.getElementById('search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');

    if (searchBtn && searchOverlay) {
        searchBtn.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            setTimeout(() => searchInput.focus(), 300);
            document.body.style.overflow = 'hidden';
        });

        searchClose.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                searchOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // --- Gift Finder ---
    const finder = document.getElementById('finder');
    const finderSelections = {};

    if (finder) {
        finder.addEventListener('click', (e) => {
            const option = e.target.closest('.finder__option');
            const backBtn = e.target.closest('.finder__back');

            if (option) {
                const currentStep = option.closest('.finder__step');
                const stepNum = currentStep.dataset.step;
                const nextStep = option.dataset.next;
                const value = option.dataset.value;

                finderSelections[stepNum] = value;

                // Visual feedback
                currentStep.querySelectorAll('.finder__option').forEach(o =>
                    o.style.borderColor = ''
                );
                option.style.borderColor = 'var(--color-primary)';

                setTimeout(() => {
                    currentStep.classList.remove('active');

                    if (nextStep === 'result') {
                        showFinderResults();
                    }

                    const next = finder.querySelector(`[data-step="${nextStep}"]`);
                    if (next) {
                        next.classList.add('active');
                    }
                }, 300);
            }

            if (backBtn) {
                const currentStep = backBtn.closest('.finder__step');
                const prevStepNum = backBtn.dataset.back;
                currentStep.classList.remove('active');
                const prev = finder.querySelector(`[data-step="${prevStepNum}"]`);
                if (prev) prev.classList.add('active');
            }
        });
    }

    function showFinderResults() {
        const resultsGrid = document.getElementById('finder-results');
        if (!resultsGrid) return;

        const giftSuggestions = getGiftSuggestions(
            finderSelections['1'],
            finderSelections['2'],
            finderSelections['3']
        );

        resultsGrid.innerHTML = giftSuggestions.map(gift => `
            <div class="finder__result-card">
                <div class="emoji">${gift.emoji}</div>
                <h4>${gift.name}</h4>
                <p>${gift.description}</p>
                <span class="price">${gift.price}</span>
            </div>
        `).join('');
    }

    function getGiftSuggestions(occasion, budget, interest) {
        // Curated gift database
        const gifts = {
            fashion: [
                { emoji: '👗', name: 'Designer-Seidenschal', description: 'Luxuriöser Seidenschal mit elegantem Print', price: 'ab 79€' },
                { emoji: '👜', name: 'Leder-Clutch', description: 'Handgefertigte Abendtasche aus italienischem Leder', price: 'ab 159€' },
                { emoji: '🧥', name: 'Cashmere Pullover', description: 'Ultraweicher Pullover in zeitloser Farbe', price: 'ab 189€' },
                { emoji: '👠', name: 'Designer-Schuhe', description: 'Elegante Pumps oder Loafer von Top-Designern', price: 'ab 249€' },
            ],
            wellness: [
                { emoji: '🧖‍♀️', name: 'Spa-Day Gutschein', description: 'Ein Tag voller Entspannung mit Massage & Behandlungen', price: 'ab 99€' },
                { emoji: '🛁', name: 'Luxury Bath Set', description: 'Bio-Badeöle, Badebomben & Duftkerze im Geschenkset', price: 'ab 55€' },
                { emoji: '🌿', name: 'Skincare-Set', description: 'Premium Anti-Aging Pflegeset mit natürlichen Wirkstoffen', price: 'ab 120€' },
                { emoji: '💆', name: 'Wellness-Wochenende', description: '2 Nächte im Spa-Hotel mit Vollprogramm', price: 'ab 349€' },
            ],
            abenteuer: [
                { emoji: '🎈', name: 'Heißluftballonfahrt', description: 'Romantische Ballonfahrt bei Sonnenuntergang', price: 'ab 199€' },
                { emoji: '🍽️', name: 'Candlelight Dinner', description: 'Exklusives Dinner im Sternerestaurant', price: 'ab 149€' },
                { emoji: '✈️', name: 'Städtetrip', description: 'Wochenendreise in eine europäische Traumstadt', price: 'ab 299€' },
                { emoji: '🚢', name: 'Bootsfahrt', description: 'Private Bootstour mit Champagner & Snacks', price: 'ab 179€' },
            ],
            kreativ: [
                { emoji: '🎨', name: 'Portrait-Gemälde', description: 'Handgemaltes Ölportrait von eurem Lieblingsfoto', price: 'ab 189€' },
                { emoji: '📸', name: 'Foto-Workshop', description: 'Professioneller Fotografie-Kurs für Anfänger', price: 'ab 89€' },
                { emoji: '✍️', name: 'Kalligraphie-Set', description: 'Hochwertiges Set mit persönlicher Gravur', price: 'ab 65€' },
                { emoji: '🏺', name: 'Keramik-Kurs', description: 'Kreativkurs: Eigene Keramik töpfern', price: 'ab 79€' },
            ],
            kulinarik: [
                { emoji: '🍫', name: 'Luxus-Pralinés', description: 'Handgemachte belgische Pralinen in Geschenkbox', price: 'ab 45€' },
                { emoji: '🍷', name: 'Wein-Tasting', description: 'Exklusive Weinprobe mit Sommelier', price: 'ab 89€' },
                { emoji: '👨‍🍳', name: 'Koch-Erlebnis', description: 'Gemeinsamer Kochkurs bei einem Sternekoch', price: 'ab 129€' },
                { emoji: '☕', name: 'Kaffee-Genuss-Set', description: 'Specialty Coffee Starter-Set mit Handmühle', price: 'ab 79€' },
            ],
            technik: [
                { emoji: '📱', name: 'Tablet mit Stift', description: 'Kreativ-Tablet zum Zeichnen und Notieren', price: 'ab 349€' },
                { emoji: '🎧', name: 'Premium Kopfhörer', description: 'Kabellose Noise-Cancelling Kopfhörer', price: 'ab 199€' },
                { emoji: '⌚', name: 'Smartwatch', description: 'Elegante Smartwatch mit Gesundheits-Features', price: 'ab 249€' },
                { emoji: '💡', name: 'Smart Home Set', description: 'Stimmungsvolle Beleuchtung per App steuerbar', price: 'ab 89€' },
            ],
        };

        // Filter by budget
        const budgetFilter = {
            'unter30': (p) => parseInt(p.replace(/\D/g, '')) <= 50,
            '30-75': (p) => { const v = parseInt(p.replace(/\D/g, '')); return v >= 30 && v <= 100; },
            '75-200': (p) => { const v = parseInt(p.replace(/\D/g, '')); return v >= 50 && v <= 250; },
            '200plus': (p) => parseInt(p.replace(/\D/g, '')) >= 100,
        };

        const interestGifts = gifts[interest] || gifts.fashion;
        const filter = budgetFilter[budget];

        let results = filter
            ? interestGifts.filter(g => filter(g.price))
            : interestGifts;

        // Always return at least 4 results
        if (results.length < 4) {
            results = interestGifts;
        }

        return results.slice(0, 4);
    }

    // --- Trending Tabs ---
    const tabs = document.querySelectorAll('.trending__tab');
    const productCards = document.querySelectorAll('.product-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.dataset.tab;

            productCards.forEach(card => {
                if (category === 'alle' || card.dataset.category === category) {
                    card.style.display = '';
                    card.style.animation = 'fadeInUp 0.4s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- Wishlist ---
    const wishlistBtns = document.querySelectorAll('.product-card__wishlist');
    let wishlistCount = 0;
    const wishlistCountEl = document.querySelector('.wishlist-count');

    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            btn.classList.toggle('active');
            if (btn.classList.contains('active')) {
                btn.textContent = '♥';
                wishlistCount++;
            } else {
                btn.textContent = '♡';
                wishlistCount--;
            }
            if (wishlistCountEl) {
                wishlistCountEl.textContent = wishlistCount;
            }
        });
    });

    // --- Newsletter Form ---
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterSuccess = document.getElementById('newsletter-success');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            newsletterForm.hidden = true;
            newsletterSuccess.hidden = false;
        });
    }

    // --- Scroll Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(
        '.category-card, .product-card, .occasion-card, .guide__tip, .social-channel'
    ).forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // --- Smooth Scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
});

// Global reset function for finder
function resetFinder() {
    const finder = document.getElementById('finder');
    if (!finder) return;
    finder.querySelectorAll('.finder__step').forEach(step => step.classList.remove('active'));
    finder.querySelector('[data-step="1"]').classList.add('active');
    finder.querySelectorAll('.finder__option').forEach(o => o.style.borderColor = '');
}
