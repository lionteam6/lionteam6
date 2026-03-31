import { useState } from "react";
const Card = () => {
  const [comment, setComment] = useState("");
  const [number, setNumber] = useState(0);

  return (
    <>
    <h1> 토이프로젝트 </h1>
    <div>
      <textarea
      onChange={(e) => setComment(e.target.value)}
      placeholder="텍스트"
      required
      ></textarea>
    </div>
    <button disabled={comment.length === 0} type="submit">
      버튼
    </button>
    <br/>
        <label>
        Text input: <input name="myInput" defaultValue="" />
      </label>
      <input type ="number" value={number}
      onChange={(e) => setNumber(e.target.value)}
    />
    </>
  );
};

export default  Card;
