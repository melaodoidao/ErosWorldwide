import React, { useState } from 'react';
import { UserPlus, ShieldCheck, Heart, Plane, CheckCircle, ArrowRight } from 'lucide-react';
import { GentlemanProfile } from '../types';

interface GentlemenPageProps {
    onRegister: (man: Omit<GentlemanProfile, 'id' | 'registrationDate'>) => Promise<boolean> | void;
}

export const GentlemenPage: React.FC<GentlemenPageProps> = ({ onRegister }) => {
    const [manForm, setManForm] = useState({ name: '', email: '', age: '', profession: '', location: '', bio: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const result = await onRegister({
                name: manForm.name,
                email: manForm.email,
                age: parseInt(manForm.age) || 0,
                profession: manForm.profession || 'Not Specified',
                location: manForm.location || 'Not Specified',
                bio: manForm.bio,
            });

            if (result !== false) {
                setManForm({ name: '', email: '', age: '', profession: '', location: '', bio: '' });
                alert("Profile submitted successfully! We will contact you soon.");
            }
        } catch (err) {
            alert("Registration failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="flex flex-col lg:flex-row">
                {/* Left Side: Brand Story & Trust Factors */}
                <div className="lg:w-1/2 bg-brand-navy text-white p-12 lg:p-24 flex flex-col justify-center">
                    <div className="max-w-md">
                        <div className="inline-flex items-center gap-2 bg-brand-rose/20 text-brand-rose px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-10 border border-brand-rose/30">
                            <UserPlus size={14} /> Free Membership
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white mb-8 leading-tight">Begin Your Personal Journey</h1>
                        <p className="text-xl text-gray-400 mb-12 font-light leading-relaxed">
                            Join over 15,000 men who escaped the apps and found real, verified love across borders.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                                    <ShieldCheck size={20} className="text-brand-rose" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-white">IMBRA Compliant</h4>
                                    <p className="text-sm text-gray-400">US-regulated safety and background check procedures.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                                    <Heart size={20} className="text-brand-rose" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Verified Ladies</h4>
                                    <p className="text-sm text-gray-400">Every profile is physically verified in our local offices.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                                    <Plane size={20} className="text-brand-rose" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Direct Access</h4>
                                    <p className="text-sm text-gray-400">Exclusive group tours and private introductions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Registration Form */}
                <div className="lg:w-1/2 p-12 lg:p-24 bg-gray-50 flex items-center justify-center">
                    <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl p-10 lg:p-12 border border-white">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-brand-navy mb-2">Create Your Profile</h2>
                            <p className="text-gray-500">It only takes 2 minutes to get started.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={manForm.name}
                                        onChange={e => setManForm({ ...manForm, name: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-brand-rose outline-none transition-all text-brand-navy"
                                        placeholder="John Smith"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={manForm.email}
                                        onChange={e => setManForm({ ...manForm, email: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-brand-rose outline-none transition-all text-brand-navy"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Current Age</label>
                                    <input
                                        type="number"
                                        required
                                        min={25}
                                        max={80}
                                        value={manForm.age}
                                        onChange={e => setManForm({ ...manForm, age: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-brand-rose outline-none transition-all text-brand-navy"
                                        placeholder="35"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Profession</label>
                                    <input
                                        type="text"
                                        value={manForm.profession}
                                        onChange={e => setManForm({ ...manForm, profession: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-brand-rose outline-none transition-all text-brand-navy"
                                        placeholder="Software Engineer"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">City, Country</label>
                                <input
                                    type="text"
                                    value={manForm.location}
                                    onChange={e => setManForm({ ...manForm, location: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-brand-rose outline-none transition-all text-brand-navy"
                                    placeholder="Chicago, USA"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">About Your Intentions</label>
                                <textarea
                                    rows={4}
                                    value={manForm.bio}
                                    onChange={e => setManForm({ ...manForm, bio: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-[2rem] px-6 py-4 text-sm focus:bg-white focus:border-brand-rose outline-none transition-all resize-none"
                                    placeholder="What are you looking for in a partner?"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-brand-rose text-white py-5 rounded-2xl font-bold text-lg hover:bg-brand-rose/90 transition-all shadow-xl shadow-brand-rose/20 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Submitting...' : 'Complete Registration'} <ArrowRight size={20} />
                            </button>

                            <div className="flex items-center gap-2 justify-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                <CheckCircle size={12} className="text-[#10B981]" /> No Credit Card Required
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GentlemenPage;
