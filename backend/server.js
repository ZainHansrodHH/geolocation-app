//Create a connection to our prosgresSQL server and migrate the CSV content into it. 

const { Client } = require('pg');
const fs = require('fs');
const csv = require('csv-parser');



const migrateCSVToDatabase = () => {

    const connectionString = `postgresql://u_f3147c00_57b5_42fa_bd26_adb1d4f7a580:7Mi22Awm8bOn97W405GCo7Qc48nWO2JPU7oZ2v7FbDi261Vss5WZ@pg.rapidapp.io:5433/db_f3147c00_57b5_42fa_bd26_adb1d4f7a580?ssl=true&sslmode=no-verify&application_name=rapidapp_nodejs`;
    const client = new Client({
        connectionString,
    })
    
    client.connect().then((rsp) => {
        console.log("Successfully connected to the database!");
        fs.createReadStream('./data/locations.csv')
        .pipe(csv())
        .on('data', async (row) => {
            const { street, city, zip_code, county, country, latitude, longitude, time_zone } = row;

            await client.query(
                `INSERT INTO locations (street, city, zip_code, county, country, latitude, longitude, time_zone) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                [street, city, zip_code, county, country, latitude, longitude, time_zone]
            );
        })
        .on('end', () => {
            console.log('CSV migration completed.');
        });
    }).catch((err) => {
        console.log(err)
    });


};

migrateCSVToDatabase();
