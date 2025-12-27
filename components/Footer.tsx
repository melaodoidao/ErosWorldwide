import React from 'react';
import { Heart, Phone, Activity, Award, Video, Shield, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TopBar: React.FC = () => {
    return (
        <div className="bg-brand-navy text-white py-2 px-4 lg:px-6 flex flex-col md:flex-row justify-between items-center text-[11px] font-semibold tracking-wide">
            <div className="flex space-x-6 items-center">
                <span className="flex items-center text-brand-rose">
                    <Phone size={12} className="mr-1.5" /> (800) 123-MATCH
                </span>
                <span className="hidden lg:flex items-center">
                    <Activity size={12} className="mr-1.5 text-green-400" /> 35,420 Active Ladies
                </span>
                <span className="hidden lg:flex items-center">
                    <Award size={12} className="mr-1.5 text-brand-rose" /> 15,200+ Marriages Since 1995
                </span>
            </div>
            <div className="flex space-x-4 mt-1 md:mt-0">
                <Link to="/testimonials" className="hover:text-brand-rose flex items-center transition-colors text-white">
                    <Video size={11} className="mr-1" /> Video Proof
                </Link>
                <Link to="/legal" className="hover:text-brand-rose flex items-center transition-colors text-white">
                    <Shield size={11} className="mr-1" /> IMBRA
                </Link>
                <Link to="/admin" className="text-gray-400 hover:text-white flex items-center transition-colors">
                    <Lock size={11} className="mr-1" /> Staff
                </Link>
            </div>
        </div>
    );
};

export const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-navy text-gray-400 pt-12 pb-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
                    {/* Logo & Description */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <Heart fill="currentColor" className="text-brand-rose" size={20} />
                            <span className="font-bold text-white text-lg">Eros Worldwide</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Leading the industry with verified international introductions since 1995.
                        </p>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Services</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/tours" className="hover:text-[#E8475F] transition-colors">Romance Tours</Link></li>
                            <li><Link to="/ladies" className="hover:text-[#E8475F] transition-colors">Search Ladies</Link></li>
                            <li><Link to="/testimonials" className="hover:text-[#E8475F] transition-colors">Success Stories</Link></li>
                        </ul>
                    </div>

                    {/* Offices */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Offices</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/offices" className="hover:text-[#E8475F] transition-colors">Kyiv, Ukraine</Link></li>
                            <li><Link to="/offices" className="hover:text-[#E8475F] transition-colors">Medellin, Colombia</Link></li>
                            <li><Link to="/offices" className="hover:text-[#E8475F] transition-colors">Cebu, Philippines</Link></li>
                        </ul>
                    </div>

                    {/* For Men */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">For Men</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/register" className="hover:text-[#E8475F] transition-colors">Register Free</Link></li>
                            <li><Link to="/faq" className="hover:text-[#E8475F] transition-colors">FAQ</Link></li>
                            <li><Link to="/contact" className="hover:text-[#E8475F] transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/legal" className="hover:text-brand-rose transition-colors">IMBRA Compliance</Link></li>
                            <li><Link to="/legal" className="hover:text-brand-rose transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/legal" className="hover:text-brand-rose transition-colors">Anti-Fraud</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>© 1995-2025 Eros Worldwide International. Member AFA Group.</p>
                    <div className="flex items-center space-x-4 mt-2 md:mt-0">
                        <span className="flex items-center text-green-400">
                            <Shield size={14} className="mr-1" /> IMBRA Compliant
                        </span>
                        <span className="text-gray-600">•</span>
                        <span>All ladies physically verified</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
