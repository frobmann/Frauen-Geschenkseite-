# 🎁 LuxuryForHer – Geschenkideen-Plattform für Frauen

Eine elegante Webseite, auf der Männer die perfekten Geschenkideen für Frauen finden können. Inspiriert vom "Quiet Luxury"-Design mit integriertem Affiliate-Marketing-System und Avatar-Präsentationssystem.

## 🌐 Übersicht

**LuxuryForHer** ist eine kuratierte Geschenkideen-Plattform mit folgenden Kernfeatures:

### Webseite
- **Startseite** (`index.html`) – Hero, Kategorien, Geschenkfinder, Trending, Anlässe, Ratgeber
- **Kategorie-Seite** (`pages/kategorie.html`) – Filterbare Produktübersicht mit Avatar-Empfehlungen
- **Ratgeber & Blog** (`pages/ratgeber.html`) – Geschenk-Guides und Tipps

### Backbone-Systeme
- **Affiliate-Marketing-System** (`js/affiliate.js`) – Verwaltung von Partnerprogrammen, Klick-Tracking, dynamische Produkt-Feeds
- **Avatar-System** (`js/avatars.js`) – 4 virtuelle Beraterinnen, die Produkte präsentieren
- **Social Media Integration** – Instagram- und TikTok-Content-Strategie

---

## 📁 Projektstruktur

```
Frauen-Geschenkseite-/
├── index.html                    # Startseite
├── css/
│   ├── style.css                 # Haupt-Stylesheet
│   └── avatars.css               # Avatar & Affiliate Styles
├── js/
│   ├── main.js                   # Kernfunktionalität
│   ├── affiliate.js              # Affiliate-Marketing-System
│   └── avatars.js                # Avatar-Präsentationssystem
├── pages/
│   ├── kategorie.html            # Kategorie-/Produktseite
│   └── ratgeber.html             # Blog/Ratgeber
└── README.md
```

---

## 🤝 Affiliate-Marketing-System

### Unterstützte Partnerprogramme

| Partner       | Typ            | Cookie | Provision  |
|--------------|----------------|--------|------------|
| Amazon        | PartnerNet     | 1 Tag  | 1-10%      |
| AWIN          | Netzwerk       | 30 Tage| 5-15%      |
| Tradedoubler  | Netzwerk       | 30 Tage| 3-12%      |
| Direkte Partner| Individuell   | 30 Tage| Individuell|

### Konfiguration

In `js/affiliate.js` können Partner-IDs konfiguriert werden:

```javascript
// Amazon PartnerNet Tag
PARTNERS.amazon.tag = 'dein-amazon-tag-21';

// AWIN Publisher-ID
PARTNERS.awin.publisherId = 'DEINE_AWIN_ID';

// Tradedoubler Site-ID
PARTNERS.tradedoubler.siteId = 'DEINE_TD_SITE_ID';
```

### Produkte hinzufügen

```javascript
AffiliateSystem.addProduct({
    id: 'prod-xxx',
    name: 'Produktname',
    category: 'schmuck', // schmuck, beauty, mode, erlebnisse, tech, personalisiert, home, gourmet
    occasions: ['valentinstag', 'geburtstag'],
    priceRange: { min: 99, max: 199 },
    displayPrice: 'ab 99€',
    description: 'Produktbeschreibung',
    rating: 4.8,
    reviewCount: 500,
    emoji: '💎✨',
    badge: 'Neu',
    tags: ['keyword1', 'keyword2'],
    affiliateLinks: {
        primary: { partner: 'amazon', productId: 'ASIN-CODE' },
        alternatives: [
            { partner: 'awin', merchantId: '12345', deeplink: 'https://shop.de/produkt' }
        ]
    }
});
```

### Tracking-Features

- **Klick-Tracking** – Jeder Affiliate-Klick wird lokal gespeichert
- **Impression-Tracking** – Produktansichten via IntersectionObserver
- **UTM-Parameter** – Automatische Erfassung von Campaign-Daten
- **Google Analytics** – Events werden gesendet (wenn gtag vorhanden)
- **Meta Pixel** – Facebook/Instagram Tracking (wenn fbq vorhanden)

---

## 👩 Avatar-Präsentationssystem

### Die 4 Expertinnen

