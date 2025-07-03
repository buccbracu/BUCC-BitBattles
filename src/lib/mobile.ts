"use client";
/**
 * Device detector utility for BUCC BIT BATTLES
 * Detects if the user is on a mobile device and loads appropriate CSS
 */

// Function to detect if user is on a mobile device
export const isMobileDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor;

  // Regular expression for mobile devices
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

  // Check if viewport width is less than 768px (typical mobile breakpoint)
  const isMobileWidth = window.innerWidth < 768;

  return mobileRegex.test(userAgent) || isMobileWidth;
};

// Function to load mobile CSS
export const loadMobileCSS = () => {
  if (isMobileDevice()) {
    // Load the main mobile CSS
    const mainMobileCSS = document.createElement("link");
    mainMobileCSS.rel = "stylesheet";
    mainMobileCSS.href = "/mobile/mobile.css";
    document.head.appendChild(mainMobileCSS);

    // Load component-specific mobile CSS files
    const components = [
      "Hero",
      "Schedule",
      "Registration",
      "Faq",
      "Prizes",
      "Sponsors",
      "Organizers",
      "Footer",
    ];

    components.forEach((component) => {
      const componentCSS = document.createElement("link");
      componentCSS.rel = "stylesheet";
      componentCSS.href = `/mobile/${component}.mobile.css`;
      document.head.appendChild(componentCSS);
    });

    // Add a class to the body for additional mobile-specific styling
    document.body.classList.add("mobile-device");

    return true;
  }

  return false;
};

// Function to unload mobile CSS (if needed)
export const unloadMobileCSS = () => {
  // Remove all mobile CSS links
  const cssLinks = document.querySelectorAll('link[href^="/mobile/"]');
  cssLinks.forEach((link) => link.remove());

  // Remove mobile class from body
  document.body.classList.remove("mobile-device");
};

// Function to handle resize events (for responsive testing)
export const handleResize = () => {
  const wasMobile = document.body.classList.contains("mobile-device");
  const isMobile = isMobileDevice();

  if (isMobile && !wasMobile) {
    loadMobileCSS();
  } else if (!isMobile && wasMobile) {
    unloadMobileCSS();
  }
};

// Export a default function to initialize device detection
export function initDeviceDetection() {
  // Initial load
  loadMobileCSS();

  // Add resize listener
  window.addEventListener("resize", handleResize);

  // Return cleanup function
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}
