import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import orange from "../assets/orange.png";
import map from "../assets/map.png";
import { getPostDetail, joinPost, leavePost } from "../apis/post";

const GroupBuyDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const data = await getPostDetail(id);
        setPost(data);
      } catch (error) {
        console.error("게시글 상세 조회 실패:", error);
      }
    };

    fetchPostDetail();
  }, [id]);

  const handleJoin = async () => {
    try {
      await joinPost(id);
      alert("공구 참여 완료!");
      const updatedPost = await getPostDetail(id);
      setPost(updatedPost);
    } catch (error) {
      console.error("공구 참여 실패:", error);
    }
  };

  const handleLeave = async () => {
    try {
      await leavePost(id);
      alert("공구 참여 취소 완료!");
      const updatedPost = await getPostDetail(id);
      setPost(updatedPost);
    } catch (error) {
      console.error("공구 참여 취소 실패:", error);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F0F7F5] flex justify-center items-center">
        <div className="text-gray-500 font-medium">Loading...</div>
      </div>
    );
  }

  // 프로그레스 바 계산
  const progress =
    post.max_participants > 0
      ? (post.participant_count / post.max_participants) * 100
      : 0;

 
  const getGroupBuyStatus = () => {
    if (!post) return { text: "", isClosed: false };

    // 조건 1: 인원이 다 찼는지 확인
    const isFull = post.participant_count >= post.max_participants;

    // 조건 2: 마감일이 지났는지 확인
    let isTimeOut = false;
    let dDayText = "";

    if (post.deadline) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 날짜만 정확히 비교하기 위해 정규화

      const end = new Date(post.deadline);
      end.setHours(0, 0, 0, 0);

      const gap = end.getTime() - today.getTime();
      const result = Math.ceil(gap / (1000 * 60 * 60 * 24));

      if (result === 0) {
        dDayText = "D-Day";
      } else if (result < 0) {
        dDayText = "마감";
        isTimeOut = true;
      } else {
        dDayText = `D-${result}`;
      }
    }

    // 둘 중 하나라도 참이면 최종 '마감'으로 제어
    if (isFull || isTimeOut) {
      return { text: "마감", isClosed: true };
    }

    return { text: dDayText || "진행중", isClosed: false };
  };

  
  const status = getGroupBuyStatus();

  return (
    <main className="min-h-screen bg-[#F0F7F5] flex justify-center">
      <section className="w-[375px] min-h-screen bg-white shadow-lg flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto px-4 pb-10">
          {/* 상품 이미지 */}
          <div className="relative mt-2">
           <img
              src={post.photo || orange} 
              alt={post.title || "상품 이미지"}
              className="w-full h-[240px] object-cover rounded-[16px]"
            />
          </div>

          {/* 작성자 프로필 정보 영역 */}
          <section className="flex justify-between items-center mt-4 border-b border-[#F4F4F4] pb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-[#EFFFF8] rounded-full flex items-center justify-center text-[#02D384] font-bold text-sm">
                👤
              </div>
              <div>
                <p className="text-[13px] font-bold text-gray-800">{post.author || "준뺌님"}</p>
                <p className="text-[11px] text-gray-400">{post.university || "서울교육대학교"}</p>
              </div>
            </div>
            <span className="text-[11px] text-[#02D384] bg-[#EFFFF8] rounded-full px-3 py-1 font-medium">
              {post.author_score || "4.3점"}
            </span>
          </section>

         
          <section className="mt-4 border-b border-[#F4F4F4] pb-5">
            <h2 className="text-[18px] font-bold text-gray-900 leading-tight">{post.title}</h2>
            
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-[16px] font-bold text-gray-900">
                {post.price_per_person?.toLocaleString()}원
              </span>
              <span className="text-[12px] text-gray-400">/ 1인당</span>
            </div>
            
            <p className="text-[11px] text-gray-400 mt-1">
              2일 전 · {post.deadline}
            </p>

            <p className="text-[13px] text-gray-600 mt-4 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </section>

          {/* 모집 조건 영역 */}
          <section className="py-5 border-b border-[#F4F4F4]">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[14px] text-gray-900">모집 조건</h3>
                <span className="bg-[#EFFFF8] text-[#02D384] text-[10px] font-bold px-1.5 py-0.5 rounded">
                
                  {status.isClosed ? "마감" : "진행중"}
                </span>
              </div>
            </div>

            {/* 인원 모집 현황 및 D-day 배지 */}
            <div className="flex justify-between items-center text-[13px] font-semibold text-gray-800">
              <span>{post.participant_count}명 / {post.max_participants}명 모집</span>
              
            
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all ${
                status.isClosed
                  ? "bg-gray-100 text-gray-400"  // 진짜 마감되었을 때 (인원 풀 혹은 기한 종료) 회색 스타일
                  : "bg-[#FFEDF2] text-[#FF5C8D]" // 정상 진행 중일 때 (D-4, D-Day 등) 이쁜 핑크 스타일
              }`}>
                {status.text}
              </span>
            </div>

            {/* 프로그레스 바 */}
            <div className="w-full h-[5px] bg-gray-100 mt-2.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-black rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            {/* 프로그레스 바 밑 안내 텍스트 */}
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>최소 3명</span>
              <span>목표 {post.max_participants || 5}명</span>
            </div>
          </section>

          {/* 수령 장소 영역 */}
          <section className="py-5">
            <h3 className="font-bold text-[14px] text-gray-900 mb-3">수령 장소</h3>
            <img
              src={map}
              alt="지도"
              className="w-full h-[140px] object-cover rounded-[12px] border border-gray-100"
            />
            <p className="text-[12px] text-gray-500 mt-2 font-medium">
              📍 {post.location}
            </p>
          </section>

          
          <div className="mt-2">
           <button
                disabled={status.isClosed && !post.is_participant}
                onClick={post.is_participant ? handleLeave : handleJoin}
                className={`w-full h-[48px] rounded-xl font-bold text-[15px] transition-all ${
                  post.is_participant
                    ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    : status.isClosed
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                      : "bg-[#02D384] text-white hover:bg-[#02b873]"
                }`}
              >
              {post.is_participant 
                ? "참여 취소" 
                : status.isClosed 
                  ? "모집 마감" 
                  : "참여하기"
              }
            </button>
            <p className="text-center text-[10px] text-gray-400 mt-2">
              모집 완료 후 결제가 진행돼요.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GroupBuyDetail;