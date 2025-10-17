# React Query Demo

A small demo app showcasing common data-fetching patterns with @tanstack/react-query in a React + Vite project.  
It includes examples of regular fetches, React Query-powered fetching, manual (button) fetches, pagination, infinite scroll, `useQueries` usage, and a tiny CRUD demo backed by `json-server`.

## Features
- Basic axios fetch and display
- `useQuery` examples with loading/error handling
- Manual fetching using `enabled: false` + `refetch()`
- `useQueries` to fetch multiple resources in parallel
- Pagination example using query keys and `keepPreviousData`
- Infinite scroll examples using `useInfiniteQuery`
- Simple CRUD (create/update/delete) demo integrated with React Query mutations
- Local fake API using `json-server` (`db.json`)

## Tech stack
- React (v19)
- Vite
- @tanstack/react-query (+ devtools)
- axios
- json-server (for local API)
- Optional: Tailwind/tailwind plugin present in configuration

## Getting started (local)
Prerequisites: Node.js and npm installed.

1. Install dependencies
```cmd
npm install
