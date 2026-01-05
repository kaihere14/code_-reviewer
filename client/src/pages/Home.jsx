import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HomeNav from "../components/HomeNav";
import useUserStore from "../Zustand/store";
import axios from "axios";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const monaco = useMonaco();
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const setResult = useUserStore((state) => state.setResult);
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // All hooks must be called before any conditional returns
  useEffect(() => {
    if (!monaco) return;

    monaco.editor.defineTheme("pure-black", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "", background: "000000" }, // PURE BLACK
      ],
      colors: {
        "editor.background": "#000000",
        "editor.foreground": "#ffffff",
        "editorLineNumber.foreground": "#666666",
        "editorCursor.foreground": "#ffffff",
        "editor.selectionBackground": "#264f78",
        "editor.lineHighlightBackground": "#0a0a0a",
      },
    });

    monaco.editor.setTheme("pure-black");
  }, [monaco]);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/verify`,
          {
            withCredentials: true,
          }
        );

        setUser(response.data.user);
      } catch (error) {
        navigate("/login");
      }
    };
    verifyUser();
  }, [setUser, navigate]);

  const handleSubmit = async () => {
    console.log("Submitting code for analysis:", code);
    setError(null);
    setIsAnalyzing(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/ai/review`,
        {
          code: code,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Analysis Result:", response.data);
      setResult(response.data);
      navigate("/result");
    } catch (error) {
      console.error("Error analyzing code:", error);
      setError(
        error.response?.data?.message ||
          "Failed to analyze code. Please try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Conditional return AFTER all hooks

  return (
    <div className="h-screen w-screen overflow-hidden bg-zinc-950  text-white">
      <HomeNav />
      <Editor
        height="90vh"
        width="99vw"
        defaultLanguage="javascript"
        defaultValue="// Start coding..."
        className="mt-20 mx-12  p-2 border-white border rounded-xl"
        onChange={(e) => {
          setCode(e);
        }}
      />

      <div className="bottom flex justify-between items-center pl-12 py-4">
        <div className="left">
          <span className="text-zinc-500">Characters: {code.length}</span>
          {error && <span className="text-red-400 ml-4">{error}</span>}
        </div>
        <div className="right">
          <button
            onClick={handleSubmit}
            disabled={isAnalyzing}
            className={`border-2 border-white px-4 py-2 rounded-full transition-all mt-1 mx-12 flex items-center gap-2 ${
              isAnalyzing
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:bg-white hover:text-black"
            }`}
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              "Analyze Code"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
