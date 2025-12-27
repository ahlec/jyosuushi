import React, { useEffect } from "react";
import { useLocation } from "react-router";

const NavigationManager: React.FC = () => {
  // Listen for pathname changing and scroll to top when it changes
  const { pathname } = useLocation();
  useEffect((): void => {
    document.body.scrollTo(0, 0);
  }, [pathname]);

  // Render nothing (invisible utility component)
  return null;
};

export default NavigationManager;
