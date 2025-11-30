# Learning Sessions Browser

A lightweight React + TypeScript application built with Vite.  
It allows users to browse, search, and manage short AI learning sessions.

## Stack
- **React + TypeScript** — core framework and type safety  
- **Vite** — fast dev server and build tool  
- **Sass** — styling with variables and nesting  
- **clsx** — clean conditional class handling  
- **lodash.debounce** — smooth, efficient search

## Features
- Display a list of learning sessions from a local JSON file  
- Search by title with a 300 ms debounce  
- Sort by popularity (ascending or descending)  
- Toggle session completion state  
- Simulated loading and error states  
- Accessible and keyboard-friendly interface

## Getting Started
Install dependencies and start the development server:

```bash
npm install
npm run dev
