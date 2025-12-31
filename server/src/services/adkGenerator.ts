import {
    LlmAgent,
    Runner,
    InMemorySessionService,
} from '@google/adk';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import JSON5 from 'json5';

// Load env
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// When compiled, this is in dist/src/services/, so go up 4 levels to get to project root
// Try multiple paths to handle both ts-node and compiled scenarios
const possibleEnvPaths = [
    path.resolve(__dirname, '../../../../.env'),  // from dist/src/services/
    path.resolve(__dirname, '../../../.env'),     // from src/services/
    path.resolve(__dirname, '../../.env'),        // fallback
];

for (const envPath of possibleEnvPaths) {
    if (fs.existsSync(envPath)) {
        dotenv.config({ path: envPath });
        break;
    }
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const TEXT_MODEL = process.env.TEXT_MODEL || 'gemini-2.0-flash';
const IMAGE_MODEL = process.env.IMAGE_MODEL || 'gemini-2.0-flash-preview-image-generation';

// Uploads directory - adjust for compiled location
const possibleUploadPaths = [
    path.resolve(__dirname, '../../../public/uploads'),  // from dist/src/services/
    path.resolve(__dirname, '../../public/uploads'),     // from src/services/
];
let UPLOADS_DIR: string = possibleUploadPaths[0] || '';
for (const uploadPath of possibleUploadPaths) {
    if (fs.existsSync(path.dirname(uploadPath))) {
        UPLOADS_DIR = uploadPath;
        break;
    }
}

// ============== DIVERSITY ENGINE ==============
// Pre-generation diversity system to ensure UNIQUENESS across profiles

interface DiversityProfile {
    city: string;
    country: string;
    ethnicity: string;
    ethnicityKeywords: string;
    ageRange: { min: number; max: number };
    namePool: string[];
    hairColors: string[];
    eyeColors: string[];
    skinTones: string[];
    defaultLanguages: string;
}

const DIVERSITY_PROFILES: Record<string, DiversityProfile> = {
    "Medellín": {
        city: "Medellín",
        country: "Colombia",
        ethnicity: "Latina",
        ethnicityKeywords: "Latina ethnicity, Colombian features, olive to caramel skin, dark voluminous wavy hair, full lips, passionate brown eyes",
        ageRange: { min: 19, max: 28 },
        namePool: ["Valentina", "Isabella", "Camila", "Sofía", "Mariana", "Luciana", "Daniela", "Gabriela", "Juliana", "Alejandra", "Carolina", "Natalia", "Paola", "Andrea", "María José", "Laura", "Paula", "Ana María", "Catalina", "Marcela"],
        hairColors: ["Dark Brown", "Black", "Chestnut", "Caramel Highlights"],
        eyeColors: ["Brown", "Hazel", "Amber", "Dark Brown"],
        skinTones: ["Golden tan", "Olive", "Caramel", "Sun-kissed bronze"],
        defaultLanguages: "Spanish (Native), English (Good)"
    },
    "Bangkok": {
        city: "Bangkok",
        country: "Thailand",
        ethnicity: "Thai",
        ethnicityKeywords: "Thai ethnicity, Southeast Asian features, silky straight black hair, almond-shaped dark eyes, delicate facial features, smooth porcelain to golden skin",
        ageRange: { min: 20, max: 29 },
        namePool: ["Ploy", "Fern", "Mint", "Joy", "Bow", "Pim", "Nam", "Nong", "May", "Kwan", "Nat", "Pang", "Film", "Ice", "Noon", "Aom", "Jub", "Punch"],
        hairColors: ["Jet Black", "Dark Brown", "Black with subtle highlights"],
        eyeColors: ["Dark Brown", "Black", "Deep Brown"],
        skinTones: ["Porcelain", "Light golden", "Warm beige", "Honey"],
        defaultLanguages: "Thai (Native), English (Good)"
    },
    "Kyiv": {
        city: "Kyiv",
        country: "Ukraine",
        ethnicity: "Slavic",
        ethnicityKeywords: "Slavic ethnicity, Ukrainian features, high cheekbones, fair porcelain skin, light colored eyes, elegant bone structure",
        ageRange: { min: 21, max: 30 },
        namePool: ["Anastasia", "Kateryna", "Viktoria", "Olena", "Daryna", "Alina", "Yulia", "Marta", "Iryna", "Oksana", "Tetiana", "Svitlana", "Nataliia", "Mariia", "Anna", "Sofia", "Diana", "Karina", "Polina", "Yelyzaveta"],
        hairColors: ["Platinum Blonde", "Ash Blonde", "Light Brown", "Strawberry Blonde", "Honey Blonde"],
        eyeColors: ["Blue", "Green", "Grey", "Light Hazel"],
        skinTones: ["Porcelain", "Fair", "Ivory", "Light peach"],
        defaultLanguages: "Ukrainian (Native), English (Good)"
    }
};

function pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]!;
}

