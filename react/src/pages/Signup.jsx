import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../apis/auth";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [school, setSchool] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const result = await signup({
        username: id,
        name: name,
        nickname: nickname,
        university: school,
        password: password,
      });

      console.log(result);

      alert(`${name}님, 회원가입이 완료되었습니다!`);

      navigate("/login");

    } catch (error) {
      console.error(error);

      alert("회원가입 실패");
    }
  };

  return (
    <main className="min-h-screen bg-[#d9d9d9] flex justify-center">
      <section className="w-[375px] min-h-screen bg-white px-[32px] pt-[80px]">

        {/* 제목 */}
        <div className="text-center mb-[50px]">
          <h2 className="text-[28px] font-bold mb-[10px]">
            Create Account
          </h2>

          <p className="text-[14px] text-gray-500">
            대학생들을 위한 공동구매 사이트
          </p>
        </div>

        <form onSubmit={handleSignup}>

          {/* Name */}
          <div className="mb-[18px]">
            <label className="block text-[12px] mb-[8px]">
              NAME
            </label>

            <input
              type="text"
              placeholder="이름 입력"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[50px] bg-[#F4F4F4] rounded-[20px] px-4 outline-none"
              required
            />
          </div>

          {/* ID */}
          <div className="mb-[18px]">
            <label className="block text-[12px] mb-[8px]">
              ID
            </label>

            <input
              type="text"
              placeholder="아이디 입력"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full h-[50px] bg-[#F4F4F4] rounded-[20px] px-4 outline-none"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-[18px]">
            <label className="block text-[12px] mb-[8px]">
              PASSWORD
            </label>

            <input
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[50px] bg-[#F4F4F4] rounded-[20px] px-4 outline-none"
              required
            />
          </div>

          {/* 학교 */}
          <div className="mb-[18px]">
            <label className="block text-[12px] mb-[8px]">
              학교 이름
            </label>

            <input
              type="text"
              placeholder="학교 입력"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="w-full h-[50px] bg-[#F4F4F4] rounded-[20px] px-4 outline-none"
              required
            />
          </div>

          {/* nickname */}
          <div className="mb-[18px]">
            <label className="block text-[12px] mb-[8px]">
              NICKNAME
            </label>

            <input
              type="text"
              placeholder="닉네임 입력"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full h-[50px] bg-[#F4F4F4] rounded-[20px] px-4 outline-none"
              required
            />
          </div>

          {/* 약관동의 */}
          <label className="flex items-center gap-2 mb-[28px] text-[12px] text-gray-500">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
            />

            Agree with Terms & Conditions
          </label>

          {/* 버튼 */}
          <button
            disabled={
              !name ||
              !id ||
              !password ||
              !school ||
              !nickname ||
              !isAgreed
            }
            type="submit"
            className="w-full h-[50px] bg-[#02D384] text-white text-[18px] font-semibold rounded-[40px] disabled:bg-gray-300"
          >
            Sign Up
          </button>

          {/* divider */}
          <div className="flex items-center gap-[10px] my-[32px]">
            <div className="flex-1 h-px bg-gray-400" />

            <p className="text-[12px] text-gray-700">
              Or sign up with
            </p>

            <div className="flex-1 h-px bg-gray-400" />
          </div>

          {/* 로그인 이동 */}
          <div className="text-center">
            <span className="text-[11px]">
              Already have an account?
            </span>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-[11px] text-[#02D384] underline ml-1"
            >
              Sign in
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Signup;