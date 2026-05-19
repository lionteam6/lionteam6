import { useNavigate } from "react-router-dom";
import { useState } from "react";

import logo from "../assets/logo.png";
import bell from "../assets/notifications.svg";
import search from "../assets/search.svg";

import { useAuthStore } from "../store/seAuthStore.Js";

import { toast } from "react-toastify";

import Modal from "./Modal";

const Header = () => {
  const navigate = useNavigate();

  // Zustand 로그인 상태
  const { isLoggedIn, logout } = useAuthStore();

  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 로그아웃
  const handleLogout = () => {
    logout();

    toast.info("로그아웃되었습니다.");

    setIsModalOpen(false);

    navigate("/");
  };

  return (
    <>
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

            {/* 로그인 상태일 때만 로그아웃 버튼 */}
            {isLoggedIn && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-sm text-red-500"
              >
                로그아웃
              </button>
            )}

          </div>
        </div>
      </header>

      {/* 모달 */}
      <Modal
        isOpen={isModalOpen}
        title="로그아웃"
        message="정말 로그아웃하시겠습니까?"
        onConfirm={handleLogout}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Header;