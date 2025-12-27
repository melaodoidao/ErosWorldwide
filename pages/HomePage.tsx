import React from 'react';
import {
    ShieldCheck, Plane, Users, BookOpen, Calendar, Award, Video, Shield,
    ChevronRight, Globe, Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { TestimonialTabs } from '../components';
import { LadyProfile, Tour, SuccessStory } from '../types';

interface HomePageProps {
    ladies: LadyProfile[];
    tours: Tour[];
    stories: SuccessStory[];
}

export const HomePage: React.FC<HomePageProps> = ({ ladies, tours, stories }) => {
    return (
        <div className="animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* LEFT SIDEBAR */}
                    <aside className="lg:w-64 shrink-0 space-y-4">
                        {/* Quick Links */}
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-brand-navy text-white px-4 py-3 text-xs font-bold uppercase tracking-wide">
                                The Journey
                            </div>
                            <div className="p-3 space-y-1">
                                {[
                                    { label: 'Our Philosophy', icon: BookOpen, path: '/philosophy' },
                                    { label: 'Tour Schedule', icon: Calendar, path: '/tours' },
                                    { label: 'Success Stories', icon: Award, path: '/testimonials' },
                                    { label: 'Video Reviews', icon: Video, path: '/testimonials' },
                                ].map((link, i) => (
                                    <Link
                                        key={i}
                                        to={link.path}
                                        className="flex items-center w-full text-left py-2 px-3 text-[13px] font-medium text-gray-600 hover:bg-gray-50 hover:text-brand-navy rounded transition-all"
                                    >
                                        <link.icon size={14} className="mr-2 text-gray-400" />
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* IMBRA Compliance Box */}
                        <div className="bg-brand-navy text-white p-5 rounded-lg">
                            <div className="flex items-center mb-3">
                                <Shield size={20} className="text-brand-rose mr-2" />
                                <span className="text-xs font-bold uppercase tracking-wide">IMBRA Compliant</span>
                            </div>
                            <p className="text-[12px] leading-relaxed text-gray-300 mb-4">
                                100% compliant with US Federal laws. Full background checks.
                            </p>
                            <Link
                                to="/legal"
                                className="block w-full bg-brand-rose text-white text-[11px] font-bold uppercase py-2 rounded hover:bg-brand-rose/90 transition-all text-center"
                            >
                                Learn More
                            </Link>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="text-xs font-bold text-gray-500 uppercase mb-3">Quick Stats</div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Active Ladies</span>
                                    <span className="font-bold text-brand-navy">{ladies.length.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Marriages 2024</span>
                                    <span className="font-bold text-green-600">847</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Upcoming Tours</span>
                                    <span className="font-bold text-brand-rose">{tours.length}</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* MAIN CONTENT */}
                    <div className="flex-1 space-y-4">

                        {/* HERO BANNER */}
                        <div
                            className="relative rounded-2xl overflow-hidden bg-brand-navy"
                        >
                            <div className="relative z-10 p-8 lg:p-12">
                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 bg-brand-rose/15 border border-brand-rose/30 rounded-full px-4 py-1.5 mb-6">
                                    <ShieldCheck size={14} className="text-brand-rose" />
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                                        Verified International Introductions
                                    </span>
                                </div>

                                {/* Main Headline */}
                                <h1 className="font-serif text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6">
                                    Real Love<br />
                                    Knows No <span className="text-brand-rose">Borders.</span>
                                </h1>

                                {/* Subtitle */}
                                <p className="text-gray-300 text-base lg:text-lg max-w-xl mb-8 leading-relaxed">
                                    Escape the endless scroll of dating apps. Join us for a curated,
                                    professional journey to meet the world's most family-oriented
                                    women in person.
                                </p>

                                {/* CTA Buttons */}
                                <div className="flex flex-wrap gap-3">
                                    <Link
                                        to="/tours"
                                        className="inline-flex items-center gap-2 bg-brand-rose text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-brand-rose/90 transition-all shadow-lg shadow-brand-rose/30"
                                    >
                                        View 2025 Schedule
                                        <Plane size={16} />
                                    </Link>
                                    <Link
                                        to="/ladies"
                                        className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-secondary/90 transition-all"
                                    >
                                        Browse Ladies
                                        <Users size={16} />
                                    </Link>
                                </div>

                                {/* Stats Row */}
                                <div className="flex flex-wrap gap-6 mt-10 pt-6 border-t border-white/10">
                                    <div>
                                        <p className="text-2xl font-bold text-white">{ladies.length.toLocaleString()}+</p>
                                        <p className="text-xs text-gray-400 uppercase tracking-wide">Verified Ladies</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-white">15,200+</p>
                                        <p className="text-xs text-gray-400 uppercase tracking-wide">Marriages</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-white">{tours.length}</p>
                                        <p className="text-xs text-gray-400 uppercase tracking-wide">Active Tours</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-brand-rose">100%</p>
                                        <p className="text-xs text-gray-400 uppercase tracking-wide">IMBRA Compliant</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* THREE COLUMN GRID */}
                        <div className="grid lg:grid-cols-3 gap-4">

                            {/* Column 1: Quick Search */}
                            <div className="bg-white border border-gray-200 rounded-lg">
                                <div className="bg-brand-navy text-white px-4 py-2 text-sm font-bold flex justify-between items-center">
                                    <span>Quick Search</span>
                                    <span className="text-brand-rose text-xs">{ladies.length.toLocaleString()} Active Profiles</span>
                                </div>
                                <div className="p-4 space-y-3">
                                    <p className="text-xs text-gray-500">
                                        As of our <span className="text-brand-navy font-bold">Wednesday Updates</span>
                                    </p>
                                    <div className="grid grid-cols-2 gap-2">
                                        <select className="text-sm border rounded px-2 py-1.5 focus:border-brand-rose focus:ring-1 focus:ring-brand-rose outline-none transition-all">
                                            <option>Age: 18-25</option>
                                            <option>Age: 26-33</option>
                                            <option>Age: 34-45</option>
                                        </select>
                                        <select className="text-sm border rounded px-2 py-1.5 focus:border-brand-rose focus:ring-1 focus:ring-brand-rose outline-none transition-all">
                                            <option>All Countries</option>
                                            <option>Ukraine</option>
                                            <option>Colombia</option>
                                            <option>Philippines</option>
                                        </select>
                                    </div>
                                    <Link
                                        to="/ladies"
                                        className="block w-full bg-brand-rose text-white py-2 rounded text-sm font-bold hover:bg-brand-rose/90 text-center"
                                    >
                                        Search Now
                                    </Link>
                                    <p className="text-[10px] text-center text-gray-400">100% Verified REAL Profiles</p>
                                    <Link to="/ladies" className="block w-full text-brand-navy text-xs font-bold hover:underline text-center">
                                        Use Advanced Search →
                                    </Link>
                                </div>
                            </div>

                            {/* Column 2: Upcoming Events */}
                            <div className="bg-white border border-gray-200 rounded-lg">
                                <div className="bg-brand-navy text-white px-4 py-2 text-sm font-bold">
                                    Upcoming FREE Dating Seminars
                                </div>
                                <div className="p-3">
                                    <ul className="space-y-2 text-sm">
                                        {[
                                            { city: 'Phoenix, AZ', date: 'January 11, 2025' },
                                            { city: 'San Francisco, CA', date: 'January 17, 2025' },
                                            { city: 'Miami, FL', date: 'February 8, 2025' },
                                            { city: 'Los Angeles, CA', date: 'March 15, 2025' },
                                        ].map((event, i) => (
                                            <li key={i} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0">
                                                <span className="text-brand-navy font-medium">{event.city}</span>
                                                <span className="text-gray-400 text-xs">{event.date}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-[10px] text-gray-400 mt-2">(602) 553-8178 Ext. 0 • RSVP Required</p>
                                    <Link to="/contact" className="block w-full mt-2 text-brand-navy text-xs font-bold hover:underline text-center">
                                        View All Seminars & RSVP →
                                    </Link>
                                </div>
                            </div>

                            {/* Column 3: Upcoming Tours */}
                            <div className="bg-white border border-gray-200 rounded-lg">
                                <div className="bg-brand-rose text-white px-4 py-2 text-sm font-bold">
                                    Upcoming Singles Tours
                                </div>
                                <div className="p-3">
                                    <ul className="space-y-2">
                                        {tours.slice(0, 4).map((tour, i) => (
                                            <li
                                                key={i}
                                                className="flex items-center space-x-2 py-1 border-b border-gray-100 last:border-0"
                                            >
                                                <img
                                                    src={tour.image}
                                                    alt={tour.city}
                                                    className="w-10 h-10 rounded object-cover"
                                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                                />
                                                <div className="flex-grow">
                                                    <p className="text-sm font-medium text-brand-navy">{tour.city}</p>
                                                    <p className="text-[10px] text-gray-400">{tour.startDate}</p>
                                                </div>
                                                <span className={`text-[10px] px-1.5 py-0.5 rounded ${tour.status === 'Filling Fast'
                                                    ? 'bg-red-100 text-red-600'
                                                    : 'bg-green-100 text-green-600'
                                                    }`}>
                                                    {tour.status}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        to="/tours"
                                        className="block w-full mt-3 bg-brand-navy text-white py-2 rounded text-sm font-bold hover:bg-brand-navy/90 text-center"
                                    >
                                        View All Romance Tours
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* FEATURED LADIES PREVIEW */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-brand-navy">Featured Ladies</h3>
                                <Link
                                    to="/ladies"
                                    className="text-sm text-brand-rose font-bold hover:underline flex items-center"
                                >
                                    View All <ChevronRight size={16} />
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                {ladies.slice(0, 6).map((lady) => (
                                    <Link
                                        to={`/ladies/${lady.id}`}
                                        key={lady.id}
                                        className="group"
                                    >
                                        <div className="relative overflow-hidden rounded-lg">
                                            <img
                                                src={lady.imageUrl}
                                                alt={lady.name}
                                                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            <div className="absolute bottom-2 left-2 text-white">
                                                <p className="text-sm font-bold">{lady.name}, {lady.age}</p>
                                                <p className="text-[10px] opacity-80">{lady.city}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* SUCCESS STORIES GRID */}
                        <div className="bg-white border border-gray-200 rounded-lg">
                            <div className="bg-brand-navy text-white px-4 py-2 text-sm font-bold flex justify-between items-center">
                                <span>Recent Success Stories</span>
                                <Link to="/testimonials" className="text-brand-rose text-xs hover:underline">View All 847 Stories →</Link>
                            </div>
                            <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                                {stories.filter(s => s.video).slice(0, 4).map((story, i) => (
                                    <Link key={i} to="/testimonials" className="group cursor-pointer">
                                        <div className="aspect-video bg-gray-100 rounded overflow-hidden relative">
                                            <img src={story.img} alt={story.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                                <Video size={32} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                                            </div>
                                        </div>
                                        <p className="text-xs font-medium mt-1 text-brand-navy">{story.name}</p>
                                        <p className="text-[10px] text-gray-400">{story.location}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* 4-STEP PROCESS */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-brand-navy">How It Works</h2>
                                <p className="text-gray-500 text-sm">Our proven 4-step process to marriage</p>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { title: "Register", desc: "Create profile & background check", icon: Users, path: '/register' },
                                    { title: "Browse", desc: "35,000+ verified ladies", icon: Users, path: '/ladies' },
                                    { title: "Travel", desc: "Join a Romance Tour", icon: Plane, path: '/tours' },
                                    { title: "Marry", desc: "Visa & legal support", icon: Heart, path: '/legal' },
                                ].map((step, i) => (
                                    <Link key={i} to={step.path} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-brand-navy hover:text-white group transition-all">
                                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 shadow group-hover:bg-brand-rose">
                                            <step.icon size={24} className="text-brand-navy group-hover:text-white" />
                                        </div>
                                        <span className="text-xs font-bold text-brand-rose group-hover:text-brand-rose">Step {i + 1}</span>
                                        <h4 className="font-bold text-sm">{step.title}</h4>
                                        <p className="text-xs text-gray-500 group-hover:text-gray-300 mt-1">{step.desc}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* WHY CHOOSE US */}
                        <div className="bg-gradient-to-r from-brand-navy to-brand-navy-muted text-white rounded-lg p-6">
                            <h3 className="text-xl font-bold mb-4">Why Choose Eros Worldwide?</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                {[
                                    { icon: ShieldCheck, title: 'Verified Profiles', desc: 'Every lady personally interviewed' },
                                    { icon: Globe, title: '3 Continents', desc: 'Ukraine, Colombia, Philippines' },
                                    { icon: Award, title: '30+ Years', desc: '15,200+ successful marriages' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start space-x-3">
                                        <item.icon size={24} className="text-brand-rose shrink-0" />
                                        <div>
                                            <h4 className="font-bold">{item.title}</h4>
                                            <p className="text-sm text-gray-400">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Testimonial Tabs Section */}
                        <TestimonialTabs stories={stories} />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
