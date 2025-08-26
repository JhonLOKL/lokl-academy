import React from "react";

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="lokl-reset">
      {children}
    </div>
  );
}
