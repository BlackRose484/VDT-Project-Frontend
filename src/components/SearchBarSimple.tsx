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

const intialSearchForm: searchFormType = {
  ori_airport: "",
  des_airport: "",
  return_time: "",
  departure_time: "",
  nums_busi: 0,
  nums_eco: 0,
};

export const SearchBarSimple: React.FC = () => {
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
    }, 100);
  };

  return (
    <div className="container mx-auto scale-[0.8] w-full md:w-max px-4">
      {/* Selection */}
      <div className="flex flex-col md:flex-row">
        {/* Form Section */}
        <section className="w-full pb-[10px] bg-gray-200 rounded-bl-[70px] rounded-br-[70px] shadow-lg border-b-[10px] border-[#223A60]">
          <div className="flex flex-col md:flex-row bg-gradient-to-r from-[#223A60] to-blue-700 px-[20px] items-center py-[10px]">
            <div className="text-[16px] font-medium italic text-white flex items-center">
              Explore everywhere you want with QAirline!
            </div>

            <div className="flex flex-row gap-[15px] text-[16px] font-bold text-white justify-center ml-auto items-center mt-2 md:mt-0">
              <div>
                <input
                  type="radio"
                  name="way"
                  checked={!isRoundTrip}
                  onChange={() => setIsRoundTrip(!isRoundTrip)}
                />{" "}
                One-Way
              </div>
              <div>
                <input
                  type="radio"
                  name="way"
                  checked={isRoundTrip}
                  onChange={() => setIsRoundTrip(!isRoundTrip)}
                />{" "}
                Round-Trip
              </div>
            </div>
          </div>

          <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-[10px] items-center px-[30px]">
              {/* Departure Point */}
              <div className="w-full">
                <div className="flex flex-row gap-[10px] px-[5px] py-[5px] items-center">
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
                      maxHeight: filteredAirports.length > 1 ? "250px" : "auto",
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
              <div className="w-full">
                <div className="flex flex-row gap-[10px] px-[5px] py-[5px] items-center">
                  <label className="text-[16px] font-bold text-[#223A60]">
                    Departure Date
                  </label>
                </div>
                <input
                  type="date"
                  value={searchForm.departure_time}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={handleChange("departure_time")}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 h-[50px]"
                  required
                />
              </div>

              {/* Destination Point */}
              <div className="w-full">
                <div className="flex flex-row gap-[10px] px-[5px] py-[5px] items-center">
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
                      maxHeight: filteredAirports.length > 1 ? "250px" : "auto",
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
                <div className="w-full">
                  <div className="flex flex-row gap-[10px] px-[5px] py-[5px] items-center">
                    <label className="text-[16px] font-bold text-[#223A60]">
                      Return date
                    </label>
                  </div>
                  <input
                    type="date"
                    value={searchForm.return_time}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={handleChange("return_time")}
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 h-[50px]"
                    required
                  />
                </div>
              )}

              {/* Economy Class Tickets */}
              <div className="md:col-span-2 w-full">
                <label className="block text-[16px] font-bold mb-2 text-[#223A60]">
                  Economy Tickets
                </label>
                <input
                  type="number"
                  value={searchForm.nums_eco}
                  onChange={handleChange("nums_eco")}
                  min={0}
                  placeholder="Choose Number Of Tickets"
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 h-[50px]"
                />
              </div>

              {/* Business Class Tickets */}
              <div className="md:col-span-2 w-full">
                <label className="block text-[16px] font-bold mb-2 text-[#223A60]">
                  Business Tickets
                </label>
                <input
                  type="number"
                  value={searchForm.nums_busi}
                  onChange={handleChange("nums_busi")}
                  min={0}
                  placeholder="Choose Number Of Tickets"
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 h-[50px]"
                />
              </div>
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

export default SearchBarSimple;
