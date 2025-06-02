import { useRoutes } from "react-router-dom";
import { PATH } from "@/constants/path";
import LoginPage from "@/pages/auth/Login";
import RegisterPage from "@/pages/auth/Register";
import Layout from "@/layouts/Layout";
import HomePage from "@/pages/Home";
import PrivateRoute from "@/guards/PrivateRoute";
import AdminRoute from "@/guards/AdminRoute";
import RejectedRoute from "@/guards/RejectedRoute";
import SearchPage from "@/pages/Search";
import Booking from "@/pages/customer/Booking";
import MyBooking from "@/pages/customer/MyBooking";
import ConfirmCancelBooking from "@/pages/customer/ConfirmCancelBooking";
import AirplaneManagement from "@/pages/admin/airplane/AirplaneManagement";
import ViewFlight from "@/pages/admin/flight/ViewFlight";
import EditNews from "@/pages/admin/blogs/EditNews";
import NewsDetails from "@/pages/admin/blogs/NewsDetails";
import NewsList from "@/pages/admin/blogs/NewsList";
import AddFlight from "@/pages/admin/flight/AddFlight";
import UserProfile from "@/pages/customer/UserProfile";
import AddAirplane from "@/pages/admin/airplane/AddAirplane";
import Chart from "@/pages/admin/chart/Chart";
import ViewFullTicket from "@/pages/admin/flight/ViewFullTicket";

export default function createRoutes() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router_elements = useRoutes([
    {
      path: "",
      element: <PrivateRoute />,
      children: [
        {
          path: PATH.user.mybooking,
          element: (
            <Layout>
              <MyBooking />
            </Layout>
          ),
        },
        {
          path: PATH.user.booking,
          element: (
            <Layout>
              <Booking />
            </Layout>
          ),
        },
        {
          path: PATH.user.cancel_booking,
          element: (
            <Layout>
              <ConfirmCancelBooking />
            </Layout>
          ),
        },
        {
          path: PATH.user.userProfile,
          element: (
            <Layout>
              <UserProfile />
            </Layout>
          ),
        },
      ],
    },
    {
      path: "",
      element: <AdminRoute />,
      children: [
        {
          path: PATH.admin.manage,
          element: (
            <Layout>
              <AirplaneManagement />
            </Layout>
          ),
        },
        {
          path: PATH.admin.view_flight,
          element: (
            <Layout>
              <ViewFlight />
            </Layout>
          ),
        },
        {
          path: PATH.admin.upload_news,
          element: (
            <Layout>
              <EditNews />
            </Layout>
          ),
        },
        {
          path: PATH.admin.view_news,
          element: (
            <Layout>
              <NewsList />
            </Layout>
          ),
        },
        {
          path: PATH.admin.add_flight,
          element: (
            <Layout>
              <AddFlight />
            </Layout>
          ),
        },
        {
          path: PATH.admin.add_airplane,
          element: (
            <Layout>
              <AddAirplane />
            </Layout>
          ),
        },
        {
          path: PATH.admin.edit_news,
          element: (
            <Layout>
              <EditNews />
            </Layout>
          ),
        },
        {
          path: PATH.admin.chart,
          element: (
            <Layout>
              <Chart />
            </Layout>
          ),
        },
        {
          path: PATH.admin.view_full_tickets,
          element: (
            <Layout>
              <ViewFullTicket />
            </Layout>
          ),
        },
      ],
    },
    {
      path: "",
      element: <RejectedRoute />,
      children: [
        {
          path: PATH.login,
          element: <LoginPage />,
        },
        {
          path: PATH.register,
          element: <RegisterPage />,
        },
      ],
    },
    {
      path: PATH.home,
      index: true,
      element: (
        <Layout>
          <HomePage />
        </Layout>
      ),
    },
    {
      path: PATH.search,
      element: (
        <Layout>
          <SearchPage key={Date.now()} />
        </Layout>
      ),
    },
    {
      path: PATH.blog_details,
      element: (
        <Layout>
          <NewsDetails />
        </Layout>
      ),
    },
  ]);

  return router_elements;
}
