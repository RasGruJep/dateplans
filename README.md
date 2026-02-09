# Date Planner

A fun, interactive date planning app for couples in the San Francisco Peninsula area. Browse curated date ideas, mark dates as completed by date, and schedule upcoming dates with calendar export.

## Live Site

[https://rasgrujep.github.io/dateplans/](https://rasgrujep.github.io/dateplans/)

## Features

- **Curated Date Ideas** - Paint & Sip, Pottery, Cooking, Music, and Unique experiences
- **Track Completed Dates** - Mark dates as done with completion date
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

- [x] **Dark Mode / Theme Toggle** — A cozy "date night" dark theme with warm tones. Auto-detects system preference with manual override.
- [x] **Date Night Countdown** — A homepage banner showing "Your next date is in 3 days!" with a countdown to the next scheduled event.
- [x] **Progress Bar / Stats Dashboard** — Progress ring, average rating, favorite category, and total spent displayed on the Ideas page.
- [x] **Confetti Animation on Completion** — When you mark a date as done, a confetti burst celebrates it.
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

### Improved "Add Idea" Flow (Next Up)

Adding a new date idea is something that happens often -- you hear about a cool spot, a friend recommends a class, you walk past a new restaurant. The add flow needs to be fast on mobile, forgiving about missing details, and reliably sync to the Google Sheet every time. This is the next focused feature to build.

#### What's wrong with the current flow

The current modal is a standard 6-field form (category, title, location, price, description, link). It works, but:
- All fields are presented at once, which feels heavy for a quick capture.
- Category is a plain dropdown -- easy to miss or default to the wrong one.
- Tags can't be added from the form at all.
- No confirmation of what was saved beyond the modal closing.
- On mobile the modal is cramped and the keyboard covers half the fields.
- If the network write fails silently, you don't know the idea was lost.

#### Redesigned flow

**Only two fields are required: Title and Location.** Everything else is optional and can be added later. This is the core principle -- lower the bar to capture an idea, raise the bar to polish it when you have time.

1. **Tap "Add Idea"** -- Modal opens with focus on the Title field. Keyboard is ready on mobile.
2. **Title** (required) -- Single text input. Placeholder: "e.g., Clayroom Pottery".
3. **Location** (required) -- Single text input. Placeholder: "e.g., San Mateo".
4. **Category picker** -- Not a dropdown. A row of tappable emoji buttons (one per category). Tap to select, tap again to deselect. Defaults to the category you're currently viewing so you often don't need to touch it.
5. **Optional fields (collapsed by default)** -- A "More details" toggle expands: Price, Booking Link, Description, Tags. These fields are nice-to-have but not required to save. The idea saves as a "minimal" card with just title + location + category. If a booking link is provided, the card gets a "Book It" button that opens the link directly -- great for classes, restaurants, or events that need a reservation.
6. **Tags** -- Shown as tappable chips of common tags (#Romantic, #BYOB, #Outdoor, #Chill, #Fancy, #Active). Tap to toggle. Can also type a custom tag.
7. **Save** -- Button says "Add Idea". On tap: optimistic local update (the card appears immediately in the grid), then async write to Google Sheets. If the write succeeds, show a success toast. If it fails, show an error toast and keep the idea in local state with a "not synced" indicator so it can be retried.

#### Key behaviors

- [ ] **Required fields only: Title + Location.** Category defaults to the current view. Price, link, description, and tags are all optional. A card with just "Clayroom / San Mateo" under Pottery is perfectly useful.
- [ ] **Emoji category buttons instead of dropdown.** A horizontal row of the category emojis. Pre-selected to whichever category the user is currently browsing. One tap to change. Visual, fast, obvious.
- [ ] **Collapsed "More details" section.** Price, link, description, and tags hide behind a toggle. Power users expand it; casual adds skip it entirely. Keeps the default view clean and fast.
- [ ] **Tappable tag chips.** Show 6-8 common tags as pill buttons. Tap to toggle on/off. Optionally type a custom tag. No free-form text field for tags -- chips only.
- [ ] **Optimistic save with retry.** The idea appears in the grid instantly. The Sheet write happens in the background. If it fails: error toast + "not synced" badge on the card + automatic retry on next page load.
- [ ] **Edit after adding.** Tap any card to open an edit modal (same layout as the add modal but pre-filled). Update any field and re-save. Currently there's no way to edit an idea after adding it -- this is a gap.
- [ ] **Mobile keyboard handling.** When the modal opens, auto-focus the Title field so the keyboard appears immediately. Ensure the modal scrolls properly so the active field isn't hidden behind the keyboard.
- [ ] **Clear save confirmation.** After saving: a success toast ("Added: Clayroom!"), the modal closes, and the new card appears at the end of the current category with a brief highlight animation so you can see it landed.

#### Sheet sync details

The idea writes to the `DateIdeas` sheet tab as a new row: `[id, categoryId, title, location, price, why, link, tags]`. Empty optional fields are stored as blank cells. This matches the existing sheet schema exactly -- no migration needed. The `id` is generated from the title (slugified). If a write fails, the idea is queued in localStorage under `dp_pending_writes` and retried on the next `loadAllData()` call.

### Multi-Couple Support (Future)

The app currently assumes a single couple. These features would turn it into a shared platform for friend groups.

- [ ] **Couple Profiles / User Groups** — On first visit (or from a menu), pick your couple: "Couple 1", "Couple 2", "Couple 3", etc. Each couple gets their own set of date ideas, completed dates, ratings, and calendar events. The selection is remembered in localStorage so you don't have to pick every time.
- [ ] **Switch Couple / Log Out** — A "Switch Couple" button in the nav lets you change who you're logged in as. No passwords needed (it's a friend group, not a bank), just pick from the list. Could optionally add a simple PIN per couple for light privacy.
- [ ] **Per-Couple Sheet Tabs or Namespacing** — Each couple's data lives in its own set of sheet tabs (e.g., `Couple1_DateIdeas`, `Couple1_CompletedDates`) or in shared tabs with a `coupleId` column to filter by. The sheet remains the single source of truth.
- [ ] **Share an Idea with Another Couple** — A "Share" button on any date idea card lets you send it to another couple. It shows up in their list with a "Recommended by [Couple Name]" badge so they know where the tip came from.
- [ ] **Shared / Community Ideas Pool** — A special "Shared Ideas" tab that all couples can browse. Anyone can contribute to it, and any couple can "adopt" an idea into their own list.
- [ ] **Double Date Mode** — Two couples can co-schedule a date together. Both couples see it on their calendars, and the idea card shows "Double date with [Other Couple]." Great for group outings like Topgolf or Sandbox VR.
- [ ] **Couple Leaderboard (Friendly)** — Optional fun stats across couples: "Most dates this month", "Highest average rating", "Most adventurous (most unique categories tried)." Keep it lighthearted and optional.
- [ ] **Couple Display Names & Avatars** — Each couple picks a fun name ("Team Taco Tuesday") and an emoji avatar that shows on shared ideas and the leaderboard.

### Technical Improvements

- [x] **Google Sheets as Single Source of Truth** — All data loads from Sheets on page init with hardcoded defaults as fallback.
- [x] **Load Ideas from Sheet** — `loadDateIdeas()` reads from the `DateIdeas` sheet tab. Add/edit/delete ideas directly in the spreadsheet.
- [x] **Load Categories from Sheet** — `loadCategories()` reads from the `Categories` sheet tab.
- [x] **Offline Fallback** — localStorage caching with 5-minute TTL. Stale cache served when Sheets is unreachable.
- [x] **Better Error Handling** — Toast notification system replaces silent `console.error` calls with user-visible messages.
- [x] **Loading States** — Skeleton loaders shown while data is being fetched from the sheet.
- [ ] **Service Worker / PWA** — Make it installable as a phone app with an icon on the home screen.

---

## Google Sheets as Full Backend — Architecture & Limitations

### Goal

Make Google Sheets the **single source of truth**. All activities, categories, completion status, and calendar events live in the sheet. The webpage is a display and interaction layer that reads from and writes to the sheet.

### Proposed Sheet Structure

| Tab Name | Columns | Purpose |
|----------|---------|---------|
| **Categories** | `id`, `label`, `icon`, `color`, `description` | Define all categories. Add a new row = new category appears on the site. |
| **DateIdeas** | `id`, `categoryId`, `title`, `location`, `price`, `why`, `link`, `tags`, `status` | Master list of all date ideas. `status` can be `active`, `done`, `archived`. |
| **CompletedDates** | `ideaId`, `completedDate`, `notes` | Tracks which dates have been completed and when. |
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
- **Formulas for computed data** — Use Sheets formulas for stats: completion rate, count of completed dates per category, total spent, etc.
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

## Programmatic Idea Import Pipeline

Use the included script to bulk add date ideas to the `DateIdeas` sheet tab from JSON.

1. Copy `tools/date-ideas.import.example.json` to your own file (for example `tools/date-ideas.import.json`)
2. Edit ideas in that file
3. Preview rows before writing:

```bash
node tools/bulk-add-date-ideas.mjs --file tools/date-ideas.import.json --dry-run
```

4. Write rows to Google Sheets:

```bash
node tools/bulk-add-date-ideas.mjs --file tools/date-ideas.import.json
```

Notes:
- Required fields per idea: `categoryId`, `title`, `location`
- Optional fields: `id`, `price`, `why`, `link`, `tags`
- If `id` is omitted, the script auto-generates a stable slug-based id
