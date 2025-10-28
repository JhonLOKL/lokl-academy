"use client";

import { useUtmStore } from "@/store/utm-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * Panel de debugging para visualizar UTMs capturados
 * SOLO para desarrollo - NO usar en producción
 * 
 * Para usarlo, agregar en cualquier página:
 * <UtmDebugPanel />
 */
export default function UtmDebugPanel() {
  const {
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
    utmContent,
    hasUtmParams,
    clearUtmParams,
  } = useUtmStore();

  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  const utmData = [
    { label: "Source", value: utmSource, key: "utmSource" },
    { label: "Medium", value: utmMedium, key: "utmMedium" },
    { label: "Campaign", value: utmCampaign, key: "utmCampaign" },
    { label: "Term", value: utmTerm, key: "utmTerm" },
    { label: "Content", value: utmContent, key: "utmContent" },
  ];

  return (
    <Card className="fixed bottom-4 right-4 w-80 shadow-lg z-50 border-2 border-primary">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">UTM Debug Panel</CardTitle>
          {hasUtmParams() ? (
            <Badge variant="default" className="bg-green-500">Active</Badge>
          ) : (
            <Badge variant="secondary">No UTMs</Badge>
          )}
        </div>
        <CardDescription className="text-xs">
          Parámetros UTM capturados (solo dev)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {hasUtmParams() ? (
          <>
            <div className="space-y-2">
              {utmData.map(({ label, value, key }) => (
                value && (
                  <div key={key} className="flex justify-between items-center text-xs">
                    <span className="font-medium text-muted-foreground">{label}:</span>
                    <code className="bg-muted px-2 py-0.5 rounded text-xs max-w-[180px] truncate">
                      {value}
                    </code>
                  </div>
                )
              ))}
            </div>
            
            <div className="pt-2 border-t space-y-2">
              <Button
                onClick={clearUtmParams}
                variant="destructive"
                size="sm"
                className="w-full text-xs"
              >
                Limpiar UTMs
              </Button>
              
              <Button
                onClick={() => {
                  console.log("UTM State:", {
                    utmSource,
                    utmMedium,
                    utmCampaign,
                    utmTerm,
                    utmContent,
                  });
                }}
                variant="outline"
                size="sm"
                className="w-full text-xs"
              >
                Log en Console
              </Button>
            </div>
          </>
        ) : (
          <div className="text-xs text-muted-foreground text-center py-4">
            <p>No hay UTMs capturados</p>
            <p className="mt-2 text-[10px]">
              Agrega ?utm_source=test a la URL
            </p>
          </div>
        )}
        
        <div className="pt-2 border-t">
          <p className="text-[10px] text-muted-foreground">
            localStorage: utm-storage
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

