import Header from "../components/Header";
import GNB from "../components/GNB";
import orange from "../assets/orange.png";
import map from "../assets/map.png";
import 공부자료 from "../assets/공부자료.png";
import 기타 from "../assets/기타.png";
import 생필품 from "../assets/생필품.png";
import 식품 from "../assets/식품.png";
import 인기품목 from "../assets/인기품목.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: "공부자료", image: 공부자료 },
    { id: 2, name: "식품", image: 식품 },
    { id: 3, name: "생필품", image: 생필품 },
    { id: 4, name: "인기품목", image: 인기품목 },
    { id: 5, name: "기타", image: 기타 },
  ];

  return (
    <main className="min-h-screen bg-[#F0F7F5] flex justify-center">
      <section className="w-[375px] min-h-screen bg-white overflow-hidden">
        <Header />
        <GNB />

        {/* 메인 배너 */}
        <section className="relative mt-7">
          <div className="relative mx-auto w-[288px] h-[245px] rounded-[28px] overflow-hidden">
            <img
              src={orange}
              alt="감귤 배너"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex justify-center gap-2 mt-4">
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-[#02D384]" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
          </div>
        </section>

        {/* 카테고리 */}
        <section className="px-4 mt-6">
          <div className="flex justify-between">
            {categories.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(`/category/${item.name}`)}
                className="flex flex-col items-center"
              >
                <div className="w-[56px] h-[56px] bg-[#F0F7F5] rounded-2xl mb-2 flex justify-center items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[36px] h-[36px] object-contain"
                  />
                </div>

                <p className="text-[12px] text-gray-700">{item.name}</p>
              </button>
            ))}
          </div>
        </section>

        {/* 지도 */}
        <section className="px-4 mt-8 pb-10">
          <div className="relative rounded-[24px] overflow-hidden">
            <img
              src={map}
              alt="지도"
              className="w-full h-[260px] object-cover"
            />

            <button className="absolute bottom-5 right-5 w-[56px] h-[56px] rounded-full bg-[#02D384] text-white text-3xl">
              +
            </button>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Home;