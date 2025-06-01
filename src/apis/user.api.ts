import { Tickets } from "../types/flight.type";
import http from "../utils/http";
import {
  ChangePasswordParams,
  UserProfileFormData,
  User,
} from "../types/user.type";

export const getMyBookings = () => http.get("/my-bookings/get");

export const getTickets = (data: object) =>
  http.post<Tickets>("/my-bookings/get-tickets", data);

export const cancelBooking = (data: object) =>
  http.delete(`/my-bookings/cancel/${data}`);

export const updateUserProfile = async (formData: UserProfileFormData) => {
  http.put("/users/update-profile", formData);
};

export const changePassword = async (params: ChangePasswordParams) => {
  http.put("/users/change-password", params);
};

export const fetchCurrentUser = async (): Promise<User> => {
  const response = await http.get<User>("/users/me");
  return response.data;
};

export const clearNotificationBooking = async () =>
  http.put("/users/clear-nums-booking-changed");
