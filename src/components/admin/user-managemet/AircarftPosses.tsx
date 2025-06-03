import { getAirCraftsByUserId, revokeAircraftOwnership } from "@/apis/rbac.api";
import { useQuery } from "@tanstack/react-query";
import { Aircraft } from "@/types/flight.type";
import { useQueryClient } from "@tanstack/react-query";

import React from "react";
import GrantAircraftPosses from "./GrantAircarftPosses";

interface AircraftPossesProps {
  userId: string;
}

const AircraftPosses: React.FC<AircraftPossesProps> = ({ userId }) => {
  const queryClient = useQueryClient();
  const [isAddAircraftModalOpen, setIsAddAircraftModalOpen] =
    React.useState(false);
  const { data: userAircrafts, isLoading } = useQuery({
    queryKey: ["userAircrafts", userId],
    queryFn: () => getAirCraftsByUserId(userId),
    enabled: !!userId,
  });

  if (isLoading) {
    return <div className="p-4">Loading aircrafts...</div>;
  }

  const aircrafts: Aircraft[] = userAircrafts?.data || [];

  const handleRevokeAircraft = async (aircraftId: string) => {
    try {
      // Call API to revoke aircraft ownership
      await revokeAircraftOwnership(aircraftId);
      queryClient.invalidateQueries({ queryKey: ["userAircrafts", userId] });
    } catch (error) {
      console.error("Failed to revoke aircraft ownership:", error);
    }
  };

  const handleAddAircraft = () => {
    // Logic to open modal or navigate to add aircraft page
    setIsAddAircraftModalOpen(true);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-gray-800">Managed Aircrafts</h3>
        <button
          onClick={() => handleAddAircraft()} // Bạn sẽ định nghĩa hàm này
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          Add Aircraft
        </button>
      </div>
      {aircrafts.length === 0 ? (
        <p className="text-gray-500">This user is not managing any aircraft.</p>
      ) : (
        <ul className="space-y-4 max-h-[430px] overflow-y-auto pr-2">
          {aircrafts.map((aircraft) => (
            <li
              key={aircraft._id}
              className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 shadow-sm"
            >
              <div>
                <p className="font-semibold text-gray-800">{aircraft.name}</p>
                <p className="text-sm text-gray-600">ID: {aircraft._id}</p>
              </div>
              <button
                onClick={() => handleRevokeAircraft(aircraft._id)}
                className="text-red-600 hover:text-red-800 transition"
                title="Remove management permission"
              >
                Revoke
              </button>
            </li>
          ))}
        </ul>
      )}
      {isAddAircraftModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-xl shadow-lg w-full max-w-2xl p-6">
            {/* Button X */}
            <button
              onClick={() => setIsAddAircraftModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-xl font-bold"
              title="Close"
            >
              &times;
            </button>

            {/* Modal Content */}
            <GrantAircraftPosses userId={userId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AircraftPosses;
