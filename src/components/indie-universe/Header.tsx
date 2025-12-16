"use client";

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { Star, Play, Eye, Calculator, Info, X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import type { ProjectHomePageInfo } from '@/services/projectService';

const getEndOfMonth = () => {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  return `${lastDay.getDate()} de ${months[lastDay.getMonth()]} de ${lastDay.getFullYear()}`;
};

const dynamicValidUntil = getEndOfMonth();

// Datos base por defecto
const DEFAULT_PROJECT_DATA = {
  tag: "Operando",
  name: "Indie Universe",
  location: "Laureles, Medellín",
  rating: 5.0,
  estimatedReturn: "10 - 12% E.A",
  valuePerUnit: "$  133.000",
  totalInvestors: 644,
  minInvestment: "$5.320.000",
  minInvestmentPeriod: "",
  validUntil: dynamicValidUntil,
  totalInvestment: "$ 3.993.937.671 COP",
  availableSlots: {
    current: "18",
    total: "20"
  },
  viewers: 2,
  videoUrl: "https://www.youtube.com/embed/VogBkJMkJhY?autoplay=1&start=2",
  description: "Indie es un universo de espacios y experiencias para creadores independientes, se encuentra ubicado en Laureles, Medellín uno de los sectores de la ciudad con más alta inspiración creativa. Sus espacios de coliving tienen estudios privados donde podrás relajarte y descansar, además cuenta con áreas comunes que fueron diseñadas estratégicamente para conectar e inspirar a la comunidad creativa.",
  features: {
    area: "4.360m²",
    cabins: "98 alojamientos",
    trees: "$211.667 Promedio Alojamiento"
  },
  videoQuote: "Creemos que la vida es una sola, para solo vivirla los fines de semana.",
  stages: [
    {
      month: "Octubre",
      price: "$129.000 x Unit",
      validUntil: "Hasta el 2025-11-01"
    },
    {
      month: "Noviembre",
      price: "$129.250 x Unit",
      validUntil: "Hasta el 2025-12-01"
    }
  ],
  images: {
    hero: "https://lokl-assets.s3.us-east-1.amazonaws.com/indie-universe/img_indie_property.jpg",
    preview: "https://lokl-assets.s3.us-east-1.amazonaws.com/indie-universe/wellness/wellness_c_1.jpg",
    gallery: [
      "https://lokl-assets.s3.us-east-1.amazonaws.com/indie-universe/filmmaker/filmmaker_c_6.jpg",
      "https://lokl-assets.s3.us-east-1.amazonaws.com/indie-universe/gamer/gamer_c_1.jpg",
      "https://lokl-assets.s3.us-east-1.amazonaws.com/indie-universe/filmmaker/filmmaker_c_3.jpg",
      "https://lokl-assets.s3.us-east-1.amazonaws.com/indie-universe/music/music_c_1.jpg",
      "https://lokl-assets.s3.us-east-1.amazonaws.com/indie-universe/wellness/wellness_c_1.jpg",
    ],
  },
};

const INVEST_URL = "https://dashboard.lokl.life/checkout/invest?projectId=c3f50b31-1e1b-4ebe-881e-0d390458f471";
const numberFormatter = new Intl.NumberFormat("es-CO", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const percentageFormatter = new Intl.NumberFormat("es-CO", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

const formatNumber = (value: number) => numberFormatter.format(value);
const toPercentValue = (value: number) => (value > 1 ? value : value * 100);

type ProjectData = typeof DEFAULT_PROJECT_DATA;

type HeaderProps = {
  homeInfo?: ProjectHomePageInfo | null;
  isLoading?: boolean;
  error?: string | null;
};

type AnyRecord = Record<string, unknown>;

const cloneProjectData = (): ProjectData => ({
  ...DEFAULT_PROJECT_DATA,
  availableSlots: { ...DEFAULT_PROJECT_DATA.availableSlots },
  features: { ...DEFAULT_PROJECT_DATA.features },
  stages: DEFAULT_PROJECT_DATA.stages.map((stage) => ({ ...stage })),
  images: {
    hero: DEFAULT_PROJECT_DATA.images.hero,
    preview: DEFAULT_PROJECT_DATA.images.preview,
    gallery: [...DEFAULT_PROJECT_DATA.images.gallery],
  },
});

const ensureRecord = (value: unknown): AnyRecord | null =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as AnyRecord)
    : null;

const ensureString = (value: unknown): string | null => {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return `${value}`;
  }

  return null;
};

const ensureNumber = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const normalised = value.replace(/[^0-9.,-]/g, "").replace(/,/g, ".");
    if (normalised.length === 0) {
      return null;
    }

    const parsed = Number(normalised);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
};

