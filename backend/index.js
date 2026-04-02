const express = require('express');
const cors = require('cors');
const db = require('./src/models/db');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API: 성경 데이터 테스트 조회
app.get('/api/bible/test', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM bible LIMIT 5');
        res.json({ success: true, data: rows });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/', (req, res) => res.send('WayPilgrim API Server Running'));

app.listen(PORT, () => {
    console.log('====================================');
    console.log('WayPilgrim Server started on port ' + PORT);
    console.log('====================================');
});
