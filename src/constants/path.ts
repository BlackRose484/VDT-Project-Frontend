export const PATH = {
  home: "/",
  login: "/login",
  register: "/register",
  search: "/search",
  blog_details: "/blog-details/:id",
  admin: {
    manage: "/manage",
    view_flight: "/view-flight",
    upload_news: "/upload-news",
    edit_news: "/edit-news/:id",
    view_news: "/view-news",
    add_flight: "/add-flight",
    chart: "/chart",
    add_airplane: "/add-airplane",
    view_full_tickets: "/view-full-tickets/:flight_id",
  },
  user: {
    booking: "/booking",
    mybooking: "/mybooking",
    cancel_booking: "/cancel-booking",
    userProfile: "/user-profile",
  },
} as const;
