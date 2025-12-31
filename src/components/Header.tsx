import React from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (open: boolean) => void;
}

const NAV_ITEMS = [
    { path: '/', label: 'The Journey' },
    { path: '/tours', label: 'Tour Dates' },
    { path: '/ladies', label: 'Verified Ladies' },
    { path: '/testimonials', label: 'Success Stories' },
    { path: '/offices', label: 'Offices' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contact', label: 'Contact' },
];

export const Header: React.FC<HeaderProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
    const location = useLocation();

    return (
        <>
            {/* MAIN NAVIGATION - Clean White Header */}
            <nav className="bg-white text-gray-800 sticky top-0 z-50 shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="flex justify-between h-16 items-center">
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="bg-brand-rose p-2 rounded-lg">
                                <Heart fill="currentColor" className="text-white" size={24} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold tracking-tight leading-none text-brand-navy">
                                    EROS<span className="text-brand-rose">.</span>WORLDWIDE
                                </span>
                                <span className="text-[9px] font-medium tracking-wider text-gray-500 uppercase">
                                    Verified International Introductions
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {NAV_ITEMS.map(item => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`px-3 py-2 text-[13px] font-medium rounded-lg transition-all ${location.pathname === item.path
                                        ? 'bg-brand-rose/10 text-brand-rose'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-brand-navy'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link
                                to="/register"
                                className="ml-4 bg-brand-rose text-white px-5 py-2 rounded-lg text-[13px] font-bold uppercase tracking-wide hover:bg-brand-rose/90 transition-all shadow-md shadow-brand-rose/30"
                            >
                                Join Free
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div className="fixed top-0 right-0 bottom-0 w-72 bg-white z-50 lg:hidden shadow-xl">
                        <div className="p-5">
                            <div className="flex justify-between items-center mb-6 pb-4 border-b">
                                <span className="text-lg font-bold text-[#1A1D29]">Menu</span>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1">
                                    <X size={22} />
                                </button>
                            </div>
                            <nav className="space-y-1">
                                {NAV_ITEMS.map(item => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`block w-full text-left py-3 px-4 rounded-lg text-sm font-medium transition-all ${location.pathname === item.path
                                            ? 'bg-[#E8475F] text-white'
                                            : 'hover:bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                            <Link
                                to="/register"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block w-full mt-6 bg-brand-rose text-white py-3 rounded-lg text-sm font-bold uppercase text-center shadow-md"
                            >
                                Join Free
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Header;
