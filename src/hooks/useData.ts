import { useState, useEffect, useCallback } from 'react';
import { api } from '../apiClient';
import { db } from '../database';
import { LadyProfile, GentlemanProfile, Tour } from '../types';

// Check if API is available
const checkApiHealth = async (): Promise<boolean> => {
    try {
        const health = await api.health();
        return health.status === 'ok';
    } catch {
        return false;
    }
};

export function useData() {
    const [ladies, setLadies] = useState<LadyProfile[]>([]);
    const [gentlemen, setGentlemen] = useState<GentlemanProfile[]>([]);
    const [tours, setTours] = useState<Tour[]>([]);
    const [loading, setLoading] = useState(true);
    const [useApi, setUseApi] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Initial load
    useEffect(() => {
        const init = async () => {
            setLoading(true);
            const apiAvailable = await checkApiHealth();
            setUseApi(apiAvailable);

            if (apiAvailable) {
                try {
                    const [ladiesData, toursData] = await Promise.all([
                        api.getLadies(),
                        api.getTours()
                    ]);
                    setLadies(ladiesData);
                    setTours(toursData);
                } catch (err) {
                    console.error('API error, falling back to localStorage:', err);
                    setUseApi(false);
                    setLadies(db.ladies.get());
                    setTours(db.tours.get());
                    setGentlemen(db.gentlemen.get());
                }
            } else {
                // Fallback to localStorage
                setLadies(db.ladies.get());
                setTours(db.tours.get());
                setGentlemen(db.gentlemen.get());
            }
            setLoading(false);
        };

        init();
    }, []);

    // Sync to localStorage when not using API
    useEffect(() => {
        if (!useApi && !loading) {
            db.ladies.save(ladies);
        }
    }, [ladies, useApi, loading]);

    useEffect(() => {
        if (!useApi && !loading) {
            db.gentlemen.save(gentlemen);
        }
    }, [gentlemen, useApi, loading]);

    useEffect(() => {
        if (!useApi && !loading) {
            db.tours.save(tours);
        }
    }, [tours, useApi, loading]);

    // Actions
    const addLady = useCallback(async (lady: Omit<LadyProfile, 'id'>) => {
        if (useApi) {
            try {
                const { id } = await api.createLady(lady);
                setLadies(prev => [...prev, { ...lady, id }]);
            } catch (err) {
                setError((err as Error).message);
            }
        } else {
            const id = crypto.randomUUID();
            setLadies(prev => [...prev, { ...lady, id }]);
        }
    }, [useApi]);

    const removeLady = useCallback(async (id: string) => {
        if (useApi) {
            try {
                await api.deleteLady(id);
                setLadies(prev => prev.filter(l => l.id !== id));
            } catch (err) {
                setError((err as Error).message);
            }
        } else {
            setLadies(prev => prev.filter(l => l.id !== id));
        }
    }, [useApi]);

    const addTour = useCallback(async (tour: Omit<Tour, 'id'>) => {
        if (useApi) {
            try {
                const { id } = await api.createTour(tour);
                setTours(prev => [...prev, { ...tour, id }]);
            } catch (err) {
                setError((err as Error).message);
            }
        } else {
            const id = crypto.randomUUID();
            setTours(prev => [...prev, { ...tour, id }]);
        }
    }, [useApi]);

    const removeTour = useCallback(async (id: string) => {
        if (useApi) {
            try {
                await api.deleteTour(id);
                setTours(prev => prev.filter(t => t.id !== id));
            } catch (err) {
                setError((err as Error).message);
            }
        } else {
            setTours(prev => prev.filter(t => t.id !== id));
        }
    }, [useApi]);

    const registerGentleman = useCallback(async (gentleman: Omit<GentlemanProfile, 'id' | 'registrationDate'>) => {
        if (useApi) {
            try {
                const { id } = await api.registerGentleman(gentleman);
                const newGentleman = {
                    ...gentleman,
                    id,
                    registrationDate: new Date().toISOString()
                };
                setGentlemen(prev => [...prev, newGentleman]);
                return newGentleman;
            } catch (err) {
                setError((err as Error).message);
                throw err;
            }
        } else {
            const newGentleman: GentlemanProfile = {
                ...gentleman,
                id: crypto.randomUUID(),
                registrationDate: new Date().toISOString()
            };
            setGentlemen(prev => [...prev, newGentleman]);
            return newGentleman;
        }
    }, [useApi]);

    const submitContact = useCallback(async (data: { name: string; email: string; subject: string; message: string }) => {
        if (useApi) {
            try {
                await api.submitContact(data);
                return true;
            } catch (err) {
                setError((err as Error).message);
                return false;
            }
        }
        // No localStorage fallback for contact - just return success
        return true;
    }, [useApi]);

    return {
        ladies,
        gentlemen,
        tours,
        loading,
        error,
        useApi,
        setLadies,
        setTours,
        addLady,
        removeLady,
        addTour,
        removeTour,
        registerGentleman,
        submitContact
    };
}
