# IIS Interactive Activities

Interactive browser-based simulations for the **Information Security (IIS)** course.

## Activities

| Section | Activity | Link |
| --- | --- | --- |
| Case study, Weeks 1–2 | Nordic Retail Security Investigation | [Open investigation](./investigations/nordic-retail/) |
| Module 2 | How a Secure Website Works — HTTPS & TLS 1.3 | [Launch TLS simulation](./module2/tls-secure-website/) |
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
└── concept-demos/
    └── asymmetric-encryption-process/
        └── index.html
```

Each simulation is a browser-accessible HTML activity designed for teacher-led demonstrations or self-paced student practice.

The Nordic Retail investigation is an independent 60–90 minute student case study with 12 fictional evidence files, five stages and 15 written questions. Responses save locally in the student's browser; students should export the report (.txt) before changing computers or clearing browser data. This public repository does **not** contain the instructor answer key. The TLS activity is an explanatory model, **not** a real TLS implementation.

## Publish as a website (GitHub Pages)

In the repository, open **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, choose **main** and **/(root)**, then **Save**. Once Pages finishes publishing, the activity index should be available at:

https://zeebasit.github.io/IIS-activities/

(If Pages is not yet enabled, GitHub source-code links work but the public website will not load.)
