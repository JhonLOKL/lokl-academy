"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface ProfileAvatarProps {
  profilePhoto?: string | null;
  firstName?: string;
  lastName?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ProfileAvatar({
  profilePhoto,
  firstName = '',
  lastName = '',
  size = 'md',
  className = '',
}: ProfileAvatarProps) {
  const [imageError, setImageError] = useState(false);
  
  // Determinar tamaño
  const sizeClasses = {
    sm: 'h-10 w-10 text-lg',
    md: 'h-16 w-16 text-xl',
    lg: 'h-24 w-24 text-3xl',
  };
  
  // Obtener iniciales
  const getInitials = () => {
    const firstInitial = firstName?.charAt(0) || '?';
    const lastInitial = lastName?.charAt(0) || '';
    return `${firstInitial}${lastInitial}`;
  };
  
  // Verificar si hay una URL de imagen válida
  const hasValidImage = profilePhoto && 
                       profilePhoto !== 'null' && 
                       profilePhoto !== 'undefined' && 
                       !imageError;
  
  return (
    <div className={`relative overflow-hidden rounded-full border-4 border-white shadow-lg ${sizeClasses[size]} ${className}`}>
      {hasValidImage ? (
        <Image
          src={profilePhoto as string}
          alt={`${firstName} ${lastName}`}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-white text-[#5352F6] font-bold">
          {getInitials()}
        </div>
      )}
    </div>
  );
}
