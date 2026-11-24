# Elsadany Website | Elsadany

A static personal portfolio website (HTML, CSS, and JavaScript) with zero build steps, ready to deploy on GitHub Pages or your own custom domain.

## Files

* `index.html` Content (Egyptian Arabic by default, with a toggle button to switch to English).
* `assets/style.css` Styles, plus light and dark modes. Primary color `#2384AF` (rgb 35, 132, 175).
* `assets/app.js` Animations, charts, and live GitHub stats. **Configuration settings are at the top of the file.**
* `assets/photo.jpg` Your profile photo. `assets/img/` Dashboard and project screenshots (WebP).

## What's New in Version 2

* Colors pulled from your palette (blue, amber, purple, pink) + teal green, giving each section and card its own distinct accent.
* Animations: animated backgrounds, a gradient title, a marquee ticker, card tilt and hover lighting effects, an interactive colorful node network that reacts to the mouse, and a back-to-top button. All animations automatically pause for users with "Reduce Motion" enabled.
* Email button: opens a Gmail compose window directly on desktop and the default mail app on mobile, paired with quick buttons to copy the email address or open the mail app.

## Configuration (Top of `assets/app.js`)

* `CONFIG`: Links for LinkedIn, Instagram, GitHub, email, and your CV. **`facebook`** is currently empty: just paste the link there and the button will appear automatically.
* `SKILLS`: Radar chart levels are placeholders/estimates. Adjust them to reflect your actual skill levels.

## Adding a New Project

Copy any `<article class="card">` block in `index.html`, update the text and link, and drop the screenshot into `assets/img/`. The `data-cat` attribute sets the filter category: `dash`, `ml`, or `app`.
