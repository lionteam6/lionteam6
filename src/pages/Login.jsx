import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuthStore } from "../store/setAuthStore";
import { toast } from "react-toastify";
import axios from "axios";


function Login() {
  const login = useAuthStore((state) => state.login);

  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!id || !password) {
      toast.error("아이디와 비밀번호를 입력해주세요.");
      return;
    }

     try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/accounts/login/`,
        {
          username: id,
          password: password,
        }
      );

      console.log("로그인 성공:", response.data);

      const token =
        response.data.accessToken ||
        response.data.access ||
        response.data.token;

      console.log("저장할 토큰:", token);

      if (!token) {
        toast.error("토큰을 받지 못했습니다.");
        return;
      }

      login(token);

      toast.success(`${id}님 환영합니다!`);
      navigate("/home");
    } catch (error) {
      console.error("로그인 실패:", error);
      toast.error("로그인에 실패했습니다.");
    }
  };

  

  return (
    <main className="min-h-screen bg-[#d9d9d9] flex justify-center">
      <section className="w-[375px] min-h-screen bg-white px-[32px] pt-[96px]">
        <div className="flex justify-center mb-[32px]">
          <img
            src={logo}
            alt="소분 로고"
            className="w-[115px] h-auto object-contain"
          />
        </div>

        <div className="text-center mb-[56px]">
          <h2 className="text-[22px] font-bold mb-[10px]">Sign In</h2>
          <p className="text-[14px] text-gray-500">
            대학생들을 위한 공동구매 사이트
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-[18px]">
            <label className="block text-[12px] mb-[8px]">ID</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full h-[50px] bg-gray-100 rounded-[20px] px-4 outline-none"
            />
          </div>

          <div className="mb-[32px]">
            <label className="block text-[12px] mb-[8px]">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[50px] bg-gray-100 rounded-[20px] px-4 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full h-[50px] bg-[#02D384] text-white text-[16px] font-semibold rounded-[40px]"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center gap-[10px] my-[32px]">
          <div className="flex-1 h-px bg-gray-400" />
          <p className="text-[12px] text-gray-700">Or sign up with</p>
          <div className="flex-1 h-px bg-gray-400" />
        </div>

        <div className="text-center mt-[88px]">
          <span className="text-[11px]">Don’t have an account?</span>
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