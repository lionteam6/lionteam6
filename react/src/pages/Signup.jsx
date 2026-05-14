import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup= () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [school, setSchool] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

const handleSignup = (e) => {
    e.preventDefault();

    alert(`${name}님, 회원가입이 완료되었습니다!`);
    navigate("/login");
  };

  return (
    <form onSubmit={handleSignup}>
    <h3>Create Account</h3>
    <h4>대학생들을 위한 공동 구매 사이트</h4>
      <div>
          <h4>Name</h4>
          <input 
            type="text"
            placeholder="이름을 입력하세요"
            onChange={(e) => setName(e.target.value)} 
            required 
          />
      </div>

      <div>
          <h4>ID</h4>
          <input 
            type="text"
            placeholder="아이디를 입력하세요"
            value={id}
            onChange={(e) => setId(e.target.value)} 
            required 
          />
        </div>

       <div>
          <h4>Password</h4>
          <input 
            type="password" // 비밀번호는 마스킹 처리!
            value={password}
            placeholder="비밀번호를 입력하세요"
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

      <div>
          <h4>학교 이름</h4>
          <input 
            type="text"
            placeholder="학교명을 입력하세요"
            value={school}
            onChange={(e) => setSchool(e.target.value)} 
            required 
          />
        </div>
     
  <label>
    <input 
          type="checkbox" 
          checked={isAgreed} 
          onChange={(e) => setIsAgreed(e.target.checked)} 
        />
        <span>Agree with Terms & Conditions</span>
</label>

<br />

    <button disabled={!name || !id || !password || !school || !isAgreed} type="submit">
      Sign Up
    </button>
    <br/>
    <h4>Or sign up with</h4>
    <h4>
        Already have an account?{" "}
        <button type="button" onClick={() => navigate("/login")}>
          Sign in
        </button>
      </h4>
    </form>
       
  );
};

export default Signup;
