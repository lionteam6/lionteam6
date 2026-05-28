import { useNavigate, useLocation } from "react-router-dom";

const GNB = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    { name: "홈", path: "/home" },
    { name: "공동구매", path: "/groupbuy" },
    { name: "마이페이지", path: "/mypage" },
    { name: "메세지", path: "/chat" },
    { name: "커뮤니티", path: "/community" },
  ];

  return (
    <nav className="flex justify-between text-[14px]">
      {menus.map((menu) => (
        <button
          key={menu.path}
          onClick={() => navigate(menu.path)}
          className={
            location.pathname === menu.path
              ? "text-black font-semibold border-b-2 border-[#02D384] pb-2"
              : "text-gray-500"
          }
        >
          {menu.name}
        </button>
      ))}
    </nav>
  );
};

export default GNB;
