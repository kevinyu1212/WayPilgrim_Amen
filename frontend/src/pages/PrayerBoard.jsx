import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PrayerBoard = () => {
  const [prayers, setPrayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/prayers')
      .then(res => setPrayers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', fontFamily: '"Noto Sans KR", sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#333' }}>중보기도 게시판</h2>
        <button 
          onClick={() => navigate('/prayer/write')}
          style={{ padding: '10px 18px', backgroundColor: '#00c73c', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          기도제목 올리기
        </button>
      </div>

      <div style={{ borderTop: '2px solid #333' }}>
        {prayers.map(p => (
          <div key={p.id} style={{ display: 'flex', padding: '15px 10px', borderBottom: '1px solid #eee', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate(`/prayer/${p.id}`)}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '5px', color: '#111' }}>
                {p.title}
              </div>
              <div style={{ display: 'flex', fontSize: '13px', color: '#999', gap: '10px' }}>
                <span>{p.author}</span>
                <span>{new Date(p.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            
            {/* 리스트 우측: 조회수 및 좋아요 표시 */}
            <div style={{ display: 'flex', gap: '15px', fontSize: '13px', color: '#666', textAlign: 'right' }}>
              <div style={{ width: '60px' }}>조회 {p.views || 0}</div>
              <div style={{ width: '60px', color: p.likes > 0 ? '#ff4d4f' : '#666' }}>♥ {p.likes || 0}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrayerBoard;