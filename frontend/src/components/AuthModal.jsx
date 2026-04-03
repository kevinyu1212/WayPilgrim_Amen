import React, { useState } from 'react';

function AuthModal({ isOpen, onClose }) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', nickname: '' });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 로그인/회원가입 주소를 백엔드 서버(5000)로 명시
    const endpoint = isLoginView 
      ? 'http://localhost:5000/api/login' 
      : 'http://localhost:5000/api/signup'; 
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        if (isLoginView) {
          localStorage.setItem('token', data.token);
          alert((data.user?.nickname || '성도') + '님, 환영합니다!');
          window.location.reload();
        } else {
          alert('등록되었습니다! 로그인을 진행해주세요.');
          setIsLoginView(true);
        }
      } else {
        alert(data.message || '요청 처리에 실패했습니다.');
      }
    } catch (err) {
      alert('서버 연결에 실패했습니다. 백엔드(5000번)가 켜져 있는지 확인하세요.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-96 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
        <h2 className="text-2xl font-bold text-center mb-8 text-blue-600">
          {isLoginView ? '로그인' : '성도 등록'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginView && (
            <input type="text" placeholder="이름" className="w-full p-4 border rounded-xl bg-gray-50 text-black"
              onChange={e => setForm({...form, nickname: e.target.value})} required />
          )}
          <input type="email" placeholder="이메일" className="w-full p-4 border rounded-xl bg-gray-50 text-black"
            onChange={e => setForm({...form, email: e.target.value})} required />
          <input type="password" placeholder="비밀번호" className="w-full p-4 border rounded-xl bg-gray-50 text-black"
            onChange={e => setForm({...form, password: e.target.value})} required />
          <button className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700">
            {isLoginView ? '로그인' : '등록하기'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <button type="button" onClick={() => setIsLoginView(!isLoginView)} className="text-sm text-gray-500 underline">
            {isLoginView ? '처음이신가요? 성도 등록하기' : '이미 계정이 있으신가요? 로그인'}
          </button>
        </div>
      </div>
    </div>
  );
}
export default AuthModal;