# Wedding Invitation & RSVP Website (Next.js)

A single-page wedding invitation built with **Next.js (App Router) + TypeScript**: elegant floral
styling, live countdown, couple intro, love-story timeline, event cards, gallery with lightbox,
RSVP form backed by an API route, guest wishes and an "Add to Calendar" download.

## Getting started
```bash
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Customize
| What | Where |
|---|---|
| Names, dates, venues, story, events, meals, gallery list | `lib/wedding.ts` |
| Photos | `public/images/` (see `public/images/README.md` for file names) |
| Colours & fonts | CSS variables at the top of `app/globals.css`; fonts in `app/layout.tsx` |
| Sections / layout | `components/*` and `app/page.tsx` |

Any missing photo shows a soft placeholder, so the site looks finished before photos arrive.

## Collecting RSVPs
The form posts to `/api/rsvp` (`app/api/rsvp/route.ts`), which validates every response on the
server and then stores it:

- **`RSVP_WEBHOOK_URL` set**: the RSVP is forwarded there as JSON. Use this in production, e.g. a
  [Formspree](https://formspree.io) endpoint, a Google Apps Script web app that appends rows to a
  Google Sheet, or a Zapier/Make webhook. Put it in `.env.local` locally or in your host's settings.
- **Not set**: appended to `data/rsvps.jsonl`. Good for local development or a regular server.
  Serverless hosts (e.g. Vercel) have a read-only filesystem, so **set the webhook there**.
  `data/` is git-ignored because it contains guest emails.

A hidden honeypot field quietly drops simple spam bots.

## Deploy
Import the repo in [Vercel](https://vercel.com) (zero config), then add `RSVP_WEBHOOK_URL`
under Project → Settings → Environment Variables.
