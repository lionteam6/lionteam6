import { useNavigate, useParams } from "react-router-dom";
import orange from "../assets/orange.png";
import map from "../assets/map.png";

const GroupBuyDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <main className="min-h-screen bg-[#F0F7F5] flex justify-center">
      <section className="w-[375px] min-h-screen bg-white">
        <header className="h-[56px] px-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-[22px]">
            ‹
          </button>

          <div className="flex gap-4">
            <button>⌕</button>
            <button>🔔</button>
          </div>
        </header>

        <main className="px-4">
          <img
            src={orange}
            alt="상품 이미지"
            className="w-full h-[260px] object-cover rounded-[16px]"
          />

          <section className="mt-4 border-b border-[#F4F4F4] pb-5">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[12px] text-[#02D384]">준형님</p>
                <p className="text-[11px] text-gray-400">
                  서울 교육 대학교
                </p>
              </div>

              <span className="text-[11px] text-[#02D384] border border-[#02D384] rounded-full px-2 py-1">
                4.3점
              </span>
            </div>

            <h2 className="text-[18px] font-bold mt-4">
              쎈 수학 내신자료 공구
            </h2>

            <p className="text-[15px] font-semibold mt-1">
              12000원 / 인
            </p>

            <p className="text-[12px] text-gray-400 mt-1">
              2026.03.26
            </p>

            <p className="text-[13px] text-gray-600 mt-4 leading-relaxed">
              초등학생용 새 수학 내신자료를 공구합니다.
              학원에서 단체로 구매 시 할인 적용되어 개당
              12,000원에 구매 가능합니다.
            </p>
          </section>

          <section className="py-5 border-b border-[#F4F4F4]">
            <h3 className="font-bold text-[14px] mb-3">모집 조건</h3>

            <div className="flex justify-between text-[13px]">
              <span>진행중</span>
              <span className="text-pink-400">D-4</span>
            </div>

            <p className="text-[13px] mt-3">3명 / 5명 모집</p>

            <div className="w-full h-[4px] bg-gray-200 mt-2 rounded">
              <div className="w-[60%] h-full bg-black rounded" />
            </div>
          </section>

          <section className="py-5">
            <h3 className="font-bold text-[14px] mb-3">수령 장소</h3>

            <img
              src={map}
              alt="지도"
              className="w-full h-[150px] object-cover rounded-[12px]"
            />

            <p className="text-[12px] text-gray-400 mt-2">
              서울역 인근
            </p>
          </section>

          <button className="w-full h-[50px] bg-[#02D384] text-white rounded-xl font-semibold mb-8">
            참여하기
          </button>
        </main>
      </section>
    </main>
  );
};

export default GroupBuyDetail;