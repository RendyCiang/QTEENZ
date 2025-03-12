import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PWA from "./pages/PWA";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminVendor from "./pages/Admin/AdminVendor";
import AdminPengguna from "./pages/Admin/AdminPengguna";
import AdminPermintaan from "./pages/Admin/AdminPermintaan";
import AdminUlasan from "./pages/Admin/AdminUlasan";
import AdminRincianPermintaan from "./pages/Admin/AdminRincianPermintaan";
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
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/pwa",
    element: <PWA />,
  },
  ...adminRoutes,
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
