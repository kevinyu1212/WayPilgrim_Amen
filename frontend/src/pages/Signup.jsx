import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({ email: '', password: '', nickname: '' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert('반갑습니다! 이제 로그인을 해주세요.');
      navigate('/login');
    } else {
      const data = await res.json();
      alert(data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-96 border border-blue-50">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">성도 등록</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input 
            type="text" placeholder="이름(닉네임)" className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setForm({...form, nickname: e.target.value})} required
          />
          <input 
            type="email" placeholder="이메일 주소" className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setForm({...form, email: e.target.value})} required
          />
          <input 
            type="password" placeholder="비밀번호" className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setForm({...form, password: e.target.value})} required
          />
          <button className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition">가입하기</button>
        </form>
        <Link to="/login" className="block text-center mt-6 text-gray-500 hover:text-blue-500 text-sm transition">이미 계정이 있으신가요? 로그인</Link>
      </div>
    </div>
  );
}

export default Signup;
