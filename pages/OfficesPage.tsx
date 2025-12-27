import React from 'react';
import { MapPin, Users, Globe, Phone, ExternalLink } from 'lucide-react';
import { Office } from '../types';

interface OfficesPageProps {
    offices: Office[];
}

export const OfficesPage: React.FC<OfficesPageProps> = ({ offices }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-brand-navy text-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-3 text-brand-rose mb-4">
                        <Globe size={24} />
                        <span className="text-sm font-bold uppercase tracking-wider">Global Infrastructure</span>
                    </div>
                    <h1 className="text-5xl font-serif font-bold text-white mb-4">Our Local Offices</h1>
                    <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                        Unlike online-only sites, we own and operate physical offices in every country we serve.
                        Our local staff is there to verify every member and support your journey.
                    </p>
                </div>
            </div>

            {/* Offices Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {offices.map((office, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all group"
                        >
                            <div className="h-56 overflow-hidden relative">
                                <img
                                    src={office.img}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    alt={office.city}
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-brand-navy text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                        Direct Operations
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-brand-navy mb-1">{office.city}</h3>
                                    <p className="text-sm text-brand-rose font-bold uppercase tracking-widest">{office.country}</p>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                                            <MapPin size={16} className="text-gray-400" />
                                        </div>
                                        <p className="text-sm text-gray-600 leading-tight pt-1">{office.address}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                                            <Users size={16} className="text-gray-400" />
                                        </div>
                                        <p className="text-sm text-gray-600 font-medium">{office.staff}</p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button className="flex-1 bg-brand-navy text-white py-3 rounded-xl font-bold text-sm hover:bg-brand-navy-muted transition-colors flex items-center justify-center gap-2">
                                        <Phone size={14} />
                                        Call Office
                                    </button>
                                    <button className="w-12 h-12 border-2 border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors">
                                        <ExternalLink size={18} className="text-gray-400" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Global Presence Banner */}
            <div className="max-w-7xl mx-auto px-4 pb-20">
                <div className="bg-brand-rose rounded-[2.5rem] p-12 text-white relative overflow-hidden">
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <h2 className="text-3xl font-bold mb-4">Don't see your city?</h2>
                            <p className="text-white/80 max-w-lg">
                                We are constantly expanding our office network. Contact our Phoenix headquarters
                                to learn about our upcoming locations and associate agencies.
                            </p>
                        </div>
                        <button className="bg-brand-navy text-white px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-xl">
                            Contact Headquarters
                        </button>
                    </div>
                    {/* Decorative Circle */}
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                </div>
            </div>
        </div>
    );
};

export default OfficesPage;
