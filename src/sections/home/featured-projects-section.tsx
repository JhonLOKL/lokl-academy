"use client";

import React, { useEffect } from "react";
import FeaturedProjects from "@/components/home/featured-projects";
import { getProjectCardsAction } from "@/actions/project-actions";
import { useProjectStore } from "@/store/project-store";

export default function FeaturedProjectsSection() {
  const { projects, isLoading, error } = useProjectStore();

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await getProjectCardsAction();
      
      if (!response.success) {
        console.error("Error al cargar proyectos:", response.error);
      } else {
        console.log("Proyectos cargados desde cache o API:", response.projects.length);
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
      ) : error || projects.length === 0 ? (
        null
      ) : (
        <FeaturedProjects projectsData={projects} />
      )}
    </section>
  );
}


