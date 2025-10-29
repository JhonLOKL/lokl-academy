"use client";

export default function SimulatorSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5352F6] to-[#3a39c4] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 animate-pulse">
        {/* Header skeleton */}
        <div className="space-y-4 mb-8">
          <div className="h-8 bg-white/20 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-white/20 rounded w-1/2 mx-auto"></div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-6">
          {/* Form fields */}
          <div className="space-y-4">
            <div className="h-12 bg-white/20 rounded"></div>
            <div className="h-12 bg-white/20 rounded"></div>
            <div className="h-12 bg-white/20 rounded"></div>
          </div>

          {/* Button skeleton */}
          <div className="h-14 bg-white/20 rounded-xl mt-8"></div>
        </div>

        {/* Loading text */}
        <div className="text-center mt-6 text-white/70 text-sm">
          Cargando simulador...
        </div>
      </div>
    </div>
  );
}

