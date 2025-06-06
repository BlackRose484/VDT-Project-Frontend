import { useNavigate } from "react-router-dom";
import { UserCardProps } from "@/types/rbac.type.ts";

const UserCard = (user: UserCardProps) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/view-user-info/${user._id}`);
  };

  return (
    <div
      className="bg-white shadow-lg rounded-xl p-4 sm:p-6 w-full cursor-pointer hover:shadow-xl transition duration-200"
      onClick={handleViewProfile}
    >
      <div className="flex items-center gap-4 sm:gap-6">
        <img
          src={
            user.role === "Admin"
              ? "/public/admin-avatar.png"
              : "/public/user-avatar.png"
          }
          alt={user.fullname}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-blue-200 object-cover flex-shrink-0"
        />
        <div className="min-w-0">
          <h3
            className={`text-base sm:text-xl font-bold ${
              user.fullname ? "text-green-800" : "text-red-500"
            } truncate`}
          >
            {user.fullname || "Anonymous"}
          </h3>
          <p className="text-blue-600 font-medium truncate">{user.email}</p>
          <h3 className="xl:inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold truncate">
            {user.role}
          </h3>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
