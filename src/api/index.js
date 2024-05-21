import axios from "axios";

// const API = axios.create({ baseURL: 'http://localhost:5000' })
const API = axios.create({ baseURL: "https://tag-trail-server.onrender.com/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const FetchPosts = (page) => API.get(`/posts?page=${page}`);
export const FetchPost = (id) => API.get(`/posts/${id}`);
export const FetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );

export const CreatePost = (newPost) => API.post("/posts", newPost);
export const UpdatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const DeletePost = (id) => API.delete(`/posts/${id}`);
export const LikePost = (id) => API.patch(`/posts/${id}/likePost`);
export const CommentPost = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });

export const SignIn = (data) => API.post("/user/signin", data);
export const SignUp = (data) => API.post("/user/signup", data);
