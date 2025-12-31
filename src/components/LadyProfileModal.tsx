import React, { useState } from 'react';
import {
    X, ShieldCheck, MapPin, Heart, Mail, Video, Calendar,
    Ruler, Eye, Briefcase, GraduationCap, Church, Baby,
    Languages, Cigarette, Wine, ChevronLeft, ChevronRight
} from 'lucide-react';
import { LadyProfile } from '../types';

interface LadyProfileModalProps {
    lady: LadyProfile;
    onClose: () => void;
    onExpressInterest: (ladyId: string) => void;
}

// Extended profile data (simulated - in production would come from API)
const getExtendedProfile = (lady: LadyProfile) => ({
    ...lady,
    weight: '55 kg',
    eyeColor: 'Green',
    education: 'University Degree',
    occupation: 'Marketing Manager',
    religion: 'Christian',
    children: 'None',
    wantsChildren: 'Yes',
    languages: ['English (Good)', 'Ukrainian (Native)'],
    smoking: 'Never',
    drinking: 'Socially',
    aboutMe: `${lady.bio} I am a warm-hearted and sincere woman looking for a serious relationship that can lead to marriage. I value honesty, loyalty, and mutual respect. In my free time, I enjoy cooking, traveling, and spending time with my family. I believe that true love knows no borders, and I am ready to relocate for the right person.`,
    lookingFor: 'I am looking for a kind, caring, and family-oriented man who is ready for a committed relationship. Age is not important to me - what matters is the connection we share and our common goals for the future.',
    photos: [
        lady.imageUrl,
        `https://images.unsplash.com/photo-${1534528741775 + parseInt(lady.id)}?auto=format&fit=crop&q=80&w=600`,
        `https://images.unsplash.com/photo-${1517841905240 + parseInt(lady.id)}?auto=format&fit=crop&q=80&w=600`,
    ],
    videoIntro: true,
    memberSince: '2024',
    lastActive: '2 hours ago',
    profileViews: Math.floor(Math.random() * 500) + 100,
});

