import React, { useState } from "react";
import { useQueryForm } from "../hooks/useQueryForm";
import { useQuery } from "@tanstack/react-query";
import { addFlight, getAirCraftById } from "../apis/admin.api";
import { getAirports } from "../apis/flight.api";
import { Airports } from "../types/flight.type";
import { formatDate, formatTime } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

interface AddFlightProps {
  number: string;
  ori_airport: string;
  des_airport: string;
  scheduled_departure: Date | string;
  scheduled_arrival: Date | string;
  nums_busi_seat_avail: number;
  nums_eco_seat_avail: number;
  base_price: number;
}

interface SuggestionAirports {
  departure_airport: Airports;
  destination_airport: Airports;
}

interface errorProps {
  number: string;
  ori_airport: string;
  des_airport: string;
  ori_place: string;
  des_place: string;
  scheduled_departure: string;
  scheduled_arrival: string;
  nums_busi_seat_avail: string;
  nums_eco_seat_avail: string;
  base_price: string;
}

const initalValue: AddFlightProps = {
  number: "",
  ori_airport: "",
  des_airport: "",
  scheduled_departure: "",
  scheduled_arrival: "",
  nums_busi_seat_avail: 0,
  nums_eco_seat_avail: 0,
  base_price: 0,
};

const validateError: errorProps = {
  number: "",
  ori_airport: "",
  des_airport: "",
  ori_place: "",
  des_place: "",
  scheduled_departure: "",
  scheduled_arrival: "",
  nums_busi_seat_avail: "",
  nums_eco_seat_avail: "",
  base_price: "",
};

