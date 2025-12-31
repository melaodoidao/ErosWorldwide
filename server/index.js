import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database
const dbPath = process.env.DB_PATH || join(__dirname, 'data', 'eros.db');
const db = new Database(dbPath);

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS ladies (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    bio TEXT,
    image_url TEXT NOT NULL,
    verified INTEGER DEFAULT 0,
    height TEXT,
    hair_color TEXT,
    eye_color TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS gentlemen (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    age INTEGER,
    profession TEXT,
    location TEXT,
    bio TEXT,
    registration_date TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS tours (
    id TEXT PRIMARY KEY,
    city TEXT NOT NULL,
    countries TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    check_in_time TEXT,
    price TEXT NOT NULL,
    status TEXT DEFAULT 'Open',
    image TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS contact_submissions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed data if empty
const ladyCount = db.prepare('SELECT COUNT(*) as count FROM ladies').get();
if (ladyCount.count === 0) {
    const insertLady = db.prepare(`
    INSERT INTO ladies (id, name, age, city, country, bio, image_url, verified, height, hair_color, eye_color)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

    const seedLadies = [
        ['1', 'Elena', 24, 'Kyiv', 'Ukraine', 'Architect with a passion for classical music and travel.', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600', 1, '5\'7"', 'Blonde', 'Blue'],
        ['2', 'Sofia', 29, 'Bogota', 'Colombia', 'Pediatrician who loves salsa and outdoor adventures.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600', 1, '5\'5"', 'Brunette', 'Brown'],
        ['3', 'Mariya', 36, 'Odesa', 'Ukraine', 'Professional chef seeking someone to share life with.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600', 1, '5\'8"', 'Brunette', 'Green'],
        ['4', 'Viktoria', 22, 'Cebu City', 'Philippines', 'University student majoring in communications.', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600', 1, '5\'3"', 'Black', 'Brown'],
        ['5', 'Natali', 31, 'Medellin', 'Colombia', 'Fitness coach who loves healthy living.', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=600', 1, '5\'6"', 'Brunette', 'Brown'],
        ['6', 'Irina', 39, 'Kyiv', 'Ukraine', 'Fashion designer with a sophisticated soul.', 'https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&q=80&w=600', 1, '5\'9"', 'Red', 'Green'],
        ['7', 'Anastasia', 27, 'Lviv', 'Ukraine', 'English teacher who dreams of a loving family.', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=600', 1, '5\'6"', 'Blonde', 'Blue'],
        ['8', 'Camila', 25, 'Cartagena', 'Colombia', 'Dance instructor passionate about Latin rhythms.', 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=600', 1, '5\'4"', 'Black', 'Brown'],
        ['9', 'Maria', 33, 'Manila', 'Philippines', 'Nurse with a caring heart.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=600', 1, '5\'2"', 'Black', 'Brown'],
        ['10', 'Kateryna', 28, 'Kharkiv', 'Ukraine', 'Software developer who loves technology and nature.', 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&q=80&w=600', 1, '5\'7"', 'Brunette', 'Brown']
    ];

    const insertMany = db.transaction((ladies) => {
        for (const lady of ladies) {
            insertLady.run(...lady);
        }
    });
    insertMany(seedLadies);

    // Seed tours
    const insertTour = db.prepare(`
    INSERT INTO tours (id, city, countries, start_date, end_date, check_in_time, price, status, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

    const seedTours = [
        ['t1', 'Kyiv & Odesa', 'Ukraine', '2025-05-15', '2025-05-25', '2:00 PM', '$3,495', 'Open', 'https://images.unsplash.com/photo-1562133567-b6a0a9c7e6eb?auto=format&fit=crop&q=80&w=1200'],
        ['t2', 'Medellin & Bogota', 'Colombia', '2025-06-10', '2025-06-20', '3:00 PM', '$2,995', 'Filling Fast', 'https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?auto=format&fit=crop&q=80&w=1200'],
        ['t3', 'Manila & Cebu', 'Philippines', '2025-07-05', '2025-07-15', '1:00 PM', '$3,195', 'Open', 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&q=80&w=1200'],
        ['t4', 'Lviv & Kharkiv', 'Ukraine', '2025-08-01', '2025-08-12', '2:00 PM', '$3,295', 'Open', 'https://images.unsplash.com/photo-1561542320-9a18cd340469?auto=format&fit=crop&q=80&w=1200'],
        ['t5', 'Cartagena & Cali', 'Colombia', '2025-09-05', '2025-09-15', '4:00 PM', '$3,195', 'Waitlist', 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&q=80&w=1200'],
        ['t6', 'Multi-City Ukraine', 'Ukraine', '2025-10-10', '2025-10-25', '12:00 PM', '$4,495', 'Open', 'https://images.unsplash.com/photo-1555116505-38ab61800975?auto=format&fit=crop&q=80&w=1200']
    ];

    const insertTours = db.transaction((tours) => {
        for (const tour of tours) {
            insertTour.run(...tour);
        }
    });
    insertTours(seedTours);

    console.log('✅ Database seeded with initial data');
}

// ============ ROUTES ============

// Ladies
app.get('/api/ladies', (req, res) => {
    const ladies = db.prepare('SELECT * FROM ladies ORDER BY created_at DESC').all();
    res.json(ladies.map(l => ({
        id: l.id,
        name: l.name,
        age: l.age,
        city: l.city,
        country: l.country,
        bio: l.bio,
        imageUrl: l.image_url,
        verified: !!l.verified,
        height: l.height,
        hairColor: l.hair_color,
        eyeColor: l.eye_color
    })));
});

app.get('/api/ladies/:id', (req, res) => {
    const lady = db.prepare('SELECT * FROM ladies WHERE id = ?').get(req.params.id);
    if (!lady) return res.status(404).json({ error: 'Not found' });
    res.json({
        id: lady.id,
        name: lady.name,
        age: lady.age,
        city: lady.city,
        country: lady.country,
        bio: lady.bio,
        imageUrl: lady.image_url,
        verified: !!lady.verified,
        height: lady.height,
        hairColor: lady.hair_color,
        eyeColor: lady.eye_color
    });
});

app.post('/api/ladies', (req, res) => {
    const { name, age, city, country, bio, imageUrl, verified, height, hairColor, eyeColor } = req.body;
    const id = crypto.randomUUID();
    db.prepare(`
    INSERT INTO ladies (id, name, age, city, country, bio, image_url, verified, height, hair_color, eye_color)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, name, age, city, country, bio, imageUrl, verified ? 1 : 0, height, hairColor, eyeColor);
    res.status(201).json({ id });
});

app.delete('/api/ladies/:id', (req, res) => {
    db.prepare('DELETE FROM ladies WHERE id = ?').run(req.params.id);
    res.json({ success: true });
});

// Tours
app.get('/api/tours', (req, res) => {
    const tours = db.prepare('SELECT * FROM tours ORDER BY start_date ASC').all();
    res.json(tours.map(t => ({
        id: t.id,
        city: t.city,
        countries: t.countries.split(','),
        startDate: t.start_date,
        endDate: t.end_date,
        checkInTime: t.check_in_time,
        price: t.price,
        status: t.status,
        image: t.image
    })));
});

app.post('/api/tours', (req, res) => {
    const { city, countries, startDate, endDate, checkInTime, price, status, image } = req.body;
    const id = crypto.randomUUID();
    db.prepare(`
    INSERT INTO tours (id, city, countries, start_date, end_date, check_in_time, price, status, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, city, countries.join(','), startDate, endDate, checkInTime, price, status, image);
    res.status(201).json({ id });
});

app.delete('/api/tours/:id', (req, res) => {
    db.prepare('DELETE FROM tours WHERE id = ?').run(req.params.id);
    res.json({ success: true });
});

// Gentlemen (Registration)
app.post('/api/gentlemen', (req, res) => {
    const { name, email, age, profession, location, bio } = req.body;
    const id = crypto.randomUUID();
    try {
        db.prepare(`
      INSERT INTO gentlemen (id, name, email, age, profession, location, bio)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(id, name, email, age, profession, location, bio);
        res.status(201).json({ id, success: true });
    } catch (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
            return res.status(400).json({ error: 'Email already registered' });
        }
        throw err;
    }
});

app.get('/api/gentlemen', (req, res) => {
    const gentlemen = db.prepare('SELECT * FROM gentlemen ORDER BY registration_date DESC').all();
    res.json(gentlemen.map(g => ({
        id: g.id,
        name: g.name,
        email: g.email,
        age: g.age,
        profession: g.profession,
        location: g.location,
        bio: g.bio,
        registrationDate: g.registration_date
    })));
});

// Contact
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    const id = crypto.randomUUID();
    db.prepare(`
    INSERT INTO contact_submissions (id, name, email, subject, message)
    VALUES (?, ?, ?, ?, ?)
  `).run(id, name, email, subject, message);
    res.status(201).json({ id, success: true });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI Profile Generation (SSE endpoint)
app.get('/api/ladies/generate-adk', async (req, res) => {
    const attractiveness = parseInt(req.query.attractiveness) || 7;

    // SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.flushHeaders();

    const sendEvent = (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    try {
        // Dynamic import of the ADK generator (ESM)
        const { generateLadyProfileADK } = await import('./dist/src/services/adkGenerator.js');

        sendEvent({ type: 'progress', message: 'Initializing AI Generation Engine...' });

        const profile = await generateLadyProfileADK(
            null, // city (random)
            null, // country (random)
            attractiveness,
            (step, partialProfile) => {
                sendEvent({
                    type: 'progress',
                    message: step,
                    profile: partialProfile
                });
            }
        );

        // Save to database
        const id = profile.id || crypto.randomUUID();
        db.prepare(`
            INSERT INTO ladies (id, name, age, city, country, bio, image_url, verified, height, hair_color, eye_color)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            id,
            profile.name,
            profile.age,
            profile.city,
            profile.country,
            profile.bio,
            profile.imageUrl || profile.idPhotoUrl,
            1,
            profile.height,
            profile.hairColor,
            profile.eyeColor
        );

        // Send complete event with full profile
        sendEvent({
            type: 'complete',
            profile: {
                ...profile,
                id,
                verified: true
            }
        });

    } catch (error) {
        console.error('[ADK Generation Error]', error);
        sendEvent({ type: 'error', message: error.message });
    } finally {
        res.end();
    }
});

// Serve uploaded images
app.use('/uploads', express.static(join(__dirname, 'public/uploads')));

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Eros API running on port ${PORT}`);
});
