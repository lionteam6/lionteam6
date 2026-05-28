import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import GNB from "../components/GNB";
import { getPosts, deletePost, createPost, } from "../apis/post";
import orange from "../assets/orange.png";

const GroupBuy = () => {
  const navigate = useNavigate();

  const [tab, setTab] = useState("create");
  const [step, setStep] = useState(1);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("food");
  const [purchaseLink, setPurchaseLink] = useState("");
  const [price, setPrice] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [deadline, setDeadline] = useState("");
  const [location, setLocation] = useState("");

  const currentList = posts;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();

        console.log("공구 전체 조회:", data);

        setPosts(data);
      } catch (error) {
        console.error("공구 조회 실패:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);

      setPosts((prev) => prev.filter((post) => post.id !== postId));

      alert("게시글이 삭제되었습니다.");
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  const handleCreatePost = async () => {
  try {
    const postData = {
      title,
      content,
      item_name: itemName,
      category,
      purchase_link: purchaseLink,
      price: Number(price),
      max_participants: Number(maxParticipants),
      deadline,
      location,
    };

    console.log("등록 데이터:", postData);

    await createPost(postData);

    alert("공구 등록 완료!");

    const updatedPosts = await getPosts();
    setPosts(updatedPosts);

    setTab("created");

  } catch (error) {
    console.error("공구 등록 실패:", error);
  }
};

  const getCategoryName = (category) => {
    if (category === "daily") return "생필품";
    if (category === "food") return "식품";
    if (category === "study") return "공부자료";
    return category;
  };

  return (
    <main className="min-h-screen bg-[#F0F7F5] flex justify-center">
      <section className="w-[375px] min-h-screen bg-white shadow-lg flex flex-col overflow-hidden">
        <div className="bg-white border-b border-gray-100">
          <Header />
          <GNB />
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-10">
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

          {tab !== "create" && (
            <>
              <section className="flex justify-between mt-5 text-[13px] border-b border-gray-100">
                <button className="font-bold border-b-2 border-[#02D384] pb-2 px-1">
                  전체 {currentList.length}
                </button>
                <button className="text-gray-400 pb-2">진행 중</button>
                <button className="text-gray-400 pb-2">모집 완료</button>
              </section>

              <section className="mt-5">
                {currentList.length > 0 ? (
                  currentList.map((item) => (
                    <article
                      key={item.id}
                      onClick={() => navigate(`/group-buy/${item.id}`)}
                      className="border-b border-gray-100 last:border-none pb-5 mb-5 cursor-pointer"
                    >
                      <div className="flex gap-4">
                        <img
                          src={item.photo || orange}
                          alt={item.title}
                          className="w-[80px] h-[80px] object-cover rounded-lg bg-gray-100"
                        />

                        <div className="flex-1">
                          <div className="flex gap-1.5 mb-1.5">
                            <span className="text-[#02D384] border border-[#02D384] rounded px-2 py-0.5 text-[10px] font-medium">
                              {getCategoryName(item.category)}
                            </span>

                            <span className="bg-[#FFEDF2] text-[#FF5C8D] rounded px-2 py-0.5 text-[10px] font-bold">
                              {item.status === "progress" ? "진행 중" : "마감"}
                            </span>
                          </div>

                          <h3 className="text-[14px] font-semibold text-gray-800 leading-tight">
                            {item.title}
                          </h3>

                          <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">
                            {item.content}
                          </p>

                          <div className="mt-2 text-[12px]">
                            <span className="font-bold text-gray-900">
                              {item.price_per_person?.toLocaleString()}원
                            </span>
                            <span className="text-gray-400 ml-1">/인</span>
                          </div>

                          <p className="text-[11px] text-gray-400 mt-0.5">
                            {item.participant_count}/{item.max_participants}명
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        {tab === "created" ? (
                          <>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/edit/${item.id}`);
                              }}
                              className="flex-1 bg-[#F5F5F5] text-gray-600 rounded-lg py-2.5 text-[12px] font-medium"
                            >
                              수정
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="flex-1 bg-[#F5F5F5] text-gray-600 rounded-lg py-2.5 text-[12px] font-medium"
                            >
                              공유
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(item.id);
                              }}
                              className="flex-1 bg-red-50 text-red-400 rounded-lg py-2.5 text-[12px] font-bold"
                            >
                              삭제
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/group-buy/${item.id}`);
                              }}
                              className="flex-1 bg-[#F5F5F5] text-gray-600 rounded-lg py-2.5 text-[12px] font-medium"
                            >
                              상세 보기
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="flex-1 bg-[#F5F5F5] text-gray-600 rounded-lg py-2.5 text-[12px] font-medium"
                            >
                              채팅방
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="flex-1 bg-red-50 text-red-400 rounded-lg py-2.5 text-[12px] font-bold"
                            >
                              참여 취소
                            </button>
                          </>
                        )}
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="py-20 flex flex-col items-center">
                    <div className="w-14 h-14 bg-[#EFFFF8] rounded-full flex items-center justify-center text-[#02D384] text-2xl mb-4">
                      +
                    </div>
                    <p className="text-gray-800 font-semibold text-sm">
                      아직 등록한 공구가 없어요.
                    </p>
                    <button
                      onClick={() => setTab("create")}
                      className="mt-4 px-6 py-2 bg-[#02D384] text-white rounded-full text-sm font-bold"
                    >
                      첫 공구 열기
                    </button>
                  </div>
                )}
              </section>
            </>
          )}

          {tab === "create" && (
            <div className="mt-6">
              <section className="flex justify-between items-center mb-10 px-8 relative">
                <div className="absolute top-3 left-10 right-10 h-[1px] bg-gray-100 -z-10" />
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex flex-col items-center bg-white">
                    <div
                      className={`w-6 h-6 rounded-full text-[12px] flex items-center justify-center transition-colors ${
                        step >= s
                          ? "bg-[#02D384] text-white font-bold"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {s}
                    </div>
                    <p
                      className={`text-[10px] mt-2 ${
                        step >= s
                          ? "text-[#02D384] font-bold"
                          : "text-gray-400"
                      }`}
                    >
                      {s === 1 ? "상품 정보" : s === 2 ? "모집 조건" : "완료"}
                    </p>
                  </div>
                ))}
              </section>

              {step === 1 && (

                <section className="space-y-4">
                  <h2 className="font-bold text-[18px]">
                    어떤 상품을 구매하실 건가요?
                  </h2>

              <div className="w-full aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 cursor-pointer">
                <span className="text-2xl mb-1">+</span>
                <span className="text-[12px]">사진 추가</span>
              </div>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="게시글 제목"
                className="w-full h-12 bg-gray-50 rounded-xl px-4 outline-none border border-transparent focus:border-[#02D384]"
              />

              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="상품명"
                className="w-full h-12 bg-gray-50 rounded-xl px-4 outline-none border border-transparent focus:border-[#02D384]"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-12 bg-gray-50 rounded-xl px-4 outline-none"
              >
                <option value="food">식품</option>
                <option value="daily">생필품</option>
                <option value="study">공부자료</option>
                <option value="etc">기타</option>
              </select>

              <input
                type="text"
                value={purchaseLink}
                onChange={(e) => setPurchaseLink(e.target.value)}
                placeholder="구매 링크"
                className="w-full h-12 bg-gray-50 rounded-xl px-4 outline-none border border-transparent focus:border-[#02D384]"
              />

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="상품 설명"
                className="w-full h-28 bg-gray-50 rounded-xl px-4 py-3 outline-none resize-none border border-transparent focus:border-[#02D384]"
              />

              <button
                onClick={() => setStep(2)}
                className="w-full h-14 bg-[#02D384] text-white rounded-xl font-bold mt-4"
              >
                다음 단계로
              </button>
               </section>)}
               
             {step === 2 && (

  <section className="space-y-4">
    <h2 className="font-bold text-[18px]">
      모집 조건을 입력해주세요
    </h2>

<input
  type="number"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
  placeholder="전체 가격"
  className="w-full h-12 bg-gray-50 rounded-xl px-4 outline-none"
/>

<input
  type="number"
  value={maxParticipants}
  onChange={(e) => setMaxParticipants(e.target.value)}
  placeholder="최대 참여 인원"
  className="w-full h-12 bg-gray-50 rounded-xl px-4 outline-none"
/>

<input
  type="date"
  value={deadline}
  onChange={(e) => setDeadline(e.target.value)}
  className="w-full h-12 bg-gray-50 rounded-xl px-4 outline-none"
/>

<input
  type="text"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
  placeholder="수령 장소"
  className="w-full h-12 bg-gray-50 rounded-xl px-4 outline-none"
/>

<div className="flex gap-2">
  <button
    onClick={() => setStep(1)}
    className="flex-1 h-14 bg-gray-100 rounded-xl font-bold"
  >
    이전
  </button>

  <button
    onClick={handleCreatePost}
    className="flex-1 h-14 bg-[#02D384] text-white rounded-xl font-bold"
  >
    공구 등록 완료
  </button>
</div>



                </section>
              )}

            </div>
          )}
        </div>
    
       </section>
    </main>
  );
};

export default GroupBuy;