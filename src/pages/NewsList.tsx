import React from "react";
import News from "../components/News";
import { PATH } from "../constants/path";
import { NavLink } from "react-router-dom";
import { getLatestBlogs } from "../apis/blogs.api";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import { BlogCard } from "../types/blogs.type";
import { Pagination } from "../components/Pagination";

const NewsList: React.FC = () => {
  const LIMIT_ITEMS = 5;
  let total_page = 1;
  const [page, setPage] = React.useState(1);
  const [newsOnPage, setNewsOnPage] = React.useState<BlogCard[]>([]);
  const { data: blogs_data = { data: [] }, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: getLatestBlogs,
  });

  React.useEffect(() => {
    if (blogs_data) {
      setNewsOnPage(blogs_data.data.slice(0, LIMIT_ITEMS));
    }
  }, [blogs_data]);

  if (blogs_data) {
    total_page = Math.ceil(blogs_data.data.length / LIMIT_ITEMS);
  }

  const handleChangePage = (page: number) => {
    setPage(page);
    setNewsOnPage(
      blogs_data.data.slice((page - 1) * LIMIT_ITEMS, page * LIMIT_ITEMS)
    );
  };

  const handleNextPage = () => {
    if (page < total_page) {
      setPage(page + 1);
      setNewsOnPage(
        blogs_data.data.slice(page * LIMIT_ITEMS, (page + 1) * LIMIT_ITEMS)
      );
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setNewsOnPage(
        blogs_data.data.slice(
          (page - 2) * LIMIT_ITEMS,
          (page - 1) * LIMIT_ITEMS
        )
      );
    }
  };

  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className="fixed inset-0 -z-10 h-screen">
        {/* <video
          src="./cloud_animation_2.mp4"
          loop
          autoPlay
          muted
          className="w-full h-full object-cover"
        ></video> */}
      </div>
      <div className="flex flex-col gap-12 p-4 md:p-8 lg:p-12 bg-slate-100">
        <div className="flex justify-center space-x-4">
          <input
            type="text"
            placeholder="🔎 Search a news"
            className="border border-black border-opacity-20 bg-gray-200 rounded-lg px-4 py-2 shadow-lg w-full max-w-md"
          />
          <NavLink
            to={PATH.admin.upload_news}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
          >
            Upload News
          </NavLink>
        </div>
        <div className="flex flex-col gap-12 w-full justify-center items-center">
          {newsOnPage.map((blog) => (
            <News
              _id={blog._id}
              title={blog.title}
              subtitle={blog.subtitle}
              cover_url={blog.cover_url}
            />
          ))}
        </div>
      </div>
      <Pagination
        total_page={total_page}
        current_page={page}
        changePage={handleChangePage}
        nextPage={handleNextPage}
        prevPage={handlePreviousPage}
      />
    </>
  );
};

export default NewsList;
