import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuthStore } from "../store/seAuthStore.Js";
import { toast } from "react-toastify";

function Login() {
  const login = useAuthStore((state) => state.login);

  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 입력값 검사
    if (!id || !password) {
      toast.error("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    // 가짜 토큰 생성
    const fakeToken = "abc123";

    // Zustand 로그인 상태 저장
    login(fakeToken);

    // 성공 알림
    toast.success(`${id}님 환영합니다!`);

    // 페이지 이동
    navigate("/home");
  };

  return (
    <main className="min-h-screen bg-[#d9d9d9] flex justify-center">
      <section className="w-[375px] min-h-screen bg-white px-[32px] pt-[96px]">

        {/* 로고 */}
        <div className="flex justify-center mb-[32px]">
          <img
            src={logo}
            alt="소분 로고"
            className="w-[115px] h-auto object-contain"
          />
        </div>

        {/* 제목 */}
        <div className="text-center mb-[56px]">
          <h2 className="text-[22px] font-bold mb-[10px]">
            Sign In
          </h2>

          <p className="text-[14px] text-gray-500">
            대학생들을 위한 공동구매 사이트
          </p>
        </div>

        {/* 아이디 입력 */}
        <div className="mb-[18px]">
          <label className="block text-[12px] mb-[8px]">
            ID
          </label>

          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full h-[50px] bg-gray-100 rounded-[20px] px-4 outline-none"
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="mb-[32px]">
          <label className="block text-[12px] mb-[8px]">
            PASSWORD
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[50px] bg-gray-100 rounded-[20px] px-4 outline-none"
          />
        </div>

        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
          className="w-full h-[50px] bg-[#02D384] text-white text-[16px] font-semibold rounded-[40px]"
        >
          Sign In
        </button>

        {/* 구분선 */}
        <div className="flex items-center gap-[10px] my-[32px]">
          <div className="flex-1 h-px bg-gray-400" />

          <p className="text-[12px] text-gray-700">
            Or sign up with
          </p>

          <div className="flex-1 h-px bg-gray-400" />
        </div>

        {/* 회원가입 */}
        <div className="text-center mt-[88px]">
          <span className="text-[11px]">
            Don’t have an account?
          </span>

          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-[11px] text-[#02D384] underline"
          >
            Sign up
          </button>
        </div>
      </section>
    </main>
  );
}

export default Login;
