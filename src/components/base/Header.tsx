import { NavLink, useLocation } from "react-router-dom";
import { Fragment, useContext } from "react";
import { AppContext } from "@/context/app.context";
import { Dropdown } from "antd";
import { logout } from "@/apis/auth.api";
import { PATH } from "@/constants/path";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "@/apis/user.api";

// Header component displays the navigation bar with dynamic links based on the user's authentication status and role (Admin or User).
const Header = () => {
  const location = useLocation();
  const { isAuthenticated, isAdmin, setIsAuthenticated } =
    useContext(AppContext);

  // Fetch current user data when authenticated using React Query.
  const { data: user } = useQuery({
    queryKey: ["nums_book_changed", isAuthenticated],
    queryFn: () => fetchCurrentUser(),
    enabled: isAuthenticated,
    staleTime: 1000 * 15,
  });

  // Menu items for the user's dropdown after authentication.
  const menuItems = [
    {
      key: "1",
      label: (
        <NavLink
          className="font-semibold h-6 flex items-center text-base"
          to="/user-profile"
        >
          <img src="../my_account.png" className="h-6 mr-2" /> My Account
        </NavLink>
      ),
    },
    {
      key: "2",
      label: (
        <NavLink
          to="/"
          className="mt-5px h-6 flex items-center font-semibold text-base bg-white"
          onClick={() => {
            logout();
            setIsAuthenticated(false);
          }}
        >
          <img src="../log_out.png" className="h-6 mr-2" /> Sign Out
        </NavLink>
      ),
    },
  ];

  return (
    <div className="flex flex-col md:gap-[10px] gap-[10px] md:flex-row bg-black h-max items-center px-[10px] py-[10px] bg-opacity-[30%]">
      <NavLink to="/">
        <img
          src="../QAirline_Logo_White.png"
          className="w-[150px] h-full md:w-[200px] min-w-[150px]"
        />
      </NavLink>

      {/* Main navigation links */}
      <div className="flex flex-col gap-[10px] mx-auto md:gap-[20px] md:flex-row">
        {/* Home link */}
        <NavLink
          className={
            location.pathname === "/"
              ? "flex items-center text-white px-2 font-semibold border-b-2 border-white-500"
              : "flex items-center text-white px-2 font-semibold border-b-2 border-transparent"
          }
          to="/"
        >
          Home
        </NavLink>

        {/* Navigation links based on authentication and role */}
        {isAuthenticated && (
          <>
            {/* User specific navigation links */}
            {!isAdmin ? (
              <NavLink
                className={
                  location.pathname === PATH.user.mybooking
                    ? "flex items-center text-white px-2 font-semibold border-b-2 border-white-500 gap-2"
                    : "flex items-center text-white px-2 font-semibold border-b-2 border-transparent gap-2"
                }
                to={PATH.user.mybooking}
              >
                My Bookings{" "}
                {(user?.nums_booking_changed ?? 0) > 0 && (
                  <div className="relative top-1">
                    <img
                      src="noti-white.png"
                      alt="noti"
                      className="w-[20px] h-[20px]"
                    />
                    <div className="text-sm text-white absolute px-1 top-[-10px] left-[12px] bg-[#de3f3f] rounded-[20px]">
                      {user?.nums_booking_changed}
                    </div>
                  </div>
                )}
              </NavLink>
            ) : null}
            {/* Admin specific navigation links */}
            {isAdmin ? (
              <>
                <NavLink
                  className={
                    location.pathname === PATH.admin.manage
                      ? "flex items-center text-white px-2 font-semibold border-b-2 border-white-500"
                      : "flex items-center text-white px-2 font-semibold border-b-2 border-transparent"
                  }
                  to={PATH.admin.manage}
                >
                  My Aircrafts
                </NavLink>
                <NavLink
                  className={
                    location.pathname === PATH.admin.user_management
                      ? "flex items-center text-white px-2 font-semibold border-b-2 border-white-500"
                      : "flex items-center text-white px-2 font-semibold border-b-2 border-transparent"
                  }
                  to={PATH.admin.user_management}
                >
                  User Management
                </NavLink>
                <NavLink
                  className={
                    location.pathname === PATH.admin.view_news
                      ? "flex items-center text-white px-2 font-semibold border-b-2 border-white-500"
                      : "flex items-center text-white px-2 font-semibold border-b-2 border-transparent"
                  }
                  to={PATH.admin.view_news}
                >
                  News
                </NavLink>
                <NavLink
                  className={
                    location.pathname === PATH.admin.chart
                      ? "flex items-center text-white px-2 font-semibold border-b-2 border-white-500"
                      : "flex items-center text-white px-2 font-semibold border-b-2 border-transparent"
                  }
                  to={PATH.admin.chart}
                >
                  Statistics
                </NavLink>
              </>
            ) : null}
          </>
        )}
      </div>

      {/* User's profile or login/register options */}
      <div className="flex space-x-2 w-[150px] md:space-x-4 md:w-[200px]">
        {isAuthenticated ? (
          // Show profile dropdown if authenticated
          <Dropdown menu={{ items: menuItems }}>
            <div className="flex flex-row items-center">
              <img
                src="../image.png"
                className="w-8 h-6 text-2xl cursor-pointer md:w-12 md:h-8 min-w-8"
              />
              <div className="text-white text-[16px] font-semibold">
                {user?.fullname}
              </div>
            </div>
          </Dropdown>
        ) : (
          <Fragment>
            {/* Show login and register links if not authenticated */}
            <NavLink
              to="/login"
              className="text-[14px] font-bold text-white my-auto transition-transform duration-200 ease-in-out hover:scale-[1.2] md:text-[18px]"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="text-[14px] font-bold text-white my-auto transition-transform duration-200 ease-in-out hover:scale-[1.2] md:text-[18px]"
            >
              Register
            </NavLink>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Header;
