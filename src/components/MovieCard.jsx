import React from 'react';
import { Star } from 'lucide-react';

const MovieCard = ({ movie, onClick }) => {
    return (
        <div
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
            onClick={() => onClick(movie)}
        >
            <div className="relative overflow-hidden aspect-[2/3]">
                <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white font-semibold">View Details</p>
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-xl font-bold mb-1 truncate text-white">{movie.title}</h3>
                <div className="flex justify-between items-center text-gray-400 text-sm mb-2">
                    <span>{movie.year}</span>
                    <span>{movie.genre}</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={16} fill="currentColor" />
                    <span className="font-medium">{movie.rating ? movie.rating.toFixed(1) : 'N/A'}</span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
