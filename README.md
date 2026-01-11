# Nuxt 3 ToDo Dashboard

A simple **ToDo Dashboard** built with **Nuxt 3**, **Pinia**, and **TailwindCSS**, featuring task management, status filtering, and real-time updates.

## Features

- View a list of tasks with dynamic status indicators (`todo`, `in-progress`, `done`)
- Filter tasks by status
- Loading and empty states for better UX
- View and edit individual task details
- Update task title and status with server persistence
- Responsive design using TailwindCSS
- State management with Pinia and reusable composables

## Tech Stack

- [Nuxt 3](https://nuxt.com/)
- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- TypeScript 5
- Node.js 22
- $fetch / useAsyncData for API interactions

## Project Structure

/pages
├─ index.vue # Landing page
├─ tasks.vue # Task list page with filters
└─ tasks/[id].vue # Task detail page with edit form
/composables
└─ useTask.ts # Task filtering and fetching logic
/store
└─ useTasksStore.ts # Pinia store for tasks
/server
└─ api/tasks # API routes for CRUD operations


## API Endpoints

- `GET /api/tasks` – Get all tasks  
- `GET /api/tasks/[id]` – Get task by ID  
- `PUT /api/tasks/[id]` – Update task title or status  

## Installation

```bash
pnpm install
pnpm dev
