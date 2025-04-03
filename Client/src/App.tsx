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
import RegisterVendor from "./pages/RegisterVendor";
import RegisterBuyer from "./pages/RegisterBuyer";
import VendorDashboard from "./pages/Vendor/VendorDashboard";
import VendorProfile from "./pages/Vendor/VendorProfile";
import AturKataSandi from "./pages/Vendor/AturKataSandi";
import VendorTambahMenu from "./pages/Vendor/VendorTambahMenu";
import FoodDetail from "./pages/Customer/FoodDetail";
import { elements } from "chart.js";
// const adminRoutes = {
//   element: <ProtectedRoutes allowedRoles={["Admin"]} />,
//   children: [
//     {
//       path: "/admin/dasbor/",
//       element: <AdminDashboard />,
//     },
//     {
//       path: "/admin/vendor/",
//       element: <AdminVendor />,
//     },
//     {
//       path: "/admin/pengguna/",
//       element: <AdminPengguna />,
//     },
//     {
//       path: "/admin/ulasan/",
//       element: <AdminUlasan />,
//     },
//     {
//       path: "/admin/permintaan/",
//       element: <AdminPermintaan />,
//     },
//     {
//       path: "/admin/permintaan/:id",
//       element: <AdminRincianPermintaan />,
//     },
//   ],
// };

const adminRoutes = [
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
];
const vendorRoutes = [
  {
    path: "/vendor/dasbor/:id",
    element: <VendorDashboard />,
  },
  {
    path: "/vendor/pengaturan/:id",
    element: <VendorProfile />,
  },
  {
    path: "/vendor/pengaturan/atursandi/:id",
    element: <AturKataSandi />,
  },
  {
    path: "/vendor/menu/addmenu/:id",
    element: <VendorTambahMenu />,
  }
];
const customerRoutes = [
  {
    path: "/order/food/details/:id",
    element: <FoodDetail />,
  },
];
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
    path: "/register/vendor",
    element: <RegisterVendor />,
  },
  {
    path: "/register/buyer",
    element: <RegisterBuyer />,
  },
  {
    path: "/pwa",
    element: <PWA />,
  },
  ...adminRoutes,
  ...vendorRoutes,
  ...customerRoutes,
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
  );
}

export default App;