function generateDiversitySeed(): {
    city: string;
    country: string;
    name: string;
    age: number;
    ethnicity: string;
    ethnicityKeywords: string;
    hairColor: string;
    eyeColor: string;
    skinTone: string;
    uniqueTraits: string;
    defaultLanguages: string;
} {
    const cityKey = pickRandom(Object.keys(DIVERSITY_PROFILES));
    const profile = DIVERSITY_PROFILES[cityKey]!;

    const age = Math.floor(Math.random() * (profile.ageRange.max - profile.ageRange.min + 1)) + profile.ageRange.min;

    // Generate unique physical traits
    const uniqueTraits = [
        pickRandom(["beauty mark near lips", "dimples when smiling", "subtle freckles", "naturally arched eyebrows", "long eyelashes", "small nose piercing", "delicate mole on cheek"]),
        pickRandom(["athletic build", "dancer's physique", "model proportions", "hourglass figure", "petite frame with curves"]),
        pickRandom(["wavy hair", "straight silky hair", "voluminous curls", "beachy waves", "sleek long hair"])
    ].join(", ");

    return {
        city: profile.city,
        country: profile.country,
        name: pickRandom(profile.namePool),
        age,
        ethnicity: profile.ethnicity,
        ethnicityKeywords: profile.ethnicityKeywords,
        hairColor: pickRandom(profile.hairColors),
        eyeColor: pickRandom(profile.eyeColors),
        skinTone: pickRandom(profile.skinTones),
        uniqueTraits,
        defaultLanguages: profile.defaultLanguages
    };
}

// ============== ATTRACTIVENESS VISUAL MAPPING ==============
function getAttractivenessVisuals(level: number): {
    bodyDescription: string;
    styleDescription: string;
    makeupDescription: string;
    photographyStyle: string;
} {
    if (level <= 3) {
        return {
            bodyDescription: "Natural healthy body, subtle curves, approachable figure",
            styleDescription: "Casual chic, sundresses, jeans and cute tops, minimal jewelry",
            makeupDescription: "Natural no-makeup makeup look, subtle lip gloss, fresh-faced",
            photographyStyle: "Candid smartphone photography, natural lighting, authentic social media style"
        };
    } else if (level <= 5) {
        return {
            bodyDescription: "Fit and toned body, noticeable curves, attractive proportions",
            styleDescription: "Trendy fashion, form-fitting dresses, stylish casual wear",
            makeupDescription: "Light glamour makeup, defined eyes, natural lip color",
            photographyStyle: "Quality portrait photography, good lighting, Instagram influencer style"
        };
    } else if (level <= 7) {
        return {
            bodyDescription: "Stunning curvy figure, hourglass shape, toned and sculpted, noticeable bust",
            styleDescription: "Designer fashion, revealing dresses, luxury swimwear, statement pieces",
            makeupDescription: "Full glamour makeup, smoky eyes, contoured features, glossy lips",
            photographyStyle: "Professional fashion photography, studio lighting, editorial quality, Shot on Sony A7R IV"
        };
    } else if (level <= 9) {
        return {
            bodyDescription: "Exceptional hourglass figure, large bust, tiny waist, sculpted curves, model-tier proportions",
            styleDescription: "Micro-bikinis, bodycon dresses, luxury lingerie, designer everything, barely-there fashion",
            makeupDescription: "HD full glam, dramatic eyes, perfect contour, plump lips, wet-look skin",
            photographyStyle: "High-end editorial, 85mm f/1.2 lens, detailed skin texture, vsco film grain, Vogue-tier"
        };
    } else {
        return {
            bodyDescription: "World-class bombshell physique, massive enhanced curves, extreme hourglass silhouette, gravity-defying bust, impossibly tiny waist",
            styleDescription: "Ultra-revealing luxury fashion, micro-string bikinis, barely-there designer pieces, oiled skin, diamond jewelry",
            makeupDescription: "Maxed-out glam, heavy sultry makeup, oversized lashes, glossy plump lips, bronzed and contoured to perfection",
            photographyStyle: "Elite fashion editorial, 85mm f/1.2 lens, detailed skin pores, wet-look oiled skin, golden hour, borderline provocative, VS/SI swimwear tier"
        };
    }
}

