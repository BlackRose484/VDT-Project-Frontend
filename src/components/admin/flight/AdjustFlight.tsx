import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { updateFlight } from "@/apis/admin.api";
import { useQueryClient } from "@tanstack/react-query";

interface AdjustFlightProps {
  oldDepartureDate: string; // Old departure date to be displayed
  oldReturnDate: string | undefined; // Old return date to be displayed (optional)
  flightId: string; // Flight ID to update
  aircraftId: string; // Aircraft ID to update related flights
  handleClose: () => void; // Function to close the modal or component
}

// Define the type for the schedule change data
interface ScheduleChange {
  actual_departure: undefined | string; // Actual departure date to be updated
  actual_arrival: undefined | string; // Actual arrival date to be updated (optional)
}

const AdjustFlight: React.FC<AdjustFlightProps> = ({
  oldDepartureDate,
  oldReturnDate,
  flightId,
  aircraftId,
  handleClose,
}) => {
  // State to manage the schedule change (departure and arrival dates)
  const [schedule, setSchedule] = useState<ScheduleChange>({
    actual_departure: undefined,
    actual_arrival: undefined,
  });

  const queryClient = useQueryClient();

  // Handler for updating the schedule state
  const handleChange =
    (name: keyof ScheduleChange) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setSchedule((prev) => ({
        ...prev,
        [name]: new Date(e.target.value).toISOString(),
      }));
    };

  // Handle confirming the flight update
  const handleConfirm = async () => {
    try {
      await updateFlight(flightId, aircraftId, schedule);
      // Invalidate the related queries to fetch updated data
      queryClient.invalidateQueries({
        queryKey: ["flights", aircraftId],
        exact: true,
      });
      handleClose(); // Close the modal or component after successful update
      console.log("Flight updated");
    } catch (error) {
      console.error(error);
    }
  };

  const toLocalDatetimeString = (utcDateStr?: string) => {
    if (!utcDateStr) return "";
    const date = new Date(utcDateStr);
    const tzOffset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - tzOffset * 60000);
    return localDate.toISOString().slice(0, 16);
  };

  // Function to return the minimum date and time for the input fields (current date and time)
  const getMinDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="flex md:flex-row flex-col items-center justify-between bg-[#FBFF00] bg-opacity-[20%] rounded-[14px] gap-[10px] md:mx-[75px] mx-[25px] px-[30px] py-[20px] hover:scale-[1.03] transform transition-transform duration-200 shadow-lg">
      <div className="flex flex-col gap-[10px]">
        {/*Old departure date */}
        <div className="flex md:flex-row flex-col gap-[10px]">
          <div className="text-[16px] font-semibold">Departure Date:</div>
          <div className="italic text-[16px]">{oldDepartureDate}</div>
        </div>

        {/* Input change the departure date */}
        <div className="flex md:flex-row flex-col gap-[20px]">
          <div className="text-[16px] font-semibold">Change to:</div>
          <div className="flex flex-row">
            <div className="bg-[#D9D9D9] bg-opacit-[50%] rounded-tl-[6px] rounded-bl-[6px] px-[10px] py-[5px]">
              🗓️
            </div>
            <input
              type="datetime-local"
              min={getMinDate()} // Set the minimum date to the current date and time
              value={toLocalDatetimeString(schedule.actual_departure)}
              onChange={handleChange("actual_departure")}
              className="bg-[#D9D9D9] bg-opacit-[50%] rounded-tr-[6px] rounded-br-[6px] px-[10px] py-[5px] text-[16px] md:w-full w-[50%]"
            />
          </div>
        </div>

        {/* Arrival date section if it exists */}
        {oldReturnDate && (
          <>
            <div className="flex md:flex-row flex-col gap-[10px]">
              <div className="text-[16px] font-semibold">Arrival Date:</div>
              <div className="italic text-[16px]">{oldReturnDate}</div>
            </div>
            <div className="flex md:flex-row flex-col gap-[20px]">
              <div className="text-[16px] font-semibold">Change to:</div>
              <div className="flex flex-row items-center">
                <div className="bg-[#D9D9D9] bg-opacit-[50%] rounded-tl-[6px] rounded-bl-[6px] px-[10px] py-[5px]">
                  🗓️
                </div>
                <input
                  type="datetime-local"
                  value={toLocalDatetimeString(schedule.actual_arrival)}
                  min={getMinDate()} // Set the minimum date to the current date and time
                  onChange={handleChange("actual_arrival")}
                  className="bg-[#D9D9D9] bg-opacit-[50%] rounded-tr-[6px] rounded-br-[6px] px-[10px] py-[5px] text-[16px] md:w-full w-[50%]"
                />
              </div>
            </div>
          </>
        )}
      </div>

      <img src="./QAirline_Logo.png" alt="Logo" className="self-center" />

      {/* Confirm button */}
      <div
        onClick={handleConfirm}
        className=" cursor-pointer flex flex-row gap-[10px] items-center bg-red-500 rounded-[20px] px-2 hover:bg-red-600"
      >
        <img
          src="./confirm.png"
          className="w-[25px] h-[25px]"
          alt="Adjust icon"
        />
        <button className=" p-3 text-white">Confirm</button>
      </div>
    </div>
  );
};

export default AdjustFlight;
