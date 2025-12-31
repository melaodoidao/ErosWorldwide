import React from 'react';
import { ShieldCheck, ShieldAlert, Lock, Scale, FileText, CheckCircle2 } from 'lucide-react';

export const LegalPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-brand-navy text-white pt-24 pb-32">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-brand-rose/20 text-brand-rose px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-brand-rose/30">
                        <Scale size={16} /> Legal & Compliance
                    </div>
                    <h1 className="text-5xl font-serif font-bold text-white mb-6">Transparency & Trust</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Exceeding every federal and international standard for safety, privacy, and compliance.
                    </p>
                </div>
            </div>

            {/* Compliance Cards */}
            <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10 pb-20">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-8">
                            <ShieldCheck size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-brand-navy mb-4">IMBRA Compliance</h3>
                        <p className="text-gray-500 leading-relaxed mb-8">
                            The International Marriage Broker Regulation Act (IMBRA) of 2005 is strictly followed. We require all US-based fiancés to provide a legal background check to their foreign partners.
                        </p>
                        <button className="mt-auto text-brand-rose font-bold text-sm uppercase tracking-widest hover:underline flex items-center gap-2">
                            View Compliance PDF <FileText size={16} />
                        </button>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-red-50 text-brand-rose rounded-3xl flex items-center justify-center mb-8">
                            <ShieldAlert size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-brand-navy mb-4">Anti-Fraud Shield</h3>
                        <p className="text-gray-500 leading-relaxed mb-8">
                            Our 3 international offices allow us to verify the reality of every user. We do not tolerate "professional daters" or financial scams. Every identity is physically verified.
                        </p>
                        <button className="mt-auto text-brand-rose font-bold text-sm uppercase tracking-widest hover:underline flex items-center gap-2">
                            Safety Procedures <CheckCircle2 size={16} />
                        </button>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center mb-8">
                            <Lock size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-brand-navy mb-4">Privacy Safeguard</h3>
                        <p className="text-gray-500 leading-relaxed mb-8">
                            Your personal details are encrypted and only released with your explicit permission to pre-screened matches. We never sell your data to third parties.
                        </p>
                        <button className="mt-auto text-brand-rose font-bold text-sm uppercase tracking-widest hover:underline flex items-center gap-2">
                            Privacy Policy <FileText size={16} />
                        </button>
                    </div>
                </div>

                {/* Detailed Sections */}
                <div className="mt-24 max-w-4xl mx-auto space-y-16">
                    <section>
                        <h2 className="text-3xl font-serif font-bold text-brand-navy mb-6">Background Check Policy</h2>
                        <div className="bg-gray-50 rounded-3xl p-8 text-gray-600 leading-relaxed space-y-4 border border-gray-100">
                            <p>
                                At Eros Worldwide, we take the safety of our female members as seriously as the safety of our male members. Pursuant to US Federal Law (IMBRA), we conduct thorough background checks and provide full disclosure before any personal contact information is exchanged.
                            </p>
                            <p>
                                This includes a search of sex offender registries and criminal records for certain crimes. Our commitment to safety is what has made us the most trusted name in international introductions for over 25 years.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-serif font-bold text-brand-navy mb-6">Terms of Service</h2>
                        <div className="bg-gray-50 rounded-3xl p-8 text-gray-600 leading-relaxed space-y-4 border border-gray-100">
                            <p>
                                By using our services, you agree to treat all members with respect and dignity. Our platform is for individuals seeking serious, traditional relationships leading to marriage. Use of this platform for any other purpose is strictly prohibited.
                            </p>
                            <p>
                                We reserve the right to terminate the membership of any individual who violates our safety policies or misrepresents themselves in any way.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