// ============== IMAGE GENERATION ==============
async function generateImage(
    prompt: string,
    ladyId: string,
    filenamePrefix: string,
    referenceImagePath?: string
): Promise<string | null> {
    const apiKey = GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY;
    if (!apiKey) {
        console.error("[Image Gen] No API key found!");
        throw new Error("API Key missing");
    }

    console.log(`[Image Gen] Using model: ${IMAGE_MODEL}, generating: ${filenamePrefix}`);
    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({ model: IMAGE_MODEL });

    const ladyDir = path.join(UPLOADS_DIR, 'ladies', ladyId);
    if (!fs.existsSync(ladyDir)) {
        fs.mkdirSync(ladyDir, { recursive: true });
    }

    const contents: any[] = [];

    if (referenceImagePath && fs.existsSync(referenceImagePath)) {
        const imageBuffer = fs.readFileSync(referenceImagePath);
        const base64Image = imageBuffer.toString('base64');

        const textPrompt = `Generate a SINGLE, FULL-FRAME photograph of this EXACT same woman in a new setting: ${prompt}
        
        CRITICAL COMPOSITION RULES:
        - OUTPUT ONLY ONE IMAGE. Do not split the screen.
        - NO side-by-side comparisons. NO collage. NO before/after.
        - The subject must appear only once in the frame.
        - Maintain IDENTICAL face, body type, and features as the provided reference.
        - High-end social media realism (Instagram/Influencer style).
        - Shot on iPhone 15 Pro or professional camera.
        - Single subject only, centered composition.`;

        contents.push(
            { text: textPrompt },
            { inlineData: { mimeType: 'image/png', data: base64Image } }
        );
    } else {
        const textPrompt = `${prompt}

        TECHNICAL REQUIREMENTS:
        - SINGLE FULL-FRAME PHOTOGRAPH.
        - No borders, no multiple panels, no split-screen layouts.
        - Authentic skin texture with pores and natural imperfections.
        - Professional photography quality.
        - Subject centered in frame.`;

        contents.push(textPrompt);
    }

    try {
        const result = referenceImagePath && fs.existsSync(referenceImagePath)
            ? await model.generateContent(contents)
            : await model.generateContent(contents[0] as string);

        const response = await result.response;
        const imagePart = response.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData);

        if (imagePart) {
            const fileName = `${filenamePrefix}_${crypto.randomUUID().substring(0, 8)}.png`;
            const filePath = path.join(ladyDir, fileName);
            fs.writeFileSync(filePath, Buffer.from(imagePart.inlineData!.data, 'base64'));
            console.log(`[Image Gen] ✅ Saved: ${fileName}`);
            return `/uploads/ladies/${ladyId}/${fileName}`;
        } else {
            console.error("[Image Gen] No image data in response");
        }
    } catch (e: any) {
        console.error("Image Gen Failed:", e.message);
    }
    return null;
}

// ============== MAIN SERVICE ==============
interface GeneratedProfile {
    id: string;
    name: string;
    age: number;
    city: string;
    country: string;
    bio: string;
    height: string;
    hairColor: string;
    eyeColor: string;
    occupation: string;
    education: string;
    religion: string;
    children: string;
    languages: string;
    smoking: string;
    drinking: string;
    lookingFor: string;
    imageUrl: string;
    idPhotoUrl: string;
    gallery: string[];
    verified: boolean;
}

