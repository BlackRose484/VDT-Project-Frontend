import React, { useState } from "react";
import Ticket from "@/components/customer/booking/Ticket";
import SearchedFlightInfo from "@/components/utils/search/SearchedFlightInfo";
import FinalConfirmCancel from "./FinalConfirmCancel";
import { useQueryForm } from "@/hooks/useQueryForm";
import { useQuery } from "@tanstack/react-query";
import { cancelBooking, getTickets } from "@/apis/user.api";
import { formatCurrency } from "@/utils/utils";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import Loading from "@/components/Loading";

const ConfirmCancelBooking: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const data = useQueryForm();
  const navigate = useNavigate();
  const busi_tickets = parseInt(data.nums_busi_book);
  const eco_tickets = parseInt(data.nums_eco_book);

  const { data: tickets } = useQuery({
    queryKey: ["tickets", data.booking_id],
    queryFn: () => getTickets({ booking_id: data.booking_id }),
  });

  const handleCancel = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await cancelBooking(data.booking_id);
      setLoading(false);
      navigate(PATH.user.mybooking);
    } catch (error) {
      console.error(error);
    }
  };

  const eco_tickets_list = [];
  const busi_tickets_list = [];

  if (tickets?.data) {
    for (let i = 0; i < busi_tickets; i++) {
      busi_tickets_list.push(tickets.data[i]);
    }

    for (let i = busi_tickets; i < busi_tickets + eco_tickets; i++) {
      eco_tickets_list.push(tickets.data[i]);
    }
  }

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex flex-col gap-[83px] py-[43px] bg-[#F6FBFF]">
        <div className="sticky top-0">
          <SearchedFlightInfo
            actual_departure={data.actual_departure}
            ori_airport={data.ori_airport}
            ori_code={data.ori_code}
            ori_city={data.ori_city}
            des_airport={data.des_airport}
            des_code={data.des_code}
            des_city={data.des_city}
            number={data.number}
            base_price={data.base_price}
            nums_busi_book={data.nums_busi_book}
            nums_eco_book={data.nums_eco_book}
          />
        </div>
        <div className="flex flex-col gap-[70px] px-[50px]">
          {busi_tickets > 0 ? (
            <div className="px-10">
              <h2 className="text-bold text-3xl">Business Tickets</h2>
            </div>
          ) : null}
          {busi_tickets_list.map((ticket, id) => (
            <Ticket key={id} data={ticket} index={id + 1} />
          ))}
          {eco_tickets > 0 ? (
            <div className="px-10">
              <h2 className="text-bold text-3xl">Economy Tickets</h2>
            </div>
          ) : null}
          {eco_tickets_list.map((ticket, id) => (
            <Ticket key={id} data={ticket} index={id + 1} />
          ))}
        </div>
        <div className="flex flex-col gap-[33px] px-[94px] py-[56px] items-end">
          <div className="text-[40px]">Total Price</div>
          <div className="font-bold text-[#FF0000] text-[48px]">
            {formatCurrency(data.total_price)}
          </div>
          <div className="text-[24px]">
            Total price for all passengers (including taxes, fees and
            discounts).
          </div>
          <button
            className="text-[#FF0000] font-semibold text-[32px] rounded-[8px] px-[32px] py-[12px] border-[2px] border-solid border-[#FF0000] bg-white transition-transform duration-200 ease-in-out hover:scale-[1.05] hover:bg-[#FF0000] hover:text-white"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-[#000000] bg-opacity-70 backdrop-blur-[3px]">
            <div className="bg-white rounded-[20px]">
              <FinalConfirmCancel close={handleClose} confirm={handleConfirm} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ConfirmCancelBooking;
