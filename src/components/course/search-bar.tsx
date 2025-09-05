"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/course/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar cursos, temas o instructores..."
          className="h-12 w-full rounded-lg border border-[#E5E5E5] bg-white pl-4 pr-12 text-base placeholder:text-[#919090] focus:border-[#5352F6] focus:outline-none focus:ring-1 focus:ring-[#5352F6]"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 flex h-full items-center justify-center px-4 text-[#6D6C6C] hover:text-[#5352F6]"
          aria-label="Buscar"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
