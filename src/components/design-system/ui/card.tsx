import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "benefit" | "investment" | "user";
  }
>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-md border border-[#E5E5E5] bg-white shadow-sm",
      {
        "p-6": variant === "default" || variant === "investment",
        "p-6 text-center": variant === "benefit",
        "p-4": variant === "user",
      },
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold leading-none", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-[#6D6C6C]", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-4", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// Specialized Cards
const BenefitCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    icon?: React.ReactNode;
    title: string;
    description?: string;
  }
>(({ className, icon, title, description, children, ...props }, ref) => (
  <Card variant="benefit" className={cn("flex flex-col items-center", className)} ref={ref} {...props}>
    {icon && (
      <div className="mb-4 text-[#5352F6]">{icon}</div>
    )}
    <CardTitle className="mb-2">{title}</CardTitle>
    {description && (
      <CardDescription>{description}</CardDescription>
    )}
    {children}
  </Card>
));
BenefitCard.displayName = "BenefitCard";

const InvestmentCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    price: string;
    title: string;
    description?: string;
    ctaText?: string;
    onCtaClick?: () => void;
  }
>(({ className, price, title, description, ctaText = "Invertir", onCtaClick, ...props }, ref) => (
  <Card variant="investment" className={className} ref={ref} {...props}>
    <div className="mb-4 text-2xl font-bold text-[#5352F6]">{price}</div>
    <CardTitle className="mb-2">{title}</CardTitle>
    {description && (
      <CardDescription className="mb-4">{description}</CardDescription>
    )}
    {ctaText && (
      <button 
        onClick={onCtaClick}
        className="w-full rounded-md bg-[#5352F6] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
      >
        {ctaText}
      </button>
    )}
  </Card>
));
InvestmentCard.displayName = "InvestmentCard";

const UserCard = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, "role"> & {
    avatar?: React.ReactNode;
    name: string;
    role?: string | React.ReactNode;
    actions?: React.ReactNode;
  }
>(({ className, avatar, name, role, actions, ...props }, ref) => (
  <Card variant="user" className={cn("flex flex-col md:flex-row items-center gap-4", className)} ref={ref} {...props}>
    {avatar && (
      <div className="flex-shrink-0">{avatar}</div>
    )}
    <div className="flex-grow">
      <div className="font-semibold">{name}</div>
      {role && <div className="text-sm text-[#6D6C6C]">{role}</div>}
    </div>
    {actions && (
      <div className="flex-shrink-0">{actions}</div>
    )}
  </Card>
));
UserCard.displayName = "UserCard";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  BenefitCard,
  InvestmentCard,
  UserCard,
};
