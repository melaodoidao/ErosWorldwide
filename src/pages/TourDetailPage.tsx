import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Check, Phone, Mail, ArrowLeft, Shield, Heart, Plane, Camera, Utensils, MessageSquare } from 'lucide-react';
import { Tour } from '../types';

interface TourDetailPageProps {
    tours: Tour[];
}

export const TourDetailPage: React.FC<TourDetailPageProps> = ({ tours }) => {
    const { id } = useParams<{ id: string }>();
    const tour = tours.find(t => t.id === id);

    if (!tour) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-brand-navy mb-4">Tour Not Found</h1>
                    <Link to="/tours" className="text-brand-rose hover:underline">← Back to Tours</Link>
                </div>
            </div>
        );
    }

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const itinerary = [
        { day: 1, title: 'Arrival & Welcome', desc: `Arrive in ${tour.city}. Airport pickup and transfer to your hotel. Evening welcome dinner with tour staff and fellow travelers.` },
        { day: 2, title: 'Orientation & City Tour', desc: `Morning orientation session. Afternoon guided city tour of ${tour.city}. Learn about local customs and dating etiquette.` },
        { day: 3, title: 'First Social Event', desc: 'Evening social event at an upscale venue. Meet 30-50 pre-screened, verified ladies. Professional translators available.' },
        { day: 4, title: 'Individual Introductions', desc: 'Schedule private dates with ladies you connected with. Our staff assists with reservations and translations.' },
        { day: 5, title: 'Cultural Experience', desc: `Explore local attractions in ${tour.city}. Optional activities: cooking class, dance lesson, or spa day.` },
        { day: 6, title: 'Second Social Event', desc: 'Another social event with a new group of verified ladies. More intimate setting with 20-30 women.' },
        { day: 7, title: 'Private Dating', desc: 'Full day for personal dates. Our coordinators remain available for support and translation services.' },
        { day: 8, title: 'Third Social Event', desc: 'Final social gathering. Follow-up meetings with special connections. Farewell dinner included.' },
        { day: 9, title: 'Optional Extension', desc: 'Continue your dates or explore the city. Tour staff available for assistance.' },
        { day: 10, title: 'Departure', desc: 'Airport transfer. Depart with contact information for your new connections. Ongoing support available.' },
    ];

    const included = [
        { icon: Plane, text: '9 nights hotel accommodation (4-star)' },
        { icon: Utensils, text: 'Daily breakfast, 3 group dinners' },
        { icon: Users, text: '3 social events with verified ladies' },
        { icon: MessageSquare, text: 'Personal translator services' },
        { icon: Camera, text: 'Professional profile photos' },
        { icon: MapPin, text: 'Airport transfers & city tours' },
        { icon: Phone, text: '24/7 tour coordinator support' },
        { icon: Heart, text: 'Unlimited personal introductions' },
    ];

    const notIncluded = [
        'International airfare',
        'Visa fees (if applicable)',
        'Personal expenses & gifts',
        'Additional meals outside events',
        'Travel insurance',
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[400px]">
                <img
                    src={tour.image}
                    alt={tour.city}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="max-w-7xl mx-auto">
                        <Link to="/tours" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
                            <ArrowLeft size={20} className="mr-2" />
                            Back to All Tours
                        </Link>
                        <div className="flex items-center gap-3 mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${tour.status === 'Filling Fast' ? 'bg-orange-500 text-white' :
                                    tour.status === 'Waitlist' ? 'bg-red-500 text-white' :
                                        'bg-green-500 text-white'
                                }`}>
                                {tour.status}
                            </span>
                            <span className="text-white/60 text-sm">{tour.countries.join(', ')}</span>
                        </div>
                        <h1 className="text-5xl font-serif font-bold text-white mb-2">{tour.city}</h1>
                        <p className="text-xl text-gray-300">Romance Tour Experience</p>
                    </div>
                </div>
            </div>

            {/* Quick Info Bar */}
            <div className="bg-brand-navy text-white py-4">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-8 text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-brand-rose" />
                            <span>{formatDate(tour.startDate)} - {formatDate(tour.endDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={18} className="text-brand-rose" />
                            <span>Check-in: {tour.checkInTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users size={18} className="text-brand-rose" />
                            <span>Max 20 Gentlemen</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield size={18} className="text-green-400" />
                            <span>IMBRA Compliant</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left Column - Details */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Overview */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-brand-navy mb-4">Tour Overview</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Join us for an unforgettable 10-day Romance Tour in {tour.city}, {tour.countries[0]}.
                                This professionally organized tour is designed for serious Western gentlemen seeking
                                meaningful connections with verified, family-oriented women. Our experienced staff
                                handles all logistics so you can focus on what matters most — finding your perfect match.
                            </p>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-gray-50 p-4 rounded-xl text-center">
                                    <div className="text-3xl font-bold text-brand-rose mb-1">100+</div>
                                    <div className="text-sm text-gray-500">Verified Ladies</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl text-center">
                                    <div className="text-3xl font-bold text-brand-rose mb-1">3</div>
                                    <div className="text-sm text-gray-500">Social Events</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl text-center">
                                    <div className="text-3xl font-bold text-brand-rose mb-1">10</div>
                                    <div className="text-sm text-gray-500">Days / 9 Nights</div>
                                </div>
                            </div>
                        </div>

                        {/* Itinerary */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-brand-navy mb-6">Day-by-Day Itinerary</h2>
                            <div className="space-y-4">
                                {itinerary.map((item) => (
                                    <div key={item.day} className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                        <div className="w-12 h-12 bg-brand-rose text-white rounded-full flex items-center justify-center font-bold shrink-0">
                                            {item.day}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-brand-navy">{item.title}</h3>
                                            <p className="text-sm text-gray-600">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* What's Included */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-brand-navy mb-6">What's Included</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {included.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                            <item.icon size={20} className="text-green-600" />
                                        </div>
                                        <span className="text-gray-700">{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            <h3 className="text-lg font-bold text-brand-navy mt-8 mb-4">Not Included</h3>
                            <div className="grid md:grid-cols-2 gap-2">
                                {notIncluded.map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-gray-500">
                                        <span className="text-red-400">✕</span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Booking */}
                    <div className="space-y-6">

                        {/* Price Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                            <div className="text-center mb-6">
                                <div className="text-sm text-gray-500 uppercase tracking-wide">Starting From</div>
                                <div className="text-5xl font-bold text-brand-navy">{tour.price}</div>
                                <div className="text-sm text-gray-500">per person</div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Tour Duration</span>
                                    <span className="font-medium">10 Days / 9 Nights</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Group Size</span>
                                    <span className="font-medium">Max 20 Gentlemen</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Deposit Required</span>
                                    <span className="font-medium">$500 (Refundable)</span>
                                </div>
                            </div>

                            <Link
                                to="/contact"
                                className="block w-full bg-brand-rose text-white py-4 rounded-xl font-bold text-center hover:bg-brand-rose/90 transition-all shadow-lg shadow-brand-rose/30 mb-3"
                            >
                                Reserve Your Spot
                            </Link>

                            <a
                                href="tel:+16025538178"
                                className="block w-full border-2 border-brand-navy text-brand-navy py-3 rounded-xl font-bold text-center hover:bg-brand-navy hover:text-white transition-all"
                            >
                                <Phone size={16} className="inline mr-2" />
                                Call (602) 553-8178
                            </a>

                            <p className="text-xs text-gray-400 text-center mt-4">
                                Limited spots available. Book early to secure your place.
                            </p>
                        </div>

                        {/* Trust Badges */}
                        <div className="bg-brand-navy rounded-2xl p-6 text-white">
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <Shield className="text-green-400" size={20} />
                                Your Safety Guaranteed
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2">
                                    <Check size={16} className="text-green-400 mt-0.5 shrink-0" />
                                    <span>100% IMBRA Compliant</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check size={16} className="text-green-400 mt-0.5 shrink-0" />
                                    <span>All ladies physically verified</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check size={16} className="text-green-400 mt-0.5 shrink-0" />
                                    <span>24/7 on-ground support</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check size={16} className="text-green-400 mt-0.5 shrink-0" />
                                    <span>Professional translators</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check size={16} className="text-green-400 mt-0.5 shrink-0" />
                                    <span>Secure payment processing</span>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold text-brand-navy mb-4">Questions?</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Our tour specialists are ready to help you plan your journey.
                            </p>
                            <div className="space-y-2">
                                <a href="tel:+16025538178" className="flex items-center gap-2 text-brand-rose hover:underline">
                                    <Phone size={16} />
                                    (602) 553-8178
                                </a>
                                <a href="mailto:tours@erosworldwide.io" className="flex items-center gap-2 text-brand-rose hover:underline">
                                    <Mail size={16} />
                                    tours@erosworldwide.io
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourDetailPage;
