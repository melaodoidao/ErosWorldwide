import React from 'react';
import { Quote, Heart, ShieldCheck, Globe, Award } from 'lucide-react';

export const PhilosophyPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gray-900">
                <img
                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    alt="Couple"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6">Our Philosophy</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
                        Where physical integrity and traditional values meet the physical reality of international romance.
                    </p>
                </div>
            </div>

            {/* CEO Quote */}
            <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-20">
                <div className="bg-white rounded-3xl p-10 lg:p-16 shadow-2xl border border-gray-100">
                    <Quote size={48} className="text-brand-rose mb-8 opacity-20" />
                    <p className="text-2xl lg:text-3xl font-serif italic text-brand-navy leading-relaxed mb-10">
                        "We don't sell 'dating'. We facilitate the creation of lifelong legacies. In an age of digital phantoms, Eros Worldwide is the physical reality of international romance."
                    </p>
                    <div className="flex items-center gap-4">
                        <img
                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"
                            className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-rose"
                            alt="Christopher Vance"
                        />
                        <div>
                            <h4 className="font-bold text-brand-navy text-lg">Christopher Vance</h4>
                            <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Global Executive Director</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Values */}
            <div className="max-w-7xl mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif font-bold text-brand-navy mb-4">The Eros Standard</h2>
                    <div className="w-20 h-1 bg-brand-rose mx-auto rounded-full" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <div className="space-y-4">
                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-brand-rose">
                            <ShieldCheck size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-brand-navy">In Person Meetings</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Our network was built on a simple observation: modern digital matchmaking fails to create real connections. We facilitate genuine in-person meetings at our 3 international offices.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-brand-rose">
                            <Globe size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-brand-navy">Verified Identities</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Every woman you see on this platform has visited our office, presented identity documents, and completed a values-based interview with our local staff. No digital masks.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-brand-rose">
                            <Heart size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-brand-navy">Family Values</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We focus on connecting men with women who still hold traditional family values at the center of their lives. Our goal isn't just a date, it's a foundation for a lifelong partnership.
                        </p>
                    </div>
                </div>
            </div>

            {/* Achievement Section */}
            <div className="bg-brand-navy py-24 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl font-serif font-bold text-white mb-6">Our Commitment</h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                We are the bridge between cultures. Our results aren't measured in clicks or likes, but in genuine connections and relationships formed across borders.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <div className="text-4xl font-bold text-brand-rose mb-1">350+</div>
                                    <div className="text-sm uppercase tracking-widest text-gray-500 font-bold">Verified Ladies</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-brand-rose mb-1">3</div>
                                    <div className="text-sm uppercase tracking-widest text-gray-500 font-bold">International Offices</div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="grid grid-cols-2 gap-4">
                                <img
                                    src="https://images.unsplash.com/photo-1516589174184-c6858b16ecb0?auto=format&fit=crop&q=80&w=600"
                                    className="rounded-2xl"
                                    alt="Couple"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600"
                                    className="rounded-2xl mt-8"
                                    alt="Couple"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhilosophyPage;
