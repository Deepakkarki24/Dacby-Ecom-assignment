# E-Commerce Order Management

Full-stack application for managing e-commerce orders. The backend is an Express API with MongoDB, and the frontend is a React dashboard built with Vite.

## Prerequisites

- [Node.js] (v18 or later)
- [MongoDB] running locally, or a MongoDB connection string

## Project structure

```
e-com-fullstack/
├── client/   # React frontend (Vite + TypeScript)
└── server/   # Express backend (TypeScript)
```

## Local setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd e-com-fullstack
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/simp
SCHEDULER_SECRET=your-secret-key
CLIENT_URL=http://localhost:5173
```

Replace `MONGODB_URI` with your MongoDB connection string if you are not using a local database.

Start the server:

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

### 3. Set up the frontend

Open a new terminal:

```bash
cd client
npm install
```

Create a `.env` file in the `client` folder:

```env
VITE_API_URL=
VITE_SCHEDULER_SECRET=your-secret-key
```

`VITE_API_URL` can be left empty for local development. Vite proxies `/api` requests to the backend on port 5000.

`VITE_SCHEDULER_SECRET` must match `SCHEDULER_SECRET` in the server `.env` file.

Start the frontend:

```bash
npm run dev
```

The app opens at `http://localhost:5173`.

## Running both apps

You need two terminals running at the same time:

| Terminal | Directory | Command       | URL                     |
|----------|-----------|---------------|-------------------------|
| 1        | `server/` | `npm run dev` | http://localhost:5000   |
| 2        | `client/` | `npm run dev` | http://localhost:5173   |

Open `http://localhost:5173` in your browser to use the dashboard.

## Production build

**Backend**

```bash
cd server
npm run build
npm start
```

In production, set `NODE_ENV=production` and provide `MONGODB_USERNAME` and `MONGODB_PASSWORD` in the server `.env` file for MongoDB Atlas.

**Frontend**

```bash
cd client
npm run build
npm run preview
```

Set `VITE_API_URL` to your deployed backend URL when building for production.

## Available scripts

**Server (`server/`)**

| Command       | Description                    |
|---------------|--------------------------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start`   | Run compiled server            |

**Client (`client/`)**

| Command         | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Start Vite dev server    |
| `npm run build` | Build for production     |
| `npm run preview` | Preview production build |
