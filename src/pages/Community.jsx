import { useState } from "react";
import Header from "../components/Header"; // 작성하신 Header 컴포넌트 임포트
import GNB from "../components/GNB";

const Community = () => {
  const [tab, setTab] = useState("all");
  const [mode, setMode] = useState("list");

  const posts = [
    { id: 1, title: "공동구매 참여 꿀팁 받습니다~!", writer: "준형님", date: "2026.03.26" },
    { id: 2, title: "공동구매 참여 꿀팁 받습니다~!", writer: "준형님", date: "2026.03.26" },
    { id: 3, title: "공동구매 참여 꿀팁 받습니다~!", writer: "준형님", date: "2026.03.26" },
    { id: 4, title: "공동구매 참여 꿀팁 받습니다~!", writer: "준형님", date: "2026.03.26" },
    { id: 5, title: "공동구매 참여 꿀팁 받습니다~!", writer: "준형님", date: "2026.03.26" },
  ];

  return (
    <main className="min-h-screen bg-[#F0F7F5] flex justify-center">
      <section className="relative w-[375px] min-h-screen bg-white flex flex-col shadow-lg overflow-hidden">
        
        {/* [1] 리스트 모드일 때만 공통 Header와 GNB 노출 */}
        {mode === "list" && (
          <div className="bg-white border-b border-gray-100">
            <Header /> {/* 작성하신 헤더 컴포넌트 사용 */}
            <GNB />
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {mode === "list" ? (
            <>
              {/* 탭 버튼 영역 */}
              <section className="px-4 mt-4 flex gap-2">
                {[
                  { id: "all", label: "전체" },
                  { id: "my", label: "내가 쓴 글 목록" },
                  { id: "search", label: "글 찾기" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTab(item.id)}
                    className={`px-3 py-1 rounded border text-[12px] transition-all ${
                      tab === item.id
                        ? "bg-[#02D384] border-[#02D384] text-white"
                        : "bg-white border-gray-200 text-gray-400"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </section>

              {/* 검색바 (글 찾기 탭 전용) */}
              {tab === "search" && (
                <section className="px-4 mt-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="글 찾기"
                      className="w-full h-[44px] bg-[#F5F5F5] rounded-lg px-4 pr-10 outline-none text-[14px]"
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">⌕</button>
                  </div>
                </section>
              )}

              {/* 게시글 목록 */}
              <section className={tab === "search" ? "mt-2" : "mt-4"}>
                {posts.map((post) => (
                  <article key={post.id} className="px-4 py-5 border-b border-gray-100 last:border-none">
                    <h3 className="font-medium text-[15px] mb-4">{post.title}</h3>
                    <div className="flex justify-between text-[12px] text-gray-400">
                      <div className="flex items-center gap-1">
                        <span className="text-[#02D384] text-[10px]">◉</span>
                        <span>{post.writer}</span>
                      </div>
                      <span>{post.date}</span>
                    </div>
                  </article>
                ))}
              </section>

              {/* 바텀 시트 (내가 쓴 글 목록 전용) */}
              {tab === "my" && (
                <div className="absolute inset-0 bg-black/20 flex flex-col justify-end">
                  <div className="bg-white rounded-t-[24px] p-6 pb-8 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                    <button
                      onClick={() => setMode("write")}
                      className="w-full h-[54px] bg-[#02D384] text-white rounded-xl font-bold text-[16px]"
                    >
                      게시글 작성하기
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* 글쓰기 모드 UI (GNB가 없는 전용 헤더 사용) */
            <section className="flex flex-col h-full bg-white">
              <header className="px-4 py-4 flex justify-between items-center border-b border-gray-100">
                <button onClick={() => setMode("list")} className="text-2xl text-gray-600">‹</button>
                <span className="font-bold">글쓰기</span>
                <button 
                  className="text-[#02D384] font-bold"
                  onClick={() => setMode("list")}
                >
                  등록
                </button>
              </header>
              <div className="p-4">
                <input
                  type="text"
                  placeholder="제목을 입력하세요"
                  className="w-full py-3 border-b border-gray-100 outline-none text-[18px] font-semibold"
                />
                <textarea
                  placeholder="내용을 입력하세요"
                  className="w-full h-[400px] mt-4 outline-none resize-none text-[14px] leading-relaxed"
                />
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  );
};

export default Community;