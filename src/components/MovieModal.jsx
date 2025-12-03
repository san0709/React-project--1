import React from 'react';
import { X, Calendar, Film } from 'lucide-react';
import StarRating from './StarRating';

const MovieModal = ({ movie, onClose, userRating, onRate }) => {
    if (!movie) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-gray-800 flex flex-col md:flex-row">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 text-white transition-colors z-10"
                >
                    <X size={24} />
                </button>

                <div className="md:w-2/5 h-64 md:h-auto relative">
                    <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-6 md:p-8 md:w-3/5 flex flex-col gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{movie.title}</h2>
                        <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
                            <div className="flex items-center gap-1">
                                <Calendar size={16} />
                                <span>{movie.year}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Film size={16} />
                                <span>{movie.genre}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-white">Overview</h3>
                        <p className="text-gray-300 leading-relaxed">{movie.description}</p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-white">Cast</h3>
                        <div className="flex flex-wrap gap-2">
                            {movie.cast.map((actor, index) => (
                                <span key={index} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300 border border-gray-700">
                                    {actor}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-800">
                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-gray-400">Your Rating</span>
                            <div className="flex items-center gap-4">
                                <StarRating
                                    rating={userRating || 0}
                                    onRate={(rating) => onRate(movie.id, rating)}
                                    interactive={true}
                                />
                                {userRating && (
                                    <span className="text-yellow-400 font-medium">
                                        {userRating} / 5
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;
