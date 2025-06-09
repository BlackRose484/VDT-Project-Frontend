import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { PATH } from "@/constants/path";

interface HeroProps {
  children: ReactNode; // Children to be rendered inside the Hero component
  nums_booking_changed: number; // Number of booking changes, for notification purposes
}

const Hero = ({ children, nums_booking_changed }: HeroProps) => {
  // Function to smoothly scroll to an element with the specified id
  const scrollTo = (id: string) => {
    const newsElement = document.getElementById(id);
    if (newsElement) {
      newsElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="flex flex-col items-center justify-center overflow-hidden relative px-6 py-20 w-full bg-slate-10 min-h-[400px] max-lg:px-5 max-lg:text-center">
      {/* Background Image */}
      <img
        loading="lazy"
        src="./hero.png"
        alt="Hero Background"
        className="absolute inset-0 object-cover w-full h-full -z-10"
      />

      {/* Children (Flight Details) */}
      <div className="flex flex-col lg:flex-row w-full gap-[30px] px-[20px]">
        {/* Hero Content */}
        <div className="flex flex-col items-ce relative mb-16 text-center space-y-6 max-w-4xl lg:px-[40px]">
          {/* Main Hero Title */}
          <h1 className="text-slate-700 text-5xl font-bold max-lg:text-4xl text-left">
            Wings to Your World
          </h1>

          {/* Hero Description */}
          <p className="text-slate-700 text-xl font-medium tracking-wider text-left">
            Our mission is to connect people and places with safe, reliable, and
            comfortable air travel, delivering exceptional service while
            committing to a sustainable future.
          </p>

          {/* Buttons for various actions */}
          <div className="flex flex-col gap-[20px]">
            {/* Button to scroll to news section */}
            <button
              onClick={() => scrollTo("news")}
              className="flex flex-row border-t-[5px] border-[#223A60] w-max pr-[70px] bg-[#EAF0F0] bg-opacity-[80%] rounded-full gap-[10px] items-center transition-transform duration-200 ease-in-out hover:scale-[1.1]"
            >
              <img
                src="./news.png"
                alt="News"
                className="w-[60px] h-[40px] rounded-full shadow-lg opacity-[70%] hover:opacity-100"
              />
              <div className="text-[#223A60] text-[16px] font-bold">
                Update latest information
              </div>
            </button>

            {/* Button to scroll to why choose us section */}
            <button
              onClick={() => scrollTo("why-choose-us")}
              className="flex flex-row border-t-[5px] border-[#223A60] w-max pr-[70px] bg-[#EAF0F0] bg-opacity-[80%] rounded-full gap-[10px] items-center transition-transform duration-200 ease-in-out hover:scale-[1.1]"
            >
              <img
                src="./why_choose_us_image.png"
                alt="Why Choose Us"
                className="w-[50px] h-[50px] rounded-full shadow-lg opacity-[70%] hover:opacity-100"
              />
              <div className="text-[#223A60] text-[16px] font-bold">
                Why to choose us?
              </div>
            </button>

            {/* Link to bookings page */}
            <Link
              to={PATH.user.mybooking}
              className="flex flex-row border-t-[5px] border-[#223A60] w-max pr-[30px] bg-[#EAF0F0] bg-opacity-[80%] rounded-full  gap-[10px] items-center justify-center transition-transform duration-200 ease-in-out hover:scale-[1.1]"
            >
              <img
                src="./booking_image.png"
                alt="Bookings"
                className="w-[50px] h-[50px] rounded-full shadow-lg opacity-[70%] hover:opacity-100"
              />
              <div className="text-[#223A60] text-[16px] font-bold flex gap-3">
                Check your bookings{" "}
                {nums_booking_changed > 0 && (
                  <div className="relative top-1">
                    <img
                      src="noti.gif"
                      alt="Notification"
                      className="w-[20px] h-[20px]"
                    />
                    <div className="text-sm text-white absolute px-1 top-[-10px] left-[12px] bg-[#de3f3f] rounded-[20px]">
                      {nums_booking_changed}
                    </div>
                  </div>
                )}
              </div>
            </Link>

            {/* Button to scroll to popular flights section */}
            <button
              onClick={() => scrollTo("popular-flights")}
              className="flex flex-row border-t-[5px] border-[#223A60] w-max pr-[20px] bg-[#EAF0F0] bg-opacity-[80%] rounded-full  gap-[10px] items-center justify-center transition-transform duration-200 ease-in-out hover:scale-[1.1]"
            >
              <img
                src="./popular_flights_image.png"
                alt="Popular Flights"
                className="w-[50px] h-[50px] rounded-full shadow-lg opacity-[70%] hover:opacity-100"
              />
              <div className="text-[#223A60] text-[16px] font-bold">
                Popular flights!
              </div>
            </button>
          </div>
        </div>
        {/* Render children, such as flight details */}
        <div className="w-full">{children}</div>
      </div>
    </section>
  );
};

export default Hero;
