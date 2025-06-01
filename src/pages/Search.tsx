import SearchResultCard from "../components/SearchResultCard";
import { useQuery } from "@tanstack/react-query";
import { getFlights } from "../apis/flight.api";
import { useQueryForm } from "../hooks/useQueryForm";
import { Flight } from "../types/flight.type";
import { useState } from "react";
import { useGetAirports } from "../hooks/useGetAirports";
import { useNavigate } from "react-router-dom";
import SearchedFlightInfo from "../components/SearchedFlightInfo";
import SearchBarSimple from "../components/SearchBarSimple";

type SortType = {
  base_price?: "asc" | "desc";
  actual_departure?: "asc" | "desc";
};

const Search = () => {
  const { search_query, isReturn, flight_depart_info } = useQueryForm() || {};
  const result_search = document.getElementById("search_result");
  if (result_search) {
    result_search.scrollIntoView({ behavior: "smooth" });
  }
  const navigate = useNavigate();

  const [sort, setSort] = useState<SortType>({});
  // Change the search query if it is a return flight
  let new_search_query = search_query;
  if (!isReturn) {
    new_search_query = { ...search_query };
    new_search_query.ori_airport = search_query.des_airport;
    new_search_query.des_airport = search_query.ori_airport;
    new_search_query.departure_time = search_query.return_time;
    new_search_query.return_time = "";
  }

  const airports = useGetAirports();

  const departure_airport = airports[search_query?.ori_airport];

  const arrival_airport = airports[search_query?.des_airport];

  const { data: flights_query } = useQuery({
    queryKey: ["flights", search_query],
    queryFn: () => getFlights(search_query),
  });

  const flights_list = flights_query?.data?.map((flight: Flight) => {
    return {
      ...flight,
      ori_airport: departure_airport?.name as string,
      ori_city: departure_airport?.city as string,
      ori_code: departure_airport?.code as string,
      des_code: arrival_airport?.code as string,
      des_city: arrival_airport?.city as string,
      des_airport: arrival_airport?.name as string,
      nums_busi_book: search_query?.nums_busi,
      nums_eco_book: search_query?.nums_eco,
    };
  });
  for (const key in sort) {
    const sortOrder = sort[key as keyof SortType];
    flights_list?.sort((a: Flight, b: Flight) => {
      const A = a[key as keyof Flight];
      const B = b[key as keyof Flight];

      if (typeof A === "number" && typeof B === "number") {
        return sortOrder === "asc" ? A - B : B - A;
      } else if (typeof A === "string" && typeof B === "string") {
        return sortOrder === "asc" ? A.localeCompare(B) : B.localeCompare(A);
      } else if (A instanceof Date && B instanceof Date) {
        return sortOrder === "asc"
          ? A.getTime() - B.getTime()
          : B.getTime() - A.getTime();
      } else {
        console.warn("Unsupported data type for sorting:", A, B);
        return 0;
      }
    });
  }

  const handleSort = (type: keyof SortType) => {
    setSort({ [type]: sort[type] === "asc" ? "desc" : "asc" });
  };

  return (
    <div>
      <img
        src="HCM_city_background.png"
        alt=""
        className="absolute top-0 left-0 h-screen -z-50"
      />
      <div className="bg-[#000000] bg-opacity-[40%] absolute top-0 left-0 h-screen w-full -z-10"></div>

      <SearchedFlightInfo
        actual_departure={search_query?.departure_time}
        ori_airport={departure_airport?.name}
        ori_code={departure_airport?.code}
        ori_city={departure_airport?.city}
        des_airport={arrival_airport?.name}
        des_code={arrival_airport?.code}
        des_city={arrival_airport?.city}
        number={""}
        nums_busi_book={search_query?.nums_busi}
        nums_eco_book={search_query?.nums_eco}
      />

      <SearchBarSimple />

      <div className="animate-bounce mt-[30px] flex justify-center text-white text-[16px] font-bold">
        Scroll down to view all flights
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="white"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>

      {/* End general information */}

      <section
        role="alert"
        aria-label="Important notice about pricing"
        className="flex-1 mt-[350px] shrink gap-2.5 self-stretch px-24 py-7 text-base font-bold tracking-wider leading-6 bg-blue-400 bg-opacity-20 text-slate-800 max-md:px-5 max-md:max-w-full"
      >
        Note: Prices below include taxes, fees
        <br />+{" "}
        <span className="text-sky-500 underline">Special Service Charges</span>
        <br />+{" "}
        <span className="text-sky-500 underline">
          Taxes, Fees, Charges & Surcharges
        </span>
        <br />
        The payment currency is displayed according to the selected
        "Country/Region", please check the currency carefully before paying.
      </section>
      {/* End note */}
      <h1
        id="search_result"
        className="pt-10 text-5xl font-bold text-center text-black tracking-[3.12px] max-md:max-w-full max-md:text-4xl mb-10"
      >
        <span className="leading-[61px]">
          {isReturn ? "Return" : "Departure"} flights from{" "}
        </span>
        <span className="text-sky-500 leading-[61px]">
          {departure_airport?.city}
        </span>
        <span className="leading-[61px]"> to </span>
        <span className="text-sky-500 leading-[61px]">
          {arrival_airport?.city}
        </span>
      </h1>

      <div className="flex overflow-hidden flex-col text-black mt-5">
        <section className="flex flex-wrap gap-4 items-start px-16 py-4 w-full bg-gray-50 rounded-lg max-md:px-4">
          <p className="flex-1 text-sm italic text-gray-600 tracking-wide leading-6 min-w-[320px] max-md:max-w-full">
            ❗Flights are displayed in the default order selected by QAirline.
            <br />
            Please select sort feature to change the display order as needed.
            <br />
            Price displayed is the lowest and can be varied from business class
            economy ticket classes.
          </p>

          {/* Button for Sorting by Time */}
          <button
            className="flex items-center gap-2 px-6 py-3 text-xl font-bold text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 transition-transform transform hover:-translate-y-1 min-w-[233px]"
            onClick={() => handleSort("actual_departure")}
          >
            <img
              loading="lazy"
              src={
                sort.actual_departure === "asc"
                  ? "../../up-arrow.png"
                  : sort.actual_departure === "desc"
                  ? "../../down-arrow.png"
                  : "../../sort.png"
              }
              className="w-6 h-6 object-contain"
              alt="Sort by Time"
            />
            <span>Time</span>
          </button>

          {/* Button for Sorting by Price */}
          <button
            className="flex items-center gap-2 px-6 py-3 text-xl font-bold text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 transition-transform transform hover:-translate-y-1 min-w-[233px]"
            onClick={() => handleSort("base_price")}
          >
            <img
              loading="lazy"
              src={
                sort.base_price === "asc"
                  ? "../../up-arrow.png"
                  : sort.base_price === "desc"
                  ? "../../down-arrow.png"
                  : "../../sort.png"
              }
              className="w-6 h-6 object-contain"
              alt="Sort by Price"
            />
            <span>Price</span>
          </button>
        </section>

        {isReturn ? (
          <div className="flex flex-row gap-[10px] items-center mx-auto mb-[50px] mt-[20px]">
            <img
              src="./airplane_icon_dark_blue.png"
              alt=""
              className="w-[60px] -scale-x-100"
            />
            <div className="text-[32px] font-medium">Choose return flight</div>
          </div>
        ) : (
          <div className="flex flex-row gap-[30px] items-center mx-auto mb-[50px] mt-[20px]">
            <div className="text-[32px] font-medium">
              Choose departure flight
            </div>
            <img
              src="./airplane_icon_dark_blue.png"
              alt=""
              className="w-[60px]"
            />
          </div>
        )}

        <section className="flex px-[30px] mb-[50px] overflow-hidden flex-col w-full relative text-2xl tracking-widest max-md:px-5 max-md:max-w-full">
          {(flights_list ?? []).length > 0 ? (
            flights_list?.map((flight: Flight, index: number) => (
              <div
                key={index}
                className={index > 0 ? "mt-24 max-md:mt-10" : ""}
              >
                <SearchResultCard
                  ori_code={""}
                  ori_city={""}
                  des_code={""}
                  des_city={""}
                  nums_busi_book={0}
                  nums_eco_book={0}
                  {...flight}
                  onClick={() => {
                    if (isReturn) {
                      navigate("/booking", {
                        state: {
                          flight_return_info: flight,
                          flight_depart_info: flight_depart_info,
                          nums_busi_book: search_query.nums_busi,
                          nums_eco_book: search_query.nums_eco,
                        },
                      });
                    } else {
                      if (search_query.return_time !== "") {
                        navigate("/search", {
                          state: {
                            flight_depart_info: flight,
                            search_query: new_search_query,
                            isReturn: 1,
                          },
                        });
                      } else {
                        navigate("/booking", {
                          state: {
                            flight_depart_info: flight,
                            nums_busi_book: search_query.nums_busi,
                            nums_eco_book: search_query.nums_eco,
                          },
                        });
                      }
                    }
                  }}
                />
              </div>
            ))
          ) : (
            <>
              No flights found for your selection. Back to choose another day.
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Search;
