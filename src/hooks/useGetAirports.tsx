import { useQuery } from "@tanstack/react-query";
import { getAirports } from "@/apis/flight.api";
import { Airport } from "@/types/flight.type";

export const useGetAirports = () => {
  const { data: airport_list } = useQuery({
    queryKey: ["airport"],
    queryFn: () => getAirports(),
  });

  const airports: { [key: string]: Airport } = {};
  if (airport_list) {
    for (const airport of airport_list.data) {
      airports[airport._id] = airport;
    }
  }
  return airports;
};
