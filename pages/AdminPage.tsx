import React, { useState } from 'react';
import { Lock, LogOut, Plus, Edit, Trash2, Database, Users, Calendar } from 'lucide-react';
import { LadyProfile, Tour } from '../types';

interface AdminPageProps {
    ladies: LadyProfile[];
    setLadies: React.Dispatch<React.SetStateAction<LadyProfile[]>>;
    tours: Tour[];
    setTours: React.Dispatch<React.SetStateAction<Tour[]>>;
}

export const AdminPage: React.FC<AdminPageProps> = ({ ladies, setLadies, tours, setTours }) => {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [adminSubTab, setAdminSubTab] = useState<'ladies' | 'tours'>('ladies');
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });

    const [ladyForm, setLadyForm] = useState<Partial<LadyProfile>>({ name: '', age: 0, city: '', country: '', bio: '', imageUrl: '', verified: true, height: "5'6\"", hairColor: 'Brunette' });
    const [editingLadyId, setEditingLadyId] = useState<string | null>(null);
    const [tourForm, setTourForm] = useState<Partial<Tour>>({ city: '', countries: [], startDate: '', endDate: '', checkInTime: '', price: '', status: 'Open', image: '' });
    const [editingTourId, setEditingTourId] = useState<string | null>(null);

    const handleAdminLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (loginForm.username === 'admin' && loginForm.password === 'password123') {
            setIsAdminLoggedIn(true);
        } else {
            alert("Invalid credentials.");
        }
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

    if (!isAdminLoggedIn) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-xl mb-6 text-brand-rose">
                            <Lock size={40} />
                        </div>
                        <h1 className="text-4xl font-serif font-bold text-brand-navy mb-2">Staff Portal</h1>
                        <p className="text-gray-500">Please authenticate to continue.</p>
                    </div>

                    <form onSubmit={handleAdminLogin} className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Username</label>
                            <input
                                type="text"
                                placeholder="Staff ID"
                                value={loginForm.username}
                                onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
                                className="w-full bg-gray-50 px-6 py-4 rounded-2xl border-2 border-transparent focus:border-brand-rose focus:bg-white outline-none font-medium transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={loginForm.password}
                                onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                                className="w-full bg-gray-50 px-6 py-4 rounded-2xl border-2 border-transparent focus:border-brand-rose focus:bg-white outline-none font-medium transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-brand-navy text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-brand-rose hover:shadow-xl hover:shadow-brand-rose/20 transition-all font-bold"
                        >
                            Enter Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-brand-navy text-white py-8">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="bg-brand-rose p-2 rounded-xl">
                            <Database size={24} className="text-brand-navy" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
                            <p className="text-xs text-gray-400 uppercase tracking-widest">Management System v2.4</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsAdminLoggedIn(false)}
                        className="flex items-center gap-2 text-gray-400 hover:text-red-400 font-bold transition-colors"
                    >
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </div>

            {/* Sub-navigation */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 flex gap-8">
                    <button
                        onClick={() => setAdminSubTab('ladies')}
                        className={`py-6 font-bold text-sm uppercase tracking-widest border-b-2 transition-all ${adminSubTab === 'ladies' ? 'border-brand-rose text-brand-navy' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    >
                        <div className="flex items-center gap-2">
                            <Users size={18} /> Lady Profiles
                        </div>
                    </button>
                    <button
                        onClick={() => setAdminSubTab('tours')}
                        className={`py-6 font-bold text-sm uppercase tracking-widest border-b-2 transition-all ${adminSubTab === 'tours' ? 'border-brand-rose text-brand-navy' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    >
                        <div className="flex items-center gap-2">
                            <Calendar size={18} /> Tour Schedule
                        </div>
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                {adminSubTab === 'ladies' && (
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Form */}
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 sticky top-32">
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-brand-navy">
                                <Plus size={24} className="text-brand-rose" />
                                {editingLadyId ? 'Update Profile' : 'Register New Lady'}
                            </h3>
                            <form onSubmit={saveLady} className="space-y-6">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    required
                                    value={ladyForm.name || ''}
                                    onChange={e => setLadyForm({ ...ladyForm, name: e.target.value })}
                                    className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="number"
                                        placeholder="Age"
                                        required
                                        value={ladyForm.age || ''}
                                        onChange={e => setLadyForm({ ...ladyForm, age: parseInt(e.target.value) })}
                                        className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm"
                                    />
                                    <input
                                        type="text"
                                        placeholder="City"
                                        required
                                        value={ladyForm.city || ''}
                                        onChange={e => setLadyForm({ ...ladyForm, city: e.target.value })}
                                        className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm"
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Country"
                                    required
                                    value={ladyForm.country || ''}
                                    onChange={e => setLadyForm({ ...ladyForm, country: e.target.value })}
                                    className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm"
                                />
                                <input
                                    type="url"
                                    placeholder="Image URL"
                                    required
                                    value={ladyForm.imageUrl || ''}
                                    onChange={e => setLadyForm({ ...ladyForm, imageUrl: e.target.value })}
                                    className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm"
                                />
                                <textarea
                                    placeholder="Member Bio"
                                    rows={4}
                                    value={ladyForm.bio || ''}
                                    onChange={e => setLadyForm({ ...ladyForm, bio: e.target.value })}
                                    className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm resize-none"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-brand-rose text-brand-navy py-5 rounded-2xl font-bold uppercase tracking-widest hover:shadow-lg transition-all"
                                >
                                    {editingLadyId ? 'Save Changes' : 'Publish Profile'}
                                </button>
                                {editingLadyId && (
                                    <button
                                        type="button"
                                        onClick={() => { setEditingLadyId(null); setLadyForm({}); }}
                                        className="w-full text-gray-400 font-bold text-xs uppercase hover:text-gray-600"
                                    >
                                        Cancel Edit
                                    </button>
                                )}
                            </form>
                        </div>

                        {/* List */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Active Profiles ({ladies.length})</h3>
                            {ladies.map(lady => (
                                <div key={lady.id} className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center space-x-4">
                                        <img src={lady.imageUrl} className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-50" alt={lady.name} />
                                        <div>
                                            <h4 className="font-bold text-brand-navy">{lady.name}, {lady.age}</h4>
                                            <p className="text-sm text-gray-400">{lady.city}, {lady.country}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => { setLadyForm(lady); setEditingLadyId(lady.id); }}
                                            className="p-3 bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => { if (window.confirm('Delete profile?')) setLadies(ladies.filter(l => l.id !== lady.id)) }}
                                            className="p-3 bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {adminSubTab === 'tours' && (
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Form */}
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 sticky top-32">
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-brand-navy">
                                <Plus size={24} className="text-brand-rose" />
                                {editingTourId ? 'Edit Event' : 'Schedule New Tour'}
                            </h3>
                            <form onSubmit={saveTour} className="space-y-6">
                                <input
                                    type="text"
                                    placeholder="Destination City"
                                    required
                                    value={tourForm.city || ''}
                                    onChange={e => setTourForm({ ...tourForm, city: e.target.value })}
                                    className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="date"
                                        placeholder="Start Date"
                                        required
                                        value={tourForm.startDate || ''}
                                        onChange={e => setTourForm({ ...tourForm, startDate: e.target.value })}
                                        className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm cursor-pointer"
                                    />
                                    <input
                                        type="date"
                                        placeholder="End Date"
                                        required
                                        value={tourForm.endDate || ''}
                                        onChange={e => setTourForm({ ...tourForm, endDate: e.target.value })}
                                        className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm cursor-pointer"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Price (e.g., $2,995)"
                                        required
                                        value={tourForm.price || ''}
                                        onChange={e => setTourForm({ ...tourForm, price: e.target.value })}
                                        className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm"
                                    />
                                    <select
                                        value={tourForm.status || 'Open'}
                                        onChange={e => setTourForm({ ...tourForm, status: e.target.value as Tour['status'] })}
                                        className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm appearance-none cursor-pointer"
                                    >
                                        <option value="Open">Status: Open</option>
                                        <option value="Filling Fast">Status: Filling Fast</option>
                                        <option value="Waitlist">Status: Waitlist</option>
                                        <option value="Closed">Status: Closed</option>
                                    </select>
                                </div>
                                <input
                                    type="url"
                                    placeholder="Promotional Image URL"
                                    value={tourForm.image || ''}
                                    onChange={e => setTourForm({ ...tourForm, image: e.target.value })}
                                    className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-brand-rose text-brand-navy py-5 rounded-2xl font-bold uppercase tracking-widest hover:shadow-lg transition-all"
                                >
                                    {editingTourId ? 'Update Schedule' : 'Launch Tour'}
                                </button>
                                {editingTourId && (
                                    <button
                                        type="button"
                                        onClick={() => { setEditingTourId(null); setTourForm({}); }}
                                        className="w-full text-gray-400 font-bold text-xs uppercase hover:text-gray-600"
                                    >
                                        Cancel Edit
                                    </button>
                                )}
                            </form>
                        </div>

                        {/* List */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Upcoming Tours ({tours.length})</h3>
                            {tours.map(tour => (
                                <div key={tour.id} className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center space-x-4">
                                        <img src={tour.image} className="w-20 h-16 rounded-2xl object-cover border-2 border-gray-50" alt={tour.city} />
                                        <div>
                                            <h4 className="font-bold text-brand-navy">{tour.city}</h4>
                                            <p className="text-sm text-gray-400">{tour.startDate} • {tour.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => { setTourForm(tour); setEditingTourId(tour.id); }}
                                            className="p-3 bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => { if (window.confirm('Delete tour?')) setTours(tours.filter(t => t.id !== tour.id)) }}
                                            className="p-3 bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
