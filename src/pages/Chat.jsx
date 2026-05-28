import { useState } from "react";
import Header from "../components/Header";
import GNB from "../components/GNB";

const Chat = () => {
  const [tab, setTab] = useState("direct");
  const [mode, setMode] = useState("list");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [message, setMessage] = useState("");

  const directChats = [
    {
      id: 1,
      name: "김**",
      preview: "혹시 수령 장소는 편의점 맞나요?",
      time: "오전 11:23",
    },
    {
      id: 2,
      name: "김**",
      preview: "혹시 수령 장소는 편의점 맞나요?",
      time: "오전 11:23",
    },
  ];

  const groupChats = [];
  const chatList = tab === "direct" ? directChats : groupChats;

  const openChatRoom = (room) => {
    setSelectedRoom(room);
    setMode("room");
  };

  return (
    <main className="min-h-screen bg-[#F0F7F5] flex justify-center">
      <section className="relative w-[375px] min-h-screen bg-white shadow-lg flex flex-col overflow-hidden">
        
        {mode === "list" && (
          <>
            {/* [1] 헤더/GNB 영역의 선을 border-gray-100으로 변경 */}
            <div className="bg-white border-b border-gray-100">
              <Header />
              <GNB />
            </div>

            {/* [2] 탭 메뉴의 구분선을 border-gray-100으로 변경 */}
            <section className="flex text-[13px] border-b border-gray-100">
              <button
                onClick={() => setTab("direct")}
                className={
                  tab === "direct"
                    ? "flex-1 py-3 font-bold border-b-2 border-[#02D384] text-black"
                    : "flex-1 py-3 text-gray-400"
                }
              >
                1:1 문의
              </button>

              <button
                onClick={() => setTab("group")}
                className={
                  tab === "group"
                    ? "flex-1 py-3 font-bold border-b-2 border-[#02D384] text-black"
                    : "flex-1 py-3 text-gray-400"
                }
              >
                그룹 채팅
              </button>
            </section>

            <div className="flex-1 overflow-y-auto">
              <section className="px-4 mt-4">
                <div className="h-[38px] bg-gray-100 rounded-lg flex items-center px-3">
                  <input
                    type="text"
                    placeholder="대화 검색"
                    className="flex-1 bg-transparent outline-none text-[12px]"
                  />
                  <button className="text-gray-400 text-sm">⌕</button>
                </div>
              </section>

              <section className="mt-3">
                {chatList.length > 0 ? (
                  chatList.map((chat) => (
                    <article
                      key={chat.id}
                      onClick={() => openChatRoom(chat)}
                      /* [3] 채팅 리스트 사이의 선을 border-gray-50으로 변경 */
                      className="px-4 py-4 border-b border-gray-50 flex gap-3 cursor-pointer active:bg-gray-50"
                    >
                      <div className="w-[40px] h-[40px] rounded-full bg-[#EFFFF8] flex items-center justify-center text-[#02D384] text-[12px] font-bold">
                        소분
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h3 className="text-[14px] font-bold text-gray-800">{chat.name}</h3>
                          <span className="text-[11px] text-gray-400">
                            {chat.time}
                          </span>
                        </div>

                        <p className="text-[12px] text-gray-500 mt-1 truncate">
                          {chat.preview}
                        </p>
                      </div>
                    </article>
                  ))
                ) : (
                  /* 데이터가 없을 때의 UI */
                  <section className="py-20 flex flex-col justify-center items-center text-center">
                    <div className="w-[56px] h-[56px] rounded-full bg-[#EFFFF8] flex items-center justify-center text-[#02D384] text-3xl mb-4">
                      +
                    </div>
                    <h3 className="text-[14px] font-bold text-gray-800">아직 대화가 없어요.</h3>
                    <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
                      공구에 참여하거나 개설하면<br/>자동으로 채팅방이 생성돼요.
                    </p>
                    <button className="mt-6 w-[160px] h-[42px] bg-[#02D384] text-white rounded-xl text-[13px] font-bold shadow-sm">
                      공구 둘러보기
                    </button>
                  </section>
                )}
              </section>
            </div>
          </>
        )}

        {mode === "room" && selectedRoom && (
          <main className="flex-1 flex flex-col bg-white">
            {/* [4] 채팅방 헤더 선 변경 */}
            <header className="h-[56px] px-4 flex items-center gap-3 border-b border-gray-100">
              <button onClick={() => setMode("list")} className="text-[24px] text-gray-600">
                ‹
              </button>
              <h1 className="text-[15px] font-bold text-gray-800">
                {selectedRoom.name}
              </h1>
            </header>

            <section className="flex-1 px-4 py-4 overflow-y-auto">
              <div className="mb-4">
                <p className="inline-block bg-[#F5F5F5] rounded-2xl px-4 py-2 text-[13px] text-gray-700">
                  안녕하세요!
                </p>
              </div>

              <div className="text-right mb-4">
                <p className="inline-block bg-[#02D384] text-white rounded-2xl px-4 py-2 text-[13px] font-medium">
                  수령 장소 확인 부탁드려요.
                </p>
              </div>
            </section>

            {/* [5] 입력창 상단 선 변경 */}
            <section className="px-3 py-3 border-t border-gray-100 flex items-center gap-2">
              <button className="text-[#02D384] text-xl px-2 font-bold">+</button>

              <input
                type="text"
                placeholder="입력하세요"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 h-[40px] bg-gray-100 rounded-full px-4 outline-none text-[13px]"
              />

              <button
                onClick={() => setMessage("")}
                className="w-[36px] h-[36px] rounded-full bg-[#02D384] text-white flex items-center justify-center font-bold"
              >
                ↑
              </button>
            </section>
          </main>
        )}
      </section>
    </main>
  );
};

export default Chat;