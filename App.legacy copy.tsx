
import React, { useState, useEffect } from 'react';
import {
  Heart,
  Users,
  Calendar,
  ShieldCheck,
  Globe,
  Plane,
  Lock,
  Menu,
  X,
  Search,
  MapPin,
  UserPlus,
  LogOut,
  Trash2,
  Edit,
  Plus,
  Info,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  CheckCircle,
  Clock,
  Briefcase,
  PlayCircle,
  Award,
  ChevronRight,
  Database,
  Quote,
  Star,
  Phone,
  Check,
  Video,
  ExternalLink,
  ChevronDown,
  Filter,
  Mail,
  Map,
  BookOpen,
  Scale,
  Shield,
  Eye,
  Activity
} from 'lucide-react';
import { LadyProfile, GentlemanProfile, Tour, AppTab } from './types';
import { askConsultant } from './geminiService';
import { db } from './database';
import { FeaturedCarousel, LadyProfileModal, Sidebar, TestimonialTabs } from './components';

const SUCCESS_STORIES = [
  {
    id: 1,
    name: "Wayne & Elena",
    location: "Met in Kyiv, 2021",
    story: "I was skeptical about international dating until I joined the Kyiv tour. Elena was the third lady I spoke with, and we just clicked. The agency handled every visa detail. We've been married for 2 years now.",
    img: "https://images.unsplash.com/photo-1516589174184-c6858b16ecb0?auto=format&fit=crop&q=80&w=600",
    video: true
  },
  {
    id: 2,
    name: "Tim & Sofia",
    location: "Met in Bogota, 2022",
    story: "The socials in Colombia are incredible. I met Sofia at the second gala. The translators were so helpful. She moved to Chicago last year and we just celebrated our first anniversary.",
    img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600",
    video: false
  },
  {
    id: 3,
    name: "David & Mariya",
    location: "Met in Odesa, 2019",
    story: "Eros Worldwide is the only agency I trust. They physically verified Mariya before I even arrived. We have a beautiful daughter now and a life I never thought possible.",
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600",
    video: true
  }
];

