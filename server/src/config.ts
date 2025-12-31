
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjust path to point to root .env (../../.env from server/src/config.ts is ../../.env ? No, server/src is 2 levels deep from server root? Wait.)
// .env is in project root. server/ is in project root.
// server/src/config.ts -> ../../.env would be server/.env. 
// The user said .env is at /mnt/HC_Volume_102573485/aura-eros/.env
// So it is one level up from server/.
// From server/src/config.ts it is ../../../.env

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
export const TEXT_MODEL = process.env.TEXT_MODEL || 'gemini-2.0-flash';
export const IMAGE_MODEL = process.env.IMAGE_MODEL || 'gemini-2.0-flash-preview-image-generation';

if (!GEMINI_API_KEY) {
    console.warn("⚠️ GEMINI_API_KEY not found in .env");
}
