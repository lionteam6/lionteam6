import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const CategoryList = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const items = [
    {
      id: 1,
      title: "쎈 수학 내신자료 공구",
      category: "공부자료",
      writer: "준형님",
      date: "2026.03.26",
    },
    {
      id: 2,
      title: "제주 감귤 5kg 공동구매",
      category: "식품",
      writer: "준형님",
      date: "2026.03.26",
    },
    {
      id: 3,
      title: "디아스 생활용품 박스",
      category: "생필품",
      writer: "준형님",
      date: "2026.03.26",
    },
  ];

  const filteredItems = items.filter(
    (item) => item.category === categoryName
  );

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
            {filteredItems.map((item) => (
              <article
                key={item.id}
                onClick={() => navigate(`/groupbuy/${item.id}`)}
                className="py-5 border-b border-[#F4F4F4]"
              >
                <h3 className="text-[14px] font-bold">
                  {item.title}
                </h3>

                <div className="flex justify-between mt-4 text-[12px] text-gray-500">
                  <span className="text-[#02D384]">
                    ◎ {item.writer}
                  </span>
                  <span>{item.date}</span>
                </div>
              </article>
            ))}
          </section>
        </main>
      </section>
    </main>
  );
};

export default CategoryList;