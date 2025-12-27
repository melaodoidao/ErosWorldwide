import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, Clock, Globe } from 'lucide-react';

export const ContactPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-brand-navy text-white py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-brand-rose/20 text-brand-rose px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                                <Globe size={14} /> Get in Touch
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-white mb-6">Contact Our Team</h1>
                            <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
                                Our consultants are ready to assist you in every step of your journey.
                                Reach out via phone, email, or visit our Phoenix headquarters.
                            </p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center">
                            <div className="text-brand-rose text-sm font-bold uppercase tracking-widest mb-2 font-bold">Live Status</div>
                            <div className="text-3xl font-bold mb-1">98.2%</div>
                            <div className="text-gray-400 text-sm">Response rate under 2h</div>
                        </div>
                    </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-rose/10 rounded-full blur-[100px] -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -ml-32 -mb-32" />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Channels */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                                <Phone size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-brand-navy mb-2">Phone</h3>
                            <p className="text-gray-500 text-sm mb-4">Direct line to our main office.</p>
                            <a href="tel:6025538178" className="text-lg font-bold text-brand-rose hover:underline">(602) 553-8178</a>
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-red-50 text-brand-rose rounded-2xl flex items-center justify-center mb-6">
                                <Mail size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-brand-navy mb-2">Email</h3>
                            <p className="text-gray-500 text-sm mb-4">Our support team responds within 24h.</p>
                            <a href="mailto:contact@erosworldwide.io" className="text-lg font-bold text-brand-rose hover:underline">contact@erosworldwide.io</a>
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                                <MapPin size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-brand-navy mb-2">Headquarters</h3>
                            <p className="text-gray-500 text-sm mb-4">Visit us for a personal consultation.</p>
                            <address className="text-lg font-bold text-brand-navy not-italic leading-tight">
                                7227 N 16th St Suite 240<br />
                                Phoenix, AZ 85020
                            </address>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 border border-gray-200 shadow-2xl">
                            <div className="flex items-center gap-3 mb-8">
                                <MessageSquare size={24} className="text-brand-rose" />
                                <h2 className="text-3xl font-serif font-bold text-brand-navy">Send us a message</h2>
                            </div>

                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm focus:bg-white focus:border-brand-rose outline-none transition-all text-brand-navy"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm focus:bg-white focus:border-brand-rose outline-none transition-all text-brand-navy"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Subject</label>
                                    <select className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm focus:bg-white focus:border-brand-rose outline-none transition-all appearance-none text-brand-navy cursor-pointer">
                                        <option>Select Subject</option>
                                        <option>Tour Inquiry</option>
                                        <option>Registration Help</option>
                                        <option>Visa/Legal Questions</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Your Message</label>
                                    <textarea
                                        rows={6}
                                        placeholder="How can we help you?"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-3xl px-5 py-4 text-sm focus:bg-white focus:border-brand-rose outline-none transition-all resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-brand-navy text-white py-5 rounded-2xl font-bold text-lg hover:bg-brand-navy-muted transition-colors shadow-xl shadow-gray-200"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-8 flex flex-col md:flex-row gap-4">
                            <div className="flex-1 bg-amber-50 border border-amber-100 rounded-2xl p-6 flex items-start gap-4">
                                <Clock className="text-amber-600 shrink-0" size={24} />
                                <div>
                                    <h4 className="font-bold text-amber-900 mb-1">Office Hours</h4>
                                    <p className="text-sm text-amber-800/80 leading-relaxed">
                                        Mon-Fri, 9 AM - 6 PM EST. Our team is also available via hotline for urgent tour inquiries.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
