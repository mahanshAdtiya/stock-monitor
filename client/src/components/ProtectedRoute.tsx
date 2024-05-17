import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

import api from "../services/api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../data";

import {Sidebar, Navbar} from "../components";
import { useStateContext } from '../contexts/ContextProvider';

import CircularProgress from '@mui/material/CircularProgress';

function ProtectedRoute() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded: { exp?: number } = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration && tokenExpiration < now) {
      await refreshToken();
    } else if (tokenExpiration) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  };

  if (isAuthorized === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  return isAuthorized ? <AuthorizedLayout /> : <Navigate to="/login" />;
}

const AuthorizedLayout = () => {
  const { activeMenu } = useStateContext();

  return (
    <div className='flex relative'>
      <div className={`${activeMenu ? "w-72 fixed sidebar bg-white transition-all duration-300 ease-in-out" : "w-0 transition-all duration-200 ease-in-out"}`}>
        <Sidebar />
      </div>
      <div className={activeMenu ? "bg-main-bg min-h-screen md:ml-72 w-full" : "bg-main-bg w-full min-h-screen flex-2"}>
        <div className='fixed md:static bg-main-bg navbar w-full'>
          <Navbar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedRoute;
