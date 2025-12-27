import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, MapPin } from 'lucide-react';
import { LadyProfile } from '../types';

interface CarouselProps {
    ladies: LadyProfile[];
    onViewProfile: (lady: LadyProfile) => void;
}

export const FeaturedCarousel: React.FC<CarouselProps> = ({ ladies, onViewProfile }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const featuredLadies = ladies.slice(0, 8);
    const visibleCount = 4;

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % Math.max(1, featuredLadies.length - visibleCount + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, featuredLadies.length]);

    const next = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => Math.min(prev + 1, featuredLadies.length - visibleCount));
    };

    const prev = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    if (featuredLadies.length === 0) return null;

    return (
        <div className="relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-bold text-brand-navy">Featured Ladies</h3>
                    <p className="text-gray-500 text-xs">New verified profiles this week</p>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={prev}
                        disabled={currentIndex === 0}
                        className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-brand-navy hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={next}
                        disabled={currentIndex >= featuredLadies.length - visibleCount}
                        className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-brand-navy hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* Grid layout for more density */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {featuredLadies.slice(currentIndex, currentIndex + visibleCount).map((lady) => (
                    <div
                        key={lady.id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-all group"
                        onClick={() => onViewProfile(lady)}
                    >
                        <div className="aspect-[3/4] overflow-hidden relative">
                            <img
                                src={lady.imageUrl}
                                alt={lady.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'; }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                            {/* Verified badge */}
                            <div className="absolute top-2 left-2">
                                <div className="bg-green-500 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center">
                                    <ShieldCheck size={10} className="mr-1" /> Verified
                                </div>
                            </div>

                            {/* Info */}
                            <div className="absolute bottom-2 left-2 right-2 text-white">
                                <h4 className="text-sm font-bold leading-tight">{lady.name}, {lady.age}</h4>
                                <div className="flex items-center text-[10px] opacity-90">
                                    <MapPin size={10} className="mr-1" />
                                    {lady.city}
                                </div>
                            </div>
                        </div>

                        {/* ID */}
                        <div className="px-2 py-1 bg-gray-50 text-[10px] text-gray-500 font-medium">
                            ID: {lady.id}00X • View Profile →
                        </div>
                    </div>
                ))}
            </div>

            {/* View all button */}
            <div className="text-center mt-4">
                <button
                    onClick={() => window.dispatchEvent(new CustomEvent('navToLadies'))}
                    className="text-sm font-bold text-brand-navy hover:text-brand-rose transition-colors"
                >
                    View All 35,000+ Ladies →
                </button>
            </div>
        </div>
    );
};

export default FeaturedCarousel;
