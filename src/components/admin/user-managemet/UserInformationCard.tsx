import { updateUserRole } from "@/apis/rbac.api";
import Loading from "@/components/Loading";
import Successful from "@/components/Successful";
import { PATH } from "@/constants/path";
import { UserCardProps } from "@/types/rbac.type";
import moment from "moment"; // Nếu cần format ngày sinh
import { useState } from "react";

const UserInformationCard = (user: UserCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  if (!user) {
    return <div className="text-red-500">User not found</div>;
  }

  const handlePromote = async () => {
    if (isLoading) return; // Prevent multiple clicks
    setIsLoading(true);
    setIsSuccessful(false);
    if (user.role !== "Customer") {
      try {
        await updateUserRole(user._id || "", "Customer");
        setIsSuccessful(true);
      } catch (error) {
        console.error("Failed to demote user:", error);
        alert("Failed to demote user. Please try again.");
        setIsLoading(false);
        return;
      }
    } else {
      try {
        await updateUserRole(user._id || "", "Admin");
        setIsSuccessful(true);
      } catch (error) {
        console.error("Failed to promote user:", error);
        alert("Failed to promote user. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
          User Information
        </h2>

        <div className="flex items-center gap-6">
          <img
            src={
              user.role === "Admin"
                ? "/public/admin-avatar.png"
                : "/public/user-avatar.png"
            }
            alt={user.fullname || "User Avatar"}
            className="w-20 h-20 rounded-full border-2 border-blue-300 object-cover"
          />
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 w-full">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                value={user.fullname || "N/A"}
                readOnly
                className="mt-1 block w-full border rounded-md bg-gray-100 px-3 py-2 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="text"
                value={user.email}
                readOnly
                className="mt-1 block w-full border rounded-md bg-gray-100 px-3 py-2 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Phone
              </label>
              <input
                type="text"
                value={user.phone || "N/A"}
                readOnly
                className="mt-1 block w-full border rounded-md bg-gray-100 px-3 py-2 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Sex
              </label>
              <input
                type="text"
                value={user.sex || "N/A"}
                readOnly
                className="mt-1 block w-full border rounded-md bg-gray-100 px-3 py-2 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Date of Birth
              </label>
              <input
                type="text"
                value={
                  user.date_of_birth
                    ? moment(user.date_of_birth).format("YYYY-MM-DD")
                    : "N/A"
                }
                readOnly
                className="mt-1 block w-full border rounded-md bg-gray-100 px-3 py-2 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Passport Number
              </label>
              <input
                type="text"
                value={user.passport || "N/A"}
                readOnly
                className="mt-1 block w-full border rounded-md bg-gray-100 px-3 py-2 text-gray-800"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-600">
                Address
              </label>
              <input
                type="text"
                value={user.address || "N/A"}
                readOnly
                className="mt-1 block w-full border rounded-md bg-gray-100 px-3 py-2 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Role
              </label>
              <input
                type="text"
                value={user.role || "N/A"}
                readOnly
                className="mt-1 block w-full border rounded-md bg-gray-100 px-3 py-2 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                User ID
              </label>
              {user.role === "Customer" ? (
                <button
                  onClick={handlePromote}
                  className="mt-1 block w-full bg-blue-600 text-white rounded-md px-3 py-2 font-semibold hover:bg-blue-700 transition"
                >
                  Promote to Admin
                </button>
              ) : (
                <button
                  onClick={handlePromote}
                  className="mt-1 block w-full bg-blue-600 text-white rounded-md px-3 py-2 font-semibold hover:bg-blue-700 transition"
                >
                  Demote to Customer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
      {isSuccessful && (
        <Successful
          message="User role updated successfully!"
          to_path={PATH.admin.user_management}
        />
      )}
    </div>
  );
};

export default UserInformationCard;
