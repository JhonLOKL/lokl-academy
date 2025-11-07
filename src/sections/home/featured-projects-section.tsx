"use client";

import React, { useEffect } from "react";
import FeaturedProjects from "@/components/home/featured-projects";
import { getProjectCardsAction } from "@/actions/project-actions";
import { useProjectStore } from "@/store/project-store";

export default function FeaturedProjectsSection() {
  const { projects, isLoading, error } = useProjectStore();

  useEffect(() => {
    // Dejar que la acción gestione loading/cache internamente
    void getProjectCardsAction();
  }, []);

  return (
    <section id="featured-projects">
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5352F6]"></div>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-500">Error al cargar proyectos: {error}</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-600">No hay proyectos disponibles</p>
        </div>
      ) : (
        <FeaturedProjects projectsData={projects} />
      )}
    </section>
  );
}


