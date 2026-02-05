# Date Planner

A fun, interactive date planning app for couples in the San Francisco Peninsula area. Browse curated date ideas, track completed dates with ratings, and schedule upcoming dates with calendar export.

## Live Site

[https://rasgrujep.github.io/dateplans/](https://rasgrujep.github.io/dateplans/)

## Features

- **Curated Date Ideas** - Paint & Sip, Pottery, Cooking, Music, and Unique experiences
- **Track Completed Dates** - Mark dates as done with star ratings
- **Add Your Own Ideas** - Create custom date ideas and categories
- **Calendar Scheduling** - Schedule dates on a visual calendar
- **Export to Calendar Apps** - Download .ics files or add directly to Google Calendar
- **Mobile Friendly** - Works great on phones and tablets

## Pages

- **[Ideas](index.html)** - Browse and manage date ideas
- **[Calendar](calendar.html)** - Schedule and export dates

## Tech Stack

- Pure HTML, CSS, JavaScript (no build step needed)
- Tailwind CSS (via CDN)
- Google Sheets as backend (free!)
- Google Apps Script for write operations
- GitHub Pages for hosting

---

## Security Review

This repo is **public**. Here is an assessment of what is exposed and whether it is safe:

### What's in `config.js`

| Item | Exposed? | Risk Level | Notes |
|------|----------|------------|-------|
| **Google API Key** | Yes | **Low** | Restricted by HTTP referrer to the GitHub Pages URL. Can only be used for Sheets API reads from that domain. Spoofing the referrer header is possible but would only grant read access to date ideas — no sensitive data. |
| **Google Sheet ID** | Yes | **Low** | The sheet must be readable for the API key to work. It only contains date ideas, ratings, and calendar events. No sensitive personal data. |
| **Apps Script URL** | Yes | **Medium** | This is the write endpoint. Anyone who discovers it could POST data to append rows to your sheet (spam). It only appends — it cannot delete or overwrite existing data. The risk is nuisance spam, not data loss. |

### Recommendations

- [ ] **Add origin validation in Apps Script** — Check the request origin/referrer in your Apps Script `doPost()` function and reject requests not from your GitHub Pages domain. This won't stop a determined attacker but stops casual abuse.
- [ ] **Consider making the Google Sheet "unlisted"** — It's fine to keep readable via API, but avoid sharing the direct Sheet URL publicly.
- [ ] **Don't store personal info in the sheet** — Keep it to date ideas, ratings, and events. No addresses, phone numbers, etc.
- [ ] **Monitor the sheet occasionally** — Glance at it periodically for spam rows that weren't added by you.

### Verdict

**Safe for a personal project.** The API key is read-only and domain-restricted. The Apps Script URL is the only real attack surface, and the worst case is someone appending junk rows. No secrets, passwords, or sensitive data are exposed.

---

## Proposed Changelog / Roadmap

Fun ideas and improvements to make Date Planner even better.

### UX & Aesthetic Improvements

- [ ] **Dark Mode / Theme Toggle** — A cozy "date night" dark theme with warm tones. Toggle between light and dark.
- [ ] **Date Night Countdown** — A homepage banner showing "Your next date is in 3 days!" with a countdown timer to the next scheduled event.
- [ ] **Progress Bar / Stats Dashboard** — "You've done 7 of 20 dates!" with a visual progress ring and stats like total money spent, average rating, favorite category.
- [ ] **Confetti Animation on Completion** — When you mark a date as done, trigger a confetti burst celebration.
- [ ] **Smoother Page Transitions** — Animate between category views instead of hard-swapping content.
- [ ] **Photo Memories** — Attach a photo or note to a completed date. Show a "Memory Wall" gallery of past dates.
- [ ] **Card Flip Animation** — Cards flip over to reveal details on click/tap instead of showing everything at once.

### Fun New Features

- [ ] **Spin the Wheel** — Replace the "Surprise Us!" random pick with an animated spinning wheel. More dramatic, more fun.
- [ ] **Date Night Streak Tracker** — Gamify it: "You've gone on dates 4 weeks in a row!" Lose the streak if you skip a week.
- [ ] **Couple's Dual Rating** — Both partners rate independently, then see each other's ratings side-by-side. "You said 5 stars, they said 3... time to talk."
- [ ] **Mood / Vibe Filter** — Filter ideas by mood: Romantic, Adventurous, Chill, Budget-Friendly, Fancy Night Out.
- [ ] **Seasonal Suggestions** — Auto-highlight ideas based on the season (e.g., outdoor activities in summer, cozy indoor stuff in winter).
- [ ] **Budget Tracker** — Running total of how much you've spent on dates this month/year. Set a monthly date budget and see remaining.
- [ ] **Map View** — Show all date locations on an interactive map. Tap a pin to see the idea. Great for "what's near us right now?"
- [ ] **Date Jar / Bucket List** — A special "Someday" list for aspirational dates. Promote them to the main list when ready.
- [ ] **Anniversary & Special Date Reminders** — Track relationship milestones and suggest "anniversary-worthy" dates when they're coming up.
- [ ] **Shareable Date Cards** — Generate a pretty card image of a date idea you can text to your partner: "What about this Saturday?"
- [ ] **"We Need a Date" Nudge** — If no date has been scheduled in X days, show a gentle nudge: "It's been 12 days... time for a date night?"
- [ ] **Random Category Challenge** — "This month's challenge: try something from Music!" Rotate categories monthly.

### Technical Improvements

- [ ] **Google Sheets as Single Source of Truth** — Move ALL data to Sheets (see architecture section below). The webpage becomes a pure read/display layer with the sheet acting as the database and admin panel.
- [ ] **Load Ideas from Sheet** — Migrate hardcoded `data.js` ideas into a "DateIdeas" sheet. The app reads everything on page load. Add/edit/delete ideas directly in the spreadsheet.
- [ ] **Load Categories from Sheet** — Store category definitions (name, icon, color, description) in a "Categories" sheet tab.
- [ ] **Offline Fallback** — Cache the last-loaded data in localStorage so the app works (read-only) without internet.
- [ ] **Service Worker / PWA** — Make it installable as a phone app with an icon on the home screen.
- [ ] **Better Error Handling** — Show user-friendly messages when the Sheet API is unreachable instead of silent console errors.
- [ ] **Loading States** — Show skeleton loaders while data is being fetched from the sheet.

---

## Google Sheets as Full Backend — Architecture & Limitations

### Goal

Make Google Sheets the **single source of truth**. All activities, categories, completion status, and calendar events live in the sheet. The webpage is a display and interaction layer that reads from and writes to the sheet.

### Proposed Sheet Structure

| Tab Name | Columns | Purpose |
|----------|---------|---------|
| **Categories** | `id`, `label`, `icon`, `color`, `description` | Define all categories. Add a new row = new category appears on the site. |
| **DateIdeas** | `id`, `categoryId`, `title`, `location`, `price`, `why`, `link`, `tags`, `status` | Master list of all date ideas. `status` can be `active`, `done`, `archived`. |
| **CompletedDates** | `ideaId`, `rating`, `completedDate`, `notes` | Tracks which dates have been done and how they were rated. |
| **CalendarEvents** | `id`, `ideaId`, `ideaTitle`, `date`, `time`, `duration`, `location` | Scheduled future events. |
| **Settings** | `key`, `value` | App-level settings (e.g., couple's names, theme preference, budget limit). |

### How It Works

1. **On page load**, the app makes `SheetsAPI.read()` calls to fetch Categories, DateIdeas, CompletedDates, and CalendarEvents.
2. **The sheet is the admin panel.** To add a new date idea, you can either use the web app's "Add Idea" form OR just type a new row directly into the Google Sheet. Both work.
3. **Status management in the sheet.** Mark ideas as "done" from the web app, which writes to CompletedDates. The sheet can use formulas (e.g., `=VLOOKUP` or `=FILTER`) to cross-reference and show a "done" column in the DateIdeas tab.
4. **Calendar events** are read from and written to the CalendarEvents tab. The webpage displays them; the sheet stores them.

### What Works Well

- **Zero hosting cost** — GitHub Pages (free) + Google Sheets API (free tier).
- **Sheets as admin panel** — Edit data from any device with Google Sheets access. No admin UI needed.
- **Formulas for computed data** — Use Sheets formulas for stats: average rating, count of completed dates per category, total spent, etc.
- **Shareable** — Give your partner editor access to the sheet to add ideas collaboratively.
- **Version history** — Google Sheets has built-in revision history so you can see every change.

### Limitations to Be Aware Of

| Limitation | Impact | Workaround |
|-----------|--------|------------|
| **No real-time sync** | If someone edits the sheet, the webpage won't update until refreshed. | Add a "Refresh" button or auto-poll every N minutes. |
| **API rate limits** | Google Sheets API allows ~300 read requests/min per project (free tier). | For a 2-person app this is a non-issue. If you add auto-polling, keep intervals at 60s+. |
| **Write latency** | Apps Script writes can take 1-3 seconds. Reads via API are 200-500ms. | Show optimistic UI updates (update locally first, then sync). |
| **No authentication** | The API key is read-only and referrer-restricted, but the Apps Script URL is open for writes. | Add origin checking in Apps Script. For a personal app, this is acceptable. |
| **No delete/update via API key** | The API key only reads. All mutations must go through Apps Script. | Expand your Apps Script `doPost()` to handle `delete` and `update` actions, not just `append`. |
| **No relational queries** | Sheets isn't a database — no JOINs, no indexes, no complex queries. | Keep data flat. Use multiple read calls and join client-side in JavaScript. |
| **No offline writes** | Writes require internet. If offline, the action is lost. | Queue writes in localStorage and sync when back online. |
| **Sheet size limit** | Max 10 million cells per spreadsheet. | Will never be a problem for a date planning app. |
| **Apps Script execution limits** | Free accounts: 6 min per execution, 90 min total per day. | Each write takes <1 second. You'd need 5,400+ writes/day to hit this. Not a concern. |

### Verdict

Google Sheets is a **great fit** for this use case. It's a low-traffic, 2-user personal app where the data is simple and flat. The main thing to build out is:

1. Migrate `data.js` hardcoded ideas into the "DateIdeas" sheet tab.
2. Add a "Categories" sheet tab and load from it on page init.
3. Expand the Apps Script to support `update` and `delete` actions (not just `append`).
4. Add client-side caching (localStorage) for faster loads and offline reads.

The sheet becomes your database, your admin panel, and your backup — all in one.

---

## Setup

This app uses Google Sheets for data persistence:

1. Create a Google Sheet with tabs: `Categories`, `DateIdeas`, `CompletedDates`, `CalendarEvents`
2. Set up a Google Cloud project with the Sheets API enabled
3. Create an API key restricted to your GitHub Pages domain
4. Deploy a Google Apps Script web app for write operations
5. Update `config.js` with your Sheet ID, API key, and Apps Script URL
