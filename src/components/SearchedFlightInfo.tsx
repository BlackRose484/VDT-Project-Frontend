import React from "react";
import { formatDate, formatTime } from "../utils/utils";
import { useLocation } from "react-router-dom";
interface SearchedFlightInfoProps {
  _id?: string;
  actual_departure: Date | string;
  ori_airport: string;
  ori_code: string;
  ori_city: string;
  des_airport: string;
  des_code: string;
  des_city: string;
  number: string;
  base_price?: number;
  nums_busi_seat_avail?: number;
  nums_eco_seat_avail?: number;
  nums_busi_book: number;
  nums_eco_book: number;
}

const SearchedFlightInfo: React.FC<SearchedFlightInfoProps> = ({
  actual_departure,
  ori_code,
  des_code,
  ori_city,
  des_city,
  nums_busi_book,
  nums_eco_book,
}) => {
  const departure_date = formatDate(actual_departure);
  const depature_time = formatTime(actual_departure);

  const location = useLocation();

  return (
    <section className="flex flex-col gap-[5px] md:gap-auto mb-5 md:flex-row items-center justify-center md:justify-evenly p-2 md:p-6 w-full bg-gray-200 bg-opacity-90 shadow-md font-sans gap-6 border-b-[15px] border-[#223A60]">
      {/* Airport Information */}
      <div className="flex items-center space-x-4">
        {/* Departure Airport */}
        <div className="text-center">
          <h2 className="text-2xl font-bold">{ori_code}</h2>
          <p className="text-gray-600">{ori_city}</p>
        </div>

        {/* Divider */}
        <div className="hidden md:block h-8 w-[1px] bg-gray-300"></div>

        {/* Icon */}
        <div>
          <span className="text-2xl">⇆</span>
        </div>

        {/* Divider */}
        <div className="hidden md:block h-8 w-[1px] bg-gray-300"></div>

        {/* Arrival Airport */}
        <div className="text-center">
          <h2 className="text-2xl font-bold">{des_code}</h2>
          <p className="text-gray-600">{des_city}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden md:block h-16 w-[1px] bg-gray-300"></div>

      {/* Dates Information */}
      <div className="text-center">
        <div>
          <h3 className="text-lg font-semibold">Departure Time</h3>
          <p className="text-gray-600">
            {location.pathname !== "/search"
              ? depature_time + " " + departure_date
              : departure_date}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden md:block h-16 w-[1px] bg-gray-300"></div>

      {/* Ticket Information */}
      <div className="text-center space-y-4">
        <div className="flex justify-between space-x-4">
          <span className="text-lg font-semibold">Business Tickets</span>
          <span className="text-lg">{nums_busi_book}</span>
        </div>
        <div className="flex justify-between space-x-4">
          <span className="text-lg font-semibold">Economy Tickets</span>
          <span className="text-lg">{nums_eco_book}</span>
        </div>
      </div>
    </section>
  );
};

export default SearchedFlightInfo;
