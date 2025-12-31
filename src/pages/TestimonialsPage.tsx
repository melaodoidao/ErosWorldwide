import React from 'react';
import { PlayCircle, CheckCircle } from 'lucide-react';
import { SuccessStory } from '../types';
import { TestimonialTabs } from '../components';

interface TestimonialsPageProps {
    stories: SuccessStory[];
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ stories }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Page Header */}
            <div className="bg-brand-navy text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-serif font-bold text-white mb-2">Success Stories</h1>
                            <p className="text-gray-400">
                                Real stories from real couples who found love through our tours.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button className="bg-brand-rose text-white px-6 py-2 rounded-lg font-bold text-sm shadow-lg shadow-brand-rose/30 transition-all hover:bg-brand-rose/90">
                                All Stories
                            </button>
                            <button className="bg-white/10 text-white px-6 py-2 rounded-lg font-bold text-sm border border-white/20 hover:bg-white/20 transition-all">
                                Videos Only
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonial Tabs Section */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <TestimonialTabs stories={stories} />
            </div>

            {/* Stories Grid */}
            <div className="max-w-7xl mx-auto px-4 pb-20">
                <h2 className="text-2xl font-bold text-brand-navy mb-8">Recent Couple Profiles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stories.map((story) => (
                        <div
                            key={story.id}
                            className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all group"
                        >
                            <div className="h-56 overflow-hidden relative">
                                <img
                                    src={story.img}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    alt={story.name}
                                />
                                {story.video && (
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="bg-white rounded-full p-4 shadow-xl">
                                            <PlayCircle size={32} className="text-brand-rose" />
                                        </div>
                                    </div>
                                )}
                                <div className="absolute top-4 right-4">
                                    <div className="bg-white/90 backdrop-blur-sm text-[#10B981] px-3 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1">
                                        <CheckCircle size={10} />
                                        Verified Connection
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-brand-navy">{story.name}</h3>
                                    <p className="text-sm text-brand-rose font-bold uppercase tracking-tight">{story.location}</p>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                                    "{story.story}"
                                </p>
                                <button className="text-sm font-bold text-brand-navy hover:text-brand-rose flex items-center gap-1 transition-colors">
                                    Read Full Journey
                                    <CheckCircle size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestimonialsPage;
