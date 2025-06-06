import { getUsersByRole } from "@/apis/rbac.api";
import UserCard from "@/components/admin/user-managemet/UserCard";
import { UserCardProps } from "@/types/rbac.type";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const CustomerList: React.FC = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users", "customer"],
    queryFn: () => getUsersByRole("Customer"),
  });

  const [users_list, setUsers] = useState(users?.data || []);
  useEffect(() => {
    setUsers(users?.data || []);
  }, [users]);

  if (users?.data.length === 0) {
    return (
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Admin List</h1>
        <p className="text-gray-600">No admin users found.</p>
      </div>
    );
  }

  const handleSearch = (query: string) => {
    const filteredUsers = users?.data.filter((user: UserCardProps) =>
      user.email.toLowerCase().includes(query.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col mb-4 left-0">
        <h1 className="text-2xl font-bold">Customer List</h1>
        <div className="flex-1">
          <p className="text-gray-600">Manage your customer users here.</p>
          <input
            type="text"
            placeholder="Search by email..."
            className="border rounded px-3 py-2"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {users_list.map((user: UserCardProps) => (
            <UserCard key={user._id} {...user} />
          ))}
        </div>
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default CustomerList;
