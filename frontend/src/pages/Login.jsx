import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.user.nickname + ' 성도님, 환영합니다!');
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('서버와 통신할 수 없습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded-3xl shadow-xl w-96 border border-blue-50">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-blue-600">WayPilgrim</h2>
        <div className="space-y-4">
          <input 
            type="email" placeholder="이메일 주소" 
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" placeholder="비밀번호" 
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold text-lg hover:bg-blue-700 active:scale-95 transition">
            동행 시작하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