const AddFlight: React.FC = () => {
  const navigate = useNavigate();
  const { aircraft_id, airplane_number } = useQueryForm();
  const [suggestionAirports, setSuggestionAirports] =
    useState<SuggestionAirports>({
      departure_airport: [],
      destination_airport: [],
    });
  const [newFlight, setNewFlight] = useState<AddFlightProps>(initalValue);
  const [error, setError] = useState<errorProps>(validateError);
  const [isLoading, setIsLoading] = useState(false);
  const { data: aircraft } = useQuery({
    queryKey: ["aircraftId", aircraft_id],
    queryFn: () => getAirCraftById(aircraft_id),
  });

  // Format date
  const departure_date =
    newFlight.scheduled_departure !== ""
      ? formatDate(newFlight.scheduled_departure)
      : "dd/mm/yyyy";
  const arrival_date =
    newFlight.scheduled_arrival !== ""
      ? formatDate(newFlight.scheduled_arrival)
      : "dd/mm/yyyy";
  const departure_time =
    newFlight.scheduled_departure !== ""
      ? formatTime(newFlight.scheduled_departure)
      : "hh:mm";
  const arrival_time =
    newFlight.scheduled_arrival !== ""
      ? formatTime(newFlight.scheduled_arrival)
      : "hh:mm";

  // Get all airports
  const { data: airports_data } = useQuery({
    queryKey: ["airport"],
    queryFn: () => getAirports(),
  });

  let airports_group_city: { [key: string]: Airports } = {};
  if (airports_data) {
    airports_group_city = airports_data.data.reduce((acc, airport) => {
      if (!acc[airport.city]) {
        acc[airport.city] = [];
      }
      acc[airport.city].push(airport);
      return acc;
    }, {} as { [key: string]: Airports });
  }

  const handleChangeProps =
    (name: keyof AddFlightProps) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setError((prev) => ({ ...prev, [name]: "" }));
      setNewFlight((prev) => ({ ...prev, [name]: e.target.value }));
    };

  const handleChangeSuggestions =
    (name: keyof SuggestionAirports) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (name == "departure_airport") {
        setError((prev) => ({ ...prev, ori_place: "" }));
      } else {
        setError((prev) => ({ ...prev, des_place: "" }));
      }
      setSuggestionAirports((prev) => ({
        ...prev,
        [name]: airports_group_city[e.target.value] || [],
      }));
    };

  const handleError = () => {
    let isError = false;
    const error = { ...validateError };
    if (newFlight.number === "") {
      error.number = "Please enter flight number";
      isError = true;
    }
    if (newFlight.ori_airport === "") {
      error.ori_airport = "Please enter departure airport";
      error.ori_place = "Please enter departure place";
      isError = true;
    }
    if (newFlight.des_airport === "") {
      error.des_airport = "Please enter destination airport";
      error.des_place = "Please enter destination place";
      isError = true;
    }
    if (newFlight.scheduled_departure === "") {
      error.scheduled_departure = "Please enter departure date";
      isError = true;
    }
    if (newFlight.scheduled_arrival === "") {
      error.scheduled_arrival = "Please enter arrival date";
      isError = true;
    }
    if (newFlight.base_price === 0) {
      error.base_price = "Please enter base price";
      isError = true;
    }
    if (newFlight.nums_busi_seat_avail === 0) {
      error.nums_busi_seat_avail = "Please enter number of business seat";
      isError = true;
    }
    if (newFlight.nums_eco_seat_avail === 0) {
      error.nums_eco_seat_avail = "Please enter number of economy seat";
      isError = true;
    }
    setError(error);
    return isError;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleError()) return;
    setIsLoading(true);
    try {
      if (newFlight.nums_busi_seat_avail > aircraft?.data.nums_seat * 0.25) {
        newFlight.nums_busi_seat_avail = Math.floor(
          aircraft?.data.nums_seat * 0.25
        );
      }
      if (newFlight.nums_eco_seat_avail > aircraft?.data.nums_seat * 0.75) {
        newFlight.nums_eco_seat_avail = Math.ceil(
          aircraft?.data.nums_seat * 0.75
        );
      }
      await addFlight(aircraft_id, newFlight);
      setIsLoading(false);
      navigate("/view-flight", {
        state: {
          aircraftId: aircraft_id,
          airplaneNumber: airplane_number,
        },
      });
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

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
    <>
      {isLoading && <Loading />}
      <div className="flex flex-col gap-[50px]">
        <img
          src="./add_flight_background.png"
          alt="Background"
          className="absolute top-0 left-0 -z-10 h-[1080px] w-full object-cover"
        />

        {/* Form container */}

        <div className="flex flex-col rounded-[24px] shadow-lg max-w-[1000px] scale-[0.85] self-center w-full">
          {/* Flight number */}

          <div className="flex flex-row bg-[#F6FBFF] bg-opacity-[85%] rounded-tl-[24px] rounded-tr-[24px] items-center px-[33px] py-[24px] w-max">
            <div className="flex flex-row items-center justify-center gap-[22px] px-[17px] py-[5px] bg-[#223A60] rounded-[6px] transition-transform duration-200 hover:scale-[1.05]">
              <img src="./airplane_icon_white.png" alt="Airplane icon" />
              <div className="text-[#FFFFFF] text-[16px] font-bold">
                {aircraft?.data.code}
              </div>
            </div>
          </div>

          {/* Form part */}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-[50px] md:gap-[100px] px-[20px] md:px-[50px] py-[50px] w-full bg-[#F6FBFF] bg-opacity-[85%] rounded-bl-[24px] rounded-br-[24px] rounded-tr-[24px]"
          >
            {/* Left part */}

            <div className="flex flex-col gap-[20px] w-full">
              {/* Departure part */}

              <div className="text-[#223a60] text-2xl font-bold font-['DM Sans'] tracking-wider">
                Departure Information
              </div>

              {/* Departure place field */}

              <div className="flex flex-col gap-[10px] w-full">
                <div className="text-black text-lg font-medium font-['DM Sans'] tracking-wide">
                  Departure Place
                </div>
                <div className="flex flex-row w-full bg-[#FFFFFF] rounded-[6px]">
                  <div className="flex flex-row gap-[10px] px-[10px] py-[10px] w-full border-[0.5px] border-[#000000] border-opacity-[50%] rounded-tl-[6px] rounded-bl-[6px]">
                    <img src="./location_icon_black.png" alt="Location icon" />
                    <select
                      name="abc"
                      id="departure-place"
                      className="text-black text-base font-medium font-['DM Sans'] tracking-wide w-full focus:outline-none"
                      onChange={handleChangeSuggestions("departure_airport")}
                    >
                      <option value=""></option>
                      {Object.keys(airports_group_city).map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-row text-[16px] w-[100px] md:w-[136px] font-medium text-center justify-center items-center border-[0.5px] border-[#000000] border-opacity-[50%] rounded-tr-[6px] rounded-br-[6px]">
                    {suggestionAirports.departure_airport[0]?.code}
                  </div>
                </div>
                <span className="text-red-500">{error.ori_place}</span>
              </div>

              {/* Departure Date field */}

              <div className="flex flex-col gap-[10px] w-full">
                <div className="text-black text-lg font-medium font-['DM Sans'] tracking-wide">
                  Departure Date
                </div>
                <div className="flex flex-row w-full bg-[#FFFFFF] rounded-[6px]">
                  <div className="flex flex-row gap-[10px] px-[10px] py-[10px] w-full border-[0.5px] border-[#000000] border-opacity-[50%] rounded-tl-[6px] rounded-bl-[6px]">
                    <img src="./calendar_icon_black.png" alt="Location icon" />
                    <label
                      htmlFor="departure_date"
                      className="text-black text-base font-medium font-['DM Sans'] tracking-wide w-full focus:outline-none"
                    >
                      {departure_date}
                    </label>
                    <input
                      type="datetime-local"
                      min={getMinDate()}
                      id="departure_date"
                      onChange={handleChangeProps("scheduled_departure")}
                      className="text-black text-base font-medium font-['DM Sans'] tracking-wide w-5 focus:outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder={departure_time}
                    className="flex flex-row text-[16px] w-[100px] font-medium text-center justify-center items-center border-[0.5px] border-[#000000] border-opacity-[50%] rounded-tr-[6px] rounded-br-[6px]"
                    maxLength={8}
                  />
                </div>
                <span className="text-red-500">
                  {error.scheduled_departure}
                </span>
              </div>

              {/* Departure Airport field */}

              <div className="flex flex-col gap-[10px] w-full">
                <div className="text-black text-lg font-medium font-['DM Sans'] tracking-wide">
                  Departure Airport
                </div>
                <div className="flex flex-row w-full bg-[#FFFFFF] ">
                  <div className="flex flex-row gap-[10px] px-[10px] py-[10px] w-full border-[0.5px] border-[#000000] border-opacity-[50%] rounded-[6px]">
                    <img src="./airport_icon_black.png" alt="Location icon" />
                    <select
                      name="abc"
                      id="departure-place"
                      onChange={handleChangeProps("ori_airport")}
                      className="text-black text-base font-medium font-['DM Sans'] tracking-wide w-full focus:outline-none"
                    >
                      <option
                        value=""
                        className={newFlight.ori_airport ? "hidden" : ""}
                      ></option>
                      {suggestionAirports.departure_airport.map((airport) => (
                        <option key={airport._id} value={airport._id}>
                          {airport.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <span className="text-red-500">{error.ori_airport}</span>
              </div>

              {/* Destination part */}

              <div className="text-[#223a60] text-2xl font-bold font-['DM Sans'] tracking-wider">
                Destination Information
              </div>

              {/* Destination place field */}

              <div className="flex flex-col gap-[10px] w-full">
                <div className="text-black text-lg font-medium font-['DM Sans'] tracking-wide">
                  Destination Place
                </div>
                <div className="flex flex-row w-full bg-[#FFFFFF] rounded-[6px]">
                  <div className="flex flex-row gap-[10px] px-[10px] py-[10px] w-full border-[0.5px] border-[#000000] border-opacity-[50%] rounded-tl-[6px] rounded-bl-[6px]">
                    <img src="./location_icon_black.png" alt="Location icon" />
                    <select
                      name="abc"
                      id="destination-place"
                      onChange={handleChangeSuggestions("destination_airport")}
                      className="text-black text-base font-medium font-['DM Sans'] tracking-wide w-full focus:outline-none"
                    >
                      <option value=""></option>
                      {Object.keys(airports_group_city).map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-row text-[16px] w-[100px] md:w-[136px] font-medium text-center justify-center items-center border-[0.5px] border-[#000000] border-opacity-[50%] rounded-tr-[6px] rounded-br-[6px]">
                    {suggestionAirports.destination_airport[0]?.code}
                  </div>
                </div>
                <span className="text-red-500">{error.des_place}</span>
              </div>

              {/* Destination Date field */}

              <div className="flex flex-col gap-[10px] w-full">
                <div className="text-black text-lg font-medium font-['DM Sans'] tracking-wide">
                  Destination Date
                </div>
                <div className="flex flex-row w-full bg-[#FFFFFF] rounded-[6px]">
                  <div className="flex flex-row gap-[10px] px-[10px] py-[10px] w-full border-[0.5px] border-[#000000] border-opacity-[50%] rounded-tl-[6px] rounded-bl-[6px]">
                    <img src="./calendar_icon_black.png" alt="Location icon" />
                    <label
                      htmlFor="arrival_date"
                      className="text-black text-base font-medium font-['DM Sans'] tracking-wide w-full focus:outline-none"
                    >
                      {arrival_date}
                    </label>
                    <input
                      type="datetime-local"
                      id="arrival_date"
                      min={getMinDate()}
                      onChange={handleChangeProps("scheduled_arrival")}
                      className="text-black text-base font-medium font-['DM Sans'] tracking-wide w-5 focus:outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder={arrival_time}
                    className="flex flex-row text-[16px] w-[100px] font-medium text-center justify-center items-center border-[0.5px] border-[#000000] border-opacity-[50%] rounded-tr-[6px] rounded-br-[6px]"
                    maxLength={8}
                  />
                </div>
                <span className="text-red-500">{error.scheduled_arrival}</span>
              </div>

              {/* Destination Airport field */}

              <div className="flex flex-col gap-[10px] w-full">
                <div className="text-black text-lg font-medium font-['DM Sans'] tracking-wide">
                  Destination Airport
                </div>
                <div className="flex flex-row w-full bg-[#FFFFFF] rounded-[6px]">
                  <div className="flex flex-row gap-[10px] px-[10px] py-[10px] w-full border-[0.5px] border-[#000000] border-opacity-[50%] rounded-[6px]">
                    <img src="./airport_icon_black.png" alt="Location icon" />
                    <select
                      name="abc"
                      id="destination-place"
                      onChange={handleChangeProps("des_airport")}
                      className="text-black text-base font-medium font-['DM Sans'] tracking-wide w-full focus:outline-none"
                    >
                      <option
                        value=""
                        className={newFlight.des_airport ? "hidden" : ""}
                      ></option>
                      {suggestionAirports.destination_airport.map((airport) => (
                        <option key={airport._id} value={airport._id}>
                          {airport.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <span className="text-red-500">{error.des_airport}</span>
              </div>
            </div>

            {/* Right Part */}

            <div className="flex flex-col gap-[20px] w-full">
              <div className="text-[#223a60] text-2xl font-bold font-['DM Sans'] tracking-wider w-full">
                Tickets and Airplane
              </div>

              {/* Business Ticket Price field */}

              <div className="flex flex-col gap-[10px] w-full">
                <div className="text-black text-lg font-medium font-['DM Sans'] tracking-wide w-full">
                  Business Ticket Price
                </div>
                <div className="flex flex-row w-full bg-[#FFFFFF] rounded-[6px]">
                  <div className="flex flex-row gap-[10px] px-[10px] py-[10px] w-full border-[0.5px] border-[#000000] border-opacity-[50%] rounded-tl-[6px] rounded-bl-[6px]">
                    <img src="./price_icon_black.png" alt="Location icon" />
                    <input
                      type="text"
                      placeholder="450,000"
                      className="text-black text-base font-medium font-['DM Sans'] tracking-wide w-full focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-row text-[16px] w-full max-w-[136px] font-medium text-center justify-center items-center border-[0.5px] border-[#000000] border-opacity-[50%] rounded-tr-[6px] rounded-br-[6px]">
                    VND
                  </div>
                </div>
                <span className="text-red-500">{error.base_price}</span>
              </div>

              {/* Economy Ticket Price field */}

              <div className="flex flex-col gap-[10px] w-full">
                <div className="text-black text-lg font-medium font-['DM Sans'] tracking-wide w-full">
                  Economy Ticket Price
                </div>
                <div className="flex flex-row w-full bg-[#FFFFFF] rounded-[6px]">
                  <div className="flex flex-row gap-[10px] px-[10px] py-[10px] w-full border-[0.5px] border-[#000000] border-opacity-[50%] rounded-tl-[6px] rounded-bl-[6px]">
                    <img src="./calendar_icon_black.png" alt="Location icon" />
                    <input
                      type="number"
                      onChange={handleChangeProps("base_price")}
                      placeholder="300,000"
                      className="text-black text-base font-medium font-['DM Sans'] tracking-wide w-full focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-row text-[16px] w-full max-w-[136px] font-medium text-center justify-center items-center border-[0.5px] border-[#000000] border-opacity-[50%] rounded-tr-[6px] rounded-br-[6px]">
                    VND
                  </div>
                </div>
                <span className="text-red-500">{error.base_price}</span>
              </div>

              {/* Airplane Field */}

              <div className="flex flex-col gap-[10px] w-full">
                <div className="text-black text-lg font-medium font-['DM Sans'] tracking-wide w-full">
                  Flight
                </div>
                <div className="flex flex-row w-full bg-[#FFFFFF] rounded-[6px]">
                  <div className="flex flex-row gap-[10px] px-[10px] py-[10px] w-full border-[0.5px] border-[#000000] border-opacity-[50%] rounded-[6px]">
                    <img src="./airplane_icon_black.png" alt="Location icon" />
                    <input
                      type="text"
                      placeholder="QA01"
                      onChange={handleChangeProps("number")}
                      className="text-black text-base font-medium font-['DM Sans'] tracking-wide w-full focus:outline-none"
                    />
                  </div>
                </div>
                <span className="text-red-500">{error.number}</span>
              </div>

              {/* Number of Ticket Sold */}

              <div className="flex flex-col gap-[10px] w-full">
                <div className="text-black text-lg font-medium font-['DM Sans'] tracking-wide w-full">
                  Number of Tickets Sold
                </div>

                {/* Business */}

                <div className="flex flex-row">
                  <div className="flex flex-row gap-[10px] items-center justify-center w-full">
                    <div className="text-[16px] font-medium">Business:</div>
                    <input
                      type="number"
                      value={
                        newFlight.nums_busi_seat_avail >
                        Math.floor(aircraft?.data.nums_seat * 0.25)
                          ? Math.floor(aircraft?.data.nums_seat * 0.25)
                          : newFlight.nums_busi_seat_avail
                      }
                      min={0}
                      onChange={handleChangeProps("nums_busi_seat_avail")}
                      className="bg-[#FFFFFF] rounded-[6px] w-[65px] border-[#000000] border-[0.5px] border-opacity-[50%] pl-[10px] font-medium"
                    />
                  </div>

                  {/* Economy */}

                  <div className="flex flex-row gap-[10px] items-center justify-center w-full">
                    <div className="text-[16px] font-medium">Economy:</div>
                    <input
                      type="number"
                      value={
                        (newFlight.nums_eco_seat_avail ?? 0) >
                        Math.ceil(aircraft?.data.nums_seat * 0.75)
                          ? Math.ceil(aircraft?.data.nums_seat * 0.75)
                          : newFlight.nums_eco_seat_avail
                      }
                      min={0}
                      onChange={handleChangeProps("nums_eco_seat_avail")}
                      className="bg-[#FFFFFF] rounded-[6px] w-[65px] border-[#000000] border-[0.5px] border-opacity-[50%] pl-[10px] font-medium"
                    />
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#223A60] text-[18px] text-[#FFFFFF] font-bold px-[10px] py-[10px] rounded-[14px] shadow-lg transition-transform duration-200 hover:scale-[1.05] mt-[50px]">
                Add flight
              </button>

              <img
                src="./QAirline_Logo.png"
                alt="Logo"
                className="self-center mt-[60px]"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddFlight;
