# Wedding Invitation & RSVP Website

A single-page wedding invitation site: elegant floral styling, live countdown, couple intro,
love-story timeline, event cards, gallery with lightbox, RSVP form, guest wishes and an
"Add to Calendar" download. Plain HTML/CSS/JS, so there's no build step.

## Run locally
Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Customize
- **Names, dates, venues, story text**: edit `index.html`.
- **Countdown / calendar date & RSVP endpoint**: edit `CONFIG` at the top of `js/main.js`.
- **Photos**: add them to `images/` (see `images/README.md` for file names).
- **Colours & fonts**: CSS variables at the top of `css/style.css`.

## Collecting RSVPs
Set `CONFIG.rsvpEndpoint` to a URL that accepts a JSON `POST`, for example:
- [Formspree](https://formspree.io): create a form and paste its endpoint (`https://formspree.io/f/xxxx`).
- A Google Apps Script web app that appends rows to a Google Sheet.

While the endpoint is empty, responses are only saved in the visitor's own browser
(`localStorage`), which is useful for testing but **not** for real guests.

## Deploy
Any static host works: GitHub Pages (Settings → Pages → deploy from this branch), Netlify or Vercel.
