import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../Zustand/store";
import HomeNav from "../components/HomeNav";
import { Mail, Calendar, User, LogOut } from "lucide-react";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <HomeNav />

      <div className="max-w-4xl mx-auto px-8 pt-28 pb-20">
        {/* Profile Card */}
        <div className="bg-zinc-900/60 border border-white/10 rounded-3xl p-8 mb-8 backdrop-blur-xl">
          {/* Header with Avatar */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
            <div className="relative">
              <img
                src={user.profileImage}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-white/10 shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-zinc-900"></div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
              <p className="text-zinc-400 text-lg mb-4">{user.email}</p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="px-4 py-2 bg-blue-400/10 border border-blue-400/30 text-blue-400 rounded-full text-sm font-medium">
                  Active Account
                </span>
                <span className="px-4 py-2 bg-purple-400/10 border border-purple-400/30 text-purple-400 rounded-full text-sm font-medium">
                  Google Verified
                </span>
              </div>
            </div>
          </div>

          {/* User Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-zinc-800/50 rounded-xl p-6 border border-white/5">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                  Email Address
                </h3>
              </div>
              <p className="text-lg font-medium">{user.email}</p>
            </div>

            <div className="bg-zinc-800/50 rounded-xl p-6 border border-white/5">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-green-400" />
                <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                  Member Since
                </h3>
              </div>
              <p className="text-lg font-medium">
                {formatDate(user.createdAt)}
              </p>
            </div>

            <div className="bg-zinc-800/50 rounded-xl p-6 border border-white/5">
              <div className="flex items-center gap-3 mb-2">
                <User className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                  User ID
                </h3>
              </div>
              <p className="text-sm font-mono font-medium truncate">
                {user.id}
              </p>
            </div>

            <div className="bg-zinc-800/50 rounded-xl p-6 border border-white/5">
              <div className="flex items-center gap-3 mb-2">
                <User className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                  Account Type
                </h3>
              </div>
              <p className="text-lg font-medium">Google Account</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/home")}
              className="flex-1 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-zinc-200 transition-all"
            >
              Back to Editor
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 px-6 py-3 bg-red-500/10 border-2 border-red-500/30 text-red-400 rounded-full font-semibold hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-400/20 rounded-2xl p-6">
            <div className="text-4xl font-bold text-blue-400 mb-2">0</div>
            <div className="text-zinc-400 font-medium">Code Reviews</div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-400/20 rounded-2xl p-6">
            <div className="text-4xl font-bold text-green-400 mb-2">0</div>
            <div className="text-zinc-400 font-medium">Issues Fixed</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-400/20 rounded-2xl p-6">
            <div className="text-4xl font-bold text-purple-400 mb-2">0</div>
            <div className="text-zinc-400 font-medium">Lines Analyzed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
