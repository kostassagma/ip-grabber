import { useMediaQuery } from "react-responsive";

export const useScreenType = (): "desktop" | "mobile" => {
  const isMobile = useMediaQuery({ maxWidth: 640 });

  if (isMobile) {
    return "mobile";
  }

  return "desktop";
};
