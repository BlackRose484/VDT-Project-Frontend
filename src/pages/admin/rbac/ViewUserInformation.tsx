import { useParams } from "react-router-dom";
import { getUserById } from "@/apis/rbac.api";

import UserInformationCard from "@/components/admin/user-managemet/UserInformationCard";
import { UserCardProps } from "@/types/rbac.type";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AircraftPosses from "@/components/admin/user-managemet/AircarftPosses";

const ViewUserInformation: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [isCustomer, setIsCustomer] = useState(false);

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId || ""),
    enabled: !!userId,
  });

  useEffect(() => {
    if (userData) {
      setIsCustomer(userData.data.role === "Customer");
    }
  }, [userData]);

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="text-center text-gray-500">Loading user data...</div>
      ) : isCustomer ? (
        <UserInformationCard {...(userData?.data as UserCardProps)} />
      ) : (
        <div className="flex flex-col lg:flex-row items-stretch gap-6">
          <div className="w-full lg:w-1/2 h-full">
            <UserInformationCard {...(userData?.data as UserCardProps)} />
          </div>
          <div className="w-full lg:w-1/2 h-full">
            <AircraftPosses userId={userId || ""} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUserInformation;