export async function generateLadyProfileADK(
    city?: string | null,
    country?: string | null,
    attractiveness: number = 7,
    onProgress?: (step: string, partialProfile?: any) => void
): Promise<GeneratedProfile> {
    const log = (msg: string, partialProfile?: any) => {
        let cleanMsg = msg;
        if (msg.includes('Starting profile generation')) cleanMsg = "Establishing connection to Global Curation Network...";
        if (msg.includes('Generating diversity seed')) cleanMsg = "Curating unique identity parameters...";
        if (msg.includes('Drafting elite persona')) cleanMsg = "Crafting authentic persona & bio...";
        if (msg.includes('Capturing high-fidelity portrait')) cleanMsg = "Directing elite portrait session...";
        if (msg.includes('Portrait secured')) cleanMsg = "Elite portrait successfully captured.";
        if (msg.includes('Lifestyle sequence')) cleanMsg = msg.replace(/Lifestyle sequence (\d+)/, 'Capturing lifestyle scene $1');
        if (msg.includes('Visual portfolio complete')) cleanMsg = "Visual portfolio finalized.";

        console.log(`[ADK] ${msg}`);
        onProgress?.(cleanMsg, partialProfile);
    };

    log("Starting profile generation...");

    // ========== STEP 1: GENERATE DIVERSITY SEED (PRE-LLM) ==========
    log("Generating diversity seed...");
    const diversitySeed = generateDiversitySeed();
    const attractivenessVisuals = getAttractivenessVisuals(attractiveness);

    console.log(`[DIVERSITY] Generated seed: ${diversitySeed.name}, ${diversitySeed.age}, ${diversitySeed.city}`);
    console.log(`[DIVERSITY] Attractiveness ${attractiveness}/10 → ${attractivenessVisuals.bodyDescription.substring(0, 50)}...`);

    // Session setup
    const sessionService = new InMemorySessionService();
    const userId = 'admin';
    const session = await sessionService.createSession({
        appName: 'eros-generator',
        userId: userId,
    });

    // ========== STEP 2: CREATE DYNAMIC AGENT WITH SEEDED VALUES ==========
    const DiverseProfileAgent = new LlmAgent({
        name: 'DiverseLadyProfileGenerator',
        model: TEXT_MODEL,
        outputSchema: {
            type: 'object',
            properties: {
                bio: { type: 'string', description: "First-person detailed bio (3-4 sentences)" },
                appearanceDescription: { type: 'string', description: "MASTER physical description for image consistency" },
                lookingFor: { type: 'string', description: "What she's seeking in a partner" },
                occupation: { type: 'string', description: "Her profession" },
                education: { type: 'string', description: "Education level" },
                religion: { type: 'string', description: "Religious beliefs" },
                children: { type: 'string', description: "Children status" },
                languages: { type: 'string', description: "Languages spoken" },
                height: { type: 'string', description: "Height in feet/inches format" },
                drinking: { type: 'string', enum: ["Never", "Socially", "Occasionally", "Regularly"] },
                smoking: { type: 'string', enum: ["Never", "Socially", "Occasionally", "Regularly"] },
                idPhotoPrompt: { type: 'string', description: "Scene/setting for ID portrait (will be combined with appearance)" },
                lifestylePrompts: { type: 'array', items: { type: 'string' }, description: "Array of 7 UNIQUE lifestyle photo scenes" }
            },
            required: ["bio", "appearanceDescription", "idPhotoPrompt", "lifestylePrompts"]
        } as any,
        instruction: `You are creating a profile for a verified woman on "Eros Worldwide", an exclusive matchmaking platform.

FIXED IDENTITY (DO NOT CHANGE):
- Name: ${diversitySeed.name}
- Age: ${diversitySeed.age}
- City: ${diversitySeed.city}, ${diversitySeed.country}
- Ethnicity: ${diversitySeed.ethnicity}
- Hair: ${diversitySeed.hairColor}
- Eyes: ${diversitySeed.eyeColor}
- Skin: ${diversitySeed.skinTone}
- Unique traits: ${diversitySeed.uniqueTraits}

ATTRACTIVENESS LEVEL: ${attractiveness}/10
Visual Style:
- Body: ${attractivenessVisuals.bodyDescription}
- Fashion: ${attractivenessVisuals.styleDescription}
- Makeup: ${attractivenessVisuals.makeupDescription}

CRITICAL REQUIREMENT - APPEARANCE DESCRIPTION:
Generate a MASTER "appearanceDescription" field that captures her EXACT physical features in vivid detail. This will be injected into EVERY photo prompt to ensure the same woman appears in all images.
Format: "[Face shape], [skin tone], [eye shape and color], [hair style/length/color], [body type], [distinctive features]"
Example: "Oval face, olive skin with golden undertone, almond-shaped green eyes, long wavy chestnut hair, hourglass figure, beauty mark near lips"

LIFESTYLE PROMPTS (Create exactly 7):
1. Luxury pool/beach setting
2. City street fashion shot
3. Upscale restaurant/cafe
4. Casual at-home moment
5. Fitness/yoga/active lifestyle
6. Cultural activity (temple, museum, local spot)
7. Evening/nightlife elegance

OUTPUT: Return a JSON object matching the schema.`
    });

    const runner = new Runner({
        appName: 'eros-generator',
        agent: DiverseProfileAgent,
        sessionService: sessionService,
    });

    log("Drafting elite persona...", {
        name: diversitySeed.name,
        age: diversitySeed.age,
        city: diversitySeed.city,
        country: diversitySeed.country
    });

    const events = runner.runAsync({
        userId: userId,
        sessionId: session.id,
        newMessage: {
            role: 'user' as const,
            parts: [{ text: `Generate the complete profile for ${diversitySeed.name}.` }]
        },
    });

    let finalText = "";
    for await (const event of events as any) {
        // Capture text from LLM response
        if (event.content?.parts) {
            for (const part of event.content.parts) {
                if ('text' in part && part.text) {
                    finalText += part.text;
                }
            }
        }

        // Also check alternative event structures
        if (event.text) {
            finalText += event.text;
        }
        if (event.output) {
            if (typeof event.output === 'string') {
                finalText += event.output;
            } else if (typeof event.output === 'object') {
                finalText = JSON.stringify(event.output);
            }
        }

        // Check for isFinalResponse pattern
        if (event.isFinalResponse?.() || event.is_final_response) {
            if (event.content?.parts?.[0]?.text) {
                finalText = event.content.parts[0].text;
            }
        }
    }

    // ========== STEP 3: PARSE LLM OUTPUT ==========
    let profileData: any = {};
    try {
        const firstBrace = finalText.indexOf('{');
        const lastBrace = finalText.lastIndexOf('}');

        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
            const jsonStr = finalText.substring(firstBrace, lastBrace + 1);
            profileData = JSON5.parse(jsonStr);
            console.log(`[ADK] Parsed profile fields: ${Object.keys(profileData).join(', ')}`);
        } else {
            console.warn(`[ADK WARN] No valid JSON in LLM output, using fallbacks`);
        }
    } catch (e: any) {
        console.error("[ADK ERROR] JSON Parse Failed:", e.message);
    }

    // ========== STEP 4: MERGE SEEDED DATA ==========
    // Build master appearance description from seed if LLM didn't provide one
    const defaultAppearance = `${diversitySeed.age}-year-old ${diversitySeed.ethnicity} woman, ${diversitySeed.skinTone} skin, ${diversitySeed.eyeColor.toLowerCase()} ${diversitySeed.ethnicity === 'Thai' ? 'almond-shaped' : diversitySeed.ethnicity === 'Slavic' ? 'captivating' : 'expressive'} eyes, ${diversitySeed.hairColor.toLowerCase()} hair, ${diversitySeed.uniqueTraits}, ${attractivenessVisuals.bodyDescription}`;

    const finalProfile = {
        name: diversitySeed.name,
        age: diversitySeed.age,
        city: diversitySeed.city,
        country: diversitySeed.country,
        hairColor: diversitySeed.hairColor,
        eyeColor: diversitySeed.eyeColor,
        appearanceDescription: profileData.appearanceDescription || defaultAppearance,
        bio: profileData.bio || `I'm ${diversitySeed.name}, a passionate soul from ${diversitySeed.city} seeking genuine connections.`,
        lookingFor: profileData.lookingFor || "A sincere gentleman who values family, loyalty, and building a meaningful future together.",
        occupation: profileData.occupation || "Professional",
        education: profileData.education || "University Degree",
        religion: profileData.religion || (diversitySeed.city === "Bangkok" ? "Buddhist" : "Christian"),
        children: profileData.children || "None",
        languages: profileData.languages || diversitySeed.defaultLanguages,
        height: profileData.height || "5'6\"",
        drinking: profileData.drinking || "Socially",
        smoking: profileData.smoking || "Never",
        idPhotoPrompt: profileData.idPhotoPrompt,
        lifestylePrompts: profileData.lifestylePrompts || []
    };

    console.log(`[ADK] Appearance description: ${finalProfile.appearanceDescription.substring(0, 80)}...`);

    log(`[DIVERSITY] Profile locked: ${finalProfile.name}, ${finalProfile.age} from ${finalProfile.city}`);

    // ========== STEP 5: GENERATE ID PHOTO ==========
    const ladyId = crypto.randomUUID();

    // PHOTOREALISM STYLE MODIFIERS - The secret to avoiding stock photo look
    const styleModifiers = "Photorealistic, shot on iPhone 14 Pro, natural imperfections, authentic social media aesthetic, NOT a stock photo, real person vibes, slight motion blur allowed, genuine candid moment, visible skin texture and pores, natural lighting variations, SINGLE PANEL ONLY";

    const idPhotoPrompt = `SUBJECT: ${finalProfile.appearanceDescription}

SCENE: Portrait photo, ${finalProfile.idPhotoPrompt || 'warm smile, direct eye contact with camera'}
LOCATION: ${diversitySeed.city}, ${diversitySeed.country}
STYLE: ${attractivenessVisuals.styleDescription}
MAKEUP: ${attractivenessVisuals.makeupDescription}

TECHNICAL: ${styleModifiers}, ${attractivenessVisuals.photographyStyle}`;

    log("Capturing high-fidelity portrait...");
    const idPhotoUrl = await generateImage(idPhotoPrompt, ladyId, 'id_photo');

    log("Portrait secured.", {
        ...finalProfile,
        id: ladyId,
        idPhotoUrl,
        imageUrl: idPhotoUrl
    });

    const idPhotoAbsolutePath = idPhotoUrl
        ? path.join(UPLOADS_DIR, idPhotoUrl.replace('/uploads/', ''))
        : null;

    // ========== STEP 6: GENERATE LIFESTYLE PHOTOS ==========
    // 7 diverse lifestyle scenes as per specification
    const defaultLifestylePrompts = [
        `Luxury pool/beach: ${diversitySeed.name} relaxing by infinity pool overlooking ${diversitySeed.city} skyline, ${attractivenessVisuals.styleDescription}`,
        `City fashion: ${diversitySeed.name} walking through trendy streets of ${diversitySeed.city}, street style photography, fashionable outfit`,
        `Restaurant: ${diversitySeed.name} at upscale restaurant, elegant dinner setting, warm ambient lighting, holding wine glass`,
        `Casual home: ${diversitySeed.name} relaxing at home in comfortable clothing, morning coffee, natural window light`,
        `Active lifestyle: ${diversitySeed.name} doing yoga/stretching in athletic wear, fitness lifestyle, healthy glow`,
        `Cultural: ${diversitySeed.name} visiting ${diversitySeed.city === 'Bangkok' ? 'Thai temple' : diversitySeed.city === 'Kyiv' ? 'St. Sophia Cathedral' : 'Plaza Botero'}, cultural tourism moment`,
        `Evening elegance: ${diversitySeed.name} dressed for night out, cocktail dress, city nightlife, glamorous lighting`
    ];

    // Use LLM prompts if available (7+), otherwise use defaults
    const rawLifestylePrompts = (finalProfile.lifestylePrompts.length >= 5)
        ? finalProfile.lifestylePrompts.slice(0, 7)
        : defaultLifestylePrompts;

    // Inject appearance description into each lifestyle prompt for consistency
    const lifestylePrompts = rawLifestylePrompts.map((scene: string) =>
        `SUBJECT: ${finalProfile.appearanceDescription}\nSCENE: ${scene}\nTECHNICAL: ${styleModifiers}`
    );

    const galleryResults: (string | null)[] = new Array(lifestylePrompts.length).fill(null);

    log(`Generating ${lifestylePrompts.length} lifestyle photos in parallel...`);

    await Promise.all(lifestylePrompts.map(async (prompt: string, i: number) => {
        const url = await generateImage(
            prompt,
            ladyId,
            `lifestyle_${i + 1}`,
            idPhotoAbsolutePath || undefined
        );

        if (url) {
            galleryResults[i] = url;
            const currentGallery = galleryResults.filter(u => u !== null) as string[];
            log(`Lifestyle sequence ${i + 1} of ${lifestylePrompts.length} complete.`, {
                ...finalProfile,
                id: ladyId,
                idPhotoUrl,
                imageUrl: idPhotoUrl,
                gallery: currentGallery
            });
        }
    }));

    const gallery = galleryResults.filter(u => u !== null) as string[];
    log("Visual portfolio complete.", { ...finalProfile, id: ladyId, gallery });

    // ========== STEP 7: BUILD FINAL RESULT ==========
    const result: GeneratedProfile = {
        id: ladyId,
        name: finalProfile.name,
        age: finalProfile.age,
        city: finalProfile.city,
        country: finalProfile.country,
        bio: finalProfile.bio,
        height: finalProfile.height,
        hairColor: finalProfile.hairColor,
        eyeColor: finalProfile.eyeColor,
        occupation: finalProfile.occupation,
        education: finalProfile.education,
        religion: finalProfile.religion,
        children: finalProfile.children,
        languages: finalProfile.languages,
        smoking: finalProfile.smoking,
        drinking: finalProfile.drinking,
        lookingFor: finalProfile.lookingFor,
        imageUrl: gallery[0] || idPhotoUrl || '',
        idPhotoUrl: idPhotoUrl || '',
        gallery: gallery,
        verified: true,
    };

    log("Profile generation complete!");
    return result;
}
