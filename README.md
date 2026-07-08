# 🌍 AI Travel Planner - Frontend

The frontend application for the AI Travel Planner platform.

Built with **Next.js**, **TypeScript**, and **Tailwind CSS**, this application provides a modern, responsive, and AI-powered travel planning experience.

---

# Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI
- React Query (TanStack Query)
- React Hook Form
- Zod
- Axios
- Supabase Auth
- Google Maps
- Framer Motion

---

# Project Goals

Create a premium travel planning platform that allows users to:

- Search destinations
- Generate AI-powered travel itineraries
- Save and manage trips
- View interactive maps
- Explore hotels and restaurants
- Track travel budgets
- Chat with AI travel assistant

---

# Folder Structure

```
src/

app/

components/

features/

hooks/

services/

store/

lib/

utils/

types/

constants/

styles/
```

---

# Development Rules

## General

- Use TypeScript only.
- Avoid using `any`.
- Follow ESLint and Prettier rules.
- Use functional components.
- Keep components reusable.
- Write clean and readable code.

---

## Components

✔ Keep components small.

✔ One responsibility per component.

✔ Extract repeated UI.

✔ Use Shadcn components whenever possible.

---

## State Management

Use:

- React Query → API Data
- Context API → Authentication
- Local State → UI only

Avoid unnecessary global state.

---

## API Calls

Never call APIs directly inside components.

Instead:

```
Component

↓

Service

↓

API Client
```

Example

```
services/

trip.service.ts

auth.service.ts

user.service.ts
```

---

## Forms

Use

- React Hook Form
- Zod Validation

Never validate manually.

---

## Styling

Use

- Tailwind CSS

Avoid

- Inline CSS
- Random color values
- CSS duplication

---

## Naming Convention

Components

```
TripCard.tsx
```

Hooks

```
useTrips.ts
```

Services

```
trip.service.ts
```

Types

```
trip.types.ts
```

Constants

```
trip.constants.ts
```

---

# Feature Development Flow

Whenever building a feature:

1. Design UI
2. Create Types
3. Create API Service
4. Create Hooks
5. Build Components
6. Integrate API
7. Testing
8. Optimization

---

# Coding Standards

Always

✅ Reusable

✅ Responsive

✅ Accessible

✅ Mobile First

✅ Type Safe

✅ Performant

---

# Git Workflow

main

Production

develop

Development

feature/<feature-name>

Example

feature/login

feature/ai-itinerary

feature/profile

---

# Commit Convention

feat:

fix:

refactor:

docs:

style:

test:

Example

feat: Add AI itinerary page

fix: Resolve login issue

refactor: Optimize trip card

---

# Environment Variables

Create

```
.env.local
```

Example

```
NEXT_PUBLIC_API_URL=

NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

NEXT_PUBLIC_GOOGLE_MAPS_KEY=
```

---

# Current Development Phase

Phase 1

- Project Setup
- Authentication
- Landing Page
- Dashboard
- AI Trip Generator

---

# Future Features

- AI Chat
- Budget Planner
- Packing List
- Offline Trips
- Multi-language
- PWA
- Dark Mode

---

# Important Principles

- Write clean code.
- Prefer readability over cleverness.
- Components should be reusable.
- Never duplicate logic.
- Keep UI consistent.
- Optimize before scaling.
