const express = require('express');
const app = express();
const db = require('./config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const port = 5000;

const SECRET_KEY = 'way_pilgrim_secret_key';
app.use(express.json());

app.post('/signup', async (req, res) => {
  const { email, password, nickname } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)', [email, hashedPassword, nickname]);
    res.status(201).json({ message: '가입 성공' });
  } catch (err) { res.status(500).json({ error: '가입 실패' }); }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  if (users.length === 0) return res.status(401).json({ message: '가입되지 않은 이메일' });
  const isMatch = await bcrypt.compare(password, users[0].password);
  if (!isMatch) return res.status(401).json({ message: '비번 틀림' });
  const token = jwt.sign({ id: users[0].id }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token, user: { nickname: users[0].nickname } });
});

app.get('/users', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM users');
  res.json(rows);
});

// 삭제 API 추가
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: '삭제되었습니다.' });
  } catch (err) { res.status(500).json({ error: '삭제 실패' }); }
});

app.listen(port, () => console.log('Server running on ' + port));
