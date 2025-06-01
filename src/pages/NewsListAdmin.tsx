import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NewsAdmin from "../components/NewsAdmin";

const NewsListAdmin: React.FC = () => {
  return (
    <div className="flex flex-col gap-12 p-4 md:p-8 lg:p-12">
      <Header />
      <input
        type="text"
        placeholder="🔎 Search a news"
        className="sticky top-0 self-center border border-black border-opacity-20 bg-gray-200 rounded-lg px-4 py-2 shadow-lg w-full max-w-md z-10"
      />
      <Link
        to="/edit-news"
        className="sticky top-[50px] self-center bg-[#223A60] text-[#FFFFFF] text-center font-medium rounded-lg px-4 py-2 shadow-lg w-full max-w-md z-10 transform transition-transform duration-200 hover:scale-[1.05]"
      >
        <button>Add a news</button>
      </Link>
      <div className="flex flex-col gap-12 w-full">
        <NewsAdmin
          title="Notes when taking the flight"
          subtitle="Please note the procedures and rules that must be followed on the flight to ensure safety and a great experience!"
          cover="./cover.png"
        />
        <NewsAdmin
          title="Notes when taking the flight"
          subtitle="Please note the procedures and rules that must be followed on the flight to ensure safety and a great experience!"
          cover="./cover.png"
        />
        <NewsAdmin
          title="Notes when taking the flight"
          subtitle="Please note the procedures and rules that must be followed on the flight to ensure safety and a great experience!"
          cover="./cover.png"
        />
        <NewsAdmin
          title="Notes when taking the flight"
          subtitle="Please note the procedures and rules that must be followed on the flight to ensure safety and a great experience!"
          cover="./cover.png"
        />
        <NewsAdmin
          title="Notes when taking the flight"
          subtitle="Please note the procedures and rules that must be followed on the flight to ensure safety and a great experience!"
          cover="./cover.png"
        />
      </div>
      <Footer />
    </div>
  );
};

export default NewsListAdmin;
