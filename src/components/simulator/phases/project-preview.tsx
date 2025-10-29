"use client";

import { ProjectCard } from "@/schemas/project-card-schema";
import { MapPin, TrendingUp, Users } from "lucide-react";
import Image from "next/image";

interface ProjectPreviewProps {
  project: ProjectCard;
}

export default function ProjectPreview({ project }: ProjectPreviewProps) {
  const hasValidRent =
    project.minRent > 0 && project.maxRent > 0 && project.unitPrice > 0;

  let rentabilityMin: number;
  let rentabilityMax: number;

  if (hasValidRent) {
    rentabilityMin = project.minRent * 100;
    rentabilityMax = project.maxRent * 100;
  } else {
    rentabilityMin = 6.18;
    rentabilityMax = 14.26;
  }

  return (
    <div className="relative rounded-2xl overflow-hidden h-full min-h-[500px]">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <Image
          src={project.imageURL}
          alt={project.name}
          fill
          className="object-cover opacity-90"
          priority
        />
        {/* Overlay degradado: oscuro abajo -> transparente arriba */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,1)_0%,rgba(15,23,42,0.6)_20%,rgba(15,23,42,0)_30%)]" />
      </div>

      {/* Badge rentabilidad arriba derecha */}
      <div className="absolute top-4 right-4 z-20">
        <div className="inline-flex items-center gap-2 bg-[#5352F6] px-4 py-2 rounded-full text-white">
          <TrendingUp className="w-4 h-4" />
          <span className="font-semibold text-sm">
            {rentabilityMin.toFixed(1)}% - {rentabilityMax.toFixed(1)}% ROI Anual
            Estimado
          </span>
        </div>
      </div>

      {/* Contenido inferior */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-end text-white">
        <div className="space-y-3">
          <h2 className="text-4xl font-bold">{project.name}</h2>

          <div className="flex items-center gap-2 text-white/90">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">
              {project.city}, {project.country}
            </span>
          </div>

          <div className="flex items-center gap-2 text-white/90">
            <Users className="w-5 h-5" />
            <span className="text-lg">
              {project.partners} Inversionistas
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
