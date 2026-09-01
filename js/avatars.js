/* ===================================================
   LuxuryForHer – Avatar-Präsentationssystem
   ===================================================

   Avatare sind virtuelle Beraterinnen, die Produkte
   empfehlen und als Vertrauens-Anker dienen.

   Features:
   1. Verschiedene Avatar-Persönlichkeiten
   2. Produkt-Empfehlungen pro Avatar
   3. Avatar-gesteuerte Reels/Stories für Social Media
   4. Dynamische Sprechblasen & Empfehlungstexte
   5. Avatar-Karussell auf der Webseite
*/

const AvatarSystem = (() => {
    'use strict';

    // =============================================
    // AVATAR-DEFINITIONEN
    // =============================================
    const AVATARS = {
        sophia: {
            id: 'sophia',
            name: 'Sophia',
            role: 'Luxury-Expertin',
            tagline: 'Ich finde die perfekten Luxus-Geschenke für dich.',
            bio: 'Sophia kennt sich aus mit feinem Schmuck, Designer-Mode und allem, was das Herz höher schlagen lässt. Als Stil-Beraterin empfiehlt sie nur, was sie selbst verschenken würde.',
            expertise: ['schmuck', 'mode', 'luxus'],
            personality: 'elegant',
            color: '#c8917c',
            colorLight: '#f5e6d3',
            // SVG-Avatar (inline, keine externen Bilder nötig)
            avatar: null, // wird via generateAvatarSVG erzeugt
            style: {
                hairColor: '#3a2820',
                skinColor: '#f0c8a0',
                accessory: 'necklace',
                outfit: 'blazer',
                outfitColor: '#2d2926',
            },
            greeting: 'Hallo! Ich bin Sophia, deine Luxury-Beraterin. 💎',
            phrases: [
                'Dieses Stück ist absolut zeitlos – ein Geschenk, das sie nie vergessen wird.',
                'Qualität erkennt man an den Details. Und dieses Geschenk steckt voller Details.',
                'Mein persönlicher Tipp: Weniger ist mehr. Ein durchdachtes Geschenk schlägt zehn hastige.',
                'Ich verschenke selbst am liebsten Dinge, die eine Geschichte erzählen.',
            ],
            socialHandle: '@sophia.luxuryforher',
        },
        elena: {
            id: 'elena',
            name: 'Elena',
            role: 'Wellness-Guru',
            tagline: 'Entspannung und Wohlbefinden – das schönste Geschenk.',
            bio: 'Elena ist leidenschaftlich wenn es um Selfcare, Spa und natürliche Beauty geht. Sie testet jedes Produkt selbst und empfiehlt nur, was sie überzeugt hat.',
            expertise: ['beauty', 'wellness', 'home'],
            personality: 'warmherzig',
            color: '#8ba88f',
            colorLight: '#e4f0e8',
            avatar: null,
            style: {
                hairColor: '#8b6d47',
                skinColor: '#e8c0a0',
                accessory: 'earrings',
                outfit: 'casual',
                outfitColor: '#7ab88f',
            },
            greeting: 'Hey! Ich bin Elena. Lass uns das perfekte Wellness-Geschenk finden! 🌿',
            phrases: [
                'Selfcare ist kein Luxus – es ist ein Geschenk an sich selbst. Und an sie.',
                'Dieses Produkt riecht nicht nur himmlisch, es fühlt sich auch so an.',
                'Ein Spa-Erlebnis schenken heißt: gemeinsame Zeit, die ewig in Erinnerung bleibt.',
                'Natürliche Inhaltsstoffe machen den Unterschied. Bei Pflege wie beim Schenken.',
            ],
            socialHandle: '@elena.wellness',
        },
        mia: {
            id: 'mia',
            name: 'Mia',
            role: 'Trend-Scouting',
            tagline: 'Die neuesten Trends, bevor sie alle kennen.',
            bio: 'Mia ist immer einen Schritt voraus. Als Digital-Native weiß sie genau, was auf TikTok und Instagram gerade viral geht und welche Geschenke für „WOW"-Momente sorgen.',
            expertise: ['tech', 'erlebnisse', 'personalisiert'],
            personality: 'energetisch',
            color: '#b088b4',
            colorLight: '#f0e4ef',
            avatar: null,
            style: {
                hairColor: '#1a1a2e',
                skinColor: '#d4a890',
                accessory: 'glasses',
                outfit: 'hoodie',
                outfitColor: '#b088b4',
            },
            greeting: 'Hey! 🔥 Ich bin Mia – lass uns was Cooles finden!',
            phrases: [
                'OMG, das ist gerade überall auf TikTok – und das aus gutem Grund!',
                'Trust me, sie wird damit nicht aufhören können. Getestet und für genial befunden.',
                'Personalisiert ist das neue Luxus. Zeig ihr, dass du dir Gedanken gemacht hast.',
                'Dieses Geschenk ist der absolute Game-Changer. Kein Cap! 🔥',
            ],
            socialHandle: '@mia.trends',
        },
        charlotte: {
            id: 'charlotte',
            name: 'Charlotte',
            role: 'Erlebnis-Kuratorin',
            tagline: 'Die schönsten Momente kann man nicht kaufen – aber schenken.',
            bio: 'Charlotte glaubt daran, dass Erlebnisse mehr wert sind als materielle Dinge. Sie kuratiert unvergessliche Momente: von romantischen Dinner bis zu Abenteuer-Trips.',
            expertise: ['erlebnisse', 'gourmet', 'reisen'],
            personality: 'romantisch',
            color: '#c4858f',
            colorLight: '#f8e0e6',
            avatar: null,
            style: {
                hairColor: '#d4a060',
                skinColor: '#f5d0b8',
                accessory: 'scarf',
                outfit: 'dress',
                outfitColor: '#c4858f',
            },
            greeting: 'Bonjour! Ich bin Charlotte. Lass uns unvergessliche Momente kreieren! ✨',
            phrases: [
                'Ein Erlebnis schenken heißt: Erinnerungen schaffen, die ein Leben lang bleiben.',
                'Die beste Investition ist in gemeinsame Momente. Immer.',
                'Stell dir vor, ihr Gesicht, wenn sie das Erlebnis zum ersten Mal entdeckt...',
                'Candlelight, Champagner und die richtige Person – mehr braucht es nicht.',
            ],
            socialHandle: '@charlotte.erlebnisse',
        },
    };

    // =============================================
    // SVG AVATAR GENERATOR
    // =============================================
    function generateAvatarSVG(avatar, size = 120) {
        const s = avatar.style;
        return `
        <svg width="${size}" height="${size}" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Hintergrund -->
            <circle cx="60" cy="60" r="58" fill="${avatar.colorLight}" stroke="${avatar.color}" stroke-width="2"/>

            <!-- Haar (hinten) -->
            <ellipse cx="60" cy="52" rx="35" ry="38" fill="${s.hairColor}"/>

            <!-- Gesicht -->
            <ellipse cx="60" cy="58" rx="28" ry="30" fill="${s.skinColor}"/>

            <!-- Augen -->
            <ellipse cx="48" cy="54" rx="4" ry="4.5" fill="#fff"/>
            <ellipse cx="72" cy="54" rx="4" ry="4.5" fill="#fff"/>
            <circle cx="49" cy="54" r="2.5" fill="#3a2820"/>
            <circle cx="73" cy="54" r="2.5" fill="#3a2820"/>
            <circle cx="49.5" cy="53" r="0.8" fill="#fff"/>
            <circle cx="73.5" cy="53" r="0.8" fill="#fff"/>

            <!-- Augenbrauen -->
            <path d="M42 48 Q48 45 54 48" stroke="${s.hairColor}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            <path d="M66 48 Q72 45 78 48" stroke="${s.hairColor}" stroke-width="1.5" fill="none" stroke-linecap="round"/>

            <!-- Nase -->
            <path d="M58 58 Q60 64 62 58" stroke="${s.skinColor}" stroke-width="1" fill="none" opacity="0.5"/>

            <!-- Lächeln -->
            <path d="M50 68 Q60 76 70 68" stroke="#d4857a" stroke-width="2" fill="none" stroke-linecap="round"/>

            <!-- Wangen (Rouge) -->
            <circle cx="42" cy="64" r="5" fill="#f0a0a0" opacity="0.3"/>
            <circle cx="78" cy="64" r="5" fill="#f0a0a0" opacity="0.3"/>

            <!-- Haar (vorne) -->
            ${getHairFrontSVG(s.hairColor, avatar.id)}

            <!-- Accessoire -->
            ${getAccessorySVG(s.accessory, avatar.color)}

            <!-- Körper / Outfit -->
            <path d="M30 98 Q35 85 60 82 Q85 85 90 98 L90 120 L30 120 Z" fill="${s.outfitColor}"/>

            <!-- Ausschnitt -->
            <path d="M48 86 Q60 92 72 86" stroke="${s.skinColor}" stroke-width="1" fill="${s.skinColor}"/>
        </svg>`;
    }

    function getHairFrontSVG(color, avatarId) {
        switch (avatarId) {
            case 'sophia':
                return `
                    <path d="M25 50 Q28 25 60 20 Q92 25 95 50 Q90 35 60 32 Q30 35 25 50Z" fill="${color}"/>
                    <path d="M25 50 Q22 65 24 80" stroke="${color}" stroke-width="8" fill="none" stroke-linecap="round"/>
                    <path d="M95 50 Q98 65 96 80" stroke="${color}" stroke-width="8" fill="none" stroke-linecap="round"/>
                `;
            case 'elena':
                return `
                    <path d="M28 52 Q30 28 60 22 Q90 28 92 52 Q88 38 60 35 Q32 38 28 52Z" fill="${color}"/>
                    <path d="M26 52 Q20 70 28 90" stroke="${color}" stroke-width="6" fill="none" stroke-linecap="round"/>
                    <path d="M94 52 Q100 70 92 90" stroke="${color}" stroke-width="6" fill="none" stroke-linecap="round"/>
                `;
            case 'mia':
                return `
                    <path d="M26 55 Q30 22 60 18 Q90 22 94 55 Q90 32 60 28 Q30 32 26 55Z" fill="${color}"/>
                    <path d="M26 55 L24 45 Q26 40 30 42" stroke="${color}" stroke-width="4" fill="${color}"/>
                `;
            case 'charlotte':
                return `
                    <path d="M28 48 Q32 20 60 16 Q88 20 92 48 Q86 32 60 28 Q34 32 28 48Z" fill="${color}"/>
                    <path d="M22 50 Q18 72 25 95" stroke="${color}" stroke-width="7" fill="none" stroke-linecap="round"/>
                    <path d="M98 50 Q102 72 95 95" stroke="${color}" stroke-width="7" fill="none" stroke-linecap="round"/>
                    <ellipse cx="36" cy="18" rx="10" ry="5" fill="${color}" transform="rotate(-20 36 18)"/>
                `;
            default:
                return `<path d="M25 50 Q28 25 60 20 Q92 25 95 50" fill="${color}"/>`;
        }
    }

    function getAccessorySVG(type, color) {
        switch (type) {
            case 'necklace':
                return `<path d="M45 84 Q52 90 60 88 Q68 90 75 84" stroke="${color}" stroke-width="1.5" fill="none"/>
                        <circle cx="60" cy="89" r="2.5" fill="${color}"/>`;
            case 'earrings':
                return `<circle cx="32" cy="62" r="3" fill="${color}" opacity="0.8"/>
                        <circle cx="88" cy="62" r="3" fill="${color}" opacity="0.8"/>`;
            case 'glasses':
                return `<rect x="40" y="50" width="14" height="10" rx="5" stroke="${color}" stroke-width="1.5" fill="none"/>
                        <rect x="66" y="50" width="14" height="10" rx="5" stroke="${color}" stroke-width="1.5" fill="none"/>
                        <line x1="54" y1="55" x2="66" y2="55" stroke="${color}" stroke-width="1.5"/>`;
            case 'scarf':
                return `<path d="M42 86 Q50 94 60 90 Q70 94 78 86" stroke="${color}" stroke-width="3" fill="none" opacity="0.6"/>`;
            default:
                return '';
        }
    }

    // =============================================
    // AVATAR-EMPFEHLUNGEN
    // =============================================
    function getRecommendation(avatarId, product) {
        const avatar = AVATARS[avatarId];
        if (!avatar) return '';

        const phrase = avatar.phrases[Math.floor(Math.random() * avatar.phrases.length)];
        return phrase;
    }

    function matchAvatarToProduct(product) {
        // Finde den passendsten Avatar basierend auf Expertise
        let bestMatch = null;
        let bestScore = 0;

        Object.values(AVATARS).forEach(avatar => {
            const score = avatar.expertise.filter(e =>
                e === product.category ||
                product.tags.includes(e)
            ).length;

            if (score > bestScore) {
                bestScore = score;
                bestMatch = avatar;
            }
        });

        return bestMatch || AVATARS.sophia; // Fallback
    }

    // =============================================
    // HTML-RENDERING
    // =============================================

    // Avatar-Profil-Karte
    function renderAvatarCard(avatarId, options = {}) {
        const avatar = AVATARS[avatarId];
        if (!avatar) return '';

        return `
            <div class="avatar-card" data-avatar="${avatar.id}">
                <div class="avatar-card__visual" style="background: ${avatar.colorLight};">
                    <div class="avatar-card__svg">
                        ${generateAvatarSVG(avatar, 100)}
                    </div>
                </div>
                <div class="avatar-card__info">
                    <h4 class="avatar-card__name">${avatar.name}</h4>
                    <span class="avatar-card__role" style="color: ${avatar.color};">${avatar.role}</span>
                    <p class="avatar-card__tagline">${avatar.tagline}</p>
                </div>
            </div>
        `;
    }

    // Avatar Empfehlungs-Bubble
    function renderRecommendationBubble(avatarId, product) {
        const avatar = AVATARS[avatarId];
        if (!avatar) return '';

        const phrase = getRecommendation(avatarId, product);

        return `
            <div class="avatar-bubble" data-avatar="${avatar.id}">
                <div class="avatar-bubble__avatar">
                    ${generateAvatarSVG(avatar, 48)}
                </div>
                <div class="avatar-bubble__content" style="border-color: ${avatar.colorLight};">
                    <span class="avatar-bubble__name">${avatar.name} <em>– ${avatar.role}</em></span>
                    <p>"${phrase}"</p>
                </div>
            </div>
        `;
    }

    // Avatar-Karussell (Team-Übersicht)
    function renderAvatarCarousel() {
        return `
            <div class="avatar-carousel">
                <h3 class="avatar-carousel__title">Unsere Geschenk-Expertinnen</h3>
                <p class="avatar-carousel__subtitle">Vier Persönlichkeiten – vier Perspektiven auf das perfekte Geschenk</p>
                <div class="avatar-carousel__grid">
                    ${Object.keys(AVATARS).map(id => renderAvatarCard(id)).join('')}
                </div>
            </div>
        `;
    }

    // Produktkarte MIT Avatar-Empfehlung
    function renderProductWithAvatar(product, options = {}) {
        const avatar = matchAvatarToProduct(product);
        const affiliateUrl = window.AffiliateSystem
            ? AffiliateSystem.generateLink(product, options)
            : '#';

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

        return `
            <article class="product-card product-card--with-avatar" data-product-id="${product.id}" data-category="${product.category}">
                <a href="${affiliateUrl}" target="_blank" rel="noopener sponsored"
                   class="product-card__link"
                   data-affiliate-product="${product.id}">
                    <div class="product-card__image" style="background: ${bgColors[product.category] || bgColors.schmuck};">
                        <span class="product-card__emoji">${product.emoji}</span>
                        ${product.badge ? `<span class="product-card__badge">${product.badge}</span>` : ''}
                        <div class="product-card__avatar-badge" style="border-color: ${avatar.color};">
                            ${generateAvatarSVG(avatar, 36)}
                        </div>
                    </div>
                    <div class="product-card__content">
                        <div class="product-card__avatar-rec">
                            <span style="color: ${avatar.color};">${avatar.name} empfiehlt</span>
                        </div>
                        <span class="product-card__category">${product.category}</span>
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="product-card__footer">
                            <span class="product-card__price">${product.displayPrice}</span>
                            <div class="product-card__rating">
                                ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                                <span>(${product.reviewCount >= 1000 ? (product.reviewCount / 1000).toFixed(1) + 'K' : product.reviewCount})</span>
                            </div>
                        </div>
                    </div>
                </a>
                <button class="product-card__wishlist" aria-label="Auf Merkliste">♡</button>
            </article>
        `;
    }

    // Social-Media-Vorlagen für Avatar-Content
    function renderSocialTemplate(avatarId, product, platform = 'instagram') {
        const avatar = AVATARS[avatarId];
        if (!avatar) return '';

        const templates = {
            instagram: {
                reel: `
                    <div class="social-template social-template--reel" style="background: linear-gradient(135deg, ${avatar.colorLight}, ${avatar.color}20);">
                        <div class="social-template__header">
                            <div class="social-template__avatar">${generateAvatarSVG(avatar, 40)}</div>
                            <span>${avatar.socialHandle}</span>
                        </div>
                        <div class="social-template__product">
                            <span class="social-template__emoji">${product.emoji}</span>
                            <h4>${product.name}</h4>
                            <p>"${getRecommendation(avatarId, product)}"</p>
                        </div>
                        <div class="social-template__cta">
                            <span>🔗 Link in Bio</span>
                            <span>${product.displayPrice}</span>
                        </div>
                        <span class="social-template__badge">REEL</span>
                    </div>
                `,
                story: `
                    <div class="social-template social-template--story" style="background: linear-gradient(180deg, ${avatar.color}30, ${avatar.colorLight});">
                        <div class="social-template__header">
                            <div class="social-template__avatar">${generateAvatarSVG(avatar, 32)}</div>
                            <span>${avatar.name}'s Pick</span>
                        </div>
                        <div class="social-template__product" style="text-align:center;">
                            <span style="font-size:3rem;">${product.emoji}</span>
                            <h4>${product.name}</h4>
                            <span class="social-template__price">${product.displayPrice}</span>
                        </div>
                        <div class="social-template__swipe">↑ Nach oben wischen</div>
                        <span class="social-template__badge">STORY</span>
                    </div>
                `,
            },
            tiktok: {
                video: `
                    <div class="social-template social-template--tiktok" style="background: linear-gradient(180deg, #1a1a2e, ${avatar.color}40);">
                        <div class="social-template__header" style="color: #fff;">
                            <div class="social-template__avatar">${generateAvatarSVG(avatar, 36)}</div>
                            <span>${avatar.name} | ${avatar.role}</span>
                        </div>
                        <div class="social-template__product" style="color:#fff; text-align:center;">
                            <span style="font-size:3.5rem;">${product.emoji}</span>
                            <h4>${product.name}</h4>
                            <p style="opacity:0.8;">"${getRecommendation(avatarId, product)}"</p>
                        </div>
                        <div class="social-template__tiktok-ui">
                            <span>❤️ 12.4K</span>
                            <span>💬 890</span>
                            <span>↗️ Teilen</span>
                        </div>
                        <span class="social-template__badge social-template__badge--dark">TIKTOK</span>
                    </div>
                `,
            },
        };

        const platformTemplates = templates[platform] || templates.instagram;
        const format = platform === 'tiktok' ? 'video' : 'reel';
        return platformTemplates[format] || '';
    }

    // =============================================
    // ÖFFENTLICHE API
    // =============================================
    return {
        AVATARS,
        generateAvatarSVG,
        getRecommendation,
        matchAvatarToProduct,
        renderAvatarCard,
        renderRecommendationBubble,
        renderAvatarCarousel,
        renderProductWithAvatar,
        renderSocialTemplate,
        getAvatar: (id) => AVATARS[id],
        getAllAvatars: () => Object.values(AVATARS),
    };
})();

window.AvatarSystem = AvatarSystem;
