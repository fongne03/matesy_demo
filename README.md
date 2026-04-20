# 🏡 Matesy — UI/UX Web App

## Overview

Matesy is a React single-page application prototype that demonstrates the full user experience of a flatmate-matching and property-search platform. It is built for three primary user personas — young UK renters, international students, and digital nomads — and covers every stage of the renting journey from first discovery through to settled living.

The app is built as a single `.jsx` file with no external dependencies beyond React, Tailwind-compatible inline styles, and Google Fonts.

---

## Screens

| Screen | Route (page state) | Description |
|---|---|---|
| Home | `home` | Landing page with hero, stats, feature highlights, and how-it-works section |
| Onboarding | `onboard` | 3-step sign-up form: basics, renting needs, bio & renter type |
| Personality Quiz | `quiz` | 5-question lifestyle quiz with auto-advance and a renter-type results card |
| Find Places | `search` | Searchable, filterable property grid with city chips, budget slider, and bills-only toggle |
| Flatmate Matching | `match` | Card-stack interface for connecting with compatible flatmates, with a live connections panel |
| Profile | `profile` | Full user profile showing verification status, housing preferences, and personality summary |
| Journey Map | `journey` | Interactive customer journey map for all 3 user personas |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A React environment (Create React App, Vite, or any sandbox that supports `.jsx`)

### Installation

```bash
# Clone or copy matesy-app.jsx into your project
# If using Vite:
npm create vite@latest matesy -- --template react
cd matesy
cp matesy-app.jsx src/App.jsx
npm install
npm run dev
```

### Running in a sandbox

The file works out of the box in any React sandbox that supports JSX and the Fetch API, such as:

- [CodeSandbox](https://codesandbox.io) — paste into `App.jsx`
- [StackBlitz](https://stackblitz.com) — paste into `src/App.jsx`
- Claude Artifacts renderer — paste the full file content directly

---

## Design System

### Fonts

| Role | Font | Source |
|---|---|---|
| Display / headings | Fraunces (serif, italic) | Google Fonts |
| Body / UI | Nunito (rounded sans) | Google Fonts |

### Colour Palette

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#D4694A` | CTAs, active states, highlights |
| `primaryLight` | `#FAEAE4` | Background tints, card fills |
| `secondary` | `#5E9B70` | Bills-included badges, success states |
| `accent` | `#F0AC3C` | Quiz progress, info callouts |
| `bg` | `#FAF5EE` | Page background |
| `text` | `#261510` | Body copy |
| `muted` | `#8C6B5A` | Subtext, labels, placeholders |
| `border` | `#E8D4C0` | Card and input borders |

### Design Principles

- **Warm & friendly** — rounded corners (14–28px), soft shadows, earthy tones
- **Content-first** — match badges and compatibility scores surface immediately
- **Low friction** — quiz auto-advances on selection; onboarding is three short steps
- **Trust-oriented** — verification badges, safety scores, and landlord checks are visible throughout

---

## Architecture

The app is entirely self-contained in one file with the following structure:

```
matesy-app.jsx
│
├── Design tokens (C object)        — all colours in one place
├── Static data                     — PROPERTIES, FLATMATES, QUIZ_Q, PERSONAS
├── Shared components               — Chip, Badge, Section
│
├── Pages
│   ├── HomePage
│   ├── OnboardPage
│   ├── QuizPage
│   ├── SearchPage
│   ├── MatchPage
│   ├── ProfilePage
│   └── JourneyPage
│
└── App (root)                      — navigation, routing via page state, global styles
```

Navigation is handled via a `page` state string — no router library is required.

---

## User Personas & Journey Map

The Journey Map screen (`journey`) maps the end-to-end experience for three distinct personas:

### Maya — Young UK Renter
- Age 23, Leeds graduate, first-time shared renter
- Priorities: affordability, compatible housemates, transparency
- Key pain points: bidding-war pressure on SpareRoom, limited knowledge of tenant rights

### Priya — International Student
- Age 21, postgrad arriving from Mumbai to London
- Priorities: safety, cultural compatibility, verified landlords, remote search
- Key pain points: inability to visit properties before moving, unfamiliarity with UK rental norms

### Tom — Digital Nomad
- Age 29, freelance UX designer, relocates every 2–3 months
- Priorities: flexible contracts, fast WiFi, remote-friendly housemates
- Key pain points: traditional platforms lock in 12-month leases; rebuilding search preferences per city

Each persona's journey covers 7 stages: **Awareness → Research → Sign Up → Search → Match → Move In → Living**, with actions, emotional state, pain points, and product opportunities mapped at each stage.

---

## Key Features Demonstrated

- **Personality-based matching** — quiz results generate a renter type and compatibility scores
- **Affordability filtering** — budget slider, bills-included toggle, city filters
- **Trust & verification** — tiered verification badges (email, mobile, student ID, Right to Rent)
- **Flatmate card stack** — connect/pass interactions with live match panel
- **Digital onboarding** — progressive 3-step form with persona selector
- **Customer journey mapping** — interactive, switchable across all 3 personas

---

## Extending the Prototype

| What to add | Suggested approach |
|---|---|
| Real authentication | Replace form state with Supabase Auth or Firebase |
| Live property data | Connect `SearchPage` to a property API (e.g. Rightmove API, Zoopla feed) |
| Real matching algorithm | Replace static match scores with a cosine similarity model on quiz answers |
| Chat/messaging | Add a messages page using a WebSocket layer (e.g. Ably, Pusher) |
| Map view | Integrate Mapbox GL JS or Google Maps into the search results |
| Notifications | Add a notification bell in the navbar linked to connection requests |

---

## Relevant Market Context

This prototype was designed based on the following structural market conditions:

- The UK private rented sector has lost £79 billion in value since 2022 as landlords exit the market
- Average renters spend 32–41% of income on housing, above the 30% affordability threshold
- Gen Z now represents 36% of the UK rental market and expects digital-first, trust-oriented tools
- 288,000 international students arrived in the UK in 2025, many requiring long-term housing
- Co-living planning applications doubled in 2024, signalling strong demand for compatible shared living
- No existing platform integrates property search, flatmate matching, and trust verification in a single product

---

## License

This is a prototype UI/UX artefact created for product design and pitch purposes.  
All data (listings, profiles, statistics) is illustrative and fictional.

---

*Built with React · Styled with inline CSS · Fonts via Google Fonts*