🎬 **MovieHub — React + Vite**

A small React app built with Vite that searches movies via the OMDb API, shows details, and supports pagination and basic filtering.

⭐ Features

- 🎯 Search movies by title (defaults to `Avengers`)
- 📄 Show detailed info (plot, cast, IMDb rating)
- 🧭 Filter by genre and year
- ▶️ Pagination with a "Load More Movies" button (fetches more pages from OMDb)
- 🖼️ Placeholder poster when a poster is unavailable

🚀 Quick Start

1. Install dependencies

```bash
npm install
```

2. Add your OMDb API key (create a `.env` in the project root)

```
VITE_OMDB_API_KEY=your_api_key_here
```

Get a free key from https://www.omdbapi.com/apikey.aspx 🔑

3. Start dev server

```bash
npm run dev
```

4. Open the app in your browser (Vite will show the correct URL, typically `http://localhost:5173`)

📦 Available Scripts

- `npm run dev` — Starts the dev server
- `npm run build` — Creates a production build
- `npm run preview` — Preview the production build locally

⚙️ Environment

- `VITE_OMDB_API_KEY` — (required) Your OMDb API key

Notes

- The OMDb search endpoint returns 10 results per page. This app requests pages and appends results when you click "Load More Movies".
- The app fetches extra details for each search result (this means each displayed movie triggers a details request).

🗂 Project Structure (important files)

- `src/App.jsx` — Main application and pagination logic
- `src/services/omdb.js` — Wrapper around OMDb API (`searchMovies(term, page)` and `getMovieDetails(id)`)
- `src/components/` — UI components (`MovieCard`, `MovieModal`, `SearchBar`, `FilterBar`, `StarRating`)

Troubleshooting

- If you see "API Key Missing", ensure `.env` has the correct `VITE_OMDB_API_KEY` and restart the dev server.
- If the dev server reports a port in use, Vite will automatically try another port (e.g. 5174).

Contributing

- Feel free to open issues or PRs. Ideas: infinite scroll, caching movie details, or converting to TypeScript.

License

- MIT (or change as desired)

— Happy browsing! 🍿
