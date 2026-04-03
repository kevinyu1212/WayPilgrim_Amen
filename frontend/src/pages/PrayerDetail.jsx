import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PrayerDetail = () => {
  const { id } = useParams();
  const [prayer, setPrayer] = useState(null);
  const [comment, setComment] = useState('');
  const user = JSON.parse(localStorage.getItem('user')) || { nickname: '성도' };

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/prayers/${id}`);
      setPrayer(res.data);
    } catch (err) { console.error(err); }
  }, [id]);

  useEffect(() => {
    // 1. 조회수 증가 요청 (페이지 진입 시 딱 한 번)
    const updateView = async () => {
      try { await axios.patch(`http://localhost:5000/api/prayers/${id}/view`); } 
      catch (e) { console.error("조회수 증가 실패", e); }
    };

    updateView();
    fetchData();
  }, [id, fetchData]);

  const onCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      await axios.post(`http://localhost:5000/api/prayers/${id}/comments`, {
        author: user.nickname,
        content: comment
      });
      setComment('');
      fetchData();
    } catch (err) { alert("등록 실패"); }
  };

  if (!prayer) return <div style={{padding: '50px', textAlign: 'center'}}>로딩 중...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '20px' }}>
      <Link to="/prayer" style={{color: '#00c73c', textDecoration: 'none'}}>← 목록으로</Link>
      <h2 style={{marginTop: '20px'}}>{prayer.title}</h2>
      <div style={{color: '#888', fontSize: '13px', marginBottom: '20px'}}>
        {prayer.author} | 조회 {prayer.views} | {new Date(prayer.created_at).toLocaleString()}
      </div>
      <div style={{minHeight: '200px', lineHeight: '1.6', whiteSpace: 'pre-wrap'}}>{prayer.content}</div>
      
      <div style={{marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px'}}>
        <h4>댓글 {prayer.comments?.length || 0}</h4>
        {prayer.comments?.map(c => (
          <div key={c.id} style={{padding: '10px 0', borderBottom: '1px solid #f9f9f9'}}>
            <div style={{fontWeight: 'bold', fontSize: '14px'}}>{c.author}</div>
            <div style={{margin: '5px 0'}}>{c.content}</div>
          </div>
        ))}
        <form onSubmit={onCommentSubmit} style={{marginTop: '20px'}}>
          <textarea 
            value={comment} onChange={(e) => setComment(e.target.value)}
            style={{width: '100%', height: '60px', padding: '10px', borderRadius: '4px', border: '1px solid #ddd'}}
            placeholder="댓글을 입력하세요"
          />
          <button type="submit" style={{marginTop: '10px', backgroundColor: '#00c73c', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', cursor: 'pointer'}}>등록</button>
        </form>
      </div>
    </div>
  );
};

export default PrayerDetail;