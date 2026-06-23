import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import GroupBuy from "./pages/GroupBuy";
import MyPage from "./pages/Mypage";
import Community from "./pages/Community";
import CategorySearch from "./pages/CategorySearch";
import Chat from "./pages/Chat";
import Notification from "./pages/Notification";
import CategoryList from "./pages/CategoryList";
import GroupBuyDetail from "./pages/GroupBuyDetail";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        
       <Route path="/groupbuy" element={<GroupBuy />} />
        
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/search" element={<CategorySearch />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/category/:categoryName" element={<CategoryList />} />
        <Route path="/groupbuy/:id" element={<GroupBuyDetail />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={1500}
      />
    </>
  );
}

export default App;