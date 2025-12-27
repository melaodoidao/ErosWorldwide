import { SuccessStory, Office } from './types';

export const SUCCESS_STORIES: SuccessStory[] = [
    {
        id: 1,
        name: "Wayne & Elena",
        location: "Met in Kyiv, 2021",
        story: "I was skeptical about international dating until I joined the Kyiv tour. Elena was the third lady I spoke with, and we just clicked. The agency handled every visa detail. We've been married for 2 years now.",
        img: "https://images.unsplash.com/photo-1516589174184-c6858b16ecb0?auto=format&fit=crop&q=80&w=600",
        video: true
    },
    {
        id: 2,
        name: "Tim & Sofia",
        location: "Met in Bogota, 2022",
        story: "The socials in Colombia are incredible. I met Sofia at the second gala. The translators were so helpful. She moved to Chicago last year and we just celebrated our first anniversary.",
        img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600",
        video: false
    },
    {
        id: 3,
        name: "David & Mariya",
        location: "Met in Odesa, 2019",
        story: "Eros Worldwide is the only agency I trust. They physically verified Mariya before I even arrived. We have a beautiful daughter now and a life I never thought possible.",
        img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600",
        video: true
    }
];

export const OFFICES: Office[] = [
    { city: "Kyiv", country: "Ukraine", address: "14B Baseina St, Kyiv, 01004", staff: "12 Specialists", img: "https://images.unsplash.com/photo-1562133567-b6a0a9c7e6eb?auto=format&fit=crop&q=80&w=400" },
    { city: "Medellin", country: "Colombia", address: "Cl. 10 #43c-31, Medellin, Antioquia", staff: "8 Specialists", img: "https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?auto=format&fit=crop&q=80&w=400" },
    { city: "Cebu", country: "Philippines", address: "3rd Floor, Baseline Center, Cebu City", staff: "10 Specialists", img: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&q=80&w=400" },
];
