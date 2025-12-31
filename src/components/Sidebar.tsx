import React from 'react';
import { BookOpen, Calendar, Award, Video, Phone, Mail, MessageSquare, Gift, Users, FileText } from 'lucide-react';
import { AppTab } from '../types';

interface SidebarProps {
    activeTab: AppTab;
    setActiveTab: (tab: AppTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    const menuSections = [
        {
            title: 'The Journey',
            items: [
                { label: 'Our Philosophy', icon: BookOpen, tab: 'philosophy' as AppTab },
                { label: 'Tour Schedule', icon: Calendar, tab: 'tours' as AppTab },
                { label: 'Success Stories', icon: Award, tab: 'testimonials' as AppTab },
                { label: 'Video Reviews', icon: Video, tab: 'reviews' as AppTab },
            ]
        },
        {
            title: 'Services',
            items: [
                { label: 'Express Mail', icon: Mail, tab: 'contact' as AppTab },
                { label: 'Phone Translation', icon: Phone, tab: 'contact' as AppTab },
                { label: 'Gift Delivery', icon: Gift, tab: 'contact' as AppTab },
                { label: 'Fiancée Visa Help', icon: FileText, tab: 'legal' as AppTab },
            ]
        },
        {
            title: 'Community',
            items: [
                { label: 'Forum', icon: MessageSquare, tab: 'faq' as AppTab },
                { label: 'Events', icon: Users, tab: 'tours' as AppTab },
            ]
        }
    ];

    return (
        <aside className="lg:w-72 bg-[#f8fafc] border-r p-8 space-y-10 shrink-0 hidden lg:block">
            {menuSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-4">
                    <h3 className="text-[10px] font-black text-brand-rose uppercase tracking-[0.3em] border-b-2 border-amber-100 pb-3">
                        {section.title}
                    </h3>
                    <ul className="space-y-3">
                        {section.items.map((item, itemIndex) => (
                            <li
                                key={itemIndex}
                                onClick={() => setActiveTab(item.tab)}
                                className={`flex items-center text-[11px] font-bold cursor-pointer transition-all hover:translate-x-2 ${activeTab === item.tab
                                    ? 'text-brand-rose'
                                    : 'text-slate-600 hover:text-brand-navy'
                                    }`}
                            >
                                <item.icon size={14} className={`mr-3 ${activeTab === item.tab ? 'text-brand-rose' : 'text-slate-300'}`} />
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            {/* IMBRA Compliance Card */}
            <div className="bg-brand-navy text-white p-6 rounded-[2rem] space-y-4 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                    <Award size={80} />
                </div>
                <h4 className="text-[9px] font-black uppercase tracking-widest text-brand-rose">IMBRA Compliant</h4>
                <p className="text-[10px] font-medium leading-relaxed relative z-10 text-slate-300">
                    100% compliant with US Federal laws. Full background checks and safety protocols.
                </p>
                <button
                    onClick={() => setActiveTab('legal' as AppTab)}
                    className="w-full bg-brand-rose text-brand-navy text-[10px] font-black uppercase py-3 rounded-xl hover:bg-white transition-all shadow-lg shadow-brand-rose/20"
                >
                    Learn More
                </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quick Stats</h4>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500">Verified Ladies</span>
                        <span className="text-sm font-black text-brand-navy">350+</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500">Active Tours</span>
                        <span className="text-sm font-black text-emerald-500">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500">Countries</span>
                        <span className="text-sm font-black text-brand-rose">3</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
