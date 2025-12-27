import React, { useState } from 'react';
import { Play, ChevronRight, Quote, Star } from 'lucide-react';

interface Story {
    id: number;
    name: string;
    location: string;
    story: string;
    img: string;
    video: boolean;
}

interface TestimonialTabsProps {
    stories: Story[];
}

export const TestimonialTabs: React.FC<TestimonialTabsProps> = ({ stories }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const tabs = [
        { id: 'watch', label: 'Watch It', icon: Play },
        { id: 'why', label: 'Why Us', icon: Star },
        { id: 'story', label: stories[activeIndex]?.name.split(' ')[0] || 'Story', icon: Quote },
    ];

    const [activeTab, setActiveTab] = useState('watch');

    return (
        <div className="bg-white rounded-[4rem] overflow-hidden shadow-xl border border-slate-100">
            {/* Header */}
            <div className="text-center py-16 px-8 bg-gradient-to-b from-slate-50 to-white">
                <h2 className="text-5xl lg:text-6xl font-black font-serif text-brand-navy leading-tight">
                    OUR STORY IS THE STORY OF YOUR
                </h2>
                <h2 className="text-5xl lg:text-6xl font-black font-serif text-brand-rose italic mt-2">
                    SUCCESSFUL MARRIAGE
                </h2>
            </div>

            {/* Tabs */}
            <div className="flex justify-center border-b border-slate-100">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-12 py-6 flex items-center space-x-3 font-black text-sm uppercase tracking-widest transition-all border-b-4 ${activeTab === tab.id
                            ? 'border-brand-rose text-brand-navy bg-amber-50/50'
                            : 'border-transparent text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        <tab.icon size={18} />
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="p-12 lg:p-20">
                {activeTab === 'watch' && (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {stories.filter(s => s.video).map((story, i) => (
                            <div
                                key={story.id}
                                className={`relative rounded-3xl overflow-hidden cursor-pointer group ${i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
                                onClick={() => { setActiveIndex(stories.indexOf(story)); setActiveTab('story'); }}
                            >
                                <img
                                    src={story.img}
                                    alt={story.name}
                                    className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${i === 0 ? 'h-[400px] lg:h-full' : 'h-48'}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-white/90 rounded-full p-4 shadow-2xl group-hover:scale-110 transition-transform">
                                        <Play size={i === 0 ? 32 : 20} className="text-brand-rose ml-1" />
                                    </div>
                                </div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h4 className={`font-black ${i === 0 ? 'text-2xl' : 'text-lg'}`}>{story.name}</h4>
                                    <p className="text-xs font-bold opacity-80 mt-1">{story.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'why' && (
                    <div className="grid lg:grid-cols-3 gap-12">
                        {[
                            { title: '30+ Years Experience', desc: 'Since 1995, we have facilitated over 15,000 marriages between Western men and foreign women.' },
                            { title: 'Physical Verification', desc: 'Every woman on our platform has been interviewed in person at one of our 12 global offices.' },
                            { title: 'Legal Compliance', desc: 'Full IMBRA compliance with background checks and disclosure requirements for US citizens.' },
                            { title: 'Tour Support Staff', desc: 'Our tours include professional translators, local guides, and 24/7 support staff.' },
                            { title: 'Success Guarantee', desc: 'If you don\'t meet someone special on your first tour, your second tour is 50% off.' },
                            { title: 'Visa Assistance', desc: 'Our legal team provides guidance through the entire K-1 fiancée visa process.' },
                        ].map((item, i) => (
                            <div key={i} className="text-center space-y-4">
                                <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto">
                                    <Star size={28} className="text-brand-rose" />
                                </div>
                                <h4 className="text-xl font-black text-brand-navy">{item.title}</h4>
                                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'story' && stories[activeIndex] && (
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-1/2">
                            <div className="relative rounded-[3rem] overflow-hidden">
                                <img
                                    src={stories[activeIndex].img}
                                    alt={stories[activeIndex].name}
                                    className="w-full aspect-[4/3] object-cover"
                                />
                                {stories[activeIndex].video && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                        <div className="bg-white/90 rounded-full p-6 shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                                            <Play size={40} className="text-brand-rose ml-1" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="lg:w-1/2 space-y-8">
                            <Quote size={48} className="text-brand-rose opacity-30" />
                            <h3 className="text-4xl font-black font-serif text-brand-navy">{stories[activeIndex].name}</h3>
                            <p className="text-[12px] font-black text-brand-rose uppercase tracking-[0.3em]">{stories[activeIndex].location}</p>
                            <p className="text-xl text-slate-600 leading-relaxed italic">"{stories[activeIndex].story}"</p>
                            <button className="flex items-center text-[12px] font-black uppercase text-brand-rose hover:text-brand-navy transition-colors">
                                Read Full Story <ChevronRight size={18} className="ml-2" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Story Navigation */}
            <div className="flex justify-center pb-12 space-x-4">
                {stories.map((story, i) => (
                    <button
                        key={story.id}
                        onClick={() => { setActiveIndex(i); setActiveTab('story'); }}
                        className={`w-16 h-16 rounded-full overflow-hidden border-4 transition-all ${activeIndex === i ? 'border-brand-rose scale-110' : 'border-white opacity-60 hover:opacity-100'
                            }`}
                    >
                        <img src={story.img} alt={story.name} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TestimonialTabs;
