"use client";

import React, { useEffect, useState } from "react";
import FeaturedProjects from "@/components/landing/new-home/featured-projects";
import { getProjectCardsAction } from "@/actions/project-actions";

export default function FeaturedProjectsSection() {
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await getProjectCardsAction();
        
        if (response.success && response.data) {
          console.log("Proyectos cargados:", response.data);
          setProjectsData(response.data);
        } else {
          console.error("Error al cargar proyectos:", response.error || "Respuesta sin datos");
          setError(response.error || "No se pudieron cargar los proyectos");
        }
      } catch (err) {
        console.error("Error al obtener proyectos:", err);
        setError("Error al cargar los proyectos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="featured-projects">
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error || projectsData.length === 0 ? (
        null
      ) : (
        <FeaturedProjects projectsData={projectsData} />
      )}
    </section>
  );
}
