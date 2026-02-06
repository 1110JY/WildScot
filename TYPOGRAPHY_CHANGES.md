# Typography System Updates

## Overview
The website typography has been transformed to feel more **bold, confident, and energetic** — suitable for an outdoor adventure sports platform. The new system prioritizes readability, accessibility, and visual hierarchy through scale and spacing rather than thin weights.

---

## Font Changes

### Previous Setup
- **Body Text**: DM Sans
- **Display/Headlines**: Space Grotesk
- **Action/Labels**: Barlow Condensed

### New Setup
- **Body Text & UI**: **Inter** (weights: 400, 500, 600, 700)
  - Clean, modern, highly readable
  - Used for all body copy, navigation, filters, and UI elements
  
- **Headlines & Display**: **Poppins** (weights: 600, 700, 800)
  - Bold, confident, modern display font
  - Replaces the previous headline font family
  - Used for all hero headings, section titles, and key statements

---

## Typography Scale & Classes

### New Semantic Classes (in `globals.css`)

| Class | Purpose | Size Range | Font Weight | Use Case |
|-------|---------|-----------|------------|----------|
| `.text-hero` | Maximum impact | 1rem–1.75rem (16px–112px) | Bold | Hero section headings |
| `.text-section-lg` | Major sections | 1.5rem–3rem (24px–48px) | Bold | Main section titles |
| `.text-section` | Standard sections | 1.5rem–2.5rem (24px–40px) | Bold | Section headings |
| `.text-subsection` | Subsections | 1.25rem–1.875rem (20px–30px) | Semibold | Subsection headings |
| `.text-card-heading` | Cards/components | 1.125rem–1.5rem (18px–24px) | Semibold | Card titles |
| `.text-label` | Tags/labels | 0.75rem–0.875rem (12px–14px) | Semibold | Taglines, labels, badges |
| `.text-body-lg` | Large body text | 1.125rem | Normal | Enhanced readability |
| `.text-body` | Standard body | 1rem | Normal | Default reading text |
| `.text-body-sm` | Small body | 0.875rem | Normal | Secondary text, descriptions |

### Base HTML Improvements
- `h1, h2, h3`: Set to use `font-display` (Poppins) with bold/semibold weights
- `body, p`: Set to `font-sans` (Inter) with normal weight and proper line height
- `label, button`: Set to `font-medium` for UI prominence

---

## Component Updates

### Home Page Components
✅ **Hero Section**
- Uses `.text-hero` for main headline
- Uses `.text-label` for tagline
- Uses `.text-body-lg` for descriptive copy
- Button text uses `font-semibold` (removed condensed font)

✅ **How It Works Section**
- Section title uses `.text-section-lg`
- Step titles use `.text-card-heading`
- Descriptions use `.text-body-sm`
- Step numbers use `font-semibold`

✅ **Sport Grid**
- Section title uses `.text-section-lg`
- Tagline uses `.text-label`
- Sport names use `.text-card-heading`
- Taglines use improved contrast with `.text-body-sm`

✅ **Upcoming Events**
- Section title uses `.text-section`
- Event titles use `font-semibold`
- Meta information uses `.text-body-sm`

✅ **Trust Banner**
- Point titles use `font-semibold`
- Descriptions use `.text-body-sm` with improved contrast

### Site Navigation
✅ **Site Header**
- Logo uses `font-display` with bold weight
- Navigation remains clean and readable

✅ **Site Footer**
- Logo uses `font-display` with bold weight
- Section headings use `font-semibold`
- Body text uses `.text-body-sm`

### Page Headers
✅ **Sports Page**: Uses `.text-section` for main heading
✅ **Clubs Page**: Uses `.text-section` for main heading
✅ **Events Page**: Uses `.text-section` for main heading

---

## Design Principles Applied

### 1. **Bold & Confident**
- Eliminated thin font weights entirely
- Headlines use weight 600, 700, or 800
- Emphasis achieved through **scale and spacing**, not thin weights

### 2. **Modern & Physical**
- Poppins conveys a modern, energetic feel
- Inter provides clean, trustworthy body copy
- Strong visual hierarchy guides users through content

### 3. **Accessible & Readable**
- Increased headline sizes create visual impact
- Inter's excellent readability supports accessibility
- Proper contrast ratios and spacing maintained
- No text rendered in weights below 400

### 4. **Responsive Scaling**
- All headline classes scale gracefully across devices
- Mobile: Smaller sizes (1rem–2.5rem)
- Desktop: Larger sizes (1.75rem–7rem)

### 5. **Assertive yet Trustworthy**
- Bold Poppins headlines show confidence
- Clean Inter body text maintains trust
- Consistent spacing and hierarchy build reliability

---

## Implementation Details

### Font Variables
- `--font-inter`: Inter font family variable
- `--font-poppins`: Poppins font family variable

### Updated Files
1. `app/layout.tsx` — Font imports and HTML class binding
2. `tailwind.config.ts` — Updated font family configuration
3. `app/globals.css` — Complete typography system definition
4. `components/home/*.tsx` — Updated all home components
5. `components/site-header.tsx` & `components/site-footer.tsx` — Navigation typography
6. `app/sports/page.tsx`, `app/clubs/page.tsx`, `app/events/page.tsx` — Page headers

---

## Visual Impact

The new typography system creates:
- **Stronger visual hierarchy** through increased headline sizes
- **Modern, energetic brand feel** suitable for adventure sports
- **Improved readability** through consistent use of Inter for body text
- **Assertive confidence** via bold Poppins headlines
- **Better accessibility** with no thin weights and proper contrast

---

## Next Steps (Optional Enhancements)

1. **Consider letter-spacing adjustments** for Poppins headlines for even more boldness
2. **Add custom font weights** for ultra-fine tuning if needed
3. **Update filter and form components** to ensure they use the new typography scale
4. **Review and update** any additional pages (sports detail, club detail) with the new classes
5. **Test typography** across different browsers for consistency
