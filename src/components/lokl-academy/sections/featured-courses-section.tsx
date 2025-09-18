"use client";

import React from "react";
import { H2, Paragraph, Button } from "@/components/design-system";
import CourseCard from "@/components/course/course-card";
import CourseSwiper from "@/components/course/course-swiper";
import { Course } from "@/lib/course/schema";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface FeaturedCoursesSectionProps {
  courses: Course[];
  title?: string;
  description?: string;
  showViewAll?: boolean;
}

const FeaturedCoursesSection: React.FC<FeaturedCoursesSectionProps> = ({
  courses,
  title = "Cursos destacados",
  description = "Aprende sobre inversiones inmobiliarias, crowdfunding y más con nuestros cursos especializados",
  showViewAll = true,
}) => {
  if (!courses || courses.length === 0) {
    return null;
  }

  // Animación para la sección
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="container mx-auto px-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between" variants={itemVariants}>
        <div className="mb-4 md:mb-0">
          <H2 variant="section" className="mb-2">
            {title}
          </H2>
          <Paragraph variant="lead" color="muted" className="max-w-2xl">
            {description}
          </Paragraph>
        </div>
        {showViewAll && (
          <Link href="/course" className="group inline-flex items-center text-[#5352F6] hover:underline">
            <span className="font-medium">Ver todos los cursos</span>
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </motion.div>

      <motion.div variants={itemVariants}>
        <CourseSwiper
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
        >
          {courses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              variant="default"
              showInstructor={true}
              showStats={true}
            />
          ))}
        </CourseSwiper>
      </motion.div>

      <motion.div 
        className="mt-8 flex justify-center md:hidden"
        variants={itemVariants}
      >
        <Link href="/course">
          <Button variant="secondary">Ver todos los cursos</Button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default FeaturedCoursesSection;