const OFFICES = [
  { city: "Kyiv", country: "Ukraine", address: "14B Baseina St, Kyiv, 01004", staff: "12 Specialists", img: "https://images.unsplash.com/photo-1562133567-b6a0a9c7e6eb?auto=format&fit=crop&q=80&w=400" },
  { city: "Medellin", country: "Colombia", address: "Cl. 10 #43c-31, Medellin, Antioquia", staff: "8 Specialists", img: "https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?auto=format&fit=crop&q=80&w=400" },
  { city: "Cebu", country: "Philippines", address: "3rd Floor, Baseline Center, Cebu City", staff: "10 Specialists", img: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&q=80&w=400" },
];

const FAQ_ITEMS = [
  { q: "How are the ladies verified?", a: "Every lady on our site has been physically interviewed in our local offices. They must provide a valid government passport and sign a legal disclosure before their profile is activated." },
  { q: "What is IMBRA?", a: "The International Marriage Broker Regulation Act (IMBRA) is a US federal law that requires marriage brokers to provide foreign fiances with background checks on their US fiances. We are 100% compliant." },
  { q: "Do you provide translators?", a: "Yes. Every group social tour includes a full staff of professional translators to ensure clear and meaningful communication." },
  { q: "How long does a K-1 Visa take?", a: "Currently, the process takes 12-18 months. Our legal consultants guide you through every step of the paperwork." }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Advanced Filters
  const [ageFilter, setAgeFilter] = useState<string>('all');
  const [hairFilter, setHairFilter] = useState<string>('all');
  const [heightFilter, setHeightFilter] = useState<string>('all');

  const [ladies, setLadies] = useState<LadyProfile[]>(() => db.ladies.get());
  const [gentlemen, setGentlemen] = useState<GentlemanProfile[]>(() => db.gentlemen.get());
  const [tours, setTours] = useState<Tour[]>(() => db.tours.get());

  useEffect(() => { window.scrollTo(0, 0); }, [activeTab]);
  useEffect(() => db.ladies.save(ladies), [ladies]);
  useEffect(() => db.gentlemen.save(gentlemen), [gentlemen]);
  useEffect(() => db.tours.save(tours), [tours]);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminSubTab, setAdminSubTab] = useState<'ladies' | 'tours'>('ladies');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  const [ladyForm, setLadyForm] = useState<Partial<LadyProfile>>({ name: '', age: 0, city: '', country: '', bio: '', imageUrl: '', verified: true, height: "5'6\"", hairColor: 'Brunette' });
  const [editingLadyId, setEditingLadyId] = useState<string | null>(null);
  const [tourForm, setTourForm] = useState<Partial<Tour>>({ city: '', countries: [], startDate: '', endDate: '', checkInTime: '', price: '', status: 'Open', image: '' });
  const [editingTourId, setEditingTourId] = useState<string | null>(null);
  const [manForm, setManForm] = useState({ name: '', age: '', profession: '', location: '', bio: '' });

  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [selectedLady, setSelectedLady] = useState<LadyProfile | null>(null);

  const handleViewProfile = (lady: LadyProfile) => setSelectedLady(lady);
  const handleCloseProfile = () => setSelectedLady(null);
  const handleExpressInterest = (ladyId: string) => {
    alert(`Interest expressed for lady ID: ${ladyId}. Please complete your registration first.`);
    setSelectedLady(null);
    setActiveTab('gentlemen');
  };

  const filteredLadies = ladies.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.city.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesAge = true;
    if (ageFilter === '18-25') matchesAge = l.age >= 18 && l.age <= 25;
    else if (ageFilter === '26-33') matchesAge = l.age >= 26 && l.age <= 33;
    else if (ageFilter === '34-40') matchesAge = l.age >= 34 && l.age <= 40;

    const matchesHair = hairFilter === 'all' || l.hairColor === hairFilter;
    const matchesHeight = heightFilter === 'all' || l.height.includes(heightFilter);

    return matchesSearch && matchesAge && matchesHair && matchesHeight;
  });

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'password123') setIsAdminLoggedIn(true);
    else alert("Invalid credentials.");
  };

  const handleConsultant = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    const result = await askConsultant(aiPrompt);
    setAiResponse(result || "Busy.");
    setIsAiLoading(false);
  };

  const handleManRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    const newMan: GentlemanProfile = {
      id: Math.random().toString(36).substr(2, 9),
      name: manForm.name,
      age: parseInt(manForm.age) || 0,
      profession: manForm.profession || 'Not Specified',
      location: manForm.location || 'Not Specified',
      bio: manForm.bio,
      registrationDate: new Date().toLocaleDateString(),
    };
    setGentlemen([...gentlemen, newMan]);
    setManForm({ name: '', age: '', profession: '', location: '', bio: '' });
    alert("Introductory profile submitted.");
  };

  const saveLady = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLadyId) {
      setLadies(ladies.map(l => l.id === editingLadyId ? { ...l, ...ladyForm } as LadyProfile : l));
      setEditingLadyId(null);
    } else {
      const newLady: LadyProfile = { ...ladyForm, id: Math.random().toString(36).substr(2, 9), verified: true } as LadyProfile;
      setLadies([...ladies, newLady]);
    }
    setLadyForm({ name: '', age: 0, city: '', country: '', bio: '', imageUrl: '', verified: true, height: "5'6\"", hairColor: 'Brunette' });
  };

  const saveTour = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTourId) {
      setTours(tours.map(t => t.id === editingTourId ? { ...t, ...tourForm } as Tour : t));
      setEditingTourId(null);
    } else {
      const newTour: Tour = { ...tourForm, id: Math.random().toString(36).substr(2, 9), countries: [], status: 'Open' } as Tour;
      setTours([...tours, newTour]);
    }
    setTourForm({ city: '', countries: [], startDate: '', endDate: '', checkInTime: '', price: '', status: 'Open', image: '' });
  };

  const renderSectionHeader = (title: string, subtitle: string, icon?: React.ReactNode) => (
    <div className="text-center max-w-4xl mx-auto mb-20 space-y-4">
      <div className="flex justify-center mb-4">{icon}</div>
      <h2 className="text-5xl lg:text-7xl font-black text-[#1A1D29] font-serif leading-none tracking-tight italic">{title}</h2>
      <div className="w-24 h-1.5 bg-[#E8475F] mx-auto rounded-full mb-6"></div>
      <p className="text-slate-500 text-xl font-light leading-relaxed">{subtitle}</p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f1f3f5]">

      {/* Lady Profile Modal */}
      {selectedLady && (
        <LadyProfileModal
          lady={selectedLady}
          onClose={handleCloseProfile}
          onExpressInterest={handleExpressInterest}
        />
      )}

      {/* TOP BAR - Corporate Style */}
      <div className="bg-[#1A1D29] text-white py-2 px-4 lg:px-6 flex flex-col md:flex-row justify-between items-center text-[11px] font-semibold tracking-wide">
        <div className="flex space-x-6 items-center">
          <span className="flex items-center text-[#E8475F]"><Phone size={12} className="mr-1.5" /> (800) 123-MATCH</span>
          <span className="hidden lg:flex items-center"><Activity size={12} className="mr-1.5 text-green-400" /> 35,420 Active Ladies</span>
          <span className="hidden lg:flex items-center"><Award size={12} className="mr-1.5 text-[#E8475F]" /> 15,200+ Marriages Since 1995</span>
        </div>
        <div className="flex space-x-4 mt-1 md:mt-0">
          <button onClick={() => setActiveTab('reviews')} className="hover:text-[#E8475F] flex items-center transition-colors"><Video size={11} className="mr-1" /> Video Proof</button>
          <button onClick={() => setActiveTab('legal')} className="hover:text-[#E8475F] flex items-center transition-colors"><Shield size={11} className="mr-1" /> IMBRA</button>
          <button onClick={() => setActiveTab('admin')} className="text-gray-400 hover:text-white flex items-center transition-colors"><Lock size={11} className="mr-1" /> Staff</button>
        </div>
      </div>

      {/* MAIN NAVIGATION - Clean White Header */}
      <nav className="bg-white text-gray-800 sticky top-0 z-50 shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="bg-[#E8475F] p-2 rounded-lg">
                <Heart fill="currentColor" className="text-white" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight leading-none text-[#1A1D29]">EROS<span className="text-[#E8475F]">.</span>WORLDWIDE</span>
                <span className="text-[9px] font-medium tracking-wider text-gray-500 uppercase">Verified International Introductions</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-1">
              {[
                { id: 'home', label: 'The Journey' },
                { id: 'tours', label: 'Tour Dates' },
                { id: 'ladies', label: 'Verified Ladies' },
                { id: 'testimonials', label: 'Success Stories' },
                { id: 'offices', label: 'Offices' },
                { id: 'faq', label: 'FAQ' },
                { id: 'contact', label: 'Contact' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as AppTab)}
                  className={`px-3 py-2 text-[13px] font-medium rounded-lg transition-all ${activeTab === item.id ? 'bg-[#E8475F]/10 text-[#E8475F]' : 'text-gray-600 hover:bg-gray-100 hover:text-[#1A1D29]'}`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => setActiveTab('gentlemen')}
                className="ml-4 bg-[#E8475F] text-white px-5 py-2 rounded-lg text-[13px] font-bold uppercase tracking-wide hover:bg-[#D93A50] transition-all shadow-md shadow-[#E8475F]/30"
              >
                Join Free
              </button>
            </div>

            <button className="lg:hidden p-2 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Premium Style */}
      {isMobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 bottom-0 w-72 bg-white z-50 lg:hidden shadow-xl">
            <div className="p-5">
              <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <span className="text-lg font-bold text-[#1A1D29]">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1"><X size={22} /></button>
              </div>
              <nav className="space-y-1">
                {[
                  { id: 'home', label: 'The Journey' },
                  { id: 'tours', label: 'Tour Dates' },
                  { id: 'ladies', label: 'Verified Ladies' },
                  { id: 'testimonials', label: 'Success Stories' },
                  { id: 'offices', label: 'Offices' },
                  { id: 'faq', label: 'FAQ' },
                  { id: 'contact', label: 'Contact' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id as AppTab); setIsMobileMenuOpen(false); }}
                    className={`block w-full text-left py-3 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === item.id ? 'bg-[#E8475F] text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
              <button
                onClick={() => { setActiveTab('gentlemen'); setIsMobileMenuOpen(false); }}
                className="w-full mt-6 bg-[#E8475F] text-white py-3 rounded-lg text-sm font-bold uppercase shadow-md"
              >
                Join Free
              </button>
            </div>
          </div>
        </>
      )}

      <main className="flex-grow">
        {/* HOME - Corporate Layout with Sidebar */}
        {activeTab === 'home' && (
          <div className="animate-in fade-in duration-300">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="flex flex-col lg:flex-row gap-6">

                {/* LEFT SIDEBAR */}
                <aside className="lg:w-64 shrink-0 space-y-4">
                  {/* Quick Links */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-[#1A1D29] text-white px-4 py-3 text-xs font-bold uppercase tracking-wide">The Journey</div>
                    <div className="p-3 space-y-1">
                      {[
                        { label: 'Our Philosophy', icon: BookOpen, tab: 'philosophy' },
                        { label: 'Tour Schedule', icon: Calendar, tab: 'tours' },
                        { label: 'Success Stories', icon: Award, tab: 'testimonials' },
                        { label: 'Video Reviews', icon: Video, tab: 'reviews' },
                      ].map((link, i) => (
                        <button key={i} onClick={() => setActiveTab(link.tab as any)} className="flex items-center w-full text-left py-2 px-3 text-[13px] font-medium text-gray-600 hover:bg-gray-50 hover:text-[#1A1D29] rounded transition-all">
                          <link.icon size={14} className="mr-2 text-gray-400" />
                          {link.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* IMBRA Compliance Box */}
                  <div className="bg-[#1A1D29] text-white p-5 rounded-lg">
                    <div className="flex items-center mb-3">
                      <Shield size={20} className="text-[#E8475F] mr-2" />
                      <span className="text-xs font-bold uppercase tracking-wide">IMBRA Compliant</span>
                    </div>
                    <p className="text-[12px] leading-relaxed text-gray-300 mb-4">100% compliant with US Federal laws. Full background checks.</p>
                    <button onClick={() => setActiveTab('legal')} className="w-full bg-[#E8475F] text-[#1A1D29] text-[11px] font-bold uppercase py-2 rounded hover:bg-[#F06B7E] transition-all">Learn More</button>
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-xs font-bold text-gray-500 uppercase mb-3">Quick Stats</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">Active Ladies</span><span className="font-bold text-[#1A1D29]">35,420</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Marriages 2024</span><span className="font-bold text-green-600">847</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Upcoming Tours</span><span className="font-bold text-[#E8475F]">6</span></div>
                    </div>
                  </div>
                </aside>

                {/* MAIN CONTENT */}
                {/* MAIN CONTENT AREA - Dense like established portal */}
                <div className="space-y-4">

                  {/* HERO BANNER - Matching Reference Design */}
                  <div className="relative rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A1D29 0%, #2D3142 35%, #6B7280 70%, #D1D5DB 100%)' }}>
                    <div className="relative z-10 p-8 lg:p-12">
                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 bg-[#E8475F]/15 border border-[#E8475F]/30 rounded-full px-4 py-1.5 mb-6">
                        <ShieldCheck size={14} className="text-[#E8475F]" />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-white">Verified International Introductions</span>
                      </div>

                      {/* Main Headline - Serif Typography */}
                      <h1 className="font-serif text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6">
                        Real Love<br />
                        Knows No <span className="text-[#E8475F]">Borders.</span>
                      </h1>

                      {/* Subtitle */}
                      <p className="text-gray-300 text-base lg:text-lg max-w-xl mb-8 leading-relaxed">
                        Escape the endless scroll of dating apps. Join us for a curated,
                        professional journey to meet the world's most family-oriented
                        women in person.
                      </p>

                      {/* CTA Buttons */}
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => setActiveTab('tours')}
                          className="inline-flex items-center gap-2 bg-[#E8475F] text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-[#D93A50] transition-all shadow-lg shadow-[#E8475F]/30"
                        >
                          View 2025 Schedule
                          <Plane size={16} />
                        </button>
                        <button
                          onClick={() => setActiveTab('ladies')}
                          className="inline-flex items-center gap-2 bg-[#374151] text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-[#4B5563] transition-all"
                        >
                          Browse Ladies
                          <Users size={16} />
                        </button>
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
                          <p className="text-2xl font-bold text-[#10B981]">100%</p>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">IMBRA Compliant</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* THREE COLUMN GRID - Like AFA */}
                  <div className="grid lg:grid-cols-3 gap-4">

                    {/* Column 1: Quick Search */}
                    <div className="bg-white border border-gray-200 rounded-lg">
                      <div className="bg-[#1A1D29] text-white px-4 py-2 text-sm font-bold flex justify-between items-center">
                        <span>Quick Search</span>
                        <span className="text-[#E8475F] text-xs">{ladies.length.toLocaleString()} Active Profiles</span>
                      </div>
                      <div className="p-4 space-y-3">
                        <p className="text-xs text-gray-500">As of our <span className="text-[#1A1D29] font-bold">Wednesday Updates</span></p>
                        <div className="grid grid-cols-2 gap-2">
                          <select className="text-sm border rounded px-2 py-1.5">
                            <option>Age: 18-25</option>
                            <option>Age: 26-33</option>
                            <option>Age: 34-45</option>
                          </select>
                          <select className="text-sm border rounded px-2 py-1.5">
                            <option>All Countries</option>
                            <option>Ukraine</option>
                            <option>Colombia</option>
                            <option>Philippines</option>
                          </select>
                        </div>
                        <button onClick={() => setActiveTab('ladies')} className="w-full bg-[#28a745] text-white py-2 rounded text-sm font-bold hover:bg-green-600">
                          Search Now
                        </button>
                        <p className="text-[10px] text-center text-gray-400">100% Verified REAL Profiles</p>
                        <button onClick={() => setActiveTab('ladies')} className="w-full text-[#1A1D29] text-xs font-bold hover:underline">
                          Use Advanced Search →
                        </button>
                      </div>
                    </div>

                    {/* Column 2: Upcoming Events */}
                    <div className="bg-white border border-gray-200 rounded-lg">
                      <div className="bg-[#1A1D29] text-white px-4 py-2 text-sm font-bold">
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
                              <span className="text-[#1A1D29] font-medium">{event.city}</span>
                              <span className="text-gray-400 text-xs">{event.date}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-[10px] text-gray-400 mt-2">(602) 553-8178 Ext. 0 • RSVP Required</p>
                        <button onClick={() => setActiveTab('contact')} className="w-full mt-2 text-[#1A1D29] text-xs font-bold hover:underline">
                          View All Seminars & RSVP →
                        </button>
                      </div>
                    </div>

                    {/* Column 3: Upcoming Tours */}
                    <div className="bg-white border border-gray-200 rounded-lg">
                      <div className="bg-[#E8475F] text-[#1A1D29] px-4 py-2 text-sm font-bold">
                        Upcoming Singles Tours
                      </div>
                      <div className="p-3">
                        <ul className="space-y-2">
                          {tours.slice(0, 4).map((tour, i) => (
                            <li key={i} className="flex items-center space-x-2 py-1 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 -mx-3 px-3" onClick={() => setActiveTab('tours')}>
                              <img src={tour.image} alt={tour.city} className="w-10 h-10 rounded object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                              <div className="flex-grow">
                                <p className="text-sm font-medium text-[#1A1D29]">{tour.city}</p>
                                <p className="text-[10px] text-gray-400">{tour.startDate}</p>
                              </div>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded ${tour.status === 'Filling Fast' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                {tour.status}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <button onClick={() => setActiveTab('tours')} className="w-full mt-3 bg-[#1A1D29] text-white py-2 rounded text-sm font-bold hover:bg-[#2D3142]">
                          View All Romance Tours
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* LIVE WEBCAST BANNER */}
                  <div className="bg-gradient-to-r from-[#1A1D29] to-[#2D3142] text-white rounded-lg p-4 flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center space-x-4 mb-3 md:mb-0">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                        <Video size={24} />
                      </div>
                      <div>
                        <p className="font-bold">International Dating Webcast</p>
                        <p className="text-sm text-gray-300">LIVE Every Monday & Wednesday 7:30 PM ET</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-red-500 text-white px-4 py-2 rounded text-sm font-bold hover:bg-red-600">
                        Join Live Now
                      </button>
                      <button onClick={() => setActiveTab('reviews')} className="bg-white/10 text-white px-4 py-2 rounded text-sm font-bold border border-white/20 hover:bg-white/20">
                        Watch Past Episodes
                      </button>
                    </div>
                  </div>

                  {/* SUCCESS STORIES GRID */}
                  <div className="bg-white border border-gray-200 rounded-lg">
                    <div className="bg-[#1A1D29] text-white px-4 py-2 text-sm font-bold flex justify-between items-center">
                      <span>Recent Success Stories</span>
                      <button onClick={() => setActiveTab('testimonials')} className="text-[#E8475F] text-xs hover:underline">View All 847 Stories →</button>
                    </div>
                    <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                      {SUCCESS_STORIES.filter(s => s.video).slice(0, 4).map((story, i) => (
                        <div key={i} className="group cursor-pointer" onClick={() => setActiveTab('reviews')}>
                          <div className="aspect-video bg-gray-100 rounded overflow-hidden relative">
                            <img src={story.img} alt={story.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <PlayCircle size={32} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                            </div>
                          </div>
                          <p className="text-xs font-medium mt-1 text-[#1A1D29]">{story.name}</p>
                          <p className="text-[10px] text-gray-400">{story.location}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4-STEP PROCESS */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-[#1A1D29]">How It Works</h2>
                      <p className="text-gray-500 text-sm">Our proven 4-step process to marriage</p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { title: "Register", desc: "Create profile & background check", icon: UserPlus },
                        { title: "Browse", desc: "35,000+ verified ladies", icon: Search },
                        { title: "Travel", desc: "Join a Romance Tour", icon: Plane },
                        { title: "Marry", desc: "Visa & legal support", icon: Heart },
                      ].map((step, i) => (
                        <div key={i} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-[#1A1D29] hover:text-white group transition-all">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 shadow group-hover:bg-[#E8475F]">
                            <step.icon size={24} className="text-[#1A1D29] group-hover:text-white" />
                          </div>
                          <span className="text-xs font-bold text-[#E8475F] group-hover:text-[#E8475F]">Step {i + 1}</span>
                          <h4 className="font-bold text-sm">{step.title}</h4>
                          <p className="text-xs text-gray-500 group-hover:text-gray-300 mt-1">{step.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Media Partners */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-center text-xs font-bold uppercase text-gray-400 tracking-wider mb-4">As Featured In</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 grayscale opacity-50">
                      <span className="text-xl font-bold">CNN</span>
                      <span className="text-xl font-bold">DISCOVERY</span>
                      <span className="text-xl font-bold">TODAY</span>
                      <span className="text-xl font-bold">ABC NEWS</span>
                      <span className="text-xl font-bold">NAT GEO</span>
                    </div>
                  </div>

                  {/* Featured Ladies */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <FeaturedCarousel ladies={ladies} onViewProfile={handleViewProfile} />
                  </div>


                  {/* Testimonial Tabs Section */}
                  <TestimonialTabs stories={SUCCESS_STORIES} />

                </div>
              </div>
            </div>
          </div>
        )}

        {/* LADIES SEARCH - Advanced Filtering */}
        {activeTab === 'ladies' && (
          <div className="py-6 px-4 lg:px-6 max-w-7xl mx-auto animate-in fade-in duration-300">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar Filters */}
              <aside className="lg:w-56 shrink-0">
                <div className="bg-white border border-gray-200 rounded-lg sticky top-20">
                  <div className="bg-[#1A1D29] text-white px-4 py-2 text-sm font-bold flex items-center">
                    <Filter size={14} className="mr-2" /> Advanced Search
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Age Range</label>
                      <select value={ageFilter} onChange={e => setAgeFilter(e.target.value)} className="w-full mt-1 border border-gray-200 rounded px-3 py-2 text-sm">
                        <option value="all">Any Age</option>
                        <option value="18-25">18 - 25</option>
                        <option value="26-33">26 - 33</option>
                        <option value="34-40">34 - 40</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Hair Color</label>
                      <select value={hairFilter} onChange={e => setHairFilter(e.target.value)} className="w-full mt-1 border border-gray-200 rounded px-3 py-2 text-sm">
                        <option value="all">Any Color</option>
                        <option value="Blonde">Blonde</option>
                        <option value="Brunette">Brunette</option>
                        <option value="Black">Black</option>
                        <option value="Red">Red</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Height</label>
                      <select value={heightFilter} onChange={e => setHeightFilter(e.target.value)} className="w-full mt-1 border border-gray-200 rounded px-3 py-2 text-sm">
                        <option value="all">Any Height</option>
                        <option value="5'0">5'0"+</option>
                        <option value="5'5">5'5"+</option>
                        <option value="5'9">5'9"+</option>
                      </select>
                    </div>
                    <button onClick={() => { setAgeFilter('all'); setHairFilter('all'); setHeightFilter('all'); setSearchQuery(''); }} className="w-full text-xs text-[#1A1D29] font-bold hover:underline">
                      Reset Filters
                    </button>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-grow">
                {/* Search Bar */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        placeholder="Search by ID, name, or city..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <span className="text-sm text-gray-500">{filteredLadies.length} results</span>
                  </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {filteredLadies.map(lady => (
                    <div key={lady.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden group hover:shadow-md transition-all cursor-pointer" onClick={() => handleViewProfile(lady)}>
                      <div className="aspect-[3/4] overflow-hidden relative">
                        <img src={lady.imageUrl} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" alt={lady.name} onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'; }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-2 left-2">
                          <span className="bg-green-500 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center">
                            <ShieldCheck size={10} className="mr-1" /> Verified
                          </span>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 text-white">
                          <h3 className="text-sm font-bold">{lady.name}, {lady.age}</h3>
                          <div className="flex items-center text-[10px] opacity-90">
                            <MapPin size={10} className="mr-1" /> {lady.city}
                          </div>
                        </div>
                      </div>
                      <div className="px-2 py-1.5 bg-gray-50 flex justify-between items-center">
                        <span className="text-[10px] text-gray-500">ID: {lady.id}00X</span>
                        <span className="text-[10px] font-bold text-[#1A1D29]">View →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
        }

        {/* OFFICES VIEW */}
        {activeTab === 'offices' && (
          <div className="py-6 px-4 lg:px-6 max-w-7xl mx-auto animate-in fade-in duration-300">
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
              <h1 className="text-xl font-bold text-[#1A1D29]">Global Office Network</h1>
              <p className="text-sm text-gray-500">Direct agency infrastructure in 12 countries. Only Eros Worldwide certified staff.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {OFFICES.map((office, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all">
                  <div className="h-36 overflow-hidden relative">
                    <img src={office.img} className="w-full h-full object-cover" alt={office.city} />
                    <div className="absolute top-2 left-2">
                      <span className="bg-[#1A1D29] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase">Direct Office</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-[#1A1D29]">{office.city}</h3>
                    <p className="text-xs text-[#E8475F] font-bold uppercase">{office.country}</p>
                    <div className="mt-3 space-y-1 text-sm text-gray-600">
                      <div className="flex items-start"><Map size={14} className="mr-2 text-gray-400 shrink-0 mt-0.5" /> <span className="text-xs">{office.address}</span></div>
                      <div className="flex items-center"><Users size={14} className="mr-2 text-gray-400" /> {office.staff} Staff</div>
                    </div>
                    <button className="w-full mt-3 bg-[#1A1D29] text-white py-2 rounded text-sm font-bold hover:bg-[#2D3142] transition-all">Contact Office</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PHILOSOPHY PAGE */}
        {activeTab === 'philosophy' && (
          <div className="py-6 px-4 lg:px-6 max-w-4xl mx-auto animate-in fade-in duration-300">
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
              <h1 className="text-xl font-bold text-[#1A1D29]">Our Philosophy</h1>
              <p className="text-sm text-gray-500">Why physical integrity and traditional values are the foundation of love.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <Quote size={32} className="text-[#E8475F] mb-4" />
                <p className="text-lg italic text-[#1A1D29] leading-relaxed">"We don't sell 'dating'. We facilitate the creation of lifelong legacies. In an age of digital phantoms, Eros Worldwide is the physical reality of international romance."</p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center space-x-4">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200" className="w-12 h-12 rounded-full object-cover border-2 border-[#E8475F]" alt="CEO" />
                  <div>
                    <h4 className="font-bold text-[#1A1D29]">Christopher Vance</h4>
                    <p className="text-xs text-gray-400 uppercase">Global Executive Director</p>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-gray-600 text-sm leading-relaxed space-y-4">
                <p>Established in 1995, our network was built on a simple observation: modern digital matchmaking fails to filter for actual intent and physical integrity. We restored the traditional marriage agency model by investing in 12 physical offices globally.</p>
                <p>Every woman you see on this platform has sat in our office, presented her identity documents, and completed a values-based interview with our local staff.</p>
              </div>
            </div>
          </div>
        )}

        {/* LEGAL / IMBRA PAGE */}
        {activeTab === 'legal' && (
          <div className="py-6 px-4 lg:px-6 max-w-4xl mx-auto animate-in fade-in duration-300">
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
              <h1 className="text-xl font-bold text-[#1A1D29]">IMBRA & Safety Compliance</h1>
              <p className="text-sm text-gray-500">Protecting our members with the highest legal standards.</p>
            </div>
            <div className="space-y-3">
              {[
                { title: "IMBRA Compliance", desc: "The International Marriage Broker Regulation Act (IMBRA) of 2005 is strictly followed. We require all US-based fiancés to provide a legal background check to their foreign partners.", icon: ShieldCheck },
                { title: "Anti-Fraud Shield", desc: "Our 12 global offices allow us to verify the reality of every user. We do not tolerate 'professional daters' or financial scams.", icon: ShieldAlert },
                { title: "Privacy Safeguard", desc: "Your personal details are encrypted and only released with your explicit permission to pre-screened matches.", icon: Lock }
              ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 flex items-start space-x-4">
                  <div className="bg-[#1A1D29] text-white p-2 rounded"><item.icon size={20} /></div>
                  <div>
                    <h3 className="font-bold text-[#1A1D29]">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TESTIMONIALS / SUCCESS STORIES */}
        {activeTab === 'testimonials' && (
          <div className="py-6 px-4 lg:px-6 max-w-7xl mx-auto animate-in fade-in duration-300">
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-[#1A1D29]">Success Stories</h1>
                  <p className="text-sm text-gray-500">847 verified marriages since 1995</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-[#1A1D29] text-white px-3 py-1.5 rounded text-xs font-bold">All Stories</button>
                  <button className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded text-xs font-bold hover:bg-gray-200">Videos Only</button>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SUCCESS_STORIES.map((story) => (
                <div key={story.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all">
                  <div className="h-48 overflow-hidden relative">
                    <img src={story.img} className="w-full h-full object-cover" alt={story.name} />
                    {story.video && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="bg-white rounded-full p-3 shadow-lg"><PlayCircle size={32} className="text-[#1A1D29]" /></div>
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <span className="bg-green-500 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase">Verified</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-[#1A1D29]">{story.name}</h3>
                    <p className="text-xs text-gray-400 uppercase">{story.location}</p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">"{story.story}"</p>
                    <button className="mt-3 text-xs font-bold text-[#E8475F] hover:underline">Read Full Story →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TOURS PAGE */}
        {activeTab === 'tours' && (
          <div className="py-6 px-4 lg:px-6 max-w-7xl mx-auto animate-in fade-in duration-300">
            {/* Header */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
              <h1 className="text-xl font-bold text-[#1A1D29]">Romance Tours 2025</h1>
              <p className="text-sm text-gray-500">Join our exclusive group socials and meet hundreds of verified ladies in person.</p>
            </div>

            {/* Tour Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tours.map(tour => (
                <div key={tour.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all">
                  <div className="h-40 overflow-hidden relative">
                    <img src={tour.image} className="w-full h-full object-cover" alt={tour.city} onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600'; }} />
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${tour.status === 'Open' ? 'bg-green-500 text-white' : tour.status === 'Filling Fast' ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'}`}>
                        {tour.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-[#1A1D29]">{tour.city}</h3>
                    <p className="text-xs text-[#E8475F] font-bold uppercase">{tour.countries.join(' & ')}</p>
                    <div className="mt-3 space-y-1 text-sm text-gray-600">
                      <div className="flex items-center"><Calendar size={14} className="mr-2 text-gray-400" /> {tour.startDate} - {tour.endDate}</div>
                      <div className="flex items-center"><Users size={14} className="mr-2 text-gray-400" /> Small Group (Max 20)</div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                      <span className="text-lg font-bold text-[#1A1D29]">{tour.price}</span>
                      <button className="bg-[#1A1D29] text-white px-4 py-2 rounded text-sm font-bold hover:bg-[#2D3142] transition-all">Reserve</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GENTLEMEN REGISTRATION */}
        {activeTab === 'gentlemen' && (
          <div className="py-6 px-4 max-w-2xl mx-auto animate-in fade-in duration-300">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-[#1A1D29] text-white px-6 py-4">
                <h1 className="text-lg font-bold">Free Registration</h1>
                <p className="text-sm text-gray-300">Join thousands of men who found love through our services.</p>
              </div>
              <form onSubmit={handleManRegistration} className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Full Name *</label>
                    <input type="text" required value={manForm.name} onChange={e => setManForm({ ...manForm, name: e.target.value })} className="w-full mt-1 border border-gray-200 rounded px-3 py-2 text-sm" placeholder="John Smith" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Age *</label>
                    <input type="number" required min={25} max={80} value={manForm.age} onChange={e => setManForm({ ...manForm, age: e.target.value })} className="w-full mt-1 border border-gray-200 rounded px-3 py-2 text-sm" placeholder="35" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Profession</label>
                    <input type="text" value={manForm.profession} onChange={e => setManForm({ ...manForm, profession: e.target.value })} className="w-full mt-1 border border-gray-200 rounded px-3 py-2 text-sm" placeholder="Engineer" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Location</label>
                    <input type="text" value={manForm.location} onChange={e => setManForm({ ...manForm, location: e.target.value })} className="w-full mt-1 border border-gray-200 rounded px-3 py-2 text-sm" placeholder="New York, USA" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">About You</label>
                  <textarea rows={4} value={manForm.bio} onChange={e => setManForm({ ...manForm, bio: e.target.value })} className="w-full mt-1 border border-gray-200 rounded px-3 py-2 text-sm resize-none" placeholder="Tell us about yourself..." />
                </div>
                <button type="submit" className="w-full bg-[#28a745] text-white py-3 rounded font-bold text-sm uppercase hover:bg-green-600 transition-all">
                  Submit Free Registration
                </button>
                <p className="text-center text-xs text-gray-400">By registering, you agree to our terms and IMBRA compliance.</p>
              </form>
            </div>
          </div>
        )}

        {/* ADMIN PANEL */}
        {
          activeTab === 'admin' && (
            <div className="py-24 px-4 lg:px-8 max-w-6xl mx-auto animate-in fade-in duration-700">
              {!isAdminLoggedIn ? (
                <div className="max-w-md mx-auto">
                  {renderSectionHeader("Agent Portal", "Staff-only access to manage profiles and tours.", <Lock size={48} className="text-[#E8475F]" />)}
                  <form onSubmit={handleAdminLogin} className="bg-white p-12 rounded-[3rem] shadow-2xl space-y-8">
                    <input type="text" placeholder="Username" value={loginForm.username} onChange={e => setLoginForm({ ...loginForm, username: e.target.value })} className="w-full bg-slate-50 px-6 py-5 rounded-2xl border-2 border-transparent focus:border-[#E8475F] outline-none font-bold" />
                    <input type="password" placeholder="Password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} className="w-full bg-slate-50 px-6 py-5 rounded-2xl border-2 border-transparent focus:border-[#E8475F] outline-none font-bold" />
                    <button type="submit" className="w-full bg-[#1A1D29] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#E8475F] hover:text-[#1A1D29] transition-all">Login</button>
                  </form>
                </div>
              ) : (
                <div className="space-y-12">
                  <div className="flex justify-between items-center">
                    <h2 className="text-4xl font-black font-serif">Admin Dashboard</h2>
                    <button onClick={() => setIsAdminLoggedIn(false)} className="flex items-center text-slate-500 hover:text-red-500 font-bold"><LogOut size={20} className="mr-2" /> Logout</button>
                  </div>
                  <div className="flex space-x-4 border-b">
                    <button onClick={() => setAdminSubTab('ladies')} className={`py-4 px-8 font-black uppercase text-sm ${adminSubTab === 'ladies' ? 'border-b-4 border-[#E8475F] text-[#1A1D29]' : 'text-slate-400'}`}>Manage Ladies</button>
                    <button onClick={() => setAdminSubTab('tours')} className={`py-4 px-8 font-black uppercase text-sm ${adminSubTab === 'tours' ? 'border-b-4 border-[#E8475F] text-[#1A1D29]' : 'text-slate-400'}`}>Manage Tours</button>
                  </div>
                  {adminSubTab === 'ladies' && (
                    <div className="grid lg:grid-cols-2 gap-12">
                      <form onSubmit={saveLady} className="bg-white p-10 rounded-[3rem] shadow-lg space-y-6 border">
                        <h3 className="text-xl font-black flex items-center"><Plus size={20} className="mr-2 text-[#E8475F]" /> {editingLadyId ? 'Edit Lady' : 'Add New Lady'}</h3>
                        <input type="text" placeholder="Name" required value={ladyForm.name || ''} onChange={e => setLadyForm({ ...ladyForm, name: e.target.value })} className="w-full bg-slate-50 px-5 py-4 rounded-xl border-2 border-transparent focus:border-[#E8475F] outline-none font-bold" />
                        <div className="grid grid-cols-2 gap-4">
                          <input type="number" placeholder="Age" required value={ladyForm.age || ''} onChange={e => setLadyForm({ ...ladyForm, age: parseInt(e.target.value) })} className="w-full bg-slate-50 px-5 py-4 rounded-xl border-2 border-transparent focus:border-[#E8475F] outline-none font-bold" />
                          <input type="text" placeholder="City" required value={ladyForm.city || ''} onChange={e => setLadyForm({ ...ladyForm, city: e.target.value })} className="w-full bg-slate-50 px-5 py-4 rounded-xl border-2 border-transparent focus:border-[#E8475F] outline-none font-bold" />
                        </div>
                        <input type="text" placeholder="Country" required value={ladyForm.country || ''} onChange={e => setLadyForm({ ...ladyForm, country: e.target.value })} className="w-full bg-slate-50 px-5 py-4 rounded-xl border-2 border-transparent focus:border-[#E8475F] outline-none font-bold" />
                        <input type="url" placeholder="Image URL" required value={ladyForm.imageUrl || ''} onChange={e => setLadyForm({ ...ladyForm, imageUrl: e.target.value })} className="w-full bg-slate-50 px-5 py-4 rounded-xl border-2 border-transparent focus:border-[#E8475F] outline-none font-bold" />
                        <textarea placeholder="Bio" rows={3} value={ladyForm.bio || ''} onChange={e => setLadyForm({ ...ladyForm, bio: e.target.value })} className="w-full bg-slate-50 px-5 py-4 rounded-xl border-2 border-transparent focus:border-[#E8475F] outline-none font-bold resize-none" />
                        <button type="submit" className="w-full bg-[#E8475F] text-[#1A1D29] py-4 rounded-xl font-black uppercase">{editingLadyId ? 'Update' : 'Add Lady'}</button>
                      </form>
                      <div className="space-y-4 max-h-[600px] overflow-auto">
                        {ladies.map(lady => (
                          <div key={lady.id} className="bg-white p-6 rounded-2xl border flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <img src={lady.imageUrl} className="w-16 h-16 rounded-full object-cover" alt={lady.name} />
                              <div><h4 className="font-bold">{lady.name}, {lady.age}</h4><p className="text-sm text-slate-500">{lady.city}</p></div>
                            </div>
                            <div className="flex space-x-2">
                              <button onClick={() => { setLadyForm(lady); setEditingLadyId(lady.id); }} className="p-2 hover:bg-slate-100 rounded-lg"><Edit size={18} /></button>
                              <button onClick={() => setLadies(ladies.filter(l => l.id !== lady.id))} className="p-2 hover:bg-red-100 text-red-500 rounded-lg"><Trash2 size={18} /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {adminSubTab === 'tours' && (
                    <div className="grid lg:grid-cols-2 gap-12">
                      <form onSubmit={saveTour} className="bg-white p-10 rounded-[3rem] shadow-lg space-y-6 border">
                        <h3 className="text-xl font-black flex items-center"><Plus size={20} className="mr-2 text-[#E8475F]" /> {editingTourId ? 'Edit Tour' : 'Add New Tour'}</h3>
                        <input type="text" placeholder="City" required value={tourForm.city || ''} onChange={e => setTourForm({ ...tourForm, city: e.target.value })} className="w-full bg-slate-50 px-5 py-4 rounded-xl border-2 border-transparent focus:border-[#E8475F] outline-none font-bold" />
                        <div className="grid grid-cols-2 gap-4">
                          <input type="date" placeholder="Start Date" required value={tourForm.startDate || ''} onChange={e => setTourForm({ ...tourForm, startDate: e.target.value })} className="w-full bg-slate-50 px-5 py-4 rounded-xl border-2 border-transparent focus:border-[#E8475F] outline-none font-bold" />
                          <input type="date" placeholder="End Date" required value={tourForm.endDate || ''} onChange={e => setTourForm({ ...tourForm, endDate: e.target.value })} className="w-full bg-slate-50 px-5 py-4 rounded-xl border-2 border-transparent focus:border-[#E8475F] outline-none font-bold" />
                        </div>
                        <input type="text" placeholder="Price (e.g., $2,995)" required value={tourForm.price || ''} onChange={e => setTourForm({ ...tourForm, price: e.target.value })} className="w-full bg-slate-50 px-5 py-4 rounded-xl border-2 border-transparent focus:border-[#E8475F] outline-none font-bold" />
                        <input type="url" placeholder="Image URL" value={tourForm.image || ''} onChange={e => setTourForm({ ...tourForm, image: e.target.value })} className="w-full bg-slate-50 px-5 py-4 rounded-xl border-2 border-transparent focus:border-[#E8475F] outline-none font-bold" />
                        <button type="submit" className="w-full bg-[#E8475F] text-[#1A1D29] py-4 rounded-xl font-black uppercase">{editingTourId ? 'Update' : 'Add Tour'}</button>
                      </form>
                      <div className="space-y-4">
                        {tours.map(tour => (
                          <div key={tour.id} className="bg-white p-6 rounded-2xl border flex items-center justify-between">
                            <div><h4 className="font-bold">{tour.city}</h4><p className="text-sm text-slate-500">{tour.startDate} • {tour.price}</p></div>
                            <div className="flex space-x-2">
                              <button onClick={() => { setTourForm(tour); setEditingTourId(tour.id); }} className="p-2 hover:bg-slate-100 rounded-lg"><Edit size={18} /></button>
                              <button onClick={() => setTours(tours.filter(t => t.id !== tour.id))} className="p-2 hover:bg-red-100 text-red-500 rounded-lg"><Trash2 size={18} /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        }

        {/* VIDEO REVIEWS PAGE */}
        {activeTab === 'reviews' && (
          <div className="py-6 px-4 lg:px-6 max-w-7xl mx-auto animate-in fade-in duration-300">
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
              <h1 className="text-xl font-bold text-[#1A1D29]">Video Testimonials</h1>
              <p className="text-sm text-gray-500">Real men share their journey to finding love through our tours.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SUCCESS_STORIES.filter(s => s.video).map(story => (
                <div key={story.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all">
                  <div className="aspect-video relative overflow-hidden">
                    <img src={story.img} className="w-full h-full object-cover" alt={story.name} />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors">
                      <div className="bg-white rounded-full p-3 shadow-lg"><PlayCircle size={32} className="text-[#1A1D29]" /></div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-[#1A1D29]">{story.name}</h3>
                    <p className="text-xs text-[#E8475F] uppercase font-bold">{story.location}</p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">"{story.story}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ PAGE */}
        {activeTab === 'faq' && (
          <div className="py-6 px-4 lg:px-6 max-w-4xl mx-auto animate-in fade-in duration-300">
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
              <h1 className="text-xl font-bold text-[#1A1D29]">Frequently Asked Questions</h1>
              <p className="text-sm text-gray-500">Everything you need to know about international romance tours.</p>
            </div>
            <div className="space-y-2">
              {FAQ_ITEMS.map((item, i) => (
                <details key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden group">
                  <summary className="p-4 cursor-pointer font-bold text-sm flex items-center justify-between hover:bg-gray-50 transition-colors">
                    {item.q}
                    <ChevronDown size={18} className="text-[#E8475F] group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">{item.a}</div>
                </details>
              ))}
            </div>

            {/* AI Consultant */}
            <div className="mt-6 bg-[#1A1D29] p-6 rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-[#E8475F] p-2 rounded"><Sparkles size={20} className="text-[#1A1D29]" /></div>
                <div>
                  <h3 className="text-lg font-bold text-white">AI Travel Consultant</h3>
                  <p className="text-gray-300 text-xs">Ask anything about our tours and services</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <input type="text" value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} placeholder="Ask about tours, visa, safety..." className="flex-grow bg-white/10 text-white px-4 py-2 rounded border border-white/20 outline-none text-sm placeholder:text-gray-400" />
                <button onClick={handleConsultant} disabled={isAiLoading} className="bg-[#E8475F] text-[#1A1D29] px-4 py-2 rounded font-bold text-sm disabled:opacity-50">{isAiLoading ? '...' : 'Ask'}</button>
              </div>
              {aiResponse && <div className="mt-4 bg-white/5 p-4 rounded text-sm text-gray-300 border border-white/10">{aiResponse}</div>}
            </div>
          </div>
        )}

        {/* CONTACT PAGE */}
        {activeTab === 'contact' && (
          <div className="py-6 px-4 lg:px-6 max-w-4xl mx-auto animate-in fade-in duration-300">
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
              <h1 className="text-xl font-bold text-[#1A1D29]">Contact Us</h1>
              <p className="text-sm text-gray-500">Get in touch with our team for personalized assistance.</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-4">
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-[#1A1D29] mb-3">Headquarters</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-3"><Phone size={16} className="text-[#E8475F] mt-0.5" /><div><p className="font-bold">Phone</p><p className="text-gray-500">(602) 553-8178</p></div></div>
                    <div className="flex items-start space-x-3"><Mail size={16} className="text-[#E8475F] mt-0.5" /><div><p className="font-bold">Email</p><p className="text-gray-500">contact@erosworldwide.io</p></div></div>
                    <div className="flex items-start space-x-3"><MapPin size={16} className="text-[#E8475F] mt-0.5" /><div><p className="font-bold">Address</p><p className="text-gray-500">7227 N 16th St Suite 240<br />Phoenix, AZ 85020</p></div></div>
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-800"><strong>Office Hours:</strong> Mon-Fri, 9 AM - 6 PM EST. 24/7 hotline for urgent tour inquiries.</p>
                </div>
              </div>

              {/* Contact Form */}
              <form className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                <h3 className="font-bold text-[#1A1D29]">Send a Message</h3>
                <input type="text" placeholder="Your Name" className="w-full border border-gray-200 rounded px-3 py-2 text-sm" />
                <input type="email" placeholder="Your Email" className="w-full border border-gray-200 rounded px-3 py-2 text-sm" />
                <select className="w-full border border-gray-200 rounded px-3 py-2 text-sm">
                  <option>Select Subject</option>
                  <option>Tour Inquiry</option>
                  <option>Registration Help</option>
                  <option>Visa/Legal Questions</option>
                  <option>Other</option>
                </select>
                <textarea rows={4} placeholder="Your Message" className="w-full border border-gray-200 rounded px-3 py-2 text-sm resize-none" />
                <button type="submit" className="w-full bg-[#28a745] text-white py-2 rounded font-bold text-sm uppercase hover:bg-green-600">Send Message</button>
              </form>
            </div>
          </div>
        )}
      </main >

      {/* FOOTER - Corporate Style */}
      < footer className="bg-[#1A1D29] text-gray-300 py-12" >
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Logo Column */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Heart fill="currentColor" className="text-[#E8475F]" size={24} />
                <span className="text-white text-lg font-bold">Eros Worldwide</span>
              </div>
              <p className="text-sm leading-relaxed">
                World's leading marriage agency since 1995.
              </p>
            </div>

            {/* Link Columns */}
            {[
              { title: "Services", links: [{ l: "Romance Tours", t: "tours" }, { l: "Search Ladies", t: "ladies" }, { l: "Success Stories", t: "testimonials" }] },
              { title: "Offices", links: [{ l: "Kyiv, Ukraine", t: "offices" }, { l: "Medellin, Colombia", t: "offices" }, { l: "Cebu, Philippines", t: "offices" }] },
              { title: "For Men", links: [{ l: "Register Free", t: "gentlemen" }, { l: "FAQ", t: "faq" }, { l: "Contact", t: "contact" }] },
              { title: "Legal", links: [{ l: "IMBRA Compliance", t: "legal" }, { l: "Privacy Policy", t: "legal" }, { l: "Anti-Fraud", t: "legal" }] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">{col.title}</h4>
                <ul className="space-y-2 text-sm">
                  {col.links.map((link, j) => (
                    <li key={j} onClick={() => setActiveTab(link.t as AppTab)} className="hover:text-[#E8475F] cursor-pointer transition-colors">
                      {link.l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
            <p>© 1995-2025 Eros Worldwide International. Member AFA Group.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <span className="text-[#E8475F]">IMBRA Compliant</span>
              <span>•</span>
              <span>All ladies physically verified</span>
            </div>
          </div>
        </div>
      </footer >
    </div >
  );
};

export default App;