const formatCurrencyValue = (value: unknown, fallback: string): string => {
  const numericValue = ensureNumber(value);
  if (numericValue !== null) {
    return currencyFormatter.format(numericValue);
  }

  const stringValue = ensureString(value);
  return stringValue ?? fallback;
};

const formatSlotValue = (value: unknown, fallback: string): string => {
  const numericValue = ensureNumber(value);
  if (numericValue !== null) {
    return formatNumber(Math.max(Math.round(numericValue), 0));
  }

  const stringValue = ensureString(value);
  return stringValue ?? fallback;
};

const formatRentRange = (
  minRent: unknown,
  maxRent: unknown,
  fallback: string
): string => {
  const minValue = ensureNumber(minRent);
  const maxValue = ensureNumber(maxRent);

  if (minValue !== null && maxValue !== null) {
    const minPercent = percentageFormatter.format(toPercentValue(minValue));
    const maxPercent = percentageFormatter.format(toPercentValue(maxValue));
    return `${minPercent} - ${maxPercent}% E.A`;
  }

  if (minValue !== null) {
    const percent = percentageFormatter.format(toPercentValue(minValue));
    return `${percent}% E.A`;
  }

  if (maxValue !== null) {
    const percent = percentageFormatter.format(toPercentValue(maxValue));
    return `${percent}% E.A`;
  }

  return fallback;
};

const ensureStringArray = (value: unknown): string[] | null => {
  if (Array.isArray(value)) {
    const arr = value
      .map((item) => ensureString(item))
      .filter((item): item is string => typeof item === "string" && item.length > 0);

    return arr.length > 0 ? arr : null;
  }

  const single = ensureString(value);
  return single ? [single] : null;
};

const pickString = (source: AnyRecord, keys: string[]): string | null => {
  for (const key of keys) {
    const value = ensureString(source[key]);
    if (value) {
      return value;
    }
  }

  return null;
};

const pickNumber = (source: AnyRecord, keys: string[]): number | null => {
  for (const key of keys) {
    const value = ensureNumber(source[key]);
    if (value !== null) {
      return value;
    }
  }

  return null;
};

const pickRecord = (source: AnyRecord, keys: string[]): AnyRecord | null => {
  for (const key of keys) {
    const record = ensureRecord(source[key]);
    if (record) {
      return record;
    }
  }

  return null;
};

const pickRecordArray = (source: AnyRecord, keys: string[]): AnyRecord[] | null => {
  for (const key of keys) {
    const value = source[key];
    if (Array.isArray(value)) {
      const records = value
        .map((item) => ensureRecord(item))
        .filter((item): item is AnyRecord => Boolean(item));

      if (records.length > 0) {
        return records;
      }
    }
  }

  return null;
};

const pickStringArray = (source: AnyRecord, keys: string[]): string[] | null => {
  for (const key of keys) {
    const arr = ensureStringArray(source[key]);
    if (arr && arr.length > 0) {
      return arr;
    }
  }

  return null;
};

const flattenHomeInfo = (data: ProjectHomePageInfo): AnyRecord => {
  const base = { ...data } as AnyRecord;

  Object.values(data).forEach((value) => {
    const record = ensureRecord(value);
    if (record) {
      Object.entries(record).forEach(([key, nestedValue]) => {
        if (base[key] === undefined) {
          base[key] = nestedValue;
        }
      });
    }
  });

  return base;
};

