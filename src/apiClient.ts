// In production, API is served from same origin via nginx proxy
// In development, Vite proxys /api and /uploads to localhost:3001
const API_URL = import.meta.env.VITE_API_URL || '';

import { LadyProfile, GentlemanProfile, Tour } from './types';

class ApiClient {
    public baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    // Ladies
    async getLadies(): Promise<LadyProfile[]> {
        const res = await fetch(`${this.baseUrl}/api/ladies`);
        if (!res.ok) throw new Error('Failed to fetch ladies');
        return res.json();
    }

    async getLady(id: string): Promise<LadyProfile> {
        const res = await fetch(`${this.baseUrl}/api/ladies/${id}`);
        if (!res.ok) throw new Error('Lady not found');
        return res.json();
    }

    async createLady(lady: Omit<LadyProfile, 'id'>): Promise<{ id: string }> {
        const res = await fetch(`${this.baseUrl}/api/ladies`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lady)
        });
        if (!res.ok) throw new Error('Failed to create lady');
        return res.json();
    }

    async generateLady(): Promise<LadyProfile> {
        const res = await fetch(`${this.baseUrl}/api/ladies/generate`, {
            method: 'POST'
        });
        if (!res.ok) throw new Error('Failed to generate lady');
        return res.json();
    }

    async generatePersona(): Promise<any> {
        const res = await fetch(`${this.baseUrl}/api/ladies/generate-persona`, {
            method: 'POST'
        });
        if (!res.ok) throw new Error('Failed to generate persona');
        return res.json();
    }

    async generateImage(prompt: string, appearance: string): Promise<{ imageUrl: string }> {
        const res = await fetch(`${this.baseUrl}/api/ladies/generate-image`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, appearance })
        });
        if (!res.ok) throw new Error('Failed to generate image');
        return res.json();
    }

    async saveLady(lady: LadyProfile): Promise<{ id: string }> {
        const res = await fetch(`${this.baseUrl}/api/ladies/save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lady)
        });
        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.error || 'Failed to save lady');
        }
        return res.json();
    }

    async deleteLady(id: string): Promise<void> {
        const res = await fetch(`${this.baseUrl}/api/ladies/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Failed to delete lady');
    }

    // Tours
    async getTours(): Promise<Tour[]> {
        const res = await fetch(`${this.baseUrl}/api/tours`);
        if (!res.ok) throw new Error('Failed to fetch tours');
        return res.json();
    }

    async createTour(tour: Omit<Tour, 'id'>): Promise<{ id: string }> {
        const res = await fetch(`${this.baseUrl}/api/tours`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tour)
        });
        if (!res.ok) throw new Error('Failed to create tour');
        return res.json();
    }

    async deleteTour(id: string): Promise<void> {
        const res = await fetch(`${this.baseUrl}/api/tours/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Failed to delete tour');
    }

    // Gentlemen
    async registerGentleman(gentleman: Omit<GentlemanProfile, 'id' | 'registrationDate'>): Promise<{ id: string; success: boolean }> {
        const res = await fetch(`${this.baseUrl}/api/gentlemen`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gentleman)
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || 'Failed to register');
        }
        return res.json();
    }

    async getGentlemen(): Promise<GentlemanProfile[]> {
        const res = await fetch(`${this.baseUrl}/api/gentlemen`);
        if (!res.ok) throw new Error('Failed to fetch gentlemen');
        return res.json();
    }

    // Contact
    async submitContact(data: { name: string; email: string; subject: string; message: string }): Promise<{ success: boolean }> {
        const res = await fetch(`${this.baseUrl}/api/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to submit contact form');
        return res.json();
    }

    // Health
    async health(): Promise<{ status: string }> {
        const res = await fetch(`${this.baseUrl}/api/health`);
        return res.json();
    }
}

export const api = new ApiClient(API_URL);
