import React from "react"; 
import { useNavigate } from "react-router-dom"; 
import { SRC } from "../constants/src"; 
import { BlogCard } from "../types/blogs.type"; 

const News: React.FC<BlogCard> = ({ _id, title, subtitle, cover_url }) => {
  const navigate = useNavigate(); // Hook to navigate programmatically within the app

  return (
    <div className="flex flex-col md:flex-row md:w-[90%] w-full scale-[0.85] transform transition-transform duration-200 bg-white rounded-[20px] hover:scale-[0.9] md:justify-between">
      {/* Cover image of the news item */}
      <img
        src={`${SRC.blog_cover}${cover_url}`} 
        alt="Cover image" 
        className="w-[300px] h-[300px] object-cover md:m-3 md:ml-[35px] m-0 rounded-[20px]"
      />
      
      <div className="flex flex-col px-[20px] md:px-[30px] py-[10px] gap-[10px] md:gap-[20px] md:w-[90%] w-full max-w-full md:max-w-[800px] bg-[#daeaf8] rounded-[14px] mt-[10px] md:m-3 relative">
        {/* Title of the news item */}
        <div className="text-[30px] md:text-[40px] text-[#223A60] font-bold">
          {title}
        </div>
        
        {/* Subtitle of the news item */}
        <div className="text-[16px] md:text-[20px] text-[#223A60] opacity-[60%]">
          {subtitle}
        </div>
        
        {/* Button to navigate to the blog details page */}
        <div
          onClick={() => navigate(`/blog-details/${_id}`)} 
          className="cursor-pointer text-[#0066FF] text-[16px] md:text-[20px] font-medium hover:underline hover:text-[#0047B3] self-end mt-auto"
        >
          View details {">"} 
        </div>
      </div>
    </div>
  );
};

export default News;
