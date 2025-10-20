import { useState, useEffect } from "react";

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      // Vérifier la largeur de l'écran
      const screenWidth = window.innerWidth <= breakpoint;

      // Vérifier si c'est un appareil tactile
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

      // Vérifier le user agent pour les appareils mobiles
      const isMobileUserAgent =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      // Considérer comme mobile si l'écran est petit OU si c'est un appareil tactile mobile
      setIsMobile(screenWidth || (isTouchDevice && isMobileUserAgent));
    };

    // Vérifier au montage
    checkIsMobile();

    // Écouter les changements de taille d'écran
    window.addEventListener("resize", checkIsMobile);

    // Écouter les changements d'orientation
    window.addEventListener("orientationchange", () => {
      // Délai pour laisser le temps à l'orientation de changer
      setTimeout(checkIsMobile, 100);
    });

    return () => {
      window.removeEventListener("resize", checkIsMobile);
      window.removeEventListener("orientationchange", checkIsMobile);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
