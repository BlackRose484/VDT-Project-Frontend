import { useParams } from "react-router-dom";
import { getFullTickets } from "../apis/admin.api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useQueryForm } from "../hooks/useQueryForm";
import SearchedFlightInfo from "../components/SearchedFlightInfo";
import Ticket from "../components/Ticket";

const ViewFullTicket: React.FC = () => {
  const param = useParams();
  const data = useQueryForm();

  const { data: tickets_raw } = useQuery({
    queryKey: ["fullTickets", param.flight_id],
    queryFn: () => getFullTickets({ flight_id: param.flight_id as string }),
  });

  const eco_tickets_list = [];
  const busi_tickets_list = [];
  let nums_busi_ = 0;
  let nums_eco_ = 0;
  if (tickets_raw?.data) {
    const { nums_busi, nums_eco, tickets } = tickets_raw.data;
    nums_busi_ = parseInt(nums_busi);
    nums_eco_ = parseInt(nums_eco);
    for (let i = 0; i < nums_busi; i++) {
      busi_tickets_list.push(tickets[i]);
    }

    for (let i = nums_busi; i < nums_busi + nums_eco; i++) {
      eco_tickets_list.push(tickets[i]);
    }
  }

  console.log("eco_tickets_list", eco_tickets_list);
  console.log("busi_tickets_list", busi_tickets_list);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-[83px] py-[43px] bg-[#F6FBFF]">
        <div className="sticky top-0">
          <SearchedFlightInfo
            actual_departure={data.departureDate}
            ori_airport={data.departureAirport}
            ori_code={data.departureCityCode}
            ori_city={data.departureCityName}
            des_airport={data.destinationAirport}
            des_code={data.destinationCityCode}
            des_city={data.destinationCityName}
            number={data.number}
            base_price={data.base_price}
            nums_busi_book={data.nums_busi_book}
            nums_eco_book={data.nums_eco_book}
          />
        </div>
        <div className="flex flex-col gap-[70px] px-[50px]">
          {nums_busi_ > 0 ? (
            <div className="px-10">
              <h2 className="text-bold text-3xl">
                Business Tickets - {nums_busi_} tickets
              </h2>
            </div>
          ) : null}
          {busi_tickets_list.map((ticket, id) => (
            <Ticket key={id} data={ticket} index={id + 1} />
          ))}
          {nums_eco_ > 0 ? (
            <div className="px-10">
              <h2 className="text-bold text-3xl">
                Economy Tickets - {nums_eco_} tickets
              </h2>
            </div>
          ) : null}
          {eco_tickets_list.map((ticket, id) => (
            <Ticket key={id} data={ticket} index={id + 1} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewFullTicket;
