import React, { useState } from "react";
import { Aircraft } from "../types/flight.type";
import { addAirplane } from "../apis/admin.api";
import Loading from "../components/Loading";
import Successful from "../components/Successful";
import { PATH } from "../constants/path";

type AirPlaneProps = Omit<
  Aircraft,
  "_id" | "user_id" | "total_revenue" | "last_updated"
>;

const initalValue: AirPlaneProps = {
  name: "",
  code: "",
  model: "",
  nums_seat: 0,
  manufacturer: "",
  manufactured_year: 0,
};

interface errorProps {
  name: string;
  code: string;
  model: string;
  nums_seat: string;
  manufacturer: string;
  manufactured_year: string;
}

const validateError: errorProps = {
  name: "",
  code: "",
  model: "",
  nums_seat: "",
  manufacturer: "",
  manufactured_year: "",
};

/**
 * Page for adding a new airplane.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @typedef {Object} AirPlaneProps
 * @property {string} name - The name of the airplane.
 * @property {string} code - The code of the airplane.
 * @property {string} model - The model of the airplane.
 * @property {number} nums_seat - The number of seats in the airplane.
 * @property {string} manufacturer - The manufacturer of the airplane.
 * @property {number} manufactured_year - The year the airplane was manufactured.
 *
 * @function handleChange
 * @description Handles input changes for the airplane form fields.
 * @param {keyof AirPlaneProps} name - The name of the field being changed.
 * @returns {function} A function that takes an event and updates the airplane state.
 *
 * @function validate
 * @description Validates the airplane form fields.
 * @returns {boolean} True if there are validation errors, otherwise false.
 *
 * @function handleSubmit
 * @description Handles the form submission for adding a new airplane.
 * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
 * @returns {Promise<void>} A promise that resolves when the form submission is complete.
 */

