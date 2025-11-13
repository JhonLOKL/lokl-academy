"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type TimeLeft = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isExpired: boolean;
};

type PromoBannerProps = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  targetId: string;
  ctaHref?: string;
  countdownLabel?: string;
  deadline?: string | Date;
  className?: string;
};

const pad = (value: number) => value.toString().padStart(2, "0");

const defaultTimeLeft: TimeLeft = {
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
  isExpired: false,
};

const INVEST_URL = "https://dashboard.lokl.life/checkout/invest?";

export function PromoBanner({
  title,
  subtitle,
  ctaLabel,
  countdownLabel,
  deadline,
  className,
}: PromoBannerProps) {
  const targetTimestamp = useMemo(() => {
    if (!deadline) return null;

    const parsed =
      typeof deadline === "string" ? new Date(deadline).getTime() : deadline.getTime();

    return Number.isNaN(parsed) ? null : parsed;
  }, [deadline]);

  const calculateTimeLeft = useCallback((): TimeLeft => {
    if (!targetTimestamp) {
      return defaultTimeLeft;
    }

    const now = Date.now();
    const difference = targetTimestamp - now;

    if (difference <= 0) {
      return { ...defaultTimeLeft, isExpired: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return {
      days: pad(days),
      hours: pad(hours),
      minutes: pad(minutes),
      seconds: pad(seconds),
      isExpired: false,
    };
  }, [targetTimestamp]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(defaultTimeLeft);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!targetTimestamp) return;

    const update = () => setTimeLeft(calculateTimeLeft());

    update();

    const interval = window.setInterval(update, 1000);

    return () => window.clearInterval(interval);
  }, [calculateTimeLeft, targetTimestamp]);

  const countdownLabelText = countdownLabel ?? "Aumento del Unit en";

  const handleCtaClick = () => {
    window.location.href = INVEST_URL;
  };

  const showCountdown = Boolean(targetTimestamp) && !timeLeft.isExpired && isMounted;

  return (
    <div
      className={`w-full bg-gradient-to-r from-[#D4B6FF] via-[#C3C5FF] to-[#8EC5FF] text-[#0B1050] shadow-md ${className ?? ""
        }`}
    >
      <div className="container mx-auto px-4 py-4 xl:max-w-7xl">
        <div className="lg:hidden">
          <div className="overflow-hidden">
            <div className="promo-banner-marquee flex items-center gap-6 whitespace-nowrap">
              {renderMobileSegment({
                title,
                subtitle,
                ctaLabel,
                onClick: handleCtaClick,
                showCountdown,
                countdownLabel: countdownLabelText,
                timeLeft,
              })}
              <span className="text-sm font-semibold text-black/30">•</span>
              <div aria-hidden="true" className="pointer-events-none select-none">
                {renderMobileSegment({
                  title,
                  subtitle,
                  ctaLabel,
                  showCountdown,
                  countdownLabel: countdownLabelText,
                  timeLeft,
                  isClone: true,
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2 text-center lg:text-left">
            <p className="text-lg font-semibold">{title}</p>
            <p className="text-sm text-black/70 lg:text-base">{subtitle}</p>
          </div>

          {showCountdown ? (
            <div className="flex flex-col items-center gap-2 text-sm font-semibold text-[#0B1050] lg:items-start lg:text-left">
              <span className="text-xs font-medium uppercase tracking-wide text-black/70 lg:self-start">
                {countdownLabelText}
              </span>
              <div className="flex items-center gap-4">
                <Countdown label={countdownLabelText} timeLeft={timeLeft} variant="horizontal" />
                <button
                  onClick={handleCtaClick}
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B1050] shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 cursor-pointer"
                  type="button"
                >
                  {ctaLabel}
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleCtaClick}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B1050] shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 cursor-pointer"
              type="button"
            >
              {ctaLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

type CountdownProps = {
  label: string;
  timeLeft: TimeLeft;
  variant: "stacked" | "inline" | "horizontal";
};

type MobileSegmentProps = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  countdownLabel: string;
  timeLeft: TimeLeft;
  showCountdown: boolean;
  onClick?: () => void;
  isClone?: boolean;
};

type TimeBoxProps = {
  label: string;
  value: string;
  size?: "default" | "compact";
};

function renderMobileSegment({
  title,
  subtitle,
  ctaLabel,
  countdownLabel,
  timeLeft,
  showCountdown,
  onClick,
  isClone,
}: MobileSegmentProps) {
  return (
    <div className="flex items-center gap-3 pr-6">
      <span className="text-sm font-semibold">{title}</span>
      <span className="text-xs text-black/70">{subtitle}</span>
      {showCountdown && (
        <Countdown label={countdownLabel} timeLeft={timeLeft} variant="inline" />
      )}
      {isClone ? (
        <span className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-[#0B1050] shadow-sm">
          {ctaLabel}
        </span>
      ) : (
        <button
          onClick={onClick}
          className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-[#0B1050] shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 cursor-pointer"
          type="button"
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );
}

function Countdown({ label, timeLeft, variant }: CountdownProps) {
  if (variant === "inline") {
    return (
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-medium uppercase tracking-wide text-black/60">
          {label}
        </span>
        <div className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-[#0B1050]">
          <TimeBox label="Días" value={timeLeft.days} size="compact" />
          <Separator compact />
          <TimeBox label="Hrs" value={timeLeft.hours} size="compact" />
          <Separator compact />
          <TimeBox label="Min" value={timeLeft.minutes} size="compact" />
          <Separator compact />
          <TimeBox label="Seg" value={timeLeft.seconds} size="compact" />
        </div>
      </div>
    );
  }

  if (variant === "horizontal") {
    return (
      <div className="flex items-center gap-4">
        <TimeBox label="Días" value={timeLeft.days} />
        <Separator />
        <TimeBox label="Hrs" value={timeLeft.hours} />
        <Separator />
        <TimeBox label="Min" value={timeLeft.minutes} />
        <Separator />
        <TimeBox label="Seg" value={timeLeft.seconds} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center lg:items-start">
      <span className="text-xs font-medium uppercase tracking-wide text-black/70">
        {label}
      </span>
      <div className="mt-1 flex items-center gap-3 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-[#0B1050]">
        <TimeBox label="Días" value={timeLeft.days} />
        <Separator />
        <TimeBox label="Hrs" value={timeLeft.hours} />
        <Separator />
        <TimeBox label="Min" value={timeLeft.minutes} />
        <Separator />
        <TimeBox label="Seg" value={timeLeft.seconds} />
      </div>
    </div>
  );
}

function TimeBox({ label, value, size = "default" }: TimeBoxProps) {
  const valueClassName =
    size === "compact"
      ? "text-sm font-bold leading-none"
      : "text-lg font-bold leading-none";
  const labelClassName =
    size === "compact"
      ? "text-[8px] font-medium uppercase tracking-wide text-black/60"
      : "text-[10px] font-medium uppercase tracking-wide text-black/60";

  return (
    <div className="flex flex-col items-center text-center">
      <span className={valueClassName}>{value}</span>
      <span className={labelClassName}>{label}</span>
    </div>
  );
}

function Separator({ compact }: { compact?: boolean }) {
  const className = compact
    ? "text-base font-bold text-black/40"
    : "text-lg font-bold text-black/40";

  return <span className={className}>:</span>;
}

export default PromoBanner;

