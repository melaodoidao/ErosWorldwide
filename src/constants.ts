import { SuccessStory, Office } from './types';

export const SUCCESS_STORIES: SuccessStory[] = [
    {
        id: 1,
        name: "James & Ana",
        location: "Met in Medellin",
        story: "The tour exceeded my expectations. Ana was the third lady I met, and we connected instantly. The agency staff made everything seamless. We're planning our next adventure together.",
        img: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=600",
        video: false
    },
    {
        id: 2,
        name: "Michael & Natasha",
        location: "Met in Kiev",
        story: "I was skeptical about international dating until I joined the Kiev tour. Natasha and I had an amazing connection from day one. The translators were incredibly helpful.",
        img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=600",
        video: false
    },
    {
        id: 3,
        name: "Robert & Suki",
        location: "Met in Bangkok",
        story: "The Thailand tour was an incredible experience. The socials were well-organized and I met Suki on the second evening. We've been inseparable ever since.",
        img: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80&w=600",
        video: false
    }
];

export const OFFICES: Office[] = [
    { city: "Medellin", country: "Colombia", address: "Cl. 10 #43c-31, El Poblado, Medellin", staff: "8 Specialists", img: "https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?auto=format&fit=crop&q=80&w=400" },
    { city: "Bangkok", country: "Thailand", address: "Sukhumvit Road, Watthana, Bangkok 10110", staff: "10 Specialists", img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=400" },
    { city: "Kiev", country: "Ukraine", address: "14B Baseina St, Kyiv, 01004", staff: "12 Specialists", img: "https://images.unsplash.com/photo-1561542320-9a18cd340469?auto=format&fit=crop&q=80&w=400" },
];
