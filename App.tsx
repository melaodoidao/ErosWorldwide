import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LadyProfile, GentlemanProfile, Tour } from './types';
import { db } from './database';
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
    GentlemenPage
} from './pages';
import { SUCCESS_STORIES, OFFICES } from './constants';

const App: React.FC = () => {
    // Mobile menu state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Data state (from database)
    const [ladies, setLadies] = useState<LadyProfile[]>(() => db.ladies.get());
    const [gentlemen, setGentlemen] = useState<GentlemanProfile[]>(() => db.gentlemen.get());
    const [tours, setTours] = useState<Tour[]>(() => db.tours.get());

    // Persist changes to localStorage
    useEffect(() => db.ladies.save(ladies), [ladies]);
    useEffect(() => db.gentlemen.save(gentlemen), [gentlemen]);
    useEffect(() => db.tours.save(tours), [tours]);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleRegister = (newMan: GentlemanProfile) => {
        setGentlemen(prev => [...prev, newMan]);
    };

    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col font-sans bg-[#f1f3f5]">
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
                            element={<LadiesPage ladies={ladies} />}
                        />
                        <Route
                            path="/ladies/:id"
                            element={<LadiesPage ladies={ladies} />}
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
