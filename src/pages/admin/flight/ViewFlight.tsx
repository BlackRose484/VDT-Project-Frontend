import React, { useEffect } from "react";
import FlightCard from "@/components/admin/flight/FlightCard";
import { useQueryForm } from "@/hooks/useQueryForm";
import { useQuery } from "@tanstack/react-query";
import {
  deleteAircraft,
  getAirCraftById,
  getAllFlights,
} from "@/apis/admin.api";
import { Flight } from "@/types/flight.type";
import { useGetAirports } from "@/hooks/useGetAirports";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@/components/Pagination";
import Confirm from "@/components/admin/flight/Confirm";
import { toast } from "react-toastify";
import { PATH } from "@/constants/path";
import Loading from "@/components/Loading";

const ViewFlight: React.FC = () => {
  const LIMIT_ITEMS = 5;
  let total_page = 1;
  const { aircraftId, airplaneNumber } = useQueryForm();
  const [isConfirm, setConfirm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [flightOnPage, setFlightOnPage] = React.useState<Flight[]>([]);
  const [page, setPage] = React.useState(1);
  const airports = useGetAirports();

  const { data: flights } = useQuery({
    queryKey: ["flights", aircraftId],
    queryFn: () => getAllFlights({ aircraft_id: aircraftId }),
  });

  const { data: aircraft_infor } = useQuery({
    queryKey: ["aircraft_infor", aircraftId],
    queryFn: () => getAirCraftById(aircraftId),
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (flights) {
      setFlightOnPage(flights?.data.slice(0, LIMIT_ITEMS));
    }
  }, [flights]);

  if (flights) {
    total_page = Math.ceil(flights?.data.length / LIMIT_ITEMS);
  }
  const handleChangePage = (page: number) => {
    setPage(page);
    setFlightOnPage(
      flights?.data.slice((page - 1) * LIMIT_ITEMS, page * LIMIT_ITEMS)
    );
  };

  const handleNextPage = () => {
    if (page < total_page) {
      setPage(page + 1);
      setFlightOnPage(
        flights?.data.slice(page * LIMIT_ITEMS, (page + 1) * LIMIT_ITEMS)
      );
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setFlightOnPage(
        flights?.data.slice((page - 2) * LIMIT_ITEMS, (page - 1) * LIMIT_ITEMS)
      );
    }
  };

  const handleDeleteAircraft = async () => {
    try {
      setIsLoading(true);
      await deleteAircraft(aircraftId);
      toast.success("Aircraft deleted successfully");
      navigate(PATH.admin.manage);
    } catch (error) {
      console.error("Failed to delete aircraft:", error);
      toast.error("Failed to delete aircraft");
    } finally {
      setIsLoading(false);
      setConfirm(false);
    }
  };

  return (
    <div className="flex flex-col bg-[#F6FBFF] m-5 rounded-[20px]">
      <div className="fixed inset-0 -z-10 h-screen">
        {/* <video
          src="./cloud_animation_2.mp4"
          loop
          autoPlay
          muted
          className="w-full h-full object-cover"
        ></video> */}
      </div>
      <img
        src="airplane_background.png"
        className="rounded-[20px]"
        alt="Background"
      />
      <div className="flex md:flex-row flex-col mt-[50px] px-[50px] gap-[20px] items-center">
        <div>
          <h1 className="text-[56px] font-bold">
            List Flights Using{" "}
            <span className="text-[56px] text-[#00A3FF] font-bold">
              {airplaneNumber}
            </span>
          </h1>
        </div>
        {/* Button group: luôn sát phải khi thu hẹp */}
        <div className="flex flex-row gap-[20px] ml-auto w-full md:w-auto justify-end">
          <div
            onClick={() => {
              navigate("/add-flight", {
                state: {
                  aircraft_id: aircraftId,
                  airplane_number: airplaneNumber,
                },
              });
            }}
            className="flex flex-row gap-[10px] justify-center items-center transform transition-transform duration-200 hover:scale-[1.05] bg-[#223A60] bg-opacity-75 text-white p-5 rounded-[20px] hover:bg-opacity-100 cursor-pointer"
          >
            <img src="./add.png" className="w-[25px] h-[25px]" alt="Add icon" />
            <span className="bg-transparent text-white font-semibold text-lg">
              Add Flight
            </span>
          </div>
          <button
            onClick={() => {
              setConfirm(true);
            }}
            className="flex flex-row gap-[10px] justify-center items-center transform transition-transform duration-200 hover:scale-[1.05] bg-red-600 bg-opacity-80 text-white p-5 rounded-[20px] hover:bg-opacity-100 font-semibold text-lg"
          >
            <img
              src="./delete.png"
              className="w-[25px] h-[25px]"
              alt="Delete icon"
            />
            Delete Aircraft
          </button>
        </div>
      </div>

      <hr className="ml-[50px] border-[3px] border-[#283841] opacity-[50%] w-[200px]" />
      <div className="flex flex-col gap-[50px] mt-[100px] mb-[100px]">
        {flightOnPage.map((flight: Flight, index: number) => {
          const depature_airport = airports[flight.ori_airport];
          const destination_airport = airports[flight.des_airport];
          const status =
            new Date(flight.actual_departure).getTime() > new Date().getTime()
              ? "Up Coming"
              : "Completed";
          return (
            <FlightCard
              flightId={flight._id}
              aircraftId={flight.aircraft_id}
              key={index}
              flightNumber={flight.number}
              status={status}
              departureCityCode={depature_airport?.code}
              destinationCityCode={destination_airport?.code}
              departureCityName={depature_airport?.city}
              destinationCityName={destination_airport?.city}
              departureDate={flight.actual_departure}
              returnDate={flight.actual_arrival}
              passengers={
                aircraft_infor?.data.nums_seat -
                (flight.nums_busi_seat_avail + flight.nums_eco_seat_avail)
              }
              totalSeats={aircraft_infor?.data.nums_seat}
            />
          );
        })}
      </div>
      <Pagination
        total_page={total_page}
        current_page={page}
        changePage={handleChangePage}
        nextPage={handleNextPage}
        prevPage={handlePreviousPage}
      />
      {isConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#000000] bg-opacity-70 backdrop-blur-[3px] z-50">
          <div className="bg-white rounded-[20px]">
            <Confirm
              title="Delete Aircraft Confirmation"
              message={`Are you sure you want to delete the aircraft ${airplaneNumber}? This action cannot be undone.`}
              close={() => setConfirm(false)}
              confirm={handleDeleteAircraft}
            />
          </div>
        </div>
      )}
      {isLoading && <Loading />}
    </div>
  );
};

export default ViewFlight;
