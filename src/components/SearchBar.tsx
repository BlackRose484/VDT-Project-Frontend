import { useState } from "react";
import { getAirports } from "../apis/flight.api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Airport } from "../types/flight.type";

interface searchFormType {
  ori_airport: string;
  des_airport: string;
  departure_time: string;
  return_time: string;
  nums_busi: number;
  nums_eco: number;
}

interface SuggestionItemProps {
  name: string;
  city: string;
  code: string;
  onClick: () => void;
}

const intialSearchForm: searchFormType = {
  ori_airport: "",
  des_airport: "",
  return_time: "",
  departure_time: "",
  nums_busi: 0,
  nums_eco: 0,
};

const SuggestionItem: React.FC<SuggestionItemProps> = ({
  name,
  city,
  code,
  onClick,
}) => {
  return (
    <div
      className="flex flex-col p-2 hover:bg-blue-400 hover:text-white cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="text-lg">{city}</div>
        <div className="text-lg font-bold">{code}</div>
      </div>
      <div className="text-sm text-gray-500">{name}</div>
    </div>
  );
};

export const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [searchForm, setSearchForm] =
    useState<searchFormType>(intialSearchForm);

  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [filteredAirports, setFilteredAirports] = useState<Airport[]>([]);
  const [showSuggestions, setShowSuggestions] = useState({
    ori_airport: false,
    des_airport: false,
  });
  const { data: airport_list } = useQuery({
    queryKey: ["airport"],
    queryFn: () => getAirports(),
  });

  const airports: { [key: string]: Airport } = {};
  if (airport_list) {
    for (const airport of airport_list.data) {
      airports[airport._id] = airport;
    }
  }

  const handleChange =
    (name: keyof searchFormType) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setSearchForm((prev) => ({ ...prev, [name]: e.target.value }));
      if (name === "ori_airport" || name === "des_airport") {
        const filtered = airport_list?.data.filter((airport: Airport) =>
          airport.city.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredAirports(filtered || airport_list?.data || []);
        setShowSuggestions((prev) => ({ ...prev, [name]: true }));
      } else {
        setShowSuggestions((prev) => ({ ...prev, [name]: false }));
      }
    };

  const handleSelectSuggestion = (
    name: keyof searchFormType,
    airport: string
  ) => {
    setSearchForm((prev) => ({ ...prev, [name]: airport }));
    setShowSuggestions((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = () => {
    navigate("/search", {
      state: { search_query: searchForm, isReturn: 0 },
    });
  };

  const handleFocus = (name: keyof searchFormType) => {
    if (!searchForm[name]) {
      setFilteredAirports(airport_list?.data || []);
      setShowSuggestions((prev) => ({ ...prev, [name]: true }));
    }
  };

  const handleBlur = (name: keyof searchFormType) => {
    setTimeout(() => {
      setShowSuggestions((prev) => ({ ...prev, [name]: false }));
    }, 200);
  };
  return (
    <div className="container mx-auto scale-[0.9] origin-top-left">
      {/* Selection */}
      <div className="flex flex-col">
        {/* Select Oneway */}
        {isRoundTrip === false && (
          <div className="flex flex-row gap-[10px] items-center justify-center bg-gray-100 bg-opacity-[80%] px-[20px] py-[20px] rounded-tl-[20px] rounded-tr-[20px] self-start">
            <button
              className="flex flex-row bg-[#223A60] px-[20px] py-[5px] rounded-[6px] gap-[10px] items-center justify-center transition-transform duration-200 ease-in-out hover:scale-[1.05]"
              onClick={() => setIsRoundTrip(!isRoundTrip)}
            >
              <img src="./oneway_icon.png" alt="" className="scale-[0.8]" />
              <div className="text-[#FFFFFF] text-[14px] font-bold">
                One-way
              </div>
            </button>
            <div className="text-[24px] opacity-[60%]">|</div>
            <button
              className="flex flex-row bg-[#8B8B8B] px-[20px] py-[5px] rounded-[6px] gap-[10px] items-center justify-center transition-transform duration-200 ease-in-out hover:scale-[1.05]"
              onClick={() => setIsRoundTrip(!isRoundTrip)}
            >
              <img
                src="./rounded_trip_icon.png"
                alt=""
                className="scale-[0.8]"
              />
              <div className="text-[#FFFFFF] text-[14px] font-bold">
                Round-trip
              </div>
            </button>
          </div>
        )}

        {/* Select rounded trip */}
        {isRoundTrip === true && (
          <div className="flex flex-row gap-[10px] items-center justify-center bg-gray-100 bg-opacity-[80%] px-[20px] py-[20px] rounded-tl-[20px] rounded-tr-[20px] self-start">
            <button
              className="flex flex-row bg-[#8B8B8B] px-[20px] py-[5px] rounded-[6px] gap-[10px] items-center justify-center transition-transform duration-200 ease-in-out hover:scale-[1.05]"
              onClick={() => setIsRoundTrip(!isRoundTrip)}
            >
              <img src="./oneway_icon.png" alt="" className="scale-[0.8]" />
              <div className="text-[#FFFFFF] text-[14px] font-bold">
                One-way
              </div>
            </button>
            <div className="text-[24px] opacity-[60%]">|</div>
            <button
              className="flex flex-row bg-[#223A60] px-[20px] py-[5px] rounded-[6px] gap-[10px] items-center justify-center transition-transform duration-200 ease-in-out hover:scale-[1.05]"
              onClick={() => setIsRoundTrip(!isRoundTrip)}
            >
              <img
                src="./rounded_trip_icon.png"
                alt=""
                className="scale-[0.8]"
              />
              <div className="text-[#FFFFFF] text-[14px] font-bold">
                Round-trip
              </div>
            </button>
          </div>
        )}

        {/* Form Section */}
        <section className="w-full p-6 sm:p-8 bg-gray-100 bg-opacity-[80%] border-b-[10px] border-[#223A60] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] shadow-lg">
          <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-[50px]">
              <div className="flex flex-col gap-[15px] w-full">
                {/* Departure Point */}
                <div>
                  <div className="flex flex-row gap-[10px] px-[5px] py-[5px] items-center">
                    <img
                      src="./airplane_icon_dark_blue.png"
                      alt=""
                      className="scale-[0.7]"
                    />
                    <label className="text-[16px] text-[#223A60] font-bold">
                      Departure Point
                    </label>
                  </div>
                  <input
                    type="text"
                    value={airports[searchForm.ori_airport]?.city}
                    onChange={handleChange("ori_airport")}
                    onFocus={() => handleFocus("ori_airport")}
                    onBlur={() => handleBlur("ori_airport")}
                    placeholder="Enter departure point..."
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  {showSuggestions.ori_airport && (
                    <div
                      className="absolute z-10 bg-white border rounded-md shadow-lg w-60 max-h-40 overflow-y-auto"
                      style={{
                        maxHeight:
                          filteredAirports.length > 1 ? "250px" : "auto",
                      }}
                    >
                      {filteredAirports.map((airport) => (
                        <SuggestionItem
                          key={airport._id}
                          name={airport.name}
                          city={airport.city}
                          code={airport.code}
                          onClick={() =>
                            handleSelectSuggestion("ori_airport", airport._id)
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Departure Date */}
                <div>
                  <div className="flex flex-row gap-[10px] px-[5px] py-[5px] items-center">
                    <img
                      src="./calendar_icon_dark_blue.png"
                      alt=""
                      className="scale-[0.9]"
                    />
                    <label className="text-[16px] font-bold text-[#223A60]">
                      Departure Date
                    </label>
                  </div>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={searchForm.departure_time}
                    onChange={handleChange("departure_time")}
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[15px] w-full">
                {/* Destination Point */}
                <div>
                  <div className="flex flex-row gap-[10px] px-[5px] py-[5px] items-center">
                    <img
                      src="./airplane_icon_dark_blue.png"
                      alt=""
                      className="scale-x-[-0.7] scale-y-[0.7]"
                    />
                    <label className="text-[16px] font-bold text-[#223A60]">
                      Destination Point
                    </label>
                  </div>
                  <input
                    type="text"
                    value={airports[searchForm.des_airport]?.city}
                    onChange={handleChange("des_airport")}
                    onFocus={() => handleFocus("des_airport")}
                    onBlur={() => handleBlur("des_airport")}
                    placeholder="Enter destination point..."
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  {showSuggestions.des_airport && (
                    <div
                      className="absolute z-10 bg-white border rounded-md shadow-lg w-60 max-h-40 overflow-y-auto"
                      style={{
                        maxHeight:
                          filteredAirports.length > 1 ? "250px" : "auto",
                      }}
                    >
                      {filteredAirports.map((airport) => (
                        <SuggestionItem
                          key={airport._id}
                          name={airport.name}
                          city={airport.city}
                          code={airport.code}
                          onClick={() =>
                            handleSelectSuggestion("des_airport", airport._id)
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Return Date */}
                {isRoundTrip && (
                  <div>
                    <div className="flex flex-row gap-[10px] px-[5px] py-[5px] items-center">
                      <img
                        src="./calendar_icon_dark_blue.png"
                        alt=""
                        className="scale-[0.9]"
                      />
                      <label className="text-[16px] font-bold text-[#223A60]">
                        Return date
                      </label>
                    </div>
                    <input
                      type="date"
                      value={searchForm.return_time}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={handleChange("return_time")}
                      className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Business Class Tickets */}
            <div className="md:col-span-2">
              <div className="flex flex-row gap-[10px] px-[5px] py-[5px] items-center">
                <img
                  src="./ticket_icon_dark_blue.png"
                  alt=""
                  className="scale-[0.9]"
                />
                <label className="text-[16px] font-bold text-[#223A60]">
                  Business Tickets
                </label>
              </div>
              <input
                type="number"
                value={searchForm.nums_busi}
                onChange={handleChange("nums_busi")}
                min={0}
                placeholder="Choose Number Of Tickets"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Economy Class Tickets */}
            <div className="md:col-span-2">
              <div className="flex flex-row gap-[10px] px-[5px] py-[5px] items-center">
                <img
                  src="./ticket_icon_dark_blue.png"
                  alt=""
                  className="scale-[0.9]"
                />
                <label className="text-[16px] font-bold text-[#223A60]">
                  Economy Tickets
                </label>
              </div>
              <input
                type="number"
                value={searchForm.nums_eco}
                onChange={handleChange("nums_eco")}
                min={0}
                placeholder="Choose Number Of Tickets"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center">
              <button
                type="submit"
                className="bg-[#223A60] rounded-[14px] px-[50px] py-[10px] text-[#FFFFFF] font-bold text-[16px] transition-transform duration-200 ease-in-out hover:scale-[1.05]"
              >
                Search
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SearchBar;
