import React, { useState, useEffect, useMemo } from "react";
import MovieCard from "./components/MovieCard";
import MovieModal from "./components/MovieModal";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import { Film, Loader } from "lucide-react";
import { searchMovies, getMovieDetails } from "./services/omdb";

// Helper function to extract actors
const extractActors = (actorString) => {
  if (!actorString) return [];
  return actorString.split(",").map((a) => a.trim());
};

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [userRatings, setUserRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Fetch movies based on search term (default "Avengers")
  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = import.meta.env.VITE_OMDB_API_KEY;
      if (!apiKey) {
        setApiKeyMissing(true);
        setLoading(false);
        return;
      }
      setLoading(true);
      const term = searchQuery.trim() || "Avengers";
      try {
        const results = await searchMovies(term, currentPage);
        console.log(
          "🎯 App - Search response (page",
          currentPage,
          "):",
          results
        );

        if (results.Response === "False") {
          console.warn("⚠️ API returned error:", results.Error);
          if (currentPage === 1) {
            setMovies([]);
            setTotalResults(0);
            setLoading(false);
            return;
          }
          setLoading(false);
          return;
        }

        const list = results.Search || [];
        console.log("📝 App - Found movies:", list.length);
        setTotalResults(Number.parseInt(results.totalResults, 10) || 0);

        const movieDetails = await Promise.all(
          list.map(async (m) => {
            const details = await getMovieDetails(m.imdbID);
            const isPoster = m.Poster !== "N/A";
            return {
              id: m.imdbID,
              title: m.Title,
              year: m.Year,
              poster: isPoster
                ? m.Poster
                : "https://via.placeholder.com/300x450?text=No+Poster",
              genre: details.Genre || "N/A",
              rating:
                details.imdbRating && details.imdbRating !== "N/A"
                  ? Number.parseFloat(details.imdbRating)
                  : null,
              description: details.Plot || "No description.",
              cast: extractActors(details.Actors),
            };
          })
        );
        console.log("✅ App - Processed movies:", movieDetails);

        // Append new movies to existing list for pagination
        if (currentPage === 1) {
          setMovies(movieDetails);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...movieDetails]);
        }
      } catch (e) {
        console.error("❌ Error fetching movies:", e);
        if (currentPage === 1) {
          setMovies([]);
        }
      }
      setLoading(false);
    };
    fetchMovies();
  }, [searchQuery, currentPage]);

  // Extract unique genres and years for filter dropdowns
  const availableGenres = useMemo(() => {
    const set = new Set();
    for (const m of movies) {
      if (m.genre && m.genre !== "N/A") {
        for (const g of m.genre.split(",")) {
          set.add(g.trim());
        }
      }
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [movies]);

  const availableYears = useMemo(() => {
    const set = new Set();
    for (const m of movies) {
      if (m.year) set.add(m.year);
    }
    return Array.from(set).sort((a, b) => b - a);
  }, [movies]);

  // Client-side filtering
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const genreMatch = selectedGenre
        ? movie.genre?.includes(selectedGenre)
        : true;
      const yearMatch = selectedYear ? movie.year === selectedYear : true;
      return genreMatch && yearMatch;
    });
  }, [movies, selectedGenre, selectedYear]);

  const handleRate = (movieId, rating) => {
    setUserRatings((prev) => ({ ...prev, [movieId]: rating }));
  };

  if (apiKeyMissing) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <Film className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">API Key Missing</h1>
          <p className="text-gray-400 mb-4">
            Please add your OMDb API key to the{" "}
            <code className="bg-gray-800 px-2 py-1 rounded">.env</code> file as{" "}
            <code className="text-blue-400">VITE_OMDB_API_KEY</code>.
          </p>
          <p className="text-sm text-gray-500">
            Get a free key from{" "}
            <a
              href="https://www.omdbapi.com/apikey.aspx"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-blue-400"
            >
              omdbapi.com
            </a>
            {"."}
          </p>
        </div>
      </div>
    );
  }

  const isInitialLoading = currentPage === 1 && loading;
  const hasMovies = filteredMovies.length > 0;
  const showLoadMore = totalResults > movies.length;

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-md border-b border-gray-700 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Film className="text-blue-500" size={32} />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                MovieHub
              </h1>
            </div>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-200">
            {isInitialLoading
              ? "Loading..."
              : `${filteredMovies.length} Movies Found`}
          </h2>
          <FilterBar
            genres={availableGenres}
            years={availableYears}
            selectedGenre={selectedGenre}
            selectedYear={selectedYear}
            onGenreChange={setSelectedGenre}
            onYearChange={setSelectedYear}
          />
        </div>

        {/* Movie Grid */}
        {isInitialLoading && (
          <div className="flex justify-center py-20">
            <Loader className="animate-spin text-blue-500" size={48} />
          </div>
        )}
        {!isInitialLoading && hasMovies && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={setSelectedMovie}
                />
              ))}
            </div>

            {/* Load More Button */}
            {showLoadMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={loading}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white font-semibold rounded-lg transition"
                >
                  {loading ? "Loading..." : "Load More Movies"}
                </button>
              </div>
            )}
          </>
        )}
        {!isInitialLoading && !hasMovies && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">No movies found matching your criteria.</p>
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          userRating={userRatings[selectedMovie.id]}
          onRate={handleRate}
        />
      )}
    </div>
  );
}

export default App;
