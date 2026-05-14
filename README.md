# Audiobook Speed Calculator Website

A production-ready React/Vite website for an audiobook speed calculator.

## Includes

- Audiobook playback speed calculator
- Podcast, YouTube, course and lecture calculator tabs
- Time saved calculation
- Finish-time calculator
- Dark/light mode
- SEO title, description, keywords and schema markup
- Favicon and Open Graph image
- Google Analytics placeholder
- Affiliate link placeholders
- AdSense placeholder section
- Vercel deployment config
- Sitemap and robots.txt

## How to deploy on Vercel

1. Create a free Vercel account.
2. Create a free GitHub account if you do not already have one.
3. Upload this folder to a new GitHub repository.
4. In Vercel, click **Add New Project**.
5. Import the GitHub repository.
6. Vercel should auto-detect Vite.
7. Click **Deploy**.

## Replace before publishing

### Domain
In `index.html`, replace:

```html
https://yourdomain.com/
```

With your real domain.

In `public/sitemap.xml`, replace:

```xml
https://yourdomain.com/
```

With your real domain.

In `public/robots.txt`, replace:

```txt
https://yourdomain.com/sitemap.xml
```

With your real domain.

### Google Analytics
In `index.html`, replace both instances of:

```txt
G-XXXXXXXXXX
```

With your Google Analytics Measurement ID.

### Affiliate links
In `src/main.jsx`, replace:

```js
#replace-with-your-audible-affiliate-link
#replace-with-your-ai-voice-tool-affiliate-link
#replace-with-your-summary-app-affiliate-link
```

With your real affiliate URLs.

### AdSense
The page has an ad placeholder section. Once Google AdSense approves your site, replace that placeholder with your AdSense code.

## Local testing

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```
