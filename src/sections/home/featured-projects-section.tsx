"use client";

import React, { useEffect } from "react";
import FeaturedProjects from "@/components/home/featured-projects";
import { getProjectCardsAction } from "@/actions/project-actions";
import { useProjectStore } from "@/store/project-store";

export default function FeaturedProjectsSection() {
  const { projects, isLoading, error, setLoading, setProjects, setError } = useProjectStore();

  useEffect(() => {
    const fetchProjects = async () => {
      // Si ya hay proyectos cargados, no hacer nada
      if (projects.length > 0) {
        console.log("Proyectos ya cargados:", projects.length);
        return;
      }

      // Si ya está cargando, no hacer nada
      if (isLoading) {
        console.log("Ya está cargando...");
        return;
      }

      console.log("Fetching proyectos...");
      setLoading(true);

      try {
        const response = await getProjectCardsAction();
        
        if (!response.success) {
          console.error("Error al cargar proyectos:", response.error);
          setError(response.error || "Error al cargar proyectos");
        } else {
          console.log("Proyectos cargados exitosamente:", response.projects?.length || 0);
          setProjects(response.projects || []);
        }
      } catch (err) {
        console.error("Error en fetchProjects:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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


