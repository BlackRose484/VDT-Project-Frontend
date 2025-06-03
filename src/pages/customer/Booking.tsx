import Ticket from "@/components/customer/booking/Ticket";
import { useQueryForm } from "@/hooks/useQueryForm";
import { Tickets } from "@/types/flight.type";
import { useEffect, useState } from "react";
import SearchedFlightInfo from "@/components/utils/search/SearchedFlightInfo";
import { makeBooking } from "@/apis/flight.api";
import ConfirmBooking from "./ConfirmBooking";
import { PATH } from "@/constants/path";
import { formatCurrency } from "@/utils/utils";
import Loading from "@/components/Loading";
import Successful from "@/components/Successful";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const {
    flight_depart_info,
    flight_return_info,
    nums_busi_book,
    nums_eco_book,
  } = useQueryForm();
  const [confirm, setConfirm] = useState(false);
  const busi_tickets = parseInt(nums_busi_book);
  const eco_tickets = parseInt(nums_eco_book);
  const [discount, setDiscount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{
    [key: number]: { [key: string]: string };
  }>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [booking, setBooking] = useState<Tickets>(
    Array.from({ length: busi_tickets + eco_tickets }, (_, index) => ({
      dob: null,
      name: "",
      nationality: "",
      email: "",
      phone: "",
      passport: "",
      price:
        index < busi_tickets
          ? flight_depart_info.base_price * 1.5
          : flight_depart_info.base_price,
    }))
  );

  const [returnBooking, setReturnBooking] = useState<Tickets>(
    Array.from({ length: busi_tickets + eco_tickets }, (_, index) => ({
      dob: null,
      name: "",
      nationality: "",
      email: "",
      phone: "",
      passport: "",
      price:
        index < busi_tickets
          ? flight_return_info?.base_price * 1.5
          : flight_return_info?.base_price,
    }))
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setBooking((prev) =>
      prev.map((ticket, i) =>
        i === index ? { ...ticket, [name]: value } : ticket
      )
    );
    setReturnBooking((prev) =>
      prev.map((ticket, i) =>
        i === index ? { ...ticket, [name]: value } : ticket
      )
    );
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (newErrors[index]) {
        delete newErrors[index][name];
      }
      return newErrors;
    });
  };

  const handleClear = (index: number) => {
    setBooking((prev) => {
      const newBooking = [...prev];
      newBooking[index] = {
        dob: null,
        name: "",
        nationality: "",
        email: "",
        phone: "",
        passport: "",
        price:
          index < busi_tickets
            ? flight_depart_info.base_price * 1.5
            : flight_depart_info.base_price,
      };
      return newBooking;
    });

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (newErrors[index]) {
        delete newErrors[index];
      }
      return newErrors;
    });
  };

  const handleError = () => {
    let hasError = false;
    const newErrors: { [key: number]: { [key: string]: string } } = {};

    // Depart Booking
    booking.forEach((ticket, index) => {
      const ticketErrors: { [key: string]: string } = {};
      if (!ticket.dob) ticketErrors.dob = "Date of Birth is required";
      if (!ticket.name) ticketErrors.name = "Name is required";
      if (!ticket.nationality)
        ticketErrors.nationality = "Nationality is required";
      if (!ticket.phone) ticketErrors.phone = "Phone number is required";
      if (!ticket.passport)
        ticketErrors.passport = "Passport number is required";

      if (Object.keys(ticketErrors).length > 0) {
        newErrors[index] = ticketErrors;
        hasError = true;
      }
    });

    const fieldsToCheck = ["passport"];

    for (let i = 0; i < booking.length; i++) {
      for (let j = i + 1; j < booking.length; j++) {
        fieldsToCheck.forEach((field) => {
          if (
            booking[i][field as keyof Tickets[number]] &&
            booking[i][field as keyof Tickets[number]] ===
              booking[j][field as keyof Tickets[number]]
          ) {
            if (!newErrors[i]) newErrors[i] = {};
            if (!newErrors[j]) newErrors[j] = {};

            newErrors[i][field] = `${
              field.charAt(0).toUpperCase() + field.slice(1)
            } matches with ticket ${
              j + 1 > busi_tickets ? j + 1 - busi_tickets : j + 1
            } - ${j + 1 > busi_tickets ? "Economy" : "Business"} ticket`;
            newErrors[j][field] = `${
              field.charAt(0).toUpperCase() + field.slice(1)
            } matches with ticket ${
              i + 1 > busi_tickets ? i + 1 - busi_tickets : i + 1
            } - ${i + 1 > busi_tickets ? "Economy" : "Business"} ticket`;
            hasError = true;
          }
        });
      }
    }
    setErrors(newErrors);
    return hasError;
  };

  const handleClose = () => {
    setConfirm(false);
  };

  const hanldeConfirm = async () => {
    const departDataForm = {
      flight_id: flight_depart_info?._id,
      busi_tickets,
      eco_tickets,
      tickets: booking,
      discount_code: discount,
    };
    const returnDataForm = {
      flight_id: flight_return_info?._id,
      busi_tickets,
      eco_tickets,
      tickets: returnBooking,
      discount_code: discount,
    };
    setIsLoading(true);
    try {
      await makeBooking(departDataForm);
      if (flight_return_info) await makeBooking(returnDataForm);
      setIsLoading(false);
      setConfirm(false);
      setIsSuccessful(true);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      window.alert(
        "An error occurred while making the booking. Please try again later."
      );
      navigate(PATH.user.mybooking);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasError = handleError();
    if (hasError) return;
    setConfirm(true);
  };

  return (
    <div>
      {/* Render departure flights */}

      <div className="flex flex-row gap-[30px] items-center ml-[30px] mb-[10px] mt-[20px] bg-gradient-to-r from-blue-400 to-blue-10 w-max pr-[100px] transition-transform duration-500 ease-out transform hover:translate-x-10">
        <div className="text-[32px] font-medium">Departure flight</div>
        <img
          src="./airplane_icon_dark_blue.png"
          alt=""
          className="scale-[1.2]"
        />
      </div>
      <SearchedFlightInfo
        {...flight_depart_info}
        nums_eco_book={eco_tickets}
        nums_busi_book={busi_tickets}
      />

      {/* Render return flights */}

      {flight_return_info ? (
        <div className="flex flex-row gap-[30px] items-center mr-[30px] justify-end mx-auto mb-[50px] mt-[20px] bg-gradient-to-l from-blue-400 to-blue-10 w-max pl-[100px] transition-transform duration-500 ease-out transform hover:-translate-x-10">
          <img
            src="./airplane_icon_dark_blue.png"
            alt=""
            className="scale-[1.2] -scale-x-100"
          />
          <div className="text-[32px] font-medium">Return flight</div>
        </div>
      ) : null}
      {flight_return_info ? (
        <SearchedFlightInfo
          {...flight_return_info}
          nums_eco_book={eco_tickets}
          nums_busi_book={busi_tickets}
        />
      ) : null}

      {/* Reminder */}

      <div className="italic mx-[100px] my-10">
        <p className="text-sm">
          Please fill in these fields neccessary information for us. We commits
          in protecting your information and only use for the flight.
        </p>
      </div>

      {/* Render all bookings */}

      <form onSubmit={handleSubmit}>
        {/* Render business tickets */}

        {busi_tickets > 0 ? (
          <div className="px-10">
            <h2 className="font-bold text-3xl ml-[85px]">Business Tickets</h2>
            {Array.from({ length: busi_tickets }, (_, index) => (
              <div key={index} className="my-5">
                <Ticket
                  data={booking[index]}
                  index={index + 1}
                  id={index}
                  change={handleChange}
                  clear={handleClear}
                  errors={errors[index]}
                />
              </div>
            ))}
          </div>
        ) : null}

        {/* Render economy tickets */}

        {eco_tickets > 0 ? (
          <div className="px-10 mt-[100px]">
            <h2 className="font-bold text-3xl ml-[85px]">Economy Tickets</h2>
            {Array.from({ length: eco_tickets }, (_, index) => (
              <div key={index} className="my-5">
                <Ticket
                  data={booking[index + busi_tickets]}
                  index={index + 1}
                  id={index + busi_tickets}
                  change={handleChange}
                  clear={handleClear}
                  errors={errors[index + busi_tickets]}
                />
              </div>
            ))}
          </div>
        ) : null}

        {/* Total price part */}

        <section className="flex overflow-hidden flex-col justify-center px-24 py-14 text-right text-black max-md:px-5">
          <div className="w-1/6 self-end mb-5 flex flex-col">
            <label className="text-bold mb-3">Discount Code</label>
            <input
              placeholder="Enter your discount code"
              name="discount"
              type="text"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 p-2.5"
            />
          </div>

          <h2 className="text-2xl tracking-[2.4px] max-md:max-w-full">
            Total price:
          </h2>
          <p className="mt-8 text-5xl font-bold tracking-[2.88px] max-md:max-w-full max-md:text-4xl">
            {formatCurrency(
              (flight_depart_info.base_price +
                (flight_return_info ? flight_return_info.base_price : 0)) *
                (busi_tickets * 1.5 + eco_tickets)
            )}
          </p>
          <p className="mt-8 text-xl tracking-widest max-md:max-w-full">
            Total price for all passengers (including taxes, fees and
            discounts).
          </p>
          <button className="gap-2.5 self-end px-8 py-6 mt-8 text-3xl font-bold tracking-widest text-center text-white whitespace-nowrap rounded-lg bg-slate-700 max-w-[300px] min-h-[93px] w-[300px] max-md:px-5">
            Next
          </button>
        </section>
      </form>

      {/* Display confirm booking alert */}

      {confirm && (
        <div
          className={`fixed inset-0 bg-[#000000] z-50 flex items-center justify-center transition-transform duration-500 ease-out transform bg-opacity-70 backdrop-blur-sm`}
        >
          <ConfirmBooking
            flight_depart_info={flight_depart_info}
            flight_return_info={flight_return_info}
            numberOfTickets={[busi_tickets, eco_tickets]}
            onClose={handleClose}
            onConfirm={hanldeConfirm}
          />
        </div>
      )}

      {/* Display */}
      {isLoading && <Loading />}
      {isSuccessful && (
        <Successful message="Suceessful" to_path={PATH.user.mybooking} />
      )}
    </div>
  );
};

export default Booking;
