
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { GEMINI_API_KEY, IMAGE_MODEL } from '../config.js';

// Tool Definition
export const ImageGenTool = {
    name: 'generate_image',
    description: 'Generates a photorealistic image based on a prompt and saves it to a specific lady profile folder.',
    parameters: {
        type: 'OBJECT',
        properties: {
            prompt: {
                type: 'STRING',
                description: 'The detailed image generation prompt.',
            },
            ladyId: {
                type: 'STRING',
                description: 'The ID of the lady profile to organize files.',
            },
            filenamePrefix: {
                type: 'STRING',
                description: 'Prefix for the filename (e.g., "id_photo", "lifestyle_1").',
            }
        },
        required: ['prompt', 'ladyId', 'filenamePrefix'],
    },
    execute: async ({ prompt, ladyId, filenamePrefix }: { prompt: string, ladyId: string, filenamePrefix: string }) => {
        console.log(`🎨 Tool: Generating Image [${filenamePrefix}] for Lady [${ladyId}]`);

        if (!GEMINI_API_KEY) throw new Error("API Key missing");
        const ai = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = ai.getGenerativeModel({ model: IMAGE_MODEL });

        // Path Logic: /public/uploads/ladies/{ladyId}/
        // We assume 'server' is current working dir or we resolve relative to this file
        // this file is src/tools/ImageGenTool.ts
        // ../../../public/uploads
        const uploadsBase = path.resolve(process.cwd(), 'public', 'uploads');
        const ladyDir = path.join(uploadsBase, 'ladies', ladyId);

        if (!fs.existsSync(ladyDir)) {
            fs.mkdirSync(ladyDir, { recursive: true });
        }

        const fullPrompt = `Photorealistic, 8k, raw photo, stunning lighting, golden hour, glamour photography, tanned skin. ${prompt}`;

        try {
            const result = await model.generateContent(fullPrompt);
            const response = await result.response;
            const imagePart = response.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData);

            if (imagePart) {
                const fileName = `${filenamePrefix}_${crypto.randomUUID().substring(0, 8)}.png`;
                const filePath = path.join(ladyDir, fileName);

                fs.writeFileSync(filePath, Buffer.from(imagePart.inlineData!.data, 'base64'));

                // Return the public URL
                const publicUrl = `/uploads/ladies/${ladyId}/${fileName}`;
                console.log(`✅ Image Saved: ${publicUrl}`);
                return publicUrl;
            } else {
                throw new Error("No image data in response");
            }
        } catch (e: any) {
            console.error("❌ Image Gen Failed:", e.message);
            return null;
        }
    }
};
