"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/design-system";
import { useRouter } from "next/navigation";

export default function UserProfileWidget() {
  const { user, token, fetchUserProfile, logout } = useAuthStore();
  const router = useRouter();
  
  // Obtener el perfil completo del usuario si hay token pero no hay datos completos
  useEffect(() => {
    if (token && (!user || !user.profilePhoto)) {
      fetchUserProfile();
    }
  }, [token, user, fetchUserProfile]);
  
  const handleLogout = () => {
    logout();
    router.push("/");
  };
  
  if (!token || !user) {
    return null;
  }
  
  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <div className="flex items-center space-x-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          {user.profilePhoto ? (
            <Image
              src={user.profilePhoto}
              alt={`${user.firstName} ${user.lastName}`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#5352F6] text-white">
              {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-sm">
              Mi cuenta
            </Button>
          </Link>
          <Button variant="secondary" onClick={handleLogout} className="text-sm">
            Cerrar sesión
          </Button>
        </div>
      </div>
    </div>
  );
}
