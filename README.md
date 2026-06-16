# BrandKit Blocks

A WordPress plugin containing a collection of 6 highly interactive, customizable, and premium Gutenberg blocks.

## Blocks Included

| Block | Description | Namespace |
|---|---|---|
| **Tabs Block** | Switchable tab panels with ARIA keyboard navigation. | `brandkit-blocks/tabs-block` |
| **Popup Block** | Modal dialog with focus trap, ESC key close, and overlay click close. | `brandkit-blocks/popup-block` |
| **Animated Counter** | Count-up animation on scroll into view using Intersection Observer. | `brandkit-blocks/animated-counter` |
| **CTA Banner** | Call-to-action banner supporting stacked or inline layouts. | `brandkit-blocks/cta-banner-block` |
| **Accordion Block** | Collapsible detail panels with smooth CSS height transitions and ARIA accessibility. | `brandkit-blocks/accordion-block` |
| **Pricing Card** | Clean, high-converting product/service pricing tables with badge highlighting. | `brandkit-blocks/pricing-card-block` |

## Requirements

- WordPress 6.5+
- PHP 7.4+
- Node.js 18+ (for development)

## Development Setup

To modify blocks and rebuild assets:

```bash
npm install
npm run build      # production build
npm run start      # watch mode
```

Note: If running on Windows and PowerShell script execution is restricted, run scripts via cmd (e.g. `npm.cmd run build`).

## Installation

1. Run `npm run build` to compile assets into `build/`
2. Zip the entire plugin folder (excluding `node_modules` and source files if desired)
3. Upload via **Plugins → Add New → Upload Plugin**
4. Activate **BrandKit Blocks**

## Plugin Structure

```
brandkit-blocks/
├── brandkit-blocks.php        # Main plugin file
├── package.json
├── webpack.config.js          # Multi-block entry points
├── readme.txt                 # WordPress.org metadata
├── README.md                  # Developer instructions
├── src/
│   ├── tabs-block/
│   │   ├── block.json
│   │   ├── index.js           # Editor JS
│   │   ├── view.js            # Frontend JS
│   │   ├── render.php         # Server-side render template
│   │   ├── editor.scss        # Editor styles
│   │   └── style.scss         # Frontend styles
│   ├── accordion-block/
│   │   └── ... (same structure)
│   └── ... (other blocks)
└── build/                     # Compiled outputs
```

## Technical Notes

- `apiVersion: 3` on all blocks.
- `save: () => null` — all blocks use server-side rendering via `render.php`.
- Frontend JS uses clean, vanilla JS (no jQuery or heavy library dependencies).
- Textdomain `'brandkit-blocks'` standardized across all blocks, code blocks, and block.json files.
- Focus trap listener leaks resolved on popups.
- Accordion height transitions achieved using modern CSS Grid auto-sizing.
- GPL-2.0-or-later licensed.
