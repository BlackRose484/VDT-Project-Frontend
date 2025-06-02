import React from "react";
import type { Ticket } from "@/types/flight.type";

interface TicketProps {
  data: Ticket;
  index: number;
  id?: number;
  change?: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  clear?: (id: number) => void;
  errors?: { [key: string]: string };
}

const Ticket: React.FC<TicketProps> = ({
  data,
  index,
  id,
  change,
  clear,
  errors,
}) => {
  let isView = false;
  if (!change) {
    isView = true;
  }

  return (
    <div className="flex flex-col bg-blue-100 w-full rounded-[20px] shadow-md max-w-7xl mx-auto border-t-[10px] border-l-[10px] border-[#223A60]">
      {/* Header */}
      <div className="flex items-center text-white font-semibold text-lg rounded-t-lg">
        <div className="bg-[#223A60] text-center px-4 py-2 rounded-br-[20px]">
          Ticket {index}
        </div>
      </div>

      {/* Form */}
      <fieldset className="flex flex-col gap-[10px] bg-blue-100 p-6 rounded-b-lg">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Date of Birth */}
          <div>
            <label className="block font-medium text-gray-700">
              <div className="flex flex-row gap-[10px] items-center">
                <img
                  src="./calendar_icon_dark_blue.png"
                  alt=""
                  className="scale-[0.8]"
                />
                Date Of Birth
              </div>
            </label>
            <input
              value={
                data.dob ? new Date(data.dob).toISOString().split("T")[0] : ""
              }
              name="dob"
              disabled={isView}
              type="date"
              placeholder="Choose A Date"
              onChange={(e) => change && change(e, id ?? 0)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors?.dob && (
              <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block font-medium text-gray-700">
              <div className="flex flex-row gap-[10px] items-center">
                <img
                  src="./name_icon_dark_blue.png"
                  alt=""
                  className="scale-[0.8]"
                />
                Name
              </div>
            </label>
            <input
              name="name"
              value={data.name}
              type="text"
              disabled={isView}
              placeholder="Enter your name"
              onChange={(e) => change && change(e, id ?? 0)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors?.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Nationality */}
          <div>
            <label className="block font-medium text-gray-700">
              <div className="flex flex-row gap-[10px] items-center">
                <img
                  src="./nationality_icon_dark_blue.png"
                  alt=""
                  className="scale-[0.8]"
                />
                Nationality
              </div>
            </label>
            <input
              name="nationality"
              type="text"
              value={data.nationality}
              disabled={isView}
              placeholder="Enter your nationality"
              onChange={(e) => change && change(e, id ?? 0)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors?.nationality && (
              <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>
            )}
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone Number */}
          <div>
            <label className="block font-medium text-gray-700">
              <div className="flex flex-row gap-[10px] items-center">
                <img
                  src="./phone_icon_dark_blue.png"
                  alt=""
                  className="scale-[0.8]"
                />
                Phone number
              </div>
            </label>
            <input
              name="phone"
              type="tel"
              value={data.phone}
              disabled={isView}
              placeholder="Enter your phone number"
              onChange={(e) => change && change(e, id ?? 0)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors?.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <div className="flex flex-row gap-[10px] items-center">
              <img
                src="./email_icon_dark_blue.png"
                alt=""
                className="scale-[0.8]"
              />
              Email
            </div>
            <input
              name="email"
              type="email"
              value={data.email}
              placeholder="Enter your email"
              disabled={isView}
              onChange={(e) => change && change(e, id ?? 0)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors?.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Passport Number */}
          <div>
            <label className="block font-medium text-gray-700">
              <div className="flex flex-row gap-[10px] items-center">
                <img
                  src="./passport_icon_dark_blue.png"
                  alt=""
                  className="scale-[0.8]"
                />
                Passport number
              </div>
            </label>
            <input
              name="passport"
              type="text"
              value={data.passport}
              disabled={isView}
              placeholder="Enter your passport number"
              onChange={(e) => change && change(e, id ?? 0)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors?.passport && (
              <p className="text-red-500 text-sm mt-1">{errors.passport}</p>
            )}
          </div>
        </div>

        {/* Clear Button */}

        {/* Price */}
        <div className="flex flex-row justify-between items-center mt-[10px]">
          {change && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => clear && clear(id as number)}
                className="px-[40px] py-[5px] bg-slate-800 text-white font-medium rounded-lg shadow hover:bg-red-500 transition"
              >
                Clear
              </button>
            </div>
          )}

          <div className="flex flex-row gap-[10px]">
            <div className="text-lg font-semibold text-[#FF0000]">Price:</div>
            <div className="text-lg font-semibold text-[#FF0000]">
              {data.price} VND
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  );
};
export default Ticket;
