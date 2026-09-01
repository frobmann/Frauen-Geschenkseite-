/* ===================================================
   LuxuryForHer – Affiliate Marketing Backbone
   ===================================================

   Dieses System ermöglicht:
   1. Verwaltung von Affiliate-Links & Partnerprogrammen
   2. Klick-Tracking & Conversion-Tracking
   3. Dynamische Produkt-Feeds mit Affiliate-Links
   4. Cookie-basierte Attribution (30-Tage-Fenster)
   5. UTM-Parameter-Tracking
   6. Einfache Konfiguration neuer Partner
*/

const AffiliateSystem = (() => {
    'use strict';

    // =============================================
    // KONFIGURATION – Affiliate-Partner
    // =============================================
    const PARTNERS = {
        amazon: {
            name: 'Amazon',
            tag: 'luxuryforher-21', // Dein Amazon PartnerNet Tag
            baseUrl: 'https://www.amazon.de/dp/',
            cookieDays: 1,
            commission: '1-10%',
            active: true,
            // URL-Builder: Erstellt den vollständigen Affiliate-Link
            buildUrl: (productId, params = {}) => {
                const url = new URL(`https://www.amazon.de/dp/${productId}`);
                url.searchParams.set('tag', PARTNERS.amazon.tag);
                url.searchParams.set('linkCode', 'ogi');
                url.searchParams.set('th', '1');
                if (params.camp) url.searchParams.set('camp', params.camp);
                return url.toString();
            }
        },
        awin: {
            name: 'AWIN',
            publisherId: 'DEINE_AWIN_ID', // Dein AWIN Publisher-ID
            baseUrl: 'https://www.awin1.com/cread.php',
            cookieDays: 30,
            commission: '5-15%',
            active: true,
            buildUrl: (merchantId, deeplink, params = {}) => {
                const url = new URL('https://www.awin1.com/cread.php');
                url.searchParams.set('awinmid', merchantId);
                url.searchParams.set('awinaffid', PARTNERS.awin.publisherId);
                url.searchParams.set('ued', deeplink);
                url.searchParams.set('clickref', params.clickref || '');
                return url.toString();
            }
        },
        tradedoubler: {
            name: 'Tradedoubler',
            siteId: 'DEINE_TD_SITE_ID',
            baseUrl: 'https://clk.tradedoubler.com/click',
            cookieDays: 30,
            commission: '3-12%',
            active: true,
            buildUrl: (programId, productUrl, params = {}) => {
                const url = new URL('https://clk.tradedoubler.com/click');
                url.searchParams.set('p', programId);
                url.searchParams.set('a', PARTNERS.tradedoubler.siteId);
                url.searchParams.set('url', productUrl);
                return url.toString();
            }
        },
        directPartner: {
            name: 'Direkte Partner',
            cookieDays: 30,
            commission: 'Individuell',
            active: true,
            // Direkte Affiliate-URLs von Partnershops
            buildUrl: (baseUrl, params = {}) => {
                const url = new URL(baseUrl);
                url.searchParams.set('ref', 'luxuryforher');
                url.searchParams.set('utm_source', 'luxuryforher');
                url.searchParams.set('utm_medium', 'affiliate');
                if (params.campaign) url.searchParams.set('utm_campaign', params.campaign);
                return url.toString();
            }
        }
    };

    // =============================================
    // PRODUKT-DATENBANK mit Affiliate-Links
    // =============================================
    const PRODUCTS = [
        {
            id: 'prod-001',
            name: 'Personalisierte Goldkette',
            category: 'schmuck',
            subcategory: 'ketten',
            occasions: ['valentinstag', 'geburtstag', 'jahrestag', 'weihnachten'],
            priceRange: { min: 89, max: 189 },
            displayPrice: 'ab 89€',
            description: 'Zarte 18K vergoldete Kette mit graviertem Anhänger – ihr Name, ein Datum oder eine Botschaft',
            rating: 4.9,
            reviewCount: 2400,
            emoji: '✨💍',
            badge: 'Bestseller',
            tags: ['personalisiert', 'gold', 'gravur', 'kette'],
            affiliateLinks: {
                primary: { partner: 'amazon', productId: 'B0EXAMPLE01' },
                alternatives: [
                    { partner: 'awin', merchantId: '12345', deeplink: 'https://example-shop.de/goldkette' },
                ]
            }
        },
        {
            id: 'prod-002',
            name: 'Luxury Spa Box',
            category: 'beauty',
            subcategory: 'sets',
            occasions: ['geburtstag', 'muttertag', 'danke', 'weihnachten'],
            priceRange: { min: 65, max: 120 },
            displayPrice: 'ab 65€',
            description: 'Handverlesene Bio-Pflegeprodukte in edler Geschenkbox – Badeöl, Körperbutter & Duftkerze',
            rating: 4.8,
            reviewCount: 1800,
            emoji: '🧖‍♀️🌸',
            badge: 'Neu',
            tags: ['bio', 'pflege', 'wellness', 'geschenkset'],
            affiliateLinks: {
                primary: { partner: 'amazon', productId: 'B0EXAMPLE02' },
                alternatives: [
                    { partner: 'directPartner', baseUrl: 'https://example-spa.de/luxury-box' }
                ]
            }
        },
        {
            id: 'prod-003',
            name: 'Candlelight Dinner Gutschein',
            category: 'erlebnisse',
            subcategory: 'dining',
            occasions: ['valentinstag', 'jahrestag', 'geburtstag'],
            priceRange: { min: 149, max: 299 },
            displayPrice: 'ab 149€',
            description: 'Romantisches Abendessen zu zweit in einem ausgewählten Sternerestaurant eurer Wahl',
            rating: 4.9,
            reviewCount: 3100,
            emoji: '🥂🌹',
            badge: 'Top bewertet',
            tags: ['romantisch', 'dinner', 'erlebnis', 'gutschein'],
            affiliateLinks: {
                primary: { partner: 'awin', merchantId: '67890', deeplink: 'https://example-erlebnis.de/dinner' },
            }
        },
        {
            id: 'prod-004',
            name: 'Cashmere Schal Set',
            category: 'mode',
            subcategory: 'accessoires',
            occasions: ['weihnachten', 'geburtstag', 'muttertag'],
            priceRange: { min: 120, max: 220 },
            displayPrice: 'ab 120€',
            description: 'Ultraweicher Cashmere-Schal in edler Geschenkverpackung – zeitlose Farben, endlose Wärme',
            rating: 4.6,
            reviewCount: 980,
            emoji: '🧣👜',
            badge: null,
            tags: ['cashmere', 'schal', 'winter', 'luxus'],
            affiliateLinks: {
                primary: { partner: 'amazon', productId: 'B0EXAMPLE04' },
            }
        },
        {
            id: 'prod-005',
            name: 'Elegante Damenuhr',
            category: 'schmuck',
            subcategory: 'uhren',
            occasions: ['jahrestag', 'geburtstag', 'weihnachten'],
            priceRange: { min: 289, max: 599 },
            displayPrice: 'ab 289€',
            description: 'Minimalistische Armbanduhr mit Roségold-Finish und Saphirglas – Schweizer Uhrwerk',
            rating: 4.9,
            reviewCount: 1200,
            emoji: '⌚💫',
            badge: 'Luxus',
            tags: ['uhr', 'roségold', 'schweiz', 'luxus'],
            affiliateLinks: {
                primary: { partner: 'awin', merchantId: '11111', deeplink: 'https://example-uhren.de/damenuhr' },
            }
        },
        {
            id: 'prod-006',
            name: 'Designer Parfum Set',
            category: 'beauty',
            subcategory: 'parfum',
            occasions: ['geburtstag', 'valentinstag', 'weihnachten'],
            priceRange: { min: 75, max: 180 },
            displayPrice: 'ab 75€',
            description: 'Kuratiertes Duft-Set mit 5 exklusiven Parfums zum Entdecken – in eleganter Sammelbox',
            rating: 4.8,
            reviewCount: 2100,
            emoji: '🌺💐',
            badge: null,
            tags: ['parfum', 'duft', 'set', 'designer'],
            affiliateLinks: {
                primary: { partner: 'amazon', productId: 'B0EXAMPLE06' },
            }
        },
        {
            id: 'prod-007',
            name: 'Wellness-Wochenende',
            category: 'erlebnisse',
            subcategory: 'reisen',
            occasions: ['jahrestag', 'geburtstag', 'valentinstag'],
            priceRange: { min: 399, max: 899 },
            displayPrice: 'ab 399€',
            description: '2 Nächte im 5-Sterne-Spa-Hotel mit Vollpension, Massagen & Pool-Zugang für Zwei',
            rating: 4.9,
            reviewCount: 890,
            emoji: '💆‍♀️🕯️',
            badge: null,
            tags: ['wellness', 'spa', 'hotel', 'wochenende'],
            affiliateLinks: {
                primary: { partner: 'awin', merchantId: '22222', deeplink: 'https://example-travel.de/spa-weekend' },
            }
        },
        {
            id: 'prod-008',
            name: 'Designer Handtasche',
            category: 'mode',
            subcategory: 'taschen',
            occasions: ['geburtstag', 'weihnachten', 'jahrestag'],
            priceRange: { min: 450, max: 1200 },
            displayPrice: 'ab 450€',
            description: 'Zeitlose Lederhandtasche im Quiet-Luxury-Stil – handgefertigt in Italien',
            rating: 4.8,
            reviewCount: 1500,
            emoji: '👠✨',
            badge: 'Bestseller',
            tags: ['handtasche', 'leder', 'italien', 'designer'],
            affiliateLinks: {
                primary: { partner: 'awin', merchantId: '33333', deeplink: 'https://example-fashion.de/handtasche' },
            }
        },
        {
            id: 'prod-009',
            name: 'Premium Kopfhörer',
            category: 'tech',
            subcategory: 'audio',
            occasions: ['geburtstag', 'weihnachten'],
            priceRange: { min: 199, max: 399 },
            displayPrice: 'ab 199€',
            description: 'Kabellose Noise-Cancelling Kopfhörer mit erstklassigem Sound und elegantem Design',
            rating: 4.7,
            reviewCount: 3200,
            emoji: '🎧✨',
            badge: 'Tech-Hit',
            tags: ['kopfhörer', 'bluetooth', 'noise-cancelling', 'audio'],
            affiliateLinks: {
                primary: { partner: 'amazon', productId: 'B0EXAMPLE09' },
            }
        },
        {
            id: 'prod-010',
            name: 'Handgemaltes Portrait',
            category: 'personalisiert',
            subcategory: 'kunst',
            occasions: ['jahrestag', 'valentinstag', 'geburtstag'],
            priceRange: { min: 189, max: 499 },
            displayPrice: 'ab 189€',
            description: 'Handgemaltes Ölportrait nach deinem Lieblingsfoto – gerahmt & versandfertig',
            rating: 4.9,
            reviewCount: 670,
            emoji: '🎨🖼️',
            badge: 'Einzigartig',
            tags: ['portrait', 'kunst', 'öl', 'personalisiert'],
            affiliateLinks: {
                primary: { partner: 'directPartner', baseUrl: 'https://example-art.de/portrait' },
            }
        },
        {
            id: 'prod-011',
            name: 'Duftkerzen-Set',
            category: 'home',
            subcategory: 'dekoration',
            occasions: ['muttertag', 'geburtstag', 'weihnachten', 'danke'],
            priceRange: { min: 45, max: 89 },
            displayPrice: 'ab 45€',
            description: 'Handgegossene Sojawachs-Kerzen in 3 harmonischen Düften – in edler Geschenkbox',
            rating: 4.7,
            reviewCount: 1900,
            emoji: '🕯️🌿',
            badge: null,
            tags: ['kerzen', 'duft', 'soja', 'deko'],
            affiliateLinks: {
                primary: { partner: 'amazon', productId: 'B0EXAMPLE11' },
            }
        },
        {
            id: 'prod-012',
            name: 'Luxus-Pralinés Box',
            category: 'gourmet',
            subcategory: 'schokolade',
            occasions: ['valentinstag', 'muttertag', 'danke', 'geburtstag'],
            priceRange: { min: 35, max: 85 },
            displayPrice: 'ab 35€',
            description: 'Handgemachte belgische Pralinen in 12 Sorten – in goldener Geschenkbox',
            rating: 4.8,
            reviewCount: 2800,
            emoji: '🍫🎀',
            badge: 'Bestseller',
            tags: ['pralinen', 'schokolade', 'belgisch', 'geschenkbox'],
            affiliateLinks: {
                primary: { partner: 'amazon', productId: 'B0EXAMPLE12' },
            }
        },
    ];

    // =============================================
    // TRACKING-SYSTEM
    // =============================================
    const Tracking = {
        // Klick-Events speichern
        trackClick(productId, partnerId, context = {}) {
            const event = {
                type: 'affiliate_click',
                productId,
                partnerId,
                timestamp: new Date().toISOString(),
                page: window.location.pathname,
                referrer: document.referrer,
                ...context
            };

            // In localStorage speichern (für lokales Dashboard)
            try {
                const clicks = JSON.parse(localStorage.getItem('lfh_clicks') || '[]');
                clicks.push(event);
                // Max. 1000 Events behalten
                if (clicks.length > 1000) clicks.splice(0, clicks.length - 1000);
                localStorage.setItem('lfh_clicks', JSON.stringify(clicks));
            } catch (e) {
                // localStorage nicht verfügbar - ignorieren
            }

            // Google Analytics Event (wenn verfügbar)
            if (typeof gtag === 'function') {
                gtag('event', 'affiliate_click', {
                    event_category: 'affiliate',
                    event_label: productId,
                    affiliate_partner: partnerId,
                    value: context.price || 0
                });
            }

            // Meta Pixel Event (wenn verfügbar)
            if (typeof fbq === 'function') {
                fbq('track', 'ViewContent', {
                    content_name: productId,
                    content_category: context.category || '',
                    content_type: 'product',
                });
            }

            console.log('[Affiliate] Click tracked:', event);
        },

        // Impression-Events
        trackImpression(productId, context = {}) {
            if (typeof gtag === 'function') {
                gtag('event', 'view_item', {
                    items: [{
                        item_id: productId,
                        item_category: context.category || '',
                    }]
                });
            }
        },

        // Attribution-Cookie setzen
        setAttributionCookie(source, medium, campaign) {
            try {
                const attribution = {
                    source: source || 'direct',
                    medium: medium || 'none',
                    campaign: campaign || '',
                    timestamp: Date.now(),
                    landingPage: window.location.pathname
                };
                localStorage.setItem('lfh_attribution', JSON.stringify(attribution));
            } catch (e) {
                // Ignore
            }
        },

        // UTM-Parameter auslesen & speichern
        captureUTM() {
            const params = new URLSearchParams(window.location.search);
            const utm = {
                source: params.get('utm_source'),
                medium: params.get('utm_medium'),
                campaign: params.get('utm_campaign'),
                content: params.get('utm_content'),
                term: params.get('utm_term'),
            };

            if (utm.source) {
                this.setAttributionCookie(utm.source, utm.medium, utm.campaign);
            }

            return utm;
        },

        // Statistiken abrufen
        getStats() {
            try {
                const clicks = JSON.parse(localStorage.getItem('lfh_clicks') || '[]');
                const now = Date.now();
                const dayMs = 86400000;

                return {
                    totalClicks: clicks.length,
                    today: clicks.filter(c => (now - new Date(c.timestamp).getTime()) < dayMs).length,
                    last7Days: clicks.filter(c => (now - new Date(c.timestamp).getTime()) < 7 * dayMs).length,
                    last30Days: clicks.filter(c => (now - new Date(c.timestamp).getTime()) < 30 * dayMs).length,
                    byPartner: clicks.reduce((acc, c) => {
                        acc[c.partnerId] = (acc[c.partnerId] || 0) + 1;
                        return acc;
                    }, {}),
                    byProduct: clicks.reduce((acc, c) => {
                        acc[c.productId] = (acc[c.productId] || 0) + 1;
                        return acc;
                    }, {}),
                    topProducts: Object.entries(
                        clicks.reduce((acc, c) => {
                            acc[c.productId] = (acc[c.productId] || 0) + 1;
                            return acc;
                        }, {})
                    ).sort((a, b) => b[1] - a[1]).slice(0, 10)
                };
            } catch (e) {
                return { totalClicks: 0 };
            }
        }
    };

    // =============================================
    // AFFILIATE-LINK GENERATOR
    // =============================================
    function generateAffiliateLink(product, options = {}) {
        const affiliateConfig = product.affiliateLinks;
        if (!affiliateConfig) return '#';

        const primary = affiliateConfig.primary;
        const partner = PARTNERS[primary.partner];

        if (!partner || !partner.active) {
            // Fallback auf Alternative
            if (affiliateConfig.alternatives && affiliateConfig.alternatives.length > 0) {
                const alt = affiliateConfig.alternatives[0];
                const altPartner = PARTNERS[alt.partner];
                if (altPartner && altPartner.active) {
                    return altPartner.buildUrl(
                        alt.merchantId || alt.productId || alt.baseUrl,
                        alt.deeplink,
                        { clickref: product.id, campaign: options.campaign || 'website' }
                    );
                }
            }
            return '#';
        }

        return partner.buildUrl(
            primary.merchantId || primary.productId || primary.baseUrl,
            primary.deeplink,
            { clickref: product.id, campaign: options.campaign || 'website' }
        );
    }

    // =============================================
    // PRODUKT-FILTER & SUCHE
    // =============================================
    function filterProducts(filters = {}) {
        let results = [...PRODUCTS];

        if (filters.category) {
            results = results.filter(p => p.category === filters.category);
        }

        if (filters.occasion) {
            results = results.filter(p => p.occasions.includes(filters.occasion));
        }

        if (filters.minPrice !== undefined) {
            results = results.filter(p => p.priceRange.max >= filters.minPrice);
        }

        if (filters.maxPrice !== undefined) {
            results = results.filter(p => p.priceRange.min <= filters.maxPrice);
        }

        if (filters.search) {
            const query = filters.search.toLowerCase();
            results = results.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.tags.some(t => t.includes(query))
            );
        }

        if (filters.tags && filters.tags.length > 0) {
            results = results.filter(p =>
                filters.tags.some(tag => p.tags.includes(tag))
            );
        }

        // Sort
        if (filters.sort === 'price-asc') {
            results.sort((a, b) => a.priceRange.min - b.priceRange.min);
        } else if (filters.sort === 'price-desc') {
            results.sort((a, b) => b.priceRange.min - a.priceRange.min);
        } else if (filters.sort === 'rating') {
            results.sort((a, b) => b.rating - a.rating);
        } else if (filters.sort === 'popular') {
            results.sort((a, b) => b.reviewCount - a.reviewCount);
        }

        return results;
    }

    // =============================================
    // HTML-RENDERING für Produktkarten
    // =============================================
    function renderProductCard(product, options = {}) {
        const affiliateUrl = generateAffiliateLink(product, options);
        const bgColors = {
            schmuck: 'linear-gradient(135deg, #f5e6d3, #d4b896)',
            beauty: 'linear-gradient(135deg, #f0e4ef, #d1b8d6)',
            mode: 'linear-gradient(135deg, #e4e8f0, #b8c2d6)',
            erlebnisse: 'linear-gradient(135deg, #e4f0e8, #b8d6c2)',
            tech: 'linear-gradient(135deg, #e8e4f0, #c0b8d6)',
            personalisiert: 'linear-gradient(135deg, #f5e8e4, #d6c0b8)',
            home: 'linear-gradient(135deg, #f0ece4, #d6ccb8)',
            gourmet: 'linear-gradient(135deg, #f0e4e8, #d6b8c0)',
        };

        const stars = '★'.repeat(Math.floor(product.rating)) +
                     (product.rating % 1 >= 0.5 ? '½' : '') +
                     '☆'.repeat(5 - Math.ceil(product.rating));

        return `
            <article class="product-card" data-product-id="${product.id}" data-category="${product.category}">
                <a href="${affiliateUrl}" target="_blank" rel="noopener sponsored"
                   class="product-card__link"
                   data-affiliate-product="${product.id}"
                   data-affiliate-partner="${product.affiliateLinks?.primary?.partner || 'none'}"
                   onclick="AffiliateSystem.trackClick('${product.id}', '${product.affiliateLinks?.primary?.partner || 'none'}', {category: '${product.category}'})">
                    <div class="product-card__image" style="background: ${bgColors[product.category] || bgColors.schmuck};">
                        <span class="product-card__emoji">${product.emoji}</span>
                        ${product.badge ? `<span class="product-card__badge">${product.badge}</span>` : ''}
                    </div>
                    <div class="product-card__content">
                        <span class="product-card__category">${product.category}</span>
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="product-card__footer">
                            <span class="product-card__price">${product.displayPrice}</span>
                            <div class="product-card__rating">${stars} <span>(${formatNumber(product.reviewCount)})</span></div>
                        </div>
                    </div>
                </a>
                <button class="product-card__wishlist" aria-label="Auf Merkliste" onclick="event.stopPropagation();">♡</button>
            </article>
        `;
    }

    function renderProductGrid(products, options = {}) {
        if (products.length === 0) {
            return '<p class="no-results">Keine Geschenkideen gefunden. Probiere andere Filter!</p>';
        }
        return products.map(p => renderProductCard(p, options)).join('');
    }

    function formatNumber(num) {
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }

    // =============================================
    // AFFILIATE DISCLOSURE (Pflicht-Hinweis)
    // =============================================
    function renderDisclosure() {
        return `
            <div class="affiliate-disclosure">
                <p>
                    <strong>Transparenz-Hinweis:</strong> Einige Links auf dieser Seite sind Affiliate-Links.
                    Das bedeutet, dass wir eine kleine Provision erhalten, wenn du über diese Links einkaufst –
                    für dich entstehen dabei <strong>keine Mehrkosten</strong>.
                    So können wir diese Seite weiterhin kostenlos anbieten und dir die besten Geschenkideen präsentieren.
                    Vielen Dank für deine Unterstützung! ❤️
                </p>
            </div>
        `;
    }

    // =============================================
    // INITIALISIERUNG
    // =============================================
    function init() {
        // UTM-Parameter erfassen
        Tracking.captureUTM();

        // Klick-Tracking für alle Affiliate-Links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-affiliate-product]');
            if (link) {
                const productId = link.dataset.affiliateProduct;
                const partnerId = link.dataset.affiliatePartner;
                Tracking.trackClick(productId, partnerId, {
                    page: window.location.pathname,
                });
            }
        });

        // Impression-Tracking mit IntersectionObserver
        const impressionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const productId = entry.target.dataset.productId;
                    if (productId) {
                        Tracking.trackImpression(productId);
                    }
                    impressionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        // Alle Produktkarten beobachten
        document.querySelectorAll('[data-product-id]').forEach(card => {
            impressionObserver.observe(card);
        });

        // Affiliate-Disclosure einfügen, wenn Produkte angezeigt werden
        const trendingSection = document.querySelector('.trending');
        if (trendingSection) {
            const disclosure = document.createElement('div');
            disclosure.innerHTML = renderDisclosure();
            trendingSection.appendChild(disclosure.firstElementChild);
        }

        console.log('[Affiliate] System initialized');
    }

    // Auto-Init wenn DOM geladen
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // =============================================
    // ÖFFENTLICHE API
    // =============================================
    return {
        // Partner-Konfiguration
        PARTNERS,

        // Produkt-Datenbank
        PRODUCTS,

        // Kernfunktionen
        generateLink: generateAffiliateLink,
        filterProducts,
        renderProductCard,
        renderProductGrid,
        renderDisclosure,

        // Tracking
        trackClick: Tracking.trackClick.bind(Tracking),
        trackImpression: Tracking.trackImpression.bind(Tracking),
        getStats: Tracking.getStats.bind(Tracking),

        // Produkt-Lookup
        getProduct: (id) => PRODUCTS.find(p => p.id === id),
        getProductsByCategory: (cat) => PRODUCTS.filter(p => p.category === cat),
        getProductsByOccasion: (occ) => PRODUCTS.filter(p => p.occasions.includes(occ)),

        // Partner-Management
        addPartner: (key, config) => { PARTNERS[key] = config; },
        togglePartner: (key, active) => { if (PARTNERS[key]) PARTNERS[key].active = active; },

        // Produkt hinzufügen
        addProduct: (product) => {
            PRODUCTS.push(product);
            return product;
        },
    };
})();

// Global verfügbar machen
window.AffiliateSystem = AffiliateSystem;