export const LadyProfileModal: React.FC<LadyProfileModalProps> = ({ lady, onClose, onExpressInterest }) => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [activeTab, setActiveTab] = useState<'about' | 'looking' | 'photos'>('about');

    const photos = [lady.imageUrl, ...(lady.gallery || [])];

    const nextPhoto = () => setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    const prevPhoto = () => setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);

    return (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative min-h-screen flex items-start justify-center p-4 pt-20">
                <div className="relative bg-white rounded-[3rem] max-w-5xl w-full shadow-2xl overflow-hidden animate-in fade-in duration-300">

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-10 bg-white/90 p-3 rounded-full shadow-lg hover:bg-brand-navy hover:text-white transition-all text-brand-navy"
                    >
                        <X size={24} />
                    </button>

                    <div className="grid lg:grid-cols-2">
                        {/* Left: Photo Gallery */}
                        <div className="relative bg-slate-100">
                            <div className="aspect-[3/4] relative overflow-hidden">
                                <img
                                    src={photos[currentPhotoIndex]}
                                    alt={lady.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600'; }}
                                />

                                {/* Photo navigation */}
                                {photos.length > 1 && (
                                    <>
                                        <button onClick={prevPhoto} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white">
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button onClick={nextPhoto} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white">
                                            <ChevronRight size={24} />
                                        </button>

                                        {/* Photo dots */}
                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                                            {photos.map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setCurrentPhotoIndex(i)}
                                                    className={`w-3 h-3 rounded-full transition-all ${i === currentPhotoIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}

                                {/* Verified badge */}
                                <div className="absolute top-6 left-6">
                                    <div className="bg-white px-4 py-2 rounded-full text-[10px] font-black uppercase flex items-center shadow-xl text-brand-navy">
                                        <ShieldCheck size={14} className="text-brand-rose mr-2" /> Physically Verified
                                    </div>
                                </div>

                                {/* Video intro badge simulation */}
                                <div className="absolute top-6 right-20">
                                    <div className="bg-brand-rose text-brand-navy px-4 py-2 rounded-full text-[10px] font-black uppercase flex items-center shadow-xl cursor-pointer hover:scale-105 transition-transform">
                                        <Video size={14} className="mr-2" /> Video Intro
                                    </div>
                                </div>
                            </div>

                            {/* Thumbnail strip */}
                            <div className="flex p-4 space-x-2 overflow-x-auto">
                                {photos.map((photo, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPhotoIndex(i)}
                                        className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${i === currentPhotoIndex ? 'border-brand-rose' : 'border-transparent opacity-60'}`}
                                    >
                                        <img src={photo} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right: Profile Info */}
                        <div className="p-10 lg:p-12 space-y-8 max-h-[85vh] overflow-y-auto">
                            {/* Header */}
                            <div className="space-y-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-4xl font-black font-serif text-brand-navy">{lady.name}, {lady.age}</h2>
                                        <div className="flex items-center mt-2 text-slate-500">
                                            <MapPin size={16} className="mr-2 text-brand-rose" />
                                            <span className="font-medium text-slate-600">{lady.city}, {lady.country}</span>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ID #{lady.id.slice(0, 4)}00X</span>
                                </div>

                                <div className="flex items-center space-x-4 text-[11px] text-slate-400">
                                    <span className="flex items-center"><Eye size={14} className="mr-1" /> {Math.floor(Math.random() * 500) + 100} views</span>
                                    <span>•</span>
                                    <span>Active 2 hours ago</span>
                                    <span>•</span>
                                    <span>Member since 2024</span>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-slate-50 p-4 rounded-2xl text-center">
                                    <Ruler size={20} className="mx-auto text-brand-rose mb-2" />
                                    <p className="text-xs font-bold text-slate-500">Height</p>
                                    <p className="font-black text-brand-navy">{lady.height}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl text-center">
                                    <Eye size={20} className="mx-auto text-brand-rose mb-2" />
                                    <p className="text-xs font-bold text-slate-500">Eyes</p>
                                    <p className="font-black text-brand-navy">{lady.eyeColor || 'Brown'}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl text-center">
                                    <span className="block text-brand-rose mb-2 text-xl">💇</span>
                                    <p className="text-xs font-bold text-slate-500">Hair</p>
                                    <p className="font-black text-brand-navy">{lady.hairColor}</p>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="flex border-b">
                                {(['about', 'looking', 'photos'] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`py-3 px-6 font-black text-sm uppercase tracking-widest transition-all ${activeTab === tab ? 'border-b-4 border-brand-rose text-brand-navy' : 'text-slate-400'}`}
                                    >
                                        {tab === 'about' ? 'About Me' : tab === 'looking' ? 'Looking For' : 'Gallery'}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            {activeTab === 'about' && (
                                <div className="space-y-6">
                                    <p className="text-slate-600 leading-relaxed">{lady.bio}</p>

                                    <div className="grid grid-cols-2 gap-4 pt-4">
                                        <div className="flex items-center space-x-3 text-sm text-slate-600">
                                            <Briefcase size={18} className="text-brand-rose" />
                                            <div>
                                                <p className="text-slate-400 text-xs text-slate-500">Occupation</p>
                                                <p className="font-bold text-brand-navy">{lady.occupation || 'Marketing Manager'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3 text-sm text-slate-600">
                                            <GraduationCap size={18} className="text-brand-rose" />
                                            <div>
                                                <p className="text-slate-400 text-xs text-slate-500">Education</p>
                                                <p className="font-bold text-brand-navy">{lady.education || 'University Degree'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3 text-sm text-slate-600">
                                            <Church size={18} className="text-brand-rose" />
                                            <div>
                                                <p className="text-slate-400 text-xs text-slate-500">Religion</p>
                                                <p className="font-bold text-brand-navy">{lady.religion || 'Christian'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3 text-sm text-slate-600">
                                            <Baby size={18} className="text-brand-rose" />
                                            <div>
                                                <p className="text-slate-400 text-xs text-slate-500">Children</p>
                                                <p className="font-bold text-brand-navy">{lady.children || 'None'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3 text-sm text-slate-600">
                                            <Languages size={18} className="text-brand-rose" />
                                            <div>
                                                <p className="text-slate-400 text-xs text-slate-500">Languages</p>
                                                <p className="font-bold text-brand-navy">{lady.languages || 'English (Good), Ukrainian (Native)'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3 text-sm text-slate-600">
                                            <Cigarette size={18} className="text-brand-rose" />
                                            <div>
                                                <p className="text-slate-400 text-xs text-slate-500">Smoking / Drinking</p>
                                                <p className="font-bold text-brand-navy">{lady.smoking || 'Never'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'looking' && (
                                <div className="space-y-6">
                                    <p className="text-slate-600 leading-relaxed">
                                        I am looking for a kind, caring, and family-oriented man who is ready for a committed relationship. 
                                        Age is not important to me - what matters is the connection we share and our common goals for the future.
                                    </p>
                                    <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                                        <p className="text-sm text-amber-800">
                                            <strong>Note:</strong> To express interest in {lady.name}, you must first create your introductory profile.
                                            This ensures safety and compliance with IMBRA regulations.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'photos' && (
                                <div className="grid grid-cols-3 gap-4">
                                    {photos.map((photo, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPhotoIndex(i)}
                                            className="aspect-square rounded-2xl overflow-hidden hover:opacity-80 transition-opacity"
                                        >
                                            <img src={photo} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'; }} />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex space-x-4 pt-6 border-t">
                                <button
                                    onClick={() => onExpressInterest(lady.id)}
                                    className="flex-1 bg-brand-navy text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-brand-rose hover:text-white transition-all flex items-center justify-center"
                                >
                                    <Heart size={20} className="mr-3" /> Express Interest
                                </button>
                                <button className="bg-slate-100 text-slate-600 px-6 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center">
                                    <Mail size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LadyProfileModal;
