"use client";

import React from "react";
import ProfileCard from "@/components/course/profile-card";
import CourseSwiper from "@/components/course/course-swiper";
import { LearningProfile } from "@/lib/course/schema";

interface ProfilesSectionProps {
  profiles: LearningProfile[];
  userProgress?: {
    profileId: string;
    completedCourses: number;
    totalCourses: number;
    overallProgress: number;
  } | null;
}

const ProfilesSection: React.FC<ProfilesSectionProps> = ({ profiles, userProgress }) => {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
        Perfiles de aprendizaje
      </h2>
      <CourseSwiper
        slidesPerView={1}
        spaceBetween={32}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1.05,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 1.2,
            spaceBetween: 40,
          },
          1440: {
            slidesPerView: 1.5,
            spaceBetween: 50,
          },
          1800: {
            slidesPerView: 1.8,
            spaceBetween: 60,
          },
        }}
      >
        {profiles.map((profile) => (
          <ProfileCard 
            key={profile.id} 
            profile={profile} 
            userProgress={
              userProgress && profile.id === userProgress.profileId ? 
              {
                completedCourses: userProgress.completedCourses,
                totalCourses: userProgress.totalCourses,
                overallProgress: userProgress.overallProgress
              } : undefined
            }
          />
        ))}
      </CourseSwiper>
    </section>
  );
};

export default ProfilesSection;
