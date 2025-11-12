"use client";

import React, { useEffect, useRef } from "react";

const formatNestName = (name: string) =>
  name.replace(/([a-z])([A-Z])/g, "$1 $2").trim();

// Datos de los tipos de nidos
const nidosTypes = [
  {
    name: "Shared",
    iconLink:
      "https://lokl-assets.s3.us-east-1.amazonaws.com/property-page/indie-universe/icon-shared.svg",
    roomCount: 14,
    squareMeters: 19,
    bedCount: 2,
    value: 116667
  },
  {
    name: "Single",
    iconLink:
      "https://lokl-assets.s3.us-east-1.amazonaws.com/property-page/indie-universe/icon-single.svg",
    roomCount: 50,
    squareMeters: 15,
    bedCount: 1,
    value: 150000
  },
  {
    name: "Duo",
    iconLink:
      "https://lokl-assets.s3.us-east-1.amazonaws.com/property-page/indie-universe/icon-duoble.svg",
    roomCount: 30,
    squareMeters: 19,
    bedCount: 2,
    value: 180000
  },
  {
    name: "Suite",
    iconLink:
      "https://lokl-assets.s3.us-east-1.amazonaws.com/property-page/indie-universe/icon-suite.svg",
    roomCount: 4,
    squareMeters: 36,
    bedCount: 1,
    value: 400000
  }
];

// Lista de características de los nidos
const nidosList = [
  {
    name: "Content Labs",
    iconLink:
      "https://lokl-assets.s3.us-east-1.amazonaws.com/property-page/indie-universe/icon-lab-indie.png",
    description:
      "Laboratorio creativo equipado para producción multimedia y contenido digital."
  },
  {
    name: "Cafetería",
    iconLink:
      "https://lokl-assets.s3.us-east-1.amazonaws.com/property-page/indie-universe/icon-cafe-indie.png",
    description:
      "Cafetería con opciones gourmet para disfrutar en un ambiente relajado."
  },
  {
    name: "Coworking",
    iconLink:
      "https://lokl-assets.s3.us-east-1.amazonaws.com/property-page/indie-universe/icon-coworking-indie.png",
    description:
      "Espacio de trabajo colaborativo con todas las facilidades para startups y freelancers."
  }
];

export function Nidos() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const container = scrollContainerRef.current;
      if (!container) return;

      event.preventDefault();
      const x = event.pageX;
      const walk = x - startXRef.current;
      container.scrollLeft = scrollLeftRef.current - walk;
    };

    const handleMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      const container = scrollContainerRef.current;
      if (container) {
        container.classList.remove("cursor-grabbing");
        container.classList.add("cursor-grab");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseUp);
    };
  }, []);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    event.preventDefault();
    isDraggingRef.current = true;
    startXRef.current = event.pageX;
    scrollLeftRef.current = container.scrollLeft;

    container.classList.remove("cursor-grab");
    container.classList.add("cursor-grabbing");
  };

  return (
    <div className="w-full" id="businessLines">
      <div className="w-full text-center mb-8">
        <h2 className="text-[24px] font-epilogue font-extrabold mb-8 w-3/4 mx-auto">
          Sumérgete en una experiencia que transforma a quien la vive
        </h2>
      </div>

      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        className="flex gap-3 w-full mb-12 overflow-x-auto pb-4 scrollbar-hide cursor-grab select-none"
      >
        {nidosTypes.map((nido) => {
          const displayName = formatNestName(nido.name);
          return (
            <div 
              key={nido.name} 
              className="border border-gray-200 rounded-xl flex px-5 py-4 items-center justify-center flex-grow min-w-fit bg-white"
            >
              <div className="mr-4 w-12 h-12 flex items-center justify-center">
                <img
                  src={nido.iconLink}
                  alt={displayName}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-gray-600 text-sm">{displayName}</p>
                <p className="text-gray-500 text-sm">
                  {nido.squareMeters} m² · {nido.roomCount} habitaciones
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-5 flex flex-col gap-5">
        {nidosList.map((nido) => {
          return (
            <div className="flex items-center" key={nido.name}>
              <div className="flex-shrink-0 w-10 h-10 mr-10">
                <img src={nido.iconLink} alt={nido.name} className="w-full h-full object-contain" />
              </div>
              <p className="text-gray-500 font-epilogue">
                <span className="text-2xl font-bold text-gray-800">{nido.name}: </span>
                {nido.description}
              </p>
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}


