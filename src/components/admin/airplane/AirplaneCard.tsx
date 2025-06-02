import React from "react";
import { useNavigate } from "react-router-dom";

interface AirplaneCardProps {
  aircraftId: string;          // Unique identifier for the airplane
  airplaneNumber: string;      // Airplane number 
  name: string;                // Name of the airplane 
  manufacturer: string;        // Manufacturer of the airplane
  yearOfManufacture: number;   // Year the airplane was manufactured
  model: string;               // Model of the airplane
  numberOfSeats: number;       // Number of seats in the airplane
}

const AirplaneCard: React.FC<AirplaneCardProps> = ({
  aircraftId,
  airplaneNumber,
  name,
  manufacturer,
  yearOfManufacture,
  model,
  numberOfSeats,
}) => {
  const navigate = useNavigate(); 

  return (
    <div className="top-0 left-0 flex flex-col bg-[#D8EBFE] rounded-[20px] shadow-lg hover:scale-[1.05] transform transition-transform duration-200 max-w-[410px]">
      {/* Header section with airplane number and QAirline logo */}
      <div className="flex flex-row mb-[30px]">
        <div className="flex flex-row gap-[20px] bg-[#223A60] rounded-[6px] text-[#FFFFFF] px-[20px] py-[5px] self-start">
          <img
            src="./airplane_icon.png"
            alt="Airplane icon"
            className="scale-[0.9]"
          />
          <div className="text-[16px] font-medium">{airplaneNumber}</div>
        </div>
        <img
          src="./QAirline_Logo.png"
          alt="Logo"
          className="w-[100px] h-[30px] object-full ml-auto mt-[10px] mr-[10px]"
        />
      </div>

      {/* Main body section displaying airplane details */}
      <div className="flex flex-col text-[16px] gap-[15px] px-[30px] mb-[30px]">
        <div className="flex flex-row gap-[10px]">
          <div className="text-[#223A60] font-semibold">Name:</div>
          <div className="text-[#0077FF]">{name}</div>
        </div>
        <div className="flex flex-row gap-[10px]">
          <div className="text-[#223A60] font-semibold">Manufacturer:</div>
          <div className="text-[#0077FF]">{manufacturer}</div>
        </div>
        <div className="flex flex-row gap-[10px]">
          <div className="text-[#223A60] font-semibold">Year of manufacture:</div>
          <div className="text-[#0077FF]">{yearOfManufacture}</div>
        </div>
        <div className="flex flex-row gap-[10px]">
          <div className="text-[#223A60] font-semibold">Model:</div>
          <div className="text-[#0077FF]">{model}</div>
        </div>
        <div className="flex flex-row gap-[10px]">
          <div className="text-[#223A60] font-semibold">Number of seats:</div>
          <div className="text-[#0077FF]">{numberOfSeats} (two-class)</div>
        </div>
      </div>

      {/* Link to view flight details */}
      <div
        onClick={() => {
          navigate("/view-flight", {
            state: { aircraftId, airplaneNumber }, 
          });
        }}
        className="cursor-pointer underline text-[#67AAF6] text-[16px] hover:text-[#0077FF] ml-auto mr-[20px] mb-[10px]"
      >
        View details
      </div>
    </div>
  );
};

export default AirplaneCard;
