import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { getCategoryPosts } from "../apis/post";

const CategoryList = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  const categoryMap = {
    식품: "food",
    생필품: "daily",
    공부자료: "study",
    기타: "etc",
  };

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      try {
        const categoryValue = categoryMap[categoryName] || categoryName;

        const data = await getCategoryPosts(categoryValue);

        console.log("카테고리 조회:", data);

        setItems(data);
      } catch (error) {
        console.error("카테고리 조회 실패:", error);
      }
    };

    fetchCategoryPosts();
  }, [categoryName]);

  return (
    <main className="min-h-screen bg-[#F0F7F5] flex justify-center">
      <section className="w-[375px] min-h-screen bg-white">
        <Header />

        <main className="px-4 pt-4">
          <button
            onClick={() => navigate("/home")}
            className="text-[20px] mb-4"
          >
            ‹
          </button>

          <h2 className="text-[16px] font-bold mb-4">
            {categoryName}
          </h2>

          <nav className="flex justify-between text-[12px] border-b border-[#F4F4F4] pb-3">
            <button className="text-[#02D384] font-semibold border-b-2 border-[#02D384] pb-2">
              전체
            </button>
            <button className="text-gray-400">중등</button>
            <button className="text-gray-400">고등</button>
            <button className="text-gray-400">대학</button>
            <button className="text-gray-400">고시</button>
            <button className="text-gray-400">기타</button>
          </nav>

          <section>
            {items.length > 0 ? (
              items.map((item) => (
                <article
                  key={item.id}
                  onClick={() => navigate(`/group-buy/${item.id}`)}
                  className="py-5 border-b border-[#F4F4F4] cursor-pointer"
                >
                  <h3 className="text-[14px] font-bold">
                    {item.title}
                  </h3>

                  <p className="text-[12px] text-gray-500 mt-2">
                    {item.content}
                  </p>

                  <div className="flex justify-between mt-4 text-[12px] text-gray-500">
                    <span className="text-[#02D384]">
                      ◎ 작성자 {item.author}
                    </span>
                    <span>{item.deadline}</span>
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