import { useState } from "react";
import Header from "../components/Header";
import GNB from "../components/GNB";

const GroupBuy = () => {
  const [tab, setTab] = useState("created");
  const [step, setStep] = useState(1);

  const myGroupBuys = [
    { id: 1, title: "제주 감귤 5kg 공동구매", category: "식품", dday: "D-1", price: 12000, people: "3/5명" },
    { id: 2, title: "디아스 생활용품 박스", category: "생필품", dday: "D-1", price: 8000, people: "3/5명" },
  ];

  const joinedGroupBuys = [
    { id: 1, title: "제주 감귤 5kg 공동구매", category: "식품", dday: "D-1", price: 12000, people: "3/5명" },
  ];

  const currentList = tab === "created" ? myGroupBuys : joinedGroupBuys;

  return (
    <main className="min-h-screen bg-[#F0F7F5] flex justify-center">
      <section className="w-[375px] min-h-screen bg-white shadow-lg flex flex-col overflow-hidden">
        
        {/* [1] 헤더 하단 선 수정 (border-gray-100 추가) */}
        <div className="bg-white border-b border-gray-100">
          <Header />
          <GNB />
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-10">
          {/* TAB NAVIGATION */}
          <section className="flex gap-2 mt-4">
            {[
              { id: "create", label: "공구 등록" },
              { id: "created", label: "내가 만든 공구" },
              { id: "joined", label: "참여 중인 공구" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTab(t.id);
                  if (t.id === "create") setStep(1);
                }}
                className={`px-3 py-1 text-[12px] rounded transition-all ${
                  tab === t.id
                    ? "bg-[#02D384] text-white"
                    : "border border-gray-200 text-gray-500 bg-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </section>

          {/* LIST MODE (created or joined) */}
          {tab !== "create" && (
            <>
              {/* [2] 필터 탭 하단 선 수정 (border-gray-100 추가) */}
              <section className="flex justify-between mt-5 text-[13px] border-b border-gray-100">
                <button className="font-bold border-b-2 border-[#02D384] pb-2 px-1">
                  전체 {currentList.length}
                </button>
                <button className="text-gray-400 pb-2">진행 중 1</button>
                <button className="text-gray-400 pb-2">모집 완료 1</button>
              </section>

              <section className="mt-5">
                {currentList.length > 0 ? (
                  currentList.map((item) => (
                    /* [3] 아이템 사이 구분선 수정 (border-gray-100 추가) */
                    <article key={item.id} className="border-b border-gray-100 last:border-none pb-5 mb-5">
                      <div className="flex gap-4">
                        <div className="w-[80px] h-[80px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-300">
                          이미지
                        </div>

                        <div className="flex-1">
                          <div className="flex gap-1.5 mb-1.5">
                            <span className="text-[#02D384] border border-[#02D384] rounded px-2 py-0.5 text-[10px] font-medium">
                              {item.category}
                            </span>
                            <span className="bg-[#FFEDF2] text-[#FF5C8D] rounded px-2 py-0.5 text-[10px] font-bold">
                              {item.dday}
                            </span>
                          </div>

                          <h3 className="text-[14px] font-semibold text-gray-800 leading-tight">
                            {item.title}
                          </h3>
                          <div className="mt-2 text-[12px]">
                            <span className="font-bold text-gray-900">{item.price.toLocaleString()}원</span>
                            <span className="text-gray-400 ml-1">/인</span>
                          </div>
                          <p className="text-[11px] text-gray-400 mt-0.5">{item.people}</p>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        {tab === "created" ? (
                          <>
                            <button className="flex-1 bg-[#F5F5F5] text-gray-600 rounded-lg py-2.5 text-[12px] font-medium">수정</button>
                            <button className="flex-1 bg-[#F5F5F5] text-gray-600 rounded-lg py-2.5 text-[12px] font-medium">공유</button>
                            <button className="flex-1 bg-[#02D384] text-white rounded-lg py-2.5 text-[12px] font-bold">마감</button>
                          </>
                        ) : (
                          <>
                            <button className="flex-1 bg-[#F5F5F5] text-gray-600 rounded-lg py-2.5 text-[12px] font-medium">상세 보기</button>
                            <button className="flex-1 bg-[#F5F5F5] text-gray-600 rounded-lg py-2.5 text-[12px] font-medium">채팅방</button>
                            <button className="flex-1 bg-red-50 text-red-400 rounded-lg py-2.5 text-[12px] font-bold">참여 취소</button>
                          </>
                        )}
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="py-20 flex flex-col items-center">
                    <div className="w-14 h-14 bg-[#EFFFF8] rounded-full flex items-center justify-center text-[#02D384] text-2xl mb-4">+</div>
                    <p className="text-gray-800 font-semibold text-sm">아직 등록한 공구가 없어요.</p>
                    <button onClick={() => setTab("create")} className="mt-4 px-6 py-2 bg-[#02D384] text-white rounded-full text-sm font-bold">첫 공구 열기</button>
                  </div>
                )}
              </section>
            </>
          )}

          {/* CREATE MODE (Steps) */}
          {tab === "create" && (
            <div className="mt-6">
              {/* [4] 스텝 인디케이터 중앙 선 수정 (bg-gray-100 또는 200) */}
              <section className="flex justify-between items-center mb-10 px-8 relative">
                <div className="absolute top-3 left-10 right-10 h-[1px] bg-gray-100 -z-10" />
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex flex-col items-center bg-white">
                    <div className={`w-6 h-6 rounded-full text-[12px] flex items-center justify-center transition-colors ${
                      step >= s ? "bg-[#02D384] text-white font-bold" : "bg-gray-100 text-gray-500"
                    }`}>
                      {s}
                    </div>
                    <p className={`text-[10px] mt-2 ${step >= s ? "text-[#02D384] font-bold" : "text-gray-400"}`}>
                      {s === 1 ? "상품 정보" : s === 2 ? "모집 조건" : "완료"}
                    </p>
                  </div>
                ))}
              </section>

              {/* STEP 1: PRODUCT INFO */}
              {step === 1 && (
                <section className="space-y-4">
                  <h2 className="font-bold text-[18px]">어떤 상품을 구매하실 건가요?</h2>
                  {/* [5] 점선 테두리 색상 수정 (border-gray-200) */}
                  <div className="w-full aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 cursor-pointer">
                     <span className="text-2xl mb-1">+</span>
                     <span className="text-[12px]">사진 추가</span>
                  </div>
                  {/* ... 입력창 생략 ... */}
                  <input type="text" placeholder="상품명" className="w-full h-12 bg-gray-50 rounded-xl px-4 outline-none border border-transparent focus:border-[#02D384] transition-all text-sm" />
                  {/* ... 생략 ... */}
                  <button onClick={() => setStep(2)} className="w-full h-14 bg-[#02D384] text-white rounded-xl font-bold mt-4 shadow-lg shadow-[#02d3842d]">다음 단계로</button>
                </section>
              )}
              {/* ... STEP 2, 3 생략 ... */}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default GroupBuy;