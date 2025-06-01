import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface WaitForBookingProps {
  departureCityName: string;
  destinationCityName: string;
  departureDate: string;
  returnDate: string;
  numberOfTickets: number[];
  airplain: string;
  price: number;
  backgrouDeparture: string;
  backgroundDestination: string;
}

const WaitForBooking: React.FC<WaitForBookingProps> = ({
  departureCityName,
  destinationCityName,
  departureDate,
  returnDate,
  numberOfTickets,
  airplain,
  price,
  backgrouDeparture,
  backgroundDestination,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/booking-successfully");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-full h-screen relative">
      {/* 2 background images */}
      <img
        src={backgrouDeparture}
        alt="Departure Background"
        className="absolute left-0 w-1/2 h-full -z-20 object-cover"
      />
      <img
        src={backgroundDestination}
        alt="Destination Background"
        className="absolute right-0 w-1/2 h-full -z-20 object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 backdrop-blur-[2px] -z-10"></div>
      <div className="flex flex-col md:flex-row justify-center items-center scale-[0.9]">
        {/* Left part */}
        <div className="flex flex-col justify-center items-center gap-[7px] px-[20px] py-[30px] md:px-[100px] md:py-[60px] w-full text-center text-[#D8EBFE] font-bold">
          <div className="text-[32px] md:text-[64px]">{departureCityName}</div>
          <div className="text-[16px] md:text-[32px]">{departureDate}</div>
        </div>
        {/* Right part */}
        <div className="flex flex-col justify-center items-center gap-[7px] px-[20px] py-[30px] md:px-[100px] md:py-[60px] w-full text-center text-[#D8EBFE] font-bold">
          <div className="text-[32px] md:text-[64px]">
            {destinationCityName}
          </div>
          <div className="text-[16px] md:text-[32px]">{returnDate}</div>
        </div>
      </div>
      {/* Center part */}
      <div className="flex flex-col gap-[10px] px-[10px] py-[10px] items-center justify-center text-[#D8EBFE] text-[16px] md:text-[24px] font-semibold scale-[0.9]">
        <div className="flex flex-row gap-[10px] px-[10px] py-[10px] items-center justify-center">
          <img
            src="./ticket_icon.png"
            alt="Ticket icon"
            className="w-[20px] md:w-[40px]"
          />
          <div>
            {numberOfTickets[0]} Business, {numberOfTickets[1]} Economy
          </div>
        </div>
        <div className="flex flex-row gap-[10px] px-[10px] py-[10px] items-center justify-center">
          <img
            src="./airplane_icon_white.png"
            alt="Airplane icon"
            className="w-[20px] md:w-[40px]"
          />
          <div>{airplain}</div>
        </div>
        <div className="flex flex-row gap-[10px] px-[10px] py-[10px] items-center justify-center">
          <img
            src="./price_icon.png"
            alt="Price icon"
            className="w-[20px] md:w-[40px]"
          />
          <div>{price} VND</div>
        </div>
      </div>
      {/* Loading */}
      <img
        src="./loading_animation.png"
        alt="Loading animation"
        className="w-[75px] h-[75px] md:w-[150px] md:h-[150px] animate-spin mx-auto mt-[20px]"
      />
      <div className="absolute top-[460px] md:top-[560px] left-[50%] transform -translate-x-1/2 text-[#D8EBFE] text-[12px] md:text-[16px] font-bold text-center">
        Booking...
      </div>
    </div>
  );
};

export default WaitForBooking;
