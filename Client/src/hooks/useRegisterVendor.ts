import { roleStore } from "@/store/roleStore";
import { RegisterVendorPayload } from "@/types/types";
import { API } from "@/utils/API";
import { decodeToken } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useRegisterVendor = () => {
  const navigate = useNavigate();
  const { setRole } = roleStore();
  const { logout } = useAuth();
  const registerMutation = useMutation({
    mutationFn: async (credentials: RegisterVendorPayload) => {
      const { rememberMe, ...payload } = credentials;
      const response = await API.post("/auths/register-user", payload);
      return { data: response.data, rememberMe };
    },

    onSuccess: ({ data, rememberMe }) => {
      const tokenStorage = rememberMe ? localStorage : sessionStorage;
      tokenStorage.setItem("token", data.token);
      tokenStorage.setItem("loginTime", Date.now().toString());

      const decoded = decodeToken(data.token);
      if (decoded) {
        setRole(decoded.role, decoded.id, rememberMe);
        toast.success("Register Berhasil!");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    },

    onError: (e) => {
      if (axios.isAxiosError(e) && e.response) {
        const errorMessage = e.response.data?.message?.[0] || "Login Gagal";
        toast.error(errorMessage);
      } else {
        toast.error("Terdapat kesalahan! Mohon coba lagi");
      }
    },
  });

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const loginTime =
      localStorage.getItem("loginTime") || sessionStorage.getItem("loginTime");

    if (token && loginTime) {
      const elapsedTime = Date.now() - parseInt(loginTime, 10);
      const oneDay = 24 * 60 * 60 * 1000;

      if (elapsedTime > oneDay) {
        logout();
      } else {
        const decoded = decodeToken(token);
        if (decoded) {
          setRole(decoded.role, decoded.id, true);
          if (
            location.pathname.includes("/register") ||
            location.pathname.includes("/login")
          ) {
            toast.success("Login successful!");
            setTimeout(() => {
              navigate("/");
            }, 1000);
          }
        }
      }
    }
  }, []);

  return {
    loginLoading: registerMutation.isPending,
    registerVendor: registerMutation.mutateAsync,
  };
};

export default useRegisterVendor;
