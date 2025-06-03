import http from "@/utils/http";

export const getAllUsers = async () => {
  return http.get("/rbac/get-all");
};

export const getUsersByRole = async (role: string) => {
  return http.get(`/rbac/get-by-role/${role}`);
};

export const updateUserRole = async (userId: string, role: string) => {
  return http.put(`/rbac/update-role/${userId}`, { role });
};

export const getUserById = async (id: string) => {
  return http.get(`/rbac/get-user/${id}`);
};

export const getAirCraftsByUserId = async (userId: string) => {
  return http.get(`/rbac/get-aircrafts/${userId}`);
};

export const revokeAircraftOwnership = async (aircraftId: string) => {
  return http.put(`/rbac/revoke-aircraft/${aircraftId}`);
};

export const getAllAircraftsExID = async (userId: string) => {
  return http.get(`/rbac/get-aircrafts-exid/${userId}`);
};

export const grantAircraftOwnership = async (
  userId: string,
  aircraftId: string
) => {
  return http.put(`/rbac/grant-aircraft`, { userId, aircraftId });
};