| Avatar     | Rolle            | Expertise                    | Persönlichkeit |
|-----------|------------------|------------------------------|----------------|
| **Sophia**    | Luxury-Expertin  | Schmuck, Mode, Luxus         | Elegant        |
| **Elena**     | Wellness-Guru    | Beauty, Wellness, Home       | Warmherzig     |
| **Mia**       | Trend-Scouting   | Tech, Erlebnisse, Personalisiert | Energetisch |
| **Charlotte** | Erlebnis-Kuratorin| Erlebnisse, Gourmet, Reisen | Romantisch     |

### Avatar-Features

- **SVG-Avatare** – Vollständig in SVG generiert, keine externen Bilder nötig
- **Automatisches Matching** – Jedes Produkt bekommt den passendsten Avatar
- **Empfehlungstexte** – Jeder Avatar hat eigene Phrasen und Persönlichkeit
- **Social-Media-Templates** – Vorlagen für Instagram Reels/Stories und TikTok

### API-Nutzung

```javascript
// Avatar-Empfehlung für ein Produkt
const avatar = AvatarSystem.matchAvatarToProduct(product);
const recommendation = AvatarSystem.getRecommendation(avatar.id, product);

// Avatar-Karussell rendern
document.getElementById('container').innerHTML = AvatarSystem.renderAvatarCarousel();

// Produktkarte mit Avatar
const html = AvatarSystem.renderProductWithAvatar(product);

// Social-Media Template generieren
const reel = AvatarSystem.renderSocialTemplate('sophia', product, 'instagram');
const tiktok = AvatarSystem.renderSocialTemplate('mia', product, 'tiktok');
```

---

## 📱 Social Media Strategie

### Instagram (@luxuryforher_de)

| Content-Typ   | Frequenz       | Thema                        |
|--------------|----------------|------------------------------|
| Reels         | 3-4x/Woche    | Geschenkideen-Unboxings      |
| Carousels     | 2x/Woche      | Geschenk-Guides              |
| Stories       | Täglich        | "Schenk-Tipp der Woche"      |
| Posts         | 1x/Woche       | Community-Empfehlungen       |

### TikTok (@luxuryforher)

| Content-Typ   | Frequenz       | Thema                        |
|--------------|----------------|------------------------------|
| POV-Videos    | 3-4x/Woche    | "Geschenk-Reaktion" Videos   |
| Budget-Guides | 2x/Woche      | "Geschenke unter X€"         |
| Trends        | 1-2x/Woche    | Trending Geschenkideen       |
| Storytime     | 1x/Woche       | "Er hat DAS geschenkt?!"     |

---

## 🎨 Design-System

### Farbschema (Quiet Luxury)

| Farbe              | Hex       | Verwendung           |
|-------------------|-----------|----------------------|
| Rose Gold (Primary)| `#c8917c` | Buttons, Akzente     |
| Cream (BG)         | `#faf8f6` | Hintergrund          |
| Sage               | `#8ba88f` | Wellness-Themen      |
| Soft Plum          | `#b088b4` | Trend/Tech-Themen    |
| Dark (Text)        | `#2d2926` | Texte, Footer        |

### Typografie

- **Überschriften:** Cormorant Garamond (Serif, elegant)
- **Fließtext:** Inter (Sans-serif, modern)

---

## 🚀 Lokale Entwicklung

Die Seite ist rein statisch (HTML/CSS/JS) und benötigt keinen Build-Prozess:

```bash
# Mit einem beliebigen lokalen Server starten, z.B.:
npx serve .
# oder
python3 -m http.server 8000
```

---

## 📋 Nächste Schritte

1. **Partner-IDs eintragen** – Amazon PartnerNet, AWIN, Tradedoubler registrieren
2. **Produkte erweitern** – Echte Produkte mit ASIN/Deeplinks hinzufügen
3. **Analytics einrichten** – Google Analytics & Meta Pixel einbinden
4. **Domain & Hosting** – z.B. Netlify, Vercel oder eigener Server
5. **Social Media Accounts** – Instagram & TikTok Accounts erstellen
6. **Content produzieren** – Avatar-basierte Reels und TikToks erstellen
7. **SEO optimieren** – Blog-Artikel und Backlinks aufbauen

---

## 📄 Rechtliches

- **Affiliate-Disclosure** – Ist automatisch integriert (Pflicht gemäß TMG/UWG)
- **Impressum & Datenschutz** – Muss vor Livegang erstellt werden
- **Cookie-Banner** – Muss bei Analytics-Einsatz ergänzt werden

---

*Erstellt mit ❤️ für die perfekten Geschenkideen.*
