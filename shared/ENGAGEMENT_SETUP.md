# Engagement tracking for IIS and NET activities

## Current status

The shared tracker sends new activity counts from `zeebasit.github.io` to Cloudflare. Sign in to the [private Activity Library](https://activity-engagement.basitzeeshan.workers.dev/lecturer/) to see counters and reports. Earlier figures remain in the signed-in Umami dashboard.

Both repositories are deployed under `zeebasit.github.io`, so one Umami website can track the NET and IIS paths.

## What gets measured

- **Opened:** anonymous pageview, counted when an activity page loads.
- **Started:** the first meaningful click, change or keyboard activation of an interactive control on an activity page.
- **Completed:** an explicit `window.ActivityEngagement.complete()` call made when a verifiable finishing condition is reached. Only implemented in activities with a confirmed finish state.
- **Nordic Retail completion:** an export counts as a completion when all 15 responses contain at least 20 characters.

Examples of explicit completions:
- Module 2 Security Evidence Quiz: all 16 questions submitted.
- Nordic Retail investigation: all 15 long-form responses entered and a report exported.

Other activities currently support pageviews and starts; do **not** interpret an absent completion event as abandonment or failure. The completion definition is not yet available for open-ended activities.

The collector receives the course, activity path, and event name. The database stores daily aggregate counts. The system does not attempt to identify individual students. Counts may include lecturers, repeat visits, blocked analytics scripts and other non-student visitors.

## Institutional privacy requirements

The site operator is responsible for applicable institutional policies and privacy requirements, including the provider’s data processing terms, retention, regional processing, student notices, and any required consent controls.

## Verify collection

1. Open an activity and interact with it. Check the activity card for a page view and start after the next refresh.
2. Complete an activity with a defined finish condition to verify the completion counter.
3. To pause collection, clear `COLLECT_URL` in `shared/engagement.js` and let GitHub Pages redeploy.

## Existing 33 pages

- NET activities: **28**.
- IIS student activities: **4**.
- Lecturer activity hub: **1**.

The same script tag has been included in these 33 pages. The lecturer hub is a dashboard rather than an activity: its pageview may be useful, but should be excluded from student activity comparisons.

## Add to new activities

Include this exact line just before the real, final `</body>` element (not a `</body>` string embedded in JavaScript):

```html
<script defer src="https://zeebasit.github.io/IIS-activities/shared/engagement.js" data-engagement-version="1"></script>
```

If an activity has a verified completion milestone, call:

```js
window.ActivityEngagement?.complete();
```

The main lecturer hub auto-discovers newly created `index.html` activity pages, but **the tracker is not automatically injected into future new pages**. The script tag should be included whenever a new activity is created.

## Limitations

- Data collection only starts after activation; historical usage cannot be reconstructed.
- Pageviews ≠ unique students.
- Click-based starts ≠ meaningful completion.
- A report of complete interaction rates requires an explicit finish condition for each activity.
- Browser content blockers and failed network requests can cause undercounting.
- The private Activity Library refreshes once a minute while open. Its reports include date and course filters and a CSV download.
