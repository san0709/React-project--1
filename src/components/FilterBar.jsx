import React from 'react';

const FilterBar = ({ genres, years, selectedGenre, selectedYear, onGenreChange, onYearChange }) => {
    return (
        <div className="flex gap-4">
            <select
                value={selectedGenre}
                onChange={(e) => onGenreChange(e.target.value)}
                className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
                <option value="">All Genres</option>
                {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                ))}
            </select>

            <select
                value={selectedYear}
                onChange={(e) => onYearChange(e.target.value)}
                className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
                <option value="">All Years</option>
                {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
        </div>
    );
};

export default FilterBar;
