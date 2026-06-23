import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { getCategoryPosts } from "../apis/post";
import orange from "../assets/orange.png"; // 기본 이미지 대체용

const SUB_CATEGORIES = {
  식품: ["전체", "신선식품", "가공식품", "디저트/밀키트"],
  생필품: ["전체", "욕실용품", "주방용품", "청소/세제"],
  공부자료: ["전체", "초등", "중등", "고등", "대학", "고시", "기타"],
  인기품목: ["전체", "실시간 TOP", "마감임박"],
  기타: ["전체"],
};

const CategoryList = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [subTab, setSubTab] = useState("전체");

  const categoryMap = {
    식품: "food",
    생필품: "daily",
    공부자료: "study",
    기타: "etc",
  };

  const currentSubOptions = SUB_CATEGORIES[categoryName] || ["전체"];

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      try {
        const categoryValue = categoryMap[categoryName] || categoryName;
        const data = await getCategoryPosts(categoryValue);
        setItems(data);
      } catch (error) {
        console.error("카테고리 조회 실패:", error);
      }
    };

    fetchCategoryPosts();
    setSubTab("전체");
  }, [categoryName]);

  const filteredItems = items.filter((item) => {
    if (subTab === "전체") return true;
    // 💡 sub_category 데이터가 없을 때를 대비한 안전망 추가
    return item.sub_category === subTab; 
  });

  return (
    <main className="min-h-screen bg-[#F0F7F5] flex justify-center">
      <section className="w-[375px] min-h-screen bg-white shadow-lg flex flex-col overflow-hidden">
        <Header />

        <main className="px-4 pt-4 flex-1 overflow-y-auto pb-10">
          <button onClick={() => navigate("/home")} className="text-[20px] mb-4 block">
            &lt;
          </button>

          <h2 className="text-[16px] font-bold mb-4">{categoryName}</h2>

          <nav className="flex gap-4 text-[12px] border-b border-[#F4F4F4] pb-3 overflow-x-auto scrollbar-hide">
            {currentSubOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSubTab(option)}
                className={`pb-2 whitespace-nowrap transition-all ${
                  subTab === option
                    ? "text-[#02D384] font-bold border-b-2 border-[#02D384]"
                    : "text-gray-400 font-medium"
                }`}
              >
                {option}
              </button>
            ))}
          </nav>

          {/* 리스트 카드 레이아웃 */}
          <section className="mt-2">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <article
                  key={item.id}
               
                  onClick={() => navigate(`/groupbuy/${item.id}`)}
                  className="py-4 border-b border-[#F4F4F4] cursor-pointer flex gap-4 items-center last:border-none"
                >
                  {/* 왼쪽 상품 이미지 */}
                  <img
                    src={item.photo || orange}
                    alt={item.title}
                    className="w-[72px] h-[72px] object-cover rounded-lg bg-gray-50 shrink-0"
                  />

                  {/* 오른쪽 텍스트 정보 */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-bold text-gray-800 truncate">
                      {item.title}
                    </h3>
                    <p className="text-[12px] text-gray-500 mt-1 line-clamp-1">
                      {item.content}
                    </p>
                    
                    {/* 가격 및 모집 현황 추가 레이아웃 */}
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-[12px] font-semibold text-gray-900">
                        {item.price_per_person?.toLocaleString() || item.price?.toLocaleString()}원
                        <span className="text-[10px] text-gray-400 font-normal ml-0.5">/인</span>
                      </div>
                      <span className="text-[11px] text-gray-400">
                        {item.participant_count || 0}/{item.max_participants || 5}명
                      </span>
                    </div>

                    <div className="flex justify-between mt-1 text-[10px] text-gray-400">
                      <span className="text-[#02D384]">◎ {item.author || "작성자"}</span>
                      <span>{item.deadline}</span>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="py-20 text-center text-gray-400 text-[13px]">
                해당 카테고리의 공구가 없습니다.
              </div>
            )}
          </section>
        </main>
      </section>
    </main>
  );
};

export default CategoryList;