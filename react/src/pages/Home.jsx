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
import { useEffect, useState} from "react";
import axios from "axios";



const Home = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
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

           <button
  onClick={() => setIsModalOpen(true)}
  className="absolute bottom-5 right-5 w-[56px] h-[56px] rounded-full bg-[#02D384] text-white text-3xl"
>
  +
</button>
          </div>
          {isModalOpen && (
  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="w-[280px] bg-white rounded-2xl px-6 py-5 text-center">
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute ml-[235px] mt-[-5px] text-[18px] font-bold"
      >
        ×
      </button>

      <h3 className="text-[15px] font-bold mb-3">공동구매 등록</h3>

      <p className="text-[12px] text-gray-400 mb-5">
        공동구매를 등록하시겠습니까?
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => setIsModalOpen(false)}
          className="flex-1 h-[40px] bg-gray-100 rounded-lg text-[12px]"
        >
          아니오
        </button>

     <button
  onClick={() => {
    setIsModalOpen(false);
    navigate("/groupbuy");
  }}
  className="flex-1 h-[40px] bg-[#02D384] text-white rounded-lg text-[12px]"
>
  예
</button>
      </div>
    </div>
  </div>
)}
        </section>
      </section>
    </main>
  );
};

export default Home;