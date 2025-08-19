import React, { memo, Suspense } from "react";
import useIsMobile from "../hooks/useIsMobile";

// Import dynamique pour améliorer les performances
const Projects = React.lazy(() => import("./Projects"));
const ProjectsMobile = React.lazy(() => import("./mobile/ProjectsMobile"));

// Composant de chargement
const ProjectsLoader = memo(() => (
  <div className="relative min-h-screen py-20 flex items-center justify-center">
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        <p className="mt-4 text-white/70">Chargement des projets...</p>
      </div>
    </div>
  </div>
));

const ProjectsManager = memo(() => {
  const isMobile = useIsMobile(768); // Breakpoint à 768px

  return (
    <Suspense fallback={<ProjectsLoader />}>
      {isMobile ? <ProjectsMobile /> : <Projects />}
    </Suspense>
  );
});

ProjectsManager.displayName = "ProjectsManager";

export default ProjectsManager;
