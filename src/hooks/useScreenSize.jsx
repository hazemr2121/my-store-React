import { useState, useEffect } from "react";

// Custom hook to get and track screen dimensions
function useScreenSize() {
  // Initialize state with undefined to ensure server and client render match
  const [screenSize, setScreenSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Update screenSize state
      setScreenSize({
        width,
        height,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures effect runs only on mount and unmount

  return screenSize;
}

export default useScreenSize;
