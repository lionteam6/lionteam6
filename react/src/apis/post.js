
import api from "./api";

//공구 전체 조회
export const getPosts = async () => {
    const response = await api.get("/blog/");

    return response.data;
} 

// 공구 상세 조회
export const getPostDetail = async (postId) => {
const response = await api.get(`/blog/${postId}/`);

return response.data;
};

// 공구 생성
export const createPost = async (postData) => {
const response = await api.post("/blog/", postData);

return response.data;
};

// 공구 수정
export const updatePost = async (postId, postData) => {
const response = await api.put(`/blog/${postId}/`,postData);

return response.data;
};

// 공구 삭제
export const deletePost = async (postId) => {
const response = await api.delete(`/blog/${postId}/`);

return response.data;
};

// 상품 검색
export const searchPosts = async (keyword) => {
  const response = await api.get( `/blog/?search=${keyword}`);

  return response.data;
};

// 카테고리 필터
export const getCategoryPosts = async (category) => {
  const response = await api.get("/blog/", {
    params: {
      category,
    },
  });

  return response.data;
};

// 내가 만든 공구 조회
export const getMyPosts = async (status = "") => {
  const response = await api.get("/blog/my-posts/", {
    params: status
      ? {
          status,
        }
      : {},
  });

  return response.data;
};

// 참여 중인 공구 조회
export const getJoinedPosts = async (status = "") => {
  const response = await api.get("/blog/joined-posts/",{
     params: status
      ? {
          status,
        }
      : {},
  });

  return response.data;
};

// 공구 참여
export const joinPost = async (postId) => {
  const response = await api.post(
    `/blog/${postId}/join/`
  );

  return response.data;
};

// 공구 참여 취소
export const leavePost = async (postId) => {
  const response = await api.post(
    `/blog/${postId}/leave/`
  );

  return response.data;
};