import React from "react";
import { Users, Zap, Shield } from "lucide-react";

const Card = () => {
  const cardDetails = [
    {
      title: "Deep Code Analysis",
      description:
        "Identifies vulnerabilities, code smells, and performance bottlenecks across your entire codebase.",
      icon: <Users className="w-6 h-6 text-blue-300" />,
    },
    {
      title: "Actionable Reports",
      description:
        "Get detailed reports with clear recommendations to improve code quality and maintainability.",
      icon: <Zap className="w-6 h-6 text-yellow-300" />,
    },
    {
      title: "Fits Your Workflow",
      description:
        "Integrates with popular version control systems and CI/CD pipelines for continuous quality checks.",
      icon: <Shield className="w-6 h-6 text-green-300" />,
    },
  ];

  return (
    <div className="p-8 ">
      <div className="pt-16 flex gap-8 px-12 flex-wrap justify-center ">
        {cardDetails.map((card, index) => (
          <div
            key={index}
            className="w-100 rounded-2xl border border-white/10 bg-zinc-900/60 p-8 backdrop-blur transition hover:border-white/20"
          >
            {/* Icon */}
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-zinc-800">
              {card.icon}
            </div>

            {/* Title */}
            <h3 className="mb-3 text-2xl font-semibold text-white pt-8">
              {card.title}
            </h3>

            {/* Description */}
            <p className="text-sm leading-relaxed text-zinc-400 pt-2">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
