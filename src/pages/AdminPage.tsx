import React, { useState, useEffect, useRef } from "react";
import {
  Lock,
  Database,
  LogOut,
  Users,
  Calendar,
  Sparkles,
  Loader,
  Plus,
  ShieldCheck,
  MapPin,
  Ruler,
  Eye,
  Briefcase,
  GraduationCap,
  Church,
  Baby,
  Heart,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Terminal,
} from "lucide-react";
import { LadyProfile, Tour } from "../types";
import { api } from "../apiClient";
import JSON5 from "json5";

interface AdminPageProps {
  ladies: LadyProfile[];
  setLadies: React.Dispatch<React.SetStateAction<LadyProfile[]>>;
  tours: Tour[];
  setTours: React.Dispatch<React.SetStateAction<Tour[]>>;
}

const TypingText: React.FC<{ text: string; speed?: number }> = ({
  text,
  speed = 30,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const index = useRef(0);

  useEffect(() => {
    setDisplayedText("");
    index.current = 0;
    const interval = setInterval(() => {
      if (index.current < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index.current));
        index.current++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

export const AdminPage: React.FC<AdminPageProps> = ({
  ladies,
  setLadies,
  tours,
  setTours,
}) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminSubTab, setAdminSubTab] = useState<
    "ladies" | "tours" | "ai-generator"
  >("ladies");
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });

  const [ladyForm, setLadyForm] = useState<Partial<LadyProfile>>({
    name: "",
    age: 0,
    city: "",
    country: "",
    bio: "",
    imageUrl: "",
    verified: true,
    height: "5'6\"",
    hairColor: "Brunette",
    drinking: "Socially",
    lookingFor: "",
    idPhotoUrl: "",
  });
  const [editingLadyId, setEditingLadyId] = useState<string | null>(null);
  const [tourForm, setTourForm] = useState<Partial<Tour>>({
    city: "",
    countries: [],
    startDate: "",
    endDate: "",
    checkInTime: "",
    price: "",
    status: "Open",
    image: "",
  });
  const [editingTourId, setEditingTourId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLady, setGeneratedLady] = useState<LadyProfile | null>(null);
  const [attractivenessLevel, setAttractivenessLevel] = useState<number>(7); // 0-10 scale
  const [genStep, setGenStep] = useState<
    "idle" | "persona" | "imaging" | "finalizing"
  >("idle");
  const [previewTab, setPreviewTab] = useState<"about" | "looking">(
    "about",
  );
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      loginForm.username === "admin" &&
      loginForm.password === "password123"
    ) {
      setIsAdminLoggedIn(true);
    } else {
      alert("Invalid credentials.");
    }
  };

  const handleGenerateLady = async () => {
    setIsGenerating(true);
    setGenStep("persona");
    setLogs(["[SYSTEM] Initializing Generation Engine...", "[SYSTEM] Attractiveness set to " + attractivenessLevel + "/10"]);
    // Initialize with empty structure to prevent UI errors
    setGeneratedLady({
      id: "temp-" + Date.now(),
      name: "",
      age: 0,
      city: "",
      country: "",
      bio: "",
      verified: true,
      imageUrl: "",
      gallery: [],
      idPhotoUrl: "",
      height: "",
      hairColor: "",
      eyeColor: "",
      occupation: "",
      education: "",
      religion: "",
      children: "",
      languages: "",
      smoking: "",
    });

    try {
      // Use ADK endpoint - backend handles persona + images + save
      const eventSource = new EventSource(
        `/api/ladies/generate-adk?attractiveness=${attractivenessLevel}`,
      );

      let fullText = "";

      await new Promise<void>((resolve, reject) => {
        eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            if (data.type === 'progress') {
              const msg = (data.message || '').toLowerCase();
              if (msg && !msg.includes('streaming')) {
                setLogs(prev => [...prev.slice(-4), `[AGENT] ${data.message}`]);
              }

              if (msg.includes('llmagent') || msg.includes('starting')) {
                setGenStep("persona");
              } else if (msg.includes('id photo') || msg.includes('lifestyle')) {
                setGenStep("imaging");
              } else if (msg.includes('complete')) {
                setGenStep("finalizing");
              }

              if (data.profile) {
                setGeneratedLady(prev => ({
                  ...prev,
                  ...data.profile,
                  id: prev?.id || data.profile.id
                }) as LadyProfile);
              }
            } else if (data.type === 'complete') {
              setLogs(prev => [...prev, "[SYSTEM] Generation Complete."]);
              const profile = data.profile;
              setGeneratedLady(profile as LadyProfile);
              setLadies((prev) => [profile as LadyProfile, ...prev]);
              eventSource.close();
              resolve();
            }
          } catch (e) {
            console.log("SSE parse:", event.data);
          }
        };

        eventSource.onerror = (err) => {
          console.error("EventSource failed:", err);
          eventSource.close();
          reject(err);
        };
      });

    } catch (error) {
      console.error(error);
      alert("Failed to generate profile. Check console.");
    } finally {
      setIsGenerating(false);
      setGenStep("idle");
    }
  };

  const saveLady = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLadyId) {
      setLadies(
        ladies.map((l) =>
          l.id === editingLadyId ? ({ ...l, ...ladyForm } as LadyProfile) : l,
        ),
      );
      setEditingLadyId(null);
    } else {
      const newLady: LadyProfile = {
        ...ladyForm,
        id: Math.random().toString(36).substr(2, 9),
        verified: true,
      } as LadyProfile;
      setLadies([...ladies, newLady]);
    }
    setLadyForm({
      name: "",
      age: 0,
      city: "",
      country: "",
      bio: "",
      imageUrl: "",
      verified: true,
      height: "5'6\"",
      hairColor: "Brunette",
    });
  };

  const saveTour = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTourId) {
      setTours(
        tours.map((t) =>
          t.id === editingTourId ? ({ ...t, ...tourForm } as Tour) : t,
        ),
      );
      setEditingTourId(null);
    } else {
      const newTour: Tour = {
        ...tourForm,
        id: Math.random().toString(36).substr(2, 9),
        countries: [],
        status: "Open",
      } as Tour;
      setTours([...tours, newTour]);
    }
    setTourForm({
      city: "",
      countries: [],
      startDate: "",
      endDate: "",
      checkInTime: "",
      price: "",
      status: "Open",
      image: "",
    });
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-xl mb-6 text-brand-rose">
              <Lock size={40} />
            </div>
            <h1 className="text-4xl font-serif font-bold text-brand-navy mb-2">
              Staff Portal
            </h1>
            <p className="text-gray-500">Please authenticate to continue.</p>
          </div>

          <form
            onSubmit={handleAdminLogin}
            className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-6"
          >
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Staff ID"
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, username: e.target.value })
                }
                className="w-full bg-gray-50 px-6 py-4 rounded-2xl border-2 border-transparent focus:border-brand-rose focus:bg-white outline-none font-medium transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                className="w-full bg-gray-50 px-6 py-4 rounded-2xl border-2 border-transparent focus:border-brand-rose focus:bg-white outline-none font-medium transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-navy text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-brand-rose hover:shadow-xl hover:shadow-brand-rose/20 transition-all font-bold"
            >
              Enter Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-navy text-white py-8">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-brand-rose p-2 rounded-xl">
              <Database size={24} className="text-brand-navy" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
              <p className="text-xs text-gray-400 uppercase tracking-widest">
                Management System v2.4
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAdminLoggedIn(false)}
            className="flex items-center gap-2 text-gray-400 hover:text-red-400 font-bold transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Sub-navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 flex gap-8">
          <button
            onClick={() => setAdminSubTab("ladies")}
            className={`py-6 font-bold text-sm uppercase tracking-widest border-b-2 transition-all ${adminSubTab === "ladies" ? "border-brand-rose text-brand-navy" : "border-transparent text-gray-400 hover:text-gray-600"}`}
          >
            <div className="flex items-center gap-2">
              <Users size={18} /> Lady Profiles
            </div>
          </button>
          <button
            onClick={() => setAdminSubTab("tours")}
            className={`py-6 font-bold text-sm uppercase tracking-widest border-b-2 transition-all ${adminSubTab === "tours" ? "border-brand-rose text-brand-navy" : "border-transparent text-gray-400 hover:text-gray-600"}`}
          >
            <div className="flex items-center gap-2">
              <Calendar size={18} /> Tour Schedule
            </div>
          </button>
          <button
            onClick={() => setAdminSubTab("ai-generator")}
            className={`py-6 font-bold text-sm uppercase tracking-widest border-b-2 transition-all ${adminSubTab === "ai-generator" ? "border-brand-rose text-brand-navy" : "border-transparent text-gray-400 hover:text-gray-600"}`}
          >
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-brand-rose" /> AI Profile
              Empire
            </div>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {adminSubTab === "ai-generator" && (
          <div className="space-y-12 max-w-5xl mx-auto">
            <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 text-center space-y-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-brand-rose/10 rounded-full mb-4">
                <Sparkles size={48} className="text-brand-rose animate-pulse" />
              </div>
              <div className="max-w-2xl mx-auto">
                <h3 className="text-4xl font-black font-serif text-brand-navy mb-4">
                  AI Profile Generation
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  Create a high-fidelity international romance profile
                  instantly. Our AI generates authentic personas, sincere
                  biographies, and professional-grade photography using Nano
                  Banana Pro.
                </p>
              </div>

              {/* Attractiveness Level Slider */}
              <div className="max-w-md mx-auto mb-8 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-brand-ash font-medium">
                    Attractiveness Level
                  </label>
                  <span className="text-brand-navy font-bold text-xl">
                    {attractivenessLevel}/10
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={attractivenessLevel}
                    onChange={(e) => setAttractivenessLevel(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-rose"
                    style={{
                      background: `linear-gradient(to right, #1a365d ${attractivenessLevel * 10}%, #e2e8f0 ${attractivenessLevel * 10}%)`,
                    }}
                    disabled={isGenerating}
                  />
                </div>
                <div className="flex justify-between text-xs text-brand-ash mt-2">
                  <span>0 - Girl Next Door</span>
                  <span>5 - Attractive</span>
                  <span>10 - Supermodel</span>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={handleGenerateLady}
                  disabled={isGenerating}
                  className="px-12 py-6 bg-brand-navy text-white rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-brand-rose hover:shadow-2xl transition-all disabled:opacity-50 flex items-center gap-4"
                >
                  {isGenerating ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <Plus size={24} />
                  )}
                  {isGenerating
                    ? "Generating Legacy..."
                    : "Generate New AI Profile"}
                </button>
              </div>

              {isGenerating && (
                <div className="space-y-4 pt-8">
                  <div className="flex justify-center gap-8">
                    <div
                      className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest ${genStep === "persona" ? "text-brand-rose" : "text-gray-300"}`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${genStep === "persona" ? "bg-brand-rose animate-ping" : "bg-gray-200"}`}
                      />
                      Persona
                    </div>
                    <div
                      className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest ${genStep === "imaging" ? "text-brand-rose" : "text-gray-300"}`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${genStep === "imaging" ? "bg-brand-rose animate-ping" : "bg-gray-200"}`}
                      />
                      Imaging
                    </div>
                    <div
                      className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest ${genStep === "finalizing" ? "text-brand-rose" : "text-gray-300"}`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${genStep === "finalizing" ? "bg-brand-rose animate-ping" : "bg-gray-200"}`}
                      />
                      Publishing
                    </div>
                  </div>
                  <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-rose transition-all duration-1000"
                      style={{
                        width:
                          genStep === "persona"
                            ? "33%"
                            : genStep === "imaging"
                              ? "66%"
                              : genStep === "finalizing"
                                ? "95%"
                                : "0%",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* LIVE GENERATION STATUS - CLEAN LUXURY STYLE */}
              {isGenerating && logs.length > 0 && (
                <div className="max-w-2xl mx-auto mt-8 bg-white rounded-[2.5rem] p-10 text-left shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-3 h-3 rounded-full bg-brand-rose animate-ping absolute inset-0 opacity-20" />
                        <div className="w-3 h-3 rounded-full bg-brand-rose relative" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-navy/40">
                        Curation Engine Status
                      </span>
                    </div>
                    <div className="px-4 py-1.5 bg-brand-navy/5 rounded-full">
                      <span className="text-[9px] font-black text-brand-navy/60 uppercase tracking-widest">
                        Session #ADK-{new Date().getSeconds()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {logs.map((log, i) => (
                      <div key={i} className="flex gap-5 items-start animate-in fade-in slide-in-from-left-2 duration-500">
                        <div className="mt-1.5 w-1 h-1 rounded-full bg-brand-rose/30 flex-shrink-0" />
                        <p className="text-sm font-semibold text-brand-navy/70 leading-relaxed">
                          {log.replace('[SYSTEM] ', '').replace('[AGENT] ', '')}
                        </p>
                      </div>
                    ))}

                    <div className="flex gap-5 items-center pt-2">
                      <div className="w-1 h-1 rounded-full bg-brand-rose flex-shrink-0 animate-pulse" />
                      <div className="flex items-center gap-3">
                        <Loader size={14} className="animate-spin text-brand-rose/40" />
                        <span className="text-[10px] font-bold text-brand-rose uppercase tracking-[0.2em] animate-pulse">
                          Perfecting details...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {generatedLady && (
              <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
                <div className="text-center mb-8">
                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-200 shadow-sm">
                    ✨{" "}
                    {isGenerating
                      ? "Construction in Progress..."
                      : "AI Profile Generated Successfully"}
                  </span>
                </div>
                <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
                  <div className="grid lg:grid-cols-2">
                    {/* Left Side - Image Carousel */}
                    <div className="relative bg-slate-100 h-full min-h-[600px]">
                      <div className="h-full relative overflow-hidden group">
                        {(() => {
                          // Build the carousel images array: idPhoto first, then gallery
                          const allPhotos = [
                            generatedLady.imageUrl || generatedLady.idPhotoUrl,
                            ...(generatedLady.gallery || [])
                          ].filter(Boolean) as string[];

                          if (allPhotos.length === 0) {
                            return (
                              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-200 animate-pulse space-y-4">
                                <Loader className="animate-spin text-brand-navy" size={48} />
                                <p className="text-brand-navy font-black uppercase tracking-widest text-xs">
                                  Developing Image...
                                </p>
                              </div>
                            );
                          }

                          const currentPhotoIndex = Math.min(activePhotoIndex, allPhotos.length - 1);

                          return (
                            <>
                              <img
                                src={allPhotos[currentPhotoIndex]}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 animate-in fade-in duration-300"
                                alt={`${generatedLady.name} - Photo ${currentPhotoIndex + 1}`}
                                key={currentPhotoIndex}
                              />

                              {/* Navigation Arrows */}
                              {allPhotos.length > 1 && (
                                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <button
                                    onClick={() => setActivePhotoIndex(prev => prev > 0 ? prev - 1 : allPhotos.length - 1)}
                                    className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-brand-navy shadow-xl hover:bg-brand-rose hover:text-white transition-all transform hover:scale-110"
                                  >
                                    <ChevronLeft size={24} />
                                  </button>
                                  <button
                                    onClick={() => setActivePhotoIndex(prev => prev < allPhotos.length - 1 ? prev + 1 : 0)}
                                    className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-brand-navy shadow-xl hover:bg-brand-rose hover:text-white transition-all transform hover:scale-110"
                                  >
                                    <ChevronRight size={24} />
                                  </button>
                                </div>
                              )}

                              {/* Photo Counter */}
                              {allPhotos.length > 1 && (
                                <div className="absolute bottom-6 right-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white text-[10px] font-black tracking-widest uppercase">
                                  {currentPhotoIndex + 1} / {allPhotos.length}
                                </div>
                              )}

                              {/* Dot Indicators */}
                              {allPhotos.length > 1 && (
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                  {allPhotos.map((_, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => setActivePhotoIndex(idx)}
                                      className={`w-2 h-2 rounded-full transition-all ${idx === currentPhotoIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'}`}
                                    />
                                  ))}
                                </div>
                              )}
                            </>
                          );
                        })()}

                        <div className="absolute top-6 left-6 animate-in fade-in slide-in-from-top-4 duration-1000 delay-300">
                          <div className="bg-white/90 px-4 py-2 rounded-full text-[10px] font-black uppercase flex items-center shadow-xl text-brand-navy backdrop-blur-md">
                            <ShieldCheck size={14} className="text-brand-rose mr-2" /> Physically Verified
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Info */}
                    <div className="p-12 flex flex-col h-full">
                      <div className="space-y-8 flex-1">
                        {/* Header */}
                        <div className="flex justify-between items-start">
                          <div className="flex gap-6 items-start">
                            {generatedLady.idPhotoUrl && (
                              <div className="w-24 h-32 rounded-xl overflow-hidden border-4 border-white shadow-xl rotate-[-2deg] animate-in zoom-in duration-700">
                                <img
                                  src={generatedLady.idPhotoUrl}
                                  className="w-full h-full object-cover"
                                  alt="ID"
                                />
                              </div>
                            )}
                            <div>
                              <h2 className="text-5xl font-black font-serif text-brand-navy">
                                {generatedLady.name ? (
                                  `${generatedLady.name}${generatedLady.age ? `, ${generatedLady.age}` : ''}`
                                ) : (
                                  "..."
                                )}
                              </h2>
                              <div className="flex items-center mt-3 text-slate-500">
                                <MapPin
                                  size={20}
                                  className="mr-2 text-brand-rose"
                                />
                                <span className="text-lg font-medium">
                                  {generatedLady.city}, {generatedLady.country}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="block text-xs font-black text-slate-300 uppercase tracking-widest mb-1">
                              INTERNAL ID
                            </span>
                            <div className="flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider gap-2">
                              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>{" "}
                              SYSTEM ONLINE
                            </div>
                          </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-6">
                          <div className="bg-slate-50 p-6 rounded-3xl text-center border border-slate-100">
                            <Ruler
                              size={24}
                              className="mx-auto text-brand-rose mb-2"
                            />
                            <p className="text-xs font-bold text-slate-400 uppercase">
                              Height
                            </p>
                            <p className="font-black text-brand-navy text-xl">
                              {generatedLady.height}
                            </p>
                          </div>
                          <div className="bg-slate-50 p-6 rounded-3xl text-center border border-slate-100">
                            <Eye
                              size={24}
                              className="mx-auto text-brand-rose mb-2"
                            />
                            <p className="text-xs font-bold text-slate-400 uppercase">
                              Eyes
                            </p>
                            <p className="font-black text-brand-navy text-xl">
                              {generatedLady.eyeColor}
                            </p>
                          </div>
                          <div className="bg-slate-50 p-6 rounded-3xl text-center border border-slate-100">
                            <span className="block text-brand-rose mb-2 text-2xl">
                              💇
                            </span>
                            <p className="text-xs font-bold text-slate-400 uppercase">
                              Hair
                            </p>
                            <p className="font-black text-brand-navy text-xl">
                              {generatedLady.hairColor}
                            </p>
                          </div>
                        </div>

                        {/* Tabs Navigation */}
                        <div className="flex border-b border-gray-100">
                          {(["about", "looking"] as const).map(
                            (tab) => (
                              <button
                                key={tab}
                                onClick={() => setPreviewTab(tab)}
                                className={`py-4 px-6 font-black text-xs uppercase tracking-[0.15em] transition-all relative ${previewTab === tab
                                  ? "text-brand-navy"
                                  : "text-slate-400 hover:text-slate-600"
                                  }`}
                              >
                                {tab === "about" ? "About Me" : "Looking For"}
                                {previewTab === tab && (
                                  <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-rose rounded-t-full" />
                                )}
                              </button>
                            ),
                          )}
                        </div>

                        {/* Tab Content */}
                        <div className="min-h-[300px]">
                          {previewTab === "about" && (
                            <div className="space-y-8">
                              <p className="text-slate-600 leading-relaxed text-lg italic font-serif whitespace-pre-wrap">
                                {generatedLady.bio || "..."}
                              </p>

                              <div className="grid grid-cols-2 gap-y-6 gap-x-8 pt-6 border-t border-gray-100">
                                <div className="flex items-center gap-4">
                                  <Briefcase
                                    size={20}
                                    className="text-brand-rose"
                                  />
                                  <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                                      Occupation
                                    </p>
                                    <p className="font-bold text-brand-navy">
                                      {generatedLady.occupation}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <GraduationCap
                                    size={20}
                                    className="text-brand-rose"
                                  />
                                  <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                                      Education
                                    </p>
                                    <p className="font-bold text-brand-navy">
                                      {generatedLady.education}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <Church
                                    size={20}
                                    className="text-brand-rose"
                                  />
                                  <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                                      Religion
                                    </p>
                                    <p className="font-bold text-brand-navy">
                                      {generatedLady.religion}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <Baby size={20} className="text-brand-rose" />
                                  <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                                      Children
                                    </p>
                                    <p className="font-bold text-brand-navy">
                                      {generatedLady.children}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4 col-span-2">
                                  <div className="text-brand-rose">🍷</div>
                                  <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                                      Lifestyle (Smoke / Drink)
                                    </p>
                                    <p className="font-bold text-brand-navy">
                                      {generatedLady.smoking} /{" "}
                                      {generatedLady.drinking || "Socially"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {previewTab === "looking" && (
                            <div className="space-y-6 pt-4">
                              <p className="text-slate-600 leading-relaxed text-lg italic font-serif">
                                {generatedLady.lookingFor ? (
                                  <TypingText
                                    text={generatedLady.lookingFor}
                                    speed={10}
                                  />
                                ) : (
                                  '"I am looking for a sincere partner..."'
                                )}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex space-x-4 pt-8 mt-4 border-t border-gray-100">
                        <button className="flex-1 bg-brand-navy text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest opacity-50 cursor-not-allowed flex items-center justify-center">
                          <Heart size={20} className="mr-3" /> Waiting for
                          finalization...
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {adminSubTab === "ladies" && (
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 sticky top-32">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-brand-navy">
                <Plus size={24} className="text-brand-rose" />
                {editingLadyId ? "Update Profile" : "Register New Lady"}
              </h3>

              <form onSubmit={saveLady} className="space-y-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={ladyForm.name || ""}
                  onChange={(e) =>
                    setLadyForm({ ...ladyForm, name: e.target.value })
                  }
                  className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Age"
                    required
                    value={ladyForm.age || ""}
                    onChange={(e) =>
                      setLadyForm({
                        ...ladyForm,
                        age: parseInt(e.target.value),
                      })
                    }
                    className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={ladyForm.city || ""}
                    onChange={(e) =>
                      setLadyForm({ ...ladyForm, city: e.target.value })
                    }
                    className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Drinking (e.g. Socially)"
                    value={ladyForm.drinking || ""}
                    onChange={(e) =>
                      setLadyForm({ ...ladyForm, drinking: e.target.value })
                    }
                    className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm"
                  />
                  <input
                    type="text"
                    placeholder="ID Photo URL"
                    value={ladyForm.idPhotoUrl || ""}
                    onChange={(e) =>
                      setLadyForm({ ...ladyForm, idPhotoUrl: e.target.value })
                    }
                    className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Country"
                  required
                  value={ladyForm.country || ""}
                  onChange={(e) =>
                    setLadyForm({ ...ladyForm, country: e.target.value })
                  }
                  className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm"
                />
                <textarea
                  placeholder="Member Bio"
                  rows={4}
                  value={ladyForm.bio || ""}
                  onChange={(e) =>
                    setLadyForm({ ...ladyForm, bio: e.target.value })
                  }
                  className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm resize-none"
                />
                <textarea
                  placeholder="Looking For (e.g. A kind man...)"
                  rows={3}
                  value={ladyForm.lookingFor || ""}
                  onChange={(e) =>
                    setLadyForm({ ...ladyForm, lookingFor: e.target.value })
                  }
                  className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-brand-rose text-brand-navy py-5 rounded-2xl font-bold uppercase tracking-widest hover:shadow-lg transition-all"
                >
                  {editingLadyId ? "Save Changes" : "Publish Profile"}
                </button>
                {editingLadyId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingLadyId(null);
                      setLadyForm({});
                    }}
                    className="w-full text-gray-400 font-bold text-xs uppercase hover:text-gray-600"
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </div>

            {/* List */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">
                Active Profiles ({ladies.length})
              </h3>
              {ladies.map((lady) => (
                <div
                  key={lady.id}
                  className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={lady.imageUrl}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-50"
                      alt={lady.name}
                    />
                    <div>
                      <h4 className="font-bold text-brand-navy">
                        {lady.name}, {lady.age}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {lady.city}, {lady.country}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setLadyForm(lady);
                        setEditingLadyId(lady.id);
                      }}
                      className="p-3 bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("Delete profile?"))
                          setLadies(ladies.filter((l) => l.id !== lady.id));
                      }}
                      className="p-3 bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {adminSubTab === "tours" && (
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 sticky top-32">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-brand-navy">
                <Plus size={24} className="text-brand-rose" />
                {editingTourId ? "Edit Event" : "Schedule New Tour"}
              </h3>
              <form onSubmit={saveTour} className="space-y-6">
                <input
                  type="text"
                  placeholder="Destination City"
                  required
                  value={tourForm.city || ""}
                  onChange={(e) =>
                    setTourForm({ ...tourForm, city: e.target.value })
                  }
                  className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    placeholder="Start Date"
                    required
                    value={tourForm.startDate || ""}
                    onChange={(e) =>
                      setTourForm({ ...tourForm, startDate: e.target.value })
                    }
                    className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm cursor-pointer"
                  />
                  <input
                    type="date"
                    placeholder="End Date"
                    required
                    value={tourForm.endDate || ""}
                    onChange={(e) =>
                      setTourForm({ ...tourForm, endDate: e.target.value })
                    }
                    className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm cursor-pointer"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Price (e.g., $2,995)"
                    required
                    value={tourForm.price || ""}
                    onChange={(e) =>
                      setTourForm({ ...tourForm, price: e.target.value })
                    }
                    className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm"
                  />
                  <select
                    value={tourForm.status || "Open"}
                    onChange={(e) =>
                      setTourForm({
                        ...tourForm,
                        status: e.target.value as Tour["status"],
                      })
                    }
                    className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm appearance-none cursor-pointer"
                  >
                    <option value="Open">Status: Open</option>
                    <option value="Filling Fast">Status: Filling Fast</option>
                    <option value="Waitlist">Status: Waitlist</option>
                    <option value="Closed">Status: Closed</option>
                  </select>
                </div>
                <input
                  type="url"
                  placeholder="Promotional Image URL"
                  value={tourForm.image || ""}
                  onChange={(e) =>
                    setTourForm({ ...tourForm, image: e.target.value })
                  }
                  className="w-full bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus:border-brand-rose outline-none font-medium text-sm"
                />
                <button
                  type="submit"
                  className="w-full bg-brand-rose text-brand-navy py-5 rounded-2xl font-bold uppercase tracking-widest hover:shadow-lg transition-all"
                >
                  {editingTourId ? "Update Schedule" : "Launch Tour"}
                </button>
                {editingTourId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingTourId(null);
                      setTourForm({});
                    }}
                    className="w-full text-gray-400 font-bold text-xs uppercase hover:text-gray-600"
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </div>

            {/* List */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">
                Upcoming Tours ({tours.length})
              </h3>
              {tours.map((tour) => (
                <div
                  key={tour.id}
                  className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={tour.image}
                      className="w-20 h-16 rounded-2xl object-cover border-2 border-gray-50"
                      alt={tour.city}
                    />
                    <div>
                      <h4 className="font-bold text-brand-navy">{tour.city}</h4>
                      <p className="text-sm text-gray-400">
                        {tour.startDate} • {tour.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setTourForm(tour);
                        setEditingTourId(tour.id);
                      }}
                      className="p-3 bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("Delete tour?"))
                          setTours(tours.filter((t) => t.id !== tour.id));
                      }}
                      className="p-3 bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
