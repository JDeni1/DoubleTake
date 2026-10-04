# DoubleTake

Better first dates, with your best friend there too.

DoubleTake is a dating platform that lets you partner up with your best friend and match with another pair. Instead of the interview-like process of regular dating apps, which focus on individual profiles and the same dry pickup lines, DoubleTake turns the first date into a double date. It's safer, less pressure, and a lot more fun, because your best friend comes too.

Built in one weekend at **StormHacks 2026**, and submitted to the **TiDB x AI Open Build** track.

## Live Site

> https://your-site.onrender.com/

## Team

| Name | Role |
|---|---|
| Jill Bautista | Frontend: React app, UI design, mock API, deployment |
| Annie [Last name] | Backend: Spring Boot API and matching logic |
| Val [Last name] | Database: TiDB schema, seed data and vector search |

## Inspiration

First dates can feel like job interviews: two strangers, a list of questions, and a lot of pressure. People are far more relaxed when they bring a friend along, so we asked: what if dating worked that way from the start? With DoubleTake, you never have to go alone.

## Features

**Duo Profiles**
  Team up with your friend to create one shared duo profile, with both of your interests and a duo bio you write together.

**Discovery Feed**
  Browse duos one at a time, ranked by how closely their vibe matches yours, and like or pass with a single tap.

**Vibe Search**
  Describe the duo you'd click with in plain English, like "duo that loves hiking and karaoke," and get results ranked by TiDB vector search.

**Matches**
  When both duos like each other, it's a Double Take, and the match is saved to your Matches list.

**Your Duo**
  Edit your duo bio at any time, or start over with a new duo.

## Frontend

A mobile-first React app, built so it looks and feels like a phone app.

- **React** pages use hooks to load data and to know who the current user and duo are
- **Context** shares the current user and duo with every screen
- **`api.js`** sends every request either to the mock API (built from the team's API contract) or to the Spring Boot backend, controlled by one setting
- **Components** are reusable building blocks that each page is assembled from
- **Vite** for building and **Tailwind CSS** for styling, with shared design tokens for colors and fonts

## Backend

A REST API that stores users and duos, records likes and passes, and creates matches.

- **Java** and **Spring Boot**, built with **Maven**
- **Spring Data JPA** for database access
- Services for users, duos, discovery (the feed), swipes and matches
- Endpoints follow the shared contract in `docs/api-contract.md`

## Database

TiDB Cloud powers both storage and the AI matching.

- **TiDB Cloud** (MySQL-compatible) stores users, duos, swipes and matches
- **Vector Search with Auto Embedding** turns each duo's bio and interests into embeddings inside the database
- The feed and search rank duos by vector distance, so the closest vibes come first

## Project Structure

```
DoubleTake/
├── frontend/               # React + Vite + Tailwind app
│   ├── public/             # Favicon and app icons
│   └── src/
│       ├── components/     # Reusable UI pieces (cards, buttons, nav)
│       ├── context/        # Current user and duo shared across screens
│       ├── hooks/          # Data loading and current-duo hooks
│       ├── lib/            # API calls, formatting, rules and settings
│       ├── mocks/          # Fake data and mock API for development
│       └── pages/          # One file per screen
├── backend/                # Spring Boot API
│   └── src/main/java/com/doubletake/backend/
│       ├── entity/         # Database models
│       ├── repository/     # Database access
│       └── service/        # Business logic (feed, swipes, matches)
├── database/               # TiDB schema and seed data
└── docs/                   # API contract and team documents
```

## Getting Started

### Prerequisites

- Node.js 22+ and npm (frontend)
- Java 21 and Maven, or the included Maven wrapper (backend)
- A TiDB Cloud cluster (database)

### Frontend

```bash
git clone https://github.com/JDeni1/DoubleTake.git
cd DoubleTake/frontend
npm install
```

Copy `.env.example` to `.env.local`, then:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). With `VITE_USE_MOCKS=true` the app runs on mock data; set it to `false` and set `VITE_API_URL` to use the real backend.

### Backend

```bash
cd DoubleTake/backend
./mvnw spring-boot:run
```

Set the TiDB connection details as environment variables before starting (see `application.properties`). The API runs at [http://localhost:8080](http://localhost:8080).

### Database

Create a TiDB Cloud cluster, then run the schema and seed scripts from the `database/` folder in the TiDB Cloud SQL editor.

## Deployment

The frontend is deployed as a **Static Site** on [Render](https://render.com).

| Setting | Value |
|---|---|
| Root Directory | `frontend` |
| Build Command | `npm ci && npm run build` |
| Publish Directory | `dist` |
| Environment | `NODE_VERSION=24`, `VITE_USE_MOCKS`, `VITE_API_URL` |
| Rewrite Rule | `/* → /index.html` |

The rewrite rule ensures routes like `/feed` don't 404 on refresh.

## What's Next

DoubleTake is in its earliest stages, with plenty of room to grow:

- **Messaging:** group chat so matched duos can plan their double date
- **Filters and customization** for the kinds of duos you want to meet
- **Personal profiles** that each friend can edit on their own
- **Photo uploads** for profiles
- **Consent-based invites and real accounts** for privacy and safety
