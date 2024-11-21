const express = require('express');
const router = express.Router();
const { Client } = require('pg');
require('dotenv').config();

const connectionString = `postgresql://u_f3147c00_57b5_42fa_bd26_adb1d4f7a580:7Mi22Awm8bOn97W405GCo7Qc48nWO2JPU7oZ2v7FbDi261Vss5WZ@pg.rapidapp.io:5433/db_f3147c00_57b5_42fa_bd26_adb1d4f7a580?ssl=true&sslmode=no-verify&application_name=rapidapp_nodejs`;

router.get('/', async (req, res) => {
    const { q, latitude, longitude } = req.query;

    if (!q) return res.status(400).json({ error: 'Search query is required' });

    const query = `
    SELECT *,
    (1 - LEVENSHTEIN(city, $1)::FLOAT / GREATEST(LENGTH(city), LENGTH($1))) AS similarity,
    (6371 * acos(cos(radians($2)) * cos(radians(latitude)) * cos(radians(longitude) - radians($3)) + sin(radians($2)) * sin(radians(latitude)))) AS distance
    FROM locations
    ORDER BY similarity DESC, distance ASC
    LIMIT 10
`;
    const { rows } = await connectionString.query(query, [q, latitude || 0, longitude || 0]);

    const suggestions = rows.map(row => ({
        name: `${row.street}, ${row.city}, ${row.zip_code}, ${row.county}, ${row.country}`,
        latitude: row.latitude,
        longitude: row.longitude,
        time_zone: row.time_zone,
        score: row.similarity * 0.7 + (1 / (row.distance + 1)) * 0.3
    }));

    res.json({ suggestions });
});

module.exports = router;
