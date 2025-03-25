import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginAdmin from "./pages/LoginAdmin";
import Register from "./pages/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PWA from "./pages/PWA";
import RegisterVendor from "./pages/RegisterVendor";
import RegisterBuyer from "./pages/RegisterBuyer";

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
    path: "/loginAdmin",
    element: <LoginAdmin />
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
