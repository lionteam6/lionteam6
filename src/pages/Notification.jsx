import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const initialNotifications = [
  {
    id: 1,
    title: "새 참여자가 생겼어요!",
    content: "'제주 감귤 5kg' 공구에 김**님이 참여했어요.",
    participants: "(4/5명)",
    time: "방금 전",
    isUnread: true, // 읽지 않은 알림 표시용 (초록색 점)
  },
  {
    id: 2,
    title: "새 참여자가 생겼어요!",
    content: "'제주 감귤 5kg' 공구에 김**님이 참여했어요.",
    participants: "(4/5명)",
    time: "방금 전",
    isUnread: true,
  },
  {
    id: 3,
    title: "새 참여자가 생겼어요!",
    content: "'제주 감귤 5kg' 공구에 김**님이 참여했어요.",
    participants: "(4/5명)",
    time: "방금 전",
    isUnread: false, // 이미 읽은 알림은 초록색 점 제외
  },
];

const Notification = () => {
  // 2. navigate 함수 선언하기
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleNotificationClick = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isUnread: false } : notif
      )
    );
  };

  return (
    <main className="min-h-screen bg-[#F0F7F5] flex justify-center">
      <section className="w-[375px] min-h-screen bg-white flex flex-col overflow-hidden">
        
        {/* 상단 헤더 영역 (기존 작성한 디자인 유지) */}
        <div className="flex items-center gap-3 px-4 pt-6 pb-4 border-b border-gray-50">
          {/* 뒤로가기 화살표 아이콘 모양 (필요시 누르면 뒤로가기 navigate 추가) */}
        <span 
            onClick={() => navigate(-1)} 
            className="cursor-pointer text-[16px] font-bold text-gray-700 p-1 hover:text-black transition-colors"
          >
            &lt;
          </span>
          
          <h2 className="text-[18px] font-bold text-gray-900">알림</h2>
        </div>
        {/* 알림 컨텐츠 리스트 영역 */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length > 0 ? (
            <div className="flex flex-col">
              {notifications.map((item) => (
                <article
                  key={item.id}
                  onClick={() => handleNotificationClick(item.id)}
                  className="flex items-start gap-4 px-4 py-4 border-b border-gray-100 bg-white hover:bg-gray-50 transition-colors cursor-pointer relative"
                >
                  {/* 왼쪽 사람/그룹 아이콘 영역 */}
                  <div className="w-[42px] h-[42px] bg-[#EFFFF8] rounded-full flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-[#02D384]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      ></path>
                    </svg>
                  </div>

                  {/* 중간 텍스트 영역 */}
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="text-[14px] font-bold text-gray-900 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[12px] text-gray-600 mt-1 break-all leading-normal">
                      {item.content} <span className="text-gray-400 font-medium">{item.participants}</span>
                    </p>
                    <span className="block text-[10px] text-gray-400 mt-2 text-right w-full">
                      {item.time}
                    </span>
                  </div>

                  {/* 오른쪽 새로운 알림 표시 (초록색 점) */}
                  {item.isUnread && (
                    <span className="w-2 h-2 bg-[#02D384] rounded-full absolute right-4 top-1/2 -translate-y-1/2" />
                  )}
                </article>
              ))}
            </div>
          ) : (
            /* 알림 데이터가 없을 때 빈 화면 UI */
            <div className="h-full flex items-center justify-center py-20 px-4">
              <p className="text-[13px] text-gray-400 text-center">
                아직 새로운 알림이 없습니다.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Notification;