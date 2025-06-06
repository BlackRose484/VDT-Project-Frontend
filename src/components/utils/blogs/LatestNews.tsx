import { useRef } from "react";
import Slider from "react-slick";
import LatestNewsCard from "./LatestNewsCard";
import { BlogCard } from "@/types/blogs.type";
import { useQuery } from "@tanstack/react-query";
import { getLatestBlogs } from "@/apis/blogs.api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LatestNews = () => {
  const sliderRef = useRef<Slider>(null); // Reference to the Slider component for controlling the carousel

  // Settings for the Slider component
  const settings = {
    dots: true,
    infinite: true,
    speed: 500, // Transition speed between slides
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      // Responsive settings for different screen sizes
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  // Fetch latest blogs using React Query
  const { data: blogs_data = { data: [] } } = useQuery({
    queryKey: ["blogs"],
    queryFn: getLatestBlogs,
  });

  return (
    <div className="flex flex-col bg-[#EAF0F0] bg-opacity-[20%] w-2/3 mt-[50px] rounded-[20px] px-[60px] py-[30px] border-t-[5px] border-b-[5px] border-blue-200 shadow-inner shadow-lg">
      <div className="md:max-w-[1480px] md:px-0">
        {/* Container for the component */}
        <div className="py-4 text-center">
          <h1 className="text-[60px] font-bold">
            <span className="text-[#283841]">Latest News</span>
          </h1>
        </div>

        <div className="relative">
          {/* Slider component for displaying the latest blogs */}
          <Slider ref={sliderRef} {...settings} className="gap-5">
            {blogs_data.data.map((blog: BlogCard, index: number) => (
              <LatestNewsCard
                _id={blog._id}
                key={index}
                title={blog.title}
                subtitle={blog.subtitle}
                cover_url={`${blog.cover_url}`}
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
