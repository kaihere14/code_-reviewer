import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import axios from "axios";
import useUserStore from "../Zustand/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/verify`,
          {
            withCredentials: true,
          }
        );

        localStorage.setItem("user", JSON.stringify(response.data.user));
        console.log("User already logged in, redirecting to home...");
        setUser(response.data.user);
        navigate("/home");
      } catch (error) {
        setLoading(false);
      }
    };
    verifyUser();
  }, [setUser, navigate]);

  return (
    <div className="relative min-h-screen w-full flex justify-center items-center bg-zinc-950 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md p-8 mx-4 rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl shadow-2xl"
      >
        <div className="flex flex-col gap-8 items-center">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Welcome Back
            </h1>
            <p className="text-zinc-400 text-sm">
              Please sign in to access your dashboard
            </p>
          </div>

          <motion.a
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            href={
              loading
                ? undefined
                : `${
                    import.meta.env.VITE_BACKEND_URL
                  }/api/oauth/google/redirect`
            }
            className={`group relative w-full flex items-center justify-center gap-3 px-6 py-4 
                     ${
                       loading
                         ? "cursor-not-allowed bg-zinc-700 text-zinc-400 opacity-60"
                         : "cursor-pointer bg-white hover:bg-zinc-200 text-black"
                     } 
                     font-semibold rounded-xl transition-all duration-200 
                     shadow-[0_0_20px_rgba(255,255,255,0.1)]`}
            onClick={(e) => loading && e.preventDefault()}
          >
            <img
              className="h-6 w-6 group-hover:rotate-15 transition-transform duration-300"
              src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
              alt="Google Icon"
            />
            <span>Continue with Google</span>

            <LogIn
              className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
              size={20}
            />
          </motion.a>

          <div className="flex items-center gap-4 w-full">
            <div className="h-px w-full bg-white/10" />
            <span className="text-zinc-500 text-xs uppercase tracking-widest">
              Secure
            </span>
            <div className="h-px w-full bg-white/10" />
          </div>

          <p className="text-zinc-500 text-xs text-center px-8">
            By clicking continue, you agree to our
            <span className="text-zinc-300 cursor-pointer hover:underline ml-1">
              Terms of Service
            </span>
            .
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
