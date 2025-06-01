import React from "react"; 
import { Link } from "react-router-dom";

interface NewsProps {
  title: string; // Title of the news item
  subtitle: string; // Subtitle or brief description of the news item
  cover: string; // URL of the cover image for the news item
}

const NewsAdmin: React.FC<NewsProps> = ({ title, subtitle, cover }) => {
  return (
    <div className="flex flex-col md:flex-row w-full scale-[0.85]">
      {/* Display the cover image with hover effect */}
      <img
        src={cover} 
        alt="Cover image" 
        className="w-full md:w-[500px] h-[300px] transform transition-transform duration-200 hover:scale-[1.05]"
      />
      
      <div className="flex flex-col px-[20px] md:px-[30px] py-[10px] gap-[10px] md:gap-[20px] w-full max-w-full md:max-w-[800px] bg-[#F6FBFF] rounded-[14px] mt-[10px] md:mt-0">
        {/* Title of the news item */}
        <div className="text-[30px] md:text-[40px] text-[#223A60] font-bold">
          {title}
        </div>
        
        {/* Subtitle of the news item */}
        <div className="text-[16px] md:text-[20px] text-[#223A60] opacity-[60%]">
          {subtitle}
        </div>
        
        {/* Link to the news details page */}
        <Link
          to="/news-details" 
          className="text-[#0066FF] text-[16px] md:text-[20px] font-medium hover:underline hover:text-[#0047B3] self-end"
        >
          View details {">"} 
        </Link>

        {/* Button to edit the news item */}
        <Link to="/edit-news">
          <button className="flex flex-row gap-[5px] shadow-lg rounded-[5px] bg-[#EBEBEB] bg-opacity-[50%] px-[5px] py-[5px] hover:scale-[1.05] transform transition-transform duration-200 w-max">
            <img src="./edit_icon.png" alt="Edit icon" /> 
            <div className="text-[14px]">Edit</div> 
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NewsAdmin;