const AddAirplane: React.FC = () => {
  const [airplane, setAirplane] = useState<AirPlaneProps>(initalValue);
  const [error, setError] = useState<errorProps>(validateError);
  const [isLoading, setLoading] = useState(false);
  const [isSuccessful, setSuccessful] = useState(false);

  const handleChange =
    (name: keyof AirPlaneProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setAirplane({ ...airplane, [name]: e.target.value });
    };

  const validate = () => {
    let isError = false;
    const errorState = { ...validateError };
    if (airplane.name.length === 0) {
      isError = true;
      errorState.name = "Name is required";
    }
    if (airplane.code.length === 0) {
      isError = true;
      errorState.code = "Code is required";
    }
    if (airplane.model.length === 0) {
      isError = true;
      errorState.model = "Model is required";
    }
    if (airplane.nums_seat === 0) {
      isError = true;
      errorState.nums_seat = "Number of seats is required";
    }
    if (airplane.manufacturer.length === 0) {
      isError = true;
      errorState.manufacturer = "Manufacturer is required";
    }
    if (airplane.manufactured_year === 0) {
      isError = true;
      errorState.manufactured_year = "Manufactured year is required";
    }
    setError(errorState);
    return isError;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isError = validate();
    if (isError) return;
    setLoading(true);
    try {
      await addAirplane(airplane);
      setLoading(false);
      setSuccessful(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setLoading(false);
      const errorData = { ...validateError };
      errorData.code = "Code is existed";
      setError(errorData);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      {isSuccessful && (
        <Successful
          message={"Add Airplane Successful !!!"}
          to_path={PATH.admin.manage}
        />
      )}
      <div className="flex flex-col items-center">
        {/* Background */}
        <img
          src="./add_flight_background.png"
          alt="Background"
          className="absolute top-0 left-0 -z-10 h-[1080px] w-full object-cover"
        />
        {/* Form */}
        <div className="flex flex-col rounded-[24px] shadow-lg max-w-[850px] scale-[0.85] self-center w-full">
          <div className="flex flex-row bg-[#F6FBFF] bg-opacity-[85%] rounded-tl-[24px] rounded-tr-[24px] items-center px-[30px] py-[20px] w-max">
            <div className="flex flex-row items-center justify-center gap-[22px] px-[17px] py-[5px] bg-[#223A60] rounded-[6px] transition-transform duration-200 hover:scale-[1.05]">
              <img src="./airplane_icon_white.png" alt="Airplane icon" />
              <div className="text-[#FFFFFF] text-[14px] font-bold">
                {airplane.code}
              </div>
            </div>
          </div>

          {/* Body Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col bg-opacity-[85%] bg-[#F6FBFF] px-[33px] py-[24px] gap-[24px] rounded-tr-[24px] rounded-bl-[24px] rounded-br-[24px]"
          >
            <div className="flex flex-col md:flex-row w-full md:gap-[50px] gap-[20px]">
              {/* Left Part */}

              <div className="flex flex-col gap-[20px] w-full">
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="text-[#223A60] text-[16px] font-bold mb-1"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    onChange={handleChange("name")}
                    placeholder="Airplane Name. Ex: Boeing 747"
                    className="border-[1px] border-[#223A60] rounded-[6px] p-[10px]"
                  />
                  {error.name && (
                    <span className="text-red-500">{error.name}</span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="code"
                    className="text-[#223A60] text-[16px] font-bold mb-1"
                  >
                    Code
                  </label>
                  <input
                    type="text"
                    id="code"
                    onChange={handleChange("code")}
                    placeholder="Airplane Code. Ex: QR-001"
                    className="border-[1px] border-[#223A60] rounded-[6px] p-[10px]"
                  />
                  {error.code && (
                    <span className="text-red-500">{error.code}</span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="model"
                    className="text-[#223A60] text-[16px] font-bold mb-1"
                  >
                    Model
                  </label>
                  <input
                    type="text"
                    id="model"
                    placeholder="Airplane Model. Ex: 747-400"
                    onChange={handleChange("model")}
                    className="border-[1px] border-[#223A60] rounded-[6px] p-[10px]"
                  />
                  {error.model && (
                    <span className="text-red-500">{error.model}</span>
                  )}
                </div>
              </div>

              {/* Right Part */}

              <div className="flex flex-col gap-[20px] w-full">
                <div className="flex flex-col">
                  <label
                    htmlFor="nums_seat"
                    className="text-[#223A60] text-[16px] font-bold mb-1"
                  >
                    Number of Seats
                  </label>
                  <input
                    type="number"
                    id="nums_seat"
                    onChange={handleChange("nums_seat")}
                    placeholder="Airplane Seats. Ex: 50"
                    className="border-[1px] border-[#223A60] rounded-[6px] p-[10px]"
                  />
                  {error.nums_seat && (
                    <span className="text-red-500">{error.nums_seat}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="manufacturer"
                    className="text-[#223A60] text-[16px] font-bold mb-1"
                  >
                    Manufacturer
                  </label>
                  <input
                    type="text"
                    id="manufacturer"
                    placeholder="Airplane Manufacturer. Ex: Boeing"
                    onChange={handleChange("manufacturer")}
                    className="border-[1px] border-[#223A60] rounded-[6px] p-[10px]"
                  />
                  {error.manufacturer && (
                    <span className="text-red-500 ">{error.manufacturer}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="manufactured_year"
                    className="text-[#223A60] text-[16px] font-bold mb-1"
                  >
                    Manufacturered year
                  </label>
                  <input
                    type="number"
                    id="manufactured_year"
                    onChange={handleChange("manufactured_year")}
                    placeholder="Airplane Manufactured year. Ex: 1998"
                    className="border-[1px] border-[#223A60] rounded-[6px] p-[10px]"
                  />
                  {error.manufactured_year && (
                    <span className="text-red-500">
                      {error.manufactured_year}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-[20px] md:justify-around">
              <img
                src="./QAirline_Logo.png"
                alt="Logo"
                className="self-center mt-[60px]"
              />
              <button className="w-[40%] bg-[#223A60] text-[18px] text-[#FFFFFF] font-bold px-[10px] py-[20px] rounded-[14px] shadow-lg transition-transform duration-200 hover:scale-[1.05] mt-[50px] self-center">
                Add airplane
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAirplane;
