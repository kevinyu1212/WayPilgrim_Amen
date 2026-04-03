import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PrayerWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false); // 익명 토글 상태
  const [userNickname, setUserNickname] = useState('성도'); // 기본값
  const navigate = useNavigate();

  // 1. 로그인한 유저의 닉네임 가져오기
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.nickname) {
      setUserNickname(user.nickname);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return alert("제목과 내용을 모두 입력해 주세요.");

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    
    // 2. 토글 상태에 따라 작성자 이름 결정
    const finalAuthor = isAnonymous ? '익명 성도' : userNickname;
    formData.append('author', finalAuthor);
    
    if (file) formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/prayers', formData);
      if (res.data.success) {
        navigate('/prayer'); // 목록으로 즉시 이동
      }
    } catch (err) {
      alert("등록 실패: " + err.message);
    }
  };

  // UI 색감 통일 (네이버 그린 & 그레이)
  const styles = {
    container: { maxWidth: '800px', margin: '40px auto', padding: '30px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '10px', fontFamily: '"Noto Sans KR", sans-serif' },
    header: { fontSize: '24px', fontWeight: 'bold', margin: '0 0 25px 0', borderBottom: '1px solid #eee', paddingBottom: '15px' },
    authorSection: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '8px', fontSize: '14px' },
    inputTitle: { width: '100%', padding: '15px', border: '1px solid #e1e1e1', borderRadius: '8px', fontSize: '18px', marginBottom: '15px', boxSizing: 'border-box' },
    textareaContent: { width: '100%', height: '350px', padding: '15px', border: '1px solid #e1e1e1', borderRadius: '8px', fontSize: '16px', lineHeight: '1.7', resize: 'none', boxSizing: 'border-box' },
    fileInput: { marginTop: '10px', fontSize: '14px' },
    submitBtn: { padding: '15px', backgroundColor: '#00c73c', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '17px', transition: 'background 0.2s', marginTop: '20px' },
    toggleBtn: { padding: '5px 12px', background: isAnonymous ? '#ff4d4f' : '#f0f0f0', color: isAnonymous ? '#fff' : '#555', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '12px', transition: 'all 0.2s' }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>기도제목 나누기</h2>
      
      {/* 3. 작성자 표시 및 익명 토글 (군더더기 삭제) */}
      <div style={styles.authorSection}>
        <div>👤 작성자: <strong>{isAnonymous ? '익명 성도' : userNickname}</strong></div>
        <button type="button" onClick={() => setIsAnonymous(!isAnonymous)} style={styles.toggleBtn}>
          {isAnonymous ? '👤 실명으로 전환' : '🙈 익명으로 쓰기'}
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <input 
          type="text" 
          placeholder="제목을 입력하세요" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          style={styles.inputTitle} 
        />
        <textarea 
          placeholder="마음을 담아 기도 제목을 남겨주세요." 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          style={styles.textareaContent} 
        />
        <div style={styles.fileInput}>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <button 
          type="submit" 
          style={styles.submitBtn} 
          onMouseOver={(e) => e.target.style.background = '#00a12e'} 
          onMouseOut={(e) => e.target.style.background = '#00c73c'}
        >
          등록하기
        </button>
      </form>
    </div>
  );
};

export default PrayerWrite;