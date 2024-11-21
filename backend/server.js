//Create a connection to our prosgresSQL server and migrate the CSV content into it. 

const fs = require('fs');
const csv = require('csv-parser');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const migrateCSVToDatabase = () => {
    fs.createReadStream('./data/locations.csv')
        .pipe(csv())
        .on('data', async (row) => {
            const { name, latitude, longitude } = row;
            await pool.query(
                'INSERT INTO locations (name, latitude, longitude) VALUES ($1, $2, $3)',
                [name, latitude, longitude]
            );
        })
        .on('end', () => {
            console.log('CSV migration completed.');
        });
};

migrateCSVToDatabase();
