import { AxiosRequestConfig } from "axios";
import { Airports, Flights, PopularPlaces } from "../types/flight.type";
import http from "../utils/http";

export const getAirports = async () =>
  http.get<Airports>("/flights/get-airports");

export const getFlights = async (
  data: AxiosRequestConfig<unknown> | undefined
) => http.post<Flights>("/flights/search", data);

export const makeBooking = async (data: object) =>
  http.post("/flights/make-booking", data);

export const getPopularPlaces = async () =>
  http.get<PopularPlaces>("/flights/get-popular-places");
