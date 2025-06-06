import React, { useContext } from "react";
import InputField from "@/components/InputFeild";
import { registerSchema, Schema } from "@/utils/rule";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { registerAccount } from "@/apis/auth.api";
import { isAxiosUnprocessableEntity } from "@/utils/utils";
import { ErrorResponse } from "@/types/utils.type";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "@/context/app.context";
import { getRoleFromLocalStorage } from "@/utils/auth";

type RegisterForm = Schema;

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterForm>({
    resolver: yupResolver(registerSchema),
  });

  const navigate = useNavigate();
  const { setIsAuthenticated, setIsAdmin, setIsBoss } = useContext(AppContext);

  const registerMutation = useMutation({
    mutationFn: (body: { email: string; password: string }) =>
      registerAccount(body),
  });

  const onSubmit = handleSubmit((data) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        console.log("Success Login");
        setIsAuthenticated(true);
        const role = getRoleFromLocalStorage();
        setIsAdmin(role === "Admin" || role === "Boss");
        setIsBoss(role === "Boss");
        navigate("/");
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ErrorResponse<RegisterForm>>(error)) {
          const formError = error.response?.data?.data;
          console.log(error);

          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof RegisterForm, {
                type: "server",
                message: formError[key as keyof RegisterForm],
              });
            });
          }
        }
      },
    });
  });

  return (
    <main className="bg-white flex flex-col lg:flex-row min-w-[320px] items-start justify-start mx-4 lg:mx-24 p-4 lg:p-[100px_20px] scale-[1] lg:scale-[0.8]">
      <div className="rounded-[14px] shadow-lg flex flex-col lg:flex-row w-full justify-center items-stretch">
        <section className="rounded-b-[14px] lg:rounded-[14px_0_0_14px] flex flex-col w-full lg:w-1/2 relative p-10 lg:p-[217px_0_132px] overflow-hidden">
          <img
            className="w-full h-full absolute top-0 left-0 z-0 object-cover"
            src="./background.png"
            alt="Background"
          />
          <div className="text-black font-bold font-serif z-10 px-4 lg:px-[73px] mt-10 lg:mt-20">
            <h2 className="text-[36px] lg:text-[90px] tracking-wide lg:tracking-[2.88px]">
              Elevate Your Journey
            </h2>
            <p className="text-[36px] lg:text-[100px] mt-10 lg:mt-[105px]">
              Discover the
            </p>
          </div>
          <p className="text-white font-serif text-[40px] lg:text-[128px] tracking-wide lg:tracking-[7.68px] mt-6 ml-2 z-10">
            World
          </p>
        </section>

        <section className="rounded-t-[14px] lg:rounded-[0_14px_14px_0] bg-[rgba(97,168,250,0.2)] flex flex-col w-full lg:w-1/2 min-h-[600px] lg:min-h-[814px] tracking-[0.96px] justify-between text-[16px] p-4 lg:p-[0_20px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/f8ff8e6c001546d0b8b7d8599eb812e4/e1788ec81ceaeebbbe73440a826b9431217fe1ebd68df09e1c2b49c49251d318?apiKey=f8ff8e6c001546d0b8b7d8599eb812e4&"
            alt="Company Logo"
            className="aspect-[3.1] object-contain object-center w-[200px] lg:w-[300px] max-w-[300px] mt-6 lg:mt-10 self-center"
          />
          <div className="text-[#223a60] font-bold leading-[40px] mt-6 lg:mt-[40px] text-center lg:text-left">
            <h1 className="text-[32px] lg:text-[48px] text-[#223a60]">
              Create Account
            </h1>
            <p className="font-normal text-[18px] lg:text-[20px] text-[#223a60]">
              Welcome! Ready For A New Flight!
            </p>
          </div>
          <form onSubmit={onSubmit} className="flex flex-col mt-6 lg:mt-0">
            <div className="mb-6 lg:mb-10">
              <InputField
                name="email"
                type="text"
                placeholder="Email"
                iconSrc="https://cdn.builder.io/api/v1/image/assets/f8ff8e6c001546d0b8b7d8599eb812e4/89d1af211486f8a9cd21fd16209f0d9061374f9e65e163a37e7d9fc23b74a0e0?apiKey=f8ff8e6c001546d0b8b7d8599eb812e4&"
                iconAlt="Email icon"
                register={register}
                error={errors.email?.message}
              />
            </div>
            <div className="mb-6 lg:mb-10">
              <InputField
                name="password"
                type="password"
                placeholder="Password"
                iconSrc="https://cdn.builder.io/api/v1/image/assets/f8ff8e6c001546d0b8b7d8599eb812e4/4f99d8f408629bd8675a6a08d50091c811acac04e457a14f936a41b2fdfc8e5a?apiKey=f8ff8e6c001546d0b8b7d8599eb812e4&"
                iconAlt="Password icon"
                register={register}
                error={errors.password?.message}
              />
            </div>
            <InputField
              name="confirm_password"
              type="password"
              placeholder="Confirm Password"
              iconSrc="https://cdn.builder.io/api/v1/image/assets/f8ff8e6c001546d0b8b7d8599eb812e4/4f99d8f408629bd8675a6a08d50091c811acac04e457a14f936a41b2fdfc8e5a?apiKey=f8ff8e6c001546d0b8b7d8599eb812e4&"
              iconAlt="Password icon"
              register={register}
              error={errors.confirm_password?.message}
            />
            <button
              type="submit"
              className="w-2/3 lg:w-1/3 mx-auto rounded-[14px] bg-[#223a60] shadow-lg mt-6 lg:mt-[30px] min-h-[44px] gap-[10px] text-white font-medium text-center leading-[40px] px-5"
            >
              Register
            </button>
          </form>
          <div className="flex flex-col w-full mb-6 lg:mb-10 items-center gap-2.5 text-center px-2.5 sm:mt-[30px] sm:px-5">
            <p className="text-[#223a60] font-normal leading-[24px]">
              Already have an account?
            </p>
            <Link to="/login" className="text-[#0066ff] font-medium px-5">
              Login
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default RegisterPage;
