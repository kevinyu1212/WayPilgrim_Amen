const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2/promise');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const pool = mysql.createPool({
  host: 'localhost', user: 'root', password: '1234', database: 'waypilgrim', 
  charset: 'utf8mb4', waitForConnections: true, connectionLimit: 10
});

// DB 초기화 및 컬럼 체크
const initDB = async () => {
  try {
    const conn = await pool.getConnection();
    await conn.query(`CREATE TABLE IF NOT EXISTS prayer_likes (id INT AUTO_INCREMENT PRIMARY KEY, prayer_id INT, user_id VARCHAR(255), UNIQUE KEY (prayer_id, user_id))`);
    try { await conn.query("ALTER TABLE comments ADD COLUMN text TEXT AFTER author"); } catch(e){}
    conn.release();
    console.log("✅ DB 준비 완료");
  } catch (err) { console.error("❌ DB 에러:", err.message); }
};
initDB();

// [수정] 상세 조회: 조회수 증가 로직을 여기서 삭제함
app.get('/api/prayers/:id', async (req, res) => {
  try {
    const [p] = await pool.query('SELECT * FROM prayers WHERE id = ?', [req.params.id]);
    const [c] = await pool.query('SELECT id, author, text AS content, created_at FROM comments WHERE prayerId = ? ORDER BY created_at', [req.params.id]);
    res.json({ ...p[0], comments: c });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// [추가] 조회수만 따로 올리는 전용 API
app.patch('/api/prayers/:id/view', async (req, res) => {
  try {
    await pool.query('UPDATE prayers SET views = views + 1 WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/prayers/:id/comments', async (req, res) => {
  const { author, content } = req.body;
  try {
    await pool.query('INSERT INTO comments (prayerId, author, text) VALUES (?, ?, ?)', [req.params.id, author, content]);
    res.status(201).json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/prayers', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM prayers ORDER BY id DESC');
  res.json(rows);
});

app.listen(5000, () => console.log('🚀 서버 가동 중 (조회수 로직 분리됨)'));