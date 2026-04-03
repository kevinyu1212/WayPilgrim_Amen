import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const token = localStorage.getItem('token');
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <h1 className="text-6xl font-black text-blue-600 mb-6 tracking-tighter italic">WayPilgrim</h1>
        <p className="text-xl text-gray-500 leading-relaxed max-w-md">
          "주의 말씀은 내 발에 등이요 내 길에 빛이니이다"<br/>
          로그인 후 오늘의 동행을 시작하세요.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20 p-4">
      
      {/* 1. TodayQTCard (오늘의 말씀) */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <span className="bg-white/20 px-4 py-1 rounded-full text-xs font-bold mb-6 inline-block uppercase tracking-wider">Today's QT</span>
          <h2 className="text-3xl font-bold mb-6 leading-tight">"너희는 가만히 있어 내가 하나님 됨을 알지어다"</h2>
          <p className="text-blue-100 text-lg opacity-90 italic">? 시편 46:10</p>
        </div>
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </section>

      {/* 2. 새신자 신앙 입문 & 전자 성경 버튼 (추가된 기능) */}
      <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex justify-between items-baseline mb-10">
          <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">주님과 함께하는 첫걸음</h3>
          <span className="text-sm text-gray-400 font-medium">?? 새신자 가이드</span>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-50 p-7 rounded-3xl border border-blue-100 hover:shadow-md transition">
            <span className="text-3xl mb-4 block">???</span>
            <h4 className="text-xl font-bold text-blue-950 mb-2">복음이란?</h4>
            <p className="text-blue-800 text-sm leading-relaxed mb-4">예수님의 사랑과 구원의 기쁜 소식을 전해드립니다.</p>
            <button className="text-blue-700 font-bold text-sm hover:underline">더 알아보기 →</button>
          </div>
          <div className="bg-green-50 p-7 rounded-3xl border border-green-100 hover:shadow-md transition">
            <span className="text-3xl mb-4 block">??</span>
            <h4 className="text-xl font-bold text-green-950 mb-2">성경 가이드</h4>
            <p className="text-green-800 text-sm leading-relaxed mb-4">하나님의 말씀을 읽는 즐거움을 안내해 드립니다.</p>
            <button className="text-green-700 font-bold text-sm hover:underline">더 알아보기 →</button>
          </div>
          <div className="bg-purple-50 p-7 rounded-3xl border border-purple-100 hover:shadow-md transition">
            <span className="text-3xl mb-4 block">?</span>
            <h4 className="text-xl font-bold text-purple-950 mb-2">신앙 Q&A</h4>
            <p className="text-purple-800 text-sm leading-relaxed mb-4">초신자들이 자주 묻는 질문들을 모았습니다.</p>
            <button className="text-purple-700 font-bold text-sm hover:underline">더 알아보기 →</button>
          </div>
        </div>
        <div className="text-center">
          <Link to="/bible" className="inline-flex items-center space-x-3 bg-blue-600 text-white px-12 py-4 rounded-full font-bold text-xl hover:bg-blue-700 transition shadow-lg active:scale-95">
            <span>?? 전자 성경 읽기</span>
          </Link>
        </div>
      </section>

      {/* 3. EmotionSelector (기존 기능) */}
      <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-6">오늘 성도님의 마음은 어떠신가요?</h3>
        <div className="flex justify-center gap-4 flex-wrap">
          {[
            { emoji: '??', label: '평안함' }, { emoji: '??', label: '기쁨' },
            { emoji: '??', label: '위로' }, { emoji: '??', label: '열정' },
            { emoji: '??', label: '답답함' }, { emoji: '?', label: '은혜' }
          ].map((item) => (
            <button 
              key={item.label}
              onClick={() => setSelectedEmotion(item.label)}
              className={"flex flex-col items-center p-4 w-24 rounded-2xl transition-all hover:bg-blue-50 " + (selectedEmotion === item.label ? "bg-blue-100 ring-2 ring-blue-400" : "bg-gray-50")}
            >
              <span className="text-3xl mb-2">{item.emoji}</span>
              <span className="text-xs font-medium text-gray-600">{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 4. PrayerBanner (기존 기능) */}
      <section className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex flex-col md:flex-row justify-between items-center px-10 gap-4">
        <div className="flex items-center space-x-5">
          <div className="bg-amber-200 p-3 rounded-2xl text-2xl">??</div>
          <div>
            <h4 className="font-bold text-amber-900 text-lg">공동체 중보기도 제목</h4>
            <p className="text-amber-700 font-medium text-sm">환우분들의 쾌유와 새 가족 정착을 위해 기도해주세요.</p>
          </div>
        </div>
        <Link to="/prayer" className="bg-amber-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-amber-700 transition shadow-md whitespace-nowrap">함께 기도하기</Link>
      </section>

      {/* 5. CommunityPreview (기존 기능) */}
      <section>
        <div className="flex justify-between items-center mb-6 px-2">
          <h3 className="text-2xl font-extrabold text-gray-800">성도 소식</h3>
          <button className="text-blue-600 font-bold text-sm hover:underline">더보기</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { tag: '나눔', title: '오늘의 감사 일기', color: 'bg-blue-100' },
            { tag: '찬양', title: '추천 찬양 공유', color: 'bg-green-100' },
            { tag: '묵상', title: '새벽 예배의 은혜', color: 'bg-purple-100' },
            { tag: '공지', title: '소그룹 모임 안내', color: 'bg-red-100' }
          ].map((post, i) => (
            <div key={i} className="group cursor-pointer">
              <div className={"aspect-square rounded-[2rem] mb-3 flex items-center justify-center border border-white transition-all group-hover:shadow-lg " + post.color}>
                 <span className="text-4xl opacity-20 group-hover:opacity-100 transition-opacity">??</span>
              </div>
              <span className="text-[10px] font-black text-blue-500 uppercase px-1">{post.tag}</span>
              <p className="text-sm font-bold text-gray-700 px-1 truncate">{post.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

