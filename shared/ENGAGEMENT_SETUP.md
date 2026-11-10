# Engagement tracking for IIS and NET activities

## Current status

The activity engagement integration has been **installed but is intentionally disabled**. No third-party analytics requests or student engagement events are transmitted until an approved Umami website ID is inserted into `shared/engagement.js`.

Both repositories are deployed under `zeebasit.github.io`, so one Umami website can track the NET and IIS paths.

## What gets measured

- **Opened:** anonymous pageview, collected by the hosted Umami script after activation.
- **Started:** the first meaningful click, change or keyboard activation of an interactive control on an activity page.
- **Completed:** an explicit `window.ActivityEngagement.complete()` call made when a verifiable finishing condition is reached. Only implemented in activities with a confirmed finish state.
- **Report export:** in the Nordic Retail case study, exports with missing responses are recorded separately as `activity-report-export`; an export with all 15 responses of at least 20 characters counts as completed.

Examples of explicit completions:
- Module 2 Security Evidence Quiz: all 16 questions submitted.
- Nordic Retail investigation: all 15 long-form responses entered and a report exported.

Other activities currently support pageviews and starts; do **not** interpret an absent completion event as abandonment or failure. The completion definition is not yet available for open-ended activities.

No learner names, answers, quiz scores, student IDs or custom unique identifiers are sent. The system does not attempt to identify individual students. Counts may include lecturers, repeat visits, blocked analytics scripts and other non-student visitors.

## Institutional privacy requirements

Before activation, confirm the analytics provider and proposed usage with Noroff's privacy/security contact. Review the provider's data-processing agreement, retention, regional processing, student notices and whether consent or another lawful basis is required under Norwegian privacy rules. **Do not activate tracking before this review.** A cookie-free tracker is not automatically exempt from every privacy requirement.

## Activate after approval

1. Create an Umami Cloud account (an EU data region may be appropriate if approved).
2. Add a website for `zeebasit.github.io`. Obtain its public *Website ID* from the tracker snippet. Do not commit an API token or password to GitHub.
3. Update only `shared/engagement.js` and set `WEBSITE_ID` to the approved public Website ID. The script URL is already set to `https://cloud.umami.is/script.js`.
4. Once GitHub Pages has deployed, open the Nordic Retail investigation and Module 2 quiz in a browser, interact and complete them, then check pageviews and the `activity-start`/`activity-complete` events in Umami.
5. Filter by URL path for per-activity statistics: `/IIS-activities/...` or `/net-interactive-activities/...`. Use the `course` and `activity` event properties for grouping.

Hosted Umami's free Hobby plan currently offers one website, so both repositories are deliberately covered under one hostname. This plan's features and limits can change.

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
- The free hosted Umami plan provides its own analytics dashboard. The lecturer hub does not yet display live totals because embedded private reporting requires an authenticated API or an explicitly shared report.
