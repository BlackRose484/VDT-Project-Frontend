import { getAllAircraftsExID, grantAircraftOwnership } from "@/apis/rbac.api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Aircraft } from "@/types/flight.type";
import { toast } from "react-toastify";

interface AircraftPossesProps {
  userId: string;
}

const GrantAircraftPosses: React.FC<AircraftPossesProps> = ({ userId }) => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const { data: listAircrafts, refetch } = useQuery({
    queryKey: ["allAircraftsExID", userId],
    queryFn: () => getAllAircraftsExID(userId),
    enabled: !!userId,
  });

  const handleGrantAircraft = async (aircraftId: string) => {
    try {
      await grantAircraftOwnership(userId, aircraftId);
      queryClient.invalidateQueries({ queryKey: ["userAircrafts", userId] });
      toast.success("Aircraft ownership granted successfully");
      refetch(); 
    } catch (error) {
      console.error("Failed to grant aircraft ownership:", error);
      toast.error("Failed to grant aircraft ownership");
    }
  };

  const aircrafts: Aircraft[] = listAircrafts?.data || [];

  const filteredAircrafts = aircrafts.filter((aircraft) =>
    aircraft.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Grant Aircraft Possession
      </h3>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search aircraft by name..."
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Aircraft List */}
      {filteredAircrafts.length === 0 ? (
        <p className="text-gray-500">No aircraft found.</p>
      ) : (
        <ul className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
          {filteredAircrafts.map((aircraft) => (
            <li
              key={aircraft._id}
              className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 shadow-sm"
            >
              <div>
                <p className="font-semibold text-gray-800">{aircraft.name}</p>
                <p className="text-sm text-gray-600">ID: {aircraft._id}</p>
              </div>
              <button
                onClick={() => handleGrantAircraft(aircraft._id)}
                className="text-green-600 hover:text-green-800 transition"
              >
                Grant
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GrantAircraftPosses;
