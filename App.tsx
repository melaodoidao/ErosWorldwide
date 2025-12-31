import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GentlemanProfile } from './types';
import { useData } from './hooks/useData';
import { Header, TopBar, Footer } from './components';
import {
    HomePage,
    LadiesPage,
    ToursPage,
    TestimonialsPage,
    OfficesPage,
    FAQPage,
    PhilosophyPage,
    LegalPage,
    ContactPage,
    AdminPage,
    GentlemenPage,
    PersonalityTestPage
} from './pages';
import { SUCCESS_STORIES, OFFICES } from './constants';

const App: React.FC = () => {
    // Mobile menu state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Data state (from API with localStorage fallback)
    const {
        ladies,
        gentlemen,
        tours,
        loading,
        useApi,
        setLadies,
        setTours,
        registerGentleman
    } = useData();

    // Current user state (for personality test - uses first gentleman or creates demo user)
    const [currentUser, setCurrentUser] = useState<GentlemanProfile | null>(null);

    // Initialize currentUser when gentlemen loads
    useEffect(() => {
        if (!loading && !currentUser) {
            if (gentlemen.length > 0) {
                setCurrentUser(gentlemen[0]);
            } else {
                // Create a demo user if none exists
                const demoUser: GentlemanProfile = {
                    id: 'demo-user',
                    email: 'demo@example.com',
                    name: 'Demo User',
                    age: 35,
                    profession: 'Professional',
                    location: 'United States',
                    bio: 'Demo user for testing personality features',
                    verified: false,
                    registrationDate: new Date().toISOString(),
                };
                setCurrentUser(demoUser);
            }
        }
    }, [loading, gentlemen, currentUser]);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleRegister = async (newMan: Omit<GentlemanProfile, 'id' | 'registrationDate'>) => {
        try {
            await registerGentleman(newMan);
            return true;
        } catch (err) {
            console.error('Registration failed:', err);
            return false;
        }
    };

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f1f3f5]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E8475F] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col font-sans bg-[#f1f3f5]">
                {/* API Status Indicator (dev only) */}
                {import.meta.env.DEV && (
                    <div className={`fixed bottom-4 right-4 z-50 px-3 py-1 rounded-full text-xs font-bold ${useApi ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}`}>
                        {useApi ? '🔌 API Connected' : '💾 LocalStorage'}
                    </div>
                )}

                {/* Top Bar */}
                <TopBar />

                {/* Header with Navigation */}
                <Header
                    isMobileMenuOpen={isMobileMenuOpen}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                />

                {/* Main Content - Routes */}
                <main className="flex-grow">
                    <Routes>
                        {/* Home Page */}
                        <Route
                            path="/"
                            element={<HomePage ladies={ladies} tours={tours} stories={SUCCESS_STORIES} />}
                        />

                        {/* Ladies Page */}
                        <Route
                            path="/ladies"
                            element={<LadiesPage ladies={ladies} currentUser={currentUser} />}
                        />
                        <Route
                            path="/ladies/:id"
                            element={<LadiesPage ladies={ladies} currentUser={currentUser} />}
                        />

                        {/* Tours Page */}
                        <Route
                            path="/tours"
                            element={<ToursPage tours={tours} />}
                        />
                        <Route
                            path="/tours/:id"
                            element={<ToursPage tours={tours} />}
                        />

                        {/* Personality Test */}
                        <Route
                            path="/personality"
                            element={
                                <PersonalityTestPage
                                    currentUser={currentUser}
                                    onUpdateUser={(user) => {
                                        setCurrentUser(user);
                                    }}
                                />
                            }
                        />

                        {/* Extracted Pages */}
                        <Route path="/testimonials" element={<TestimonialsPage stories={SUCCESS_STORIES} />} />
                        <Route path="/offices" element={<OfficesPage offices={OFFICES} />} />
                        <Route path="/faq" element={<FAQPage />} />
                        <Route path="/philosophy" element={<PhilosophyPage />} />
                        <Route path="/legal" element={<LegalPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route
                            path="/register"
                            element={<GentlemenPage onRegister={handleRegister} />}
                        />
                        <Route
                            path="/admin"
                            element={
                                <AdminPage
                                    ladies={ladies}
                                    setLadies={setLadies}
                                    tours={tours}
                                    setTours={setTours}
                                />
                            }
                        />

                        {/* 404 */}
                        <Route path="*" element={<FAQPage />} />
                    </Routes>
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default App;
