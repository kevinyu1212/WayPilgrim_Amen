import React from 'react';

function Bible() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20 p-6">
      <div className="text-center py-10">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-4 tracking-tight">전자 성경</h1>
        <p className="text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
          "주의 말씀은 내 발에 등이요 내 길에 빛이니이다" (시 119:105)<br/>
          매일 하나님의 생명수 같은 말씀을 가까이 하세요.
        </p>
      </div>

      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 text-center">
        <div className="w-40 h-52 bg-gradient-to-br from-amber-600 to-amber-800 rounded-3xl mx-auto flex items-center justify-center text-5xl shadow-xl mb-6">
          ??
        </div>
        <h2 className="text-2xl font-bold text-amber-950 mb-4">개역개정 성경</h2>
        <p className="text-amber-800 mb-10 max-w-sm mx-auto">창세기부터 요한계시록까지, 주님의 생명의 말씀 속으로 깊이 들어가세요.</p>
        
        <button className="bg-amber-600 text-white px-8 py-3 rounded-full font-bold hover:bg-amber-700 transition active:scale-95 shadow-lg">
          창세기 1장 읽기 →
        </button>
      </div>
    </div>
  );
}

export default Bible;
