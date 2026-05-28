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
    return <div>Loading...</div>;
  }

  const progress =
    post.max_participants > 0
      ? (post.participant_count / post.max_participants) * 100
      : 0;

  return (
    <main className="min-h-screen bg-[#F0F7F5] flex justify-center">
      <section className="w-[375px] min-h-screen bg-white">
        <Header />

        <main className="px-4">
          <img
            src={post.photo || orange}
            alt="상품 이미지"
            className="w-full h-[260px] object-cover rounded-[16px]"
          />

          <section className="mt-4 border-b border-[#F4F4F4] pb-5">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[12px] text-[#02D384]">
                  작성자 {post.author}
                </p>
                <p className="text-[11px] text-gray-400">{post.location}</p>
              </div>

              <span className="text-[11px] text-[#02D384] border border-[#02D384] rounded-full px-2 py-1">
                {post.category}
              </span>
            </div>

            <h2 className="text-[18px] font-bold mt-4">{post.title}</h2>

            <p className="text-[15px] font-semibold mt-1">
              {post.price_per_person?.toLocaleString()}원 / 인
            </p>

            <p className="text-[12px] text-gray-400 mt-1">{post.deadline}</p>

            <p className="text-[13px] text-gray-600 mt-4 leading-relaxed">
              {post.content}
            </p>
          </section>

          <section className="py-5 border-b border-[#F4F4F4]">
            <h3 className="font-bold text-[14px] mb-3">모집 조건</h3>

            <div className="flex justify-between text-[13px]">
              <span>{post.status === "progress" ? "진행중" : "마감"}</span>
              <span className="text-pink-400">
                {post.is_full ? "모집 완료" : "모집 중"}
              </span>
            </div>

            <p className="text-[13px] mt-3">
              {post.participant_count}명 / {post.max_participants}명 모집
            </p>

            <div className="w-full h-[4px] bg-gray-200 mt-2 rounded">
              <div
                className="h-full bg-black rounded"
                style={{ width: `${progress}%` }}
              />
            </div>
          </section>

          <section className="py-5">
            <h3 className="font-bold text-[14px] mb-3">수령 장소</h3>

            <img
              src={map}
              alt="지도"
              className="w-full h-[150px] object-cover rounded-[12px]"
            />

            <p className="text-[12px] text-gray-400 mt-2">{post.location}</p>
          </section>

          <button
            onClick={post.is_participant ? handleLeave : handleJoin}
            className="w-full h-[50px] bg-[#02D384] text-white rounded-xl font-semibold mb-8"
          >
            {post.is_participant ? "참여 취소" : "참여하기"}
          </button>
        </main>
      </section>
    </main>
  );
};

export default GroupBuyDetail;