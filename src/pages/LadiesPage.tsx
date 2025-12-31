import React, { useState } from 'react';
import { Search, Filter, MapPin, CheckCircle, ChevronDown } from 'lucide-react';
import { LadyProfile } from '../types';
import { LadyProfileModal } from '../components';

interface LadiesPageProps {
    ladies: LadyProfile[];
}

export const LadiesPage: React.FC<LadiesPageProps> = ({ ladies }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [ageFilter, setAgeFilter] = useState<string>('all');
    const [hairFilter, setHairFilter] = useState<string>('all');
    const [countryFilter, setCountryFilter] = useState<string>('all');
    const [selectedLady, setSelectedLady] = useState<LadyProfile | null>(null);

    // Get unique countries for filter
    const uniqueCountries = [...new Set(ladies.map(l => l.country))];

    // Filter ladies
    const filteredLadies = ladies.filter(l => {
        const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.city.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesAge = true;
        if (ageFilter === '18-25') matchesAge = l.age >= 18 && l.age <= 25;
        else if (ageFilter === '26-33') matchesAge = l.age >= 26 && l.age <= 33;
        else if (ageFilter === '34-40') matchesAge = l.age >= 34 && l.age <= 40;
        else if (ageFilter === '40+') matchesAge = l.age > 40;

        const matchesHair = hairFilter === 'all' || l.hairColor === hairFilter;
        const matchesCountry = countryFilter === 'all' || l.country === countryFilter;

        return matchesSearch && matchesAge && matchesHair && matchesCountry;
    });

    const handleExpressInterest = (ladyId: string) => {
        alert(`Interest expressed for lady ID: ${ladyId}. Please complete your registration first.`);
        setSelectedLady(null);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Lady Profile Modal */}
            {selectedLady && (
                <LadyProfileModal
                    lady={selectedLady}
                    onClose={() => setSelectedLady(null)}
                    onExpressInterest={handleExpressInterest}
                />
            )}

            {/* Page Header */}
            <div className="bg-brand-navy text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl font-serif font-bold text-white mb-2">Verified Ladies</h1>
                    <p className="text-gray-400">
                        Browse 350+ personally verified profiles
                    </p>
                </div>
            </div>

            {/* Search & Filters Bar */}
            <div className="bg-white border-b sticky top-16 z-30">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search Input */}
                        <div className="relative flex-1">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name or city..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 text-brand-navy"
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-2">
                            {/* Age Filter */}
                            <div className="relative">
                                <select
                                    value={ageFilter}
                                    onChange={(e) => setAgeFilter(e.target.value)}
                                    className="appearance-none pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-brand-rose text-sm font-medium text-brand-navy cursor-pointer"
                                >
                                    <option value="all">All Ages</option>
                                    <option value="18-25">18-25</option>
                                    <option value="26-33">26-33</option>
                                    <option value="34-40">34-40</option>
                                    <option value="40+">40+</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>

                            {/* Hair Color Filter */}
                            <div className="relative">
                                <select
                                    value={hairFilter}
                                    onChange={(e) => setHairFilter(e.target.value)}
                                    className="appearance-none pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-brand-rose text-sm font-medium text-brand-navy cursor-pointer"
                                >
                                    <option value="all">All Hair Colors</option>
                                    <option value="Blonde">Blonde</option>
                                    <option value="Brunette">Brunette</option>
                                    <option value="Black">Black</option>
                                    <option value="Red">Red</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>

                            {/* Country Filter */}
                            <div className="relative">
                                <select
                                    value={countryFilter}
                                    onChange={(e) => setCountryFilter(e.target.value)}
                                    className="appearance-none pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-brand-rose text-sm font-medium"
                                >
                                    <option value="all">All Countries</option>
                                    {uniqueCountries.map(country => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </select>
                                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>

                            {/* Clear Filters */}
                            {(ageFilter !== 'all' || hairFilter !== 'all' || countryFilter !== 'all' || searchQuery) && (
                                <button
                                    onClick={() => {
                                        setAgeFilter('all');
                                        setHairFilter('all');
                                        setCountryFilter('all');
                                        setSearchQuery('');
                                    }}
                                    className="px-4 py-2.5 text-sm font-medium text-brand-rose hover:bg-brand-rose/10 rounded-lg transition-colors"
                                >
                                    Clear All
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mt-3 text-sm text-gray-500">
                        Showing <span className="font-bold text-brand-navy">{filteredLadies.length}</span> of {ladies.length} ladies
                    </div>
                </div>
            </div>

            {/* Ladies Grid */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {filteredLadies.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredLadies.map((lady) => (
                            <div
                                key={lady.id}
                                onClick={() => setSelectedLady(lady)}
                                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
                            >
                                {/* Photo */}
                                <div className="relative aspect-[3/4] overflow-hidden">
                                    <img
                                        src={lady.imageUrl}
                                        alt={lady.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400';
                                        }}
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                                    {/* Verified Badge */}
                                    {lady.verified && (
                                        <div className="absolute top-3 left-3 flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full text-[10px] font-bold uppercase">
                                            <CheckCircle size={12} />
                                            Verified
                                        </div>
                                    )}

                                    {/* Info Overlay */}
                                    <div className="absolute bottom-3 left-3 right-3 text-white">
                                        <h3 className="text-lg font-bold">{lady.name}, {lady.age}</h3>
                                        <div className="flex items-center text-sm opacity-90">
                                            <MapPin size={12} className="mr-1" />
                                            {lady.city}, {lady.country}
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Info */}
                                <div className="p-3 text-sm">
                                    <div className="flex items-center justify-between text-gray-500">
                                        <span>{lady.height}</span>
                                        <span>{lady.hairColor}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <Filter size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-600 mb-2">No ladies found</h3>
                        <p className="text-gray-400">Try adjusting your search filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LadiesPage;
