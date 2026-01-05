import React from "react";
import { Check } from "lucide-react";

const Pricing = () => {
  const pricingPlans = [
    {
      name: "Free",
      subtitle: "for solo developers",
      price: 0,
      features: [
        "AI-powered code reviews (limited)",
        "Up to 3 repositories",
        "Basic issue detection",
        "Public repositories only",
      ],
      highlighted: false,
    },
    {
      name: "Pro",
      subtitle: "for growing teams",
      price: 19,
      features: [
        "Unlimited AI code reviews",
        "Private repositories",
        "Inline review comments",
        "Code quality & performance insights",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      subtitle: "for large teams & orgs",
      price: 79,
      features: [
        "Advanced security & vulnerability analysis",
        "Role-based access control",
        "Audit logs & compliance reports",
        "Priority support & custom integrations",
      ],
      highlighted: false,
    },
  ];

  return (
    <div id="price" className="min-h-screen w-full  text-white pt-10 md:py-20 px-8 relative overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-10 md:mb-20">
        <div className="flex justify-between items-start">
          <div>
            <div className="inline-block mb-4 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10">
              <span className="text-cyan-400 text-sm font-medium">
                Coming Soon
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-light mb-4">
              Choose your <br />
              <span className="italic font-serif">best plan</span>
            </h1>
          </div>
          <div className=" hidden md:flex  text-right max-w-md ">
            <p className="text-zinc-400 text-lg leading-relaxed">
              Fair terms for individuals, teams, and
              <br />
              enterprises—pay only for what you use.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 md:px-4">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-3xl p-10 transition-all duration-300 ${
              plan.highlighted
                ? "bg-cyan-100 text-black scale-105 shadow-2xl"
                : "bg-zinc-900/60 border border-white/10 hover:border-white/20"
            }`}
          >
            {/* Plan Name */}
            <h3
              className={`text-3xl font-semibold mb-2 ${
                plan.highlighted ? "text-black" : "text-white"
              }`}
            >
              {plan.name}
            </h3>
            <p
              className={`text-sm mb-8 ${
                plan.highlighted ? "text-black/70" : "text-zinc-400"
              }`}
            >
              {plan.subtitle}
            </p>

            {/* Features */}
            <ul className="space-y-4 mb-10">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className={`text-lg ${
                      plan.highlighted ? "text-black" : "text-white"
                    }`}
                  >
                    •
                  </span>
                  <span
                    className={`text-sm ${
                      plan.highlighted ? "text-black/80" : "text-zinc-300"
                    }`}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* Price */}
            <div className="mb-8">
              <span
                className={`text-5xl font-bold ${
                  plan.highlighted ? "text-black" : "text-white"
                }`}
              >
                ${plan.price}
              </span>
              <span
                className={`text-lg ml-2 ${
                  plan.highlighted ? "text-black/70" : "text-zinc-400"
                }`}
              >
                /month
              </span>
            </div>

            {/* CTA Button */}
            <button
              disabled
              className={`w-full py-4 rounded-full font-medium transition-all cursor-not-allowed opacity-60 ${
                plan.highlighted
                  ? "bg-black text-white"
                  : "border border-white/20 text-white"
              }`}
            >
              Coming Soon
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
