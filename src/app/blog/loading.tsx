import React from "react";

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="h-52 w-full animate-pulse bg-[#F3F4F6]" />
      <div className="p-6">
        <div className="mb-3 h-4 w-2/3 animate-pulse bg-[#E5E7EB]" />
        <div className="mb-2 h-3 w-full animate-pulse bg-[#F3F4F6]" />
        <div className="mb-2 h-3 w-5/6 animate-pulse bg-[#F3F4F6]" />
        <div className="mt-4 flex items-center gap-3">
          <div className="h-8 w-8 animate-pulse rounded-full bg-[#E5E7EB]" />
          <div className="h-3 w-24 animate-pulse bg-[#F3F4F6]" />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}


