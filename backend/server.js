//Updated server file with the app connection.

const express = require('express');
const cors = require('cors');
const searchRoutes = require('./routes/search');

const app = express();
app.use(cors());

app.use(express.json());
app.use('/search', searchRoutes);

const PORT = 5050;

app.listen(5050, () => console.log(`Server running on http://localhost:${PORT}`));
