import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import orange from "../assets/orange.png";
import { searchPosts } from "../apis/post";

const CategorySearch = () => {
const navigate = useNavigate();

const [keyword, setKeyword] = useState("");
const [selectedFilter, setSelectedFilter] = useState("품목명");
const [posts, setPosts] = useState([]);

const handleSearch = async () => {
try {
if (!keyword.trim()) return;


  const data = await searchPosts(keyword);

  console.log("검색 결과:", data);

  setPosts(data);

} catch (error) {
  console.error("검색 실패:", error);
}


};

const filteredData = [...posts].sort((a, b) => {
if (selectedFilter === "모집 인원순") {
return b.participant_count - a.participant_count;
}


return 0;


});

return ( <main className="min-h-screen bg-[#F0F7F5] flex justify-center"> <section className="w-[375px] min-h-screen bg-white"> <Header />


    <main className="px-4 pt-3">
      <section className="h-[36px] bg-gray-100 rounded-lg flex items-center px-3">
        <input
          type="text"
          placeholder="공구를 원하는 상품을 입력해 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="flex-1 bg-transparent outline-none text-[12px]"
        />

        <button onClick={handleSearch}>
          ⌕
        </button>
      </section>

      <section className="flex justify-center gap-2 mt-3">
        {["품목명", "모집 인원순"].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={
              selectedFilter === filter
                ? "px-3 py-1 rounded border border-[#02D384] text-[#02D384] text-[11px]"
                : "px-3 py-1 rounded border text-gray-400 text-[11px]"
            }
          >
            {filter}
          </button>
        ))}
      </section>

      <section className="mt-5">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <article
              key={item.id}
              onClick={() => navigate(`/groupbuy/${item.id}`)}
              className="border-b py-3 cursor-pointer"
            >
              <div className="flex gap-3">
                <img
                  src={item.photo || orange}
                  alt={item.title}
                  className="w-[76px] h-[76px] rounded-lg object-cover"
                />

                <div className="flex-1">
                  <div className="flex gap-1">
                    <span className="text-[#02D384] border border-[#02D384] rounded-full px-2 text-[10px]">
                      {item.category}
                    </span>

                    <span className="bg-pink-100 text-pink-400 rounded-full px-2 text-[10px]">
                      {item.status === "progress"
                        ? "진행 중"
                        : "마감"}
                    </span>
                  </div>

                  <h3 className="text-[13px] font-bold mt-2">
                    {item.title}
                  </h3>

                  <div className="flex justify-between mt-2 text-[11px]">
                    <span>
                      {item.participant_count}/
                      {item.max_participants}명
                    </span>

                    <span>
                      {item.price_per_person?.toLocaleString()}원/인
                    </span>
                  </div>

                  <div className="w-full h-[2px] bg-gray-200 mt-1">
                    <div
                      className="h-full bg-black"
                      style={{
                        width: `${
                          (item.participant_count /
                            item.max_participants) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))
        ) : (
          <section className="h-[430px] flex flex-col justify-center items-center text-center">
            <div className="w-[64px] h-[64px] rounded-full bg-[#EFFFF8] flex justify-center items-center text-[#02D384] text-3xl mb-5">
              ⌕
            </div>

            <h3 className="text-[14px] font-bold">
              ‘{keyword}’ 검색 결과가 없어요.
            </h3>

            <p className="text-[12px] text-gray-400 mt-2">
              직접 공구를 열어볼까요?
            </p>

            <button
              className="mt-5 w-[220px] h-[44px] bg-[#02D384] text-white rounded-lg text-[13px]"
            >
              ‘{keyword}’ 공구 등록하기
            </button>
          </section>
        )}
      </section>
    </main>
  </section>
</main>
);
};

export default CategorySearch;
