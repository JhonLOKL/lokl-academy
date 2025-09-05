"use client";

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CourseCard from "@/components/course/course-card";
import PathCard from "@/components/course/path-card";
import HorizontalScroll from "@/components/course/horizontal-scroll";
import { mockCourses, mockLearningPaths, mockUserProgress } from "@/lib/course/mock-data";

/**
 * Este archivo contiene pruebas básicas para los componentes principales
 * de la página de LOKL Academy.
 * 
 * Para ejecutar estas pruebas, necesitarías configurar Jest o Vitest
 * con React Testing Library.
 */

describe("CourseCard Component", () => {
  test("renders course information correctly", () => {
    render(<CourseCard course={mockCourses[0]} />);
    
    // Verificar que el título del curso se muestre
    expect(screen.getByText(mockCourses[0].title)).toBeInTheDocument();
    
    // Verificar que la descripción se muestre
    expect(screen.getByText(mockCourses[0].excerpt)).toBeInTheDocument();
    
    // Verificar que el nombre del instructor se muestre
    expect(screen.getByText(mockCourses[0].instructor.name)).toBeInTheDocument();
  });

  test("shows progress when provided", () => {
    const progress = mockUserProgress.find(p => p.courseId === mockCourses[0].id);
    
    render(
      <CourseCard 
        course={mockCourses[0]} 
        showProgress={true}
        progress={progress}
      />
    );
    
    // Verificar que el progreso se muestre
    expect(screen.getByText(`${progress?.overallProgress}% completado`)).toBeInTheDocument();
    
    // Verificar que las lecciones completadas se muestren
    expect(screen.getByText(`${progress?.completedLessons}/${mockCourses[0].content.totalLessons} lecciones`)).toBeInTheDocument();
  });
});

describe("PathCard Component", () => {
  test("renders path information correctly", () => {
    render(<PathCard path={mockLearningPaths[0]} />);
    
    // Verificar que el título de la ruta se muestre
    expect(screen.getByText(mockLearningPaths[0].title)).toBeInTheDocument();
    
    // Verificar que la descripción se muestre
    expect(screen.getByText(mockLearningPaths[0].excerpt)).toBeInTheDocument();
    
    // Verificar que el tiempo estimado se muestre
    expect(screen.getByText(mockLearningPaths[0].structure.estimatedCompletionTime)).toBeInTheDocument();
  });

  test("expands course list when button is clicked", () => {
    render(<PathCard path={mockLearningPaths[0]} variant="detailed" />);
    
    // Verificar que el botón para expandir cursos esté presente
    const expandButton = screen.getByText(/Ver cursos/i);
    expect(expandButton).toBeInTheDocument();
    
    // Hacer clic en el botón
    fireEvent.click(expandButton);
    
    // Verificar que ahora se muestra la lista de cursos
    expect(screen.getByText(/Ocultar cursos/i)).toBeInTheDocument();
  });
});

describe("HorizontalScroll Component", () => {
  test("renders title and content correctly", () => {
    render(
      <HorizontalScroll title="Test Title" subtitle="Test Subtitle">
        <div>Test Content</div>
      </HorizontalScroll>
    );
    
    // Verificar que el título se muestre
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    
    // Verificar que el subtítulo se muestre
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
    
    // Verificar que el contenido se muestre
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  test("scroll buttons work correctly", () => {
    render(
      <HorizontalScroll title="Test Title">
        <div style={{ width: "1000px" }}>Wide Content</div>
      </HorizontalScroll>
    );
    
    // Obtener los botones de scroll
    const scrollRightButton = screen.getByLabelText("Desplazar a la derecha");
    const scrollLeftButton = screen.getByLabelText("Desplazar a la izquierda");
    
    // Verificar que los botones estén presentes
    expect(scrollRightButton).toBeInTheDocument();
    expect(scrollLeftButton).toBeInTheDocument();
    
    // Simular scroll a la derecha
    fireEvent.click(scrollRightButton);
    
    // Simular scroll a la izquierda
    fireEvent.click(scrollLeftButton);
    
    // Nota: No podemos verificar el desplazamiento real en un test unitario
    // ya que requeriría manipulación del DOM real
  });
});
