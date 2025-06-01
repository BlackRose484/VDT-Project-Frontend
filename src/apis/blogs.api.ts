import { Blog } from "../types/blogs.type";
import http from "../utils/http";

export const getLatestBlogs = async () => {
  return http.get<Blog[]>("/blogs/get-latest");
};

export const getAllBlogs = async () => {
  return http.get<Blog[]>("/blogs/get-all");
};

export const getBlogById = async (id: string) => {
  return http.get<Blog>(`/blogs/get/${id}`);
};

export const uploadBlog = async (data: FormData) => {
  return http.post<string>("/blogs/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateBlog = async (id: string, data: FormData) => {
  return http.put<string>(`/blogs/update/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
