import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthModal from '../AuthModal';

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('로그아웃 되었습니다.');
    window.location.reload();
  };

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-black text-blue-600">WayPilgrim</Link>
          <div className="flex items-center space-x-4">
            {token ? (
              <button onClick={handleLogout} className="text-gray-600 font-bold hover:text-red-500">로그아웃</button>
            ) : (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-700 transition shadow-md"
              >
                시작하기
              </button>
            )}
          </div>
        </div>
      </header>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default Header;
