import { LoggedInUserPayload, LoginUserCredentials } from "@/types/types";
import { API } from "@/utils/API";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { decodeToken } from "../utils/utils";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { roleStore } from "@/store/roleStore";

const useAuth = () => {
  // const [userRole, setRole] = useState<string>();
  const location = useLocation();
  const { setRole } = roleStore();
  const [user, setUser] = useState<LoggedInUserPayload | null>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isRemember, setIsRemember] = useState<boolean>(false);
  const navigate = useNavigate();
  //Login Mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginUserCredentials) => {
      const response = await API.post("/auths/login-user", credentials);
      return { data: response.data, rememberMe: credentials.rememberMe };
    },
    onSuccess: ({ data, rememberMe }) => {
      const tokenStorage = rememberMe ? localStorage : sessionStorage;
      setIsRemember(rememberMe);
      tokenStorage.setItem("token", data.token);
      tokenStorage.setItem("loginTime", Date.now().toString());

      const decoded = decodeToken(data.token);
      if (decoded) {
        setRole(decoded.role, rememberMe);
        setUser(decoded);
        setIsAuthenticated(true);
        toast.success("Login Berhasil!");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    },

    onError: (e) => {
      if (axios.isAxiosError(e) && e.response) {
        const errorMessage = e.response.data.message || "Login Gagal";
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        setError("Terdapat kesalahan! Mohon coba lagi");
        toast.error("Terdapat kesalahan! Mohon coba lagi");
      }
    },
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("loginTime");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("role");
    setUser(null);
    setRole(null, isRemember);
    setIsAuthenticated(false);

    navigate("/login");
  };

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
          setRole(decoded.role, isRemember);
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
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    loginLoading: loginMutation.isPending,
    logout,
  };
};

export default useAuth;
