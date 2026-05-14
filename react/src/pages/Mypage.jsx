import { useState } from "react";
import Header from "../components/Header";
import GNB from "../components/GNB";

const MyPage = () => {
  // view: 'main' (프로필 관리), 'auth' (학교 인증), 'manner' (매너점수 상세)
  const [view, setView] = useState("main");

  return (
    <main className="min-h-screen bg-[#F0F7F5] flex justify-center">
      <section className="relative w-[375px] min-h-screen bg-white shadow-lg flex flex-col overflow-hidden">
        
        {/* 1. 메인 프로필 관리 화면 */}
        {view === "main" && (
          <>
            <div className="bg-white">
              <Header />
              <GNB />
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-10">
              <div className="flex justify-between items-center mt-6 mb-4">
                <h2 className="text-[18px] font-bold">프로필 관리</h2>
                <button className="text-xl text-gray-600">⚙️</button>
              </div>

              {/* 프로필 정보 */}
              <section className="flex items-center gap-4 mb-6">
                <div className="w-[60px] h-[60px] bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <span className="text-3xl">👤</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[16px]">준빵님</span>
                    <button 
                      onClick={() => setView("auth")}
                      className="text-[10px] text-[#02D384] border border-[#02D384] rounded-full px-2 py-0.5 flex items-center gap-1"
                    >
                      ✓ 서울 교육 대학교 인증
                    </button>
                  </div>
                </div>
                <button className="border border-gray-300 px-3 py-1 rounded-md text-[12px] text-gray-500">편집</button>
              </section>

              {/* 매너 점수 카드 */}
              <section 
                onClick={() => setView("manner")}
                className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <span className="text-[20px] font-bold">4.3</span>
                    <span className="text-[11px] text-gray-400 ml-2 font-normal">매너 점수</span>
                  </div>
                  <span className="text-[10px] text-gray-400">거래 12건 기준 · 최고 5.0</span>
                </div>
                {/* 프로그래스 바 */}
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden relative">
                  <div className="absolute top-0 left-0 h-full bg-[#02D384] rounded-full" style={{ width: '86%' }}></div>
                </div>
                <div className="flex justify-end mt-2">
                  <span className="text-gray-300 text-[12px]">▶</span>
                </div>
              </section>

              {/* 메뉴 리스트 */}
              <section className="mt-8 space-y-1">
                {[
                  { label: "내가 만든 공구", count: "3건" },
                  { label: "참여 중인 공구", count: "2건" },
                  { label: "스크랩", count: "5건" },
                  { label: "거래 내역", count: null },
                ].map((menu, idx) => (
                  <button key={idx} className="w-full flex justify-between items-center py-4 border-b border-gray-50 last:border-none group">
                    <span className="text-[15px] font-medium text-gray-700">{menu.label}</span>
                    <div className="flex items-center gap-2">
                      {menu.count && <span className="text-[13px] text-gray-500">{menu.count}</span>}
                      <span className="text-gray-300 text-[14px]">▶</span>
                    </div>
                  </button>
                ))}
              </section>
            </div>
          </>
        )}

        {/* 2. 학교 인증 화면 */}
        {view === "auth" && (
          <div className="flex-1 flex flex-col bg-white animate-in slide-in-from-right duration-300">
            <header className="px-4 py-4 flex items-center border-b">
              <button onClick={() => setView("main")} className="text-2xl mr-4">‹</button>
              <h2 className="font-bold text-[16px]">학교 인증</h2>
            </header>
            
            <div className="flex-1 px-4 flex flex-col items-center pt-12">
              <div className="w-16 h-16 bg-[#EFFFF8] rounded-full flex items-center justify-center text-[#02D384] text-3xl mb-6">🎓</div>
              <h3 className="text-[18px] font-bold mb-2">학교 인증이 필요해요!</h3>
              <p className="text-gray-400 text-[13px] text-center mb-10 leading-relaxed">학교를 인증하면<br/>더 많은 공구에 참여할 수 있어요.</p>
              
              <div className="w-full space-y-4 mb-12">
                {["같은 학교 학생들과 공구 참여", "같은 학교 학생들과 공구 참여", "같은 학교 학생들과 공구 참여"].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                    <span className="text-[#02D384]">✓</span>
                    <span className="text-[13px] text-gray-600">{text}</span>
                  </div>
                ))}
              </div>

              <div className="w-full space-y-2 mt-auto pb-10">
                <label className="text-[14px] font-bold ml-1">학교 이름</label>
                <input 
                  type="text" 
                  placeholder="학교 이름" 
                  className="w-full h-14 bg-gray-50 rounded-xl px-4 outline-none border border-transparent focus:border-[#02D384]"
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. 매너 점수 상세 화면 */}
        {view === "manner" && (
          <div className="flex-1 flex flex-col bg-white animate-in slide-in-from-right duration-300">
            <header className="px-4 py-4 flex items-center border-b">
              <button onClick={() => setView("main")} className="text-2xl mr-4">‹</button>
              <h2 className="font-bold text-[16px]">매너 점수</h2>
            </header>

            <div className="flex-1 overflow-y-auto px-4 pt-8 pb-10">
              <section className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center mb-8">
                <span className="text-[40px] font-bold mb-1">4.3</span>
                <p className="text-[12px] text-gray-400 mb-4">거래 12건 기반 · 최고 5.0</p>
                <div className="flex gap-1 text-gray-300 text-xl mb-6">
                  {/* 별점 UI */}
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className={star <= 4 ? "text-gray-400" : ""}>☆</span>
                  ))}
                </div>
                
                {/* 점수 분포 바 히스토그램 */}
                <div className="w-full space-y-2">
                  {[5, 4, 3, 2, 1].map((score) => (
                    <div key={score} className="flex items-center gap-3 text-[11px] text-gray-400">
                      <span className="w-4">{score}점</span>
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full">
                        <div className="h-full bg-gray-300 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                      <span className="w-4 text-right">4건</span>
                    </div>
                  ))}
                </div>
              </section>

              <h3 className="font-bold text-[15px] mb-4">최근 받은 후기</h3>
              <div className="space-y-3">
                {[
                  { name: "준빵님", score: "5.0" },
                  { name: "주빵님", score: "5.0" },
                  { name: "점승님", score: "5.0" },
                ].map((review, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-[#02D384] rounded-full" />
                      <span className="text-[13px] font-bold">{review.name}</span>
                      <span className="text-[11px] text-gray-400 ml-auto">☆ {review.score}</span>
                    </div>
                    <p className="text-[12px] text-gray-600">빠른 수령과 친절한 응대 감사해요!</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default MyPage;