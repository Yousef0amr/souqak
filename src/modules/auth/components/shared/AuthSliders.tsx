"use client";

import { useEffect, useState } from "react";

const AUTH_SLIDES = [
  {
    gradient: "from-indigo-950/90 via-slate-950/90 to-black/90",
    title: "Manage Your Business Smarter",
    description: "Track inventory, orders, payments and suppliers — all in one powerful dashboard designed for modern commerce.",
    icon: "🚀",
  },
  {
    gradient: "from-blue-950/90 via-slate-950/90 to-black/90",
    title: "Real-Time Analytics & Insights",
    description: "Make data-driven decisions with live charts, KPI tracking and intelligent business reports at your fingertips.",
    icon: "📊",
  },
  {
    gradient: "from-violet-950/90 via-purple-950/90 to-black/90",
    title: "Seamless Team Collaboration",
    description: "Invite your team, assign roles and permissions, and work together effortlessly across all your business operations.",
    icon: "👥",
  },
];

const AuthSliders = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % AUTH_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const slide = AUTH_SLIDES[current];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105"
        style={{ backgroundImage: 'url("/auth_bg_premium.png")' }}
      />
      
      {/* Deep overlay for text readability and premium aesthetic */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} mix-blend-multiply opacity-90 transition-all duration-1000`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

      {/* Floating decoration blobs */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-12">
        {/* Logo area */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-white font-bold text-xl tracking-wide">Souqak</span>
        </div>

        {/* Slide content */}
        <div className="space-y-8">
          <div
            key={current}
            className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            <div className="text-5xl drop-shadow-md">{slide.icon}</div>
            <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg">
              {slide.title}
            </h2>
            <p className="text-white/85 text-lg leading-relaxed max-w-sm font-light drop-shadow-md">
              {slide.description}
            </p>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-2 pt-2">
            {AUTH_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === current
                    ? "w-8 bg-white"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSliders;
