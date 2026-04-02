const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234', // 입력하신 비밀번호
  database: 'waypilgrim', // 방금 성공적으로 만든 DB 이름
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 비동기(async/await) 사용을 위해 .promise()를 추가하여 export 합니다.
const db = pool.promise();
module.exports = db;