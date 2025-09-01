"use client";

import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface BlogFiltersClientProps {
  availableTags: string[];
}

export default function BlogFiltersClient({ availableTags }: BlogFiltersClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = React.useState<string>(searchParams.get("search") || "");
  const [selectedTags, setSelectedTags] = React.useState<string[]>(() => {
    const t = searchParams.get("tags");
    return t ? t.split(",").map(s => s.trim()).filter(Boolean) : [];
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const apply = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (search && search.trim()) params.set("search", search.trim()); else params.delete("search");
    if (selectedTags.length) params.set("tags", selectedTags.join(",")); else params.delete("tags");
    // forzar orden
    params.set("sortBy", "createdAt");
    params.set("sortOrder", "DESC");
    // reset a primera página si existe
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar..."
          className="rounded-md border px-3 py-2"
        />
        <div className="md:col-span-2 flex flex-wrap gap-2">
          {availableTags.map(tag => {
            const active = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full px-3 py-1 text-sm border ${active ? 'bg-[#5352F6] text-white border-[#5352F6]' : 'bg-white text-[#0F0F0F] hover:bg-[#EAEAFC] hover:text-[#5352F6] border-[#E5E5E5]'}`}
                type="button"
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-3">
        <button onClick={apply} className="rounded-md bg-[#5352F6] px-4 py-2 text-white">Aplicar filtros</button>
      </div>
    </div>
  );
}


