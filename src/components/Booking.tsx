import React from "react";
import { useNavigate } from "react-router-dom";
import {
  formatCurrency,
  formatDate,
  formatDateTime,
  formatTime,
} from "../utils/utils";
import AdjustedFlightNotification from "./AdjustedFlightNotification";
import { BookingProps } from "../types/flight.type";

const Booking: React.FC<BookingProps> = ({
  bookingId,
  flightId,
  bookingDate,
  status,
  departureCityCode,
  destinationCityCode,
  departureCityName,
  destinationCityName,
  departureTime,
  departureTimeOld,
  arrivalTime,
  arrivalTimeOld,
  businessTickets,
  economyTickets,
  totalPrice,
  cancelAvailableUntil,
}) => {
  const data = {
    actual_departure: departureTime,
    actual_arrival: arrivalTime,
    ori_city: departureCityName,
    ori_code: departureCityCode,
    des_city: destinationCityName,
    des_code: destinationCityCode,
    booking_id: bookingId,
    flight_id: flightId,
    nums_busi_book: businessTickets,
    nums_eco_book: economyTickets,
    total_price: totalPrice,
  };

  // Update the booking status based on the current date and departure time.
  if (status === "Confirmed") {
    if (new Date(departureTime).getTime() < new Date().getTime()) {
      status = "Completed";
    } else {
      status = "Up Coming";
    }
  }

  // Format the date and time fields for display.
  const departureDate = formatDate(departureTime);
  departureTime = formatTime(departureTime);
  const arrivalDate = arrivalTime ? formatDate(arrivalTime) : undefined;
  arrivalTime = arrivalTime ? formatTime(arrivalTime) : undefined;

  // Format the cancellation date and booking date.
  cancelAvailableUntil = formatDate(cancelAvailableUntil);
  bookingDate = formatDate(bookingDate);

  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col w-full rounded-[20px] scale-[0.8] hover:scale-[0.82] transform transition-transform duration-200">
        {/* Booking date and Status */}
        <div
          className={`flex flex-col md:flex-row items-center rounded-tl-[20px] rounded-tr-[20px] gap-[20px] px-[28px] py-[28px] self-start w-auto text-[#FFFFFF] font-semibold text-[16px] ${
            status === "Up Coming" ? "bg-[#D8EBFE]" : "bg-[#D5D5D5]"
          }`}
        >
          <div className="bg-[#223A60] rounded-[6px] px-[17px] py-[5px] hover:scale-[1.05] transform transition-transform duration-200">
            Booking {bookingDate}
          </div>
          <div className="text-[#283841] text-[22px] hidden md:block">|</div>
          <div
            className={`rounded-[6px] px-[17px] py-[5px] hover:scale-[1.05] transform transition-transform duration-200 ${
              status === "Up Coming"
                ? "bg-[#223A60]"
                : status === "Completed"
                ? "bg-[#00A78E]"
                : "bg-[#FF0000]"
            }`}
          >
            {status}
          </div>
        </div>
        <div
          className={`flex flex-col border-b-[10px] border-[#223A60] w-full gap-[10px] px-[20px] md:px-[44px] py-[20px] rounded-bl-[20px] rounded-br-[20px] rounded-tr-[20px] ${
            status === "Up Coming" ? "bg-[#D8EBFE]" : "bg-[#D5D5D5]"
          }`}
        >
          {/* Flight info container */}
          <div className="flex flex-col md:flex-row w-full gap-[20px] md:gap-[52px] px-[20px] md:px-[61px] py-[11px]">
            {/* Place */}
            <div className="flex flex-row gap-auto items-center w-full justify-center">
              <div className="flex flex-col w-full items-center">
                <div className="font-bold text-[32px]">{departureCityCode}</div>
                <div className="font-semibold text-[20px]">
                  {departureCityName}
                </div>
              </div>
              <img
                src="./arrow_switch_horizontal.png"
                alt="Arrow"
                className="w-[40px] h-[24px]"
              />
              <div className="flex flex-col w-full items-center">
                <div className="font-bold text-[32px]">
                  {destinationCityCode}
                </div>
                <div className="font-semibold text-[20px]">
                  {destinationCityName}
                </div>
              </div>
            </div>
            <img
              src="./verticle_line.png"
              alt="Line"
              className="hidden md:block scale-[0.8]"
            />
            {/* Schedule */}
            <div className="flex flex-col md:flex-row gap-[18px] w-full text-[20px] font-semibold justify-center items-center">
              <div className="flex flex-col gap-[10px] w-full items-center">
                <div>Departure Date</div>
                <div>{departureDate}</div>
                <div>{departureTime}</div>
              </div>
              {arrivalDate && arrivalTime && (
                <div className="flex flex-col gap-[10px] w-full items-center">
                  <div>Arrival Date</div>
                  <div>{arrivalDate}</div>
                  <div>{arrivalTime}</div>
                </div>
              )}
            </div>
            <img
              src="./verticle_line.png"
              alt="Line"
              className="hidden md:block scale-[0.8]"
            />
            {/* Tickets */}
            <div className="flex flex-col w-full gap-[10px] justify-center items-center font-semibold text-[20px]">
              <div>Business Tickets: {businessTickets}</div>
              <div>Economy Tickets: {economyTickets}</div>
            </div>
          </div>
          {/* Total Price and Cancellation */}
          <div className="flex flex-col md:flex-row justify-between items-center w-full px-[20px] md:px-[61px] py-[11px]">
            <div className="flex flex-row gap-[10px] w-full md:w-auto items-center md:items-start">
              <div className="font-semibold text-[20px] self-center">
                Total Price:
              </div>
              <div className="text-[32px] font-bold text-[#FF0000]">
                {formatCurrency(totalPrice)}
              </div>
            </div>
            <div
              className={`flex flex-col w-full md:w-auto items-center md:items-start text-[16px] gap-[10px] ${
                status === "Up Coming" || status === "Delayed"
                  ? "visible"
                  : "hidden"
              }`}
            >
              You can only cancel this booking before {cancelAvailableUntil}
              <button
                onClick={() =>
                  navigate(`/cancel-booking`, {
                    state: data,
                  })
                }
                className="self-end bg-[#223A60] text-white font-semibold px-[20px] py-[10px] rounded-[6px] mt-[10px] md:mt-0 hover:scale-[1.05] transform transition-transform duration-200 shadow-lg"
              >
                View details
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Notification if the flight is delayed */}
      {status === "Delayed" && (
        <AdjustedFlightNotification
          oldDepartureDate={formatDateTime(departureTimeOld)}
          oldArrivalDate={
            arrivalTimeOld ? formatDateTime(arrivalTimeOld) : undefined
          }
          newDepartureDate={departureTime + " " + departureDate}
          newArrivalDate={arrivalTime + " " + arrivalDate}
          reason={"Bad weather"}
        />
      )}
    </div>
  );
};

export default Booking;
