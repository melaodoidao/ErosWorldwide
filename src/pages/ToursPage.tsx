import React from 'react';
import { Calendar, MapPin, Clock, Users, Plane, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tour } from '../types';

interface ToursPageProps {
    tours: Tour[];
}

export const ToursPage: React.FC<ToursPageProps> = ({ tours }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Open':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'Filling Fast':
                return 'bg-red-100 text-red-700 border-red-200';
            case 'Waitlist':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Page Header */}
            <div className="bg-brand-navy py-20 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand-rose/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-rose/10 rounded-full blur-3xl" />
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="flex items-center gap-2 text-brand-rose mb-4">
                        <Plane size={20} />
                        <span className="text-sm font-bold uppercase tracking-wider">Romance Tours</span>
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
                        2025 Tour Schedule
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                        Join our professionally organized Romance Tours to Medellin Colombia,
                        Bangkok Thailand, and Kiev Ukraine. Meet verified, family-oriented women in person.
                    </p>
                </div>
            </div>

            {/* Tour Highlights */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { icon: Users, label: 'Group Socials', value: '3-5 per tour' },
                            { icon: Calendar, label: 'Tour Length', value: '7-14 Days' },
                            { icon: MapPin, label: 'Destinations', value: '3 Continents' },
                            { icon: CheckCircle, label: 'Verified Ladies', value: '100+ per event' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-brand-rose/10 rounded-xl flex items-center justify-center">
                                    <item.icon size={24} className="text-brand-rose" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">{item.label}</p>
                                    <p className="font-bold text-brand-navy">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tours Grid */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tours.map((tour) => (
                        <div
                            key={tour.id}
                            className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all group"
                        >
                            {/* Tour Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={tour.image}
                                    alt={tour.city}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                {/* Status Badge */}
                                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusColor(tour.status)}`}>
                                    {tour.status}
                                </div>

                                {/* City */}
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="text-2xl font-bold">{tour.city}</h3>
                                    <p className="text-sm opacity-90">{tour.countries.join(', ')}</p>
                                </div>
                            </div>

                            {/* Tour Details */}
                            <div className="p-6">
                                {/* Dates */}
                                <div className="flex items-center gap-2 text-gray-600 mb-4">
                                    <Calendar size={16} />
                                    <span className="text-sm font-medium">
                                        {tour.startDate} — {tour.endDate}
                                    </span>
                                </div>

                                {/* Info Grid */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                                        <Clock size={16} className="mx-auto text-gray-400 mb-1" />
                                        <p className="text-xs text-gray-500">Check-in</p>
                                        <p className="font-bold text-sm">{tour.checkInTime}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                                        <Users size={16} className="mx-auto text-gray-400 mb-1" />
                                        <p className="text-xs text-gray-500">Group Size</p>
                                        <p className="font-bold text-sm">Max 20</p>
                                    </div>
                                </div>

                                {/* Price & CTA */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500">Starting from</p>
                                        <p className="text-2xl font-bold text-brand-navy">{tour.price}</p>
                                    </div>
                                    <Link
                                        to={`/tours/${tour.id}`}
                                        className="bg-brand-rose text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-brand-rose/90 transition-colors"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* What's Included */}
            <div className="bg-brand-navy text-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-serif font-bold mb-8 text-center text-white">What's Included in Every Tour</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Accommodations',
                                items: ['5-star hotel stays', 'Breakfast daily', 'Private transportation'],
                            },
                            {
                                title: 'Social Events',
                                items: ['3-5 group socials', '100+ verified ladies', 'Professional translators'],
                            },
                            {
                                title: 'Support',
                                items: ['24/7 staff assistance', 'City orientation tour', 'Personal matchmaker'],
                            },
                        ].map((section, i) => (
                            <div key={i} className="bg-white/5 rounded-xl p-6">
                                <h3 className="text-xl font-bold mb-4 text-brand-rose">{section.title}</h3>
                                <ul className="space-y-3">
                                    {section.items.map((item, j) => (
                                        <li key={j} className="flex items-center gap-3">
                                            <CheckCircle size={16} className="text-green-400" />
                                            <span className="text-gray-300">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h2 className="text-3xl font-serif font-bold text-brand-navy mb-4">Ready to Find Love?</h2>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                    Contact us to reserve your spot on any tour. Our team will help you
                    prepare for your journey.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        to="/register"
                        className="bg-brand-rose text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-rose/90 transition-colors"
                    >
                        Register Free
                    </Link>
                    <Link
                        to="/contact"
                        className="bg-white border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ToursPage;
