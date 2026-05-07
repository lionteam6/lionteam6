import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import bell from "../assets/notifications.svg";
import search from "../assets/search.svg";


const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="px-4 pt-5 pb-4 border-gray-100 bg-white">
      <div className="flex justify-between items-center">

        {/* 로고 */}
        <button onClick={() => navigate("/home")}>
          <img
            src={logo}
            alt="소분 로고"
            className="w-[72px]"
          />
        </button>

        {/* 오른쪽 아이콘 */}
        <div className="flex items-center gap-4">

          {/* 검색 */}
          <button onClick={() => navigate("/search")}>
            <img
              src={search}
              alt="검색"
              className="w-[20px] h-[20px]"
            />
          </button>

          {/* 알림 */}
          <button onClick={() => navigate("/notification")}>
            <img
              src={bell}
              alt="알림"
              className="w-[20px] h-[20px]"
            />
          </button>

        </div>
      </div>
    </header>
  );
};

export default Header;