const mapHomeInfoToProjectData = (
  homeInfo?: ProjectHomePageInfo | null
): ProjectData => {
  if (!homeInfo || typeof homeInfo !== "object") {
    return cloneProjectData();
  }

  const flattened = flattenHomeInfo(homeInfo);
  const projectData = cloneProjectData();

  projectData.tag =
    pickString(flattened, ["tag", "projectTag", "status"]) ?? projectData.tag;

  projectData.name =
    pickString(flattened, ["name", "projectName", "title"]) ?? projectData.name;

  projectData.location =
    pickString(flattened, ["location", "projectLocation", "city"]) ??
    projectData.location;

  const rating = pickNumber(flattened, ["rating", "projectRating", "score"]);
  if (rating !== null) {
    projectData.rating = Number(rating.toFixed(1));
  }

  projectData.estimatedReturn =
    pickString(flattened, ["estimatedReturn", "expectedReturn", "returnRange"]) ??
    projectData.estimatedReturn;

  projectData.valuePerUnit =
    pickString(flattened, ["valuePerUnit", "unitValue", "unitPrice"]) ??
    projectData.valuePerUnit;

  const totalInvestors = pickNumber(flattened, [
    "totalInvestors",
    "investors",
    "investorsCount",
  ]);
  if (totalInvestors !== null) {
    projectData.totalInvestors = Math.max(Math.round(totalInvestors), 0);
  }

  projectData.minInvestment =
    pickString(flattened, [
      "minInvestment",
      "minimumInvestment",
      "investmentFrom",
      "minAmountInvestment",
    ]) ?? projectData.minInvestment;

  projectData.minInvestmentPeriod =
    pickString(flattened, [
      "minInvestmentPeriod",
      "investmentPeriod",
      "paymentFrequency",
    ]) ?? projectData.minInvestmentPeriod;

  projectData.validUntil =
    pickString(flattened, ["validUntil", "offerValidUntil", "deadline"]) ??
    projectData.validUntil;

  projectData.totalInvestment =
    pickString(flattened, ["totalInvestment", "fundraisingGoal", "totalRaise"]) ??
    projectData.totalInvestment;

  const viewers = pickNumber(flattened, ["viewers", "liveViewers", "currentViewers"]);
  if (viewers !== null) {
    projectData.viewers = Math.max(Math.round(viewers), 0);
  }

  projectData.videoUrl =
    pickString(flattened, ["videoUrl", "video", "videoSrc"]) ?? projectData.videoUrl;

  projectData.description =
    pickString(flattened, ["description", "summary", "shortDescription"]) ??
    projectData.description;

  projectData.videoQuote =
    pickString(flattened, ["videoQuote", "quote", "highlightQuote"]) ??
    projectData.videoQuote;

  const featuresRecord = pickRecord(flattened, [
    "features",
    "projectFeatures",
    "highlights",
  ]);
  if (featuresRecord) {
    projectData.features = {
      ...projectData.features,
      area:
        pickString(featuresRecord, ["area", "surface", "areaLabel"]) ??
        projectData.features.area,
      cabins:
        pickString(featuresRecord, ["cabins", "units", "rooms"]) ??
        projectData.features.cabins,
      trees:
        pickString(featuresRecord, ["trees", "thirdHighlight", "highlight"]) ??
        projectData.features.trees,
    };
  } else {
    const area = pickString(flattened, ["area", "surface"]);
    if (area) {
      projectData.features.area = area;
    }

    const cabins = pickString(flattened, ["cabins", "units"]);
    if (cabins) {
      projectData.features.cabins = cabins;
    }

    const trees = pickString(flattened, ["trees", "highlight"]);
    if (trees) {
      projectData.features.trees = trees;
    }
  }

  const slotsRecord = pickRecord(flattened, ["availableSlots", "slots", "quota"]);
  if (slotsRecord) {
    projectData.availableSlots = {
      current:
        pickString(slotsRecord, [
          "current",
          "available",
          "currentSlots",
          "availableSlots",
          "availableSpots",
        ]) ?? projectData.availableSlots.current,
      total:
        pickString(slotsRecord, ["total", "max", "totalSlots", "totalSpots"]) ??
        projectData.availableSlots.total,
    };
  } else {
    const currentSlots =
      pickString(flattened, [
        "availableSlots",
        "currentSlots",
        "available",
        "availableSpots",
      ]) ??
      projectData.availableSlots.current;
    const totalSlots =
      pickString(flattened, ["totalSlots", "quotaTotal", "totalSpots"]) ??
      projectData.availableSlots.total;

    projectData.availableSlots = {
      current: currentSlots,
      total: totalSlots,
    };
  }

  projectData.minInvestment = formatCurrencyValue(
    flattened["minAmountInvestment"] ?? flattened["minInvestment"],
    projectData.minInvestment
  );

  projectData.valuePerUnit = formatCurrencyValue(
    flattened["unitPrice"] ?? flattened["valuePerUnit"],
    projectData.valuePerUnit
  );

  projectData.totalInvestment = formatCurrencyValue(
    flattened["totalInvestment"],
    projectData.totalInvestment
  );

  projectData.availableSlots.current = formatSlotValue(
    flattened["availableSpots"],
    projectData.availableSlots.current
  );

  projectData.availableSlots.total = formatSlotValue(
    flattened["totalSpots"],
    projectData.availableSlots.total
  );

  projectData.estimatedReturn = formatRentRange(
    flattened["minRent"],
    flattened["maxRent"],
    projectData.estimatedReturn
  );

  const imagesRecord = pickRecord(flattened, ["images", "media", "projectImages"]);
  if (imagesRecord) {
    projectData.images = {
      hero:
        pickString(imagesRecord, ["hero", "heroImage", "main", "cover"]) ??
        projectData.images.hero,
      preview:
        pickString(imagesRecord, ["preview", "previewImage", "secondary"]) ??
        projectData.images.preview,
      gallery:
        pickStringArray(imagesRecord, ["gallery", "galleryImages", "carousel"]) ??
        projectData.images.gallery,
    };
  } else {
    const hero = pickString(flattened, ["hero", "heroImage", "heroImageUrl"]);
    if (hero) {
      projectData.images.hero = hero;
    }

    const preview = pickString(flattened, ["preview", "previewImage", "thumbnail"]);
    if (preview) {
      projectData.images.preview = preview;
    }

    const gallery =
      pickStringArray(flattened, ["gallery", "galleryImages", "carousel"]) ??
      pickStringArray(flattened, ["mediaGallery"]);
    if (gallery && gallery.length > 0) {
      projectData.images.gallery = gallery;
    }
  }

  const rawStages = pickRecordArray(flattened, [
    "stages",
    "pricingStages",
    "priceStages",
  ]);
  if (rawStages) {
    const mappedStages = rawStages
      .map((stageRecord, index) => {
        const month =
          pickString(stageRecord, ["month", "label", "name"]) ??
          projectData.stages[index]?.month ??
          `Etapa ${index + 1}`;
        const price =
          pickString(stageRecord, ["price", "unitPrice", "value"]) ??
          projectData.stages[index]?.price ??
          "";
        const validUntil =
          pickString(stageRecord, ["validUntil", "until", "deadline"]) ??
          projectData.stages[index]?.validUntil ??
          "";

        if (!month && !price && !validUntil) {
          return null;
        }

        return {
          month,
          price,
          validUntil,
        };
      })
      .filter((stage): stage is ProjectData["stages"][number] => Boolean(stage));

    if (mappedStages.length > 0) {
      projectData.stages = mappedStages;
    }
  }

  return projectData;
};

