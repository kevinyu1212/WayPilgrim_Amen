import React, { useState } from 'react';

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
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* 1. TodayQTCard */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <span className="bg-white/20 px-4 py-1 rounded-full text-xs font-bold mb-6 inline-block uppercase tracking-wider">Today's QT</span>
          <h2 className="text-3xl font-bold mb-6 leading-tight">"너희는 가만히 있어 내가 하나님 됨을 알찌어다"</h2>
          <p className="text-blue-100 text-lg opacity-90 italic">— 시편 46:10</p>
        </div>
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </section>

      {/* 2. EmotionSelector */}
      <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-6">오늘 성도님의 마음은 어떠신가요?</h3>
        <div className="flex justify-center gap-4 flex-wrap">
          {[
            { emoji: '🙏', label: '평안함' },
            { emoji: '😊', label: '기쁨' },
            { emoji: '😢', label: '위로' },
            { emoji: '🔥', label: '열정' },
            { emoji: '☁️', label: '답답함' },
            { emoji: '✨', label: '은혜' }
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

      {/* 3. PrayerBanner */}
      <section className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex flex-col md:flex-row justify-between items-center px-10 gap-4">
        <div className="flex items-center space-x-5">
          <div className="bg-amber-200 p-3 rounded-2xl text-2xl">📝</div>
          <div>
            <h4 className="font-bold text-amber-900 text-lg">공동체 중보기도 제목</h4>
            <p className="text-amber-700 font-medium text-sm">환우분들의 쾌유와 새 가족 정착을 위해 기도해주세요.</p>
          </div>
        </div>
        <button className="bg-amber-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-amber-700 transition shadow-md whitespace-nowrap">
          함께 기도하기
        </button>
      </section>

      {/* 4. CommunityPreview */}
      <section>
        <div className="flex justify-between items-center mb-6 px-2">
          <h3 className="text-2xl font-extrabold text-gray-800">성도 소식</h3>
          <button className="text-blue-600 font-bold text-sm hover:underline font-medium">더보기</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { tag: '나눔', title: '오늘의 감사 일기', color: 'bg-blue-100' },
            { tag: '찬양', title: '추천 찬양 공유', color: 'bg-green-100' },
            { tag: '묵상', title: '새벽 예배의 은혜', color: 'bg-purple-100' },
            { tag: '공지', title: '소그룹 모임 안내', color: 'bg-red-100' }
          ].map((post, i) => (
            <div key={i} className="group cursor-pointer">
              <div className={"aspect-square rounded-[2rem] mb-3 transition-all group-hover:shadow-lg group-hover:-translate-y-1 flex items-center justify-center border border-white relative overflow-hidden " + post.color}>
                 <span className="text-4xl opacity-30 group-hover:opacity-100 transition-opacity">🌿</span>
              </div>
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest px-1">{post.tag}</span>
              <p className="text-sm font-bold text-gray-700 px-1 truncate">{post.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
