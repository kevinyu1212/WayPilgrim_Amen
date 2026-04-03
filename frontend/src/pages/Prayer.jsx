import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Prayer = () => {
    const [prayers, setPrayers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPrayers = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/prayers');
                setPrayers(res.data);
            } catch (err) {
                console.error("데이터 로딩 실패", err);
            }
        };
        fetchPrayers();
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ color: '#2c3e50', margin: 0 }}>중보기도 게시판</h1>
                <button 
                    onClick={() => navigate('/prayer/write')}
                    style={{ padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    기도제목 올리기
                </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {prayers.length > 0 ? (
                    prayers.map((p) => (
                        <div 
                            key={p.id} 
                            onClick={() => navigate(`/prayer/${p.id}`)} // 클릭 시 상세페이지 이동
                            style={{ 
                                border: '1px solid #eee', 
                                padding: '20px', 
                                borderRadius: '12px', 
                                cursor: 'pointer', // 마우스 커서를 손가락 모양으로
                                backgroundColor: '#fff',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                transition: 'transform 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{p.title}</h3>
                            <p style={{ color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {p.content}
                            </p>
                            <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#999' }}>
                                👤 {p.author} | 📅 {new Date(p.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', padding: '50px', color: '#999' }}>
                        등록된 기도제목이 없습니다. 첫 기도제목을 올려보세요!
                    </div>
                )}
            </div>
        </div>
    );
};

export default Prayer;