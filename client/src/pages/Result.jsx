import React from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../Zustand/store";
import HomeNav from "../components/HomeNav";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle,
  Shield,
  Zap,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";

const Result = () => {
  const navigate = useNavigate();
  const result = useUserStore((state) => state.result);

  if (!result || !result.review) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center">
        <HomeNav />
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">
            No analysis results found
          </h2>
          <button
            onClick={() => navigate("/home")}
            className="border-2 border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all"
          >
            Back to Editor
          </button>
        </div>
      </div>
    );
  }

  const { review } = result;
  const severityColors = {
    critical: "text-red-400 bg-red-400/10 border-red-400/30",
    high: "text-orange-400 bg-orange-400/10 border-orange-400/30",
    medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
    low: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  };

  const severityIcons = {
    critical: <AlertTriangle className="w-5 h-5" />,
    high: <AlertCircle className="w-5 h-5" />,
    medium: <Info className="w-5 h-5" />,
    low: <Info className="w-5 h-5" />,
  };

  const getRatingColor = (rating) => {
    if (rating >= 9) return "text-green-400";
    if (rating >= 7) return "text-yellow-400";
    if (rating >= 5) return "text-orange-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">
      <HomeNav />

      <div className="max-w-6xl mx-auto px-8 pt-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Editor
          </button>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400">Overall Rating:</span>
            <span
              className={`text-4xl font-bold ${getRatingColor(
                review.overallRating
              )}`}
            >
              {review.overallRating}/10
            </span>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            Analysis Summary
          </h2>
          <p className="text-zinc-300 leading-relaxed">{review.summary}</p>
          <div className="mt-6 flex gap-4">
            <div className="px-4 py-2 rounded-full bg-blue-400/10 border border-blue-400/30">
              <span className="text-blue-400 font-medium">
                Refactoring: {review.estimatedRefactoringEffort}
              </span>
            </div>
          </div>
        </div>

        {/* Issues Section */}
        {review.issues && review.issues.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-400" />
              Issues Found ({review.issues.length})
            </h2>
            <div className="space-y-4">
              {review.issues.map((issue, index) => (
                <div
                  key={index}
                  className={`bg-zinc-900/60 border rounded-xl p-6 ${
                    severityColors[issue.severity]
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {severityIcons[issue.severity]}
                      <div>
                        <h3 className="text-lg font-semibold">{issue.title}</h3>
                        <div className="flex gap-3 mt-1 text-sm">
                          <span className="opacity-70">Line {issue.line}</span>
                          <span className="opacity-70">•</span>
                          <span className="opacity-70 capitalize">
                            {issue.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase border">
                      {issue.severity}
                    </span>
                  </div>
                  <p className="text-zinc-300 mb-3">{issue.description}</p>
                  <div className="bg-zinc-800/50 rounded-lg p-4 mb-3">
                    <p className="text-sm text-zinc-400 mb-1 font-semibold">
                      Suggestion:
                    </p>
                    <p className="text-sm text-zinc-300">{issue.suggestion}</p>
                  </div>
                  <p className="text-sm text-zinc-400">
                    <span className="font-semibold">Impact:</span>{" "}
                    {issue.impact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Strengths Section */}
        {review.strengths && review.strengths.length > 0 && (
          <div className="bg-zinc-900/60 border border-green-400/20 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-green-400">
              <CheckCircle className="w-6 h-6" />
              Strengths ({review.strengths.length})
            </h2>
            <ul className="space-y-3">
              {review.strengths.map((strength, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-zinc-300"
                >
                  <span className="text-green-400 mt-1">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Security & Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {review.securityConcerns && review.securityConcerns.length > 0 && (
            <div className="bg-zinc-900/60 border border-purple-400/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-3 text-purple-400">
                <Shield className="w-5 h-5" />
                Security Concerns
              </h3>
              <ul className="space-y-2">
                {review.securityConcerns.map((concern, index) => (
                  <li key={index} className="text-zinc-300 text-sm">
                    {concern}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {review.performanceIssues && review.performanceIssues.length > 0 && (
            <div className="bg-zinc-900/60 border border-cyan-400/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-3 text-cyan-400">
                <Zap className="w-5 h-5" />
                Performance Issues
              </h3>
              <ul className="space-y-2">
                {review.performanceIssues.map((issue, index) => (
                  <li key={index} className="text-zinc-300 text-sm">
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Recommendations */}
        {review.recommendations && review.recommendations.length > 0 && (
          <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
              Recommendations
            </h2>
            <ul className="space-y-3">
              {review.recommendations.map((rec, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-zinc-300"
                >
                  <span className="text-yellow-400 mt-1 font-bold">
                    {index + 1}.
                  </span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
