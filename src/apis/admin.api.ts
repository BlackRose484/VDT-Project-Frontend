import { Aircrafts } from "../types/flight.type";
import http from "../utils/http";

export const getAirCrafts = async () =>
  http.get<Aircrafts>("/my-aircrafts/get-all");

export const getAirCraftById = async (aircraft_id: string) =>
  http.get(`/my-aircrafts/get/${aircraft_id}`);

export const deleteAircraft = async (aircraft_id: string) =>
  http.delete(`/my-aircrafts/delete/${aircraft_id}`);

export const getAllFlights = async ({ aircraft_id }: { aircraft_id: string }) =>
  http.get(`/my-aircrafts/${aircraft_id}/get-flights`);

export const updateFlight = async (
  flight_id: string,
  aircraft_id: string,
  data: object
) => http.put(`/my-aircrafts/${aircraft_id}/update-flight/${flight_id}`, data);

export const deleteFlight = async (flight_id: string, aircraft_id: string) =>
  http.delete(`/my-aircrafts/${aircraft_id}/delete-flight/${flight_id}`);

export const addFlight = async (aircraft_id: string, data: object) =>
  http.post(`/my-aircrafts/${aircraft_id}/add-flight`, data);

export const addAirplane = async (data: object) =>
  http.post("/my-aircrafts/add", data);

export const getRevenue = async ({ year }: { year: number }) =>
  http.get(`/my-aircrafts/get-revenue/${year}`);

export const getPopular = async ({ year }: { year: number }) =>
  http.get(`/my-aircrafts/get-popular/${year}`);

export const getFullTickets = async ({ flight_id }: { flight_id: string }) =>
  http.get(`/my-aircrafts/get-all-tickets/${flight_id}`);
