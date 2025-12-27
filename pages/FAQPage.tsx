import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, Sparkles } from 'lucide-react';
import { askConsultant } from '../geminiService';

interface FAQItem {
    q: string;
    a: string;
}

const FAQ_ITEMS: FAQItem[] = [
    { q: "How are the ladies verified?", a: "Every lady on our site has been physically interviewed in our local offices. They must provide a valid government passport and sign a legal disclosure before their profile is activated." },
    { q: "What is IMBRA?", a: "The International Marriage Broker Regulation Act (IMBRA) is a US federal law that requires marriage brokers to provide foreign fiances with background checks on their US fiances. We are 100% compliant." },
    { q: "Do you provide translators?", a: "Yes. Every group social tour includes a full staff of professional translators to ensure clear and meaningful communication." },
    { q: "How long does a K-1 Visa take?", a: "Currently, the process takes 12-18 months. Our legal consultants guide you through every step of the paperwork." }
];

export const FAQPage: React.FC = () => {
    const [aiPrompt, setAiPrompt] = useState('');
    const [aiResponse, setAiResponse] = useState<string | null>(null);
    const [isAiLoading, setIsAiLoading] = useState(false);

    const handleConsultant = async () => {
        if (!aiPrompt.trim()) return;
        setIsAiLoading(true);
        const result = await askConsultant(aiPrompt);
        setAiResponse(result || "Busy.");
        setIsAiLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-brand-navy text-white py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="bg-brand-rose p-4 rounded-2xl shadow-lg shadow-brand-rose/20">
                            <HelpCircle size={40} className="text-white" />
                        </div>
                    </div>
                    <h1 className="text-5xl font-serif font-bold text-white mb-4">Frequently Asked Questions</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Everything you need to know about our process, verification, and legal compliance.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* FAQ List */}
                    <div className="lg:col-span-2 space-y-4">
                        {FAQ_ITEMS.map((item, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-brand-rose/30 transition-colors group"
                            >
                                <details className="group">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                        <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-rose transition-colors pr-8">
                                            {item.q}
                                        </h3>
                                        <ChevronDown
                                            size={20}
                                            className="text-gray-400 group-open:rotate-180 transition-transform"
                                        />
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4 text-sm">
                                        {item.a}
                                    </div>
                                </details>
                            </div>
                        ))}
                    </div>

                    {/* Sidebar: AI Consultant & Contact */}
                    <div className="space-y-8">
                        {/* AI Consultant */}
                        <div className="bg-brand-navy text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 text-brand-rose font-bold text-xs uppercase tracking-widest mb-4">
                                    <Sparkles size={16} /> AI Assistant
                                </div>
                                <h3 className="text-xl font-bold mb-4">Travel Consultant</h3>
                                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                                    Ask anything about our tours, visas, or verification process.
                                </p>

                                <div className="space-y-4">
                                    <textarea
                                        value={aiPrompt}
                                        onChange={e => setAiPrompt(e.target.value)}
                                        placeholder="Type your question..."
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:bg-white/10 focus:border-brand-rose outline-none transition-all resize-none"
                                        rows={3}
                                    />
                                    <button
                                        onClick={handleConsultant}
                                        disabled={isAiLoading}
                                        className="w-full bg-brand-rose text-white py-3 rounded-xl font-bold hover:bg-brand-rose/90 transition-colors disabled:opacity-50"
                                    >
                                        {isAiLoading ? 'Analyzing...' : 'Ask AI'}
                                    </button>
                                </div>

                                {aiResponse && (
                                    <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/5 text-xs text-gray-300 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                                        {aiResponse}
                                    </div>
                                )}
                            </div>
                            {/* Decorative Blur */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-rose/20 rounded-full blur-[60px]" />
                        </div>

                        {/* Direct Contact */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm text-center">
                            <h3 className="font-bold text-brand-navy mb-2">Need a human?</h3>
                            <p className="text-sm text-gray-400 mb-6">Our staff is available for personal calls.</p>
                            <button className="w-full bg-gray-50 text-brand-navy py-3 rounded-xl font-bold border border-gray-200 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                                <MessageCircle size={18} />
                                Live Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
