import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import GNB from "../components/GNB";
import { getPosts, deletePost, createPost } from "../apis/post";
import orange from "../assets/orange.png";

const MAX = 5;

const SUB_CATEGORY_OPTIONS = {
  food: ["신선식품", "가공식품", "디저트/밀키트"],
  daily: ["욕실용품", "주방용품", "청소/세제"],
  study: ["초등", "중등", "고등", "대학", "고시", "기타"],
  etc: ["기타"]
};

const GroupBuy = () => {
  const navigate = useNavigate();

  const [tab, setTab] = useState("create");
  const [subTab, setSubTab] = useState("all");

  const [step, setStep] = useState(1);
  const [posts, setPosts] = useState([]);
  
  const [title, setTitle] = useState(""); 
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("food");
  const [subCategory, setSubCategory] = useState("신선식품");
  const [purchaseLink, setPurchaseLink] = useState("");
  const [price, setPrice] = useState(""); 
  const [maxParticipants, setMaxParticipants] = useState(5); 
  const [deadline, setDeadline] = useState("");
  const [location, setLocation] = useState("");
  const [photos, setPhotos] = useState([]);
  const inputRef = useRef(null);

  const handleCategoryChange = (catId) => {
    setCategory(catId);
    setSubCategory(SUB_CATEGORY_OPTIONS[catId][0]);
  };

  const currentUserName = localStorage.getItem("username") || "준뺌님";

  const filteredList = posts.filter((item) => {
    if (tab === "created") {
      return (
        item.author === currentUserName || 
        item.writer === currentUserName || 
        item.username === currentUserName ||
        item.is_owner === true ||
        item.is_author === true
      );
    }
    if (tab === "joined") {
      return item.is_participant === true;
    }
    if (subTab === "progress") {
      return item.status === "progress";
    }
    if (subTab === "complete") {
      return item.status !== "progress";
    }
    return true;
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error("공구 조회 실패:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    const remaining = MAX - photos.length;
    files.slice(0, remaining).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) =>
        setPhotos((prev) => prev.length < MAX ? [...prev, ev.target.result] : prev);
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const removePhoto = (idx) =>
    setPhotos((prev) => prev.filter((_, i) => i !== idx));

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      setPosts((prev) => prev.filter((post) => post.id !== postId));
      alert("게시글이 삭제되었습니다.");
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
    }
  };

  const handleCreatePost = async () => {
    try {
      const categoryMap = {
        food: "food",
        daily: "daily",
        study: "study",
        etc: "etc"
      };

      const postData = {
        title: title,                  
        item_name: title,              
        content: content,              
        category: categoryMap[category] || category, 
        purchase_link: purchaseLink || "", 
        price: Number(price), 
        max_participants: Number(maxParticipants),
        deadline: deadline,
        location: location,
      };

      console.log("서버로 전송할 최종 핏 데이터:", postData);
      await createPost(postData);
      setStep(3); 
    } catch (error) {
      console.error("공구 등록 실패:", error);
      alert("공구 등록에 실패했습니다. 데이터를 다시 확인해주세요.");
    }
  };

  const getCategoryName = (category) => {
    if (category === "daily") return "생필품";
    if (category === "food") return "식품";
    if (category === "study") return "공부자료";
    return "기타";
  };

  return (
    <main className="min-h-screen bg-[#F0F7F5] flex justify-center">
      <section className="w-[375px] min-h-screen bg-white shadow-lg flex flex-col overflow-hidden">
        <div className="bg-white border-b border-gray-100">
          <Header />
          <GNB />
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-10 flex flex-col">
          {step !== 3 && (
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
                    setSubTab("all");
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
          )}

          {tab !== "create" && (
            <>
              <section className="flex justify-between mt-5 text-[13px] border-b border-gray-100">
                <button onClick={() => setSubTab("all")} className={`pb-2 px-1 transition-all ${subTab === "all" ? "font-bold border-b-2 border-[#02D384] text-black" : "text-gray-400"}`}>
                  전체 {filteredList.length}
                </button>
                <button onClick={() => setSubTab("progress")} className={`pb-2 px-1 transition-all ${subTab === "progress" ? "font-bold border-b-2 border-[#02D384] text-black" : "text-gray-400"}`}>
                  진행 중
                </button>
                <button onClick={() => setSubTab("complete")} className={`pb-2 px-1 transition-all ${subTab === "complete" ? "font-bold border-b-2 border-[#02D384] text-black" : "text-gray-400"}`}>
                  모집 완료
                </button>
              </section>

              <section className="mt-5">
                {filteredList.length > 0 ? (
                  filteredList.map((item) => (
                    <article key={item.id} onClick={() => navigate(`/groupbuy/${item.id}`)} className="border-b border-gray-100 last:border-none pb-5 mb-5 cursor-pointer">
                      <div className="flex gap-4">
                        <img src={item.photo || orange} alt={item.title} className="w-[80px] h-[80px] object-cover rounded-lg bg-gray-100" />
                        <div className="flex-1">
                          <div className="flex gap-1.5 mb-1.5">
                            <span className="text-[#02D384] border border-[#02D384] rounded px-2 py-0.5 text-[10px] font-medium">{getCategoryName(item.category)}</span>
                            <span className="bg-[#FFEDF2] text-[#FF5C8D] rounded px-2 py-0.5 text-[10px] font-bold">{item.status === "progress" ? "진행 중" : "마감"}</span>
                          </div>
                          <h3 className="text-[14px] font-semibold text-gray-800 leading-tight">{item.title}</h3>
                          <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">{item.content}</p>
                          <div className="mt-2 text-[12px]">
                            <span className="font-bold text-gray-900">{item.price_per_person?.toLocaleString()}원</span>
                            <span className="text-gray-400 ml-1">/인</span>
                          </div>
                          <p className="text-[11px] text-gray-400 mt-0.5">{item.participant_count}/{item.max_participants}명</p>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="py-20 flex flex-col items-center">
                    <p className="text-gray-800 font-semibold text-sm">해당하는 공구가 없습니다.</p>
                  </div>
                )}
              </section>
            </>
          )}

          {tab === "create" && (
            <div className="mt-6 flex-1 flex flex-col">
              <section className="flex justify-between items-center mb-8 px-8 relative">
                <div className="absolute top-3 left-10 right-10 h-[1px] bg-gray-100 -z-10" />
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex flex-col items-center bg-white z-10 px-2">
                    <div className={`w-6 h-6 rounded-full text-[12px] flex items-center justify-center transition-colors ${
                      step >= s ? "bg-[#02D384] text-white font-bold" : "bg-gray-100 text-gray-400"
                    }`}>
                      {s}
                    </div>
                    <p className={`text-[11px] mt-1.5 font-medium ${step === s ? "text-[#02D384] font-bold" : "text-gray-400"}`}>
                      {s === 1 ? "상품 정보" : s === 2 ? "모집 조건" : "완료"}
                    </p>
                  </div>
                ))}
              </section>

              {step === 1 && (
                <section className="space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[14px] font-bold text-gray-800 mb-2">상품 사진</label>
                      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
                      <div className="flex gap-2">
                        <div onClick={() => inputRef.current.click()} className="w-[72px] h-[72px] bg-gray-50 border border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 cursor-pointer">
                          <span className="text-xl">+</span><span className="text-[10px]">추가</span>
                        </div>
                        {photos.map((src, i) => (
                          <div key={i} className="relative w-[72px] h-[72px] rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
                            <img src={src} alt="추가 이미지" className="w-full h-full object-cover" />
                            <button type="button" onClick={() => removePhoto(i)} className="absolute top-0.5 right-0.5 w-4 h-4 bg-black/40 rounded-full text-white text-[10px] flex items-center justify-center">×</button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[14px] font-bold text-gray-800 mb-2">상품명</label>
                      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="상품명을 입력해주세요." className="w-full h-11 bg-[#F8F9FA] rounded-xl px-4 outline-none text-[13px]" />
                    </div>

                    <div>
                      <label className="block text-[14px] font-bold text-gray-800 mb-2">카테고리</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {[
                          { id: "food", label: "식품" },
                          { id: "daily", label: "생필품" },
                          { id: "study", label: "공부자료" },
                          { id: "etc", label: "기타" },
                        ].map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => handleCategoryChange(cat.id)}
                            className={`px-4 py-2 text-[12px] rounded-full border transition-all ${
                              category === cat.id ? "bg-[#02D384] text-white border-[#02D384] font-bold" : "bg-[#F5F5F5] text-gray-500 border-transparent"
                            }`}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5 p-2 bg-gray-50 rounded-lg">
                        {(SUB_CATEGORY_OPTIONS[category] || []).map((sub) => (
                          <button
                            key={sub}
                            type="button"
                            onClick={() => setSubCategory(sub)}
                            className={`px-2.5 py-1 text-[11px] rounded-md border ${
                              subCategory === sub ? "bg-white text-[#02D384] border-[#02D384] font-bold" : "bg-white text-gray-400 border-gray-100"
                            }`}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[14px] font-bold text-gray-800 mb-2">상품 설명</label>
                      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="상품에 대한 자세한 설명을 입력해주세요." className="w-full h-24 bg-[#F8F9FA] rounded-xl px-4 py-3 outline-none resize-none text-[13px]" />
                    </div>

                    <div>
                      <label className="block text-[14px] font-bold text-gray-800 mb-1">구매링크 (선택)</label>
                      <input type="text" value={purchaseLink} onChange={(e) => setPurchaseLink(e.target.value)} placeholder="쇼핑몰 URL 입력..." className="w-full h-11 bg-[#F8F9FA] rounded-xl px-4 outline-none text-[13px]" />
                    </div>
                  </div>

                  <button onClick={() => setStep(2)} className="w-full h-12 bg-[#02D384] text-white rounded-xl font-bold text-[14px] mt-6 shadow-md transition-all hover:bg-[#02b873]">
                    다음
                  </button>
                </section>
              )}

              {step === 2 && (
                <section className="space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-[14px] font-bold text-gray-800 mb-2">모집 인원</label>
                      <div className="flex items-center w-full bg-[#F8F9FA] rounded-xl h-11 px-2 justify-between">
                        <button type="button" onClick={() => setMaxParticipants(prev => Math.max(2, prev - 1))} className="text-gray-400 font-bold px-3 text-lg">-</button>
                        <span className="text-[15px] font-bold text-[#02D384]">{maxParticipants}</span>
                        <button type="button" onClick={() => setMaxParticipants(prev => prev + 1)} className="text-gray-400 font-bold px-3 text-lg">+</button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[14px] font-bold text-gray-800 mb-2">총 가격</label>
                      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="가격 입력" className="w-full h-11 bg-[#F8F9FA] rounded-xl px-4 outline-none text-[13px]" />
                      
                      {price && (
                        <p className="text-[11px] text-gray-400 mt-1.5 pl-1 font-medium">
                          1인당 부담금: <span className="text-gray-700 font-bold">{Math.floor(Number(price) / maxParticipants).toLocaleString()}원</span> ({maxParticipants}명 기준)
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[14px] font-bold text-gray-800 mb-2">모집 마감일</label>
                      <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full h-11 bg-[#F8F9FA] rounded-xl px-4 outline-none text-[13px] text-gray-700" />
                    </div>

                    <div>
                      <label className="block text-[14px] font-bold text-gray-800 mb-2">수령 장소</label>
                      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="예: 서초역 인근" className="w-full h-11 bg-[#F8F9FA] rounded-xl px-4 outline-none text-[13px]" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-6">
                    <button onClick={() => setStep(1)} className="w-full h-12 bg-[#F5F5F5] text-gray-500 rounded-xl font-bold text-[14px]">
                      이전
                    </button>
                    <button onClick={handleCreatePost} className="w-full h-12 bg-[#02D384] text-white rounded-xl font-bold text-[14px] shadow-md hover:bg-[#02b873]">
                      공구 등록 완료
                    </button>
                  </div>
                </section>
              )}

              {step === 3 && (
                <section className="flex-1 flex flex-col items-center justify-center py-10">
                  <div className="w-14 h-14 bg-[#EFFFF8] rounded-full flex items-center justify-center text-[#02D384] mb-4 shadow-inner">
                    <span className="text-xl font-bold">✓</span>
                  </div>
                  <h3 className="text-[16px] font-bold text-gray-900 text-center">공구가 등록되었어요!</h3>
                  <p className="text-[12px] text-gray-400 text-center mt-1.5 leading-normal">
                    참여자를 기다리고 있어요.<br />공구 링크를 공유해 보세요.
                  </p>

                  <div className="w-full mt-10 space-y-3">
                    <button onClick={() => { alert("링크가 복사되었습니다!"); }} className="w-full h-12 bg-[#02D384] text-white rounded-xl font-bold text-[14px] shadow-md hover:bg-[#02b873]">
                      링크 공유하기
                    </button>
                    <button onClick={() => { setTab("created"); setStep(1); }} className="w-full text-center text-[12px] text-gray-400 underline font-medium block">
                      내 공구 관리로 이동 →
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