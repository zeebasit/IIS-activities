# IIS Interactive Activities

Interactive browser-based simulations for the **Information Security (IIS)** course.

## Activities

| Section | Activity | Link |
| --- | --- | --- |
| Case study, Weeks 1–2 | Nordic Retail Security Investigation | [Open investigation](./investigations/nordic-retail/) |
| Module 2 | How a Secure Website Works — HTTPS & TLS 1.3 | [Launch TLS simulation](./module2/tls-secure-website/) |
| Module 2 | Security Evidence Quiz — 48-question bank, 16 per attempt | [Launch evidence quiz](./module2/security-evidence-quiz/) |
| Concept demonstrations | Asymmetric Encryption — Secure Message Mission | [Launch encryption simulation](./concept-demos/asymmetric-encryption-process/) |

Open **[the activity homepage](./index.html)** to browse the available simulations.

## Structure

```text
IIS-activities/
├── index.html
├── investigations/
│   └── nordic-retail/
│       └── index.html
├── module2/
│   └── tls-secure-website/
│       └── index.html
│   └── security-evidence-quiz/
│       └── index.html
└── concept-demos/
    └── asymmetric-encryption-process/
        └── index.html
```

Each simulation is a browser-accessible HTML activity designed for teacher-led demonstrations or self-paced student practice.

The Module 2 Security Evidence Quiz has a **48-question bank** (12 per lesson for Lessons 2.1–2.4). Each attempt presents **16 questions** (four per lesson). Clicking **New shuffled attempt** draws the next unused questions within each lesson and also shuffles the answer choices. The first three attempts use different questions (48 in total) before cycling through the bank again; after that, an immediate next attempt avoids repeating the previous attempt. Student answers, hints, progress, and the unused-question pool are stored locally in the browser. Answers lock on submission, with explanations, a 100-point score (6.25 points per question), and no central result collection. Clearing browser storage or switching devices resets the question rotation.

The Nordic Retail investigation is an independent 60–90 minute student case study with 12 fictional evidence files, five stages and 15 written questions. Responses save locally in the student's browser; students should export the report (.txt) before changing computers or clearing browser data. This public repository does **not** contain the instructor answer key. The TLS activity is an explanatory model, **not** a real TLS implementation.

## Publish as a website (GitHub Pages)

In the repository, open **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, choose **main** and **/(root)**, then **Save**. Once Pages finishes publishing, the activity index should be available at:

https://zeebasit.github.io/IIS-activities/

(If Pages is not yet enabled, GitHub source-code links work but the public website will not load.)
