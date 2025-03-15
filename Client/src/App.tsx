import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginAdmin from "./pages/LoginAdmin";
import Register from "./pages/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PWA from "./pages/PWA";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminVendor from "./pages/Admin/AdminVendor";
import AdminPengguna from "./pages/Admin/AdminPengguna";
import AdminPermintaan from "./pages/Admin/AdminPermintaan";
import AdminUlasan from "./pages/Admin/AdminUlasan";
import AdminRincianPermintaan from "./pages/Admin/AdminRincianPermintaan";
import Unauthorized from "./pages/Unauthorized";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoutes from "./components/ProtectedRoutes";
const adminRoutes = {
  element: <ProtectedRoutes allowedRoles={["admin"]} />,
  children: [
    {
      path: "/admin/dasbor/",
      element: <AdminDashboard />,
    },
    {
      path: "/admin/vendor/",
      element: <AdminVendor />,
    },
    {
      path: "/admin/pengguna/",
      element: <AdminPengguna />,
    },
    {
      path: "/admin/ulasan/",
      element: <AdminUlasan />,
    },
    {
      path: "/admin/permintaan/",
      element: <AdminPermintaan />,
    },
    {
      path: "/admin/permintaan/:id",
      element: <AdminRincianPermintaan />,
    },
  ],
};

// const adminRoutes = [
//   {
//     path: "/admin/dasbor/",
//     element: <AdminDashboard />,
//   },
//   {
//     path: "/admin/vendor/",
//     element: <AdminVendor />,
//   },
//   {
//     path: "/admin/pengguna/",
//     element: <AdminPengguna />,
//   },
//   {
//     path: "/admin/ulasan/",
//     element: <AdminUlasan />,
//   },
//   {
//     path: "/admin/permintaan/",
//     element: <AdminPermintaan />,
//   },
//   {
//     path: "/admin/permintaan/:id",
//     element: <AdminRincianPermintaan />,
//   },
// ];
const router = createBrowserRouter([
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/loginAdmin",
    element: <LoginAdmin />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/pwa",
    element: <PWA />,
  },
  adminRoutes,
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>

    // <div>
    //   <Login/>
    // </div>
  );
}

export default App;