export default function Header({
  homeInfo,
  isLoading = false
}: HeaderProps) {
  const [videoActive, setVideoActive] = useState<"desktop" | "mobile" | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showSecondaryMarketInfo, setShowSecondaryMarketInfo] = useState(false);
  const projectData = useMemo(
    () => mapHomeInfoToProjectData(homeInfo),
    [homeInfo]
  );
  const galleryLength = projectData.images.gallery.length;
  const remainingGallery = Math.max(galleryLength - 1, 0);

  if (isLoading) {
    return (
      <header className="w-full flex flex-col items-start space-y-8">
        <div className="h-8 w-32 rounded bg-slate-200 animate-pulse" />

        <div className="w-full flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 space-y-6">
            <div className="space-y-3">
              <div className="h-10 w-2/3 rounded bg-slate-200 animate-pulse" />
              <div className="h-6 w-40 rounded bg-slate-200 animate-pulse" />
            </div>

            <div className="hidden lg:flex gap-6">
              <div className="h-16 w-40 rounded bg-slate-200 animate-pulse" />
              <div className="h-16 w-32 rounded bg-slate-200 animate-pulse" />
              <div className="h-16 w-32 rounded bg-slate-200 animate-pulse" />
            </div>

            <div className="hidden lg:block h-80 rounded-xl bg-slate-200 animate-pulse" />
            <div className="hidden lg:flex gap-3">
              <div className="h-28 w-3/5 rounded-lg bg-slate-200 animate-pulse" />
              <div className="h-28 w-2/5 rounded-lg bg-slate-200 animate-pulse" />
            </div>
            <div className="hidden lg:block h-4 w-3/4 rounded bg-slate-200 animate-pulse" />
          </div>

          <div className="flex-1 space-y-6">
            <div className="hidden lg:block space-y-4">
              <div className="h-8 w-1/2 rounded bg-slate-200 animate-pulse" />
              <div className="h-28 w-full rounded-lg bg-slate-200 animate-pulse" />
            </div>

            <div className="hidden lg:block h-36 w-full rounded-lg bg-slate-200 animate-pulse" />
            <div className="hidden lg:block h-12 w-48 rounded-full bg-slate-200 animate-pulse" />
            <div className="hidden lg:block h-6 w-64 rounded bg-slate-200 animate-pulse" />
          </div>
        </div>

        <div className="lg:hidden w-full space-y-6">
          <div className="h-60 w-full rounded-xl bg-slate-200 animate-pulse" />
          <div className="flex gap-3">
            <div className="h-28 w-3/4 rounded-lg bg-slate-200 animate-pulse" />
            <div className="h-28 w-1/4 rounded-lg bg-slate-200 animate-pulse" />
          </div>
          <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
          <div className="flex gap-4">
            <div className="h-16 flex-1 rounded-lg bg-slate-200 animate-pulse" />
            <div className="h-16 flex-1 rounded-lg bg-slate-200 animate-pulse" />
            <div className="h-16 flex-1 rounded-lg bg-slate-200 animate-pulse" />
          </div>
          <div className="h-24 w-full rounded-lg bg-slate-200 animate-pulse" />
          <div className="h-12 w-full rounded-full bg-slate-200 animate-pulse" />
        </div>
      </header>
    );
  }

  const handleGoToSimulator = () => {
    const simulator = document.getElementById('simulator');
    if (simulator) {
      simulator.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleGoToBuy = () => {
    window.location.href = INVEST_URL;
  };

  const openGallery = (index = 0) => {
    setActiveImage(index);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
  };

  const handlePrev = () => {
    if (galleryLength === 0) return;

    setActiveImage((prev) =>
      (prev - 1 + galleryLength) %
      galleryLength
    );
  };

  const handleNext = () => {
    if (galleryLength === 0) return;

    setActiveImage((prev) =>
      (prev + 1) % galleryLength
    );
  };

  return (
    <header className="w-full flex flex-col items-start space-y-8">
      {/* Tag de estado */}
      <div className="flex bg-[#00F0B5] text-[#3533FF] font-medium px-3 py-2 rounded">
        <div className="ml-2">{projectData.tag}</div>
      </div>

      {/* Mensaje de error omitido para evitar mostrar aviso adicional */}

      {/* Título y métricas (Desktop) */}
      <div className="lg:w-3/5 flex flex-col lg:flex-row justify-between items-center space-x-10">
        <div>
          <h2 className="font-bold text-3xl md:text-4xl mb-2">{projectData.name}</h2>
          <div className="flex items-center font-medium gap-2 text-sm md:text-base">
            <p>
              <span className="font-bold">{projectData.location}</span>
            </p>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <p>{projectData.rating}</p>
            </div>
          </div>
        </div>

        {/* Métricas Desktop */}
        <div className="hidden lg:flex justify-between items-end gap-8">
          <div className="text-center relative">
            <div className="flex items-center gap-1 justify-center">
              <p className="text-2xl font-semibold">{projectData.estimatedReturn}</p>
              <button
                onClick={() => setShowDisclaimer(!showDisclaimer)}
                className="cursor-pointer"
              >
                <Info className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <p className="text-sm">Retorno Estimado</p>
          </div>

          <div className="text-center">
            <p className="font-bold text-xl">{projectData.valuePerUnit}</p>
            <p className="text-sm">Valor $ por Unit</p>
          </div>

          <div className="text-center">
            <p className="font-bold text-xl">{formatNumber(projectData.totalInvestors)}</p>
            <p className="text-sm">Inversionistas</p>
          </div>
        </div>
      </div>

      {/* Contenido principal: Video/Imágenes y Descripción */}
      <div className="flex w-full flex-col lg:flex-row gap-8">
        {/* Sección de imágenes/video (Desktop) */}
        <div className="hidden lg:block lg:w-3/5">
          <div className="mb-3 relative aspect-video rounded-lg overflow-hidden">
            {videoActive === 'desktop' ? (
              <iframe
                width="100%"
                height="100%"
                src={projectData.videoUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="rounded-lg"
              ></iframe>
            ) : (
              <>
                <Image
                  src={projectData.images.hero}
                  alt={`Imagen principal del proyecto ${projectData.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  priority
                />
                <div
                  className="absolute top-0 left-0 w-full h-full flex flex-col justify-between text-white p-8 font-semibold cursor-pointer z-10 bg-black/20"
                  onClick={() => setVideoActive('desktop')}
                >
                  <div className="text-xl font-semibold">
                    {projectData.videoQuote}
                  </div>

                  <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                    <div className="bg-white/20 rounded-full p-4 hover:bg-white/30 transition">
                      <Play className="w-12 h-12" fill="white" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-10">
                    <div className="text-lg font-semibold">{projectData.features.area}</div>
                    <div className="text-lg font-semibold">{projectData.features.cabins}</div>
                    <div className="text-lg font-semibold">{projectData.features.trees}</div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between gap-2 mb-3">
            <button
              type="button"
              onClick={() => openGallery(0)}
              className="w-[68%] h-32 relative rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5452F6]"
            >
              <Image
                src={projectData.images.preview}
                alt={`Vista previa del proyecto ${projectData.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </button>
            <button
              type="button"
              onClick={() => openGallery(1)}
              className="w-[32%] relative cursor-pointer rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5452F6]"
            >
              {projectData.images.gallery.length > 0 && (
                <Image
                  src={projectData.images.gallery[0]}
                  alt={`Galería del proyecto ${projectData.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 20vw"
                  className="object-cover"
                />
              )}
              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white z-10">
                {remainingGallery > 0 && (
                  <div className="text-4xl font-semibold">+{remainingGallery}</div>
                )}
                <div className="font-light underline text-sm">Ver más fotos</div>
              </div>
            </button>
          </div>

          <div className="my-3">
            <p className="text-xs text-gray-500">
              *Las imágenes son ilustrativas y no tienen valor contractual. Pueden haber cambios en dimensiones, materiales y colores. Los elementos decorativos no están incluidos.
            </p>
          </div>
        </div>

        {/* Descripción y tabs (Desktop) */}
        <Tabs defaultValue="investment" className="hidden lg:block lg:w-2/5 space-y-7">
          <div>
            <h2 className="font-bold text-xl mb-3">¿Qué es Indie Universe?</h2>
            <p className="text-[#5B5B5B]">{projectData.description}</p>
          </div>

          <div>
            <h2 className="font-bold text-xl mb-3">¿A partir de qué monto puedo invertir?</h2>
            <div className="flex justify-between items-start relative">
              <div>
                <div className="font-bold text-4xl">
                  {projectData.minInvestment} <span className="text-lg">{projectData.minInvestmentPeriod}</span>
                </div>
                <div className="text-[#5452F6] font-light underline text-sm mt-1">
                  Válido hasta el {projectData.validUntil}
                </div>
              </div>
              <button
                onClick={handleGoToSimulator}
                className="w-16 h-16 flex justify-center items-center bg-green-500 rounded-full cursor-pointer hover:bg-green-600 transition"
              >
                <Calculator className="w-8 h-8 text-white" />
              </button>
            </div>
          </div>

          <div
            className={`rounded-md bg-[#DDE4FF] px-4 py-3 text-gray-800 transition-all ${
              showSecondaryMarketInfo ? 'w-full' : 'max-w-[320px]'
            }`}
          >
            <button
              type="button"
              onClick={() => setShowSecondaryMarketInfo((prev) => !prev)}
              className="flex w-full items-center justify-between gap-3 font-medium text-sm"
            >
              <span className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#5452F6]" />
                <span
                  className={`font-semibold transition-all ${showSecondaryMarketInfo ? 'text-sm max-w-none whitespace-normal' : 'text-xs max-w-none whitespace-normal'}`}
                >
                  ¡Mercado secundario disponible!
                </span>
              </span>
              {showSecondaryMarketInfo ? (
                <ChevronUp className="w-4 h-4 text-gray-700" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-700" />
              )}
            </button>
            {showSecondaryMarketInfo && (
              <p className="mt-2 text-xs leading-relaxed text-gray-700 font-medium">
                El mercado secundario de LOKL te permite comprar participaciones de otros inversionistas en proyectos ya en curso. Es una oportunidad única para sumarte a un proyecto avanzado, aprovechar su valorización y obtener rendimientos en menor tiempo.
              </p>
            )}
          </div>

          <TabsContent value="investment" className="space-y-4">
            <div className="font-semibold text-lg">
              {projectData.totalInvestment}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-6xl text-gray-800">
                  {projectData.availableSlots.current}
                </span>
                <span className="font-bold text-4xl text-gray-400">
                  /{projectData.availableSlots.total}
                </span>
              </div>
              <p className="text-sm text-gray-600 ml-auto flex-shrink-0 max-w-[60%] text-left">
                Cupos disponibles antes de que suba el precio por unit. ¡No te quedes por fuera!
              </p>
            </div>
          </TabsContent>

          <TabsContent value="stages" className="flex space-x-4">
            {projectData.stages.map((stage, index) => (
              <div key={index} className="bg-[#F6F6F6] py-3 px-4 rounded">
                <div className="font-roboto text-sm font-semibold mb-1">{stage.month}</div>
                <div className="font-roboto text-sm font-medium mb-1">{stage.price}</div>
                <div className="text-[#5452F6] text-xs">{stage.validUntil}</div>
              </div>
            ))}
          </TabsContent>

          <button
            onClick={handleGoToBuy}
            className="inline-flex items-center justify-center bg-[#0F172A] text-white py-3.5 px-10 rounded-full font-semibold text-base hover:bg-[#111C2F] transition"
          >
            Quiero ser socio
          </button>

          <div className="flex gap-2 items-center">
            <Eye className="w-5 h-5 text-[#5452F6]" />
            <p className="text-[#3533FF] font-medium text-lg">
              {projectData.viewers} personas viendo este proyecto
            </p>
          </div>
        </Tabs>
      </div>

      {/* Sección de imágenes/video (Mobile) */}
      <div className="lg:hidden w-full space-y-4">
        <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
          {videoActive === 'mobile' ? (
            <iframe
              width="100%"
              height="100%"
              src={projectData.videoUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="rounded-lg"
            ></iframe>
          ) : (
            <>
              <Image
                src={projectData.images.hero}
                alt={`Imagen principal del proyecto ${projectData.name}`}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              <div
                className="absolute top-0 left-0 w-full h-full flex flex-col justify-between text-white p-6 font-semibold cursor-pointer z-10 bg-black/25"
                onClick={() => setVideoActive('mobile')}
              >
                <div className="text-lg font-semibold">
                  {projectData.videoQuote}
                </div>

                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                  <div className="bg-white/20 rounded-full p-3 hover:bg-white/30 transition">
                    <Play className="w-10 h-10" fill="white" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm font-medium">
                  <div>{projectData.features.area}</div>
                  <div>{projectData.features.cabins}</div>
                  <div>{projectData.features.trees}</div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between gap-2">
          <button
            type="button"
            onClick={() => openGallery(0)}
            className="w-[70%] h-28 relative rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5452F6]"
          >
            <Image
              src={projectData.images.preview}
              alt={`Vista previa del proyecto ${projectData.name}`}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </button>

          <button
            type="button"
            onClick={() => openGallery(1)}
            className="w-[30%] h-28 relative cursor-pointer rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5452F6]"
          >
            {projectData.images.gallery.length > 0 && (
              <Image
                src={projectData.images.gallery[0]}
                alt={`Galería del proyecto ${projectData.name}`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            )}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white z-10 bg-black/30">
                {remainingGallery > 0 && (
                  <div className="text-2xl font-semibold">+{remainingGallery}</div>
              )}
              <div className="font-light underline text-xs">Ver más fotos</div>
            </div>
          </button>
        </div>

        <p className="text-[11px] text-gray-500 leading-relaxed">
          *Las imágenes son ilustrativas y no tienen valor contractual. Pueden haber cambios en dimensiones, materiales y colores. Los elementos decorativos no están incluidos.
        </p>
      </div>

      {/* Métricas Mobile */}
      <div className="flex w-full lg:hidden">
        <div className="w-2 h-auto bg-[#DADADA]"></div>
        <div className="w-full flex justify-around bg-[#9393930D] py-4">
          <div className="text-center">
            <div className="font-bold text-xl">{projectData.estimatedReturn}</div>
            <div className="text-sm">Retorno Estimado</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-xl">{projectData.valuePerUnit}</div>
            <div className="text-sm">Valor $ por unit</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-xl">{formatNumber(projectData.totalInvestors)}</div>
            <div className="text-sm">Total de socios</div>
          </div>
        </div>
      </div>

      {/* Tabs Mobile */}
      <Tabs defaultValue="investment" className="lg:hidden w-full space-y-7">
        <div>
          <h2 className="font-bold text-xl mb-3">¿A partir de qué monto puedo invertir?</h2>
          <div className="flex justify-between items-start relative">
            <div>
              <div className="font-bold text-4xl">
                {projectData.minInvestment} <span className="text-lg">{projectData.minInvestmentPeriod}</span>
              </div>
              <div className="text-[#5452F6] font-light underline text-sm mt-1">
                Válido hasta el {projectData.validUntil}
              </div>
            </div>
            <button
              onClick={handleGoToSimulator}
              className="w-16 h-16 flex justify-center items-center bg-green-500 rounded-full cursor-pointer hover:bg-green-600 transition"
            >
              <Calculator className="w-8 h-8 text-white" />
            </button>
          </div>
        </div>

        <div
          className={`rounded-md bg-[#DDE4FF] px-4 py-3 text-gray-800 transition-all ${
            showSecondaryMarketInfo ? 'w-full' : 'max-w-[320px]'
          }`}
        >
          <button
            type="button"
            onClick={() => setShowSecondaryMarketInfo((prev) => !prev)}
            className="flex w-full items-center justify-between gap-3 font-medium text-sm"
          >
            <span className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#5452F6]" />
              <span
                className={`font-semibold transition-all ${showSecondaryMarketInfo ? 'text-sm max-w-none whitespace-normal' : 'text-xs max-w-none whitespace-normal'}`}
              >
                ¡Mercado secundario disponible!
              </span>
            </span>
            {showSecondaryMarketInfo ? (
              <ChevronUp className="w-4 h-4 text-gray-700" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-700" />
            )}
          </button>
          {showSecondaryMarketInfo && (
            <p className="mt-2 text-xs leading-relaxed text-gray-700 font-medium">
              El mercado secundario de LOKL te permite comprar participaciones de otros inversionistas en proyectos ya en curso. Es una oportunidad única para sumarte a un proyecto avanzado, aprovechar su valorización y obtener rendimientos en menor tiempo.
            </p>
          )}
        </div>

        <TabsContent value="investment" className="space-y-4">
          <div className="font-semibold text-lg">
            {projectData.totalInvestment}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-6xl text-gray-800">
              {projectData.availableSlots.current}
            </span>
            <span className="font-bold text-4xl text-gray-400">
              /{projectData.availableSlots.total}
            </span>
          </div>
          <p className="text-sm text-gray-600 font-medium">
            Cupos disponibles antes de que suba el precio por unit. ¡No te quedes por fuera!
          </p>
        </TabsContent>

        <TabsContent value="stages" className="flex space-x-4">
          {projectData.stages.map((stage, index) => (
            <div key={index} className="bg-[#F6F6F6] py-3 px-4 rounded">
              <div className="font-roboto text-sm font-semibold mb-1">{stage.month}</div>
              <div className="font-roboto text-sm font-medium mb-1">{stage.price}</div>
              <div className="text-[#5452F6] text-xs">{stage.validUntil}</div>
            </div>
          ))}
        </TabsContent>

        <button
          onClick={handleGoToBuy}
          className="inline-flex items-center justify-center bg-[#0F172A] text-white py-3.5 px-10 rounded-full font-semibold text-base hover:bg-[#111C2F] transition"
        >
          Quiero ser socio
        </button>
      </Tabs>

      {galleryOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col">
          <div className="flex justify-end p-4">
            <button
              type="button"
              onClick={closeGallery}
              className="text-white p-2 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Cerrar galería"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center gap-4 px-4 pb-6 md:gap-6 md:px-6 md:pb-8">
            <button
              type="button"
              onClick={handlePrev}
              className="text-white p-2 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white md:p-3"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <div className="relative w-full max-w-4xl h-[55vh] md:h-auto md:aspect-[16/10]">
              <Image
                src={projectData.images.gallery[activeImage]}
                alt={`Imagen ${activeImage + 1} del proyecto ${projectData.name}`}
                fill
                className="object-contain rounded-lg"
                sizes="100vw"
                priority
              />
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="text-white p-2 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white md:p-3"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>

          <div className="flex justify-center gap-2 pb-4 flex-wrap px-4 md:pb-6 md:px-6">
            {projectData.images.gallery.map((image, index) => (
              <button
                type="button"
                key={image}
                onClick={() => setActiveImage(index)}
                className={`relative w-16 h-16 rounded overflow-hidden border ${activeImage === index ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'}`}
                aria-label={`Ver imagen ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`Miniatura ${index + 1} del proyecto ${projectData.name}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

