import React, { useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import useUserStore from "../Zustand/store";
import { useNavigate } from "react-router-dom";

const AuthLoading = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/verify`,
          {
            withCredentials: true,
          }
        );
        // Redirect to home page or dashboard after successful verification

        setUser(response.data.user);
        navigate("/home");
      } catch (error) {
        // Redirect to login page on failure
        navigate("/login");
      }
    };
    verifyUser();
  }, [setUser, navigate]);
  return (
    <div className="bg-zinc-950 h-screen w-screen text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col justify-center items-center h-full"
      >
        <div className="loader animate-spin ease-linear rounded-full border-8 border-t-8 border-zinc-800 border-t-white h-32 w-32 mb-4"></div>
        <h2 className="text-xl font-semibold">Verifying your account...</h2>
        <p className="text-zinc-500">Please wait a moment</p>
      </motion.div>
    </div>
  );
};

export default AuthLoading;
