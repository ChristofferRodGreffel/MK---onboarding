import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Function used to scroll the viewbox to the top of the screen
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, [pathname]);
};

export default ScrollToTop;
