import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/LandingPage/Home";
import Login from "./pages/Auth/Login";
import LoginAdmin from "./pages/Auth/LoginAdmin";
import Register from "./pages/Auth/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PWA from "./pages/OtherPage/PWA";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminVendor from "./pages/Admin/AdminVendor";
import AdminPengguna from "./pages/Admin/AdminPengguna";
import AdminPermintaan from "./pages/Admin/AdminPermintaan";
import AdminUlasan from "./pages/Admin/AdminUlasan";
import AdminRincianPermintaan from "./pages/Admin/AdminRincianPermintaan";
import Unauthorized from "./pages/OtherPage/Unauthorized";
import PageNotFound from "./pages/OtherPage/PageNotFound";
import ProtectedRoutes from "./components/ProtectedRoutes";
import RegisterVendor from "./pages/Auth/RegisterVendor";
import RegisterBuyer from "./pages/Auth/RegisterBuyer";
import VendorDashboard from "./pages/Vendor/Dashboard/VendorDashboard";
import VendorProfile from "./pages/Vendor/Profile/VendorProfile";
import AturKataSandi from "./pages/Vendor/Profile/AturKataSandi";
import UserProfile from "./pages/General/UserProfile";
import ListMenuVendor from "./pages/Vendor/ViewMenu Vendor/ListMenuVendor";
import EachMenuDetail from "./pages/Vendor/ViewMenu Vendor/EachMenuDetail";
import VendorTambahMenu from "./pages/Vendor/Tambah Menu/VendorTambahMenu";
import FoodDetail from "./pages/Customer/Food/FoodDetail";
import FoodPages from "./pages/Customer/Food/FoodPages";
import AllMenu from "./pages/Customer/Food/AllMenu";
import AllRestorant from "./pages/Customer/Food/AllRestorant";
import AllMenuEachVendor from "./pages/Customer/Food/AllMenuEachVendor";
import EachCategoryMenu from "./pages/Customer/Food/EachCategoryMenu";
import ShoppingCart from "./pages/Customer/Cart & Checkout/ShoppingCart";
import UserProfileMobile from "./pages/Customer/Account/UserProfileMobile";
import TransactionReceipt from "./pages/Customer/Transaction/TransactionReceipt";
import ForgotPassword from "./pages/Customer/Account/ForgotPassword";
import VendorAnalitikPesanan from "./pages/Vendor/Analitik Pesanan/VendorAnalitikPesanan";
import HistoryPage from "./pages/Customer/Food/HistoryPage";
import NotificationPage from "./pages/Customer/Food/NotificationPage";

const adminRoutes = {
  element: <ProtectedRoutes allowedRoles={["Admin"]} />,
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
const vendorRoutes = {
  element: <ProtectedRoutes allowedRoles={["Admin", "Seller"]} />,
  children: [
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
      path: "/vendor/menu/listmenu/:id",
      element: <ListMenuVendor />,
    },
    {
      path: "/vendor/menu/editmenu/:id",
      element: <EachMenuDetail />,
    },
    {
      path: "/vendor/menu/addmenu/:id",
      element: <VendorTambahMenu />,
    },
    {
      path: "/vendor/pesanan/:id",
      element: <VendorAnalitikPesanan />,
    },
  ],
};
const customerRoutes = {
  // element: <ProtectedRoutes allowedRoles={["Seller", "Buyer"]} />,
  children: [
    {
      path: "/customer/food",
      element: <FoodPages />,
    },
    {
      path: "/customer/food/details/:id",
      element: <FoodDetail />,
    },
    {
      path: "/customer/allmenu", //ini untuk semua menu
      element: <AllMenu />,
    },
    {
      path: "/customer/allrestorant", //list semua restoran -> ntar kalo dipencet arahnya ke list menu vendor
      element: <AllRestorant />,
    },
    {
      path: "/customer/allmenu/:id", //Ini untuk list menu vendor yang dipilih
      element: <AllMenuEachVendor />,
    },
    {
      path: "/customer/allcategory/:id", //Ini untuk list menu di category tertentu yg dipilih
      element: <EachCategoryMenu />,
    },
    {
      path: "/customer/shoppingcart", //Ini untuk list menu di category tertentu yg dipilih
      element: <ShoppingCart />,
    },
    {
      path: "/customer/transaction/:id/receipt",
      element: <TransactionReceipt />,
    },
    {
      path: "/customer/history",
      element: <HistoryPage />,
    },
    {
      path: "/customer/notification",
      element: <NotificationPage />,
    },
  ],
};
const userProfileRoutes = {
  element: <ProtectedRoutes allowedRoles={["Admin", "Buyer", "Seller"]} />,
  children: [
    {
      path: "/profile/:id",
      element: <UserProfile />,
    },
    {
      path: "/profile/info/:id",
      element: <UserProfileMobile />,
    },
  ],
};
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes allowedRoles={["Buyer", "Seller", null]}>
        <Home />
      </ProtectedRoutes>
    ),
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
    path: "/forgotpassword/:id",
    element: <ForgotPassword />,
  },
  {
    path: "/pwa",
    element: <PWA />,
  },
  adminRoutes,
  userProfileRoutes,
  vendorRoutes,
  customerRoutes,
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
